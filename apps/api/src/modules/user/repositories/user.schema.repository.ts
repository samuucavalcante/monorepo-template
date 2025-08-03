import type { User } from "arc/user/interfaces";
import { model, Schema } from "mongoose";

export const userSchema = new Schema<User>(
  {
    name: { type: String, index: true, required: true },
    email: { type: String, index: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<User>("users", userSchema);
