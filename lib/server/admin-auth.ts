import "server-only";

import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "ziarra_admin_session";

function adminPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

export function adminSessionToken() {
  const password = adminPassword();
  if (!password) return "";
  return createHash("sha256").update(`ziarra-admin:${password}`).digest("hex");
}

export function isCorrectAdminPassword(candidate: string) {
  const expected = adminPassword();
  if (!expected || candidate.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(candidate), Buffer.from(expected));
}

export async function isAdminAuthenticated() {
  const expected = adminSessionToken();
  const actual = (await cookies()).get(ADMIN_COOKIE)?.value ?? "";
  if (!expected || actual.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
}
