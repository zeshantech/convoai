import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getSession } from "../../auth/[...nextauth]/route";
import { UnauthorizedException } from "@/lib/exceptions";
import { Message } from "@/models/Message";
import { UpdateMessageSchema } from "./schemas";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return new UnauthorizedException();
    }

    const { id } = await params;

    const body = UpdateMessageSchema.parse(await request.json());

    await Message.findOneAndUpdate(
      { _id: id },
      { vote: body.vote, suggestion: body.suggestion }
    );

    return NextResponse.json({ message: "Feedback submitted" });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Internal server error" },
      error
    );
  }
}
