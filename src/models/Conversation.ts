import { Schema, Model, Document, model, models } from "mongoose";
import { IMessage, Message } from "./Message";

export interface IConversation extends Document {
  userId?: string;
  title: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new Schema<IConversation>(
  {
    userId: { type: String, required: false },
    title: { type: String, default: "" },
    messages: [{ ref: "Message", type: Message }],
  },
  { timestamps: true }
);

export const Conversation: Model<IConversation> = models.Conversation || model<IConversation>("Conversation", ConversationSchema);
