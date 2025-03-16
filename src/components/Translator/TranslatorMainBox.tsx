"use client";

import { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { Button } from "../ui/button";
import { ArrowLeftRight } from "lucide-react";
import TranslationTextArea from "./TranslationTextArea";
import TranslatorSelector from "./TranslatorSelector";
import { useTranslator } from "@/hooks/useTranslator";
import { Spinner } from "../ui/Spinner";

export default function TranslatorMainBox() {
  const [sourceLang, setSourceLang] = useState("auto-detect");
  const [targetLang, setTargetLang] = useState("english");
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [selectedTranslator, setSelectedTranslator] = useState<ITranslators>("g-translate");

  const { trigger, isMutating, error } = useTranslator();

  const debouncedTranslate = debounce(async (text: string) => {
    if (text) {
      const result = await trigger({ text, sourceLang, targetLang, translator: selectedTranslator });
      setTranslatedText(result);
    }
  }, 1000);

  useEffect(() => {
    debouncedTranslate(sourceText);
    return () => debouncedTranslate.cancel();
  }, [sourceText, sourceLang, targetLang, selectedTranslator]);

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <TranslatorSelector value={selectedTranslator} onChange={setSelectedTranslator} />
      </div>

      <div className="grid grid-cols-2 gap-4 relative">
        <TranslationTextArea type="source" value={sourceText} onChange={setSourceText} language={sourceLang} onLanguageChange={setSourceLang} />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Button variant="outline" size="icon" className="rounded-full" onClick={handleSwapLanguages}>
            {isMutating ? <Spinner /> : <ArrowLeftRight />}
          </Button>
        </div>

        <TranslationTextArea type="target" value={translatedText} onChange={setTranslatedText} language={targetLang} onLanguageChange={setTargetLang} errorMessage={(error as IError)?.message} />
      </div>

      {/* Footer remains same */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex gap-4">
          <Button variant="ghost" className="text-muted-foreground">
            Save to Phrasebook
          </Button>
          <Button variant="ghost" className="text-muted-foreground">
            Share
          </Button>
          <Button variant="ghost" className="text-muted-foreground">
            Feedback
          </Button>
        </div>
        <div className="text-muted-foreground">Use translations responsibly</div>
      </div>
    </div>
  );
}
