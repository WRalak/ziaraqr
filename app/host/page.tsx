import Topbar from "@/components/Topbar";
import Screen from "@/components/Screen";
import CtaDock from "@/components/CtaDock";
import StampTrack, { HOST_STEPS } from "@/components/StampTrack";
import Button from "@/components/Button";

const BENEFITS = [
  { g: "🚐", title: "Host amazing trips", desc: "Design the itinerary, pick the vibe, run the show." },
  { g: "🤝", title: "Build your community", desc: "Grow a loyal group of travelers who trip with you again and again." },
  { g: "🎫", title: "Travel for free", desc: "Fill your trip and your own seat is on us." },
  { g: "💰", title: "Earn income", desc: "Take a share of every seat you sell — paid out per trip." },
  { g: "✨", title: "Meet incredible people", desc: "Hosts don't just travel more — they meet more." },
];

export default function HostIntroPage() {
  return (
    <>
      <Topbar backHref="/choose" />
      <Screen containerClassName="pb-0">
        <StampTrack steps={HOST_STEPS} currentIndex={0} />
        <div className="mb-2.5 font-cond text-[11.5px] font-semibold uppercase tracking-[0.22em] text-gold">
          Become a host
        </div>
        <h1 className="m-0 mb-3.5 font-display text-[38px] font-medium leading-[1.05] sm:text-5xl">
          Build your own
          <br />
          travel community.
        </h1>
        <p className="m-0 max-w-[34ch] text-base leading-relaxed text-text-dim">
          Turn your circle into a movement — and get rewarded for it.
        </p>

        <div className="my-6 flex flex-col gap-3 sm:grid sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="flex items-start gap-3.5 rounded-lg2 border border-line bg-card p-4"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-gold-line bg-gold-wash">
                {b.g}
              </div>
              <div>
                <h3 className="m-0 mb-0.5 font-cond text-[15px] font-semibold">{b.title}</h3>
                <p className="m-0 text-[13.5px] leading-tight text-text-dim">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-card px-3.5 py-2 font-cond text-[12.5px] text-text-dim">
          <span className="h-1.5 w-1.5 animate-pulse2 rounded-full bg-[#4ade80]" />
          40+ student hosts already building with Ziarra
        </div>
      </Screen>
      <CtaDock sticky={false}>
        <Button href="/host/apply">Become a Host →</Button>
      </CtaDock>
    </>
  );
}
