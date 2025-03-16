import { NextRequest } from "next/server";

export function getIpAddressFromRequest(request: NextRequest) {
  return request.headers.get("x-forwarded-for") || "default";
}
