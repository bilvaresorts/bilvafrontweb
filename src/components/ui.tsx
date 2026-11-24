import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { RevealLine } from "./Reveal";

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export type Tone = "paper" | "mist" | "ink";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  mist: "bg-mist text-ink",
  ink: "bg-ink text-paper",
};

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1440px] px-6 md:px-10", className)}>{children}</div>;
}

export function Section({
  tone = "paper",
  className,
  id,
  children,
  labelledBy,
}: {
  tone?: Tone;
  className?: string;
  id?: string;
  labelledBy?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn(toneClass[tone], "py-16 md:py-28", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  onDark = false,
  className,
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[11px] uppercase tracking-eyebrow md:text-xs",
        onDark ? "text-paper/70" : "text-stone",
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * The reference headline treatment: uppercase, a light phrase followed by a
 * bold phrase. `stacked` puts the bold phrase on its own line.
 */
export function Heading({
  light,
  bold,
  as: Tag = "h2",
  id,
  stacked = true,
  size = "section",
  className,
}: {
  light?: string;
  bold: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
  stacked?: boolean;
  size?: "section" | "band";
  className?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "uppercase leading-[1.02] tracking-display text-balance",
        size === "section" ? "text-[2rem] md:text-5xl" : "text-[1.75rem] md:text-4xl",
        className,
      )}
    >
      {stacked ? (
        <>
          {light ? <RevealLine className="font-light">{light}</RevealLine> : null}
          <RevealLine className="font-bold" delay={light ? 0.12 : 0}>
            {bold}
          </RevealLine>
        </>
      ) : (
        <RevealLine>
          {light ? <span className="font-light">{light} </span> : null}
          <span className="font-bold">{bold}</span>
        </RevealLine>
      )}
    </Tag>
  );
}

export type ButtonVariant = "solid-dark" | "outline-dark" | "solid-light" | "outline-light" | "whatsapp";

const buttonBase =
  "inline-flex h-12 items-center justify-center gap-2 rounded-[4px] border px-6 text-xs font-semibold uppercase tracking-button transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const buttonVariant: Record<ButtonVariant, string> = {
  "solid-dark": "border-ink bg-ink text-paper hover:border-graphite hover:bg-graphite",
  "outline-dark": "border-ink text-ink hover:bg-ink hover:text-paper",
  "solid-light": "border-paper bg-paper text-ink hover:border-white hover:bg-white",
  "outline-light": "border-paper/35 text-paper hover:border-paper hover:bg-paper hover:text-ink",
  whatsapp: "border-whatsapp bg-whatsapp text-ink hover:brightness-95",
};

export function buttonClass(variant: ButtonVariant = "solid-dark", className?: string): string {
  return cn(buttonBase, buttonVariant[variant], className);
}

export function ButtonLink({
  variant = "solid-dark",
  className,
  arrow = false,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant; arrow?: boolean }) {
  return (
    <Link className={cn(buttonClass(variant, className), "group")} {...props}>
      {children}
      {arrow ? <Arrow /> : null}
    </Link>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block transition-transform duration-300 ease-out-soft group-hover:translate-x-1",
        className,
      )}
    >
      &rarr;
    </span>
  );
}

/** Uppercase text link with an arrow that nudges on hover. */
export function ArrowLink({
  onDark = false,
  muted = false,
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { onDark?: boolean; muted?: boolean }) {
  return (
    <Link
      className={cn(
        "group inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-button transition-opacity hover:opacity-70",
        onDark ? "text-paper" : "text-ink",
        muted && (onDark ? "text-paper/60" : "text-stone"),
        className,
      )}
      {...props}
    >
      {children}
      <Arrow />
    </Link>
  );
}
