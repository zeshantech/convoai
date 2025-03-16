"use client";
import { ChangeEvent } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Mic, Keyboard, Copy, Volume2, AlertTriangle } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import useSpeechSynthesis from "@/hooks/useSpeechSynthesis";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";
import { toast } from "sonner";
import VirtualKeyboard from "../ui/VirtualKeyboard";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface TranslationTextAreaProps {
  type: "source" | "target";
  value: string;
  onChange: (value: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
  errorMessage?: string;
}

export default function TranslationTextArea({ type, value, errorMessage, onChange, language, onLanguageChange }: TranslationTextAreaProps) {
  const { isRecording, startRecording, stopRecording } = useSpeechRecognition((text) => {
    onChange(text);
  });

  const { speak, isPlaying, stop } = useSpeechSynthesis(language);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleCopyToClipboard = async () => {
    await navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <LanguageSelector type={type} value={language} onChange={onLanguageChange} />
      </div>

      <Popover>
        <div className="border p-1 rounded relative">
          <Textarea readOnly={type === "target"} className="border-none shadow-none resize-none focus-visible:ring-0 min-h-36 hide-scrollbar" placeholder={type === "source" ? "Enter text" : "Translation"} value={value} onChange={handleTextChange} />

          <div className="flex items-center justify-end">
            {type === "source" ? (
              <div>
                <Button variant={isRecording ? "secondary" : "ghost"} size="icon" onClick={() => (isRecording ? stopRecording() : startRecording())}>
                  <Mic />
                </Button>
                <PopoverTrigger>
                  <Button variant="ghost" size="icon">
                    <Keyboard />
                  </Button>
                </PopoverTrigger>
              </div>
            ) : (
              <div>
                <Button variant="ghost" size="icon" onClick={handleCopyToClipboard}>
                  <Copy />
                </Button>
                <Button variant={isPlaying ? "secondary" : "ghost"} size="icon" onClick={() => (isPlaying ? stop() : speak(value))}>
                  <Volume2 />
                </Button>
              </div>
            )}
            {errorMessage ? <AlertTriangle /> : null}
          </div>
        </div>

        <PopoverContent className="w-156 p-0">
          <VirtualKeyboard onChange={onChange} language={language} value={value} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
