"use client";

import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import { Expand, Link2, SendHorizontal, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import ImagePreview, { FileWithPreview } from "./ImagePreview";
import { UseChatHelpers } from "ai/react";
import { useUploadFiles } from "@/hooks/mutate/useUploadFile";

export default function MainInput({ handleSubmit, input, setInput, isLoading, stop }: UseChatHelpers) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const { trigger, isMutating: isFileUploading } = useUploadFiles();

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const filesWithPreview = await Promise.all(
      files.map(async (file) =>
        Object.assign(file, {
          preview: await trigger(file),
        })
      )
    );
    setSelectedFiles((prev) => [...prev, ...filesWithPreview]);
  };

  const handleOnSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    handleSubmit(e, {
      experimental_attachments: selectedFiles.map((file) => ({
        url: file.preview,
        contentType: file.type,
        name: file.name,
      })),
    });
    setSelectedFiles([]);
  };

  const handleExpand = () => {
    console.log("Expand action triggered");
  };

  const handleRemoveImage = (image: FileWithPreview) => {
    setSelectedFiles((prev) => prev.filter((img) => img !== image));
    URL.revokeObjectURL(image.preview);
  };

  const handleExpandImage = (image: FileWithPreview) => {
    window.open(image.preview, "_blank");
  };

  return (
    <form className="relative bg-muted px-4 py-2 flex flex-col space-y-2" onSubmit={handleOnSubmit}>
      {selectedFiles.length > 0 && (
        <div className="absolute -translate-y-full -top-2 left-4 flex flex-wrap gap-2">
          {selectedFiles.map((file) => (
            <ImagePreview key={file.preview} image={file} onExpand={() => handleExpandImage(file)} onRemove={() => handleRemoveImage(file)} />
          ))}
        </div>
      )}

      <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask ConvoAI" className="flex-1 pr-12 resize-none" />

      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} multiple />

      <div className="flex justify-between">
        <Button loading={isFileUploading} variant="outline" size="icon" onClick={handleFileClick} aria-label="Attach File">
          <Link2 />
        </Button>

        {isLoading ? (
          <Button size="icon" onClick={stop} aria-label="Stop">
            <Pause />
          </Button>
        ) : (
          <Button type="submit" size="icon" aria-label="Send" disabled={!input.trim()} className={`${!input.trim() ? "cursor-not-allowed" : ""}`}>
            <SendHorizontal />
          </Button>
        )}
      </div>

      <Button size="icon" variant="outline" onClick={handleExpand} aria-label="Expand" className="absolute top-0 right-4">
        <Expand />
      </Button>
    </form>
  );
}
