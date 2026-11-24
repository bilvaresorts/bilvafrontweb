import type { Metadata } from "next";
import { EnquirySection, PageHero, SectionHeader } from "@/components/blocks";
import { Gallery } from "@/components/Gallery";
import { Split } from "@/components/page-blocks";
import { Reveal } from "@/components/Reveal";
import { ArrowLink, ButtonLink, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { galleryImages } from "@/lib/gallery";
import { ILLUSTRATIVE, ref } from "@/lib/images";

export const metadata: Metadata = {
  title: "Bilva Resorts Hotel, Gokarna: Opening Soon",
  description:
    "A hotel is under construction at Bilva Resorts, Gokarna. See the renders and register your interest to hear when reservations open.",
};

const hotelImages = galleryImages.filter((image) => image.categories.includes("Hotel"));

export default function HotelPage() {
  return (
    <>
      <PageHero
        eyebrow="The hotel"
        light="The hotel at"
        bold="Bilva Resorts."
        image={{ ...ref.heroGreyVilla, note: ILLUSTRATIVE }}
        summary="A hotel is being built as part of the resort. Reservations are not open yet. Register your interest and we will contact you when they are."
        tag="Under construction"
      >
        <ButtonLink href="#enquire" variant="solid-light">
          Register interest
        </ButtonLink>
        <ButtonLink href="#renders" variant="outline-light">
          See the renders
        </ButtonLink>
      </PageHero>

      <Section tone="paper" labelledBy="hotel-intro-title">
        <Container>
          <Split
            image={{
              src: "/images/hotel-lawn.jpg",
              alt: "Hotel event lawn with a white arched pavilion, looking out towards the sea",
              render: true,
            }}
            reverse
          >
            <Eyebrow>Part of the same destination</Eyebrow>
            <Heading id="hotel-intro-title" light="A hotel within" bold="the resort." className="mt-4" />
            <div className="mt-7 max-w-xl space-y-4 text-base leading-7 text-graphite">
              <p>
                The hotel stands within Bilva Resorts, alongside the private villas. It gives the resort a
                place for guests who want to stay without owning.
              </p>
              <p>
                The artist&rsquo;s impressions show arched ground-floor rooms, balconies on the floors above, a
                pool deck and an event lawn.
              </p>
              <p>
                The resort plan also includes a common pool, restaurant, banquet hall, spa, game zone and
                coffee shop. Room categories and hotel facilities will be published before opening.
              </p>
            </div>
          </Split>
        </Container>
      </Section>

      <Section tone="mist" id="renders" labelledBy="renders-title">
        <Container>
          <SectionHeader id="renders-title" eyebrow="Renders" light="How the hotel" bold="will look.">
            <p>Select an image to view it at full size.</p>
          </SectionHeader>
          <div className="mt-10 md:mt-14">
            <Gallery images={hotelImages} columns="md:columns-2" />
          </div>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="hotel-more-title">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <Reveal from="left">
              <Eyebrow>Location</Eyebrow>
              <Heading id="hotel-more-title" as="h2" size="band" light="Inland of" bold="Gokarna town." className="mt-4" />
              <p className="mt-6 max-w-md text-base leading-7 text-graphite">
                The resort lies north of Gokarna, the temple town known for the Mahabaleshwar Temple and
                its beaches.
              </p>
              <ArrowLink href="/location" className="mt-6">
                Explore the location
              </ArrowLink>
            </Reveal>
            <Reveal from="right" delay={0.1}>
              <Eyebrow>Prefer to own?</Eyebrow>
              <h2 className="mt-4 text-[1.75rem] uppercase leading-[1.02] tracking-display md:text-4xl">
                <span className="block font-light">A villa of</span>
                <span className="block font-bold">your own.</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-graphite">
                The resort also offers about 40 private pool villas for sale, each with two bedrooms.
              </p>
              <ArrowLink href="/villas" className="mt-6">
                See the villas
              </ArrowLink>
            </Reveal>
          </div>
        </Container>
      </Section>

      <EnquirySection
        eyebrow="Register interest"
        light="Be the first"
        bold="to know."
        text="Leave your details and we will contact you when the hotel opens for reservations."
        points={["No booking or payment is taken now", "We contact you when reservations open", "Tell us when you hope to travel"]}
        defaultType="hotel"
        image={{ src: ref.bandTerraces.src }}
        source="hotel page"
        submitLabel="Register interest"
        extras={[
          { name: "travelPeriod", label: "When would you like to stay?", placeholder: "Month and year" },
          { name: "guests", label: "Number of guests", type: "number" },
        ]}
        whatsappMessage="Hello, I would like to hear when the Bilva Resorts hotel opens for reservations."
      />
    </>
  );
}
