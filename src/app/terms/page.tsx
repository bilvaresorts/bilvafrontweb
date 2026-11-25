import type { Metadata } from "next";
import { PageHero } from "@/components/blocks";
import { Prose } from "@/components/page-blocks";
import { ButtonLink, Container, Section } from "@/components/ui";
import { calculatorDisclaimer } from "@/lib/content";
import { ILLUSTRATIVE, ref } from "@/lib/images";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that apply when you use the Bilva Resorts website.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        light="Terms of"
        bold="use."
        image={{ ...ref.heroPoolParasols, note: ILLUSTRATIVE }}
        compact
        summary="The terms that apply when you use this website."
      />
      <Section tone="paper">
        <Container>
          <Prose>
            <p className="border-l-2 border-ink pl-5 text-sm text-ink">
              Draft for legal review. This text has not yet been approved by Bilva Resorts&rsquo; legal adviser and
              must be confirmed before the website is launched.
            </p>

            <h2>Information on this website</h2>
            <p>
              This website describes the villas, hotel and resort planned at Bilva Resorts, Gokarna. It is
              information, not an offer or a contract. A purchase is governed only by the Agreement of Sale and
              the documents you sign with Bilva Resorts.
            </p>

            <h2>Prices and specifications</h2>
            <p>
              Prices are shown as a starting figure and do not include GST, registration or statutory charges.
              Prices, specifications, inclusions and payment stages can change. The cost sheet we send you shows
              the figures that apply at the time.
            </p>

            <h2>Images</h2>
            <p>
              Images marked as artist&rsquo;s impressions or concept images show the design intent. The finished
              villas, hotel and landscaping may differ. The illustrated map is not to scale and its positions are
              approximate.
            </p>

            <h2>Rental income and calculators</h2>
            <p>{calculatorDisclaimer}</p>
            <p>
              Any rental income figure on this website, including the figure of ₹1 lakh a month, is an
              illustration. Renting is optional, and nothing on this website is investment or financial advice.
            </p>

            <h2>The hotel</h2>
            <p>
              The hotel is under construction. Registering your interest is not a reservation and no payment is
              taken through this website.
            </p>

            <h2>Using the website</h2>
            <p>
              The text, images, logo and design of this website belong to Bilva Resorts or are used with
              permission. Please do not copy them for commercial use without written consent.
            </p>

            <h2>Your details</h2>
            <p>How we handle the details you send us is set out in the Privacy Policy.</p>

            <div className="flex flex-wrap gap-3 pt-6">
              <ButtonLink href="/privacy-policy" variant="outline-dark">
                Privacy policy
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline-dark" arrow>
                Contact us
              </ButtonLink>
            </div>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
