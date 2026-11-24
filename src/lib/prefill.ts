import type { EnquiryTypeId } from "./enquiry";

/**
 * Hands values from one part of a page (the nameplate preview, the price
 * card) to the enquiry form without putting personal data in a web address.
 */
export type Prefill = {
  name?: string;
  type?: EnquiryTypeId;
  message?: string;
  context?: Record<string, string>;
};

const KEY = "bilva:prefill";
export const PREFILL_EVENT = "bilva:prefill";

export function sendPrefill(prefill: Prefill): void {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(prefill));
  } catch {
    // Storage can be unavailable in private windows; the event still fires.
  }
  window.dispatchEvent(new CustomEvent<Prefill>(PREFILL_EVENT, { detail: prefill }));
}

/**
 * Leaves values for the enquiry form on another page (the Contact page) to pick
 * up when it opens. Unlike `sendPrefill` it does not notify forms on this page.
 */
export function stashPrefill(prefill: Prefill): void {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(prefill));
  } catch {
    // Without storage the Contact form simply opens with its defaults.
  }
}

export function takePrefill(): Prefill | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    window.sessionStorage.removeItem(KEY);
    return JSON.parse(raw) as Prefill;
  } catch {
    return null;
  }
}
