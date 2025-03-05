import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetch(`${backendUrl}/auth/following/counts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("Cookie") || "", // Forward session cookie from the request
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: `Failed to fetch followed counts: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      appsCount: data.appsCount,
      categoriesCount: data.categoriesCount,
      keywordsCount: data.keywordsCount,
    });
  } catch (error) {
    console.error("Error fetching followed counts:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
