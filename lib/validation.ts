import { z } from "zod";

const phone = z
  .string()
  .trim()
  .min(9, "Enter a valid phone number.")
  .max(24, "Enter a valid phone number.")
  .regex(/^[+()\d\s-]+$/, "Enter a valid phone number.");

const email = z.string().trim().toLowerCase().email("Enter a valid email address.");

const studyYear = z
  .enum(["Year 1", "Year 2", "Year 3", "Year 4", "Year 5+", "Graduate"])
  .or(z.literal(""));

export const reservationSchema = z.object({
  packageId: z.number().int().positive(),
  fullName: z.string().trim().min(2).max(120),
  phone,
  email,
  university: z.string().trim().min(2).max(160),
  studyYear,
  source: z.string().trim().min(1).max(80).default("direct"),
  consent: z.literal(true, "Consent is required."),
});

export const hostApplicationSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required.").max(120),
  phone,
  email,
  course: z.string().trim().min(1, "Course is required.").max(160),
  studyYear: z.enum([
    "Year 1",
    "Year 2",
    "Year 3",
    "Year 4",
    "Year 5+",
    "Graduate",
  ]),
  socialMedia: z.string().trim().max(120).default(""),
  groupSize: z.number().int().min(1).max(500),
  destinations: z.array(z.string().trim().min(1).max(80)).max(12).default([]),
  motivation: z.string().trim().min(1, "Please tell us why you would like to host.").max(2000),
  source: z.string().trim().min(1).max(80).default("direct"),
  consent: z.literal(true, "Consent is required."),
});

export type ReservationInput = z.infer<typeof reservationSchema>;
export type HostApplicationInput = z.infer<typeof hostApplicationSchema>;
