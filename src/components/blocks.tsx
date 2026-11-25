import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { inclusions, price } from "@/lib/content";
import type { EnquiryTypeId } from "@/lib/enquiry";
import { EnquiryForm, type ExtraField } from "./EnquiryForm";
import { IMPRESSION, Photo } from "./Photo";
import { EnquireLink, PrefillButton } from "./PrefillButton";
import { CountUp, ParallaxLayer, Reveal, Stagger, StaggerItem, StaggerLine } from "./Reveal";
import { ArrowLink, ButtonLink, Container, Eyebrow, Heading, cn } from "./ui";
import { WhatsAppButton } from "./WhatsApp";

/** Sets the order in which hero lines rise into place. */
const step = (index: number) => ({ "--i": index }) as CSSProperties;

export const pad = (index: number) => String(index + 1).padStart(2, "0");

export type Fact = { value: string; label: string };

/* ------------------------------------------------------------------ */
/* Page hero                                                           */
/* ------------------------------------------------------------------ */

export function PageHero({
  eyebrow,
  light,
  bold,
  summary,
  image,
  tag,
  facts,
  compact = false,
  children,
}: {
  eyebrow: string;
  light?: string;
  bold: string;
  summary: string;
  image?: { src: string; alt: string; position?: string; note?: string };
  /** A status label above the headline, such as "Under construction". */
  tag?: string;
  facts?: Fact[];
  /** A shorter hero, for pages where the form or the text should start sooner. */
  compact?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="relative flex flex-col overflow-hidden bg-ink text-paper">
      {image ? (
        <>
          <ParallaxLayer>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              preload
              className={cn("hero-media object-cover", image.position ?? "object-center")}
            />
          </ParallaxLayer>
          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/45 to-ink/55" />
          {/* A soft shade on the text side keeps the headline crisp over bright photographs. */}
          <div aria-hidden className="absolute inset-0 bg-linear-to-r from-ink/60 via-ink/15 to-transparent" />
        </>
      ) : null}
      <Container
        className={cn(
          "relative flex flex-1 flex-col justify-end pb-14 pt-36 md:pb-20 md:pt-48",
          image && (compact ? "min-h-[56svh]" : "min-h-[78svh]"),
        )}
      >
        {tag ? (
          <p className="rise mb-5 self-start bg-paper px-3 py-1.5 text-[10px] font-semibold uppercase tracking-eyebrow text-ink" style={step(0)}>
            {tag}
          </p>
        ) : null}
        <div className="rise" style={step(0)}>
          <Eyebrow onDark>{eyebrow}</Eyebrow>
        </div>
        <h1 className="mt-5 text-[2.5rem] uppercase leading-[1] tracking-display text-balance md:text-7xl">
          {light ? (
            <span className="rise block font-light" style={step(1)}>
              {light}
            </span>
          ) : null}
          <span className="rise block font-bold" style={step(2)}>
            {bold}
          </span>
        </h1>
        <p className="rise mt-7 max-w-xl text-base leading-7 text-paper/80" style={step(3)}>
          {summary}
        </p>
        {children ? (
          <div className="rise mt-9 flex flex-wrap gap-3" style={step(4)}>
            {children}
          </div>
        ) : null}
        {image?.note ? (
          <p className="mt-8 text-[9px] uppercase tracking-eyebrow text-paper/50 md:absolute md:bottom-5 md:right-10 md:mt-0">
            {image.note}
          </p>
        ) : null}
      </Container>
      {facts ? (
        <div className="relative border-t border-paper/15 bg-ink/60 backdrop-blur-sm">
          <Container>
            <FactStrip facts={facts} onDark />
          </Container>
        </div>
      ) : null}
    </section>
  );
}

