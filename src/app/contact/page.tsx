import type { Metadata } from "next";
import { PageHero } from "@/components/blocks";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui";
import { WhatsAppButton } from "@/components/WhatsApp";
import { ILLUSTRATIVE, ref } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact and Enquiries",
  description:
    "Enquire about buying a villa, the rental programme, the hotel or a site visit at Bilva Resorts, Gokarna.",
};

export default function ContactPage() {
  const { address, contact } = site;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        light="Enquire"
        bold="now"
        image={{ ...ref.heroDuskLiving, note: ILLUSTRATIVE }}
        compact
        summary="Tell us what you would like to know. One form covers villa purchase, investment, rental income, the hotel and site visits."
      />
      {/* Buttons across the site open this form with /contact#enquire. */}
      <Section tone="paper" id="enquire">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <Eyebrow>Bilva Resorts</Eyebrow>
              <address className="mt-5 text-base not-italic leading-7 text-graphite">
                {address.line1}
                <br />
                {address.line2}
                <br />
                {address.locality}, {address.region} {address.postalCode}
                <br />
                {address.country}
              </address>
              {contact.phone ? (
                <p className="mt-5 text-base">
                  <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="font-semibold underline-offset-4 hover:underline">
                    {contact.phone}
                  </a>
                </p>
              ) : null}
              {contact.salesEmail ? (
                <p className="mt-1 text-base">
                  <a href={`mailto:${contact.salesEmail}`} className="font-semibold underline-offset-4 hover:underline">
                    {contact.salesEmail}
                  </a>
                </p>
              ) : null}
              <WhatsAppButton
                message="Hello, I would like to know more about the villas at Bilva Resorts."
                className="mt-7"
              />
            </div>
            <Reveal from="right" delay={0.1} className="bg-white p-6 md:p-10">
              <EnquiryForm variant="full" defaultType="villa" source="contact page" acceptPrefill />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
