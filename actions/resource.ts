/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import connectToDatabase from "@/lib/db";
import Resource from "@/models/Resource";
import { revalidatePath } from "next/cache"; // 👈 This updates the UI automatically after we add data!
import { getSession } from "./auth";
import { resourceSchema, updateResourceSchema } from "@/lib/schemas";

export async function createResource(formData: FormData) {
  // Get the current user
  const session = await getSession();
  console.log("Current session:", session);

  if (!session || !session.user) {
    return { error: "Unauthorized: No active session found." };
  }

  const userPayload = session.user as { userId: string };
  const currentUserId = userPayload.userId;

  const rawData = {
    title: formData.get("title"),
    category: formData.get("category"),
    link: formData.get("link"),
    description: formData.get("description"),
  };

  // VALIDATE with Zod
  const validation = resourceSchema.safeParse(rawData);
  console.log({ validation });

  if (!validation.success) {
    const errorMessage = validation.error.issues
      .map((issue) => issue.message)
      .join(". ");
    return { error: errorMessage };
  }

  const { title, category, link, description } = validation.data;

  if (!title || !link) {
    return { error: "Title and Link are required" };
  }

  try {
    await connectToDatabase();
    await Resource.create({
      title,
      description,
      link,
      category,
      userId: currentUserId,
    });

    // This tells Next.js: "The data on the dashboard changed, please refresh it!"
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create resource" };
  }
}

export async function getResources() {
  try {
    await connectToDatabase();
    // Fetch all resources and sort by newest first (-1)
    // We use .lean() to make it a simple Javascript object, not a heavy Mongoose object
    const resources = await Resource.find({}).sort({ createdAt: -1 }).lean();

    // We need to convert the _id and dates to strings because Next.js creates a boundary between server/client
    return resources.map((r: any) => ({
      ...r,
      _id: r._id.toString(),
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    }));
  } catch (error) {
    return [];
  }
}

export async function deleteResource(resourceId: string) {
  try {
    const session = await getSession();
    if (!session) return { error: "Unauthorized" };
    await connectToDatabase();

    const userPayload = session.user as { userId: string };
    const currentUserId = userPayload.userId;

    const resource = await Resource.findById(resourceId);

    // fixing bugs
    if (resource.userId !== currentUserId) {
      return { error: "You can only delete your own resources" };
    }
    await Resource.findByIdAndDelete(resourceId);

    revalidatePath("/dashboard"); // Refresh the list
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete resource" };
  }
}

export async function updateResource(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  const rawData = {
    id: formData.get("id"),
    title: formData.get("title"),
    category: formData.get("category"),
    link: formData.get("link"),
    description: formData.get("description"),
  };

  // VALIDATE with Zod
  const validation = updateResourceSchema.safeParse(rawData);
  console.log({ validation });

  if (!validation.success) {
    const errorMessage = validation.error.issues
      .map((issue) => issue.message)
      .join(". ");
    return { error: errorMessage };
  }

  const { title, category, link, description, id } = validation.data;

  try {
    await connectToDatabase();

    const userPayload = session.user as { userId: string };
    const currentUserId = userPayload.userId;

    const resource = await Resource.findById(id);

    // fixing bugs
    if (resource.userId !== currentUserId) {
      return { error: "You can only update your own resources" };
    }
    await Resource.findByIdAndUpdate(id, {
      title,
      description,
      link,
      category,
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update resource" };
  }
}
