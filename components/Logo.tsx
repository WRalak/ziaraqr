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
      <div
        role="img"
        aria-label="Ziarra"
        className="flex-shrink-0 rounded-[9px]"
        style={{
          width: size,
          height: size,
          backgroundImage: "url(/ziarrrr.jpeg)",
          backgroundSize: "233% auto",
          backgroundPosition: "51% 29%",
          backgroundRepeat: "no-repeat",
        }}
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
