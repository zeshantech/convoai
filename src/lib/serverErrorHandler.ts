import { NextResponse } from "next/server";

export function serverErrorHandler<T>(error: T) {
  return NextResponse.json(
    {
      message:
        (error as any).message ??
        "Unexpected Error occurred, Plz Try again Later and Report us",
    },
    { status: (error as any).statusCode || 500 }
  );
}
