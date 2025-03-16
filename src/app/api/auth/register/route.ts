import type { NextApiRequest } from "next";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return NextResponse.json({ message: "Missing required fields" });
  }

  await dbConnect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    NextResponse.json({ message: "User created successfully" });
  } catch (error: any) {
    NextResponse.json({ message: error?.message ?? "Internal Server Error" });
  }
}
