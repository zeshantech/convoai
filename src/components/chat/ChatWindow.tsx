"use client";

import React, { useState } from "react";
import AssistantMessage from "./AssistantMessage";
import UserMessage from "./UserMessage";
import { Message } from "ai/react";
import { useHotkeys } from "react-hotkeys-hook";

interface ChatWindowProps {
  messages: Array<Message>;
  onUpdateMessage: (id: string, newContent: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onUpdateMessage,
}) => {
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);

  useHotkeys(
    "esc",
    (event) => {
      if (editingMessageId) {
        event.preventDefault();
        setEditingMessageId(null);
      }
    },
    { enabled: !!editingMessageId }
  );

  const handleSave = (id: string, newContent: string) => {
    onUpdateMessage(id, newContent);
    setEditingMessageId(null);
  };

  return (
    <div className="space-y-6 p-4">
      {messages.map((msg) =>
        msg.role === "assistant" ? (
          <div className="w-full" key={msg.id}>
            <AssistantMessage content={msg.content} />
          </div>
        ) : (
          <div className="w-full" key={msg.id}>
            <UserMessage
              content={msg.content}
              isEditing={msg.id === editingMessageId}
              onCancel={() => setEditingMessageId(null)}
              onSave={(newContent) => handleSave(msg.id, newContent)}
              onEdit={() => setEditingMessageId(msg.id)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default ChatWindow;
