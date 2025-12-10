"use server";

import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

export async function register(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and Password are required" };
  }

  await connectToDatabase();

  // 2. Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { error: "User already exists" };
  }

  // 3. Hash the password (Security)
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Create the user
  await User.create({ email, password: hashedPassword });

  return { success: true };
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await connectToDatabase();

  // 1. Find the user
  const user = await User.findOne({ email });
  if (!user) {
    return { error: "Invalid credentials" };
  }

  // 2. Check password
  const isMatch = await bcrypt.compare(password, user.password as string);
  if (!isMatch) {
    return { error: "Invalid credentials" };
  }

  // 3. Create the JWT Token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  // 4. Set the HTTP-Only Cookie
  // We await cookies() because in Next.js 15/16 it's async
  (await cookies()).set("token", token, {
    httpOnly: true, // Javascript on frontend cannot read this (Security)
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    maxAge: 60 * 60 * 24 * 7, // 1 week in seconds
    path: "/", // Available everywhere in the app
  });

  return { success: true };
}

export async function logout() {
  (await cookies()).delete("token");
  return { success: true };
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    // Verify the token is valid
    const decoded = jwt.verify(token, JWT_SECRET as string);
    return { user: decoded };
  } catch (error) {
    return null;
  }
}
