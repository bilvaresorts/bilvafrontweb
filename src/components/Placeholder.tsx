import { cn } from "./ui";

/**
 * Stands in for a photograph or render that has not been supplied yet.
 * It is deliberately plain: the site never shows another developer's villa,
 * or a stock villa, as Bilva's.
 */
export function Placeholder({
  label,
  tone = "light",
  className,
}: {
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${label}: image to be supplied`}
      className={cn(
        "relative flex items-end overflow-hidden",
        tone === "dark" ? "bg-coal text-paper/60" : "bg-[#dcdcdc] text-graphite/80",
        className,
      )}
    >
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-40"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path
          d="M0 0L100 100M100 0L0 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="relative p-4 md:p-5">
        <p className="text-[10px] uppercase tracking-eyebrow">Image to be supplied</p>
        <p className="mt-1 text-sm font-medium">{label}</p>
      </div>
    </div>
  );
}
