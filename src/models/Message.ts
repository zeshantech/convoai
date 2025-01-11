import { Document, model, Model, models, Schema } from "mongoose";
import { IChat } from "./Chat";

export type IRole = "system" | "user" | "assistant" | "data" | "tool";

export interface IMessage extends Document {
  chat: string | IChat;
  role: IRole;
  content: any;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema: Schema<IMessage> = new Schema(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

export const Message: Model<IMessage> = models.Message || model<IMessage>("Message", MessageSchema);
