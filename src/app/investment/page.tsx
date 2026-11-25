import type { Metadata } from "next";
import { EnquirySection, PageHero, SectionHeader, StepRow, pad } from "@/components/blocks";
import { Calculator } from "@/components/Calculator";
import { RuleList } from "@/components/page-blocks";
import { PrefillButton } from "@/components/PrefillButton";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { RevealCards } from "@/components/RevealCards";
import { ArrowLink, ButtonLink, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { charges, price, purchaseSteps, reasonsToOwn, rentalProgramme } from "@/lib/content";
import { formatInr } from "@/lib/format";
import { ILLUSTRATIVE, ref } from "@/lib/images";

export const metadata: Metadata = {
  title: "Villa Investment and Rental Income in Gokarna",
  description:
    "The price, payment stages and costs of owning a private pool villa at Bilva Resorts, Gokarna, how the optional rental programme works, and a calculator to test your own assumptions.",
};

/*
 * Everything about the money on one page: what you pay, when you pay it, how
 * the optional rental programme works and what your own numbers produce. The
 * villa itself is described on the Villas page.
 */

/** The price and everything paid on top of it, as one ledger. */
const ledger = [
  { title: "Villa price", text: `From ${price.fromLabel}, paid in four stages linked to construction.` },
  ...charges,
];

/** ₹12 lakh a year divided by the nights booked at each occupancy, with no owner days. */
const lakhIllustration = [40, 50, 60].map((occupancy) => ({
  occupancy,
  nights: Math.round((365 * occupancy) / 100),
  rate: Math.round(1200000 / ((365 * occupancy) / 100)),
}));

const keepInMind = [
  "Renting is optional. Nothing obliges you to rent your villa out.",
  "Rental income is not guaranteed. It depends on bookings, season and nightly rates.",
  "Platform commission, the management fee and maintenance come out of gross revenue.",
  "GST, registration and statutory charges are paid on top of the villa price.",
  "Prices, taxes and charges can change. Your cost sheet shows the figures that apply to you.",
  "Ask us for the current management fee and payout terms before you decide.",
];

export default function InvestmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Invest"
        image={{ ...ref.heroResortPool, note: ILLUSTRATIVE }}
        light="Own a villa."
        bold="Understand the numbers."
        summary="What you pay, when you pay it, and what renting could earn. No returns are promised."
      >
        <ButtonLink href="#calculator" variant="solid-light">
          Calculate your returns
        </ButtonLink>
        <PrefillButton
          variant="outline-light"
          prefill={{ type: "investment", message: "Please send me the price list and payment schedule." }}
        >
          Get the price list
        </PrefillButton>
      </PageHero>

      <Section tone="paper" labelledBy="why-title">
        <Container>
          <SectionHeader id="why-title" eyebrow="Why own at Bilva" light="A holiday home" bold="that is yours.">
            <p>A villa you own, name and can choose to rent out.</p>
          </SectionHeader>
          <Reveal className="mt-8 md:mt-12" delay={0.1}>
            <RevealCards items={reasonsToOwn} />
          </Reveal>
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

      <Section tone="paper" id="rental" labelledBy="programme-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeader id="programme-title" eyebrow="Rental income" light="Enjoy it." bold="Or let it earn." column>
              <p>Away from your villa? Rent it out, and Bilva manages it. Each step shows who does what.</p>
            </SectionHeader>
            <Stagger as="ol" className="border-t border-rule" gap={0.1}>
              {rentalProgramme.map((item, index) => (
                <StaggerItem as="li" key={item.title} from="left" className="flex gap-5 border-b border-rule py-6">
                  <span className="pt-1 text-[11px] tabular-nums text-stone">{pad(index)}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-graphite">{item.text}</p>
                  </div>
                  <span
                    className={
                      item.who === "Bilva"
                        ? "self-start bg-ink px-2.5 py-1 text-[9px] font-semibold uppercase tracking-button text-paper"
                        : "self-start border border-ink px-2.5 py-1 text-[9px] font-semibold uppercase tracking-button text-ink"
                    }
                  >
                    {item.who}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="lakh-title">
        <Container>
          <SectionHeader id="lakh-title" eyebrow="An illustration" light="What it takes to reach" bold="₹1 lakh a month.">
            <p>Three ways to reach ₹12 lakh a year before costs. This is arithmetic, not a market rate or a promise.</p>
          </SectionHeader>
          <Stagger className="mt-10 grid gap-px bg-rule md:mt-14 md:grid-cols-3" gap={0.14}>
            {lakhIllustration.map((item) => (
              <StaggerItem key={item.occupancy} className="bg-paper p-7 md:p-9">
                <p className="text-[11px] uppercase tracking-eyebrow text-stone">At {item.occupancy}% occupancy</p>
                <p className="mt-4 text-5xl font-bold leading-none tracking-tight tabular-nums">{formatInr(item.rate)}</p>
                <p className="mt-3 text-sm text-graphite">a night, over about {item.nights} booked nights a year</p>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-6 max-w-3xl text-xs leading-5 text-stone">
            Gross means before platform commission, management fee, maintenance and taxes. Net income is lower.
            Figures assume the villa is available to guests all year.
          </p>
        </Container>
      </Section>

      <Section tone="ink" labelledBy="risk-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeader id="risk-title" eyebrow="Before you decide" light="What to keep" bold="in mind." onDark column />
            <RuleList items={keepInMind} onDark />
          </div>
        </Container>
      </Section>

      <Section tone="paper" id="calculator" labelledBy="calculator-title">
        <Container>
          <SectionHeader id="calculator-title" eyebrow="ROI calculator" light="Test your own" bold="assumptions.">
            <p>The price comes from the Bilva price sheet. Every rental and cost figure is yours to set.</p>
          </SectionHeader>
          <div className="mt-10 md:mt-14">
            <Calculator />
          </div>
        </Container>
      </Section>

      <EnquirySection
        light="Talk to us about"
        bold="owning a villa."
        text="Send your details and we will share the numbers. An estimate sent from the calculator arrives with your enquiry."
        points={["The current cost sheet", "The payment schedule in rupees", "Rental programme terms"]}
        defaultType="investment"
        image={{ src: ref.bandVillaDusk.src }}
        source="investment page"
      />
    </>
  );
}
