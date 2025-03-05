import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  //   const region = request.headers.get("x-vercel-ip-country-region");
  const country = request.headers.get("x-vercel-ip-country"); // ISO 3166-1 alpha-2 code (e.g., "US")

  console.log("x-vercel-ip-country:", country);
  return NextResponse.json({ country: country || "US" });
}
