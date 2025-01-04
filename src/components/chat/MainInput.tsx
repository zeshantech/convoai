"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import { Expand, Link2, SendHorizontal, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import ImagePreview, { FileWithPreview } from "./ImagePreview";
import { Message } from "ai";
import { toast } from "sonner";
import { useChat } from "ai/react";
import { useSWRConfig } from "swr";

export default function MainInput() {
  const { mutate } = useSWRConfig();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);

  const { messages, setMessages, handleSubmit, input, setInput, append, isLoading, stop, reload } = useChat({
    id: "",
    body: { modelId: "selectedModelId" },
    initialMessages: INIT_MESSAGES,
    experimental_throttle: 100,
    onFinish: () => {
      mutate("/api/history");
    },
    api: "/api/chat",
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const filesWithPreview = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setSelectedFiles(filesWithPreview);
  };

  const handleOnSubmit = () => {
    handleSubmit();
    console.log("Submitted:", inputValue);
    setIsStreaming(true);
    setInputValue("");
    setSelectedFiles([]);
  };

  const handleStop = () => {
    setIsStreaming(false);
    console.log("Stop action triggered");
  };

  const handleExpand = () => {
    console.log("Expand action triggered");
  };

  const handleRemoveImage = (image: FileWithPreview) => {
    setSelectedFiles((prev) => prev.filter((img) => img !== image));
    URL.revokeObjectURL(image.preview);
  };

  // Expand image (opens in a new tab)
  const handleExpandImage = (image: FileWithPreview) => {
    window.open(image.preview, "_blank");
  };

  return (
    <div className="relative md:w-10/12 mx-auto h-24">
      <Textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ask ConvoAI" className="resize-none rounded-xl bg-gray-900/10 h-full pr-16 pb-10 hide-scrollbar" />

      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} multiple />
      <Button variant="link" size={"icon"} onClick={handleFileClick} className="absolute bottom-1 left-1" aria-label="Attach File">
        <Link2 />
      </Button>

      {isStreaming ? (
        <Button size={"icon"} onClick={handleStop} className="absolute bottom-1 right-1 rounded-full h-8 w-8" aria-label="Stop">
          <Pause />
        </Button>
      ) : (
        <Button size={"icon"} onClick={handleOnSubmit} className={`absolute bottom-1 right-1 rounded-full h-8 w-8 ${!inputValue.trim() ? "opacity-50 cursor-not-allowed" : ""}`} aria-label="Send" disabled={!inputValue.trim()}>
          <SendHorizontal />
        </Button>
      )}

      <Button variant="link" size={"icon"} onClick={handleExpand} className="absolute top-1 right-1" aria-label="Expand">
        <Expand />
      </Button>

      <div className="flex gap-1 absolute -top-2/3 mx-1">
        {selectedFiles.map((file) => (
          <ImagePreview key={file.preview} image={file} onExpand={() => handleExpandImage(file)} onRemove={() => handleRemoveImage(file)} />
        ))}
      </div>
    </div>
  );
}

const INIT_MESSAGES: Array<Message> = [
  {
    id: "1",
    content: "Hello, how can I help you today?",
    role: "assistant",
  },
  {
    id: "2",
    content: "I need help with my order",
    role: "user",
  },
  {
    id: "3",
    content: "Sure, what is your order number?",
    role: "assistant",
  },
  {
    id: "4",
    content: "123456",
    role: "user",
  },
  {
    id: "5",
    content: "Thank you, let me check that for you",
    role: "assistant",
  },
  {
    id: "6",
    content: "You're welcome",
    role: "user",
  },
];
