"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { sendPrefill, stashPrefill, type Prefill } from "@/lib/prefill";
import { Arrow, buttonClass, cn, type ButtonVariant } from "./ui";

/** Scrolls to an enquiry form on the page and hands it some starting values. */
export function goToEnquiry(prefill: Prefill, targetId = "enquire") {
  sendPrefill(prefill);
  const target = document.getElementById(targetId);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  const field = target.querySelector<HTMLElement>("input:not([type=hidden]):not([tabindex='-1'])");
  window.setTimeout(() => field?.focus({ preventScroll: true }), 600);
}

export function PrefillButton({
  prefill,
  targetId,
  variant = "outline-dark",
  className,
  children,
}: {
  prefill: Prefill;
  targetId?: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" className={buttonClass(variant, className)} onClick={() => goToEnquiry(prefill, targetId)}>
      {children}
    </button>
  );
}

/**
 * A button for pages that have no form of their own. It opens the enquiry form
 * on the Contact page with the right subject already chosen.
 */
export function EnquireLink({
  prefill,
  variant = "solid-light",
  className,
  arrow = false,
  children,
}: {
  prefill: Prefill;
  variant?: ButtonVariant;
  className?: string;
  arrow?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href="/contact#enquire"
      className={cn(buttonClass(variant, className), "group")}
      onClick={() => stashPrefill(prefill)}
    >
      {children}
      {arrow ? <Arrow /> : null}
    </Link>
  );
}
