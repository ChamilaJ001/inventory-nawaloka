import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    status: { type: String, required: true },
    is_delete: { type: Number, required: true },
  },
  { timestamps: true }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
