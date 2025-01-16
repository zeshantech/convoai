import React from "react";
import { X } from "lucide-react";
import Image from "next/image";

export interface FileWithPreview extends File {
  preview: string;
}

interface ImagePreviewProps {
  file: FileWithPreview;
  onRemove: () => void;
  onExpand: () => void;
}

const getFileTypeIcon = (fileType: string) => {
  // Return different icons based on file type
  if (fileType.startsWith("image")) return null; // Images will use their preview
  if (fileType === "application/pdf") return "/icons/pdf.svg";
  if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return "/icons/word.svg";
  if (fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") return "/icons/excel.svg";
  if (fileType === "text/plain") return "/icons/txt.svg";
  if (fileType === "application/json") return "/icons/json.svg";
  return "/icons/file.svg"; // Default file icon
};

const ImagePreview: React.FC<ImagePreviewProps> = ({ file, onRemove, onExpand }) => {
  const isImage = file.type.startsWith("image");

  return (
    <div className="relative h-14 w-14">
      {isImage ? (
        <Image onClick={onExpand} src={file.url} alt="Uploaded File Preview" width={1} height={1} className="object-cover rounded w-full h-full cursor-pointer" />
      ) : (
        <div onClick={onExpand} className="flex items-center justify-center bg-gray-100 rounded w-full h-full cursor-pointer">
          <Image src={getFileTypeIcon(file.type) || "/icons/file.svg"} alt="File Icon" width={48} height={48} className="object-contain" />
        </div>
      )}
      <X onClick={onRemove} className="absolute -top-1 -right-1 h-4 w-4 bg-black opacity-50 hover:opacity-100 rounded-sm cursor-pointer text-white" />
    </div>
  );
};

export default ImagePreview;
