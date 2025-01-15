import { Document, model, Model, models, Schema } from "mongoose";
import { IChat } from "./Chat";
import toJSON from "@/plugins/toJSON";

export type IRole = "system" | "user" | "assistant" | "data" | "tool";

export interface IMessage extends Document {
  chat: string | IChat;
  role: IRole;
  content: any;
  vote: "like" | "dislike";
  suggestion: string;
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
    vote: {
      type: String,
    },
    suggestion: {
      type: String,
    },
  },
  { timestamps: true }
);

MessageSchema.plugin(toJSON);

export const Message: Model<IMessage> =
  models.Message || model<IMessage>("Message", MessageSchema);
