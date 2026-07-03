import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import DeleteSubmissionButton from "@/components/DeleteSubmissionButton";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import {
  listHostApplications,
  listReservations,
} from "@/lib/server/submission-store";

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-KE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Nairobi",
  }).format(new Date(value));
}

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const [reservations, hostApplications] = await Promise.all([
    listReservations(),
    listHostApplications(),
  ]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-5 py-8 sm:px-8">
      <header className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <Logo />
          <h1 className="mb-1 mt-5 font-display text-4xl font-medium">Submissions</h1>
          <p className="m-0 text-sm text-text-dim">
            {reservations.length} reservations · {hostApplications.length} host applications
          </p>
        </div>
        <form action="/api/admin/session" method="post">
          <input type="hidden" name="_method" value="DELETE" />
          <button
            type="submit"
            className="rounded-full border border-line px-4 py-2 font-cond text-sm text-text-dim"
          >
            Sign out
          </button>
        </form>
      </header>

      <SubmissionSection
        title="Trip reservations"
        count={reservations.length}
        exportHref="/api/admin/export?type=reservations"
      >
        <div className="overflow-x-auto rounded-lg2 border border-line">
          <table className="w-full min-w-[980px] border-collapse text-left text-sm">
            <thead className="bg-card text-xs uppercase tracking-wide text-text-faint">
              <tr>
                {["Submitted", "Trip", "Name", "Phone", "Email", "University", "Year", "Source", "Status", "Actions"].map(
                  (heading) => <th key={heading} className="px-4 py-3">{heading}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {reservations.map((item) => (
                <tr key={item.id} className="border-t border-line">
                  <td className="whitespace-nowrap px-4 py-3 text-text-dim">{formatDate(item.created_at)}</td>
                  <td className="px-4 py-3">{item.package_name}</td>
                  <td className="px-4 py-3">{item.full_name}</td>
                  <td className="whitespace-nowrap px-4 py-3"><a href={`tel:${item.phone}`}>{item.phone}</a></td>
                  <td className="px-4 py-3"><a href={`mailto:${item.email}`}>{item.email}</a></td>
                  <td className="px-4 py-3">{item.university}</td>
                  <td className="px-4 py-3">{item.study_year || "—"}</td>
                  <td className="px-4 py-3">{item.source}</td>
                  <td className="px-4 py-3 text-gold">{item.status}</td>
                  <td className="px-4 py-3">
                    <DeleteSubmissionButton
                      id={item.id}
                      type="reservations"
                      label={`${item.full_name}'s reservation`}
                    />
                  </td>
                </tr>
              ))}
              {!reservations.length && <EmptyRow columns={10} />}
            </tbody>
          </table>
        </div>
      </SubmissionSection>

      <SubmissionSection
        title="Host applications"
        count={hostApplications.length}
        exportHref="/api/admin/export?type=hosts"
      >
        <div className="overflow-x-auto rounded-lg2 border border-line">
          <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
            <thead className="bg-card text-xs uppercase tracking-wide text-text-faint">
              <tr>
                {["Submitted", "Name", "Phone", "Email", "Course", "Year", "Group", "Destinations", "Motivation", "Status", "Actions"].map(
                  (heading) => <th key={heading} className="px-4 py-3">{heading}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {hostApplications.map((item) => (
                <tr key={item.id} className="border-t border-line align-top">
                  <td className="whitespace-nowrap px-4 py-3 text-text-dim">{formatDate(item.created_at)}</td>
                  <td className="px-4 py-3">{item.full_name}</td>
                  <td className="whitespace-nowrap px-4 py-3"><a href={`tel:${item.phone}`}>{item.phone}</a></td>
                  <td className="px-4 py-3"><a href={`mailto:${item.email}`}>{item.email}</a></td>
                  <td className="px-4 py-3">{item.course}</td>
                  <td className="px-4 py-3">{item.study_year}</td>
                  <td className="px-4 py-3">{item.group_size}</td>
                  <td className="px-4 py-3">{item.destinations.join(", ") || "—"}</td>
                  <td className="max-w-xs px-4 py-3 text-text-dim">{item.motivation}</td>
                  <td className="px-4 py-3 text-gold">{item.status}</td>
                  <td className="px-4 py-3">
                    <DeleteSubmissionButton
                      id={item.id}
                      type="hosts"
                      label={`${item.full_name}'s application`}
                    />
                  </td>
                </tr>
              ))}
              {!hostApplications.length && <EmptyRow columns={11} />}
            </tbody>
          </table>
        </div>
      </SubmissionSection>
    </main>
  );
}

function SubmissionSection({
  title,
  count,
  exportHref,
  children,
}: {
  title: string;
  count: number;
  exportHref: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="m-0 font-display text-2xl font-medium">
          {title} <span className="font-cond text-sm text-text-faint">({count})</span>
        </h2>
        <a href={exportHref} className="rounded-full border border-gold-line px-4 py-2 font-cond text-sm text-gold">
          Export CSV
        </a>
      </div>
      {children}
    </section>
  );
}

function EmptyRow({ columns }: { columns: number }) {
  return (
    <tr>
      <td colSpan={columns} className="px-4 py-10 text-center text-text-faint">
        No submissions yet.
      </td>
    </tr>
  );
}
