import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    shopName: { type: String, required: true },
    city: { type: String, required: true },
    status: { type: String, required: true },
    is_delete: { type: Number, required: true },
  },
  { timestamps: true }
);

const Shop = mongoose.models.Shop || mongoose.model("Shop", shopSchema);

export default Shop;
