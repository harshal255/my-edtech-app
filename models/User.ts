import { Schema, Document, models, model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string;
  isAdmin: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", UserSchema);
export default User;
