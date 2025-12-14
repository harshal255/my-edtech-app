import { Schema, Document, models, model } from "mongoose";

export interface IResource extends Document {
  title: string;
  description: string;
  link: string;
  category: string;
  votes: number;
  createdAt: Date;
  userId: string;
}

const ResourceSchema = new Schema<IResource>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    category: { type: String, default: "General" }, // e.g., Frontend, Backend, DevOps
    votes: { type: Number, default: 0 },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

// This check is important for Next.js to prevent "Model already defined" errors
const Resource =
  models.Resource || model<IResource>("Resource", ResourceSchema);

export default Resource;
