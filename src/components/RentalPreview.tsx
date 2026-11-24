"use client";

import { useId, useState } from "react";
import { calculatorDisclaimer, rentalIllustration as defaults } from "@/lib/content";
import { formatInr, roundTo } from "@/lib/format";

/**
 * A two-slider preview of the full calculator. It shows gross revenue only,
 * and says so, because cost inputs have not been supplied yet.
 */
export function RentalPreview() {
  const uid = useId();
  const [rate, setRate] = useState<number>(defaults.nightlyRate);
  const [occupancy, setOccupancy] = useState<number>(defaults.occupancy);

  const bookedNights = (365 * occupancy) / 100;
  const annualGross = rate * bookedNights;
  const monthlyGross = annualGross / 12;
  const changed = rate !== defaults.nightlyRate || occupancy !== defaults.occupancy;

  return (
    <div className="bg-white p-6 md:p-10">
      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        <div className="space-y-9">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor={`${uid}-rate`} className="text-[10px] font-medium uppercase tracking-eyebrow text-stone">
                Nightly rental rate
              </label>
              <output htmlFor={`${uid}-rate`} className="text-lg font-semibold tabular-nums">
                {formatInr(rate)}
              </output>
            </div>
            <input
              id={`${uid}-rate`}
              type="range"
              className="range mt-5"
              min={defaults.rateMin}
              max={defaults.rateMax}
              step={defaults.rateStep}
              value={rate}
              onChange={(event) => setRate(Number(event.target.value))}
            />
            <div className="mt-2 flex justify-between text-[11px] text-stone">
              <span>{formatInr(defaults.rateMin)}</span>
              <span>{formatInr(defaults.rateMax)}</span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label
                htmlFor={`${uid}-occupancy`}
                className="text-[10px] font-medium uppercase tracking-eyebrow text-stone"
              >
                Occupancy
              </label>
              <output htmlFor={`${uid}-occupancy`} className="text-lg font-semibold tabular-nums">
                {occupancy}%
              </output>
            </div>
            <input
              id={`${uid}-occupancy`}
              type="range"
              className="range mt-5"
              min={defaults.occupancyMin}
              max={defaults.occupancyMax}
              step={1}
              value={occupancy}
              onChange={(event) => setOccupancy(Number(event.target.value))}
            />
            <div className="mt-2 flex justify-between text-[11px] text-stone">
              <span>{defaults.occupancyMin}%</span>
              <span>{defaults.occupancyMax}%</span>
            </div>
          </div>

          <p className="text-xs leading-5 text-stone">
            <span className="mr-2 inline-block border border-rule px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-button text-graphite">
              Example values
            </span>
            {formatInr(defaults.nightlyRate)} a night at {defaults.occupancy}% occupancy is simply the
            arithmetic that reaches about ₹1 lakh a month. It is not a market rate or a forecast.
            {changed ? (
              <button
                type="button"
                className="ml-2 font-semibold text-ink underline underline-offset-2"
                onClick={() => {
                  setRate(defaults.nightlyRate);
                  setOccupancy(defaults.occupancy);
                }}
              >
                Reset
              </button>
            ) : null}
          </p>
        </div>

        <div className="flex min-w-0 flex-col justify-between border-t border-rule pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0">
          <div aria-live="polite">
            <p className="text-[10px] font-medium uppercase tracking-eyebrow text-stone">
              Monthly gross rental revenue
            </p>
            <p className="mt-3 text-[2.5rem] font-bold leading-none tracking-tight tabular-nums xl:text-5xl 2xl:text-6xl">
              {formatInr(roundTo(monthlyGross, 100))}
            </p>
            <dl className="mt-8 divide-y divide-rule border-y border-rule text-sm">
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-stone">Annual gross revenue</dt>
                <dd className="font-semibold tabular-nums">{formatInr(roundTo(annualGross, 1000))}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-stone">Booked nights a year</dt>
                <dd className="font-semibold tabular-nums">{Math.round(bookedNights)}</dd>
              </div>
            </dl>
          </div>
          <p className="mt-6 text-xs leading-5 text-stone">
            Gross means before platform commission, management fee, maintenance and taxes. Net income is
            lower. Figures are rounded.
          </p>
        </div>
      </div>
      <p className="mt-8 border-t border-rule pt-5 text-[11px] leading-5 text-stone">{calculatorDisclaimer}</p>
    </div>
  );
}
