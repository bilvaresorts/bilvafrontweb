import Link from "next/link";
import { faqs, nearbyPlaces } from "@/lib/content";
import { galleryHighlights } from "@/lib/gallery";
import { ILLUSTRATIVE, ref } from "@/lib/images";
import { site } from "@/lib/site";
import { EnquirySection, FaqList } from "../blocks";
import { LocationMap } from "../LocationMap";
import { NameplatePreview } from "../NameplatePreview";
import { Photo } from "../Photo";
import { RentalPreview } from "../RentalPreview";
import { Reveal, Stagger, StaggerItem } from "../Reveal";
import { ArrowLink, ButtonLink, Container, Eyebrow, Heading, Section } from "../ui";

/* 5. Your Villa. Your Identity. */
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
            <ArrowLink href="/villas#naming" onDark className="mt-8">
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

/* 6. Rental income calculator preview */
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
            <ArrowLink href="/investment#calculator" className="mt-8">
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

/* 7. Location highlights */
export function LocationPreview() {
  const { address } = site;
  return (
    <Section tone="mist" labelledBy="location-title">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal from="left">
            <Eyebrow>Location highlights</Eyebrow>
            <Heading id="location-title" light="Between two rivers" bold="and the Arabian Sea." className="mt-4" />
            <p className="mt-7 max-w-md text-base leading-7 text-graphite">
              Gokarna sits on the Arabian Sea coast of Karnataka, between the Gangavali and Aghanashini
              rivers. The temple town, the beaches and the highway are all a short drive from the resort.
            </p>
            <address className="mt-6 text-sm not-italic leading-6 text-stone">
              {address.line1}, {address.line2}, {address.region} {address.postalCode}
            </address>
            <h3 className="mt-10 text-[11px] font-semibold uppercase tracking-eyebrow text-stone">
              From the resort, by road
            </h3>
            <Stagger as="ul" className="mt-4 grid gap-x-8 border-t border-rule text-sm sm:grid-cols-2" gap={0.06}>
              {nearbyPlaces.map((place) => (
                <StaggerItem
                  as="li"
                  key={place.name}
                  className="flex items-baseline justify-between gap-4 border-b border-rule py-3"
                >
                  <span>{place.name}</span>
                  <span className="shrink-0 font-semibold tabular-nums">{place.distance}</span>
                </StaggerItem>
              ))}
            </Stagger>
            <p className="mt-3 text-[11px] leading-5 text-stone">Approximate road distances.</p>
            <div className="mt-8">
              <ButtonLink href="/location" variant="outline-dark" arrow>
                All location highlights
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

/* 8. Gallery */
export function GalleryPreview() {
  return (
    <Section tone="paper" labelledBy="gallery-title">
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

/* 9. FAQ */
export function Faq() {
  return (
    <Section tone="mist" labelledBy="faq-title">
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

/* 10. Final enquiry */
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
