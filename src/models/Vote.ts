import { Document, model, Model, models, Schema } from "mongoose";
import { IChat } from "./Chat";
import { IMessage } from "./Message";

export interface IVote extends Document {
  chat: string | IChat;
  message: string | IMessage;
  vote: "up" | "down";
  suggestion: string;
  createdAt: Date;
  updatedAt: Date;
}

const VoteSchema: Schema<IVote> = new Schema(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    message: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      required: true,
    },
    vote: {
      type: String,
      required: true,
    },
    suggestion: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Vote: Model<IVote> = models.Vote || model<IVote>("Vote", VoteSchema);
