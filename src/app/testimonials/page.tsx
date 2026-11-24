import type { Metadata } from "next";
import Image from "next/image";
import { NextStep, NumberedList, PageHero, SectionHeader } from "@/components/blocks";
import { EnquireLink } from "@/components/PrefillButton";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { ArrowLink, Container, Eyebrow, Section } from "@/components/ui";
import { ILLUSTRATIVE, ref } from "@/lib/images";
import { site } from "@/lib/site";
import { reviewPrinciples, testimonials, type Testimonial } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Testimonials: Owners and Guests",
  description:
    "What villa owners and guests say about Bilva Resorts, Gokarna. Only genuine reviews are published, with the reviewer's permission.",
};

/** Layout placeholders are shown only while the site is being reviewed, never after launch. */
const showLayoutPreview = testimonials.length === 0 && !site.launched;

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden width="34" height="26" viewBox="0 0 34 26" className={className}>
      <path
        d="M0 26V15.4C0 6.6 4.5 1.5 13.5 0l1.3 3.4C10.3 4.6 8 7.3 7.8 11.6H14V26H0zm19.2 0V15.4c0-8.8 4.5-13.9 13.5-15.4L34 3.4c-4.5 1.2-6.8 3.9-7 8.2h6.2V26h-14z"
        fill="currentColor"
      />
    </svg>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  const detail = [item.role, item.place, item.date].filter(Boolean).join(" · ");
  return (
    <figure className="flex h-full flex-col bg-paper p-7 md:p-9">
      <QuoteMark className="text-ink" />
      <blockquote className="mt-6 flex-1 text-lg leading-8 text-ink">{item.quote}</blockquote>
      <figcaption className="mt-8 flex items-center gap-4 border-t border-rule pt-6">
        {item.photo ? (
          <Image
            src={item.photo}
            alt=""
            width={96}
            height={96}
            sizes="48px"
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : null}
        <div>
          <p className="text-sm font-semibold uppercase tracking-display">{item.name}</p>
          <p className="mt-1 text-xs text-stone">{detail}</p>
          {item.videoUrl ? (
            <a
              href={item.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-[11px] font-semibold uppercase tracking-button underline-offset-4 hover:underline"
            >
              Watch the video
            </a>
          ) : null}
        </div>
      </figcaption>
    </figure>
  );
}

/** Shows where a review will sit, without putting words in anyone's mouth. */
function PreviewCard({ label }: { label: string }) {
  return (
    <div className="flex h-full flex-col border border-dashed border-rule bg-paper/60 p-7 md:p-9">
      <QuoteMark className="text-rule" />
      <div aria-hidden className="mt-7 flex-1 space-y-3">
        <span className="block h-2.5 w-full bg-mist" />
        <span className="block h-2.5 w-11/12 bg-mist" />
        <span className="block h-2.5 w-4/5 bg-mist" />
        <span className="block h-2.5 w-2/3 bg-mist" />
      </div>
      <div className="mt-8 border-t border-rule pt-6">
        <p className="text-[10px] uppercase tracking-eyebrow text-stone">To be supplied</p>
        <p className="mt-1 text-sm font-medium text-graphite">{label}</p>
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  const hasReviews = testimonials.length > 0;
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        light="In their"
        bold="own words."
        image={{ ...ref.heroGardenVilla, note: ILLUSTRATIVE }}
        summary="What owners and guests say about Bilva Resorts. We publish only genuine reviews, with the reviewer's permission."
      >
        <EnquireLink prefill={{ type: "site-visit", message: "I would like to visit the site." }}>
          Visit the site
        </EnquireLink>
        <EnquireLink
          variant="outline-light"
          prefill={{ type: "general", message: "I would like to share a review of Bilva Resorts." }}
        >
          Share your review
        </EnquireLink>
      </PageHero>

      <Section tone="mist" labelledBy="stories-title">
        <Container>
          {hasReviews ? (
            <>
              <SectionHeader id="stories-title" eyebrow="Owner and guest stories" light="What people" bold="tell us." />
              <Stagger className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 xl:grid-cols-3" gap={0.12}>
                {testimonials.map((item) => (
                  <StaggerItem key={item.name + item.quote.slice(0, 24)}>
                    <TestimonialCard item={item} />
                  </StaggerItem>
                ))}
              </Stagger>
            </>
          ) : (
            <>
              <SectionHeader
                id="stories-title"
                eyebrow="Owner and guest stories"
                light="The first stories"
                bold="are on their way."
              >
                <p>
                  Bilva Resorts is under construction. As owners take their villas and guests begin to stay,
                  their reviews will be published here, each with the reviewer&rsquo;s name and permission.
                </p>
              </SectionHeader>
              {showLayoutPreview ? (
                <>
                  <Stagger className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3" gap={0.12}>
                    {["A villa owner's review", "A guest's review", "A video review"].map((label) => (
                      <StaggerItem key={label}>
                        <PreviewCard label={label} />
                      </StaggerItem>
                    ))}
                  </Stagger>
                  <p className="mt-6 max-w-3xl text-xs leading-5 text-stone">
                    These three cards show where reviews will appear. They are placeholders and are removed
                    automatically when the site is launched or the first review is added.
                  </p>
                </>
              ) : null}
            </>
          )}
        </Container>
      </Section>

      <Section tone="ink" labelledBy="principles-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeader
              id="principles-title"
              eyebrow="Our promise"
              light="Only reviews"
              bold="you can trust."
              onDark
              column
            >
              <p>No review on this site is invented, or edited to say more than the reviewer did.</p>
            </SectionHeader>
            <NumberedList items={reviewPrinciples} onDark columns="sm:grid-cols-1" />
          </div>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="judge-title">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <Reveal from="left">
              <Eyebrow>{hasReviews ? "See it yourself" : "Until then"}</Eyebrow>
              <h2 id="judge-title" className="mt-4 text-[1.75rem] uppercase leading-[1.02] tracking-display md:text-4xl">
                <span className="block font-light">Judge it</span>
                <span className="block font-bold">for yourself.</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-graphite">
                The best review is your own. Walk the site, see the model villa and ask our team anything.
              </p>
              <ArrowLink href="/villas/model-villa" className="mt-6">
                Tour the model villa
              </ArrowLink>
            </Reveal>
            <Reveal from="right" delay={0.1}>
              <Eyebrow>Owners and guests</Eyebrow>
              <h2 className="mt-4 text-[1.75rem] uppercase leading-[1.02] tracking-display md:text-4xl">
                <span className="block font-light">Tell us</span>
                <span className="block font-bold">about your stay.</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-graphite">
                If you own a villa or have stayed with us, we would like to hear from you. We will ask before
                anything you say is published.
              </p>
              <div className="mt-7">
                <EnquireLink
                  variant="outline-dark"
                  prefill={{ type: "general", message: "I would like to share a review of Bilva Resorts." }}
                  arrow
                >
                  Share your review
                </EnquireLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <NextStep
        light="Come and see"
        bold="Bilva Resorts."
        text="Choose a date that suits you and our team will show you the site and the villa."
        image={{ src: ref.bandDuskLoungers.src }}
        primary={{ label: "Schedule a site visit", type: "site-visit", message: "I would like to visit the site." }}
        secondary={{ label: "See the villas", href: "/villas" }}
      />
    </>
  );
}
