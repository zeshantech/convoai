/** ==============================
 *            CHATS
 ============================== */

import { NotFoundException } from "@/lib/exceptions";
import { Chat } from "@/models/Chat";
import { Document, DocumentKind } from "@/models/Document";
import { IMessage, Message } from "@/models/Message";

export async function saveChat({ id, userId, title }: { id: string; userId: string; title: string }) {
  const chat = await Chat.findByIdAndUpdate(
    id,
    {
      _id: id,
      userId,
      title,
    },
    { upsert: true, new: true }
  );

  return chat;
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
  return selectedChat;
}

/** ==============================
 *           MESSAGES
 ============================== */

export async function saveMessages(messages: Pick<IMessage, "content" | "role" | "chat">[]) {
  const inserted = await Message.insertMany(messages);
  return inserted;
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

export async function saveDocument({ id, title, kind, content, userId }: { id: string; title: string; kind: DocumentKind; content: string; userId: string }) {
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
