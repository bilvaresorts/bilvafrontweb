import type { Metadata } from "next";
import { NextStep, PageHero } from "@/components/blocks";
import { Gallery } from "@/components/Gallery";
import { Container, Section } from "@/components/ui";
import { galleryCategories, galleryImages } from "@/lib/gallery";
import { ILLUSTRATIVE, ref } from "@/lib/images";

export const metadata: Metadata = {
  title: "Gallery: Villas, Hotel and Site",
  description:
    "Photographs and renders of the private pool villas, the hotel and the site at Bilva Resorts, Gokarna.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        light="A first look at"
        bold="Bilva Resorts."
        image={{ ...ref.heroThatchPool, note: ILLUSTRATIVE }}
        summary="The villas, the hotel and the site. Tap any image to see it at full size."
      />

      <Section tone="paper" labelledBy="gallery-grid-title">
        <Container>
          <h2 id="gallery-grid-title" className="sr-only">
            All images
          </h2>
          <Gallery images={galleryImages} categories={galleryCategories} />
          <p className="mt-8 max-w-3xl text-xs leading-5 text-stone">
            Images marked as artist&rsquo;s impressions show how the villas and hotel are designed to look.
            Images marked as illustrative show the style of living the resort is designed around, and are not
            pictures of Bilva Resorts. More photographs, construction progress and video tours will be added
            as they become available.
          </p>
        </Container>
      </Section>

      <NextStep
        light="Seen something"
        bold="you like?"
        text="We will share the price list and arrange a visit, so you can see the site for yourself."
        image={{ src: ref.bandRooftop.src }}
        primary={{ label: "Get the price list", type: "villa", message: "Please send me the price list and payment schedule." }}
        secondary={{ label: "See inside the villa", href: "/villas#rooms" }}
      />
    </>
  );
}
