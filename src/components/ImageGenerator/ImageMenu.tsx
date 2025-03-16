import React from "react";
import { Button } from "../ui/button";
import { Copy, Download } from "lucide-react";

interface ImageMenuProps {
  src: string;
}

export default function ImageMenu({ src }: ImageMenuProps) {
  const handleOnDownload = () => {
    const link = document.createElement("a");
    link.href = src;
    link.download = "image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOnCopyImage = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const item = new ClipboardItem({ [blob.type]: blob });
      await navigator.clipboard.write([item]);
      alert("Image copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy image: ", err);
    }
  };

  return (
    <div className="space-x-1 absolute right-1 top-1">
      <Button size="icon" variant="secondary" onClick={handleOnDownload}>
        <Download />
      </Button>

      <Button size="icon" variant="secondary" onClick={handleOnCopyImage}>
        <Copy />
      </Button>
    </div>
  );
}
