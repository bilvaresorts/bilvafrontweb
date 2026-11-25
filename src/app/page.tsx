import { Faq, FinalEnquiry, GalleryPreview, Identity, LocationPreview, RentalIncome } from "@/components/home/bottom";
import { Hero } from "@/components/home/HomeHero";
import { InsideVilla, Offers, VillaOffer } from "@/components/home/top";
import { faqs } from "@/lib/content";
import { geo, mapsUrl, site } from "@/lib/site";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Resort",
    name: site.name,
    url: site.url,
    description: "Private pool villas and a hotel under construction in Gokarna, Karnataka.",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: geo.latitude, longitude: geo.longitude },
    hasMap: mapsUrl,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Offers />
      <VillaOffer />
      <InsideVilla />
      <Identity />
      <RentalIncome />
      <LocationPreview />
      <GalleryPreview />
      <Faq />
      <FinalEnquiry />
    </>
  );
}
