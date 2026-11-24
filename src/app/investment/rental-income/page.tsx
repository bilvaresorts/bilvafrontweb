import type { Metadata } from "next";
import { NextStep, PageHero, SectionHeader, pad } from "@/components/blocks";
import { RuleList } from "@/components/page-blocks";
import { EnquireLink } from "@/components/PrefillButton";
import { Stagger, StaggerItem } from "@/components/Reveal";
import { ButtonLink, Container, Section } from "@/components/ui";
import { calculatorDisclaimer, rentalProgramme } from "@/lib/content";
import { formatInr } from "@/lib/format";
import { ILLUSTRATIVE, ref } from "@/lib/images";

export const metadata: Metadata = {
  title: "Holiday Home Rental Income in Gokarna",
  description:
    "How owners at Bilva Resorts, Gokarna, can choose to rent out their villa through a Bilva-managed programme. Illustrative figures only; returns are not guaranteed.",
};

/*
 * This page explains the rental programme: who does what, what to know before
 * opting in, and one worked illustration. The numbers themselves are worked
 * out on the ROI calculator page, which is linked and not repeated here.
 */

/** ₹12 lakh a year divided by the nights booked at each occupancy, with no owner days. */
const lakhIllustration = [40, 50, 60].map((occupancy) => ({
  occupancy,
  nights: Math.round((365 * occupancy) / 100),
  rate: Math.round(1200000 / ((365 * occupancy) / 100)),
}));

/** Drawn from the confirmed answers on the FAQ page. */
const beforeYouOptIn = [
  "Renting is optional. Nothing obliges you to rent your villa out.",
  "Income is not guaranteed. It depends on bookings, season and nightly rates.",
  "Platform commission, the management fee and maintenance come out of gross revenue.",
  "Ask us for the current management fee and payout terms before you decide.",
];

export default function RentalIncomePage() {
  return (
    <>
      <PageHero
        eyebrow="Rental income"
        image={{ ...ref.heroPoolLifestyle, note: ILLUSTRATIVE }}
        light="Own your villa."
        bold="Earn from your investment."
        summary="Enjoy your villa whenever you wish, and explore the opportunity to earn rental income by welcoming guests when you are away. Renting is optional and returns are not guaranteed."
      >
        <ButtonLink href="/investment/calculator" variant="solid-light">
          Calculate your returns
        </ButtonLink>
        <EnquireLink
          variant="outline-light"
          prefill={{ type: "rental", message: "Please tell me how the rental programme works." }}
        >
          Ask about the programme
        </EnquireLink>
      </PageHero>

      <Section tone="paper" labelledBy="programme-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeader id="programme-title" eyebrow="The rental programme" light="Bilva manages." bold="You decide." column>
              <p>
                Bilva manages rentals for owners who choose to opt in. Each step below is marked with who
                takes it: you, or Bilva.
              </p>
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

      <Section tone="ink" labelledBy="opt-in-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeader id="opt-in-title" eyebrow="Good to know" light="Before you" bold="opt in." onDark column />
            <RuleList items={beforeYouOptIn} onDark />
          </div>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="lakh-title">
        <Container>
          <SectionHeader id="lakh-title" eyebrow="An illustration" light="What it takes to reach" bold="₹1 lakh a month.">
            <p>
              ₹1 lakh a month is ₹12 lakh a year of gross revenue. These three combinations of nightly rate and
              occupancy reach it. This is arithmetic, not a market rate or a promise.
            </p>
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
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-16">
            <div className="max-w-3xl space-y-3 text-xs leading-5 text-stone">
              <p>
                Gross means before platform commission, management fee, maintenance and taxes. Net income is
                lower. Figures assume the villa is available to guests all year.
              </p>
              <p>{calculatorDisclaimer}</p>
            </div>
            <ButtonLink href="/investment/calculator" variant="solid-dark" arrow className="shrink-0">
              Run your own numbers
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <NextStep
        light="Ask about the"
        bold="rental programme."
        text="We will share how the programme works, with the current management fee and payout terms."
        image={{ src: ref.bandTerraceDusk.src }}
        primary={{
          label: "Ask about the programme",
          type: "rental",
          message: "Please tell me how the rental programme works.",
        }}
        secondary={{ label: "Rental questions answered", href: "/faq" }}
      />
    </>
  );
}
