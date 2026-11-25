"use client";

import { useState } from "react";
import { cn } from "./ui";

const pad = (index: number) => String(index + 1).padStart(2, "0");

/**
 * Short points as cards.
 *
 * On phones every card shows its title and its line, one under another, with
 * nothing to tap open. From tablet width up the cards sit in a grid and one is
 * open at a time: it turns dark and shows its line, while the others show only
 * a title. The open card follows the pointer, a click or the keyboard.
 */
export function RevealCards({
  items,
  columns = "md:grid-cols-2 lg:grid-cols-4",
  className,
}: {
  items: { title: string; text: string }[];
  columns?: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <ul className={cn("grid gap-px border border-rule bg-rule", columns, className)}>
      {items.map((item, index) => {
        // "Open" only means anything from tablet width up.
        const open = active === index;
        return (
          <li
            key={item.title}
            tabIndex={0}
            onClick={() => setActive(index)}
            onFocus={() => setActive(index)}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setActive(index);
            }}
            className={cn(
              "flex flex-col bg-paper p-6 text-ink outline-none transition-colors duration-500 ease-out-soft focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-stone md:min-h-[15rem] md:justify-between md:p-8",
              open ? "md:bg-ink md:text-paper" : "md:cursor-pointer",
            )}
          >
            <span className="flex w-full items-center justify-between">
              <span className="text-[11px] tabular-nums opacity-55">{pad(index)}</span>
              <span
                aria-hidden
                className={cn(
                  "hidden text-2xl font-light leading-none transition-transform duration-500 ease-out-soft md:block",
                  open && "rotate-45",
                )}
              >
                +
              </span>
            </span>
            <span className="mt-3 block md:mt-0">
              <span className="block text-xl font-bold uppercase leading-7 tracking-display md:text-2xl">
                {item.title}
              </span>
              <span
                className={cn(
                  "grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-500 ease-out-soft",
                  !open && "md:grid-rows-[0fr] md:opacity-0",
                )}
              >
                <span className="overflow-hidden">
                  <span className="block pt-2 text-sm leading-6 opacity-80 md:pt-3">{item.text}</span>
                </span>
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
