"use client";

import { useEffect, useState } from "react";

// Shared deadline for the prototype — ~2 days 6 hrs 40 min from load.
const DEADLINE = Date.now() + (2 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000 + 40 * 60 * 1000);

function useCountdown() {
  const [diff, setDiff] = useState(Math.max(0, DEADLINE - Date.now()));
  useEffect(() => {
    const id = setInterval(() => {
      setDiff(Math.max(0, DEADLINE - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

export default function CountdownStrip({ compact = false }: { compact?: boolean }) {
  const { d, h, m, s } = useCountdown();
  const boxes = [
    { v: d, l: "Days" },
    { v: h, l: "Hrs" },
    { v: m, l: "Min" },
    { v: s, l: "Sec" },
  ];
  return (
    <div
      className={`flex gap-1.5 ${
        compact ? "mt-2.5 border-t border-line pt-2.5" : "mt-4"
      }`}
    >
      {boxes.map((b) => (
        <div key={b.l} className="flex-1 text-center">
          <div className="font-display text-lg text-gold">{b.v}</div>
          <div className="font-cond text-[9.5px] uppercase tracking-[0.06em] text-text-faint">
            {b.l}
          </div>
        </div>
      ))}
    </div>
  );
}
