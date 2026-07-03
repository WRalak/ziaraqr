"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useToast } from "./ToastProvider";

const stores = [
  {
    name: "Google Play",
    href: "https://play.google.com/store/apps/details?id=com.app.ziara&pcampaignid=web_share",
  },
  {
    name: "App Store",
    href: "https://apps.apple.com/ke/app/ziarra/id6748342447",
  },
];

const companyLinks: { label: string; href?: string }[] = [
  { label: "Our Services" },
  { label: "About us" },
  { label: "Careers" },
  { label: "Blogs" },
  { label: "Privacy policy", href: "/privacy" },
];

export default function Footer() {
  const toast = useToast();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo size={32} />
            <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-text-dim">
              Explore the world, together. Create group adventures that feel like home.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {stores.map((store) => (
                <a
                  key={store.name}
                  href={store.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-line px-4 py-2 font-cond text-xs uppercase tracking-[0.08em] text-text-dim transition-colors hover:border-gold-line hover:text-text"
                >
                  {store.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 font-cond text-[11.5px] font-semibold uppercase tracking-[0.22em] text-gold">
              Company
            </div>
            <ul className="space-y-2.5 text-sm text-text-dim">
              {companyLinks.map((link) =>
                link.href ? (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-colors hover:text-text">
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => toast(`${link.label} coming soon…`)}
                      className="transition-colors hover:text-text"
                    >
                      {link.label}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <div className="mb-4 font-cond text-[11.5px] font-semibold uppercase tracking-[0.22em] text-gold">
              Get in touch
            </div>
            <ul className="space-y-2.5 text-sm text-text-dim">
              <li>
                <a href="tel:+254114442895" className="transition-colors hover:text-text">
                  +254 114 442 895
                </a>
              </li>
              <li>
                <a href="mailto:info@ziarra.world" className="transition-colors hover:text-text">
                  info@ziarra.world
                </a>
              </li>
              <li>Nairobi, Kenya</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-center font-cond text-xs tracking-[0.03em] text-text-faint">
          Copyright {year} © Ziarra. All Right Reserved.
        </div>
      </div>
    </footer>
  );
}
