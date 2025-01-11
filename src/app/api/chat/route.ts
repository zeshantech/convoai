import { NextRequest, NextResponse } from "next/server";
import { convertToCoreMessages, createDataStreamResponse, streamText, streamObject } from "ai";
import { z } from "zod";
import { systemPrompt, codePrompt, updateDocumentPrompt } from "@/lib/ai/prompts";

import { localCache } from "./cache";
import { enqueueTask } from "./queue";

import { generateObjectId, generateTitleFromUserMessage, getMostRecentUserMessage, sanitizeResponseMessages } from "@/lib/utils";
import { getSession } from "../auth/[...nextauth]/route";
import { deleteChatById, findChatById, getDocumentById, saveChat, saveDocument, saveMessages } from "./queries";
import { getModel } from "@/lib/ai/ai";
import { IMessage } from "@/models/Message";
import dbConnect from "@/lib/db/mongoose";

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const { chatId, messages, modelId } = await request.json();
    const session = await getSession();
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const coreMessages = convertToCoreMessages(messages);
    const userMessage = getMostRecentUserMessage(coreMessages);
    if (!userMessage) {
      return new NextResponse("No user message found", { status: 400 });
    }

    const cacheKey = `${chatId}:${modelId}:${userMessage.content}`;
    const cachedResponse = localCache.get(cacheKey);
    if (cachedResponse) {
      return new NextResponse(JSON.stringify(cachedResponse), { status: 200 });
    }

    // create and get chat
    const chat = await findChatById(chatId);
    if (!chat) {
      const title = await generateTitleFromUserMessage(userMessage);
      enqueueTask(async () => {
        await saveChat({ id: chatId, userId: session.user.id, title });
      });
    }

    const userMessageId = generateObjectId();
    enqueueTask(async () => {
      await saveMessages([
        {
          ...userMessage,
          // _id: userMessageId,
          chat: chatId,
        },
      ]);
    });

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
          messages: coreMessages,
          maxSteps: 5,
          // experimental_activeTools: allTools, // TODO: check this like why commented
          tools: {
            getWeather: {
              description: "Get the current weather at a location",
              parameters: z.object({
                latitude: z.number(),
                longitude: z.number(),
              }),
              execute: async ({ latitude, longitude }) => {
                const weatherKey = `weather-${latitude}-${longitude}`;
                let weatherData = localCache.get(weatherKey);

                if (!weatherData) {
                  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`);
                  weatherData = await response.json();
                  localCache.set(weatherKey, weatherData);
                }

                return weatherData;
              },
            },
            createDocument: {
              description: "Create a document for writing activity.",
              parameters: z.object({
                title: z.string(),
                kind: z.enum(["text", "code"]),
              }),
              execute: async ({ title, kind }) => {
                const docId = generateObjectId();
                let draftText = "";

                dataStream.writeData({ type: "id", content: docId });
                dataStream.writeData({ type: "title", content: title });
                dataStream.writeData({ type: "kind", content: kind });
                dataStream.writeData({ type: "clear", content: "" });

                if (kind === "text") {
                  const { fullStream } = streamText({
                    model: languageModel,
                    system: "Write about the given topic in Markdown.",
                    prompt: title,
                  });
                  for await (const delta of fullStream) {
                    if (delta.type === "text-delta") {
                      draftText += delta.textDelta;
                      dataStream.writeData({
                        type: "text-delta",
                        content: delta.textDelta,
                      });
                    }
                  }
                  dataStream.writeData({ type: "finish", content: "" });
                } else if (kind === "code") {
                  const { fullStream } = streamObject({
                    model: languageModel,
                    system: codePrompt,
                    prompt: title,
                    schema: z.object({ code: z.string() }),
                  });
                  for await (const delta of fullStream) {
                    if (delta.type === "object") {
                      const { object } = delta;
                      const { code } = object;
                      if (code) {
                        draftText = code;
                        dataStream.writeData({
                          type: "code-delta",
                          content: code,
                        });
                      }
                    }
                  }
                  dataStream.writeData({ type: "finish", content: "" });
                }

                enqueueTask(async () => {
                  await saveDocument({
                    id: docId,
                    title,
                    kind,
                    content: draftText,
                    userId: session.user.id,
                  });
                });

                return {
                  id: docId,
                  title,
                  kind,
                  content: "Document creation in progress; displayed to user.",
                };
              },
            },
            updateDocument: {
              description: "Update a document with given changes.",
              parameters: z.object({
                id: z.string(),
                description: z.string(),
              }),
              execute: async ({ id, description }) => {
                const document = await getDocumentById(id);
                if (!document) return { error: "Document not found" };

                let draftText = "";
                dataStream.writeData({
                  type: "clear",
                  content: document.title,
                });

                if (document.kind === "text") {
                  const { fullStream } = streamText({
                    model: languageModel,
                    system: updateDocumentPrompt(document.content),
                    prompt: description,
                  });
                  for await (const delta of fullStream) {
                    if (delta.type === "text-delta") {
                      draftText += delta.textDelta;
                      dataStream.writeData({
                        type: "text-delta",
                        content: delta.textDelta,
                      });
                    }
                  }
                  dataStream.writeData({ type: "finish", content: "" });
                } else if (document.kind === "code") {
                  const { fullStream } = streamObject({
                    model: languageModel,
                    system: updateDocumentPrompt(document.content),
                    prompt: description,
                    schema: z.object({ code: z.string() }),
                  });
                  for await (const delta of fullStream) {
                    if (delta.type === "object") {
                      const { object } = delta;
                      draftText = object.code || "";
                      dataStream.writeData({
                        type: "code-delta",
                        content: draftText,
                      });
                    }
                  }
                  dataStream.writeData({ type: "finish", content: "" });
                }

                enqueueTask(async () => {
                  await saveDocument({
                    id,
                    title: document.title,
                    content: draftText,
                    kind: document.kind,
                    userId: session.user.id,
                  });
                });

                return {
                  id,
                  title: document.title,
                  kind: document.kind,
                  content: "Document update in progress",
                };
              },
            },
            requestSuggestions: {
              description: "Request suggestions for a document",
              parameters: z.object({ documentId: z.string() }),
              execute: async ({ documentId }) => {
                const document = await getDocumentById(documentId);
                if (!document?.content) return { error: "Document not found" };

                const suggestions: any[] = [];
                const { elementStream } = streamObject({
                  model: languageModel,
                  system: `You are a writing assistant...`,
                  prompt: document.content,
                  output: "array",
                  schema: z.object({
                    originalSentence: z.string(),
                    suggestedSentence: z.string(),
                    description: z.string(),
                  }),
                });

                for await (const element of elementStream) {
                  const suggestion = {
                    originalText: element.originalSentence,
                    suggestedText: element.suggestedSentence,
                    description: element.description,
                    id: generateObjectId(),
                    documentId,
                    isResolved: false,
                  };
                  dataStream.writeData({
                    type: "suggestion",
                    content: suggestion,
                  });
                  suggestions.push(suggestion);
                }

                // enqueueTask(async () => {
                //   await saveSuggestions({
                //     suggestions: suggestions.map((s) => ({
                //       ...s,
                //       userId: session.user?.id!,
                //       createdAt: new Date(),
                //       documentCreatedAt: document.createdAt,
                //     })),
                //   });
                // });

                return {
                  id: documentId,
                  title: document.title,
                  kind: document.kind,
                  message: "Suggestions are being processed and streamed to user.",
                };
              },
            },
          },
          onFinish: async ({ response }) => {
            enqueueTask(async () => {
              try {
                const responseMessages = sanitizeResponseMessages(response.messages);
                const toSave: IMessage[] = responseMessages.map((msg) => ({
                  _id: generateObjectId(),
                  chat: chatId,
                  role: msg.role,
                  content: msg.content,
                })) as IMessage[];
                await saveMessages(toSave);
              } catch (error) {
                console.error("Failed to save messages:", error);
              }
            });

            localCache.set(cacheKey, response);
          },
        });

        result.mergeIntoDataStream(dataStream);
      },
    });
  } catch (error) {
    console.error("POST handler error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const session = await getSession();
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const chat = await findChatById(id);
    if (!chat) {
      return new NextResponse("Chat not found", { status: 404 });
    }
    if (chat.user !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    enqueueTask(async () => {
      await deleteChatById(id);
    });

    return new NextResponse("Chat deletion in progress...", { status: 200 });
  } catch (error) {
    console.error("DELETE handler error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
