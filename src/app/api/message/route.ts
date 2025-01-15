import dbConnect from "@/lib/db/mongoose";
import { getSession } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Message } from "@/models/Message";
import { UnauthorizedException } from "@/lib/exceptions";
import { serialize } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const session = await getSession();
    if (!session || !session.user) {
      throw new UnauthorizedException();
    }

    const chatId = request.nextUrl.searchParams.get("chatId");
    if (!chatId) {
      return NextResponse.json({ message: "Missing ChatID" });
    }

    const messages = await Message.find({ chat: chatId }).sort({
      createdAt: -1,
    });

    const reversedMessages = serialize(messages).reverse();

    return NextResponse.json({ messages: reversedMessages });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
