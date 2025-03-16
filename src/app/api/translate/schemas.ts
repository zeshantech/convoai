// lib/validators/translate.ts
import { z } from "zod";

export const TranslationSchema = z.object({
  text: z.string().max(5000),
  sourceLang: z.string(),
  targetLang: z.string(),
  translator: z.enum(["openai", "anthropic"]),
});
