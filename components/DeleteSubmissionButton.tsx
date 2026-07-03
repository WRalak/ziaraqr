"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteSubmissionButton({
  id,
  type,
  label,
}: {
  id: string;
  type: "reservations" | "hosts";
  label: string;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    if (!window.confirm(`Permanently delete ${label}? This cannot be undone.`)) return;

    setDeleting(true);
    setError("");
    const response = await fetch(`/api/admin/submissions/${type}/${id}`, {
      method: "DELETE",
    });
    const result = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(result.error ?? "Delete failed.");
      setDeleting(false);
      return;
    }

    router.refresh();
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        disabled={deleting}
        onClick={handleDelete}
        className="rounded-full border border-red-400/30 px-3 py-1.5 font-cond text-xs text-red-300 hover:bg-red-400/10 disabled:cursor-wait disabled:opacity-50"
      >
        {deleting ? "Deleting…" : "Delete"}
      </button>
      {error && <span className="max-w-32 text-xs text-red-300">{error}</span>}
    </div>
  );
}
