import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value;

  // Define public paths (where you don't need to be logged in)
  const isPublicPath = path === "/login" || path === "/register";

  // CASE A: User is logged in (has token) and tries to visit Login/Register
  if (isPublicPath && token) {
    // Redirect them to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  // CASE B: User is NOT logged in and tries to visit protected page (Dashboard)
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // CASE C: User visits the root "/" homepage
  if (path === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
}

// Configure which paths the middleware runs on
export const config = {
  matcher: ["/", "/login", "/register", "/dashboard"],
};
