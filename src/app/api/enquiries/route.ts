import { NextResponse } from "next/server";
import { enquirySchema, toFieldErrors } from "@/lib/enquiry";
import { saveEnquiry } from "@/lib/enquiry-store";

const MAX_BODY_BYTES = 10_000;

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, message: "The enquiry is too long." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, message: "The enquiry could not be read." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please check the highlighted fields.",
        fieldErrors: toFieldErrors(parsed.error),
      },
      { status: 422 },
    );
  }

  // A filled honeypot means a bot. Answer as if it worked and store nothing.
  if (parsed.data.hp_field) {
    return NextResponse.json({ ok: true });
  }

  try {
    const record = await saveEnquiry(parsed.data);
    return NextResponse.json({ ok: true, id: record.id });
  } catch (error) {
    console.error("Enquiry could not be saved:", error);
    return NextResponse.json(
      { ok: false, message: "We could not save your enquiry. Please try again in a moment." },
      { status: 500 },
    );
  }
}
