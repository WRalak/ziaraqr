import Image from "next/image";

export default function Logo({
  size = 34,
  showWordmark = true,
  className = "",
}: {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/ziarra-mark.svg"
        alt="Ziarra"
        width={size}
        height={size}
        priority
        className="rounded-[9px]"
      />
      {showWordmark && (
        <span
          className="font-display text-[19px] font-semibold tracking-tight text-text"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
        >
          Ziarra
        </span>
      )}
    </div>
  );
}
