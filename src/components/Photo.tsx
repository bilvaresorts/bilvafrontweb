import Image from "next/image";
import { ImageReveal } from "./Reveal";
import { cn } from "./ui";

/**
 * A photograph or render in the site's image treatment: unveiled on scroll,
 * with a slow zoom on hover when it sits inside a `group`.
 */
export function Photo({
  src,
  alt,
  sizes,
  className,
  position = "object-center",
  note,
  tag,
  reveal = true,
  preload = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  position?: string;
  /** Small caption in the corner, for example "Artist's impression". */
  note?: string;
  /** Label in the top-left corner. */
  tag?: string;
  reveal?: boolean;
  preload?: boolean;
}) {
  const picture = (
    <div className="relative h-full w-full overflow-hidden bg-coal">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={90}
        preload={preload}
        className={cn(
          "object-cover transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.05]",
          position,
        )}
      />
      {tag ? (
        <span className="absolute left-4 top-4 bg-ink/75 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-eyebrow text-paper">
          {tag}
        </span>
      ) : null}
      {note ? (
        <span className="absolute bottom-2 right-2 whitespace-nowrap bg-ink/65 px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-paper/85 sm:bottom-3 sm:right-3 sm:tracking-eyebrow">
          {note}
        </span>
      ) : null}
    </div>
  );
  if (!reveal) return <div className={className}>{picture}</div>;
  return <ImageReveal className={className}>{picture}</ImageReveal>;
}

export const IMPRESSION = "Artist's impression";
