"use client";

import {
  MotionConfig,
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * The site's motion toolkit. Every piece runs once, the first time it scrolls
 * into view, and all of it stands down for visitors who ask for reduced motion.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

type Direction = "up" | "left" | "right" | "none";

function offset(from: Direction) {
  if (from === "up") return { y: 32 };
  if (from === "left") return { x: -36 };
  if (from === "right") return { x: 36 };
  return {};
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fades content in and moves it into place. */
export function Reveal({
  children,
  delay = 0,
  className,
  from = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  from?: Direction;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset(from) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A group whose children arrive one after another. */
export function Stagger({
  children,
  className,
  gap = 0.12,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Tag = (as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div) as typeof motion.div;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  from = "up",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  from?: Direction;
  as?: "div" | "li";
}) {
  const Tag = (as === "li" ? motion.li : motion.div) as typeof motion.div;
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, ...offset(from) },
        show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8, ease: EASE } },
      }}
    >
      {children}
    </Tag>
  );
}

/** A rule that draws itself from left to right inside a Stagger group. */
export function StaggerLine({ className }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={cx("block origin-left", className)}
      variants={{
        hidden: { scaleX: 0 },
        show: { scaleX: 1, transition: { duration: 0.9, ease: EASE } },
      }}
    />
  );
}

/**
 * A line of headline text that rises out from behind a mask.
 * The outer span is the one watched for visibility: the inner one starts
 * fully clipped, so it could never report itself as in view.
 */
export function RevealLine({
  children,
  className,
  delay = 0,
  inline = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  inline?: boolean;
}) {
  return (
    <motion.span
      className={cx(inline ? "inline-block align-bottom" : "block", "-mb-[0.1em] overflow-hidden pb-[0.1em]")}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <motion.span
        className={cx("block", className)}
        variants={{
          hidden: { y: "110%" },
          show: { y: 0, transition: { duration: 0.95, ease: EASE, delay } },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/** An image that is unveiled from the bottom edge while it settles from a slight zoom. */
export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      <motion.div
        className="h-full w-full overflow-hidden"
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.15, ease: EASE, delay } },
        }}
      >
        <motion.div
          className="h-full w-full"
          variants={{
            hidden: { scale: 1.18 },
            show: { scale: 1, transition: { duration: 1.6, ease: EASE, delay } },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * A background layer that drifts more slowly than the page.
 * Place it inside a relatively positioned, overflow-hidden parent.
 */
export function ParallaxLayer({ children, strength = 7 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const range = reduce ? 0 : strength;
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);
  return (
    <div ref={ref} aria-hidden={false} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[10%] h-[120%]">
        {children}
      </motion.div>
    </div>
  );
}

/** Counts a figure up from zero the first time it is seen. Text without a leading number is shown as is. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const match = /^([\d,]+)(.*)$/.exec(value);
  const target = match ? Number(match[1].replace(/,/g, "")) : null;
  const suffix = match ? match[2] : "";
  const [shown, setShown] = useState<number | null>(target);

  useEffect(() => {
    if (target === null || reduce || !inView) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (latest) => setShown(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduce, target]);

  if (target === null) {
    return <span className={className}>{value}</span>;
  }
  return (
    <span ref={ref} className={className}>
      {(shown ?? target).toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
