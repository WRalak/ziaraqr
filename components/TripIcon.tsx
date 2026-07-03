import { IconKey } from "@/lib/types";

const PATHS: Record<IconKey, string> = {
  beach: "M2 21c3-2 6-2 9 0s6 2 9 0M3 15 12 6l9 9M9 12l-6 6M15 12l6 6",
  lake: "M2 20c2.5-2 5-2 7.5 0s5 2 7.5 0 5-2 7-0M12 3v10M8 7l4-4 4 4",
  mountain: "M3 20 10 8l3 5 2-3 6 10H3Z",
  park: "M12 2 4 14h5l-3 8 12-14h-5l3-6Z",
  city: "M4 21V9l5-4 5 4v12M14 21v-8l6-3v11M4 21h16",
  safari: "M3 20c1-6 4-11 9-11s8 5 9 11M8 9V5M16 9V5",
};

const JOINED: Partial<Record<IconKey, boolean>> = { mountain: true, park: true };

export default function TripIcon({
  icon,
  size = 80,
  className = "",
}: {
  icon: IconKey;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d={PATHS[icon]}
        stroke="#fff"
        strokeWidth={1}
        strokeLinejoin={JOINED[icon] ? "round" : undefined}
      />
    </svg>
  );
}
