"use client";

import React, { useEffect, useRef } from "react";
import MainInput from "@/components/chat/MainInput";
import { useModel } from "@/context/ModelContext";
import { generateObjectId, isValidObjectId } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { Message, useChat } from "ai/react";
import { useGetMessages } from "@/hooks/useGetMessages";
import ChatWindow from "@/components/chat/ChatWindow";

export default function Page() {
  const { selectedModel } = useModel();
  const router = useRouter();
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const { mutate } = useSWRConfig();
  const { chatId } = useParams<{ chatId: string }>();

  const { data: chats, isLoading, error } = useGetMessages(chatId);

  const { messages, ...chatProps } = useChat({
    id: chatId,
    body: { modelId: selectedModel.id, chatId },
    initialMessages: chats || [],
    experimental_throttle: 100,
    onFinish: () => {
      mutate("/api/history");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!chatId) return;
    if (!isValidObjectId(chatId)) {
      router.replace(`/chat/${generateObjectId()}`);
    }
  }, [chatId, router]);

  const handleUpdateMessage = (id: string, newContent: string) => {
    mutate(
      "/api/history",
      (currentData: any) => {
        return currentData.map((msg: Message) => (msg.id === id ? { ...msg, content: newContent } : msg));
      },
      false
    );
    toast.success("Message updated!");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Loading chats...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Failed to load chats.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 overflow-y-auto py-4 px-4 md:px-32" ref={chatWindowRef}>
        <ChatWindow messages={messages} onRetry={chatProps.reload} onUpdateMessage={handleUpdateMessage} />
      </main>
      <footer className="sticky bottom-0">
        <MainInput messages={messages} {...chatProps} />
      </footer>
    </div>
  );
}
