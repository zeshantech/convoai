import { NextRequest, NextResponse } from "next/server";
import { BadRequestException, RateLimitException } from "@/lib/exceptions";
import { serverErrorHandler } from "@/lib/serverErrorHandler";
import OpenAI from "openai";
import { RateLimiter } from "@/lib/rateLimiter";
import { TranslationSchema } from "./schemas";
import { getIpAddressFromRequest } from "@/utils/getIpAddressFromRequest";
import { getPrompt } from "./prompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // const session = await getSession();
    // if (!session?.user) throw new UnauthorizedException();

    const rateLimiter = new RateLimiter(20, 60);

    const { success } = await rateLimiter.limit(getIpAddressFromRequest(request));
    if (!success) throw new RateLimitException();

    const body = TranslationSchema.parse(await request.json());

    let result = "";

    switch (body.translator) {
      case "openai":
        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: getPrompt(body.sourceLang, body.targetLang),
            },
            {
              role: "user",
              content: body.text,
            },
          ],
          temperature: 0.7,
          top_p: 0.9,
          frequency_penalty: -0.5,
        });
        result = completion.choices[0].message.content || "";
        break;

      case "anthropic":
        // Similar implementation for Anthropic
        break;

      default:
        throw new BadRequestException("Invalid translator");
    }

    return NextResponse.json({ translation: result });
  } catch (error) {
    return serverErrorHandler(error);
  }
}
