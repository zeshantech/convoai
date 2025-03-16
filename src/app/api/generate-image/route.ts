import { NextRequest, NextResponse } from "next/server";
import { experimental_generateImage as generateImage } from "ai";
import { getSession } from "../auth/[...nextauth]/route";
import { UnauthorizedException } from "@/lib/exceptions";
import { GenerateImageSchema } from "./schemas";
import { getModel } from "./helpers";
import { serverErrorHandler } from "@/lib/serverErrorHandler";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.user) {
      throw new UnauthorizedException();
    }

    const body = GenerateImageSchema.parse(await request.json());

    const model = getModel(body.selectedModelId);

    const result = await generateImage({
      model,
      prompt: body.prompt,
      size: body.selectedSize as `${number}x${number}`,
      seed: body.seed,
      n: body.numberOfImages,
    });

    return NextResponse.json({ images: result.images });
  } catch (error) {
    return serverErrorHandler(error);
  }
}
