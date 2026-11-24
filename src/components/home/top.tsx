import Image from "next/image";
import type { CSSProperties } from "react";
import { heroFacts, price, villaSpaces } from "@/lib/content";
import { ILLUSTRATIVE, ref } from "@/lib/images";
import { VillaCard } from "../blocks";
import { EnquiryForm } from "../EnquiryForm";
import { Photo } from "../Photo";
import { Placeholder } from "../Placeholder";
import { ParallaxLayer, Reveal, Stagger, StaggerItem } from "../Reveal";
import { ArrowLink, ButtonLink, Container, Eyebrow, Heading, Section } from "../ui";
import { WhatsAppButton } from "../WhatsApp";

const step = (index: number) => ({ "--i": index }) as CSSProperties;

/*
 * Image policy on this page: Bilva's own images appear in three places only:
 * the Villas for sale card, the nameplate beside the Nakshatram dropdown, and
 * the Hotel section. Every other image is a reference image from
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
            Explore the villas
          </ButtonLink>
          <ButtonLink href="#enquire" variant="outline-light">
            Enquire now
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

/* 2. Introduction */
export function Introduction() {
  return (
    <Section tone="paper" labelledBy="intro-title">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div className="group">
            <Photo
              src={ref.intro.src}
              alt={ref.intro.alt}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="aspect-[4/3] w-full"
              note={ILLUSTRATIVE}
            />
          </div>
          <Stagger gap={0.12}>
            <StaggerItem>
              <Eyebrow>About Bilva Resorts</Eyebrow>
              <Heading id="intro-title" light="Invest in memories," bold="not just bricks." className="mt-4" />
            </StaggerItem>
            <div className="mt-7 max-w-xl space-y-4 text-base leading-7 text-graphite">
              <StaggerItem>
                <p>
                  Bilva Resorts is a development of about 40 private villas in Gokarna, on the Karnataka
                  coast. Every villa has two bedrooms, its own swimming pool and 2,000 sq ft of built-up space
                  on its own plot.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p>
                  The resort plan includes a common pool, restaurant, banquet hall, spa, game zone and coffee
                  shop, and a hotel is under construction as part of the same development.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p>
                  You own your villa, give it a name of your own, and decide whether it earns when you are
                  away.
                </p>
              </StaggerItem>
            </div>
            <StaggerItem className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
              <ArrowLink href="/about">Learn more about us</ArrowLink>
              <ArrowLink href="/villas/model-villa" muted>
                View the model villa
              </ArrowLink>
            </StaggerItem>
          </Stagger>
        </div>
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

/* 4. Enquiry band */
export function EnquiryBand() {
  return (
    <section id="price-list" aria-labelledby="band-title" className="relative overflow-hidden bg-ink py-16 text-paper md:py-20">
      <ParallaxLayer>
        <Image src={ref.bandNightPool.src} alt="" fill sizes="100vw" className="object-cover" />
      </ParallaxLayer>
      <div aria-hidden className="absolute inset-0 bg-ink/75" />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal from="left">
            <Eyebrow onDark>Prices and availability</Eyebrow>
            <Heading id="band-title" size="band" light="Get the" bold="price list" stacked={false} className="mt-4" />
            <p className="mt-5 max-w-md text-sm leading-6 text-paper/80">
              Tell us how to reach you and we will send the current cost sheet, payment schedule and
              availability.
            </p>
            <WhatsAppButton
              message="Hello, please send me the Bilva Resorts price list."
              className="mt-7"
            />
          </Reveal>
          <Reveal delay={0.15} from="right" className="bg-white p-6 text-ink md:p-9">
            <EnquiryForm variant="compact" defaultType="villa" source="home: price list band" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* 5. Inside the villa */
export function InsideVilla() {
  return (
    <Section tone="paper" labelledBy="inside-title">
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Inside the villa</Eyebrow>
            <Heading id="inside-title" light="Two bedrooms." bold="One private pool." className="mt-4" />
          </div>
          <ArrowLink href="/villas/model-villa">Tour the model villa</ArrowLink>
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
