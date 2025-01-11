"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Model = (typeof SUPPORTED_MODELS)[number];

interface ModelContextType {
  selectedModelId: Model["id"];
  setSelectedModelId: (id: Model["id"]) => void;
}

const LOCAL_STORAGE_KEY = "selectedModelId";

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export const ModelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedModelId, setSelectedModelId] = useState<Model["id"]>("gpt-4o-mini");

  // Load persisted state from localStorage
  useEffect(() => {
    const savedModel = localStorage.getItem(LOCAL_STORAGE_KEY) as Model["id"] | null;
    if (savedModel) {
      setSelectedModelId(savedModel);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, selectedModelId);
  }, [selectedModelId]);

  return <ModelContext.Provider value={{ selectedModelId, setSelectedModelId }}>{children}</ModelContext.Provider>;
};

export const useModel = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModel must be used within a ModelProvider");
  }
  return context;
};

export const SUPPORTED_MODELS = [
  { isPublic: false, id: "gpt-4o", label: "GPT 4o", description: "Great for most tasks" },
  { isPublic: true, id: "gpt-4o-mini", label: "GPT 4o Mini", description: "Faster for everyday tasks" },
  { isPublic: false, id: "gpt-4-turbo", label: "GPT 4 Turbo", description: "Good for Efficiency" },
  { isPublic: false, id: "gpt-4", label: "GPT 4", description: "Legacy model" },
  { isPublic: false, id: "o1-mini", label: "o1 Mini", description: "Faster at Reasoning" },
  { isPublic: false, id: "o1-preview", label: "o1 Preview", description: "Great at Reasoning" },
  { isPublic: false, id: "o1", label: "o1", description: "Uses advanced Reasoning" },
  { isPublic: true, id: "claude-3-5-sonnet-20241022", label: "Claude 3.5 Sonnet", description: "Great for structured tasks" },
  { isPublic: false, id: "claude-3-5-sonnet-20240620", label: "Claude 3.5 Sonnet (June)", description: "Older version" },
  { isPublic: false, id: "claude-3-5-haiku-20241022", label: "Claude 3.5 Haiku", description: "Compact and efficient" },
  { isPublic: false, id: "pixtral-large-latest", label: "Pixtral Large", description: "Great for advanced tasks" },
  { isPublic: false, id: "mistral-large-latest", label: "Mistral Large", description: "Handles complex tasks" },
  { isPublic: true, id: "mistral-small-latest", label: "Mistral Small", description: "Efficient for lightweight tasks" },
  { isPublic: false, id: "pixtral-12b-2409", label: "Pixtral 12B", description: "Powerful and detailed" },
  { isPublic: false, id: "gemini-2.0-flash-exp", label: "Gemini 2.0 Flash Experimental", description: "Fast and experimental" },
  { isPublic: true, id: "gemini-1.5-flash", label: "Gemini 1.5 Flash", description: "Optimized for speed" },
  { isPublic: false, id: "gemini-1.5-pro", label: "Gemini 1.5 Pro", description: "Professional-grade" },
] as const;

export enum ModelProviderEnum {
  OpenAI = 'openai',
  Anthropic = 'anthropic',
  Mistral = 'mistral',
  Gemini = 'gemini',
}
