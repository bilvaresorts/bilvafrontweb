"use client";

import { useId, useState, type ReactNode } from "react";
import { calculatorDisclaimer, price, rentalIllustration } from "@/lib/content";
import { formatInr, roundTo } from "@/lib/format";
import { goToEnquiry } from "./PrefillButton";
import { buttonClass, cn } from "./ui";

/* ------------------------------------------------------------------ */
/* Model                                                               */
/* ------------------------------------------------------------------ */

const SCENARIOS = [
  { id: "conservative", label: "Conservative", occupancy: 35 },
  { id: "moderate", label: "Moderate", occupancy: 50 },
  { id: "optimistic", label: "Optimistic", occupancy: 65 },
] as const;

type ScenarioId = (typeof SCENARIOS)[number]["id"];

type Inputs = {
  price: number;
  booking: number;
  gstRate: number;
  otherCharges: number;
  rate: number;
  ownerDays: number;
  /** Null means "not entered yet": net income stays hidden until these are known. */
  commission: number | null;
  managementFee: number | null;
  monthlyExpenses: number | null;
  maintenance: number | null;
  rateGrowth: number;
  costGrowth: number;
};

const DEFAULTS: Inputs = {
  price: price.total,
  booking: price.bookingAmount,
  gstRate: 5,
  otherCharges: 0,
  rate: rentalIllustration.nightlyRate,
  ownerDays: 0,
  commission: null,
  managementFee: null,
  monthlyExpenses: null,
  maintenance: null,
  rateGrowth: 0,
  costGrowth: 0,
};

const DEFAULT_OCCUPANCY: Record<ScenarioId, number> = { conservative: 35, moderate: 50, optimistic: 65 };

export type Result = {
  bookedNights: number;
  annualGross: number;
  monthlyGross: number;
  totalCost: number;
  gst: number;
  grossYield: number;
  costsKnown: boolean;
  annualCosts: number | null;
  annualNet: number | null;
  monthlyNet: number | null;
  netYield: number | null;
  payback: number | null;
  projection: Record<3 | 5 | 10, number | null>;
};

/** The formulas from the PRD, section 12. Pure, so it can be checked by hand. */
export function calculate(inputs: Inputs, occupancy: number): Result {
  const availableNights = Math.max(0, 365 - inputs.ownerDays);
  const bookedNights = (availableNights * occupancy) / 100;
  const annualGross = bookedNights * inputs.rate;
  const gst = (inputs.price * inputs.gstRate) / 100;
  const totalCost = inputs.price + gst + inputs.otherCharges;
  const grossYield = totalCost > 0 ? annualGross / totalCost : 0;

  const costsKnown =
    inputs.commission !== null && inputs.managementFee !== null && inputs.maintenance !== null;

  if (!costsKnown) {
    return {
      bookedNights,
      annualGross,
      monthlyGross: annualGross / 12,
      totalCost,
      gst,
      grossYield,
      costsKnown,
      annualCosts: null,
      annualNet: null,
      monthlyNet: null,
      netYield: null,
      payback: null,
      projection: { 3: null, 5: null, 10: null },
    };
  }

  const variableShare = ((inputs.commission ?? 0) + (inputs.managementFee ?? 0)) / 100;
  const fixedCosts = 12 * (inputs.monthlyExpenses ?? 0) + (inputs.maintenance ?? 0);
  const annualCosts = annualGross * variableShare + fixedCosts;
  const annualNet = annualGross - annualCosts;

  const cumulative = (years: number) => {
    let total = 0;
    for (let year = 0; year < years; year += 1) {
      const gross = annualGross * (1 + inputs.rateGrowth / 100) ** year;
      const fixed = fixedCosts * (1 + inputs.costGrowth / 100) ** year;
      total += gross - gross * variableShare - fixed;
    }
    return total;
  };

  return {
    bookedNights,
    annualGross,
    monthlyGross: annualGross / 12,
    totalCost,
    gst,
    grossYield,
    costsKnown,
    annualCosts,
    annualNet,
    monthlyNet: annualNet / 12,
    netYield: totalCost > 0 ? annualNet / totalCost : 0,
    payback: annualNet > 0 ? totalCost / annualNet : null,
    projection: { 3: cumulative(3), 5: cumulative(5), 10: cumulative(10) },
  };
}

