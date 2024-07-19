import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    shop: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, required: true },
    is_delete: { type: Number, required: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
