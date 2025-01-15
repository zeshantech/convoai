import type { NextApiRequest } from "next";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db/mongoose";
import { NextResponse } from "next/server";
import { User } from "@/models/User";

export default async function POST(req: NextApiRequest) {
  const { token, password } = req.body;

  if (!token || !password) {
    return NextResponse.json({ message: "Invalid request" });
  }

  await dbConnect();

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return NextResponse.json({ message: "Invalid or expired token" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  //   user.resetPasswordToken = undefined;
  //   user.resetPasswordExpires = undefined;

  await user.save();

  return NextResponse.json({ message: "Password has been reset successfully" });
}
