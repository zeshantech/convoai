import { Thread } from "@assistant-ui/react";
import { makeMarkdownText } from "@assistant-ui/react-markdown";
import remarkGfm from "remark-gfm";
import { makePrismAsyncSyntaxHighlighter } from "@assistant-ui/react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { ChatSidebar } from "./ChatSidebar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import ChatHeader from "./ChatHeader";

export const MarkdownText = makeMarkdownText({
  remarkPlugins: [remarkGfm],
  components: {
    SyntaxHighlighter: makePrismAsyncSyntaxHighlighter({
      style: coldarkDark,
      customStyle: {
        margin: 0,
        backgroundColor: "black",
      },
    }),
  },
});

export const ChatMainComponent = () => {
  return (
    <div className="bg-background h-full relative">
      <Thread
        assistantMessage={{ components: { Text: MarkdownText } }}
        welcome={{
          suggestions: [
            {
              text: "Write a poem",
              prompt: "Write me a poem about the weather",
            },
            {
              text: "What is assistant-ui?",
              prompt: "Psst: assistant-ui is a react component library for AI chatbots.\n\nWhat is assistant-ui?",
            },
          ],
        }}
      />
    </div>
  );
};
