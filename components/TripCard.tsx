import Link from "next/link";
import Image from "next/image";
import { Trip } from "@/lib/types";
import { initials } from "@/lib/data";
import CountdownStrip from "./CountdownStrip";

export default function TripCard({ trip }: { trip: Trip }) {
  const lowSeats = trip.left <= 5;
  return (
    <Link
      href={`/trip/${trip.id}`}
      className="group block overflow-hidden rounded-xl2 border border-line bg-card transition-transform active:scale-[0.985] hover:border-gold-line"
    >
      <div className="relative h-[190px] overflow-hidden" style={{ background: trip.grad }}>
        <Image
          src={trip.image}
          alt={trip.name}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="grain" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.82), rgba(0,0,0,0.06) 65%)",
          }}
        />
        <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/50 px-2.5 py-[5px] font-cond text-[11px] font-semibold tracking-[0.03em] text-white backdrop-blur-md">
          {trip.vibes[0]}
        </div>
        <div
          className={`absolute right-3 top-3 rounded-full px-2.5 py-[5px] font-cond text-[11px] font-semibold tracking-[0.03em] backdrop-blur-md ${
            lowSeats ? "bg-[#ff5a4e] text-white" : "bg-gold/90 text-bg"
          }`}
        >
          {trip.left} seats left
        </div>
        <div className="absolute inset-x-3.5 bottom-3">
          <p className="m-0 font-display text-[22px] font-medium text-white">{trip.name}</p>
          <span className="font-cond text-xs tracking-[0.03em] text-white/75">
            {trip.loc} · {trip.region}
          </span>
        </div>
      </div>
      <div className="px-4 pb-4 pt-3.5">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="font-cond text-[13px] text-text-dim">
            {trip.date} · {trip.difficulty}
          </span>
          <span className="font-display text-[19px] text-gold">
            KES {trip.price.toLocaleString()}
            <small className="font-cond text-[11px] text-text-faint"> / person</small>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full border border-gold-line bg-gold-wash font-cond text-[11px] font-semibold text-gold">
              {initials(trip.host)}
            </div>
            <span className="font-cond text-[12.5px] text-text-dim">Hosted by {trip.host}</span>
          </div>
          <span className="rounded-full bg-gold px-4 py-[9px] font-cond text-[12.5px] font-semibold text-bg">
            View →
          </span>
        </div>
        {trip.deadline && <CountdownStrip compact />}
      </div>
    </Link>
  );
}
