import mongoose, { Document as MDocument, Model, Schema } from "mongoose";
import { IUser } from "./User";

export type DocumentKind = "file" | "text" | "code";

export interface IDocument extends MDocument {
  title: string;
  fileUrl: string;
  kind: DocumentKind;
  content: string;
  user: string | IUser;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema: Schema<IDocument> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    fileUrl: {
      type: String,
    },
    content: {
      type: String,
      default: "",
    },
    kind: {
      type: String,
      enum: ["file", "text", "code"],
      required: true,
      default: "text",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Document: Model<IDocument> = mongoose.models.Document || mongoose.model<IDocument>("Document", DocumentSchema);
