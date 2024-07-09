import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    category: { type: String, required: true },
    shop: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: false },
    is_delete: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
