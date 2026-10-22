"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { formMessages, microcopy } from "@/lib/content";
import { enquirySchema, type EnquiryFormValues } from "@/lib/form-schema";
import { Button } from "@/components/ui/Button";

export const AVAILABLE_SERVICES = [
  "Lighting",
  "Gensets",
  "Truss & Structures",
  "Furniture",
  "Decor & Props",
  "Signature Set",
  "Full Production",
] as const;

export type AvailableService = (typeof AVAILABLE_SERVICES)[number];

export function resolveCanonicalService(query: string | null | undefined): AvailableService | null {
  if (!query) return null;
  const normalized = query.trim().toLowerCase();
  if (!normalized) return null;

  // Exact match against available services (case-insensitive)
  const exact = AVAILABLE_SERVICES.find(
    (s) => s.toLowerCase() === normalized
  );
  if (exact) return exact;

  // Canonical mapping for aliases and URL-friendly parameters
  switch (normalized) {
    case "light":
    case "lights":
    case "lighting":
    case "ambient lighting":
    case "stage lighting":
      return "Lighting";

    case "power":
    case "genset":
    case "gensets":
    case "generator":
    case "generators":
    case "gensets & power":
    case "gensets and power":
      return "Gensets";

    case "truss":
    case "trusses":
    case "structures":
    case "structure":
    case "truss & structures":
    case "truss and structures":
    case "bombay truss":
    case "rigging":
      return "Truss & Structures";

    case "furniture":
    case "chairs":
    case "sofa":
    case "sofas":
    case "seating":
    case "lounge":
    case "premium furniture":
      return "Furniture";

    case "decor":
    case "props":
    case "decor & props":
    case "decor and props":
    case "mandap props":
    case "mandap":
      return "Decor & Props";

    case "signature set":
    case "signature sets":
    case "signature-set":
    case "signature-sets":
    case "glass house":
    case "glasshouse":
    case "glass-house":
    case "the glass house":
    case "moongate":
    case "moon gate":
    case "moon-gate":
    case "the moongate":
    case "the moon gate":
      return "Signature Set";

    case "production":
    case "full production":
    case "full-production":
    case "complete production":
    case "full event production":
    case "end to end":
      return "Full Production";

    default:
      return null;
  }
}

export function parseServicesFromParams(params: URLSearchParams): AvailableService[] {
  const result: AvailableService[] = [];
  const addService = (val: string) => {
    const canonical = resolveCanonicalService(val);
    if (canonical && !result.includes(canonical)) {
      result.push(canonical);
    }
  };

  const serviceParams = [...params.getAll("service"), ...params.getAll("services")];
  for (const raw of serviceParams) {
    const parts = raw.split(",");
    for (const part of parts) {
      addService(part);
    }
  }

  const setParam = params.get("set");
  if (setParam) {
    addService(setParam);
  }

  const briefParam = params.get("brief");
  if (briefParam === "custom") {
    addService("Full Production");
  }

  return result;
}

function UrlParamSync({ onParamsChange }: { onParamsChange: (params: URLSearchParams) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    onParamsChange(new URLSearchParams(searchParams.toString()));
  }, [searchParams, onParamsChange]);

  return null;
}

