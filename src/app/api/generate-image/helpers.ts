import { openai } from "@ai-sdk/openai";
import { replicate } from "@ai-sdk/replicate";
import { vertex } from "@ai-sdk/google-vertex";
import { NotSupportedException } from "@/lib/exceptions";

export const getModel = (modelId: string) => {
  switch (modelId) {
    case "dall-e-3":
    case "dall-e-2":
      return openai.image(modelId);

    case "imagen-3.0-generate-001":
      return vertex.image("dall-e-3");

    case "black-forest-labs/flux-schnell":
    case "recraft-ai/recraft-v3":
      return replicate.image(modelId);

    default:
      throw new NotSupportedException("Model not supported");
  }
};
