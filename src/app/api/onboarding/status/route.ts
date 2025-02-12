import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    console.log("Fetching onboarding status from backend...");
    const response = await fetch("http://localhost:5000/auth/status", {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: request.headers.get("Cookie") || "", // Pass the session cookie
      },
    });

    if (!response.ok) {
      console.error("Backend returned an error:", response.statusText);
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const result = await response.json();
    console.log("Onboarding status received:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching onboarding status:", error);
    return NextResponse.json(
      { message: "Error fetching onboarding status" },
      { status: 500 }
    );
  }
}
