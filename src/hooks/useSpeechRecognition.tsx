import { useState, useRef } from "react";

export default function useSpeechRecognition(onSpeechRecognized: (text: string) => void) {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const recognition = new (window.SpeechRecognition || webkitSpeechRecognition)();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        onSpeechRecognized(transcript);
        stopRecording();
      };

      recognition.start();
      setIsRecording(true);

      recognition.onerror = (error) => {
        console.error("Speech recognition error:", error);
        stopRecording();
      };
      recognition.onend = () => {
        setIsRecording(false);
      };
    } catch (error) {
      console.error("Microphone error:", error);
      stopRecording();
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
    setIsRecording(false);
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
  };
}
