import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { deleteSubmission } from "@/lib/server/submission-store";

export const runtime = "nodejs";

export async function DELETE(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ type: string; id: string }>;
  }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, id } = await params;
  if (type !== "reservations" && type !== "hosts") {
    return NextResponse.json({ error: "Unknown submission type." }, { status: 400 });
  }
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: "Invalid submission ID." }, { status: 400 });
  }

  try {
    const deleted = await deleteSubmission(type, id);
    if (!deleted) {
      return NextResponse.json({ error: "Submission not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Submission deletion failed", error);
    return NextResponse.json(
      { error: "We could not delete this submission." },
      { status: 500 }
    );
  }
}
