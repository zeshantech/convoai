"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Model = (typeof SUPPORTED_MODELS)[number];

interface ModelContextType {
  selectedModel: Model["id"];
  setSelectedModel: (id: Model["id"]) => void;
}

const LOCAL_STORAGE_KEY = "selectedModel";

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export const ModelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedModel, setSelectedModel] = useState<Model["id"]>("gpt-4o-mini");

  // Load persisted state from localStorage
  useEffect(() => {
    const savedModel = localStorage.getItem(LOCAL_STORAGE_KEY) as Model["id"] | null;
    if (savedModel) {
      setSelectedModel(savedModel);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, selectedModel);
  }, [selectedModel]);

  return <ModelContext.Provider value={{ selectedModel, setSelectedModel }}>{children}</ModelContext.Provider>;
};

export const useModel = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModel must be used within a ModelProvider");
  }
  return context;
};

export const SUPPORTED_MODELS = [
  { id: "gpt-4o", label: "GPT 4o", description: "Great for most tasks" },
  { id: "gpt-4o-mini", label: "GPT 4o Mini", description: "Faster for everyday tasks" },
  { id: "gpt-4-turbo", label: "GPT 4 Turbo", description: "Good for Efficiency" },
  { id: "gpt-4", label: "GPT 4", description: "Legacy model" },
  { id: "o1-mini", label: "o1 Mini", description: "Faster at Reasoning" },
  { id: "o1-preview", label: "o1 Preview", description: "Great at Reasoning" },
  { id: "o1", label: "o1", description: "Uses advanced Reasoning" },
  { id: "claude-3-5-sonnet-20241022", label: "Claude 3.5 Sonnet", description: "Great for structured tasks" },
  { id: "claude-3-5-sonnet-20240620", label: "Claude 3.5 Sonnet (June)", description: "Older version" },
  { id: "claude-3-5-haiku-20241022", label: "Claude 3.5 Haiku", description: "Compact and efficient" },
  { id: "pixtral-large-latest", label: "Pixtral Large", description: "Great for advanced tasks" },
  { id: "mistral-large-latest", label: "Mistral Large", description: "Handles complex tasks" },
  { id: "mistral-small-latest", label: "Mistral Small", description: "Efficient for lightweight tasks" },
  { id: "pixtral-12b-2409", label: "Pixtral 12B", description: "Powerful and detailed" },
  { id: "gemini-2.0-flash-exp", label: "Gemini 2.0 Flash Experimental", description: "Fast and experimental" },
  { id: "gemini-1.5-flash", label: "Gemini 1.5 Flash", description: "Optimized for speed" },
  { id: "gemini-1.5-pro", label: "Gemini 1.5 Pro", description: "Professional-grade" },
] as const;
