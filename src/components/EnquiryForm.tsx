"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  budgetOptions,
  enquirySchema,
  enquiryTypes,
  toFieldErrors,
  type EnquiryTypeId,
  type FieldErrors,
} from "@/lib/enquiry";
import { PREFILL_EVENT, takePrefill, type Prefill } from "@/lib/prefill";
import { Select } from "./Select";
import { buttonClass, cn } from "./ui";

type Status = "idle" | "submitting" | "success" | "error";

export type ExtraField = {
  /** Key the answer is stored under with the enquiry. */
  name: string;
  label: string;
  type?: "text" | "number" | "date";
  placeholder?: string;
};

type Values = {
  name: string;
  phone: string;
  email: string;
  type: EnquiryTypeId;
  budget: string;
  preferredDate: string;
  message: string;
  consent: boolean;
  hp_field: string;
};

const inputClass =
  "block w-full border-0 border-b border-rule bg-transparent px-0 py-2.5 text-[15px] text-ink placeholder:text-stone/70 transition-colors focus:border-ink focus:outline-none aria-[invalid=true]:border-danger";

function Field({
  id,
  label,
  error,
  optional = false,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[10px] font-medium uppercase tracking-eyebrow text-stone">
        {label}
        {optional ? <span className="ml-2 normal-case tracking-normal text-stone/70">optional</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function EnquiryForm({
  variant = "full",
  defaultType = "villa",
  source,
  submitLabel = "Send enquiry",
  acceptPrefill = false,
  extras = [],
}: {
  variant?: "full" | "compact";
  defaultType?: EnquiryTypeId;
  source: string;
  submitLabel?: string;
  /** The form listens for values handed over by other parts of the page. */
  acceptPrefill?: boolean;
  /** Extra optional questions for one page, such as travel dates on the hotel form. */
  extras?: ExtraField[];
}) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const initial: Values = {
    name: "",
    phone: "",
    email: "",
    type: defaultType,
    budget: "",
    preferredDate: "",
    message: "",
    consent: false,
    hp_field: "",
  };
  const [values, setValues] = useState<Values>(initial);
  const [context, setContext] = useState<Record<string, string>>({});
  const [extraValues, setExtraValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  useEffect(() => {
    if (!acceptPrefill) return;
    const apply = (prefill: Prefill) => {
      setStatus("idle");
      setValues((current) => ({
        ...current,
        name: prefill.name || current.name,
        type: prefill.type ?? current.type,
        message: prefill.message ?? current.message,
      }));
      setContext(prefill.context ?? {});
    };
    const stored = takePrefill();
    if (stored) apply(stored);
    const onPrefill = (event: Event) => {
      takePrefill();
      apply((event as CustomEvent<Prefill>).detail);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, [acceptPrefill]);

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key as keyof FieldErrors]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const showBudget = variant === "full" && (values.type === "villa" || values.type === "investment");
    const showDate = variant === "full" && values.type === "site-visit";
    const answered = Object.fromEntries(
      Object.entries(extraValues)
        .map(([key, value]) => [key, value.trim()])
        .filter(([, value]) => value),
    );
    const allContext = { ...context, ...answered };
    const payload = {
      ...values,
      budget: showBudget ? values.budget : "",
      preferredDate: showDate ? values.preferredDate : "",
      source,
      context: Object.keys(allContext).length ? allContext : undefined,
    };

    const parsed = enquirySchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors = toFieldErrors(parsed.error);
      setErrors(fieldErrors);
      setStatus("idle");
      const first = Object.keys(fieldErrors)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setServerMessage("");
    setStatus("submitting");
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
        fieldErrors?: FieldErrors;
      } | null;
      if (response.ok && data?.ok) {
        setStatus("success");
        setValues({ ...initial, type: values.type });
        setContext({});
        setExtraValues({});
        return;
      }
      if (data?.fieldErrors) setErrors(data.fieldErrors);
      setServerMessage(data?.message ?? "We could not send your enquiry. Please try again.");
      setStatus("error");
    } catch {
      setServerMessage("We could not send your enquiry. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="py-6">
        <p className="text-[11px] uppercase tracking-eyebrow text-stone">Enquiry sent</p>
        <p className="mt-3 text-2xl font-bold uppercase tracking-display">Thank you.</p>
        <p className="mt-3 max-w-md text-sm leading-6 text-graphite">
          We have received your enquiry and will contact you on the number you gave us.
        </p>
        <button type="button" className={buttonClass("outline-dark", "mt-6")} onClick={() => setStatus("idle")}>
          Send another enquiry
        </button>
      </div>
    );
  }

  const full = variant === "full";
  const showBudget = full && (values.type === "villa" || values.type === "investment");
  const showDate = full && values.type === "site-visit";
  const id = (name: string) => `${uid}-${name}`;
  const describe = (name: keyof FieldErrors) => (errors[name] ? `${id(name)}-error` : undefined);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
      <Field id={id("name")} label="Full name" error={errors.name} className="sm:col-span-2">
        <input
          id={id("name")}
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={(event) => set("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describe("name")}
          className={inputClass}
        />
      </Field>

      <Field id={id("phone")} label="Phone or WhatsApp number" error={errors.phone}>
        <input
          id={id("phone")}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder="+91"
          value={values.phone}
          onChange={(event) => set("phone", event.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={describe("phone")}
          className={inputClass}
        />
      </Field>

      <Field id={id("email")} label="Email address" optional error={errors.email}>
        <input
          id={id("email")}
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => set("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describe("email")}
          className={inputClass}
        />
      </Field>

      <Field id={id("type")} label="I am enquiring about" error={errors.type} className={showBudget || showDate ? undefined : "sm:col-span-2"}>
        <Select
          id={id("type")}
          name="type"
          value={values.type}
          onChange={(value) => set("type", value as EnquiryTypeId)}
          options={enquiryTypes.map((type) => ({ value: type.id, label: type.label }))}
        />
      </Field>

      {showBudget ? (
        <Field id={id("budget")} label="Budget" optional error={errors.budget}>
          <Select
            id={id("budget")}
            name="budget"
            value={values.budget}
            onChange={(value) => set("budget", value)}
            options={budgetOptions.map((option) => ({ value: option, label: option }))}
          />
        </Field>
      ) : null}

      {full
        ? extras.map((extra) => (
            <Field key={extra.name} id={id(extra.name)} label={extra.label} optional>
              <input
                id={id(extra.name)}
                type={extra.type ?? "text"}
                inputMode={extra.type === "number" ? "numeric" : undefined}
                min={extra.type === "number" ? 1 : undefined}
                maxLength={80}
                placeholder={extra.placeholder}
                value={extraValues[extra.name] ?? ""}
                onChange={(event) =>
                  setExtraValues((current) => ({ ...current, [extra.name]: event.target.value }))
                }
                className={inputClass}
              />
            </Field>
          ))
        : null}

      {showDate ? (
        <Field id={id("preferredDate")} label="Preferred visit date" optional error={errors.preferredDate}>
          <input
            id={id("preferredDate")}
            name="preferredDate"
            type="date"
            value={values.preferredDate}
            onChange={(event) => set("preferredDate", event.target.value)}
            className={inputClass}
          />
        </Field>
      ) : null}

      {full ? (
        <Field id={id("message")} label="Message" optional error={errors.message} className="sm:col-span-2">
          {context.villaName ? (
            <p className="mt-2 inline-block bg-mist px-3 py-1.5 text-xs text-graphite">
              Villa name requested: <strong className="font-semibold text-ink">{context.villaName}</strong>
            </p>
          ) : null}
          <textarea
            id={id("message")}
            name="message"
            rows={3}
            value={values.message}
            onChange={(event) => set("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describe("message")}
            className={cn(inputClass, "resize-y")}
          />
        </Field>
      ) : null}

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id("hp")}>Leave this field empty</label>
        <input
          id={id("hp")}
          name="hp_field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.hp_field}
          onChange={(event) => set("hp_field", event.target.value)}
        />
      </div>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-graphite">
          <input
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(event) => set("consent", event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describe("consent")}
            className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
          />
          <span>I agree that Bilva Resorts may contact me about this enquiry by phone, WhatsApp or email.</span>
        </label>
        {errors.consent ? (
          <p id={`${id("consent")}-error`} className="mt-1.5 text-xs text-danger">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "submitting"} className={buttonClass("solid-dark", "w-full")}>
          {status === "submitting" ? "Sending…" : submitLabel}
        </button>
        <p aria-live="polite" className={cn("mt-3 text-xs", status === "error" ? "text-danger" : "sr-only")}>
          {status === "error" ? serverMessage : ""}
        </p>
      </div>
    </form>
  );
}
