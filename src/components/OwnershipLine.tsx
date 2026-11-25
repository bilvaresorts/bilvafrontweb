import Image from "next/image";
import { ownershipNote, ownershipPoints } from "@/lib/content";
import { cn } from "./ui";

const pad = (index: number) => String(index + 1).padStart(2, "0");

/**
 * What an owner can do with a villa, as a grid of highlight cards: buy it,
 * lease it back, rent it out, get monthly income, and so on. Each card carries
 * the leaf and one short line in large type.
 *
 * Two across on phones, four across on wide screens. Nothing moves; from
 * tablet width up a card turns dark under the pointer. The point about income
 * is starred, and the note under the grid says it is not guaranteed.
 */
export function OwnershipLine({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ul aria-label="What you can do with your villa" className="grid grid-cols-2 gap-2.5 md:gap-4 lg:grid-cols-4">
        {ownershipPoints.map((point, index) => (
          <li
            key={point.title}
            className="group flex min-h-[8.75rem] flex-col justify-between border border-rule bg-white p-4 text-ink transition-colors duration-500 ease-out-soft md:min-h-[11.5rem] md:p-7 md:hover:border-ink md:hover:bg-ink md:hover:text-paper"
          >
            <span className="flex items-center justify-between">
              <Image src="/brand/mark.png" alt="" width={410} height={319} sizes="44px" className="h-6 w-auto md:h-8" />
              <span className="text-[11px] tabular-nums text-stone transition-colors duration-500 md:group-hover:text-paper/55">
                {pad(index)}
              </span>
            </span>
            <span className="mt-6 text-[1.0625rem] font-medium leading-snug md:text-2xl md:leading-tight">
              {point.title}
              {point.starred ? <span aria-hidden>*</span> : null}
            </span>
          </li>
        ))}
      </ul>
      <p className={cn("mt-4 max-w-3xl text-[11px] leading-5 text-stone")}>*{ownershipNote}</p>
    </div>
  );
}
