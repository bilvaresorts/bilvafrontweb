import type { Metadata } from "next";
import { NextStep, PageHero, SectionHeader } from "@/components/blocks";
import { LocationMap } from "@/components/LocationMap";
import { RuleList } from "@/components/page-blocks";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, Section, buttonClass } from "@/components/ui";
import { mapsUrl, site } from "@/lib/site";
import { ILLUSTRATIVE, ref } from "@/lib/images";

export const metadata: Metadata = {
  title: "Location: Gokarna Beaches and Temples",
  description:
    "Where Bilva Resorts sits: inland, north of Gokarna town and south of the Gangavali River, near the beaches of the Karnataka coast.",
};

const placeGroups = [
  { title: "Temple town", items: ["Gokarna town", "Mahabaleshwar Temple"] },
  {
    title: "Beaches",
    items: ["Gokarna Main Beach", "Kudle Beach", "Om Beach", "Half Moon Beach", "Paradise Beach"],
  },
  { title: "Water", items: ["Arabian Sea", "Gangavali River", "Aghanashini River"] },
  { title: "Getting here", items: ["National Highway 66", "Gokarna Road railway station"] },
];

export default function LocationPage() {
  const { address } = site;
  return (
    <>
      <PageHero
        eyebrow="Location"
        light="Between two rivers"
        bold="and the Arabian Sea."
        image={{ ...ref.heroJungleVilla, note: ILLUSTRATIVE }}
        summary={`${address.line1}, ${address.line2}, ${address.region} ${address.postalCode}. Inland, north of Gokarna town.`}
      >
        <ButtonLink href="#map" variant="solid-light">
          See the map
        </ButtonLink>
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("outline-light")}>
          Open in Google Maps
        </a>
      </PageHero>

      <Section tone="paper" id="map" labelledBy="map-section-title">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <SectionHeader id="map-section-title" eyebrow="Illustrated map" light="Where" bold="Bilva sits." column>
              <p>
                Gokarna lies on the Arabian Sea coast of Karnataka, between the Gangavali River to the north
                and the Aghanashini River to the south-east.
              </p>
              <p className="mt-4">
                Bilva Resorts is inland, north of the town and south of the Gangavali River. National Highway
                66 and the railway run north to south further east.
              </p>
              <p className="mt-4">Select the Bilva Resorts pin on the map to open the location in Google Maps.</p>
            </SectionHeader>
            <Reveal from="right" delay={0.1}>
              <LocationMap />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="places-title">
        <Container>
          <SectionHeader id="places-title" eyebrow="Nearby" light="What is" bold="around you." />
          <div className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
            {placeGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-eyebrow text-stone">{group.title}</h3>
                <RuleList items={group.items} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <NextStep
        eyebrow="Site visit"
        light="Come and see"
        bold="the location."
        text="Tell us when you would like to visit and our team will confirm a time and send directions to the site."
        image={{ src: ref.bandPoolBedroom.src }}
        primary={{ label: "Request a site visit", type: "site-visit", message: "I would like to visit the site." }}
        secondary={{ label: "See the villas", href: "/villas" }}
      />
    </>
  );
}
