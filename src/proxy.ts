import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const adminPassword = process.env.ADMIN_PASSWORD;

  const authHeader = req.headers.get("authorization");
  const isAuthorized =
    adminPassword && authHeader === `Bearer ${adminPassword}`;

  // Protect API routes with Authorization header check
  if (pathname.startsWith("/api/admin")) {
    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // /admin page is accessible so the login form can render;
  // authentication for data is handled client-side via the API.

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/api/admin/:path*"],
};
