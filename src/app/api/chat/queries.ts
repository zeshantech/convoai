/** ==============================
 *            CHATS
 ============================== */

import { NotFoundException } from "@/lib/exceptions";
import { Chat, IChat } from "@/models/Chat";
import { Document, DocumentKind } from "@/models/Document";
import { IMessage, Message } from "@/models/Message";
import { RootFilterQuery } from "mongoose";

export async function createOrUpdateChat(id: string, params: Partial<IChat>) {
  const chat = await Chat.findByIdAndUpdate(id, params, {
    upsert: true,
    new: true,
  });

  return chat?.toJSON();
}

export async function deleteChatById(id: string) {
  const result = await Chat.findByIdAndDelete(id);
  if (!result) {
    throw new NotFoundException("Chat not found");
  }
}

export async function getChatsByUserId(id: string) {
  const chats = await Chat.find({ userId: id })
    .sort({ createdAt: -1 }) // descending
    .exec();

  return chats;
}

export async function findChatById(id: string) {
  const selectedChat = await Chat.findById(id).exec();

  return selectedChat?.toJSON();
}

export async function updateChatById(id: string, updates: Partial<IChat>) {
  const updatedChat = await Chat.findByIdAndUpdate(id, updates, { new: true });
  if (!updatedChat) {
    throw new NotFoundException("Chat not found");
  }

  return updatedChat;
}

export async function updateChatByFilters(
  params: RootFilterQuery<IChat>,
  updates: Partial<IChat>
) {
  const updatedChat = await Chat.findOneAndUpdate(params, updates, {
    new: true,
  });
  if (!updatedChat) {
    throw new NotFoundException("Chat not found");
  }

  return updatedChat;
}

/** ==============================
 *           MESSAGES
 ============================== */

export async function saveMessages(messages: Partial<IMessage>[]) {
  const inserted = await Message.insertMany(messages);

  return inserted;
}

export async function saveMessage(message: Partial<IMessage>) {
  const inserted = await Message.create(message);

  return inserted.toJSON();
}

export async function getMessagesByChatId(id: string) {
  const msgs = await Message.find({ chatId: id })
    .sort({ createdAt: 1 }) // ascending
    .exec();

  return msgs;
}

/** ==============================
 *          DOCUMENTS
 ============================== */

export async function saveDocument({
  id,
  title,
  kind,
  content,
  userId,
}: {
  id: string;
  title: string;
  kind: DocumentKind;
  content: string;
  userId: string;
}) {
  // Upsert, if you want to allow updates
  const doc = await Document.findByIdAndUpdate(
    id,
    {
      _id: id,
      title,
      kind,
      content,
      user: userId,
    },
    { upsert: true, new: true }
  );

  return doc;
}

export async function getDocumentsById({ id }: { id: string }) {
  const docs = await Document.find({ _id: id }).sort({ createdAt: 1 }).exec();

  return docs;
}

export async function getDocumentById(id: string) {
  const selectedDocument = await Document.findById(id);

  return selectedDocument;
}
