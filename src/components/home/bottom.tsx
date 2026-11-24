import Link from "next/link";
import { faqs, nearbyPlaces } from "@/lib/content";
import { galleryHighlights } from "@/lib/gallery";
import { ILLUSTRATIVE, ref } from "@/lib/images";
import { site } from "@/lib/site";
import { EnquirySection, FaqList, JourneySteps, ThemeList } from "../blocks";
import { LocationMap } from "../LocationMap";
import { NameplatePreview } from "../NameplatePreview";
import { IMPRESSION, Photo } from "../Photo";
import { RentalPreview } from "../RentalPreview";
import { Reveal, Stagger, StaggerItem } from "../Reveal";
import { ArrowLink, ButtonLink, Container, Eyebrow, Heading, Section } from "../ui";

/* 6. Your Villa. Your Identity. */
export function Identity() {
  return (
    <Section tone="ink" labelledBy="identity-title">
      <Container>
        <div className="grid gap-12 xl:grid-cols-[0.8fr_1.2fr] xl:gap-20">
          <Reveal from="left">
            <Eyebrow onDark>Your villa. Your identity.</Eyebrow>
            <Heading id="identity-title" light="A home" bold="named after you." className="mt-4" />
            <p className="mt-7 max-w-md text-base leading-7 text-paper/75">
              Your villa is more than a property. It is your personal sanctuary. Make it uniquely yours with a
              name inspired by your Nakshatram.
            </p>
            <ArrowLink href="/villas/personalise" onDark className="mt-8">
              How villa naming works
            </ArrowLink>
          </Reveal>
          <Reveal delay={0.15} from="right">
            <NameplatePreview />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* 7. Own, enjoy, earn */
export function Journey() {
  return (
    <Section tone="mist" labelledBy="journey-title">
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>How it works</Eyebrow>
            <Heading id="journey-title" light="Own your villa." bold="Earn from your investment." className="mt-4" />
          </div>
          <ArrowLink href="/investment/rental-income">About the rental programme</ArrowLink>
        </Reveal>
        <div className="mt-12 md:mt-16">
          <JourneySteps />
        </div>
      </Container>
    </Section>
  );
}

/* 8. Rental income calculator preview */
export function RentalIncome() {
  return (
    <Section tone="paper" labelledBy="rental-title">
      <Container>
        <div className="grid gap-10 xl:grid-cols-[0.8fr_1.4fr] xl:gap-16">
          <Reveal from="left">
            <Eyebrow>Rental income</Eyebrow>
            <Heading id="rental-title" light="What could your" bold="villa earn?" className="mt-4" />
            <p className="mt-7 max-w-md text-base leading-7 text-graphite">
              Move the sliders to see how nightly rate and occupancy change gross rental revenue. The starting
              values show one way to reach about ₹1 lakh a month. They are an illustration, not a promise.
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-stone">
              Renting is optional. Each owner decides whether and when to make their villa available.
            </p>
            <ArrowLink href="/investment/calculator" className="mt-8">
              Open the full calculator
            </ArrowLink>
          </Reveal>
          <Reveal delay={0.15} from="right">
            <RentalPreview />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* 9. Why Gokarna */
export function WhyGokarna() {
  return (
    <Section tone="ink" labelledBy="gokarna-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal from="left">
            <Eyebrow onDark>Why Gokarna</Eyebrow>
            <Heading id="gokarna-title" light="A destination" bold="for every age." className="mt-4" />
            <p className="mt-7 max-w-md text-base leading-7 text-paper/75">
              A unique haven blending spirituality with beach lifestyle. Gokarna gives each generation its own
              reason to come back.
            </p>
            <ArrowLink href="/location" onDark className="mt-8">
              Explore the location
            </ArrowLink>
          </Reveal>
          <ThemeList />
        </div>
      </Container>
    </Section>
  );
}

/* 10. Hotel preview */
export function HotelPreview() {
  return (
    <Section tone="mist" labelledBy="hotel-title">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
          <Link href="/hotel" className="group block" aria-label="The hotel at Bilva Resorts">
            <Photo
              src="/images/hotel-pool.jpg"
              alt="Three-storey hotel with arched ground floor and balconies behind an infinity pool"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="aspect-[4/3] w-full"
              tag="Under construction"
              note={IMPRESSION}
            />
          </Link>
          <Stagger gap={0.12}>
            <StaggerItem>
              <Eyebrow>The hotel</Eyebrow>
              <Heading id="hotel-title" light="A hotel within" bold="the resort." className="mt-4" />
            </StaggerItem>
            <StaggerItem>
              <p className="mt-7 max-w-md text-base leading-7 text-graphite">
                A hotel is under construction as part of Bilva Resorts. Register your interest and we will
                contact you when reservations open.
              </p>
            </StaggerItem>
            <StaggerItem className="mt-9">
              <ButtonLink href="/hotel" variant="solid-dark" arrow>
                Register interest
              </ButtonLink>
            </StaggerItem>
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}

/* 11. Location */
export function LocationPreview() {
  const { address } = site;
  return (
    <Section tone="paper" labelledBy="location-title">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal from="left">
            <Eyebrow>Location</Eyebrow>
            <Heading id="location-title" light="Between two rivers" bold="and the Arabian Sea." className="mt-4" />
            <p className="mt-7 max-w-md text-base leading-7 text-graphite">
              Gokarna sits on the Arabian Sea coast of Karnataka, between the Gangavali and Aghanashini
              rivers.
            </p>
            <address className="mt-6 text-sm not-italic leading-6 text-stone">
              {address.line1}, {address.line2}, {address.region} {address.postalCode}
            </address>
            <h3 className="mt-10 text-[11px] font-semibold uppercase tracking-eyebrow text-stone">Nearby</h3>
            <Stagger as="ul" className="mt-4 grid gap-x-8 border-t border-rule text-sm sm:grid-cols-2" gap={0.06}>
              {nearbyPlaces.map((place) => (
                <StaggerItem as="li" key={place} className="border-b border-rule py-3">
                  {place}
                </StaggerItem>
              ))}
            </Stagger>
            <div className="mt-9">
              <ButtonLink href="/location" variant="outline-dark" arrow>
                Explore the location
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1} from="right">
            <LocationMap />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* 12. Gallery */
export function GalleryPreview() {
  return (
    <Section tone="mist" labelledBy="gallery-title">
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Gallery</Eyebrow>
            <Heading id="gallery-title" light="A first look at" bold="Bilva Resorts." className="mt-4" />
          </div>
          <ArrowLink href="/gallery">View the gallery</ArrowLink>
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-3 md:gap-4" gap={0.1}>
          {galleryHighlights.map((image) => (
            <StaggerItem key={image.src}>
              <Link href="/gallery" className="group block" aria-label={`${image.caption}: open the gallery`}>
                <Photo
                  src={image.src}
                  alt={image.alt}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="aspect-[4/3] w-full"
                  note={ILLUSTRATIVE}
                  reveal={false}
                />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}

/* 14. FAQ (13, Testimonials, has its own page; see src/lib/testimonials.ts) */
export function Faq() {
  return (
    <Section tone="paper" labelledBy="faq-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal from="left">
            <Eyebrow>Common questions</Eyebrow>
            <Heading id="faq-title" light="Buying a villa at" bold="Bilva Resorts." className="mt-4" />
            <ArrowLink href="/faq" className="mt-8">
              View all questions
            </ArrowLink>
          </Reveal>
          <FaqList items={faqs} />
        </div>
      </Container>
    </Section>
  );
}

/* 15. Final enquiry */
export function FinalEnquiry() {
  return (
    <EnquirySection
      light="Ready to see"
      bold="your villa?"
      text="Send us your details and we will come back with what you need to decide."
      points={[
        "The current price list and payment schedule",
        "A site visit at a time that suits you",
        "Clear answers on ownership and the rental programme",
      ]}
      image={{ src: ref.bandDuskLoungers.src }}
      source="home: final enquiry"
    />
  );
}