/* ------------------------------------------------------------------ */
/* Small inputs                                                        */
/* ------------------------------------------------------------------ */

type Source = "sheet" | "yours" | "example";

const sourceLabel: Record<Source, string> = {
  sheet: "From the Bilva price sheet",
  yours: "Your assumption",
  example: "Example value",
};

function SourceTag({ source }: { source: Source }) {
  return (
    <span
      className={cn(
        "inline-block border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-button",
        source === "sheet" ? "border-ink bg-ink text-paper" : "border-rule text-graphite",
      )}
    >
      {sourceLabel[source]}
    </span>
  );
}

const fieldInput =
  "block w-full border-0 border-b border-rule bg-transparent px-0 py-2 text-[15px] tabular-nums text-ink placeholder:text-stone/60 transition-colors focus:border-ink focus:outline-none";

function digits(text: string): number | null {
  const cleaned = text.replace(/[^\d.]/g, "");
  if (cleaned === "") return null;
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

function NumberField({
  label,
  source,
  value,
  onChange,
  prefix,
  suffix,
  max,
  placeholder = "Enter a value",
  hint,
  allowEmpty = false,
}: {
  label: string;
  source: Source;
  value: number | null;
  onChange: (value: number | null) => void;
  prefix?: string;
  suffix?: string;
  max?: number;
  placeholder?: string;
  hint?: string;
  allowEmpty?: boolean;
}) {
  const id = useId();
  // Keeps what was typed (such as "2.") while it still means the same number.
  const [typed, setTyped] = useState<string | null>(null);
  const formatted = value === null ? "" : prefix ? value.toLocaleString("en-IN") : String(value);
  const shown = typed !== null && !prefix && digits(typed) === value ? typed : formatted;
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <label htmlFor={id} className="text-[10px] font-medium uppercase tracking-eyebrow text-stone">
          {label}
        </label>
        <SourceTag source={source} />
      </div>
      <div className="mt-1 flex items-baseline gap-1.5">
        {prefix ? <span className="text-[15px] text-stone">{prefix}</span> : null}
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={shown}
          placeholder={placeholder}
          aria-describedby={hint ? `${id}-hint` : undefined}
          onChange={(event) => {
            setTyped(event.target.value);
            const parsed = digits(event.target.value);
            if (parsed === null) {
              onChange(allowEmpty ? null : 0);
              return;
            }
            onChange(max !== undefined ? Math.min(max, parsed) : parsed);
          }}
          className={fieldInput}
        />
        {suffix ? <span className="text-[15px] text-stone">{suffix}</span> : null}
      </div>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[11px] leading-4 text-stone">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function SliderField({
  label,
  source,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  source: Source;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <label htmlFor={id} className="text-[10px] font-medium uppercase tracking-eyebrow text-stone">
          {label}
        </label>
        <SourceTag source={source} />
      </div>
      <output htmlFor={id} className="mt-2 block text-2xl font-semibold tabular-nums">
        {format(value)}
      </output>
      <input
        id={id}
        type="range"
        className="range mt-4"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <div className="mt-2 flex justify-between text-[11px] text-stone">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="min-w-0 border-t border-rule pt-7">
      <legend className="float-left mb-6 w-full text-lg font-semibold uppercase tracking-display">{title}</legend>
      <div className="clear-both grid gap-x-10 gap-y-8 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-sm text-paper/60">{label}</dt>
      <dd className={cn("text-right tabular-nums", strong ? "text-lg font-bold" : "text-sm font-semibold")}>{value}</dd>
    </div>
  );
}

const money = (value: number | null, step = 100) => (value === null ? "Enter costs" : formatInr(roundTo(value, step)));
const percent = (value: number) => `${(value * 100).toFixed(1)}%`;

