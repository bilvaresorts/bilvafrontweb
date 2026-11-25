"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { ILLUSTRATIVE, ref } from "@/lib/images";
import { IMPRESSION } from "../Photo";
import { ParallaxLayer } from "../Reveal";
import { Container, Eyebrow, cn } from "../ui";

const step = (index: number) => ({ "--i": index }) as CSSProperties;

/*
 * The hero says one thing and offers three doors: Villas, Hotel, Booking.
 * There is no paragraph and there are no buttons; the three panels along the
 * bottom are the calls to action. Pointing at a panel, or tabbing to it, fades
 * the photograph to that offer, so the hero works as an overview of the resort.
 * On touch screens the photograph stays on the first offer.
 */
const highlights = [
  {
    number: "01",
    title: "Villas",
    line: "Buy a villa",
    href: "/villas",
    image: { src: ref.heroHome.src, alt: ref.heroHome.alt, position: "object-center" },
    note: ILLUSTRATIVE,
  },
  {
    number: "02",
    title: "Hotel",
    line: "Under construction",
    href: "/hotel",
    image: {
      src: "/images/hotel-dusk.jpg",
      alt: "The hotel at dusk, three storeys with arched colonnades beside an infinity pool",
      position: "object-[72%_50%]",
    },
    note: IMPRESSION,
  },
  {
    number: "03",
    title: "Booking",
    line: "Rent a villa",
    href: "/booking",
    image: { src: ref.heroPoolLifestyle.src, alt: ref.heroPoolLifestyle.alt, position: "object-center" },
    note: ILLUSTRATIVE,
  },
];

export function Hero() {
  const [active, setActive] = useState(0);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper"
    >
      <ParallaxLayer strength={6}>
        {/* The first photograph is always there; the other two fade in over it. */}
        <div className="hero-media absolute inset-0">
          {highlights.map((item, index) => (
            <Image
              key={item.title}
              src={item.image.src}
              alt={index === 0 ? item.image.alt : ""}
              aria-hidden={index === 0 ? undefined : true}
              fill
              sizes="100vw"
              quality={90}
              preload={index === 0}
              className={cn(
                "object-cover transition-opacity duration-[900ms] ease-out-soft",
                item.image.position,
                index === 0 || index === active ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>
      </ParallaxLayer>
      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/30 to-ink/50" />
      <div aria-hidden className="absolute inset-0 bg-linear-to-r from-ink/55 via-ink/10 to-transparent" />

      <Container className="relative flex flex-1 flex-col justify-end pb-10 pt-32 md:pb-16">
        <div className="rise" style={step(0)}>
          <Eyebrow onDark>Private pool villas &middot; Gokarna, Karnataka</Eyebrow>
        </div>
        <h1 id="hero-title" className="mt-5 uppercase leading-[0.98] tracking-display">
          <span className="rise block text-[2.75rem] font-bold md:text-7xl" style={step(1)}>
            Your villa.
          </span>
          <span
            className="rise mt-2 block max-w-4xl text-2xl font-light leading-[1.08] md:mt-3 md:text-[2.75rem]"
            style={step(2)}
          >
            Your holiday home. Your income opportunity.
          </span>
        </h1>
        <p className="mt-8 text-[9px] uppercase tracking-eyebrow text-paper/45 md:absolute md:bottom-5 md:right-10 md:mt-0">
          {highlights[active].note}
        </p>
      </Container>

      <nav
        aria-label="Villas, hotel and booking"
        className="rise relative border-t border-paper/15 bg-ink/45 backdrop-blur-md"
        style={step(4)}
      >
        <Container>
          <ul className="grid md:grid-cols-3" onPointerLeave={() => setActive(0)}>
            {highlights.map((item, index) => (
              <li key={item.title} className={cn("border-paper/15", index > 0 && "border-t md:border-l md:border-t-0")}>
                <Link
                  href={item.href}
                  onPointerEnter={(event) => {
                    if (event.pointerType !== "touch") setActive(index);
                  }}
                  onFocus={() => setActive(index)}
                  onBlur={() => setActive(0)}
                  className={cn(
                    "group relative flex items-center justify-between gap-6 py-5 outline-none md:py-8",
                    index === 0 ? "md:pr-8" : "md:px-8",
                  )}
                >
                  {/* A white line grows across the top of the panel whose photograph is showing. */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 -top-px h-px origin-left bg-paper transition-transform duration-500 ease-out-soft",
                      index === active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                  <span className="min-w-0">
                    <span className="block text-[10px] tabular-nums tracking-eyebrow text-paper/50">{item.number}</span>
                    <span className="mt-2 block text-[1.75rem] font-bold uppercase leading-none tracking-display md:text-4xl">
                      {item.title}
                    </span>
                    <span className="mt-2 block text-sm text-paper/65">{item.line}</span>
                  </span>
                  <span
                    aria-hidden
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-paper/30 transition-all duration-300 ease-out-soft group-hover:border-paper group-hover:bg-paper group-hover:text-ink group-focus-visible:border-paper group-focus-visible:bg-paper group-focus-visible:text-ink"
                  >
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </section>
  );
}
