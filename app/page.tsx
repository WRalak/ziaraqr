import Image from "next/image";
import Button from "@/components/Button";
import Logo from "@/components/Logo";

export default function LandingPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="relative h-[62vh] min-h-[420px] w-full overflow-hidden sm:h-[68vh] lg:h-[78vh]">
        <Image
          src="https://images.unsplash.com/photo-1589483232748-515c025575bc?fm=jpg&q=80&w=1600&auto=format&fit=crop"
          alt="Friends laughing together on a trip"
          fill
          priority
          className="object-cover"
          style={{ filter: "grayscale(0.15) contrast(1.08) brightness(0.78)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,11,0.15) 0%, rgba(10,10,11,0.35) 55%, rgba(10,10,11,0.96) 100%), linear-gradient(200deg, rgba(28,23,16,0.35) 0%, transparent 45%)",
          }}
        />
        <div className="grain" />
        <div className="absolute left-6 top-7 z-10 sm:left-10 lg:left-12">
          <Logo />
        </div>
        <div className="absolute inset-x-6 bottom-7 z-10 mx-auto flex max-w-6xl items-center gap-3 rounded-lg2 border border-gold-line bg-black/55 px-4 py-3.5 backdrop-blur-md sm:inset-x-10 lg:inset-x-12">
          <div className="h-2 w-2 flex-shrink-0 animate-pulse2 rounded-full bg-gold" />
          <span className="font-cond text-[13px] tracking-[0.04em] text-text-dim">
            Scanned at Strathmore Cultural Week
          </span>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 pb-10 pt-8 sm:px-10 lg:px-12">
        <div className="mb-2.5 font-cond text-[11.5px] font-semibold uppercase tracking-[0.22em] text-gold">
          Ziarra · Social Travel
        </div>
        <h1 className="m-0 mb-3.5 font-display text-[42px] font-medium leading-[1.04] tracking-tight sm:text-[56px]">
          Adventure
          <br />
          Starts Here.
        </h1>
        <p className="m-0 mb-1 max-w-[34ch] text-base leading-relaxed text-text-dim">
          You're one scan away from your next unforgettable trip.
        </p>
        <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-card px-3.5 py-2 font-cond text-[12.5px] text-text-dim">
          <span className="h-1.5 w-1.5 animate-pulse2 rounded-full bg-[#4ade80]" />
          <b className="text-gold">300+</b> students already exploring with Ziarra
        </div>
        <div className="flex-1" />
        <div className="mt-10 max-w-sm">
          <Button href="/choose">Start Exploring →</Button>
        </div>
      </div>
    </div>
  );
}
