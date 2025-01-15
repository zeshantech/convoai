"use client";
import React from "react";
import {
  Copy,
  RefreshCw,
  ThumbsDown,
  ThumbsUp,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";
import useSpeechSynthesis from "@/hooks/useSpeechSynthesis";
import MarkdownRenderer from "../MarkdownRenderer/MarkdownRenderer";
import { useUpdateMessage } from "@/hooks/useUpdateMessage";
import { capitalizeText } from "@/lib/utils";

interface AssistantMessageProps {
  content: string;
  vote?: "like" | "dislike";
  id: string;
}

const AssistantMessage: React.FC<AssistantMessageProps> = ({
  content,
  id,
  vote,
}) => {
  const { isPlaying, speak, stop } = useSpeechSynthesis();
  const { trigger: updateMessage } = useUpdateMessage();

  const handleVolume = () => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = content;
    const text = tempElement.innerText;

    if (isPlaying) {
      stop();
    } else {
      speak(text);
    }
  };

  const handleCopy = () => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = content;
    const text = tempElement.innerText;
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Message copied!"))
      .catch(() => toast.error("Failed to copy message."));
  };

  const handleThumbsUp = async () => {
    const userFeedback = window.prompt("Add some feedback (Optional)");
    const suggestion = userFeedback !== null ? userFeedback.trim() : "";
    await updateMessage({ id, suggestion, vote: "like" });
    toast.success("You liked the message!");
  };

  const handleThumbsDown = async () => {
    const userFeedback = window.prompt("Add some feedback (Optional)");
    const suggestion = userFeedback !== null ? userFeedback.trim() : "";
    await updateMessage({ id, suggestion, vote: "dislike" });
    toast.warning("You disliked the message.");
  };

  const handleRetry = () => {
    toast.info("Retrying...");
  };

  return (
    <div className="space-y-4 group">
      <div className="flex items-start gap-x-4">
        <Image
          src="/logo.png"
          width={36}
          height={36}
          alt="Assistant"
          className="rounded-full"
        />
        <div className="w-full overflow-x-auto p-3 rounded-xl">
          <MarkdownRenderer content={content} />
        </div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 flex flex-wrap items-center gap-1 ml-12">
        <Button
          size="icon"
          variant="ghost"
          onClick={handleVolume}
          aria-label={isPlaying ? "Stop Audio" : "Play Audio"}
          className="w-6 h-6"
        >
          {isPlaying ? <VolumeX /> : <Volume2 />}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleCopy}
          aria-label="Copy Message"
          className="w-6 h-6"
        >
          <Copy />
        </Button>
        {!vote ? (
          <>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleThumbsUp}
              aria-label="Thumbs Up"
              className="w-6 h-6"
            >
              <ThumbsUp />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleThumbsDown}
              aria-label="Thumbs Down"
              className="w-6 h-6"
            >
              <ThumbsDown />
            </Button>
          </>
        ) : (
          <div className="text-xs px-2 mt-0.5">{capitalizeText(vote)}</div>
        )}
        <Button
          size="icon"
          variant="ghost"
          onClick={handleRetry}
          aria-label="Retry Message"
          className="w-6 h-6"
        >
          <RefreshCw />
        </Button>
      </div>
    </div>
  );
};

export default AssistantMessage;
