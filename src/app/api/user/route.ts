import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Fetch user data from the NestJS backend
    const response = await fetch("http://localhost:5000/auth/user", {
      method: "GET",
      credentials: "include", // Include cookies for session authentication
      headers: {
        Cookie: request.headers.get("Cookie") || "", // Pass the session cookie
      },
    });

    if (!response.ok) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userData = await response.json();
    // console.log(userData);

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
