// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("connect.sid"); // Check for session cookie

  // console.log("Session cookie:", sessionCookie);

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/onboarding"]; // Add your protected routes here

  // If the user tries to access a protected route without a session, redirect to login
  if (protectedRoutes.includes(request.nextUrl.pathname) && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access to the route if the user is authenticated
  return NextResponse.next();
}
