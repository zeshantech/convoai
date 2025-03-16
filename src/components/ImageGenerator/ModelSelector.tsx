"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { MODELS } from "./constants";

interface ModelSelectorProps {
  selectedModelId: string;
  onModelChange: (modelId: string) => void;
}

export default function ModelSelector({ onModelChange, selectedModelId }: ModelSelectorProps) {
  const selectedModel = MODELS.find((model) => model.id === selectedModelId);

  return (
    <div className="space-y-2">
      <Label htmlFor="model">Model</Label>
      <Select value={selectedModelId} onValueChange={onModelChange}>
        <SelectTrigger id="model" className="items-start">
          <SelectValue placeholder="Select a model">{selectedModel?.label}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {MODELS.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              <div className="flex items-center gap-3 ">
                <Image src={model.image} width={24} height={24} alt={model.provider} />
                <div className="space-y-0.5">
                  <p>
                    {model.provider} <span className="font-medium">{model.label}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{model.description}</p>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
