import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "ziarra_admin_session";

async function expectedAdminToken() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return "";

  const bytes = new TextEncoder().encode(`ziarra-admin:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  if (isLoginPage) return NextResponse.next();

  const expected = await expectedAdminToken();
  const actual = request.cookies.get(ADMIN_COOKIE)?.value ?? "";

  if (!expected || actual !== expected) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
