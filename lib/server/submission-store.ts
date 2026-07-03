import "server-only";

import { randomUUID } from "crypto";
import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { HostApplicationInput, ReservationInput } from "@/lib/validation";
import {
  getSubmissionStorageMode,
  getSupabaseServerConfig,
} from "@/lib/server/env";

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
let supabaseClient: SupabaseClient | undefined;

export class SubmissionStoreError extends Error {
  constructor(operation: string) {
    super(`Submission storage operation failed: ${operation}`);
    this.name = "SubmissionStoreError";
  }
}

function getSupabase() {
  if (supabaseClient) return supabaseClient;
  const { url, serviceRoleKey } = getSupabaseServerConfig();

  supabaseClient = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return supabaseClient;
}

function throwSupabaseError(
  operation: string,
  error: { code?: string; message: string; hint?: string | null }
): never {
  console.error(`[supabase] ${operation} failed`, {
    code: error.code ?? "unknown",
    message: error.message,
    hint: error.hint ?? undefined,
  });
  throw new SubmissionStoreError(operation);
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

  if (getSubmissionStorageMode() === "supabase") {
    const { error } = await getSupabase().from("reservations").insert(record);
    if (error) throwSupabaseError("reservations.insert", error);
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

  if (getSubmissionStorageMode() === "supabase") {
    const { error } = await getSupabase().from("host_applications").insert(record);
    if (error) throwSupabaseError("host_applications.insert", error);
  } else {
    await updateLocalData((data) => data.hostApplications.unshift(record));
  }

  return record;
}

export async function listReservations() {
  if (getSubmissionStorageMode() === "supabase") {
    const { data, error } = await getSupabase()
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throwSupabaseError("reservations.select", error);
    return data as ReservationRecord[];
  }
  return (await readLocalData()).reservations;
}

export async function listHostApplications() {
  if (getSubmissionStorageMode() === "supabase") {
    const { data, error } = await getSupabase()
      .from("host_applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throwSupabaseError("host_applications.select", error);
    return data as HostApplicationRecord[];
  }
  return (await readLocalData()).hostApplications;
}

export async function deleteSubmission(
  type: "reservations" | "hosts",
  id: string
) {
  if (getSubmissionStorageMode() === "supabase") {
    const table = type === "reservations" ? "reservations" : "host_applications";
    const { data, error } = await getSupabase()
      .from(table)
      .delete()
      .eq("id", id)
      .select("id");
    if (error) throwSupabaseError(`${table}.delete`, error);
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
