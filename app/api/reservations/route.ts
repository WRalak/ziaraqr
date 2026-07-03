import { NextResponse } from "next/server";
import { getTrip } from "@/lib/data";
import { reservationSchema } from "@/lib/validation";
import { createReservation } from "@/lib/server/submission-store";
import { checkRateLimit } from "@/lib/server/rate-limit";

export const runtime = "nodejs";

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  if (!checkRateLimit(`reservation:${clientIp(request)}`)) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  try {
    const result = reservationSchema.safeParse(await request.json());
    if (!result.success) {
      return NextResponse.json(
        {
          error: "Please check the highlighted details and try again.",
          fields: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const trip = getTrip(result.data.packageId);
    if (!trip) {
      return NextResponse.json({ error: "This trip is no longer available." }, { status: 404 });
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
    console.error("Reservation submission failed", error);
    return NextResponse.json(
      { error: "We could not save your reservation. Please try again." },
      { status: 500 }
    );
  }
}
