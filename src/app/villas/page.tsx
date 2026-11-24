import type { Metadata } from "next";
import { EnquirySection, FaqList, Inclusions, PageHero, SectionHeader, VillaCard } from "@/components/blocks";
import { PlanSlot, Split, TileGrid } from "@/components/page-blocks";
import { ArrowLink, ButtonLink, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { atAGlance, faqGroups, resortAmenities } from "@/lib/content";
import { ILLUSTRATIVE, ref } from "@/lib/images";

export const metadata: Metadata = {
  title: "2-Bedroom Private Pool Villas in Gokarna",
  description:
    "About 40 private villas at Bilva Resorts, Gokarna. Two bedrooms, a private pool and 2,000 sq ft of built-up area, from ₹1.36 Cr plus taxes.",
};

/*
 * This page is about the villa itself: what it is, what it costs and what comes
 * with it. Payment stages and charges are on the Investment page, the room-by-room
 * tour and floor plan on the Model Villa page, and the pictures in the Gallery.
 */

export default function VillasPage() {
  return (
    <>
      <PageHero
        eyebrow="The villas"
        image={{ ...ref.heroWhiteVilla, note: ILLUSTRATIVE }}
        light="Forty private"
        bold="pool villas."
        summary="Two bedrooms, your own swimming pool and 2,000 sq ft of built-up space, on a plot of 40 ft by 80 ft in Gokarna."
        facts={atAGlance}
      >
        <ButtonLink href="#enquire" variant="solid-light">
          Enquire now
        </ButtonLink>
        <ButtonLink href="/villas/model-villa" variant="outline-light">
          View the model villa
        </ButtonLink>
      </PageHero>

      <Section tone="paper" labelledBy="development-title">
        <Container>
          <Split
            image={{ ...ref.intro, note: ILLUSTRATIVE }}
            reverse
          >
            <Eyebrow>The development</Eyebrow>
            <Heading id="development-title" light="A private villa." bold="A complete resort." className="mt-4" />
            <div className="mt-7 max-w-xl space-y-4 text-base leading-7 text-graphite">
              <p>
                Bilva Resorts is a development of about 40 private villas in Gokarna, Karnataka. Each villa
                stands on its own plot behind an 8 ft compound wall, with two bedrooms and a private pool.
              </p>
              <p>
                Every villa is sold individually. You own it, you can give it a name of your own, and you
                decide whether to make it available for holiday rentals.
              </p>
            </div>
            <ArrowLink href="/investment" className="mt-8">
              How buying works
            </ArrowLink>
          </Split>
        </Container>
      </Section>

      <Section tone="mist" id="price" labelledBy="price-title">
        <Container>
          <SectionHeader id="price-title" eyebrow="Price" light="One villa type." bold="One clear price." />
          <div className="mt-10 md:mt-14">
            <VillaCard detailsHref={null} />
          </div>
          <div className="mt-14 md:mt-20">
            <Inclusions />
          </div>
          {/* Payment stages and extra charges are set out once, on the Investment page. */}
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-1 border-t border-rule pt-5">
            <ArrowLink href="/investment#costs">Payment stages and extra charges</ArrowLink>
            <ArrowLink href="/gallery" muted>
              View the gallery
            </ArrowLink>
          </div>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="plans-title">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeader
              id="plans-title"
              eyebrow="Site layout"
              light="Where each"
              bold="villa sits."
              link={{ href: "/villas/model-villa", label: "See the floor plan in the model villa" }}
              column
            >
              <p>
                About 40 villas, each on its own plot of 40 ft by 80 ft. Ask us which villas are available
                and we will send the current plan.
              </p>
            </SectionHeader>
            <PlanSlot
              label="Site layout"
              text="The site layout of the 40 villas will open at full size here."
              image={ref.siteAerial}
            />
          </div>
        </Container>
      </Section>

      <Section tone="ink" labelledBy="amenities-title">
        <Container>
          <SectionHeader id="amenities-title" eyebrow="The resort" light="More than" bold="a villa." onDark>
            <p>The resort plan includes six shared amenities for owners and guests.</p>
          </SectionHeader>
          <div className="mt-10 md:mt-14">
            <TileGrid items={resortAmenities} onDark />
          </div>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="naming-title">
        <Container>
          <Split
            image={{
              src: "/images/villa-sravana-entrance.jpg",
              alt: "Villa entrance at dusk with a bronze Villa Sravana nameplate beside the glass doors",
              render: true,
              position: "object-[50%_40%]",
            }}
          >
            <Eyebrow>Your villa. Your identity.</Eyebrow>
            <Heading id="naming-title" light="A home" bold="named after you." className="mt-4" />
            <p className="mt-7 max-w-md text-base leading-7 text-graphite">
              Each villa can carry a name inspired by its owner&rsquo;s Nakshatram, such as Villa Sravana. Preview
              your own nameplate before you enquire.
            </p>
            <div className="mt-9">
              <ButtonLink href="/villas/personalise" variant="solid-dark" arrow>
                Personalise your villa
              </ButtonLink>
            </div>
          </Split>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="villa-faq-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeader
              id="villa-faq-title"
              eyebrow="Common questions"
              light="About"
              bold="the villas."
              link={{ href: "/faq", label: "View all questions" }}
              column
            />
            <FaqList items={[...faqGroups[1].items, faqGroups[0].items[1]]} />
          </div>
        </Container>
      </Section>

      <EnquirySection
        light="Ask for the"
        bold="price list."
        text="Tell us how to reach you and we will send the current cost sheet, payment schedule and availability."
        points={["The full cost sheet", "The four-stage payment schedule", "Which villas are available"]}
        image={{ src: ref.bandBlueDusk.src }}
        source="villas page"
      />
    </>
  );
}
