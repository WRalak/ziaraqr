"use client";

import { useMemo, useState } from "react";
import { Trip } from "@/lib/types";
import { VIBES } from "@/lib/data";
import TripCard from "./TripCard";

export default function DiscoverGrid({ trips }: { trips: Trip[] }) {
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () =>
      trips.filter((t) => active === "All" || t.vibes.includes(active)),
    [trips, active]
  );

  return (
    <>
      <div className="filter-rail -mx-6 mb-6 px-6 sm:mx-0 sm:px-0">
        {VIBES.map((v) => (
          <button
            key={v}
            onClick={() => setActive(v)}
            className={`flex-none rounded-full border px-4 py-[9px] font-cond text-[13px] font-semibold tracking-[0.03em] transition-all ${
              v === active
                ? "border-gold bg-gold text-bg"
                : "border-line bg-card text-text-dim hover:border-line-strong"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((t) => (
          <TripCard key={t.id} trip={t} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-16 text-center font-cond text-text-faint">
          No trips match that vibe yet — check back soon.
        </p>
      )}
    </>
  );
}
