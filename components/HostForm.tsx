"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./Button";
import { DEST_CHIPS } from "@/lib/data";

export default function HostForm() {
  const router = useRouter();
  const [groupSize, setGroupSize] = useState(10);
  const [dest, setDest] = useState<Set<string>>(new Set());

  function toggleDest(d: string) {
    setDest((prev) => {
      const next = new Set(prev);
      if (next.has(d)) next.delete(d);
      else next.add(d);
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/host/success");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Full name">
        <input required type="text" placeholder="e.g. Kevin Otieno" />
      </Field>
      <Field label="Phone number">
        <input required type="tel" placeholder="07XX XXX XXX" />
      </Field>
      <Field label="Email">
        <input required type="email" placeholder="you@student.ac.ke" />
      </Field>
      <Field label="Course">
        <input required type="text" placeholder="e.g. Commerce, Finance" />
      </Field>
      <Field label="Year of study">
        <select required defaultValue="">
          <option value="">Select year</option>
          <option>Year 1</option>
          <option>Year 2</option>
          <option>Year 3</option>
          <option>Year 4</option>
          <option>Year 5+</option>
          <option>Graduate</option>
        </select>
      </Field>
      <Field label="Social media" opt>
        <input type="text" placeholder="@yourhandle" />
      </Field>

      <div>
        <label className="mb-1.5 block font-cond text-[12.5px] uppercase tracking-[0.04em] text-text-dim">
          How many people could you bring?
        </label>
        <div className="flex w-fit items-center gap-3.5 rounded-md2 border border-line bg-card px-3.5 py-2">
          <button
            type="button"
            onClick={() => setGroupSize((s) => Math.max(1, s - 5))}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08] text-lg text-text"
          >
            −
          </button>
          <span className="min-w-[24px] text-center font-display text-lg">{groupSize}</span>
          <button
            type="button"
            onClick={() => setGroupSize((s) => s + 5)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08] text-lg text-text"
          >
            +
          </button>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block font-cond text-[12.5px] uppercase tracking-[0.04em] text-text-dim">
          Preferred destinations
        </label>
        <div className="flex flex-wrap gap-2">
          {DEST_CHIPS.map((d) => (
            <button
              type="button"
              key={d}
              onClick={() => toggleDest(d)}
              className={`rounded-full border px-3.5 py-[9px] font-cond text-[13px] transition-colors ${
                dest.has(d)
                  ? "border-gold bg-gold font-semibold text-bg"
                  : "border-line bg-card text-text-dim"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <Field label="Why would you like to host?">
        <textarea
          required
          placeholder="Tell us what's driving you to lead trips..."
        />
      </Field>

      <Button type="submit">Submit Application</Button>
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
      <div className="[&>input]:w-full [&>input]:rounded-md2 [&>input]:border [&>input]:border-line [&>input]:bg-card [&>input]:px-4 [&>input]:py-[15px] [&>input]:text-[15.5px] [&>input]:text-text [&>input]:outline-none focus-within:[&>input]:border-gold-line [&>select]:w-full [&>select]:rounded-md2 [&>select]:border [&>select]:border-line [&>select]:bg-card [&>select]:px-4 [&>select]:py-[15px] [&>select]:text-[15.5px] [&>select]:text-text [&>select]:outline-none focus-within:[&>select]:border-gold-line [&>textarea]:w-full [&>textarea]:min-h-[90px] [&>textarea]:resize-none [&>textarea]:rounded-md2 [&>textarea]:border [&>textarea]:border-line [&>textarea]:bg-card [&>textarea]:px-4 [&>textarea]:py-[15px] [&>textarea]:text-[15.5px] [&>textarea]:text-text [&>textarea]:outline-none focus-within:[&>textarea]:border-gold-line">
        {children}
      </div>
    </div>
  );
}
