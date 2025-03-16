import { z } from "zod";

export const GenerateImageSchema = z.object({
  selectedModelId: z.string(),
  prompt: z.string(),
  selectedSize: z.string(),
  seed: z.number(),
  numberOfImages: z.number(),
});
