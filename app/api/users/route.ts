import connectDB from "@/lib/db";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { username, email, role, shop, password, status } = await req.json();

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
  });

  try {
    await newUser.save();
    return new NextResponse("User created", { status: 201 });
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
