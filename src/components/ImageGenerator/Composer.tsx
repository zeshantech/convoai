import React from "react";
import { Mic, CornerDownLeft, AudioLines } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IForm } from "./types";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";

interface ComposerProps {
  register: UseFormRegister<IForm>;
  setValue: UseFormSetValue<IForm>;
  onSubmit: () => void;
}

const Composer: React.FC<ComposerProps> = ({ onSubmit, register, setValue }) => {
  const { isRecording, startRecording, stopRecording } = useSpeechRecognition((recognizedText) => {
    setValue("prompt", recognizedText);
  });

  const handleOnUseMicrophone = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  return (
    <form
      className="bg-background focus-within:ring-ring relative overflow-hidden rounded-md border focus-within:ring-1"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Textarea id="prompt" {...register("prompt")} placeholder="Add your Prompt" className="h-12 resize-none hide-scrollbar border-0" />
      <div className="flex items-end p-2">
        <Tooltip>
          <TooltipContent>Use Microphone</TooltipContent>
          <TooltipTrigger>
            <Button variant="ghost" size="icon" onClick={handleOnUseMicrophone} type="button">
              {isRecording ? <AudioLines className="h-4 w-4 animate-pulse text-red-500" /> : <Mic className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
        </Tooltip>
        <Button type="submit" size="sm" className="ml-auto">
          Generate Image
          <CornerDownLeft />
        </Button>
      </div>
    </form>
  );
};

export default Composer;
