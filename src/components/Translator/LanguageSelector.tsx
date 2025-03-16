"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { cn } from "@/lib/utils";
import { languages } from "./constants";

interface LanguageSelectorProps {
  type?: "source" | "target";
  value: string;
  onChange: (value: string) => void;
}

export default function LanguageSelector({ type = "source", value, onChange }: LanguageSelectorProps) {
  const [open, setOpen] = useState<boolean>(false);

  const popularLanguages = getPopularLanguages(type, value);

  return (
    <div className="flex items-center gap-1">
      {[...new Set(popularLanguages)].slice(0, 4).map((lng) => (
        <Button size="sm" key={lng} variant={value === lng ? "default" : "outline"} className="capitalize" onClick={() => onChange(lng)}>
          {lng}
        </Button>
      ))}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button size="icon" className="h-8" variant="outline">
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search language..." className="h-9" />
            <CommandList className="hide-scrollbar">
              <CommandGroup>
                {languages.map((lang) => (
                  <CommandItem key={lang} value={lang} onSelect={() => onChange(lang)}>
                    {lang}
                    <Check className={cn("ml-auto", value === lang ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

const getPopularLanguages = (type: "source" | "target", value: string): string[] => {
  if (type === "source") return ["auto-detect", value, "english", "french", "german", "italian"];
  return [value, "english", "spanish", "french", "german", "italian"];
};
