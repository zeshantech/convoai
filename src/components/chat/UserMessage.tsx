"use client";

import React, { useState, useRef, useEffect } from "react";
import { Edit, Edit2, Pen } from "lucide-react";
import Typography from "@/components/ui/Typography";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface UserMessageProps {
  content: string;
  onSave: (newContent: string) => void;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
}

const UserMessage: React.FC<UserMessageProps> = ({
  content,
  onSave,
  isEditing,
  onEdit,
  onCancel,
}) => {
  const [inputValue, setInputValue] = useState(content);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  const handleSaveClick = () => {
    if (inputValue.trim() === "") {
      toast.error("Message cannot be empty.");
      return;
    }
    onSave(inputValue.trim());
  };

  return (
    <div className="w-full group">
      <div
        className={`flex gap-2 ${
          isEditing ? "w-full" : "justify-end ml-auto w-fit"
        }`}
      >
        {!isEditing && (
          <Button
            onClick={onEdit}
            variant="link"
            size="icon"
            className="opacity-0 group-hover:opacity-100"
          >
            <Pen />
          </Button>
        )}
        <div
          className={`bg-muted relative  md:max-w-2xl p-4 rounded-3xl w-full`}
        >
          <div>
            {isEditing ? (
              <textarea
                ref={textareaRef}
                rows={3}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="resize-none overflow-auto bg-transparent w-full outline-none p-2 pr-24 text-sm"
                placeholder="Edit your message..."
              />
            ) : (
              <Typography
                onDoubleClick={onEdit}
                className="cursor-pointer break-words"
              >
                {content}
              </Typography>
            )}
          </div>
          {isEditing && (
            <div className="flex justify-end space-x-2">
              <Button
                className="rounded-full"
                variant="secondary"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button className="rounded-full" onClick={handleSaveClick}>
                Save
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