/* ------------------------------------------------------------------ */
/* Calculator                                                          */
/* ------------------------------------------------------------------ */

export function Calculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const [occupancy, setOccupancy] = useState<Record<ScenarioId, number>>(DEFAULT_OCCUPANCY);
  const [scenario, setScenario] = useState<ScenarioId>("moderate");

  const set = <K extends keyof Inputs>(key: K, value: Inputs[K]) =>
    setInputs((current) => ({ ...current, [key]: value }));

  const result = calculate(inputs, occupancy[scenario]);
  const all = SCENARIOS.map((item) => ({ ...item, result: calculate(inputs, occupancy[item.id]) }));
  const remaining = Math.max(0, inputs.price - inputs.booking);
  const availableNights = Math.max(0, 365 - inputs.ownerDays);
  const lakhRate = (occ: number) => (availableNights > 0 ? 1200000 / ((availableNights * occ) / 100) : 0);
  const scenarioLabel = SCENARIOS.find((item) => item.id === scenario)?.label ?? "";

  function reset() {
    setInputs(DEFAULTS);
    setOccupancy(DEFAULT_OCCUPANCY);
    setScenario("moderate");
  }

  function sendEstimate() {
    const context: Record<string, string> = {
      scenario: scenarioLabel,
      nightlyRate: formatInr(inputs.rate),
      occupancy: `${occupancy[scenario]}%`,
      ownerDays: String(inputs.ownerDays),
      monthlyGross: formatInr(roundTo(result.monthlyGross, 100)),
      annualGross: formatInr(roundTo(result.annualGross, 1000)),
    };
    if (result.annualNet !== null) context.annualNet = formatInr(roundTo(result.annualNet, 1000));
    goToEnquiry({
      type: "investment",
      message: "Please send me this estimate with the current price list.",
      context,
    });
  }

  return (
    <div className="grid gap-10 xl:grid-cols-[1.15fr_0.85fr] xl:gap-14">
      {/* Inputs */}
      <div className="min-w-0 space-y-10 bg-white p-6 md:p-10">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-eyebrow text-stone">Scenario</p>
          <div role="tablist" aria-label="Scenario" className="mt-3 grid gap-px bg-rule p-px sm:grid-cols-3">
            {SCENARIOS.map((item) => {
              const active = item.id === scenario;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setScenario(item.id)}
                  className={cn(
                    "h-12 min-w-0 px-2 text-[11px] font-semibold uppercase tracking-button transition-colors duration-300",
                    active ? "bg-ink text-paper" : "bg-white text-graphite hover:bg-mist",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <Group title="Rental assumptions">
          <SliderField
            label="Nightly rental rate"
            source="example"
            value={inputs.rate}
            onChange={(value) => set("rate", value)}
            min={rentalIllustration.rateMin}
            max={rentalIllustration.rateMax}
            step={rentalIllustration.rateStep}
            format={formatInr}
          />
          <SliderField
            label={`Occupancy, ${scenarioLabel.toLowerCase()}`}
            source="example"
            value={occupancy[scenario]}
            onChange={(value) => setOccupancy((current) => ({ ...current, [scenario]: value }))}
            min={0}
            max={100}
            step={1}
            format={(value) => `${value}%`}
          />
          <SliderField
            label="Days you use the villa yourself"
            source="yours"
            value={inputs.ownerDays}
            onChange={(value) => set("ownerDays", value)}
            min={0}
            max={365}
            step={1}
            format={(value) => `${value} days`}
          />
          <div className="self-end text-xs leading-5 text-stone">
            <p>
              Nights available to guests: <strong className="font-semibold text-ink">{availableNights}</strong>
            </p>
            <p>
              Nights booked a year: <strong className="font-semibold text-ink">{Math.round(result.bookedNights)}</strong>
            </p>
          </div>
        </Group>

        <Group title="Running costs">
          <NumberField
            label="Platform commission"
            source="yours"
            value={inputs.commission}
            onChange={(value) => set("commission", value)}
            suffix="% of revenue"
            max={100}
            allowEmpty
          />
          <NumberField
            label="Management fee"
            source="yours"
            value={inputs.managementFee}
            onChange={(value) => set("managementFee", value)}
            suffix="% of revenue"
            max={100}
            allowEmpty
          />
          <NumberField
            label="Monthly operating expenses"
            source="yours"
            value={inputs.monthlyExpenses}
            onChange={(value) => set("monthlyExpenses", value)}
            prefix="₹"
            allowEmpty
            hint="Electricity, internet, supplies and similar."
          />
          <NumberField
            label="Annual maintenance"
            source="yours"
            value={inputs.maintenance}
            onChange={(value) => set("maintenance", value)}
            prefix="₹"
            allowEmpty
          />
        </Group>

        <Group title="Purchase">
          <NumberField
            label="Villa purchase price"
            source="sheet"
            value={inputs.price}
            onChange={(value) => set("price", value ?? 0)}
            prefix="₹"
          />
          <NumberField
            label="Booking amount"
            source="sheet"
            value={inputs.booking}
            onChange={(value) => set("booking", value ?? 0)}
            prefix="₹"
            hint={`Remaining payment: ${formatInr(remaining)}`}
          />
          <NumberField
            label="GST"
            source="sheet"
            value={inputs.gstRate}
            onChange={(value) => set("gstRate", value ?? 0)}
            suffix="% of price"
            max={100}
            hint={`${formatInr(result.gst)} at this rate. Your cost sheet confirms the exact amount.`}
          />
          <NumberField
            label="Registration and other charges"
            source="yours"
            value={inputs.otherCharges}
            onChange={(value) => set("otherCharges", value ?? 0)}
            prefix="₹"
          />
        </Group>

        <Group title="Yearly change, optional">
          <NumberField
            label="Growth in nightly rate"
            source="yours"
            value={inputs.rateGrowth}
            onChange={(value) => set("rateGrowth", value ?? 0)}
            suffix="% a year"
            max={50}
          />
          <NumberField
            label="Growth in fixed costs"
            source="yours"
            value={inputs.costGrowth}
            onChange={(value) => set("costGrowth", value ?? 0)}
            suffix="% a year"
            max={50}
          />
        </Group>

        <button type="button" className="text-xs font-semibold uppercase tracking-button underline underline-offset-4" onClick={reset}>
          Reset to the starting values
        </button>
      </div>

      {/* Results */}
      <div className="min-w-0 xl:sticky xl:top-28 xl:self-start">
        <div className="bg-ink p-6 text-paper md:p-9" aria-live="polite">
          <p className="text-[10px] font-medium uppercase tracking-eyebrow text-paper/55">
            {scenarioLabel} scenario &middot; monthly gross revenue
          </p>
          <p className="mt-3 text-[2.75rem] font-bold leading-none tracking-tight tabular-nums md:text-6xl">
            {formatInr(roundTo(result.monthlyGross, 100))}
          </p>
          <p className="mt-3 text-xs leading-5 text-paper/55">
            Gross means before commission, fees, maintenance and taxes.
          </p>

          <dl className="mt-7 divide-y divide-paper/15 border-y border-paper/15">
            <Row label="Annual gross revenue" value={formatInr(roundTo(result.annualGross, 1000))} />
            <Row label="Annual running costs" value={money(result.annualCosts, 1000)} />
            <Row label="Annual net income" value={money(result.annualNet, 1000)} strong />
            <Row label="Monthly net income" value={money(result.monthlyNet)} />
          </dl>

          {!result.costsKnown ? (
            <p className="mt-5 border-l-2 border-paper/40 pl-4 text-xs leading-5 text-paper/75">
              Net income appears once you enter a platform commission, a management fee and annual maintenance.
              Enter 0 for any that do not apply.
            </p>
          ) : null}

          <dl className="mt-7 grid grid-cols-3 gap-4">
            <div>
              <dt className="text-[10px] uppercase tracking-eyebrow text-paper/55">Gross yield</dt>
              <dd className="mt-2 text-xl font-bold tabular-nums">{(result.grossYield * 100).toFixed(1)}%</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-eyebrow text-paper/55">Net yield</dt>
              <dd className="mt-2 text-xl font-bold tabular-nums">
                {result.netYield === null ? "—" : `${(result.netYield * 100).toFixed(1)}%`}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-eyebrow text-paper/55">Payback</dt>
              <dd className="mt-2 text-xl font-bold tabular-nums">
                {result.payback === null ? "—" : `${result.payback.toFixed(1)} yrs`}
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-[11px] leading-4 text-paper/45">
            Yields are measured against the total purchase cost of {formatInr(result.totalCost)}.
          </p>

          <h3 className="mt-8 text-[10px] font-medium uppercase tracking-eyebrow text-paper/55">
            Cumulative net income
          </h3>
          <dl className="mt-3 grid grid-cols-3 gap-px bg-paper/15">
            {([3, 5, 10] as const).map((years) => (
              <div key={years} className="bg-ink py-4 pr-2">
                <dt className="text-xs text-paper/60">{years} years</dt>
                <dd className="mt-1 text-sm font-semibold tabular-nums">
                  {result.projection[years] === null ? "—" : formatInr(roundTo(result.projection[years] ?? 0, 1000))}
                </dd>
              </div>
            ))}
          </dl>

          <button type="button" className={buttonClass("solid-light", "mt-8 w-full")} onClick={sendEstimate}>
            Send me this estimate
          </button>
        </div>

        <div className="mt-6 bg-white p-6 md:p-8">
          <h3 className="text-[10px] font-medium uppercase tracking-eyebrow text-stone">Three scenarios side by side</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead>
                <tr className="border-b border-rule text-[11px] uppercase tracking-button text-stone">
                  <th scope="col" className="py-2 pr-3 font-semibold">
                    &nbsp;
                  </th>
                  {all.map((item) => (
                    <th key={item.id} scope="col" className={cn("py-2 pr-3 font-semibold", item.id === scenario && "text-ink")}>
                      {item.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="tabular-nums">
                <tr className="border-b border-rule">
                  <th scope="row" className="py-2.5 pr-3 font-normal text-stone">
                    Occupancy
                  </th>
                  {all.map((item) => (
                    <td key={item.id} className="py-2.5 pr-3 font-semibold">
                      {occupancy[item.id]}%
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-rule">
                  <th scope="row" className="py-2.5 pr-3 font-normal text-stone">
                    Monthly gross
                  </th>
                  {all.map((item) => (
                    <td key={item.id} className="py-2.5 pr-3 font-semibold">
                      {formatInr(roundTo(item.result.monthlyGross, 100))}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-rule">
                  <th scope="row" className="py-2.5 pr-3 font-normal text-stone">
                    Annual net
                  </th>
                  {all.map((item) => (
                    <td key={item.id} className="py-2.5 pr-3 font-semibold">
                      {item.result.annualNet === null ? "—" : formatInr(roundTo(item.result.annualNet, 1000))}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="py-2.5 pr-3 font-normal text-stone">
                    Net yield
                  </th>
                  {all.map((item) => (
                    <td key={item.id} className="py-2.5 pr-3 font-semibold">
                      {item.result.netYield === null ? "—" : percent(item.result.netYield)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-8 text-[10px] font-medium uppercase tracking-eyebrow text-stone">
            What reaches ₹1 lakh a month, gross
          </h3>
          <p className="mt-3 text-sm leading-6 text-graphite">
            ₹12 lakh a year is {formatInr(roundTo(lakhRate(40), 1))} a night at 40% occupancy,{" "}
            {formatInr(roundTo(lakhRate(50), 1))} at 50%, or {formatInr(roundTo(lakhRate(60), 1))} at 60%. This is
            arithmetic, not a market rate.
          </p>
        </div>

        <p className="mt-6 text-[11px] leading-5 text-stone">{calculatorDisclaimer}</p>
      </div>
    </div>
  );
}
