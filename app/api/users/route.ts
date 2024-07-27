import connectDB from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { username, email, role, shop, password, status } = await req.json();
  const is_delete = 0;

  await connectDB();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new NextResponse(JSON.stringify({ error: "user already exixts" }), {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    role,
    shop,
    password: hashedPassword,
    status,
    is_delete,
  });

  try {
    await newUser.save();

    // const userWithDetails = {
    //   _id: newUser._id,
    //   username: newUser.username,
    //   email: newUser.email,
    //   role: newUser.role,
    //   shop: newUser.shop,
    //   password: newUser.password,
    //   status: newUser.status,
    //   is_delete: newUser.is_delete,
    //   createdAt: newUser.createdAt,
    //   updatedAt: newUser.updatedAt,
    //   __v: newUser.__v,
    // };

    return new NextResponse(JSON.stringify(newUser), {
      status: 201,
    });
    // return new NextResponse("User created", { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// Update
export const PUT = async (req: NextRequest) => {
  const { id, username, email, role, shop, password, status } =
    await req.json();
  const data = { username, email, role, shop, password, status };

  await connectDB();
  try {
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return new NextResponse(
    //     JSON.stringify({ error: "User already exists with this email." }),
    //     {
    //       status: 400,
    //     }
    //   );
    // }

    const updatedUser = await User.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedUser) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

// Delete
export const DELETE = async (req: NextRequest) => {
  const { id } = await req.json();

  await connectDB();
  try {
    const deletedUser = await User.findByIdAndUpdate(
      id,
      { is_delete: 1 },
      { new: true }
    );

    if (!deletedUser) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(deletedUser), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
