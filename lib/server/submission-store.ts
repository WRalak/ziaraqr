import "server-only";

import { randomUUID } from "crypto";
import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import type { HostApplicationInput, ReservationInput } from "@/lib/validation";

export interface ReservationRecord {
  id: string;
  package_id: number;
  package_code: string;
  package_name: string;
  full_name: string;
  phone: string;
  email: string;
  university: string;
  study_year: string | null;
  source: string;
  consent: boolean;
  status: "new" | "contacted" | "confirmed" | "declined";
  created_at: string;
}

export interface HostApplicationRecord {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  course: string;
  study_year: string;
  social_media: string | null;
  group_size: number;
  destinations: string[];
  motivation: string;
  source: string;
  consent: boolean;
  status: "new" | "reviewing" | "approved" | "declined";
  created_at: string;
}

interface SubmissionData {
  reservations: ReservationRecord[];
  hostApplications: HostApplicationRecord[];
}

const emptyData: SubmissionData = {
  reservations: [],
  hostApplications: [],
};

const dataDirectory = path.join(process.cwd(), ".data");
const dataFile = path.join(dataDirectory, "submissions.json");
let writeQueue = Promise.resolve();

function storageMode() {
  const mode = process.env.SUBMISSION_STORAGE?.toLowerCase();
  if (mode !== "local" && mode !== "supabase") {
    throw new Error(
      "SUBMISSION_STORAGE must be explicitly set to either 'local' or 'supabase'."
    );
  }
  return mode;
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase storage is enabled, but NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY is missing."
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function readLocalData(): Promise<SubmissionData> {
  try {
    return JSON.parse(await readFile(dataFile, "utf8")) as SubmissionData;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return structuredClone(emptyData);
    throw error;
  }
}

function updateLocalData(update: (data: SubmissionData) => void) {
  const operation = writeQueue.then(async () => {
    const data = await readLocalData();
    update(data);
    await mkdir(dataDirectory, { recursive: true });
    const temporaryFile = `${dataFile}.${randomUUID()}.tmp`;
    await writeFile(temporaryFile, JSON.stringify(data, null, 2), "utf8");
    await rename(temporaryFile, dataFile);
  });
  writeQueue = operation.catch(() => undefined);
  return operation;
}

export async function createReservation(
  input: ReservationInput,
  trip: { code: string; name: string }
) {
  const record: ReservationRecord = {
    id: randomUUID(),
    package_id: input.packageId,
    package_code: trip.code,
    package_name: trip.name,
    full_name: input.fullName,
    phone: input.phone,
    email: input.email,
    university: input.university,
    study_year: input.studyYear || null,
    source: input.source,
    consent: input.consent,
    status: "new",
    created_at: new Date().toISOString(),
  };

  if (storageMode() === "supabase") {
    const { error } = await getSupabase().from("reservations").insert(record);
    if (error) throw new Error(error.message);
  } else {
    await updateLocalData((data) => data.reservations.unshift(record));
  }

  return record;
}

export async function createHostApplication(input: HostApplicationInput) {
  const record: HostApplicationRecord = {
    id: randomUUID(),
    full_name: input.fullName,
    phone: input.phone,
    email: input.email,
    course: input.course,
    study_year: input.studyYear,
    social_media: input.socialMedia || null,
    group_size: input.groupSize,
    destinations: input.destinations,
    motivation: input.motivation,
    source: input.source,
    consent: input.consent,
    status: "new",
    created_at: new Date().toISOString(),
  };

  if (storageMode() === "supabase") {
    const { error } = await getSupabase().from("host_applications").insert(record);
    if (error) throw new Error(error.message);
  } else {
    await updateLocalData((data) => data.hostApplications.unshift(record));
  }

  return record;
}

export async function listReservations() {
  if (storageMode() === "supabase") {
    const { data, error } = await getSupabase()
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data as ReservationRecord[];
  }
  return (await readLocalData()).reservations;
}

export async function listHostApplications() {
  if (storageMode() === "supabase") {
    const { data, error } = await getSupabase()
      .from("host_applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data as HostApplicationRecord[];
  }
  return (await readLocalData()).hostApplications;
}

export async function deleteSubmission(
  type: "reservations" | "hosts",
  id: string
) {
  if (storageMode() === "supabase") {
    const table = type === "reservations" ? "reservations" : "host_applications";
    const { data, error } = await getSupabase()
      .from(table)
      .delete()
      .eq("id", id)
      .select("id");
    if (error) throw new Error(error.message);
    return Boolean(data?.length);
  }

  let deleted = false;
  await updateLocalData((data) => {
    if (type === "reservations") {
      const previousLength = data.reservations.length;
      data.reservations = data.reservations.filter((item) => item.id !== id);
      deleted = data.reservations.length < previousLength;
      return;
    }

    const previousLength = data.hostApplications.length;
    data.hostApplications = data.hostApplications.filter((item) => item.id !== id);
    deleted = data.hostApplications.length < previousLength;
  });
  return deleted;
}
