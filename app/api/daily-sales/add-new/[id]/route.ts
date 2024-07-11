import connectDB from "@/lib/db";
import Category from "@/models/Categories";
import Product from "@/models/Products";
import Sale from "@/models/Sales";
import Shop from "@/models/Shop";
import { ObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface Category {
  _id: ObjectId;
  name: string;
}

interface Shop {
  _id: ObjectId;
  shopName: string;
}

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  await connectDB();
  const { id } = params;

  try {
    const product = await Product.findOne({ _id: id });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    const categoryDoc = (await Category.findById({
      _id: product.category,
    }).lean()) as Category;
    const shopDoc = (await Shop.findById({ _id: product.shop }).lean()) as Shop;

    const detailedProduct = {
      _id: product._id,
      code: product.code,
      name: product.name,
      status: product.status,
      price: product.price,
      qty: product.quantity,
      category: product.category,
      shop: product.shop,
      categoryName: categoryDoc ? categoryDoc.name : "Unknown Category",
      shopName: shopDoc ? shopDoc.shopName : "Unknown Shop",
    };

    return new NextResponse(JSON.stringify(detailedProduct), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Server error", error }),
      { status: 500 }
    );
  }
};
