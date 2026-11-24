import type { ReactNode } from "react";
import { ILLUSTRATIVE } from "@/lib/images";
import { pad } from "./blocks";
import { IMPRESSION, Photo } from "./Photo";
import { Placeholder } from "./Placeholder";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { cn } from "./ui";

/** Image on one side, words on the other. */
export function Split({
  image,
  children,
  reverse = false,
  ratio = "aspect-[4/3]",
}: {
  /** Leave `src` empty to show a labelled placeholder until the image is supplied. */
  image: { src: string; alt: string; render?: boolean; note?: string; tag?: string; position?: string };
  children: ReactNode;
  reverse?: boolean;
  ratio?: string;
}) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
      <div className={cn("group", reverse && "md:order-2")}>
        {image.src ? (
          <Photo
            src={image.src}
            alt={image.alt}
            sizes="(max-width: 768px) 100vw, 50vw"
            className={cn("w-full", ratio)}
            position={image.position}
            tag={image.tag}
            note={image.note ?? (image.render ? IMPRESSION : undefined)}
          />
        ) : (
          <Placeholder label={image.alt} className={cn("w-full", ratio)} />
        )}
      </div>
      <Reveal from={reverse ? "left" : "right"} delay={0.1}>
        {children}
      </Reveal>
    </div>
  );
}

/** A grid of short labelled tiles, such as the resort amenities. */
export function TileGrid({
  items,
  onDark = false,
  columns = "sm:grid-cols-2 lg:grid-cols-3",
}: {
  items: string[];
  onDark?: boolean;
  columns?: string;
}) {
  return (
    <Stagger as="ul" className={cn("grid gap-px", onDark ? "bg-paper/15" : "bg-rule", columns)} gap={0.08}>
      {items.map((item, index) => (
        <StaggerItem
          as="li"
          key={item}
          className={cn("flex items-baseline gap-4 p-6 md:p-7", onDark ? "bg-ink" : "bg-paper")}
        >
          <span className={cn("text-[11px] tabular-nums", onDark ? "text-paper/45" : "text-stone")}>{pad(index)}</span>
          <span className="text-lg font-semibold">{item}</span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/**
 * Where a drawing will go, with a line on what it will show. Until the drawing
 * is supplied, `image` fills the space with a reference photograph marked as
 * illustrative. It is a photograph on purpose: another developer's plan is
 * never shown as Bilva's.
 */
export function PlanSlot({
  label,
  text,
  image,
}: {
  label: string;
  text: string;
  image?: { src: string; alt: string };
}) {
  return (
    <Reveal className="group">
      {image ? (
        <Photo
          src={image.src}
          alt={image.alt}
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="aspect-[4/3] w-full"
          tag={`${label}: to follow`}
          note={ILLUSTRATIVE}
          reveal={false}
        />
      ) : (
        <Placeholder label={label} className="aspect-[4/3] w-full" />
      )}
      <p className="mt-4 max-w-md text-sm leading-6 text-graphite">{text}</p>
    </Reveal>
  );
}

/** A single-line list with hairlines between rows. */
export function RuleList({ items, onDark = false }: { items: string[]; onDark?: boolean }) {
  return (
    <Stagger
      as="ul"
      className={cn(
        "divide-y border-y text-sm",
        onDark ? "divide-paper/15 border-paper/15 text-paper/85" : "divide-rule border-rule text-graphite",
      )}
      gap={0.08}
    >
      {items.map((item) => (
        <StaggerItem as="li" key={item} className="py-3.5">
          {item}
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Long-form text for the legal pages. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl space-y-5 text-base leading-7 text-graphite [&_h2]:mt-12 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-display [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
      {children}
    </div>
  );
}
