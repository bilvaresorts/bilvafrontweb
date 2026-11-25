"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { kindLabel, type GalleryImage } from "@/lib/gallery";
import { cn } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Filterable image grid with a full-screen viewer.
 * The viewer works with the mouse, the keyboard (arrows and Escape) and swipes.
 */
export function Gallery({
  images,
  categories = [],
  columns = "sm:columns-2 lg:columns-3",
}: {
  images: GalleryImage[];
  /** Filter tabs. Leave empty to show the grid without filters. */
  categories?: string[];
  columns?: string;
}) {
  const [filter, setFilter] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const visible =
    filter === "All" ? images : images.filter((image) => (image.categories as string[]).includes(filter));
  const usedCategories = categories.filter((category) =>
    images.some((image) => (image.categories as string[]).includes(category)),
  );

  const close = useCallback(() => {
    setOpenIndex(null);
    opener.current?.focus();
  }, []);

  const move = useCallback(
    (delta: number) => {
      setOpenIndex((index) => (index === null ? index : (index + delta + visible.length) % visible.length));
    },
    [visible.length],
  );

  return (
    <div>
      {usedCategories.length ? (
        <div role="group" aria-label="Filter the gallery" className="mb-8 flex flex-wrap gap-2 md:mb-10">
          {["All", ...usedCategories].map((category) => {
            const active = filter === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(category)}
                className={cn(
                  "h-11 rounded-[4px] border px-4 text-[11px] font-semibold uppercase tracking-button transition-colors duration-300",
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-rule text-graphite hover:border-ink hover:text-ink",
                )}
              >
                {category}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className={cn("gap-4 [column-fill:_balance]", columns)}>
        {visible.map((image, index) => (
          <motion.button
            key={`${filter}-${image.src}`}
            type="button"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay: (index % 3) * 0.08 }}
            onClick={(event) => {
              opener.current = event.currentTarget;
              setOpenIndex(index);
            }}
            aria-label={`${image.caption}: view larger`}
            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden bg-coal text-left"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.05]"
            />
            {/* Reference images keep their label on show, so they are never taken for Bilva's own villas. */}
            {image.kind === "illustrative" ? (
              <span className="absolute right-3 top-3 bg-ink/65 px-2 py-1 text-[9px] uppercase tracking-eyebrow text-paper/85">
                {kindLabel[image.kind]}
              </span>
            ) : null}
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-linear-to-t from-ink/85 to-transparent p-4 pt-14 text-paper opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="text-sm font-medium">{image.caption}</span>
              {image.kind === "illustrative" ? null : (
                <span className="shrink-0 text-[9px] uppercase tracking-eyebrow text-paper/70">
                  {kindLabel[image.kind]}
                </span>
              )}
            </span>
          </motion.button>
        ))}
      </div>

      {openIndex !== null && visible[openIndex] ? (
        <Lightbox
          image={visible[openIndex]}
          position={openIndex + 1}
          total={visible.length}
          onClose={close}
          onMove={move}
        />
      ) : null}
    </div>
  );
}

function Lightbox({
  image,
  position,
  total,
  onClose,
  onMove,
}: {
  image: GalleryImage;
  position: number;
  total: number;
  onClose: () => void;
  onMove: (delta: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipeStart = useRef<number | null>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onMove(1);
      if (event.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onMove]);

  const control =
    "flex h-12 w-12 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${image.caption}. Image ${position} of ${total}`}
      className="fixed inset-0 z-[70] flex flex-col bg-ink/[0.97] text-paper"
      onPointerDown={(event) => {
        swipeStart.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (swipeStart.current === null) return;
        const distance = event.clientX - swipeStart.current;
        swipeStart.current = null;
        if (Math.abs(distance) > 60) onMove(distance < 0 ? 1 : -1);
      }}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-8">
        <p className="text-[11px] uppercase tracking-eyebrow text-paper/60">
          {position} / {total}
        </p>
        <button ref={closeRef} type="button" className={control} onClick={onClose} aria-label="Close the viewer">
          <svg aria-hidden width="14" height="14" viewBox="0 0 14 14">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
      </div>

      <div className="relative min-h-0 flex-1 px-4 md:px-24">
        <div key={image.src} className="lightbox-in relative h-full w-full">
          <Image src={image.src} alt={image.alt} fill sizes="100vw" quality={90} className="object-contain" />
        </div>
        {total > 1 ? (
          <>
            <button
              type="button"
              className={cn(control, "absolute left-3 top-1/2 -translate-y-1/2 bg-ink/60 md:left-6")}
              onClick={() => onMove(-1)}
              aria-label="Previous image"
            >
              <span aria-hidden>&larr;</span>
            </button>
            <button
              type="button"
              className={cn(control, "absolute right-3 top-1/2 -translate-y-1/2 bg-ink/60 md:right-6")}
              onClick={() => onMove(1)}
              aria-label="Next image"
            >
              <span aria-hidden>&rarr;</span>
            </button>
          </>
        ) : null}
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-5 md:px-8">
        <p className="text-sm font-medium">{image.caption}</p>
        <p className="text-[10px] uppercase tracking-eyebrow text-paper/55">
          {kindLabel[image.kind]}
        </p>
      </div>
    </div>
  );
}
