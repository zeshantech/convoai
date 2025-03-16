import { NextResponse } from "next/server";
import { LanguageModelResponseMetadata, CoreToolMessage, CoreAssistantMessage } from "ai";

import { sanitizeResponseMessages, serialize } from "@/lib/utils";
import { getSession } from "../auth/[...nextauth]/route";
import { saveMessage } from "./queries";
import { openai } from "@ai-sdk/openai";
import { getEdgeRuntimeResponse } from "@assistant-ui/react/edge";
import dbConnect from "@/lib/mongoose";
import { Chat } from "@/models/Chat";
import { InternalServerErrorException } from "@/lib/exceptions";

export const maxDuration = 30;

export const POST = async (request: Request) => {
  const requestData = await request.json();

  return getEdgeRuntimeResponse({
    options: {
      model: openai("gpt-4o"),
    },
    requestData,
    abortSignal: request.signal,
  });
};

export async function GET() {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const paginateChats = await Chat.paginate({ user: session.user.id }, { limit: 20, sort: { createdAt: -1 } });
    paginateChats.docs = serialize(paginateChats.docs);

    return NextResponse.json(paginateChats);
  } catch (error: any) {
    return NextResponse.json({ message: error?.message ?? "Interval server error" }, error);
  }
}

const onFinishStreamHelper = async (
  response: LanguageModelResponseMetadata & {
    readonly messages: Array<CoreAssistantMessage | CoreToolMessage>;
  },
  chatId: string
) => {
  try {
    const [responseMessage] = sanitizeResponseMessages(response.messages);
    if (typeof responseMessage.content[0] === "object" && responseMessage.content[0].type === "text") {
      await saveMessage({
        role: responseMessage.role,
        content: responseMessage.content[0].text,
        chat: chatId,
      });
    }
  } catch (error) {
    throw new InternalServerErrorException("Failed to save Assistant Response");
  }
};
