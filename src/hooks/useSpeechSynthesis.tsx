import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface VoiceOption {
  name: string;
  lang: string;
}

const useSpeechSynthesis = (defaultLang: string = "en-US") => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      toast.error("Text-to-Speech is not supported in your browser.");
      return;
    }

    const synth = window.speechSynthesis;

    const populateVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(
        availableVoices.map((voice) => ({
          name: voice.name,
          lang: voice.lang,
        }))
      );

      // Set default voice
      const defaultVoice =
        availableVoices.find((voice) => voice.lang === defaultLang) ||
        availableVoices[0];
      setSelectedVoice(defaultVoice);
    };

    populateVoices();

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoices;
    }
  }, [defaultLang]);

  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) {
      toast.error("Text-to-Speech is not supported in your browser.");
      return;
    }

    if (isPlaying) {
      toast.warning("Audio is already playing.");
      return;
    }

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice?.lang || defaultLang;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => {
      toast.error("Failed to play audio.");
      setIsPlaying(false);
    };

    synth.speak(utterance);
  };

  const stop = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return {
    isPlaying,
    voices,
    selectedVoice,
    setSelectedVoice,
    speak,
    stop,
  };
};

export default useSpeechSynthesis;
