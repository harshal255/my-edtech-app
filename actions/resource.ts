/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import connectToDatabase from "@/lib/db";
import Resource from "@/models/Resource";
import { revalidatePath } from "next/cache"; // 👈 This updates the UI automatically after we add data!

export async function createResource(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const link = formData.get("link") as string;
  const category = formData.get("category") as string;

  if (!title || !link) {
    return { error: "Title and Link are required" };
  }

  try {
    await connectToDatabase();
    await Resource.create({ title, description, link, category });

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
    await connectToDatabase();
    await Resource.findByIdAndDelete(resourceId);

    revalidatePath("/dashboard"); // Refresh the list
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete resource" };
  }
}

export async function updateResource(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const link = formData.get("link") as string;
  const category = formData.get("category") as string;

  try {
    await connectToDatabase();
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
