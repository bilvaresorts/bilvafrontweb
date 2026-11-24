import type { Metadata } from "next";
import { PageHero } from "@/components/blocks";
import { Prose } from "@/components/page-blocks";
import { ButtonLink, Container, Section } from "@/components/ui";
import { ILLUSTRATIVE, ref } from "@/lib/images";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Bilva Resorts collects, uses and protects the details you share through this website.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        light="Privacy"
        bold="policy."
        image={{ ...ref.heroGardenWall, note: ILLUSTRATIVE }}
        compact
        summary="How Bilva Resorts handles the details you share with us through this website."
      />
      <Section tone="paper">
        <Container>
          <Prose>
            <p className="border-l-2 border-ink pl-5 text-sm text-ink">
              Draft for legal review. This text has not yet been approved by Bilva Resorts&rsquo; legal adviser and
              must be confirmed before the website is launched.
            </p>

            <h2>What we collect</h2>
            <p>When you send an enquiry we collect the details you type into the form:</p>
            <ul>
              <li>Your name, phone number and, if you give it, your email address.</li>
              <li>What you are enquiring about, your budget or preferred visit date, and your message.</li>
              <li>
                Details you choose to add, such as a villa name, a travel period or the figures from a calculator
                estimate.
              </li>
              <li>The page of the website the enquiry was sent from.</li>
            </ul>

            <h2>Why we collect it</h2>
            <p>
              We use these details only to answer your enquiry: to send you the price list, arrange a site visit,
              explain the rental programme, or tell you when the hotel opens for reservations. We contact you by
              phone, WhatsApp or email, as you agreed when you ticked the consent box.
            </p>

            <h2>Who sees it</h2>
            <p>
              Your details are seen by the Bilva Resorts team that handles enquiries. We do not sell your details
              or share them for other companies&rsquo; marketing. The services that host this website and deliver
              our email process the data on our behalf.
            </p>

            <h2>How long we keep it</h2>
            <p>
              We keep enquiry details for as long as we need them to respond to you and to maintain our records,
              and then delete them.
            </p>

            <h2>Cookies and analytics</h2>
            <p>
              This website does not set advertising cookies. If we add analytics, they will stay switched off
              until you accept them in the cookie notice.
            </p>
            <p>
              The map on this website is our own illustration and loads nothing from other companies. Its pin
              and the &ldquo;Open in Google Maps&rdquo; links take you to Google&rsquo;s website, which has its
              own privacy policy.
            </p>

            <h2>Your choices</h2>
            <p>
              You can ask us what details we hold about you, ask us to correct them, or ask us to delete them and
              stop contacting you. Send your request through the Contact page.
            </p>

            <h2>Changes to this policy</h2>
            <p>If we change how we handle your details, we will update this page.</p>

            <div className="pt-6">
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
