"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { cn } from "./ui";

export type Panel = {
  title: string;
  /** One short line. */
  text: string;
  image: { src: string; alt: string; position?: string };
  /** Small label in the corner, such as "Illustrative image". */
  note?: string;
  /** A status above the title, such as "Under construction". */
  tag?: string;
  /** Where the panel leads, with the words for the link. */
  href?: string;
  cta?: string;
};

const pad = (index: number) => String(index + 1).padStart(2, "0");

/**
 * A set of photographs, each with a title and one line.
 *
 * On phones every photograph is shown in full, one under another, with nothing
 * to tap open. From tablet width up they sit in a row with one open and the
 * rest waiting as slim strips; a panel opens on hover, click or keyboard focus.
 */
export function ExpandingPanels({
  items,
  openShare = 6,
  className,
}: {
  items: Panel[];
  /** How many times wider the open panel is than a closed one, on wide screens. */
  openShare?: number;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const id = useId();

  return (
    <ul className={cn("flex flex-col gap-3 md:h-[34rem] md:flex-row", className)}>
      {items.map((item, index) => {
        // "Open" only means anything from tablet width up. On phones every panel is shown in full.
        const open = index === active;
        return (
          <li
            key={item.title}
            style={{ flexGrow: open ? openShare : 1 }}
            className="relative flex min-h-[17rem] shrink-0 flex-col overflow-hidden bg-coal text-paper md:h-full md:min-h-0 md:min-w-0 md:shrink md:basis-0 md:transition-[flex-grow] md:duration-700 md:ease-out-soft"
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setActive(index);
            }}
          >
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              quality={90}
              className={cn(
                "object-cover transition-transform duration-[1400ms] ease-out-soft",
                item.image.position ?? "object-center",
                !open && "md:scale-110",
              )}
            />
            {/* Behind the words: a soft shade when the panel is showing, a flat one when it is a strip. */}
            <div
              aria-hidden
              className={cn(
                "absolute inset-0 bg-linear-to-t from-ink/90 via-ink/45 to-ink/5 transition-opacity duration-500",
                !open && "md:opacity-0",
              )}
            />
            <div
              aria-hidden
              className={cn(
                "absolute inset-0 hidden bg-ink/55 transition-opacity duration-500 md:block",
                open ? "opacity-0" : "opacity-100",
              )}
            />

            {/* From tablet width up the whole panel is the control that opens it. Its label is the strip. */}
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`${id}-${index}`}
              onClick={() => setActive(index)}
              onFocus={() => setActive(index)}
              className={cn(
                "absolute inset-0 z-10 hidden w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-paper md:block",
                open ? "cursor-default" : "cursor-pointer",
              )}
            >
              <span
                className={cn(
                  "absolute inset-0 flex flex-col items-center justify-between py-6 transition-opacity duration-300",
                  open ? "opacity-0" : "opacity-100 delay-200",
                )}
              >
                <span className="text-[10px] tabular-nums tracking-eyebrow text-paper/60">{pad(index)}</span>
                <span
                  aria-hidden
                  className="rotate-180 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.2em] [writing-mode:vertical-rl]"
                >
                  {item.title}
                </span>
                <span aria-hidden className="text-xl font-light leading-none">
                  +
                </span>
              </span>
              <span className="sr-only">{item.title}</span>
            </button>

            {/* In the flow on phones, so a panel grows to fit its words. Pinned to the bottom from tablet width up. */}
            <div
              id={`${id}-${index}`}
              className={cn(
                "pointer-events-none relative z-20 mt-auto p-5 pt-16 transition-[opacity,translate,visibility] duration-500 ease-out-soft md:absolute md:inset-x-0 md:bottom-0 md:p-8",
                open ? "md:visible md:translate-y-0 md:opacity-100 md:delay-200" : "md:invisible md:translate-y-3 md:opacity-0",
              )}
            >
              <p className="text-[10px] tabular-nums tracking-eyebrow text-paper/60">{pad(index)}</p>
              {item.tag ? (
                <p className="mt-3 inline-block bg-paper px-2.5 py-1 text-[9px] font-semibold uppercase tracking-eyebrow text-ink">
                  {item.tag}
                </p>
              ) : null}
              <h3 className="mt-3 text-[1.75rem] font-bold uppercase leading-none tracking-display md:text-4xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-paper/85 md:text-base md:leading-7">{item.text}</p>
              {item.href && item.cta ? (
                <Link
                  href={item.href}
                  className="group/cta pointer-events-auto mt-5 inline-flex min-h-11 items-center gap-2 border-b border-paper/60 text-xs font-semibold uppercase tracking-button transition-colors hover:border-paper"
                >
                  {item.cta}
                  <span aria-hidden className="transition-transform duration-300 ease-out-soft group-hover/cta:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              ) : null}
            </div>

            {item.note ? (
              <span
                className={cn(
                  "pointer-events-none absolute right-2 top-2 z-20 whitespace-nowrap bg-ink/65 px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-paper/85 transition-opacity duration-300 md:right-3 md:top-3 md:tracking-eyebrow",
                  open ? "md:delay-300" : "md:opacity-0",
                )}
              >
                {item.note}
              </span>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
