import connectDB from "@/lib/db";
import Category from "@/models/Categories";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { name, code, status } = await req.json();
  const is_delete = 0;

  await connectDB();
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    return new NextResponse(
      JSON.stringify({ error: "Category already exixts" }),
      {
        status: 400,
      }
    );
  }

  const newCategory = new Category({
    name,
    code,
    status,
    is_delete,
  });

  try {
    await newCategory.save();
    return new NextResponse(JSON.stringify(newCategory), { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

//Fetch
export const GET = async () => {
  await connectDB();
  try {
    const categories = await Category.find({ is_delete: 0 });
    if (categories) {
      return new NextResponse(JSON.stringify(categories), { status: 200 });
    } else {
      return new NextResponse(
        JSON.stringify({ message: "No categories found" }),
        {
          status: 204,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

// Update
export const PUT = async (req: NextRequest) => {
  const { id, name, code, status } = await req.json();
  const data = { name, code, status };

  await connectDB();
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedCategory) {
      return new NextResponse(
        JSON.stringify({ message: "Category not found" }),
        {
          status: 404,
        }
      );
    }

    return new NextResponse(JSON.stringify(updatedCategory), { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

// Delete
export const DELETE = async (req: NextRequest) => {
  const { id } = await req.json();

  await connectDB();
  try {
    const deletedCategory = await Category.findByIdAndUpdate(
      id,
      { is_delete: 1 },
      { new: true }
    );

    if (!deletedCategory) {
      return new NextResponse(
        JSON.stringify({ message: "Category not found" }),
        {
          status: 404,
        }
      );
    }

    return new NextResponse(JSON.stringify(deletedCategory), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
