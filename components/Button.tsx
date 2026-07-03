import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

const base =
  "font-cond font-semibold uppercase tracking-[0.04em] text-[15px] rounded-full border-none w-full py-[18px] px-[22px] flex items-center justify-center gap-2 transition-transform active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-bg shadow-[0_8px_24px_-6px_rgba(255,184,0,0.45)] active:shadow-[0_4px_14px_-4px_rgba(255,184,0,0.4)]",
  outline: "bg-transparent text-text border border-line-strong border-[1.5px]",
  ghost: "bg-white/5 text-text border border-line",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  href,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
