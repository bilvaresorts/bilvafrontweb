import type { Metadata } from "next";
import { NextStep, PageHero, SectionHeader } from "@/components/blocks";
import { LocationMap } from "@/components/LocationMap";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { RevealCards } from "@/components/RevealCards";
import { ButtonLink, Container, Section, buttonClass, cn } from "@/components/ui";
import { connectivity, distanceNote, locationHighlights, routeFromHighway, themes } from "@/lib/content";
import { ILLUSTRATIVE, ref } from "@/lib/images";
import { mapsUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Location Highlights: Gokarna Beaches, Temples and Connectivity",
  description:
    "Where Bilva Resorts sits near Gokarna, what is around it, and how to reach it by road, rail and air. With approximate road distances to the beaches, the temple town, the station and the airports.",
};

/*
 * Everything about the place on one page: the map, what is nearby, how to get
 * here and why people come. Distances are approximate road distances from the
 * resort; see the note beside them in src/lib/content.ts.
 */

type Row = { name: string; distance: string; note?: string };

/** A place and how far it is, on one line. */
function DistanceList({ items, onDark = false }: { items: Row[]; onDark?: boolean }) {
  return (
    <Stagger as="ul" className={cn("border-t text-sm", onDark ? "border-paper/15" : "border-rule")} gap={0.06}>
      {items.map((item) => (
        <StaggerItem
          as="li"
          key={item.name}
          className={cn("flex items-baseline justify-between gap-6 border-b py-3.5", onDark ? "border-paper/15" : "border-rule")}
        >
          <span>
            <span className={onDark ? "text-paper" : "text-ink"}>{item.name}</span>
            {item.note ? (
              <span className={cn("mt-0.5 block text-xs leading-5", onDark ? "text-paper/55" : "text-stone")}>
                {item.note}
              </span>
            ) : null}
          </span>
          <span className={cn("shrink-0 text-right font-semibold tabular-nums", onDark ? "text-paper" : "text-ink")}>
            {item.distance}
          </span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export default function LocationPage() {
  const { address } = site;
  return (
    <>
      <PageHero
        eyebrow="Location highlights"
        light="Between two rivers"
        bold="and the Arabian Sea."
        image={{ ...ref.heroTimberPool, note: ILLUSTRATIVE }}
        summary={`${address.line1}, ${address.line2}, ${address.region} ${address.postalCode}. Inland, north of Gokarna town, about 10 km from National Highway 66.`}
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
              <p>Bilva Resorts is inland, north of Gokarna town, between the Gangavali and Aghanashini rivers.</p>
              <p className="mt-4">{routeFromHighway}</p>
              <p className="mt-4">Tap the Bilva Resorts pin to open Google Maps.</p>
            </SectionHeader>
            <Reveal from="right" delay={0.1}>
              <LocationMap />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="mist" id="highlights" labelledBy="places-title">
        <Container>
          <SectionHeader id="places-title" eyebrow="Location highlights" light="What is" bold="around you.">
            <p>The temple town, the beaches and day trips, by road from the resort.</p>
          </SectionHeader>
          <div className="mt-10 grid gap-x-10 gap-y-12 md:mt-14 md:grid-cols-3">
            {locationHighlights.map((group) => (
              <div key={group.group}>
                <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-eyebrow text-stone">{group.group}</h3>
                <DistanceList items={group.items} />
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-xs leading-5 text-stone">{distanceNote}</p>
        </Container>
      </Section>

      <Section tone="ink" id="connectivity" labelledBy="connectivity-title">
        <Container>
          <SectionHeader id="connectivity-title" eyebrow="Connectivity" light="By road, rail" bold="and air." onDark>
            <p>The highway is about 10 km away and the station about 9 km. The nearest airports are in Goa and Hubballi.</p>
          </SectionHeader>
          <div className="mt-10 grid gap-x-10 gap-y-12 md:mt-14 md:grid-cols-3">
            {connectivity.map((group) => (
              <div key={group.mode}>
                <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-eyebrow text-paper/55">{group.mode}</h3>
                <DistanceList items={group.items} onDark />
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-xs leading-5 text-paper/55">{distanceNote}</p>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="location-themes-title">
        <Container>
          <SectionHeader id="location-themes-title" eyebrow="Why Gokarna" light="A destination" bold="for every age.">
            <p>A unique haven blending spirituality with beach lifestyle.</p>
          </SectionHeader>
          <Reveal className="mt-8 md:mt-12" delay={0.1}>
            <RevealCards items={themes} columns="md:grid-cols-2 lg:grid-cols-3" />
          </Reveal>
        </Container>
      </Section>

      <NextStep
        eyebrow="Site visit"
        light="Come and see"
        bold="the location."
        text="Tell us when you would like to visit and we will confirm a time and send directions."
        image={{ src: ref.bandPoolPlants.src }}
        primary={{ label: "Request a site visit", type: "site-visit", message: "I would like to visit the site." }}
        secondary={{ label: "See the villas", href: "/villas" }}
      />
    </>
  );
}
