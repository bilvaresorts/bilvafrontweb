import type { Metadata } from "next";
import { EnquirySection, PageHero, SectionHeader, StepRow } from "@/components/blocks";
import { RuleList, Split } from "@/components/page-blocks";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { ArrowLink, ButtonLink, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { bookingNotes, bookingSteps, stayFeatures } from "@/lib/content";
import { ILLUSTRATIVE, ref } from "@/lib/images";

export const metadata: Metadata = {
  title: "Rent a Villa in Gokarna: Booking",
  description:
    "Request a stay in a two-bedroom private pool villa at Bilva Resorts, Gokarna. Stays are not open yet: send your dates and we will contact you when booking opens.",
};

/*
 * Booking is for guests who want to stay in a villa, not buy one.
 * Confirmed by Bilva Resorts on 24 November 2026: stays are not open yet,
 * requests are taken through the form, and no nightly rate is published.
 * Nothing on this page may suggest that a stay can be booked or paid for today.
 */

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Booking"
        tag="Opening soon"
        light="Rent a villa"
        bold="in Gokarna."
        image={{ ...ref.heroPoolLifestyle, note: ILLUSTRATIVE }}
        summary="Stay in a two-bedroom villa with its own pool at Bilva Resorts. Stays are not open yet. Send your dates and we will contact you when booking opens."
      >
        <ButtonLink href="#enquire" variant="solid-light">
          Rent a villa
        </ButtonLink>
        <ButtonLink href="/villas#rooms" variant="outline-light">
          See inside the villa
        </ButtonLink>
      </PageHero>

      <Section tone="paper" labelledBy="stay-title">
        <Container>
          <Split image={{ ...ref.poolDeck, note: ILLUSTRATIVE }}>
            <Eyebrow>The stay</Eyebrow>
            <Heading id="stay-title" light="A whole villa," bold="to yourselves." className="mt-4" />
            <p className="mt-7 max-w-md text-base leading-7 text-graphite">
              Each villa is a private two-bedroom home on its own plot, with 2,000 sq ft of built-up space
              behind its own compound wall.
            </p>
            <Stagger as="ul" className="mt-8 max-w-xl border-t border-rule" gap={0.08}>
              {stayFeatures.map((feature) => (
                <StaggerItem as="li" key={feature.title} className="border-b border-rule py-4">
                  <h3 className="text-sm font-semibold uppercase tracking-display">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-graphite">{feature.text}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </Split>
        </Container>
      </Section>

      <Section tone="ink" labelledBy="booking-steps-title">
        <Container>
          <SectionHeader id="booking-steps-title" eyebrow="How booking works" light="From request" bold="to stay." onDark>
            <p>Stays are not open yet, so a request costs nothing and commits you to nothing.</p>
          </SectionHeader>
          <div className="mt-12 md:mt-16">
            <StepRow steps={bookingSteps} columns="lg:grid-cols-4" onDark />
          </div>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="booking-notes-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeader id="booking-notes-title" eyebrow="Good to know" light="Before you" bold="send a request." column />
            <RuleList items={bookingNotes} />
          </div>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="booking-more-title">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <Reveal from="left">
              <Eyebrow>Prefer a room?</Eyebrow>
              <h2 id="booking-more-title" className="mt-4 text-[1.75rem] uppercase leading-[1.02] tracking-display md:text-4xl">
                <span className="block font-light">The hotel at</span>
                <span className="block font-bold">Bilva Resorts.</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-graphite">
                A hotel is under construction within the resort. Register your interest and we will contact you
                when reservations open.
              </p>
              <ArrowLink href="/hotel" className="mt-6">
                See the hotel
              </ArrowLink>
            </Reveal>
            <Reveal from="right" delay={0.1}>
              <Eyebrow>Rather own?</Eyebrow>
              <h2 className="mt-4 text-[1.75rem] uppercase leading-[1.02] tracking-display md:text-4xl">
                <span className="block font-light">A villa of</span>
                <span className="block font-bold">your own.</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-graphite">
                The villas are for sale, from ₹1.36 Cr plus taxes and charges. Owners can choose to rent theirs
                out when they are away.
              </p>
              <ArrowLink href="/villas" className="mt-6">
                Buy a villa
              </ArrowLink>
            </Reveal>
          </div>
        </Container>
      </Section>

      <EnquirySection
        eyebrow="Booking request"
        light="Request"
        bold="your stay."
        text="Send your dates and the number of guests. We will contact you when stays open, with availability and the rate."
        points={["No payment is taken now", "Your dates go on our list", "We contact you when stays open"]}
        defaultType="booking"
        image={{ src: ref.bandTerraceDusk.src }}
        source="booking page"
        submitLabel="Send booking request"
        extras={[
          { name: "checkIn", label: "Check-in date", type: "date" },
          { name: "checkOut", label: "Check-out date", type: "date" },
          { name: "guests", label: "Number of guests", type: "number" },
        ]}
        whatsappMessage="Hello, I would like to request a villa stay at Bilva Resorts."
      />
    </>
  );
}
