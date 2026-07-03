export interface Step {
  icon: string;
  label: string;
}

export const JOIN_STEPS: Step[] = [
  { icon: "⌕", label: "discover" },
  { icon: "◈", label: "detail" },
  { icon: "✎", label: "reserve" },
  { icon: "✓", label: "confirm" },
];

export const HOST_STEPS: Step[] = [
  { icon: "◆", label: "intro" },
  { icon: "✎", label: "form" },
  { icon: "✓", label: "confirm" },
];

export default function StampTrack({
  steps,
  currentIndex,
}: {
  steps: Step[];
  currentIndex: number;
}) {
  return (
    <div className="mb-8 flex items-center justify-center gap-2.5">
      {steps.map((s, i) => {
        const done = i < currentIndex;
        const current = i === currentIndex;
        return (
          <div key={s.label} className="flex items-center gap-2.5">
            <div
              className={`flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1.5px] font-cond text-xs transition-all ${
                done
                  ? "border-solid border-gold bg-gold-wash text-gold"
                  : current
                  ? "scale-[1.15] border-solid border-gold text-gold shadow-[0_0_0_4px_rgba(255,184,0,0.13)]"
                  : "border-dashed border-line-strong text-text-faint"
              }`}
            >
              {s.icon}
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-px w-3.5 ${done ? "bg-gold-line" : "bg-line-strong"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
