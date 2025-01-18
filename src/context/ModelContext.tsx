"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Model = (typeof SUPPORTED_MODELS)[number];

interface ModelContextType {
  selectedModel: Model;
  setSelectedModelId: (id: Model["id"]) => void;
}

const LOCAL_STORAGE_KEY = "selectedModelId";

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export const ModelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const defaultModel = SUPPORTED_MODELS.find((model) => model.id === "gpt-4o-mini")!;
  const [selectedModel, setSelectedModel] = useState<Model>(defaultModel);

  useEffect(() => {
    const savedModelId = localStorage.getItem(LOCAL_STORAGE_KEY) as Model["id"] | null;
    if (savedModelId) {
      const savedModel = SUPPORTED_MODELS.find((model) => model.id === savedModelId);
      if (savedModel) {
        setSelectedModel(savedModel);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, selectedModel.id);
  }, [selectedModel]);

  const setSelectedModelId = (id: Model["id"]) => {
    const newModel = SUPPORTED_MODELS.find((model) => model.id === id);
    if (newModel) {
      setSelectedModel(newModel);
    }
  };

  return <ModelContext.Provider value={{ selectedModel, setSelectedModelId }}>{children}</ModelContext.Provider>;
};

export const useModel = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModel must be used within a ModelProvider");
  }
  return context;
};

export const SUPPORTED_MODELS: {
  isPublic: boolean;
  id: string;
  label: string;
  image: string;
  description: string;
  supportedFileTypes: string[];
}[] = [
  {
    isPublic: false,
    id: "gpt-4o",
    label: "GPT 4o",
    description: "Great for most tasks",
    image: "/providers/openai.svg",
    supportedFileTypes: ["image/png", "image/jpeg", "image/webp", "image/gif", "text/plain", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv", "application/json"],
  },
  {
    isPublic: true,
    id: "gpt-4o-mini",
    label: "GPT 4o Mini",
    image: "/providers/openai.svg",
    description: "Faster for everyday tasks",
    supportedFileTypes: ["image/png", "image/jpeg", "image/webp", "image/gif", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv", "application/json"],
  },
  {
    isPublic: false,
    id: "gpt-4-turbo",
    label: "GPT 4 Turbo",
    image: "/providers/openai.svg",
    description: "Good for Efficiency",
    supportedFileTypes: ["image/png", "image/jpeg", "image/webp", "image/gif", "text/plain", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv", "application/json"],
  },
  {
    isPublic: false,
    id: "gpt-4",
    label: "GPT 4",
    image: "/providers/openai.svg",
    description: "Legacy model",
    supportedFileTypes: ["image/png", "image/jpeg", "image/webp", "image/gif", "text/plain", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv", "application/json"],
  },
  {
    isPublic: false,
    id: "o1-mini",
    label: "o1 Mini",
    image: "/providers/openai.svg",
    description: "Faster at Reasoning",
    supportedFileTypes: [],
  },
  {
    isPublic: false,
    id: "o1-preview",
    label: "o1 Preview",
    image: "/providers/openai.svg",
    description: "Great at Reasoning",
    supportedFileTypes: [],
  },
  {
    isPublic: false,
    id: "o1",
    label: "o1",
    image: "/providers/openai.svg",
    description: "Uses advanced Reasoning",
    supportedFileTypes: [],
  },
  {
    isPublic: true,
    id: "claude-3-5-sonnet-20241022",
    label: "Claude 3.5 Sonnet",
    image: "/providers/openai.svg",
    description: "Great for structured tasks",
    supportedFileTypes: ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/csv", "text/plain", "text/html", "application/vnd.oasis.opendocument.text", "application/rtf", "application/epub+zip", "application/json", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  },
  {
    isPublic: false,
    id: "claude-3-5-sonnet-20240620",
    label: "Claude 3.5 Sonnet (June)",
    image: "/providers/anthropic.svg",
    description: "Older version",
    supportedFileTypes: ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/csv", "text/plain", "text/html", "application/vnd.oasis.opendocument.text", "application/rtf", "application/epub+zip", "application/json", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  },
  {
    isPublic: false,
    id: "claude-3-5-haiku-20241022",
    label: "Claude 3.5 Haiku",
    image: "/providers/anthropic.svg",
    description: "Compact and efficient",
    supportedFileTypes: ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/csv", "text/plain", "text/html", "application/vnd.oasis.opendocument.text", "application/rtf", "application/epub+zip", "application/json", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  },
  {
    isPublic: false,
    id: "pixtral-large-latest",
    label: "Pixtral Large",
    image: "/providers/mistral.svg",
    description: "Great for advanced tasks",
    supportedFileTypes: [],
  },
  {
    isPublic: false,
    id: "mistral-large-latest",
    label: "Mistral Large",
    image: "/providers/mistral.svg",
    description: "Handles complex tasks",
    supportedFileTypes: [],
  },
  {
    isPublic: true,
    id: "mistral-small-latest",
    label: "Mistral Small",
    image: "/providers/mistral.svg",
    description: "Efficient for lightweight tasks",
    supportedFileTypes: [],
  },
  {
    isPublic: false,
    id: "pixtral-12b-2409",
    label: "Pixtral 12B",
    image: "/providers/anthropic.svg",
    description: "Powerful and detailed",
    supportedFileTypes: [],
  },
  {
    isPublic: false,
    id: "gemini-2.0-flash-exp",
    label: "Gemini 2.0 Flash Experimental",
    image: "/providers/google.svg",
    description: "Fast and experimental",
    supportedFileTypes: [],
  },
  {
    isPublic: true,
    id: "gemini-1.5-flash",
    label: "Gemini 1.5 Flash",
    image: "/providers/google.svg",
    description: "Optimized for speed",
    supportedFileTypes: [],
  },
  {
    isPublic: false,
    id: "gemini-1.5-pro",
    label: "Gemini 1.5 Pro",
    image: "/providers/google.svg",
    description: "Professional-grade",
    supportedFileTypes: [],
  },
  {
    isPublic: false,
    id: "llama-2-13b-chat",
    label: "Llama 2 13B Chat",
    image: "/providers/meta.svg",
    description: "Powerful conversational model",
    supportedFileTypes: ["text/plain", "application/json"],
  },
  {
    isPublic: false,
    id: "llama-2-7b-chat",
    label: "Llama 2 7B Chat",
    image: "/providers/meta.svg",
    description: "Lightweight conversational model",
    supportedFileTypes: ["text/plain", "application/json"],
  },
  {
    isPublic: false,
    id: "llama-2-13b-code",
    label: "Llama 2 13B Code",
    image: "/providers/meta.svg",
    description: "Great for coding tasks",
    supportedFileTypes: ["text/plain", "application/json", "application/javascript"],
  },
  {
    isPublic: true,
    id: "llama-2-7b-code",
    label: "Llama 2 7B Code",
    image: "/providers/meta.svg",
    description: "Efficient for coding tasks",
    supportedFileTypes: ["text/plain", "application/json", "application/javascript"],
  },
] as const;

export enum ModelProviderEnum {
  OpenAI = "openai",
  Anthropic = "anthropic",
  Mistral = "mistral",
  Gemini = "gemini",
}
