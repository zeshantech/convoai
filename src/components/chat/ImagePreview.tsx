// components/ImagePreview.tsx
import React from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface ImagePreviewProps {
  image: FileWithPreview;
  onRemove: () => void;
  onExpand: () => void;
}

export interface FileWithPreview extends File {
  preview: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ image, onRemove, onExpand }) => {
  return (
    <div className="relative h-14 w-h-14">
      <Image onClick={onExpand} src={image.preview} alt="Uploaded" width={1} height={1} className="object-cover rounded w-full h-full" />
     
        <X onClick={onRemove} className="absolute -top-1 -right-1 h-4 w-4 bg-black opacity-50 hover:opacity-100 rounded-sm cursor-pointer text-white" />
    </div>
  );
};

export default ImagePreview;
