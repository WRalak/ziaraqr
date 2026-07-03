import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Topbar from "@/components/Topbar";
import Screen from "@/components/Screen";
import StampTrack, { JOIN_STEPS } from "@/components/StampTrack";
import SaveButton from "@/components/SaveButton";
import Button from "@/components/Button";
import { TRIPS, getTrip, initials } from "@/lib/data";

export function generateStaticParams() {
  return TRIPS.map((t) => ({ id: String(t.id) }));
}

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trip = getTrip(Number(id));
  if (!trip) notFound();

  return (
    <>
      <Topbar backHref="/discover" right={<SaveButton />} wide />
      <Screen wide>
        <StampTrack steps={JOIN_STEPS} currentIndex={1} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr,1fr]">
          <div>
            <div
              className="relative -mx-6 h-[240px] overflow-hidden sm:mx-0 sm:h-[320px] sm:rounded-xl2 lg:h-[380px]"
              style={{ background: trip.grad }}
            >
              <Image
                src={trip.image}
                alt={trip.name}
                fill
                priority
                sizes="(min-width: 1024px) 62vw, 100vw"
                className="object-cover"
              />
              <div className="grain" />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.15), #0a0a0b 96%)",
                }}
              />
              <div className="absolute inset-x-6 bottom-6 z-[3]">
                <span className="font-cond text-[12.5px] uppercase tracking-[0.08em] text-gold">
                  {trip.loc} · {trip.region} · {trip.date}
                </span>
                <h1 className="m-0 mt-1 font-display text-[34px] font-medium text-white sm:text-5xl">
                  {trip.name}
                </h1>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2.5">
              <StatPill v={`${trip.left}/${trip.seats}`} l="Seats left" />
              <StatPill v={trip.difficulty} l="Difficulty" />
              <StatPill v={trip.vibes.join(" / ")} l="Trip vibe" />
            </div>

            <p className="mb-6 mt-6 max-w-[60ch] text-base leading-relaxed text-text-dim">
              {trip.desc}
            </p>

            <SectionBlock title="Highlights">
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {trip.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-[14.5px] leading-tight text-text-dim">
                    <b className="text-gold">✓</b> {h}
                  </li>
                ))}
              </ul>
            </SectionBlock>

            <SectionBlock title="What's included">
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {trip.included.map((h) => (
                  <li key={h} className="flex gap-2.5 text-[14.5px] leading-tight text-text-dim">
                    <b className="text-gold">—</b> {h}
                  </li>
                ))}
              </ul>
            </SectionBlock>

            <SectionBlock title="Who's going">
              <div className="going-avatars flex items-center">
                {Array.from({ length: Math.min(5, trip.going) }).map((_, i) => (
                  <div
                    key={i}
                    className="avatar-overlap flex h-[26px] w-[26px] items-center justify-center rounded-full border border-gold-line bg-gold-wash font-cond text-[11px] font-semibold text-gold"
                  >
                    ✦
                  </div>
                ))}
                <span className="ml-2.5 font-cond text-[13px] text-text-dim">
                  {trip.going > 0
                    ? `${trip.going} people already going`
                    : "Be among the first to join"}
                </span>
              </div>
            </SectionBlock>

            <SectionBlock title="Your host">
              <div className="flex items-center gap-3 rounded-lg2 border border-line bg-card px-4 py-3.5">
                <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-gold-line bg-gold-wash font-cond text-base font-semibold text-gold">
                  {initials(trip.host)}
                </div>
                <div>
                  <div className="font-cond text-[15px] font-semibold">{trip.host}</div>
                  <div className="text-[12.5px] text-text-faint">{trip.hostTag}</div>
                </div>
              </div>
            </SectionBlock>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg2 border border-gold-line bg-gold-wash p-5">
              <div className="font-display text-[26px] text-gold">
                KES {trip.price.toLocaleString()}
                <small className="block font-cond text-xs text-text-dim">
                  per person · {trip.left} seats left
                </small>
              </div>
            </div>
            <div className="mt-4">
              <Button href={`/trip/${trip.id}/reserve`}>Reserve My Spot</Button>
            </div>
            <div className="mt-3.5 text-center font-cond text-[13.5px] text-text-dim">
              Spots are limited — <b className="font-semibold text-gold">{trip.left} left</b>{" "}
              at this price.
            </div>
            <Link
              href={trip.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 block text-center font-cond text-[13px] text-text-dim underline decoration-gold-line underline-offset-4 hover:text-gold"
            >
              View original package on Ziarra
            </Link>
          </aside>
        </div>
      </Screen>
    </>
  );
}

function StatPill({ v, l }: { v: string; l: string }) {
  return (
    <div className="rounded-md2 border border-line bg-card px-2.5 py-3 text-center">
      <div className="font-display text-[19px] text-text">{v}</div>
      <div className="mt-0.5 font-cond text-[10px] uppercase tracking-[0.05em] text-text-faint">
        {l}
      </div>
    </div>
  );
}

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h4 className="m-0 mb-3 font-cond text-[13px] uppercase tracking-[0.1em] text-text-faint">
        {title}
      </h4>
      {children}
    </div>
  );
}
