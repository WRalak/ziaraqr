import { NextResponse } from "next/server";
import { hostApplicationSchema } from "@/lib/validation";
import { createHostApplication } from "@/lib/server/submission-store";
import { checkRateLimit } from "@/lib/server/rate-limit";

export const runtime = "nodejs";

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  if (!checkRateLimit(`host:${clientIp(request)}`)) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  try {
    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === "development"
              ? "Invalid JSON request body."
              : "Invalid request.",
        },
        { status: 400 }
      );
    }

    const result = hostApplicationSchema.safeParse(payload);
    if (!result.success) {
      const fields = result.error.flatten().fieldErrors;
      const developmentDetails = result.error.issues
        .map((issue) => `${issue.path.join(".") || "request"}: ${issue.message}`)
        .join("; ");
      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === "development"
              ? `Validation failed: ${developmentDetails}`
              : "Please check the form details and try again.",
          fields,
        },
        { status: 400 }
      );
    }

    const application = await createHostApplication(result.data);
    return NextResponse.json(
      { ok: true, id: application.id },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Host application submission failed", error);
    return NextResponse.json(
      { error: "We could not save your application. Please try again." },
      { status: 500 }
    );
  }
}
