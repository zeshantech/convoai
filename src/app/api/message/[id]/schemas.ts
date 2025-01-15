import { z } from "zod";

export const UpdateMessageSchema = z.object({
  vote: z.string(),
  suggestion: z.string(),
});
