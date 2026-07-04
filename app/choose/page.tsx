import Link from "next/link";
import Topbar from "@/components/Topbar";
import Screen from "@/components/Screen";

const CHOICES = [
  {
    href: "/discover",
    glyph: "🎒",
    title: "Join a Trip",
    desc: "I want to join an upcoming adventure with others.",
    cta: "Browse trips →",
  },
  {
    href: "/host",
    glyph: "🌍",
    title: "Host a Trip",
    desc: "I'd love to organize trips and build a travel community.",
    cta: "Learn more →",
  },
];

export default function ChoosePage() {
  return (
    <>
      <Topbar backHref="/" />
      <Screen>
        <div className="mb-2.5 font-cond text-[11.5px] font-semibold uppercase tracking-[0.22em] text-gold">
          Step one
        </div>
        <h2 className="m-0 mb-2.5 font-display text-[30px] font-medium leading-tight sm:text-4xl">
          Choose your adventure.
        </h2>
        <p className="m-0 mb-6 max-w-[34ch] text-base leading-relaxed text-text-dim">
          You can always do the other one later.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CHOICES.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group relative overflow-hidden rounded-xl2 border border-line bg-card p-6 transition-all active:scale-[0.98] hover:border-gold-line"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gold opacity-[0.08] blur-[30px]" />
              <span className="mb-3.5 block text-3xl">{c.glyph}</span>
              <h3 className="m-0 mb-1.5 font-display text-2xl font-medium">{c.title}</h3>
              <p className="m-0 mb-4 text-[14.5px] leading-tight text-text-dim">{c.desc}</p>
              <span className="inline-flex items-center gap-1.5 font-cond text-[13px] font-semibold tracking-[0.03em] text-gold">
                {c.cta}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-4 text-center font-cond text-xs tracking-[0.02em] text-text-faint">
          Registration takes less than a minute either way.
        </div>
      </Screen>
    </>
  );
}
