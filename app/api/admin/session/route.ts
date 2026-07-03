import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminSessionToken,
  isAdminConfigured,
  isCorrectAdminPassword,
} from "@/lib/server/admin-auth";

export const runtime = "nodejs";

function shouldUseSecureCookie(request: Request) {
  const hostname = request.headers.get("host")?.split(":")[0] ?? "";
  return hostname !== "localhost" && hostname !== "127.0.0.1";
}

export async function POST(request: Request) {
  const formData = await request.formData();
  if (formData.get("_method") === "DELETE") {
    const response = NextResponse.redirect(new URL("/admin/login", request.url), 303);
    response.cookies.set(ADMIN_COOKIE, "", {
      httpOnly: true,
      sameSite: "strict",
      secure: shouldUseSecureCookie(request),
      path: "/",
      maxAge: 0,
    });
    return response;
  }

  const password = String(formData.get("password") ?? "");

  if (!isAdminConfigured()) {
    return NextResponse.redirect(
      new URL("/admin/login?error=config", request.url),
      303
    );
  }

  if (!isCorrectAdminPassword(password)) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303);
  }

  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.set(ADMIN_COOKIE, adminSessionToken(), {
    httpOnly: true,
    sameSite: "strict",
    secure: shouldUseSecureCookie(request),
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