export function FactStrip({ facts, onDark = false }: { facts: Fact[]; onDark?: boolean }) {
  return (
    <Stagger
      className={cn(
        "grid grid-cols-2 gap-y-2 md:grid-cols-4 md:divide-x",
        facts.length > 4 && "lg:grid-cols-5",
        onDark ? "divide-paper/15" : "divide-rule",
      )}
      gap={0.1}
    >
      {facts.map((fact) => (
        <StaggerItem key={fact.label} className="flex flex-col-reverse py-5 md:py-6 md:pl-6 md:first:pl-0">
          <span className={cn("mt-1 text-[11px] leading-4 md:text-xs", onDark ? "text-paper/60" : "text-stone")}>
            {fact.label}
          </span>
          <CountUp value={fact.value} className="text-lg font-semibold md:text-2xl" />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ------------------------------------------------------------------ */
/* Section header                                                      */
/* ------------------------------------------------------------------ */

export function SectionHeader({
  id,
  eyebrow,
  light,
  bold,
  stacked = true,
  onDark = false,
  link,
  children,
  className,
  column = false,
}: {
  id?: string;
  eyebrow: string;
  light?: string;
  bold: string;
  stacked?: boolean;
  onDark?: boolean;
  link?: { href: string; label: string };
  /** Optional paragraph under the headline. */
  children?: ReactNode;
  className?: string;
  /** Keeps the link under the headline, for headers that sit in a narrow column. */
  column?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-6",
        !column && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div>
        <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
        <Heading id={id} light={light} bold={bold} stacked={stacked} className="mt-4" />
        {children ? (
          <div className={cn("mt-6 max-w-2xl text-base leading-7", onDark ? "text-paper/75" : "text-graphite")}>
            {children}
          </div>
        ) : null}
      </div>
      {link ? (
        <ArrowLink href={link.href} onDark={onDark}>
          {link.label}
        </ArrowLink>
      ) : null}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Villa price card and inclusions                                     */
/* ------------------------------------------------------------------ */

export function VillaCard({ detailsHref = "/villas" }: { detailsHref?: string | null }) {
  return (
    <Reveal className="group grid bg-paper lg:grid-cols-[1.75fr_1fr]">
      <Photo
        src="/images/villa-pool.jpg"
        alt="White two-bedroom villa with glazed living room and bedroom opening onto a private pool"
        sizes="(max-width: 1024px) 100vw, 64vw"
        className="aspect-[4/3] h-full w-full lg:aspect-auto lg:min-h-[560px]"
        tag="Two-bedroom pool villa"
        note={IMPRESSION}
      />
      <div className="flex flex-col p-7 md:p-10">
        <Eyebrow>Gokarna / 2 bed</Eyebrow>
        <h3 className="mt-4 text-3xl font-bold uppercase leading-none tracking-display md:text-[2.75rem]">
          Private pool villa
        </h3>
        <p className="mt-5 text-lg">
          From <strong className="font-bold">{price.fromLabel}</strong>
          <sup>*</sup>
        </p>
        <p className="mt-4 text-sm leading-6 text-graphite">
          A two-bedroom villa with its own pool, gazebo and outdoor shower, handed over with interiors.
        </p>
        <dl className="mt-7 divide-y divide-rule border-y border-rule text-sm">
          <div className="flex justify-between gap-4 py-3.5">
            <dt className="text-stone">Built-up area</dt>
            <dd className="font-semibold">2,000 sq ft</dd>
          </div>
          <div className="flex justify-between gap-4 py-3.5">
            <dt className="text-stone">Plot</dt>
            <dd className="font-semibold">40 ft &times; 80 ft</dd>
          </div>
          <div className="flex justify-between gap-4 py-3.5">
            <dt className="text-stone">Payment</dt>
            <dd className="text-right font-semibold">Four stages, linked to construction</dd>
          </div>
        </dl>
        <div className="mt-8 grid gap-3">
          {detailsHref ? (
            <ButtonLink href={detailsHref} variant="solid-dark" arrow>
              See specification and floor plan
            </ButtonLink>
          ) : null}
          <PrefillButton
            targetId="enquire"
            variant={detailsHref ? "outline-dark" : "solid-dark"}
            prefill={{ type: "villa", message: "Please send me the price list and payment schedule." }}
          >
            Get the price list
          </PrefillButton>
        </div>
        <p className="mt-6 text-[11px] leading-5 text-stone">*{price.footnote}</p>
      </div>
    </Reveal>
  );
}

export function Inclusions() {
  return (
    <Stagger className="grid gap-10 md:grid-cols-3 md:gap-12" gap={0.14}>
      {inclusions.map((group) => (
        <StaggerItem key={group.title}>
          <h3 className="text-lg font-semibold uppercase tracking-display">{group.title}</h3>
          <ul className="mt-4 divide-y divide-rule border-t border-rule text-sm text-graphite">
            {group.items.map((item) => (
              <li key={item} className="py-3">
                {item}
              </li>
            ))}
          </ul>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ------------------------------------------------------------------ */
/* Numbered sequences                                                  */
/* ------------------------------------------------------------------ */

/** Steps that arrive one after another from the left, each drawing its own length of the timeline. */
export function StepRow({
  steps,
  onDark = false,
  columns = "lg:grid-cols-6",
}: {
  steps: { title: string; text: string }[];
  onDark?: boolean;
  columns?: string;
}) {
  return (
    <Stagger as="ol" className={cn("grid gap-x-6 gap-y-10 sm:grid-cols-2", columns)} gap={0.2}>
      {steps.map((item, index) => (
        <StaggerItem as="li" key={item.title} from="left" className="relative">
          <div aria-hidden className="relative mb-6 h-px">
            <StaggerLine className={cn("absolute inset-0", onDark ? "bg-paper/25" : "bg-rule")} />
            <span
              className={cn(
                "absolute -top-[5px] left-0 h-[11px] w-[11px] rounded-full border-2",
                onDark ? "border-paper bg-ink" : "border-ink bg-mist",
              )}
            />
          </div>
          <p className={cn("text-3xl font-light leading-none", onDark ? "text-paper/45" : "text-stone")}>
            {pad(index)}
          </p>
          <h3 className="mt-4 text-base font-semibold leading-6">{item.title}</h3>
          <p className={cn("mt-2 text-sm leading-6", onDark ? "text-paper/65" : "text-graphite")}>{item.text}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** A two-column numbered list, each row arriving in turn. */
export function NumberedList({
  items,
  onDark = false,
  columns = "sm:grid-cols-2",
}: {
  items: { title: string; text: string }[];
  onDark?: boolean;
  columns?: string;
}) {
  return (
    <Stagger as="ol" className={cn("grid gap-x-10", columns)} gap={0.1}>
      {items.map((item, index) => (
        <StaggerItem
          as="li"
          key={item.title}
          className={cn("flex gap-5 border-t py-6", onDark ? "border-paper/15" : "border-rule")}
        >
          <span className={cn("pt-1 text-[11px] tabular-nums", onDark ? "text-paper/45" : "text-stone")}>
            {pad(index)}
          </span>
          <div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className={cn("mt-2 text-sm leading-6", onDark ? "text-paper/65" : "text-graphite")}>{item.text}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Stagger className="border-t border-rule" gap={0.06}>
      {items.map((item) => (
        <StaggerItem key={item.q}>
          <details className="group border-b border-rule">
            <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-base font-semibold">
              {item.q}
              <span
                aria-hidden
                className="text-2xl font-light leading-none text-stone transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="max-w-2xl pb-6 text-sm leading-6 text-graphite">{item.a}</p>
          </details>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ------------------------------------------------------------------ */
/* Next step                                                           */
/* ------------------------------------------------------------------ */

/**
 * The closing band for pages that have no form of their own. The full enquiry
 * form lives on the pages whose job it is (Home, Villas, Personalise, the
 * calculator, the Hotel and Contact); every other page ends with this instead,
 * so the same form is not repeated down the whole site.
 */
export function NextStep({
  eyebrow = "Next step",
  light,
  bold,
  text,
  image,
  primary,
  secondary,
}: {
  eyebrow?: string;
  light?: string;
  bold: string;
  text: string;
  image?: { src: string; position?: string };
  /** Opens the enquiry form on the Contact page with this subject already chosen. */
  primary: { label: string; type: EnquiryTypeId; message?: string };
  /** A second way onward, usually the page that covers the topic in full. */
  secondary?: { label: string; href: string };
}) {
  return (
    <section aria-labelledby="next-step-title" className="relative overflow-hidden bg-ink py-14 text-paper md:py-20">
      {image ? (
        <>
          <ParallaxLayer>
            <Image
              src={image.src}
              alt=""
              fill
              sizes="100vw"
              className={cn("object-cover", image.position ?? "object-center")}
            />
          </ParallaxLayer>
          <div aria-hidden className="absolute inset-0 bg-ink/75" />
        </>
      ) : null}
      <Container className="relative">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <Eyebrow onDark>{eyebrow}</Eyebrow>
            <Heading id="next-step-title" size="band" light={light} bold={bold} className="mt-4" />
            <p className="mt-5 max-w-lg text-base leading-7 text-paper/75">{text}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <EnquireLink prefill={{ type: primary.type, message: primary.message }} arrow>
              {primary.label}
            </EnquireLink>
            {secondary ? (
              <ButtonLink href={secondary.href} variant="outline-light">
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Enquiry section                                                     */
/* ------------------------------------------------------------------ */

export function EnquirySection({
  id = "enquire",
  eyebrow = "Enquire",
  light,
  bold,
  text,
  points = [],
  defaultType = "villa",
  source,
  extras,
  submitLabel,
  image,
  whatsappMessage = "Hello, I would like to know more about the villas at Bilva Resorts.",
}: {
  id?: string;
  eyebrow?: string;
  light?: string;
  bold: string;
  text: string;
  points?: string[];
  defaultType?: EnquiryTypeId;
  source: string;
  extras?: ExtraField[];
  submitLabel?: string;
  image?: { src: string; position?: string };
  whatsappMessage?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative overflow-hidden bg-ink py-16 text-paper md:py-28">
      {/* Background photograph, shown only when one has been supplied for this band. */}
      {image ? (
        <>
          <ParallaxLayer>
            <Image
              src={image.src}
              alt=""
              fill
              sizes="100vw"
              className={cn("object-cover", image.position ?? "object-center")}
            />
          </ParallaxLayer>
          <div aria-hidden className="absolute inset-0 bg-ink/80" />
        </>
      ) : null}
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <Eyebrow onDark>{eyebrow}</Eyebrow>
            <Heading id={`${id}-title`} light={light} bold={bold} className="mt-4" />
            <p className="mt-7 max-w-md text-base leading-7 text-paper/75">{text}</p>
            {points.length ? (
              <Stagger
                as="ul"
                className="mt-8 max-w-md divide-y divide-paper/15 border-y border-paper/15 text-sm text-paper/85"
                gap={0.1}
              >
                {points.map((point) => (
                  <StaggerItem as="li" key={point} className="py-3.5">
                    {point}
                  </StaggerItem>
                ))}
              </Stagger>
            ) : null}
            <WhatsAppButton message={whatsappMessage} className="mt-8" />
          </Reveal>
          <Reveal delay={0.15} from="right" className="bg-white p-6 text-ink md:p-10">
            <EnquiryForm
              variant="full"
              defaultType={defaultType}
              source={source}
              extras={extras}
              submitLabel={submitLabel}
              acceptPrefill
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
