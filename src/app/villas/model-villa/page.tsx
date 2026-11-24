import type { Metadata } from "next";
import { NextStep, PageHero, SectionHeader, pad } from "@/components/blocks";
import { PlanSlot } from "@/components/page-blocks";
import { Photo } from "@/components/Photo";
import { Placeholder } from "@/components/Placeholder";
import { EnquireLink } from "@/components/PrefillButton";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { ButtonLink, Container, Section } from "@/components/ui";
import { modelVillaRooms } from "@/lib/content";
import { ILLUSTRATIVE, ref } from "@/lib/images";

export const metadata: Metadata = {
  title: "Model Villa Tour",
  description:
    "A room-by-room look at the two-bedroom private pool villa at Bilva Resorts, Gokarna, with the interiors that are included.",
};

export default function ModelVillaPage() {
  return (
    <>
      <PageHero
        eyebrow="Model villa"
        image={{ ...ref.heroOpenLiving, note: ILLUSTRATIVE }}
        light="Walk through"
        bold="the villa."
        summary="A room-by-room look at the two-bedroom villa, so you know what you are buying before you visit the site."
      >
        <EnquireLink prefill={{ type: "site-visit", message: "I would like to visit the site." }}>
          Schedule a site visit
        </EnquireLink>
        <ButtonLink href="/villas" variant="outline-light">
          See price and specification
        </ButtonLink>
      </PageHero>

      <Section tone="paper" labelledBy="rooms-title">
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

      <Section tone="ink" labelledBy="tour-title">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <SectionHeader id="tour-title" eyebrow="Virtual tour" light="Look around" bold="in 360 degrees." onDark column>
              <p>
                A 360-degree tour and a video walkthrough of the model villa will be added here. Until then,
                the best way to see the villa is a site visit.
              </p>
            </SectionHeader>
            <Reveal from="right" className="group">
              <Photo
                src={ref.tourLiving.src}
                alt={ref.tourLiving.alt}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[16/10] w-full"
                tag="360-degree tour: coming soon"
                note={ILLUSTRATIVE}
                reveal={false}
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="plan-title">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeader id="plan-title" eyebrow="Floor plan" light="How the villa" bold="is laid out." column>
              <p>
                2,000 sq ft of built-up area on a plot of 40 ft by 80 ft, with both bedrooms and the living room
                facing the pool.
              </p>
            </SectionHeader>
            <PlanSlot
              label="Villa floor plan"
              text="The drawing will open at full size here, with room dimensions."
              image={ref.planLiving}
            />
          </div>
        </Container>
      </Section>

      <NextStep
        eyebrow="Site visit"
        light="See the villa"
        bold="in person."
        text="Choose a date that suits you and our team will show you the site and the villa."
        image={{ src: ref.bandPavilionPool.src }}
        primary={{ label: "Schedule a site visit", type: "site-visit", message: "I would like to visit the site." }}
        secondary={{ label: "See what is included", href: "/villas#price" }}
      />
    </>
  );
}
