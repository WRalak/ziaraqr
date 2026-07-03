"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

export default function ReserveForm({ tripId }: { tripId: number }) {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/join/success?trip=${tripId}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Full name">
        <input required type="text" placeholder="e.g. Amina Wanjiru" />
      </Field>
      <Field label="Phone number">
        <input required type="tel" placeholder="07XX XXX XXX" />
      </Field>
      <Field label="Email">
        <input required type="email" placeholder="you@student.ac.ke" />
      </Field>
      <Field label="University">
        <input required type="text" placeholder="e.g. Strathmore University" />
      </Field>
      <Field label="Year of study" opt>
        <select defaultValue="">
          <option value="">Select year</option>
          <option>Year 1</option>
          <option>Year 2</option>
          <option>Year 3</option>
          <option>Year 4</option>
          <option>Year 5+</option>
          <option>Graduate</option>
        </select>
      </Field>
      <Button type="submit">Reserve My Spot</Button>
      <div className="text-center font-cond text-xs tracking-[0.02em] text-text-faint">
        No payment now — a host coordinator will confirm details with you.
      </div>
    </form>
  );
}

function Field({
  label,
  opt,
  children,
}: {
  label: string;
  opt?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-cond text-[12.5px] uppercase tracking-[0.04em] text-text-dim">
        {label}
        {opt && (
          <span className="ml-1 font-cond text-[10.5px] normal-case tracking-[0.02em] text-text-faint">
            (optional)
          </span>
        )}
      </label>
      <div className="[&>input]:w-full [&>input]:rounded-md2 [&>input]:border [&>input]:border-line [&>input]:bg-card [&>input]:px-4 [&>input]:py-[15px] [&>input]:text-[15.5px] [&>input]:text-text [&>input]:outline-none [&>input]:transition-colors focus-within:[&>input]:border-gold-line [&>select]:w-full [&>select]:rounded-md2 [&>select]:border [&>select]:border-line [&>select]:bg-card [&>select]:px-4 [&>select]:py-[15px] [&>select]:text-[15.5px] [&>select]:text-text [&>select]:outline-none focus-within:[&>select]:border-gold-line">
        {children}
      </div>
    </div>
  );
}
