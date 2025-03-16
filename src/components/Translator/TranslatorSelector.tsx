"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function TranslatorSelector({ value, onChange }: { value: string; onChange: (value: ITranslators) => void }) {
  return (
    <Select value={value} onValueChange={(v: ITranslators) => onChange(v)}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select translator" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="g-translate">Google Translate</SelectItem>
        <SelectItem value="openai">Open AI</SelectItem>
        <SelectItem value="anthropic">Anthropic</SelectItem>
      </SelectContent>
    </Select>
  );
}
