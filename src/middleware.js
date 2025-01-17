import { NextResponse } from "next/server";
import { ratelimit } from "./lib/ratelimit";

export async function middleware(req) {
  const ip = req.ip ?? "127.0.0.1";
  try {
    // Allow access to the error page itself
    if (req.nextUrl.pathname === "/rate-limit-error") {
      return NextResponse.next();
    }

    const { success } = await ratelimit.limit(ip);

    if (!success) {
      console.log("Rate limit exceeded. Redirecting...");
      return NextResponse.redirect(new URL("/rate-limit-error", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.json(
      { error: "Failed to check rate limit. Please try again later." },
      { status: 500 }
    );
  }
}

// Configure which routes to apply rate limiting to
export const config = {
  matcher: ["/api/:path*","/rate-limit-error"] // i removed '/' because on refresh it was redirecting to /hi page because rate limit exceeded
};
