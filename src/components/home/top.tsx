import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { heroFacts, price, villaSpaces } from "@/lib/content";
import { ILLUSTRATIVE, ref } from "@/lib/images";
import { VillaCard } from "../blocks";
import { IMPRESSION, Photo } from "../Photo";
import { Placeholder } from "../Placeholder";
import { ParallaxLayer, Reveal, Stagger, StaggerItem } from "../Reveal";
import { ArrowLink, ButtonLink, Container, Eyebrow, Heading, Section } from "../ui";

const step = (index: number) => ({ "--i": index }) as CSSProperties;

/*
 * The page leads with the three things a visitor can do: buy a villa, stay at
 * the hotel, or rent a villa. Everything after that supports those three.
 *
 * Image policy on this page: Bilva's own images appear in three places only:
 * the Villas for sale card, the nameplate beside the Nakshatram dropdown, and
 * the hotel offer. Every other image is a reference image from
 * balitecture.com (see src/lib/images.ts) and is labelled "Illustrative image".
 */

/* 1. Hero */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper"
    >
      <ParallaxLayer strength={6}>
        <Image
          src={ref.heroHome.src}
          alt={ref.heroHome.alt}
          fill
          sizes="100vw"
          preload
          className="hero-media object-cover"
        />
      </ParallaxLayer>
      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/35 to-ink/50" />
      <div aria-hidden className="absolute inset-0 bg-linear-to-r from-ink/60 via-ink/15 to-transparent" />

      <Container className="relative flex flex-1 flex-col justify-end pb-10 pt-32 md:pb-14">
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
        <p className="rise mt-6 max-w-xl text-base leading-7 text-paper/80" style={step(3)}>
          Own a two-bedroom private pool villa at Bilva Resorts. Enjoy it whenever you wish, or choose to make
          it available for holiday rentals. From {price.fromLabel}, plus taxes and charges.
        </p>
        <div className="rise mt-8 flex flex-wrap gap-3" style={step(4)}>
          <ButtonLink href="/villas" variant="solid-light">
            Buy a villa
          </ButtonLink>
          <ButtonLink href="/booking" variant="outline-light">
            Rent a villa
          </ButtonLink>
        </div>
        <p className="mt-8 text-[9px] uppercase tracking-eyebrow text-paper/45 md:absolute md:bottom-5 md:right-10 md:mt-0">
          {ILLUSTRATIVE}
        </p>
      </Container>

      <div className="rise relative border-t border-paper/15 bg-ink/60 backdrop-blur-sm" style={step(6)}>
        <Container>
          <dl className="grid grid-cols-3 divide-x divide-paper/15 md:grid-cols-4">
            {heroFacts.map((fact, index) => (
              <div
                key={fact.label}
                className={
                  index === 1
                    ? "hidden flex-col-reverse py-5 pl-6 md:flex md:py-6"
                    : "flex flex-col-reverse py-5 pl-4 first:pl-0 md:py-6 md:pl-6"
                }
              >
                <dt className="mt-1 text-[10px] leading-4 text-paper/60 md:text-xs">{fact.label}</dt>
                <dd className="text-base font-semibold md:text-2xl">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}

/* 2. The three offers: buy a villa, the hotel, rent a villa */
const offers = [
  {
    number: "01",
    title: "Buy a villa",
    text: "A two-bedroom villa with its own pool, sold to you outright. From ₹1.36 Cr, plus taxes and charges.",
    href: "/villas",
    cta: "See the villas",
    image: { src: ref.exterior.src, alt: ref.exterior.alt },
    note: ILLUSTRATIVE,
    tag: "For sale",
  },
  {
    number: "02",
    title: "The hotel",
    text: "A hotel is being built within the resort. Register your interest and we will contact you when reservations open.",
    href: "/hotel",
    cta: "See the hotel",
    image: {
      src: "/images/hotel-pool.jpg",
      alt: "Three-storey hotel with arched ground floor and balconies behind an infinity pool",
    },
    note: IMPRESSION,
    tag: "Under construction",
  },
  {
    number: "03",
    title: "Rent a villa",
    text: "Stay in a private pool villa without buying one. Stays are not open yet. Send your dates and we will contact you.",
    href: "/booking",
    cta: "Request a stay",
    image: { src: ref.outdoorLounge.src, alt: ref.outdoorLounge.alt },
    note: ILLUSTRATIVE,
    tag: "Opening soon",
  },
];

export function Offers() {
  return (
    <Section tone="paper" id="offers" labelledBy="offers-title">
      <Container>
        <Reveal>
          <Eyebrow>Bilva Resorts, Gokarna</Eyebrow>
          <Heading id="offers-title" light="Three ways" bold="to be here." className="mt-4" />
          <p className="mt-6 max-w-xl text-base leading-7 text-graphite">
            Own a private pool villa, stay at the hotel, or rent a villa for a holiday.
          </p>
        </Reveal>
        <Stagger className="mt-10 grid gap-10 md:mt-14 md:grid-cols-3 md:gap-6" gap={0.16}>
          {offers.map((offer) => (
            <StaggerItem key={offer.title}>
              <Link href={offer.href} className="group block">
                <Photo
                  src={offer.image.src}
                  alt={offer.image.alt}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="aspect-[4/5] w-full"
                  tag={offer.tag}
                  note={offer.note}
                />
                <p className="mt-6 text-[11px] tabular-nums text-stone">{offer.number}</p>
                <h3 className="mt-2 text-[26px] font-bold uppercase leading-8 tracking-display">{offer.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-graphite">{offer.text}</p>
                <span className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-button">
                  {offer.cta}
                  <span aria-hidden className="transition-transform duration-300 ease-out-soft group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}

/* 3. The villa offer */
export function VillaOffer() {
  return (
    <Section tone="mist" labelledBy="offer-title">
      <Container>
        <Reveal>
          <Eyebrow>Villas for sale</Eyebrow>
          <Heading id="offer-title" light="Own a villa at" bold="Bilva Resorts" stacked={false} className="mt-4" />
        </Reveal>
        {/* The full list of what is included is on the Villas page, which the card links to. */}
        <div className="mt-10 md:mt-14">
          <VillaCard />
        </div>
      </Container>
    </Section>
  );
}

/* 4. Inside the villa */
export function InsideVilla() {
  return (
    <Section tone="paper" labelledBy="inside-title">
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Inside the villa</Eyebrow>
            <Heading id="inside-title" light="Two bedrooms." bold="One private pool." className="mt-4" />
          </div>
          <ArrowLink href="/villas#rooms">See every room</ArrowLink>
        </Reveal>
        <Stagger className="mt-10 grid gap-8 md:mt-14 md:grid-cols-3 md:gap-6" gap={0.16}>
          {villaSpaces.map((space) => (
            <StaggerItem key={space.title} className="group">
              {space.src ? (
                <Photo
                  src={space.src}
                  alt={space.alt}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="aspect-[4/3] w-full"
                  note={space.note || undefined}
                />
              ) : (
                <Placeholder label={`${space.title} image`} className="aspect-[4/3] w-full" />
              )}
              <h3 className="mt-5 text-[22px] font-bold uppercase leading-7 tracking-display">{space.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-graphite">{space.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
