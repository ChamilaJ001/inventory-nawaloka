import mongoose from "mongoose";

const saleseSchema = new mongoose.Schema(
  {
    invoice: { type: String, required: true },
    products: [],
    shop: { type: String, required: true },
    total: { type: Number, required: true },
    status: { type: String, required: true },
    is_delete: { type: Number, required: true },
  },
  { timestamps: true }
);

const Sale = mongoose.models.Sale || mongoose.model("Sale", saleseSchema);

export default Sale;
