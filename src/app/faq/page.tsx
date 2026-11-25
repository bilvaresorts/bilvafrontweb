import type { Metadata } from "next";
import { FaqList, NextStep, PageHero } from "@/components/blocks";
import { EnquireLink } from "@/components/PrefillButton";
import { Reveal } from "@/components/Reveal";
import { Container, Section } from "@/components/ui";
import { faqGroups } from "@/lib/content";
import { ILLUSTRATIVE, ref } from "@/lib/images";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about the price, payment stages, taxes, the rental programme, villa naming and the hotel at Bilva Resorts, Gokarna.",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  ),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <PageHero
        eyebrow="Help"
        light="Common"
        bold="questions."
        image={{ ...ref.heroPoolLane, note: ILLUSTRATIVE }}
        summary="Straight answers. If yours is not here, ask us."
      >
        <EnquireLink prefill={{ type: "general" }}>Ask a question</EnquireLink>
      </PageHero>

      <Section tone="paper">
        <Container>
          <div className="space-y-16 md:space-y-24">
            {faqGroups.map((group, index) => (
              <div key={group.title} className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                <Reveal from="left">
                  <p className="text-[11px] tabular-nums text-stone">{String(index + 1).padStart(2, "0")}</p>
                  <h2 className="mt-3 text-[1.75rem] font-bold uppercase leading-[1.05] tracking-display md:text-4xl">
                    {group.title}
                  </h2>
                </Reveal>
                <FaqList items={group.items} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <NextStep
        light="Still have"
        bold="a question?"
        text="Write to us and a member of our team will answer."
        image={{ src: ref.bandPoolStone.src }}
        primary={{ label: "Ask a question", type: "general" }}
        secondary={{ label: "See the villas", href: "/villas" }}
      />
    </>
  );
}
