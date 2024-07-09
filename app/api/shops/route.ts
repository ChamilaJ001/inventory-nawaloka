import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Shop from "@/models/Shop";

//Insert
export const POST = async (req: NextRequest) => {
  const { shopName, city, status } = await req.json();
  const is_delete = 0;

  await connectDB();
  const existingShop = await Shop.findOne({ shopName });
  if (existingShop) {
    return new NextResponse(JSON.stringify({ error: "Shop already exixts" }), {
      status: 400,
    });
  }

  const newShop = new Shop({
    shopName,
    city,
    status,
    is_delete,
  });

  try {
    await newShop.save();
    return new NextResponse(JSON.stringify(newShop), { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

//Fetch
export const GET = async () => {
  await connectDB();
  try {
    const shops = await Shop.find({ is_delete: 0 });
    if (shops) {
      return new NextResponse(JSON.stringify(shops), { status: 200 });
    } else {
      return new NextResponse(JSON.stringify({ message: "No shops found" }), {
        status: 204,
      });
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

// Update
export const PUT = async (req: NextRequest) => {
  const { id, shopName, city, status } = await req.json();
  const data = { shopName, city, status };

  await connectDB();
  try {
    const existingShop = await Shop.findOne({ shopName });
    if (existingShop) {
      return new NextResponse(
        JSON.stringify({ error: "Shop already exixts with this name" }),
        {
          status: 400,
        }
      );
    }

    const updatedShop = await Shop.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedShop) {
      return new NextResponse(JSON.stringify({ message: "Shop not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(updatedShop), { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

// Delete
export const DELETE = async (req: NextRequest) => {
  const { id } = await req.json();

  await connectDB();
  try {
    const deletedShop = await Shop.findByIdAndUpdate(
      id,
      { is_delete: 1 },
      { new: true }
    );

    if (!deletedShop) {
      return new NextResponse(JSON.stringify({ message: "Shop not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(deletedShop), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
