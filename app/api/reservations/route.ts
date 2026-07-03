import { NextResponse } from "next/server";
import { getTrip } from "@/lib/data";
import { reservationSchema } from "@/lib/validation";
import {
  createReservation,
  SubmissionStoreError,
} from "@/lib/server/submission-store";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { ServerConfigurationError } from "@/lib/server/env";

export const runtime = "nodejs";

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  if (!checkRateLimit(`reservation:${clientIp(request)}`)) {
    return NextResponse.json(
      {
        error: true,
        message: "Too many attempts. Please wait a few minutes and try again.",
      },
      { status: 429 }
    );
  }

  try {
    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json(
        { error: true, message: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const result = reservationSchema.safeParse(payload);
    if (!result.success) {
      return NextResponse.json(
        {
          error: true,
          message: "Please check the highlighted details and try again.",
          fields: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const trip = getTrip(result.data.packageId);
    if (!trip) {
      return NextResponse.json(
        { error: true, message: "This trip is no longer available." },
        { status: 404 }
      );
    }

    const reservation = await createReservation(result.data, {
      code: trip.packageCode,
      name: trip.name,
    });

    return NextResponse.json(
      { ok: true, id: reservation.id },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    if (error instanceof ServerConfigurationError) {
      return NextResponse.json(
        {
          error: true,
          message: "Reservations are temporarily unavailable due to server configuration.",
        },
        { status: 503 }
      );
    }

    if (!(error instanceof SubmissionStoreError)) {
      console.error("Reservation submission failed", {
        name: error instanceof Error ? error.name : "UnknownError",
        message: error instanceof Error ? error.message : "Unknown failure",
      });
    }
    return NextResponse.json(
      {
        error: true,
        message: "We could not save your reservation. Please try again.",
      },
      { status: 500 }
    );
  }
}
