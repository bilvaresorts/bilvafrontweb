import { z } from "zod";

export const enquiryTypes = [
  { id: "villa", label: "Villa purchase" },
  { id: "investment", label: "Investment" },
  { id: "rental", label: "Rental income" },
  { id: "hotel", label: "Hotel" },
  { id: "site-visit", label: "Site visit" },
  { id: "general", label: "General enquiry" },
] as const;

export type EnquiryTypeId = (typeof enquiryTypes)[number]["id"];

const typeIds = enquiryTypes.map((t) => t.id) as [EnquiryTypeId, ...EnquiryTypeId[]];

export const budgetOptions = [
  "One villa, around ₹1.4 Cr",
  "Two villas",
  "More than two villas",
  "Still deciding",
];

/** Shared by the form (client) and the API route (server). */
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "Please shorten your name"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9][0-9\s-]{7,16}$/, "Enter a phone number with 8 to 15 digits"),
  email: z
    .string()
    .trim()
    .max(120, "Please shorten the email address")
    .refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v), "Enter a valid email address"),
  type: z.enum(typeIds),
  budget: z.string().max(60).optional(),
  preferredDate: z.string().max(20).optional(),
  message: z.string().trim().max(1500, "Please keep the message under 1,500 characters").optional(),
  consent: z.boolean().refine((v) => v === true, "Please tick the box so we can contact you"),
  /** Page or section the enquiry came from. */
  source: z.string().max(120).optional(),
  /** Structured extras, such as a Nakshatra name or calculator inputs. */
  context: z.record(z.string(), z.string().max(200)).optional(),
  /** Honeypot. Real visitors never see or fill this field. */
  hp_field: z.string().max(200).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export type FieldErrors = Partial<Record<keyof EnquiryInput, string>>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof EnquiryInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
