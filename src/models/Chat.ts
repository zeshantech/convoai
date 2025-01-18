import { Document, Model, model, models, Schema, PaginateModel } from "mongoose";
import toJSON from "@/plugins/toJSON";
import mongoosePaginate from "mongoose-paginate-v2";

export type Visibility = "public" | "private";

export interface IChat extends Document {
  id: string;
  title: string;
  user: Schema.Types.ObjectId | string;
  visibility: Visibility;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new Schema<IChat>(
  {
    title: { type: String, required: true, trim: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    visibility: { type: String, enum: ["public", "private"], required: true, default: "private" },
  },
  { timestamps: true }
);

ChatSchema.plugin(toJSON);
ChatSchema.plugin(mongoosePaginate);

export const Chat: PaginateModel<IChat> = (models.Chat as PaginateModel<IChat>) || model<IChat, PaginateModel<IChat>>("Chat", ChatSchema);
