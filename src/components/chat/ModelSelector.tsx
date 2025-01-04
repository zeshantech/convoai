"use client";

import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SUPPORTED_MODELS, useModel } from "@/context/ModelContext";

export function ModelSelector() {
  const { selectedModel, setSelectedModel } = useModel();
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-64 justify-between">
          {SUPPORTED_MODELS.find((model) => model.id === selectedModel)?.label}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <Command>
          <CommandList className="hide-scrollbar">
            <CommandGroup>
              {SUPPORTED_MODELS.map((model) => (
                <CommandItem
                  key={model.id}
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedModel(model.id);
                    setOpen(false);
                  }}
                >
                  <div className="flex flex-col">
                    <span>{model.label}</span>
                    <span className="text-xs text-muted-foreground">{model.description}</span>
                  </div>
                  <Check className={cn("ml-auto", selectedModel === model.id ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