export function ContactForm() {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      services: [],
      clientType: undefined,
      eventType: undefined,
      guestCount: undefined,
    },
  });

  const watchedServices = useWatch({ control, name: "services" });
  const selectedServices = watchedServices || [];

  const toggleService = (service: string) => {
    const updated = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];
    setValue("services", updated, { shouldValidate: true });
  };

  const lastSyncedSearchRef = useRef<string | null>(null);

  const applyParams = useCallback(
    (params: URLSearchParams) => {
      const searchString = params.toString();
      // Avoid re-running and overwriting user manual selections if query string is identical
      if (lastSyncedSearchRef.current === searchString) {
        return;
      }
      lastSyncedSearchRef.current = searchString;

      // 1. Services prefill
      const matchedServices = parseServicesFromParams(params);
      if (matchedServices.length > 0) {
        setValue("services", matchedServices, { shouldValidate: true });
      }

      // 2. Set / service contextual messages
      const setParam = params.get("set")?.toLowerCase();
      const serviceValues = [...params.getAll("service"), ...params.getAll("services")].map((s) => s.toLowerCase());
      const isGlassHouse =
        setParam === "glass-house" ||
        serviceValues.some((s) => s.includes("glass"));
      const isMoonGate =
        setParam === "moongate" ||
        serviceValues.some((s) => s.includes("moon"));
      const isCustomBrief =
        params.get("brief") === "custom" ||
        serviceValues.some((s) => s.includes("custom"));

      if (isGlassHouse) {
        setValue("message", "Enquiry for The Glass House signature set.\n", { shouldDirty: true });
      } else if (isMoonGate) {
        setValue("message", "Enquiry for The MoonGate signature set.\n", { shouldDirty: true });
      } else if (isCustomBrief) {
        setValue("message", "Custom brief event enquiry.\n", { shouldDirty: true });
      }

      // 3. Type prefill (?type=warehouse-visit)
      const typeParam = params.get("type");
      if (typeParam === "warehouse-visit") {
        setValue("message", `Warehouse visit appointment request: ${microcopy.address}.\n`, { shouldDirty: true });
      }

      // 4. Direct field prefills (?name, ?phone, ?email, ?venue, ?date, ?eventType, ?guestCount, ?message, ?ref)
      const nameParam = params.get("name");
      if (nameParam) setValue("name", nameParam, { shouldValidate: true });

      const phoneParam = params.get("phone");
      if (phoneParam) setValue("phone", phoneParam, { shouldValidate: true });

      const emailParam = params.get("email");
      if (emailParam) setValue("email", emailParam, { shouldValidate: true });

      const venueParam = params.get("venue");
      if (venueParam) setValue("venue", venueParam, { shouldValidate: true });

      const dateParam = params.get("date") || params.get("eventDate");
      if (dateParam) setValue("eventDate", dateParam, { shouldValidate: true });

      const clientTypeParam = params.get("clientType") || params.get("client_type");
      if (clientTypeParam && ["Family", "Planner / Decorator", "Corporate / Agency", "Venue"].includes(clientTypeParam)) {
        setValue("clientType", clientTypeParam as EnquiryFormValues["clientType"], { shouldValidate: true });
      }

      const eventTypeParam = params.get("eventType") || params.get("event_type");
      if (eventTypeParam && ["Wedding", "Reception", "Sangeet / Mehendi", "Puja", "Corporate", "Launch", "Other"].includes(eventTypeParam)) {
        setValue("eventType", eventTypeParam as EnquiryFormValues["eventType"], { shouldValidate: true });
      }

      const guestCountParam = params.get("guestCount") || params.get("guests");
      if (guestCountParam && ["Under 200", "200–500", "500–1,000", "1,000+"].includes(guestCountParam)) {
        setValue("guestCount", guestCountParam as EnquiryFormValues["guestCount"], { shouldValidate: true });
      }

      const refParam = params.get("ref");
      const msgParam = params.get("message");
      if (refParam || msgParam) {
        const combined = [refParam ? `Reference: ${refParam}` : "", msgParam || ""].filter(Boolean).join("\n");
        setValue("message", combined, { shouldDirty: true });
      }
    },
    [setValue]
  );

  // Immediate prefill on client mount without blocking SSR
  useEffect(() => {
    if (typeof window !== "undefined") {
      applyParams(new URLSearchParams(window.location.search));
    }
  }, [applyParams]);

  const resetTurnstile = () => {
    if (typeof window !== "undefined") {
      const w = window as unknown as { turnstile?: { reset: () => void } };
      if (w.turnstile && typeof w.turnstile.reset === "function") {
        try {
          w.turnstile.reset();
        } catch {
          // ignore widget reset errors
        }
      }
    }
  };

  const onSubmit = async (data: EnquiryFormValues, e?: React.BaseSyntheticEvent) => {
    if (submitState === "loading") return;

    if (e) {
      const formData = new FormData(e.target);
      data.turnstileToken = (formData.get("cf-turnstile-response") as string) || "";
    }
    setSubmitState("loading");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit enquiry");
      setSubmitState("success");
      reset();
      resetTurnstile();
    } catch {
      setSubmitState("error");
      resetTurnstile();
    }
  };

  const inputClass =
    "w-full font-sans text-base text-navy-deep bg-transparent border-b border-navy-deep/20 rounded-none px-0 py-3 focus:outline-none focus:border-gold-dark transition-colors placeholder:text-text-slate/40";
  const selectClass =
    "w-full font-sans text-base text-navy-deep bg-transparent border-b border-navy-deep/20 rounded-none px-0 py-3 focus:outline-none focus:border-gold-dark transition-colors appearance-none cursor-pointer";
  const errorClass = "font-sans text-xs text-red-600 font-medium mt-1.5 block";

  return (
    <div className="w-full">
      <Suspense fallback={null}>
        <UrlParamSync onParamsChange={applyParams} />
      </Suspense>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />

      {/* Success Notification Banner */}
      {submitState === "success" && (
        <div
          role="status"
          aria-live="polite"
          className="p-6 mb-8 bg-gold/10 border-l-4 border-gold text-navy-deep space-y-2 rounded-r transition-opacity duration-300"
        >
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-gold-dark shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3 className="font-display text-2xl font-bold text-navy-deep">Enquiry Received</h3>
          </div>
          <p className="font-sans text-sm text-text-slate leading-relaxed">{formMessages.success}</p>
        </div>
      )}

      {/* Error Notification Banner */}
      {submitState === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-6 mb-8 bg-red-50 border-l-4 border-red-600 text-navy-deep space-y-2 rounded-r transition-opacity duration-300"
        >
          <h3 className="font-display text-2xl font-bold text-red-700">Something went wrong</h3>
          <p className="font-sans text-sm text-text-slate leading-relaxed">{formMessages.error}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        action="/api/enquiry"
        method="POST"
        className="flex flex-col gap-10"
        noValidate
      >
        {/* Name / Phone */}
        <div className="grid sm:grid-cols-2 gap-10">
          <div className="relative group">
            <label htmlFor="name" className="font-sans text-xs uppercase tracking-widest font-bold text-navy-deep block mb-2">
              Your name <span className="text-gold-dark">*</span>
            </label>
            <input
              id="name"
              {...register("name")}
              placeholder="Full name"
              required
              className={inputClass}
            />
            {errors.name && <span className={errorClass}>{errors.name.message}</span>}
          </div>

          <div className="relative group">
            <label htmlFor="phone" className="font-sans text-xs uppercase tracking-widest font-bold text-navy-deep block mb-2">
              Phone / WhatsApp <span className="text-gold-dark">*</span>
            </label>
            <input
              id="phone"
              {...register("phone")}
              type="tel"
              placeholder="+91"
              required
              className={inputClass}
            />
            {errors.phone && <span className={errorClass}>{errors.phone.message}</span>}
          </div>
        </div>

        {/* Email */}
        <div className="relative group">
          <label htmlFor="email" className="font-sans text-xs uppercase tracking-widest font-bold text-navy-deep block mb-2">
            Email <span className="text-text-slate/50 font-normal">(optional)</span>
          </label>
          <input
            id="email"
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className={inputClass}
          />
          {errors.email && <span className={errorClass}>{errors.email.message}</span>}
        </div>

        {/* Client Type / Event Type */}
        <div className="grid sm:grid-cols-2 gap-10">
          <div className="relative group">
            <label htmlFor="clientType" className="font-sans text-xs uppercase tracking-widest font-bold text-navy-deep block mb-2">
              I am a… <span className="text-gold-dark">*</span>
            </label>
            <select id="clientType" {...register("clientType")} required className={selectClass} defaultValue="">
              <option value="" disabled>Select…</option>
              {["Family", "Planner / Decorator", "Corporate / Agency", "Venue"].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            {errors.clientType && <span className={errorClass}>{errors.clientType.message}</span>}
          </div>

          <div className="relative group">
            <label htmlFor="eventType" className="font-sans text-xs uppercase tracking-widest font-bold text-navy-deep block mb-2">
              Event type <span className="text-gold-dark">*</span>
            </label>
            <select id="eventType" {...register("eventType")} required className={selectClass} defaultValue="">
              <option value="" disabled>Select…</option>
              {["Wedding", "Reception", "Sangeet / Mehendi", "Puja", "Corporate", "Launch", "Other"].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            {errors.eventType && <span className={errorClass}>{errors.eventType.message}</span>}
          </div>
        </div>

        {/* Date / Venue */}
        <div className="grid sm:grid-cols-2 gap-10">
          <div className="relative group">
            <label htmlFor="eventDate" className="font-sans text-xs uppercase tracking-widest font-bold text-navy-deep block mb-2">
              Event date <span className="text-gold-dark">*</span>
            </label>
            <input
              id="eventDate"
              {...register("eventDate")}
              type="date"
              required
              className={inputClass}
            />
            {errors.eventDate && <span className={errorClass}>{errors.eventDate.message}</span>}
          </div>

          <div className="relative group">
            <label htmlFor="venue" className="font-sans text-xs uppercase tracking-widest font-bold text-navy-deep block mb-2">
              Venue & city <span className="text-gold-dark">*</span>
            </label>
            <input
              id="venue"
              {...register("venue")}
              placeholder="Venue name, Bengaluru"
              required
              className={inputClass}
            />
            {errors.venue && <span className={errorClass}>{errors.venue.message}</span>}
          </div>
        </div>

        {/* Guest Count */}
        <div className="relative group">
          <label htmlFor="guestCount" className="font-sans text-xs uppercase tracking-widest font-bold text-navy-deep block mb-2">
            Guest count <span className="text-gold-dark">*</span>
          </label>
          <select id="guestCount" {...register("guestCount")} required className={selectClass} defaultValue="">
            <option value="" disabled>Select…</option>
            {["Under 200", "200–500", "500–1,000", "1,000+"].map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {errors.guestCount && <span className={errorClass}>{errors.guestCount.message}</span>}
        </div>

        {/* Services Needed */}
        <div>
          <label className="font-sans text-xs uppercase tracking-widest font-bold text-navy-deep block mb-4">
            Services needed <span className="text-gold-dark">*</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {AVAILABLE_SERVICES.map((service) => {
              const isSelected = selectedServices.includes(service);
              return (
                <button
                  type="button"
                  key={service}
                  onClick={() => toggleService(service)}
                  aria-pressed={isSelected}
                  className={`font-sans text-sm px-6 py-3 transition-colors duration-200 border cursor-pointer min-h-[44px] ${
                    isSelected
                      ? "bg-navy-deep text-cream border-navy-deep font-semibold"
                      : "bg-transparent text-navy-deep border-navy-deep/20 hover:border-gold-dark"
                  }`}
                >
                  {service}
                </button>
              );
            })}
          </div>
          {errors.services && <span className={errorClass}>{errors.services.message}</span>}
        </div>

        {/* Tell Us More / Message */}
        <div className="relative group">
          <label htmlFor="message" className="font-sans text-xs uppercase tracking-widest font-bold text-navy-deep block mb-2">
            Tell us more
          </label>
          <textarea
            id="message"
            {...register("message")}
            rows={4}
            placeholder="Theme, references, anything we should know"
            className={`${inputClass} resize-none border-b`}
          />
        </div>

        {/* Honeypot for spam bots */}
        <div className="absolute opacity-0 -z-10 select-none pointer-events-none" aria-hidden="true">
          <label htmlFor="honeypot">Leave this field blank</label>
          <input {...register("honeypot")} id="honeypot" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Cloudflare Turnstile */}
        <div className="pt-2">
          <div
            className="cf-turnstile"
            data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
          />
          {errors.turnstileToken && <span className={errorClass}>{errors.turnstileToken.message}</span>}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={submitState === "loading"}
            className="w-full sm:w-auto px-12 min-h-[48px]"
            id="submit-enquiry"
          >
            Submit Enquiry
          </Button>
        </div>
      </form>
    </div>
  );
}
