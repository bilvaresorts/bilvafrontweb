const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** ₹1,36,00,000 with Indian digit grouping. */
export function formatInr(amount: number): string {
  return inr.format(Math.round(amount));
}

/** Rounds an estimate so it does not imply false precision. */
export function roundTo(amount: number, step: number): number {
  return Math.round(amount / step) * step;
}

/** "₹1.36 Cr", "₹12 lakh" or "₹6,575". */
export function formatInrWords(amount: number): string {
  if (amount >= 10000000) return `₹${trim(amount / 10000000)} Cr`;
  if (amount >= 100000) return `₹${trim(amount / 100000)} lakh`;
  return formatInr(amount);
}

function trim(value: number): string {
  return value.toFixed(2).replace(/\.?0+$/, "");
}
