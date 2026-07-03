import Logo from "@/components/Logo";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const query = await searchParams;
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-12">
      <Logo size={46} />
      <h1 className="mb-2 mt-8 font-display text-4xl font-medium">Submissions admin</h1>
      <p className="mb-7 text-text-dim">
        Sign in to view and export reservations and host applications.
      </p>
      <form action="/api/admin/session" method="post" className="flex flex-col gap-4">
        <label className="font-cond text-xs uppercase tracking-[0.08em] text-text-dim">
          Admin password
          <input
            required
            autoFocus
            name="password"
            type="password"
            autoComplete="current-password"
            className="mt-2 w-full rounded-md2 border border-line bg-card px-4 py-4 font-body text-base normal-case tracking-normal text-text outline-none focus:border-gold-line"
          />
        </label>
        {query.error && (
          <p role="alert" className="m-0 rounded-md2 border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">
            Incorrect password.
          </p>
        )}
        <button className="rounded-full bg-gold px-5 py-4 font-cond font-semibold uppercase tracking-[0.05em] text-bg">
          Open dashboard
        </button>
      </form>
    </main>
  );
}
