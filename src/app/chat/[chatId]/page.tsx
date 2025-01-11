// "use client";

// import React, { useEffect, useRef } from "react";
// import MainInput from "@/components/chat/MainInput";
// import { useModel } from "@/context/ModelContext";
// import { generateObjectId, isValidObjectId } from "@/lib/utils";
// import { useParams, useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { useSWRConfig } from "swr";
// import { useChat } from "ai/react";
// import { useGetMessages } from "@/hooks/useGetMessages";
// import ChatWindow from "@/components/chat/ChatWindow";

// export default function Page() {
//   const { selectedModelId } = useModel();
//   const { mutate } = useSWRConfig();
//   const { chatId } = useParams<{ chatId: string }>();
//   const router = useRouter();
//   const IS_NEW_CHAT = chatId === "n";

//   const { data: chats, isLoading, error } = useGetMessages(chatId);

//   const {
//     messages,
//     input,
//     setInput,
//     handleSubmit,
//     isLoading: isChatLoading,
//     stop,
//     ...chatProps
//   } = useChat({
//     id: chatId,
//     body: { modelId: selectedModelId, chatId },
//     initialMessages: chats || [],
//     experimental_throttle: 100,
//     onFinish: () => {
//       mutate("/api/history");
//     },
//     onError: (error: Error) => toast.error(error.message),
//   });

//   const chatWindowRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!chatId) return;
//     if (chatId === "n") return;

//     if (!isValidObjectId(chatId)) {
//       router.replace("/chat/n");
//     }
//   }, [chatId, router]);

//   const handleOnSubmit = async () => {
//     const objectId = generateObjectId();
//     if (IS_NEW_CHAT) {
//       router.replace(`/chat/${objectId}`);
//     }
//     await handleSubmit();
//   };

//   useEffect(() => {
//     // Scroll to the bottom when new messages arrive
//     if (chatWindowRef.current) {
//       chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
//     }
//   }, [messages]);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-gray-500">Loading chats...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-red-500">Failed to load chats.</div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-full">
//       <main
//         className="flex-1 overflow-y-auto py-4 px-4 md:px-32"
//         ref={chatWindowRef}
//       >
//         <ChatWindow messages={messages} />
//       </main>
//       <footer className="p-4 bg-background shadow sticky bottom-0">
//         <MainInput
//           handleSubmit={handleOnSubmit}
//           input={input}
//           setInput={setInput}
//           isLoading={isChatLoading}
//           stop={stop}
//           {...chatProps}
//         />
//       </footer>
//     </div>
//   );
// }

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
  const { selectedModelId } = useModel();
  const { mutate } = useSWRConfig();
  const { chatId } = useParams<{ chatId: string }>();
  const router = useRouter();
  const IS_NEW_CHAT = chatId === "n";

  const { data: chats, isLoading, error } = useGetMessages(chatId);

  const {
    messages,
    input,
    setInput,
    handleSubmit,
    isLoading: isChatLoading,
    stop,
    ...chatProps
  } = useChat({
    id: chatId,
    body: { modelId: selectedModelId, chatId },
    initialMessages: chats || [],
    experimental_throttle: 100,
    onFinish: () => {
      mutate("/api/history");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatId) return;
    if (chatId === "n") return;

    if (!isValidObjectId(chatId)) {
      router.replace("/chat/n");
    }
  }, [chatId, router]);

  const handleOnSubmit = async () => {
    const objectId = generateObjectId();
    if (IS_NEW_CHAT) {
      router.replace(`/chat/${objectId}`);
    }
    handleSubmit();
  };

  const handleUpdateMessage = (id: string, newContent: string) => {
    // Update the message locally
    // Assuming messages are managed in state, update accordingly
    // This might involve updating the SWR cache or triggering a re-fetch
    mutate(
      "/api/history",
      (currentData: any) => {
        return currentData.map((msg: Message) =>
          msg.id === id ? { ...msg, content: newContent } : msg
        );
      },
      false
    );
    toast.success("Message updated!");
  };

  useEffect(() => {
    // Scroll to the bottom when new messages arrive
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

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
      <main
        className="flex-1 overflow-y-auto py-4 px-4 md:px-32"
        ref={chatWindowRef}
      >
        <ChatWindow messages={messages} onUpdateMessage={handleUpdateMessage} />
      </main>
      <footer className="p-4 bg-muted shadow sticky bottom-2 mx-2">
        <MainInput
          handleSubmit={handleOnSubmit}
          input={input}
          setInput={setInput}
          isLoading={isChatLoading}
          stop={stop}
          {...chatProps}
        />
      </footer>
    </div>
  );
}

//     <div className="flex flex-col h-full">
//
//       <footer className="p-4 bg-background shadow sticky bottom-0">
//         <MainInput
//           handleSubmit={handleOnSubmit}
//           input={input}
//           setInput={setInput}
//           isLoading={isChatLoading}
//           stop={stop}
//           {...chatProps}
//         />
//       </footer>
//     </div>
