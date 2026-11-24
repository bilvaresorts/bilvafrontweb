import type { Metadata } from "next";
import { NextStep, NumberedList, PageHero, SectionHeader, StepRow } from "@/components/blocks";
import { RuleList, Split } from "@/components/page-blocks";
import { EnquireLink } from "@/components/PrefillButton";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { ArrowLink, ButtonLink, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { charges, price, purchaseSteps, reasonsToOwn } from "@/lib/content";
import { ILLUSTRATIVE, ref } from "@/lib/images";

export const metadata: Metadata = {
  title: "Villa Investment in Gokarna, Karnataka",
  description:
    "The price, payment stages and costs of owning a private pool villa at Bilva Resorts, Gokarna, with a calculator to test your own rental assumptions.",
};

/*
 * This page is about the money: what you pay, when you pay it and what to keep
 * in mind. The villa itself is described on the Villas page, the rental
 * programme on its own page and the calculator on its own page, so each is
 * linked from here and not repeated.
 */

const keepInMind = [
  "Rental income is not guaranteed. It depends on bookings, season and nightly rates.",
  "Platform commissions, management fees and maintenance reduce gross revenue.",
  "GST, registration and statutory charges are paid on top of the villa price.",
  "Prices, taxes and charges can change. Your cost sheet shows the figures that apply to you.",
];

/** The price and everything paid on top of it, as one ledger. */
const ledger = [
  { title: "Villa price", text: `From ${price.fromLabel}, paid in four stages linked to construction.` },
  ...charges,
];

export default function InvestmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Villa investment"
        image={{ ...ref.heroResortPool, note: ILLUSTRATIVE }}
        light="Own a villa."
        bold="Understand the numbers."
        summary="The price, the payment stages, the costs to plan for and a calculator to test your own assumptions. No returns are promised."
      >
        <ButtonLink href="/investment/calculator" variant="solid-light">
          Calculate your returns
        </ButtonLink>
        <EnquireLink
          variant="outline-light"
          prefill={{ type: "investment", message: "Please send me the price list and payment schedule." }}
        >
          Get the price list
        </EnquireLink>
      </PageHero>

      <Section tone="paper" labelledBy="why-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeader id="why-title" eyebrow="Why own at Bilva" light="A holiday home" bold="that is yours." column>
              <p>
                Bilva Resorts is not only selling a holiday home. It offers a villa you own, can name and can
                choose to rent out.
              </p>
            </SectionHeader>
            <NumberedList items={reasonsToOwn} />
          </div>
        </Container>
      </Section>

      <Section tone="mist" id="costs" labelledBy="costs-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal from="left">
              <Eyebrow>What you pay</Eyebrow>
              <Heading id="costs-title" light="One price." bold="A few charges on top." className="mt-4" />
              <p className="mt-9 text-6xl font-bold leading-none tracking-tight md:text-7xl">{price.fromLabel}</p>
              <p className="mt-3 text-sm text-stone">Price from, for a two-bedroom private pool villa</p>
              <p className="mt-6 max-w-md text-base leading-7 text-graphite">
                The price covers the villa, its private pool and other villa amenities, and the interiors.
              </p>
              <ArrowLink href="/villas#price" className="mt-6">
                See what is included
              </ArrowLink>
            </Reveal>
            <Stagger as="ul" className="self-start border-t border-rule" gap={0.08}>
              {ledger.map((item) => (
                <StaggerItem
                  as="li"
                  key={item.title}
                  className="grid gap-1 border-b border-rule py-5 sm:grid-cols-[13rem_1fr] sm:gap-8"
                >
                  <h3 className="text-sm font-semibold uppercase tracking-display">{item.title}</h3>
                  <p className="text-sm leading-6 text-graphite">{item.text}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      <Section tone="ink" labelledBy="process-title">
        <Container>
          <SectionHeader id="process-title" eyebrow="Purchase process" light="From enquiry" bold="to handover." onDark>
            <p>Six steps, with payments tied to construction stages.</p>
          </SectionHeader>
          <div className="mt-12 md:mt-16">
            <StepRow steps={purchaseSteps} onDark />
          </div>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="rental-summary-title">
        <Container>
          <Split image={{ ...ref.poolDeck, note: ILLUSTRATIVE }}>
            <Eyebrow>The rental opportunity</Eyebrow>
            <Heading id="rental-summary-title" light="Enjoy it." bold="Or let it earn." className="mt-4" />
            <p className="mt-7 max-w-md text-base leading-7 text-graphite">
              When you are not using your villa, you can make it available for holiday rentals. Bilva manages
              rentals for owners who opt in. Whether and when to rent is always your decision.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-1">
              <ArrowLink href="/investment/rental-income">How the rental programme works</ArrowLink>
              <ArrowLink href="/investment/calculator" muted>
                Open the ROI calculator
              </ArrowLink>
            </div>
          </Split>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="risk-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeader id="risk-title" eyebrow="Before you decide" light="What to keep" bold="in mind." column />
            <RuleList items={keepInMind} />
          </div>
        </Container>
      </Section>

      <NextStep
        light="Talk to us about"
        bold="owning a villa."
        text="We will share the cost sheet, the payment schedule in rupees and the rental programme terms."
        image={{ src: ref.bandVillaDusk.src }}
        primary={{
          label: "Get the cost sheet",
          type: "investment",
          message: "Please send me the cost sheet and payment schedule.",
        }}
        secondary={{ label: "Open the ROI calculator", href: "/investment/calculator" }}
      />
    </>
  );
}
