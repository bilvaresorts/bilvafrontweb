import { ILLUSTRATIVE, ref } from "@/lib/images";
import { VillaCard } from "../blocks";
import { ExpandingPanels, type Panel } from "../ExpandingPanels";
import { OwnershipLine } from "../OwnershipLine";
import { IMPRESSION } from "../Photo";
import { Reveal } from "../Reveal";
import { ArrowLink, Container, Eyebrow, Heading, Section } from "../ui";

/*
 * The hero is the overview: three doors to Villas, Hotel and Booking. Nothing
 * below it repeats that trio. Instead each offer is shown once more, in its own
 * way: the villa as a set of rooms to open, then its price; the hotel and villa
 * stays as a pair to compare.
 *
 * Image policy on this page: Bilva's own images appear in three places only:
 * the Villas for sale card, the nameplate beside the Nakshatram dropdown, and
 * the hotel. Every other image is a reference image from balitecture.com (see
 * src/lib/images.ts) and is labelled "Illustrative image".
 */

/* 1. Hero: see HomeHero.tsx */

/* 2. Inside the villa: five rooms to open */
const villaPanels: Panel[] = [
  {
    title: "Living and dining",
    text: "Sofa, dining table and a 65-inch TV, ready when you arrive.",
    image: { src: ref.livingDining.src, alt: ref.livingDining.alt },
    note: ILLUSTRATIVE,
  },
  {
    title: "Bedrooms",
    text: "Two bedrooms with beds, mattresses and air conditioning.",
    image: { src: ref.bedroom.src, alt: ref.bedroom.alt },
    note: ILLUSTRATIVE,
  },
  {
    title: "Private pool",
    text: "Your own pool, with sun loungers beside it.",
    image: { src: ref.poolGarden.src, alt: ref.poolGarden.alt },
    note: ILLUSTRATIVE,
  },
  {
    title: "Kitchen",
    text: "Fitted with a fridge, gas stove and chimney.",
    image: { src: ref.kitchen.src, alt: ref.kitchen.alt },
    note: ILLUSTRATIVE,
  },
  {
    title: "Outdoor living",
    text: "A gazebo and an outdoor shower by the pool.",
    image: { src: ref.outdoorLounge.src, alt: ref.outdoorLounge.alt },
    note: ILLUSTRATIVE,
  },
];

export function VillaExplorer() {
  return (
    <Section tone="paper" labelledBy="inside-title">
      <Container>
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Inside the villa</Eyebrow>
            <Heading id="inside-title" light="Two bedrooms." bold="One private pool." className="mt-4" />
          </div>
          <ArrowLink href="/villas#rooms">See every room</ArrowLink>
        </Reveal>
        <Reveal className="mt-8 md:mt-12" delay={0.1}>
          <ExpandingPanels items={villaPanels} />
        </Reveal>
      </Container>
    </Section>
  );
}

/* 3. Villas for sale */
export function VillaOffer() {
  return (
    <Section tone="mist" labelledBy="offer-title">
      <Container>
        <Reveal>
          <Eyebrow>Villas for sale</Eyebrow>
          <Heading id="offer-title" light="Own a villa at" bold="Bilva Resorts" stacked={false} className="mt-4" />
        </Reveal>
        {/* The full list of what is included is on the Villas page, which the card links to. */}
        <div className="mt-8 md:mt-14">
          <VillaCard />
        </div>
        {/* What an owner can do with the villa: a highlighted grid of points under the price. */}
        <div className="mt-14 md:mt-20">
          <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h3 className="text-[1.75rem] uppercase leading-[1.05] tracking-display md:text-4xl">
              <span className="block font-light">One villa.</span>
              <span className="block font-bold">Many ways to use it.</span>
            </h3>
            <ArrowLink href="/investment">See the numbers</ArrowLink>
          </Reveal>
          <Reveal className="mt-7 md:mt-10" delay={0.1}>
            <OwnershipLine />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* 4. Staying without buying: the hotel, or a rented villa */
const stayPanels: Panel[] = [
  {
    title: "The hotel",
    tag: "Under construction",
    text: "A hotel is being built inside the resort. Tell us you are interested and we will call you when it opens.",
    image: {
      src: "/images/hotel-dusk.jpg",
      alt: "The hotel at dusk, three storeys with arched colonnades beside an infinity pool",
      position: "object-[82%_50%]",
    },
    note: IMPRESSION,
    href: "/hotel",
    cta: "See the hotel",
  },
  {
    title: "Rent a villa",
    tag: "Opening soon",
    text: "A private pool villa for your holiday. Send your dates and we will contact you when stays open.",
    image: { src: ref.heroPoolLifestyle.src, alt: ref.heroPoolLifestyle.alt },
    note: ILLUSTRATIVE,
    href: "/booking",
    cta: "Request a stay",
  },
];

export function StayOptions() {
  return (
    <Section tone="paper" labelledBy="stay-options-title">
      <Container>
        <Reveal>
          <Eyebrow>Stay with us</Eyebrow>
          <Heading id="stay-options-title" light="Not buying?" bold="Come and stay." className="mt-4" />
        </Reveal>
        <Reveal className="mt-8 md:mt-12" delay={0.1}>
          <ExpandingPanels items={stayPanels} openShare={3} />
        </Reveal>
      </Container>
    </Section>
  );
}
