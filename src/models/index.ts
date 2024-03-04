import { userSchema } from "@/schemas";
import mongoose, { model } from "mongoose";

export const User = mongoose.models.Users || model("Users", userSchema)