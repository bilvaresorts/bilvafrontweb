import type { Metadata } from "next";
import { EnquirySection, NumberedList, PageHero, SectionHeader } from "@/components/blocks";
import { Calculator } from "@/components/Calculator";
import { ButtonLink, Container, Section } from "@/components/ui";
import { ILLUSTRATIVE, ref } from "@/lib/images";

export const metadata: Metadata = {
  title: "Villa ROI and Rental Income Calculator",
  description:
    "Estimate gross and net rental income, yield and payback for a villa at Bilva Resorts, Gokarna, using your own assumptions. Indicative only.",
};

const howToRead = [
  {
    title: "Gross and net are different",
    text: "Gross is everything guests pay. Net is what is left after commission, fees, expenses and maintenance.",
  },
  {
    title: "Every figure carries its source",
    text: "The purchase price and booking amount come from the Bilva price sheet. Everything else is your assumption or an example value.",
  },
  {
    title: "Three scenarios, one set of costs",
    text: "Conservative, moderate and optimistic differ only in occupancy, so you can see how much it matters.",
  },
  {
    title: "No appreciation is assumed",
    text: "The projections add up rental income only. They do not assume the villa rises in value.",
  },
];

export default function CalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="ROI calculator"
        light="Test your own"
        bold="assumptions."
        image={{ ...ref.heroCourtyardPool, note: ILLUSTRATIVE }}
        summary="Set the nightly rate, occupancy and costs you expect, and see gross revenue, net income, yield and payback update as you go."
      >
        <ButtonLink href="#calculator" variant="solid-light">
          Start calculating
        </ButtonLink>
        <ButtonLink href="/investment/rental-income" variant="outline-light">
          How rentals work
        </ButtonLink>
      </PageHero>

      <Section tone="paper" id="calculator" labelledBy="calc-title">
        <Container>
          <SectionHeader id="calc-title" eyebrow="Calculator" light="Your villa," bold="your numbers.">
            <p>
              The starting values show one way to reach about ₹1 lakh a month of gross revenue. They are an
              illustration, not a forecast.
            </p>
          </SectionHeader>
          <div className="mt-10 md:mt-14">
            <Calculator />
          </div>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="read-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeader id="read-title" eyebrow="Reading the results" light="What the figures" bold="do and do not say." column />
            <NumberedList items={howToRead} />
          </div>
        </Container>
      </Section>

      <EnquirySection
        light="Want these numbers"
        bold="checked with us?"
        text="Press “Send me this estimate” in the calculator, or write to us here, and we will reply with the current price list."
        points={["Your estimate travels with your enquiry", "The current cost sheet", "Rental programme terms"]}
        defaultType="investment"
        image={{ src: ref.bandNightGarden.src }}
        source="calculator page"
      />
    </>
  );
}
