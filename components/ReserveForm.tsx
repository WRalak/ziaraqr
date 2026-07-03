"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./Button";

export default function ReserveForm({ tripId }: { tripId: number }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        packageId: tripId,
        fullName: formData.get("fullName"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        university: formData.get("university"),
        studyYear: formData.get("studyYear"),
        source: "qr-strathmore-cultural-week",
        consent: formData.get("consent") === "on",
      }),
    });
    const result = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(result.error ?? "We could not save your reservation.");
      setSubmitting(false);
      return;
    }

    router.push(`/join/success?trip=${tripId}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Full name">
        <input required name="fullName" type="text" autoComplete="name" placeholder="e.g. Amina Wanjiru" />
      </Field>
      <Field label="Phone number">
        <input required name="phone" type="tel" autoComplete="tel" placeholder="07XX XXX XXX" />
      </Field>
      <Field label="Email">
        <input required name="email" type="email" autoComplete="email" placeholder="you@student.ac.ke" />
      </Field>
      <Field label="University">
        <input required name="university" type="text" autoComplete="organization" placeholder="e.g. Strathmore University" />
      </Field>
      <Field label="Year of study" opt>
        <select name="studyYear" defaultValue="">
          <option value="">Select year</option>
          <option>Year 1</option>
          <option>Year 2</option>
          <option>Year 3</option>
          <option>Year 4</option>
          <option>Year 5+</option>
          <option>Graduate</option>
        </select>
      </Field>
      <label className="flex items-start gap-3 rounded-md2 border border-line bg-card p-3.5 text-sm leading-snug text-text-dim">
        <input required name="consent" type="checkbox" className="mt-0.5 h-4 w-4 accent-gold" />
        <span>
          I agree that Ziarra may use these details to contact me about this reservation.{" "}
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
        {submitting ? "Saving…" : "Reserve My Spot"}
      </Button>
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
