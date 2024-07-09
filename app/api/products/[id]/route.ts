import connectDB from "@/lib/db";
import Category from "@/models/Categories";
import Product from "@/models/Products";
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

// Update
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { name, code, category, shop, price, quantity } = await req.json();
  const data = { name, code, category, shop, price, quantity };
  const { id } = params;

  await connectDB();
  try {
    const existingShop = await Shop.findOne({ name });
    if (existingShop) {
      return new NextResponse(
        JSON.stringify({ error: "Product already exixts with this name" }),
        {
          status: 400,
        }
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedProduct) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        {
          status: 404,
        }
      );
    }

    // Fetch category and shop names
    const categoryDoc = (await Category.findById(category).lean()) as Category;
    const shopDoc = (await Shop.findById(shop).lean()) as Shop;

    // Add category name and shop name to the product response
    const productWithDetails = {
      _id: updatedProduct._id,
      name: updatedProduct.name,
      code: updatedProduct.code,
      category: categoryDoc ? categoryDoc.name : "Unknown Category",
      shop: shopDoc ? shopDoc.shopName : "Unknown Shop",
      price: updatedProduct.price,
      qty: updatedProduct.quantity,
      is_delete: updatedProduct.is_delete,
      createdAt: updatedProduct.createdAt,
      updatedAt: updatedProduct.updatedAt,
      __v: updatedProduct.__v,
    };

    return new NextResponse(JSON.stringify(productWithDetails), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
