"use client";

import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SUPPORTED_MODELS, useModel } from "@/context/ModelContext";
import { useSession } from "next-auth/react";
import { Separator } from "../ui/separator";
import Image from "next/image";

export function ModelSelector() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const { selectedModel, setSelectedModelId } = useModel();

  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-64 justify-between">
          {SUPPORTED_MODELS.find((model) => model.id === selectedModel.id)?.label}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0">
        <Command>
          <CommandList className="hide-scrollbar">
            <CommandGroup>
              {SUPPORTED_MODELS.map((model) => {
                const disabled = !isAuthenticated && !model.isPublic;
                if (disabled) {
                  return <></>;
                }

                return (
                  <CommandItem
                    key={model.id}
                    className="cursor-pointer space-x-2"
                    onSelect={() => {
                      setSelectedModelId(model.id);
                      setOpen(false);
                    }}
                  >
                    <Image src={model.image} width={24} height={24} alt={model.label} />
                    <div className="flex flex-col relative w-full">
                      <span>{model.label}</span>
                      <span className="text-xs text-muted-foreground">{model.description}</span>
                    </div>
                    <Check className={cn("ml-auto", selectedModel.id === model.id ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                );
              })}
              {!isAuthenticated ? (
                <>
                  <Separator className="my-2" />
                  <Button className="w-full">Login to use more Modals</Button>
                </>
              ) : null}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
