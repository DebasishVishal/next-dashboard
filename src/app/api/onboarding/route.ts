import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // console.log("Received data:", data); // Log the received data

    const response = await fetch("http://localhost:5000/auth/onboarding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set Content-Type
        Cookie: request.headers.get("Cookie") || "", // Pass the session cookie
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    // console.log("Backend response status:", response.status); // Log the backend response status

    if (!response.ok) {
      let errorResponse;
      try {
        errorResponse = await response.json(); // Try to parse the error response as JSON
      } catch (error) {
        errorResponse = await response.text(); // Fallback to text if JSON parsing fails
      }
      console.error("Backend error response:", errorResponse);
      throw new Error("Failed to save onboarding data");
    }

    // Parse the backend response
    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in API route:", error); // Log the error
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Failed to save onboarding data", error: errorMessage },
      { status: 500 }
    );
  }
}
