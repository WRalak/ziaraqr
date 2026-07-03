"use client";

import Link from "next/link";
import { ReactNode } from "react";
import Logo from "./Logo";

function IconBtn({
  children,
  href,
  onClick,
  label,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  label?: string;
}) {
  const cls =
    "flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/[0.06] text-text backdrop-blur-md transition-transform active:scale-90 hover:bg-white/10";
  if (href) {
    return (
      <Link href={href} className={cls} aria-label={label}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={cls} aria-label={label}>
      {children}
    </button>
  );
}

export default function Topbar({
  backHref,
  title,
  right,
  wide = false,
}: {
  backHref: string;
  title?: string;
  right?: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="sticky top-0 z-20 border-b border-line bg-bg/80 backdrop-blur-md">
      <div
        className={`mx-auto flex w-full items-center justify-between px-6 py-4 sm:px-10 lg:px-12 ${
          wide ? "max-w-6xl" : "max-w-2xl"
        }`}
      >
        <IconBtn href={backHref} label="Back">
          ‹
        </IconBtn>
        {title ? (
          <div className="m-0 font-cond text-[11.5px] font-semibold uppercase tracking-[0.22em] text-gold">
            {title}
          </div>
        ) : (
          <Logo size={32} showWordmark={false} />
        )}
        {right ?? <div className="w-10" />}
      </div>
    </div>
  );
}

export { IconBtn };
