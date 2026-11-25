import type { Metadata } from "next";
import {
  EnquirySection,
  FaqList,
  Inclusions,
  PageHero,
  SectionHeader,
  StepRow,
  VillaCard,
} from "@/components/blocks";
import { ExpandingPanels, type Panel } from "@/components/ExpandingPanels";
import { NameplatePreview } from "@/components/NameplatePreview";
import { PlanSlot, Split, TileGrid } from "@/components/page-blocks";
import { Reveal } from "@/components/Reveal";
import { ArrowLink, ButtonLink, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { atAGlance, faqGroups, modelVillaRooms, namingSteps, resortAmenities } from "@/lib/content";
import { ILLUSTRATIVE, ref } from "@/lib/images";

export const metadata: Metadata = {
  title: "2-Bedroom Private Pool Villas in Gokarna",
  description:
    "About 40 private villas at Bilva Resorts, Gokarna. Two bedrooms, a private pool and 2,000 sq ft of built-up area, from ₹1.36 Cr plus taxes.",
};

/*
 * Everything about the villa on one page: what it is, what it costs, what is
 * inside, how it is laid out and how it is named. Payment stages, charges and
 * rental income are on the Invest page; the pictures are in the Gallery.
 */

/** The eight rooms as panels: one open, the rest waiting as strips. */
const roomPanels: Panel[] = modelVillaRooms.map((room) => ({
  title: room.title,
  text: room.text,
  image: {
    src: room.src,
    alt: room.alt,
    position: room.title === "Entrance" ? "object-[50%_40%]" : undefined,
  },
  note: room.note,
}));

export default function VillasPage() {
  return (
    <>
      <PageHero
        eyebrow="The villas"
        image={{ ...ref.heroWhiteVilla, note: ILLUSTRATIVE }}
        light="Forty private"
        bold="pool villas."
        summary="Two bedrooms and your own pool, in Gokarna."
        facts={atAGlance}
      >
        <ButtonLink href="#enquire" variant="solid-light">
          Buy a villa
        </ButtonLink>
        <ButtonLink href="#rooms" variant="outline-light">
          See inside the villa
        </ButtonLink>
      </PageHero>

      <Section tone="paper" labelledBy="development-title">
        <Container>
          <Split image={{ ...ref.intro, note: ILLUSTRATIVE }} reverse>
            <Eyebrow>The development</Eyebrow>
            <Heading id="development-title" light="A private villa." bold="A complete resort." className="mt-4" />
            <p className="mt-7 max-w-md text-base leading-7 text-graphite">
              About 40 villas, each on its own plot behind an 8 ft compound wall. You own yours, name it, and
              choose whether to rent it out.
            </p>
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
          {/* Payment stages and extra charges are set out once, on the Invest page. */}
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-1 border-t border-rule pt-5">
            <ArrowLink href="/investment#costs">Payment stages and extra charges</ArrowLink>
            <ArrowLink href="/gallery" muted>
              View the gallery
            </ArrowLink>
          </div>
        </Container>
      </Section>

      <Section tone="paper" id="rooms" labelledBy="rooms-title">
        <Container>
          <SectionHeader id="rooms-title" eyebrow="Room by room" light="Eight spaces," bold="one private villa." />
          <Reveal className="mt-8 md:mt-12" delay={0.1}>
            <ExpandingPanels items={roomPanels} openShare={8} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="mist" id="plans" labelledBy="plans-title">
        <Container>
          <SectionHeader id="plans-title" eyebrow="Plans" light="Floor plan and" bold="site layout.">
            <p>2,000 sq ft on a 40 ft by 80 ft plot. Ask us and we will send the current plan.</p>
          </SectionHeader>
          <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-8">
            <PlanSlot
              label="Villa floor plan"
              text="The drawing will open at full size here, with room dimensions."
              image={ref.planLiving}
            />
            <PlanSlot
              label="Site layout"
              text="The site layout of the 40 villas will open at full size here."
              image={ref.siteAerial}
            />
          </div>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="amenities-title">
        <Container>
          <SectionHeader id="amenities-title" eyebrow="The resort" light="More than" bold="a villa.">
            <p>The resort plan includes six shared amenities for owners and guests.</p>
          </SectionHeader>
          <div className="mt-10 md:mt-14">
            <TileGrid items={resortAmenities} />
          </div>
        </Container>
      </Section>

      <Section tone="ink" id="naming" labelledBy="naming-title">
        <Container>
          <div className="grid gap-12 xl:grid-cols-[0.8fr_1.2fr] xl:gap-20">
            <SectionHeader
              id="naming-title"
              eyebrow="Your villa. Your identity."
              light="A home"
              bold="named after you."
              onDark
              column
            >
              <p>
                Name your villa after your Nakshatram. Vijay, born under Sravana, would own Villa Sravana.
              </p>
            </SectionHeader>
            <Reveal delay={0.15} from="right">
              <NameplatePreview />
            </Reveal>
          </div>
          <div className="mt-16 md:mt-20">
            <StepRow steps={namingSteps} columns="lg:grid-cols-5" onDark />
          </div>
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
        light="Buy a villa at"
        bold="Bilva Resorts."
        text="Tell us how to reach you and we will send the details."
        points={["The full cost sheet", "The four-stage payment schedule", "Which villas are available"]}
        image={{ src: ref.bandBlueDusk.src }}
        source="villas page"
      />
    </>
  );
}
