"use client";

import { ReactNode, useEffect, useState } from "react";
import Confetti from "./Confetti";
import Button from "./Button";
import { useToast, fakeLinkHandler } from "./ToastProvider";

interface NextItem {
  glyph: string;
  title: string;
  subtitle: string;
  href: string;
  external?: boolean;
  fakeLabel?: string;
}

export default function SuccessScreen({
  heading,
  copy,
  items,
  continueHref,
}: {
  heading: string;
  copy: string;
  items: NextItem[];
  continueHref: string;
}) {
  const [showConfetti, setShowConfetti] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center px-6 pb-16 pt-14 text-center sm:pt-20">
      {showConfetti && <Confetti />}
      <div className="mb-7 flex h-24 w-24 animate-pop items-center justify-center rounded-full border-[1.5px] border-dashed border-gold bg-gold-wash text-4xl">
        🎉
      </div>
      <h1 className="m-0 mb-2.5 font-display text-[32px] font-medium">{heading}</h1>
      <p className="m-0 mb-8 max-w-[30ch] text-[15.5px] leading-relaxed text-text-dim">
        {copy}
      </p>
      <div className="mb-3 flex w-full max-w-md flex-col gap-2.5">
        {items.map((it) =>
          it.fakeLabel ? (
            <a
              key={it.title}
              href={it.href}
              onClick={fakeLinkHandler(toast, it.fakeLabel)}
              className="flex w-full items-center gap-3 rounded-lg2 border border-line bg-card px-4 py-3.5 text-left transition-colors hover:border-line-strong"
            >
              <ItemGlyph>{it.glyph}</ItemGlyph>
              <ItemText title={it.title} subtitle={it.subtitle} />
            </a>
          ) : (
            <a
              key={it.title}
              href={it.href}
              target={it.external ? "_blank" : undefined}
              rel={it.external ? "noopener" : undefined}
              className="flex w-full items-center gap-3 rounded-lg2 border border-line bg-card px-4 py-3.5 text-left transition-colors hover:border-line-strong"
            >
              <ItemGlyph>{it.glyph}</ItemGlyph>
              <ItemText title={it.title} subtitle={it.subtitle} />
            </a>
          )
        )}
      </div>
      <div className="w-full max-w-md">
        <Button href={continueHref} variant="outline">
          Continue →
        </Button>
      </div>
    </div>
  );
}

function ItemGlyph({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-[11px] bg-gold-wash">
      {children}
    </div>
  );
}

function ItemText({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex-1">
      <b className="block font-cond text-sm font-semibold">{title}</b>
      <span className="text-[12.5px] text-text-faint">{subtitle}</span>
    </div>
  );
}
