import { NextResponse } from "next/server";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET(request: Request) {
  try {
    // Fetch user data from the NestJS backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user`,
      {
        method: "GET",
        credentials: "include", // Include cookies for session authentication
        headers: {
          Cookie: request.headers.get("Cookie") || "", // Pass the session cookie
        },
      }
    );

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
