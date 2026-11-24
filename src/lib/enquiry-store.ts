import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { EnquiryInput } from "./enquiry";

export type StoredEnquiry = Omit<EnquiryInput, "hp_field" | "consent"> & {
  id: string;
  createdAt: string;
  consent: true;
  status: "new";
};

/**
 * Where enquiries go.
 *
 * - "file": appends JSON lines to .data/enquiries.jsonl. This is the default
 *   in development so the forms work end to end on a preview.
 * - Production needs the Postgres and email adapters from milestone 4. Until
 *   ENQUIRY_STORE is configured there, saving fails loudly so that no enquiry
 *   is ever dropped silently.
 */
function storeKind(): "file" | "unconfigured" {
  const configured = process.env.ENQUIRY_STORE;
  if (configured === "file") return "file";
  if (!configured && process.env.NODE_ENV !== "production") return "file";
  return "unconfigured";
}

export async function saveEnquiry(input: EnquiryInput): Promise<StoredEnquiry> {
  const { hp_field: _honeypot, consent: _consent, ...rest } = input;
  void _honeypot;
  void _consent;

  const record: StoredEnquiry = {
    ...rest,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    consent: true,
    status: "new",
  };

  if (storeKind() === "unconfigured") {
    throw new Error("Enquiry storage is not configured. Set ENQUIRY_STORE.");
  }

  const dir = path.join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "enquiries.jsonl"), JSON.stringify(record) + "\n", "utf8");
  return record;
}
