import { NextRequest, NextResponse } from "next/server";
import { deleteChatById, updateChatByFilters } from "../queries";
import { getSession } from "../../auth/[...nextauth]/route";
import { Chat } from "@/models/Chat";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return new NextResponse("Id is required", { status: 400 });
  }

  const body = await request.json();
  try {
    const updatedChat = await updateChatByFilters(
      { _id: id, user: session.user.id },
      body
    );
    if (!updatedChat) {
      return new NextResponse("Chat not found", { status: 404 });
    }

    return NextResponse.json({ message: "Chat updated" }, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error?.message ?? "Internal Server Error", {
      status: 500,
    });
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return new NextResponse("Id is required", { status: 400 });
  }

  const session = await getSession();
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const chat = await Chat.findOneAndDelete({
      user: session.user.id,
      _id: id,
    });
    if (!chat) {
      return new NextResponse("Chat not found", { status: 404 });
    }

    await deleteChatById(id);

    return NextResponse.json({ message: "Chat deleted" }, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message ?? "Internal Server Error", error);
  }
}
