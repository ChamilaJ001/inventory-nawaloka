import connectDB from "@/lib/db";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  await connectDB();
  const { id } = params;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    //   const detailedUser = {
    //     _id: product._id,
    //     code: product.code,
    //     name: product.name,
    //     status: product.status,
    //     price: product.price,
    //     qty: product.quantity,
    //     category: product.category,
    //     shop: product.shop,
    //     categoryName: categoryDoc ? categoryDoc.name : "Unknown Category",
    //     shopName: shopDoc ? shopDoc.shopName : "Unknown Shop",
    //   };

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Server error", error }),
      { status: 500 }
    );
  }
};
