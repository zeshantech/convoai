import { NextRequest, NextResponse } from "next/server";
import { convertToCoreMessages, createDataStreamResponse, streamText, LanguageModelResponseMetadata, CoreToolMessage, CoreAssistantMessage } from "ai";
import { systemPrompt } from "@/lib/ai/prompts";

import { enqueueTask } from "./queue";

import { generateObjectId, generateTitleFromUserMessage, getMostRecentUserMessage, sanitizeResponseMessages, serialize } from "@/lib/utils";
import { getSession } from "../auth/[...nextauth]/route";
import { createOrUpdateChat, findChatById, saveMessage } from "./queries";
import { getModel } from "@/lib/ai/ai";
import dbConnect from "@/lib/db/mongoose";
import { Chat } from "@/models/Chat";
import { BadRequestException, InternalServerErrorException } from "@/lib/exceptions";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const session = await getSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { chatId, messages, modelId } = await request.json();
    if (!modelId) {
      return new BadRequestException("Model Id is Required");
    }

    console.log(messages, "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

    const userMessage = getMostRecentUserMessage(messages);
    if (!userMessage) {
      return new BadRequestException("Message not found");
    }

    // enqueueTask(async () => {
    let chat = await findChatById(chatId);
    if (!chat) {
      await createOrUpdateChat(chatId, {
        _id: chatId,
        user: session.user.id,
        title: await generateTitleFromUserMessage(userMessage),
      });
    }
    // });

    const userMessageId = generateObjectId();

    // enqueueTask(async () => {
    await saveMessage({
      ...userMessage,
      _id: userMessageId,
      chat: chatId,
    });
    // });

    const languageModel = getModel(modelId);

    return createDataStreamResponse({
      execute: async (dataStream) => {
        dataStream.writeData({
          type: "user-message-id",
          content: userMessageId,
        });
        const result = streamText({
          model: languageModel,
          system: systemPrompt,
          messages,
          onFinish: async ({ response }) => {
            // enqueueTask(async () => {
            await onFinishStreamHelper(response, chatId);
            // });
          },
        });

        result.mergeIntoDataStream(dataStream);
      },
    });
  } catch (error: any) {
    console.log(error, "{{{{{{{{{{{{{{{{{{{{{{{{{");

    return new NextResponse(error.message ?? "Internal Server Error", {
      ...error,
    });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chats = await Chat.find({ user: session.user.id });

    const serializedChats = serialize(chats);

    return NextResponse.json({ chats: serializedChats });
  } catch (error) {
    return NextResponse.json({
      message: error ?? "Interval server error",
      status: 500,
    });
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
