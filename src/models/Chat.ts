import { Document, model, Model, models, Schema } from "mongoose";
import toJSON from "@/plugins/toJSON";

export type Visibility = "public" | "private";

export interface IChat extends Document {
  id: string; // Added to recognize the transformed id field
  title: string;
  user: Schema.Types.ObjectId | string;
  visibility: Visibility;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema: Schema<IChat> = new Schema(
  {
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      required: true,
      default: "private",
    },
  },
  { timestamps: true }
);

ChatSchema.plugin(toJSON);

export const Chat: Model<IChat> =
  models.Chat || model<IChat>("Chat", ChatSchema);
