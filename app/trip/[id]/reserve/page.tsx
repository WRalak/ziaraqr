import { notFound } from "next/navigation";
import Topbar from "@/components/Topbar";
import Screen from "@/components/Screen";
import StampTrack, { JOIN_STEPS } from "@/components/StampTrack";
import ReserveForm from "@/components/ReserveForm";
import { getTrip, TRIPS } from "@/lib/data";

export function generateStaticParams() {
  return TRIPS.map((t) => ({ id: String(t.id) }));
}

export default function ReservePage({ params }: { params: { id: string } }) {
  const trip = getTrip(Number(params.id));
  if (!trip) notFound();

  return (
    <>
      <Topbar backHref={`/trip/${trip.id}`} title="Reserve" />
      <Screen>
        <StampTrack steps={JOIN_STEPS} currentIndex={2} />
        <h2 className="m-0 mb-2.5 font-display text-[30px] font-medium leading-tight">
          Reserve {trip.name}.
        </h2>
        <p className="m-0 mb-6 text-base leading-relaxed text-text-dim">
          Just the essentials — we'll handle the rest over WhatsApp.
        </p>
        <ReserveForm tripId={trip.id} />
      </Screen>
    </>
  );
}
