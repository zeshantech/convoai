import NextAuth from "ai";

declare module "ai" {
  interface Message {
    vote?: "like" | "dislike";
    suggestion?: string;
  }
}
