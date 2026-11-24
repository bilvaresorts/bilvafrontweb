"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { nakshatras } from "@/lib/content";
import { goToEnquiry } from "./PrefillButton";
import { Select } from "./Select";
import { buttonClass } from "./ui";

const fieldClass =
  "mt-2 block w-full border-0 border-b border-paper/25 bg-transparent px-0 py-2.5 text-[15px] text-paper placeholder:text-paper/35 transition-colors focus:border-paper focus:outline-none";

/**
 * Your Villa. Your Identity.
 * A preview only: the name is confirmed by Bilva Resorts at booking.
 */
export function NameplatePreview() {
  const uid = useId();
  const [ownerName, setOwnerName] = useState("");
  const [star, setStar] = useState("Sravana");
  const villaName = `Villa ${star}`;
  const firstName = ownerName.trim().split(/\s+/)[0] ?? "";

  return (
    <div className="grid gap-10 md:grid-cols-[1fr_1.15fr] md:items-center md:gap-12">
      <div>
        <div>
          <label htmlFor={`${uid}-name`} className="block text-[10px] font-medium uppercase tracking-eyebrow text-paper/55">
            Your name
          </label>
          <input
            id={`${uid}-name`}
            type="text"
            autoComplete="given-name"
            maxLength={40}
            placeholder="Vijay"
            value={ownerName}
            onChange={(event) => setOwnerName(event.target.value)}
            className={fieldClass}
          />
        </div>
        <div className="mt-7">
          <label htmlFor={`${uid}-star`} className="block text-[10px] font-medium uppercase tracking-eyebrow text-paper/55">
            Your Nakshatram
          </label>
          <Select
            id={`${uid}-star`}
            tone="dark"
            value={star}
            onChange={setStar}
            options={nakshatras.map((name) => ({ value: name, label: name }))}
            className="mt-2"
          />
        </div>
        <button
          type="button"
          className={buttonClass("solid-light", "mt-9 w-full sm:w-auto")}
          onClick={() =>
            goToEnquiry({
              name: ownerName.trim(),
              type: "villa",
              message: `I would like to name my villa ${villaName}.`,
              context: { nakshatra: star, villaName },
            })
          }
        >
          Personalise your villa
        </button>
        <p className="mt-4 text-xs leading-5 text-paper/50">
          Not sure of your Nakshatram? Ask us and we will help. Your villa name is confirmed with you at
          booking.
        </p>
      </div>

      <figure aria-live="polite">
        {/* Bilva's own Villa Sravana nameplate image, with the live preview plate set over its lower edge. */}
        <div className="relative aspect-[4/3] overflow-hidden bg-coal">
          <Image
            src="/images/villa-living.jpg"
            alt="A bronze Villa Sravana nameplate on the wall beside the villa's glass doors"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 30vw"
            className="object-cover"
          />
          <span className="absolute right-3 top-3 bg-ink/65 px-2 py-1 text-[9px] uppercase tracking-eyebrow text-paper/85">
            Artist&rsquo;s impression
          </span>
        </div>
        <div className="relative z-10 -mt-12 ml-auto mr-4 w-[82%] border border-paper/20 bg-coal p-2.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] sm:-mt-16">
          <div className="@container flex flex-col items-center justify-center border border-paper/15 px-6 py-7 text-center">
            <span className="text-[10px] uppercase tracking-[0.6em] text-paper/60">Villa</span>
            {/* Keyed so the name re-enters on change; the text itself never waits on an animation. */}
            <span
              key={star}
              className="plate-in mt-3 block font-bold uppercase leading-[1.05] tracking-[0.12em]"
              // Sized from the plate's own width so the longest single word
              // ("BHADRAPADA", ten letters) always fits on one line.
              style={{ fontSize: "min(2.75rem, calc((100cqw - 3rem) / 8.6))" }}
            >
              {star}
            </span>
            <span aria-hidden className="mt-5 block h-px w-12 bg-paper/40" />
            <span className="mt-4 text-[9px] uppercase tracking-[0.4em] text-paper/50">
              Bilva Resorts &middot; Gokarna
            </span>
          </div>
        </div>
        <figcaption className="mt-4 text-sm text-paper/70">
          {firstName
            ? `${firstName}, this is how your villa could be named.`
            : "Villa Sravana is an example. Your own preview appears on the plate."}
        </figcaption>
      </figure>
    </div>
  );
}
