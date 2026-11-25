import type { Metadata } from "next";
import { NextStep, PageHero, SectionHeader, pad } from "@/components/blocks";
import { Split } from "@/components/page-blocks";
import { EnquireLink } from "@/components/PrefillButton";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { ArrowLink, ButtonLink, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { themes } from "@/lib/content";
import { ILLUSTRATIVE, ref } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Bilva Resorts, Gokarna",
  description:
    "Bilva Resorts is a development of private pool villas with a hotel under construction in Gokarna, Karnataka: a haven blending spirituality with beach lifestyle.",
};

/*
 * This page is about who Bilva Resorts is: the vision and the three parts of the
 * development. Facts, prices and the reasons to visit Gokarna are told in full on
 * their own pages (Villas, Investment, Location); here they are only pointed to.
 */

const offerings = [
  {
    title: "The villas",
    text: "About 40 private villas, each with two bedrooms and its own pool.",
    href: "/villas",
    link: "See the villas",
  },
  {
    title: "The resort",
    text: "A common pool, restaurant, banquet hall, spa, game zone and coffee shop are planned.",
    href: "/villas",
    link: "See the amenities",
  },
  {
    title: "The hotel",
    text: "Under construction, for guests who want to stay without owning.",
    href: "/hotel",
    link: "See the hotel",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        image={{ ...ref.heroWhiteCourtyard, note: ILLUSTRATIVE }}
        light="About"
        bold="Bilva Resorts."
        summary="A unique haven blending spirituality with beach lifestyle, in Gokarna on the Karnataka coast."
      >
        <ButtonLink href="/villas" variant="solid-light">
          Explore the villas
        </ButtonLink>
        <EnquireLink variant="outline-light" prefill={{ type: "general" }}>
          Enquire now
        </EnquireLink>
      </PageHero>

      <Section tone="paper" labelledBy="vision-title">
        <Container>
          <Split
            image={{
              src: "/images/site-entrance.jpg",
              alt: "Red-earth approach road cut through the hillside, with a valley beyond",
              tag: "The approach to the site",
            }}
          >
            <Eyebrow>Our vision</Eyebrow>
            <Heading id="vision-title" light="Invest in memories," bold="not just bricks." className="mt-4" />
            <div className="mt-7 max-w-xl space-y-4 text-base leading-7 text-graphite">
              <p>Own a vacation home where every sunrise is a new beginning.</p>
              <blockquote className="border-l-2 border-ink pl-5 text-lg leading-8 text-ink">
                A house is made of walls, a home is made of love, and a vacation home is made of memories.
              </blockquote>
            </div>
          </Split>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="philosophy-title">
        <Container>
          <SectionHeader id="philosophy-title" eyebrow="Our approach" light="Ownership and hospitality" bold="in one destination.">
            <p>Villas, a resort and a hotel, on one site.</p>
          </SectionHeader>
          <Stagger className="mt-10 grid gap-px bg-rule md:mt-14 md:grid-cols-3" gap={0.14}>
            {offerings.map((item) => (
              <StaggerItem key={item.title} className="flex flex-col bg-paper p-7 md:p-9">
                <h3 className="text-[22px] font-bold uppercase leading-7 tracking-display">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-graphite">{item.text}</p>
                <ArrowLink href={item.href} className="mt-6">
                  {item.link}
                </ArrowLink>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section tone="ink" labelledBy="about-gokarna-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal from="left">
              <Eyebrow onDark>The destination</Eyebrow>
              <Heading id="about-gokarna-title" light="Six reasons" bold="people come." className="mt-4" />
              <p className="mt-7 max-w-md text-base leading-7 text-paper/75">
                A temple town on the Arabian Sea, with a reason for everyone to come.
              </p>
              <ArrowLink href="/location" onDark className="mt-8">
                Explore the location
              </ArrowLink>
            </Reveal>
            {/* The reasons by name only. The Home page tells each one in a line. */}
            <Stagger as="ul" className="grid border-t border-paper/15 sm:grid-cols-2 sm:gap-x-10" gap={0.08}>
              {themes.map((theme, index) => (
                <StaggerItem as="li" key={theme.title} className="flex items-baseline gap-4 border-b border-paper/15 py-5">
                  <span className="text-[11px] tabular-nums text-paper/45">{pad(index)}</span>
                  <span className="text-lg font-semibold uppercase tracking-display md:text-xl">{theme.title}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      <NextStep
        light="Talk to"
        bold="Bilva Resorts."
        text="Tell us what you would like to know and we will come back to you."
        image={{ src: ref.bandDuskPool.src }}
        primary={{ label: "Enquire now", type: "general" }}
        secondary={{ label: "Read common questions", href: "/faq" }}
      />
    </>
  );
}
