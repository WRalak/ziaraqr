"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./Button";
import { DEST_CHIPS } from "@/lib/data";

export default function HostForm() {
  const router = useRouter();
  const [groupSize, setGroupSize] = useState(10);
  const [dest, setDest] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function toggleDest(d: string) {
    setDest((prev) => {
      const next = new Set(prev);
      if (next.has(d)) next.delete(d);
      else next.add(d);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/host-applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: formData.get("fullName"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        course: formData.get("course"),
        studyYear: formData.get("studyYear"),
        socialMedia: formData.get("socialMedia"),
        groupSize,
        destinations: Array.from(dest),
        motivation: formData.get("motivation"),
        source: "qr-strathmore-cultural-week",
        consent: formData.get("consent") === "on",
      }),
    });
    const result = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(result.error ?? "We could not save your application.");
      setSubmitting(false);
      return;
    }

    router.push("/host/success");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Full name">
        <input required name="fullName" type="text" autoComplete="name" placeholder="e.g. Kevin Otieno" />
      </Field>
      <Field label="Phone number">
        <input required name="phone" type="tel" autoComplete="tel" placeholder="07XX XXX XXX" />
      </Field>
      <Field label="Email">
        <input required name="email" type="email" autoComplete="email" placeholder="you@student.ac.ke" />
      </Field>
      <Field label="Course">
        <input required name="course" type="text" placeholder="e.g. Commerce, Finance" />
      </Field>
      <Field label="Year of study">
        <select required name="studyYear" defaultValue="">
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
        <input name="socialMedia" type="text" placeholder="@yourhandle" />
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
          name="motivation"
          placeholder="Tell us what's driving you to lead trips..."
        />
      </Field>

      <label className="flex items-start gap-3 rounded-md2 border border-line bg-card p-3.5 text-sm leading-snug text-text-dim">
        <input required name="consent" type="checkbox" className="mt-0.5 h-4 w-4 accent-gold" />
        <span>
          I agree that Ziarra may use these details to review my application and contact me.{" "}
          <a href="/privacy" target="_blank" className="text-gold underline underline-offset-2">
            Privacy notice
          </a>
        </span>
      </label>
      {error && (
        <div role="alert" className="rounded-md2 border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">
          {error}
        </div>
      )}
      <Button type="submit" disabled={submitting}>
        {submitting ? "Saving…" : "Submit Application"}
      </Button>
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
