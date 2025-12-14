import { z } from "zod";

export const resourceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  category: z.enum(["Frontend", "Backend", "Database", "AI", "General"], {}),
  link: z.string().url("Please enter a valid URL (http/https)"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000),
});

export const updateResourceSchema = resourceSchema.extend({
  id: z.string().min(1, "Resource ID is required"),
});
