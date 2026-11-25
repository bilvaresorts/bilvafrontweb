import type { Metadata } from "next";
import {
  EnquirySection,
  FaqList,
  Inclusions,
  PageHero,
  SectionHeader,
  StepRow,
  VillaCard,
  pad,
} from "@/components/blocks";
import { NameplatePreview } from "@/components/NameplatePreview";
import { PlanSlot, Split, TileGrid } from "@/components/page-blocks";
import { Photo } from "@/components/Photo";
import { Placeholder } from "@/components/Placeholder";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
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
          <Stagger className="mt-10 grid gap-x-6 gap-y-12 md:mt-14 md:grid-cols-2" gap={0.12}>
            {modelVillaRooms.map((room, index) => (
              <StaggerItem key={room.title} className="group">
                {room.src ? (
                  <Photo
                    src={room.src}
                    alt={room.alt}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="aspect-[3/2] w-full"
                    position={room.title === "Entrance" ? "object-[50%_40%]" : "object-center"}
                    note={room.note || undefined}
                    reveal={false}
                  />
                ) : (
                  <Placeholder label={`${room.title} render`} className="aspect-[3/2] w-full" />
                )}
                <div className="mt-5 flex gap-5">
                  <span className="pt-1.5 text-[11px] tabular-nums text-stone">{pad(index)}</span>
                  <div>
                    <h3 className="text-[22px] font-bold uppercase leading-7 tracking-display">{room.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-6 text-graphite">{room.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section tone="mist" id="plans" labelledBy="plans-title">
        <Container>
          <SectionHeader id="plans-title" eyebrow="Plans" light="Floor plan and" bold="site layout.">
            <p>
              2,000 sq ft of built-up area on a plot of 40 ft by 80 ft, with both bedrooms and the living room
              facing the pool. Ask us which villas are available and we will send the current plan.
            </p>
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
                Your villa is more than a property. Make it uniquely yours with a name inspired by your
                Nakshatram. Vijay, born under Sravana, would own Villa Sravana.
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
        text="Tell us how to reach you and we will send the current cost sheet, payment schedule and availability."
        points={["The full cost sheet", "The four-stage payment schedule", "Which villas are available"]}
        image={{ src: ref.bandBlueDusk.src }}
        source="villas page"
      />
    </>
  );
}
