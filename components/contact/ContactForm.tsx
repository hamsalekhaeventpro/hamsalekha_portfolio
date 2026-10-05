"use client";

import { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { formMessages } from "@/lib/content";
import { enquirySchema, type EnquiryFormValues } from "@/lib/form-schema";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function ContactFormInner() {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const searchParams = useSearchParams();

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { services: [] },
  });

  const toggleService = (service: string) => {
    const updated = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];
    setSelectedServices(updated);
    setValue("services", updated, { shouldValidate: true });
  };

  useEffect(() => {
    const setParam = searchParams.get("set");
    if (setParam === "glass-house") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedServices((prev) => {
        if (!prev.includes("Signature Set")) {
          const next = [...prev, "Signature Set"];
          setValue("services", next, { shouldValidate: true });
          return next;
        }
        return prev;
      });
      setValue("message", "The Glass House\n", { shouldDirty: false });
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: EnquiryFormValues, e?: React.BaseSyntheticEvent) => {
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
      if (!res.ok) throw new Error("Failed");
      setSubmitState("success");
      reset();
      setSelectedServices([]);
    } catch {
      setSubmitState("error");
    }
  };

  const inputClass = "w-full font-sans text-base text-text-navy bg-white border border-[#E7E1D0] rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-royal/40 focus:border-blue-royal transition placeholder:text-text-slate/50";
  const errorClass = "font-sans text-xs text-red-500 mt-1";

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Grid: name + phone */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="font-sans text-sm font-medium text-text-navy block mb-1.5">Your name <span className="text-gold-dark">*</span></label>
            <input id="name" {...register("name")} placeholder="Full name" className={inputClass} />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="font-sans text-sm font-medium text-text-navy block mb-1.5">Phone / WhatsApp <span className="text-gold-dark">*</span></label>
            <input id="phone" {...register("phone")} type="tel" placeholder="+91" className={inputClass} />
            {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="font-sans text-sm font-medium text-text-navy block mb-1.5">Email <span className="text-text-slate/50 font-normal">(optional)</span></label>
          <input id="email" {...register("email")} type="email" placeholder="you@example.com" className={inputClass} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        {/* Client type + Event type */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="clientType" className="font-sans text-sm font-medium text-text-navy block mb-1.5">I am a… <span className="text-gold-dark">*</span></label>
            <select id="clientType" {...register("clientType")} className={cn(inputClass, "appearance-none cursor-pointer")}>
              <option value="">Select…</option>
              {["Family", "Planner / Decorator", "Corporate / Agency", "Venue"].map((o) => <option key={o}>{o}</option>)}
            </select>
            {errors.clientType && <p className={errorClass}>{errors.clientType.message}</p>}
          </div>
          <div>
            <label htmlFor="eventType" className="font-sans text-sm font-medium text-text-navy block mb-1.5">Event type <span className="text-gold-dark">*</span></label>
            <select id="eventType" {...register("eventType")} className={cn(inputClass, "appearance-none cursor-pointer")}>
              <option value="">Select…</option>
              {["Wedding", "Reception", "Sangeet / Mehendi", "Puja", "Corporate", "Launch", "Other"].map((o) => <option key={o}>{o}</option>)}
            </select>
            {errors.eventType && <p className={errorClass}>{errors.eventType.message}</p>}
          </div>
        </div>

        {/* Date + Venue */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="eventDate" className="font-sans text-sm font-medium text-text-navy block mb-1.5">Event date <span className="text-gold-dark">*</span></label>
            <input id="eventDate" {...register("eventDate")} type="date" className={inputClass} />
            {errors.eventDate && <p className={errorClass}>{errors.eventDate.message}</p>}
          </div>
          <div>
            <label htmlFor="venue" className="font-sans text-sm font-medium text-text-navy block mb-1.5">Venue & city <span className="text-gold-dark">*</span></label>
            <input id="venue" {...register("venue")} placeholder="Venue name, city" className={inputClass} />
            {errors.venue && <p className={errorClass}>{errors.venue.message}</p>}
          </div>
        </div>

        {/* Guest count */}
        <div>
          <label htmlFor="guestCount" className="font-sans text-sm font-medium text-text-navy block mb-1.5">Guest count <span className="text-gold-dark">*</span></label>
          <select id="guestCount" {...register("guestCount")} className={cn(inputClass, "appearance-none cursor-pointer")}>
            <option value="">Select…</option>
            {["Under 200", "200–500", "500–1,000", "1,000+"].map((o) => <option key={o}>{o}</option>)}
          </select>
          {errors.guestCount && <p className={errorClass}>{errors.guestCount.message}</p>}
        </div>

        {/* Services multi-select */}
        <div>
          <label className="font-sans text-sm font-medium text-text-navy block mb-2.5">Services needed <span className="text-gold-dark">*</span></label>
          <div className="flex flex-wrap gap-2">
            {["Lighting", "Gensets", "Truss & Structures", "Furniture", "Decor & Props", "Signature Set", "Full Production"].map((service) => (
              <button
                type="button"
                key={service}
                onClick={() => toggleService(service)}
                className={cn(
                  "font-sans text-sm px-4 py-2 rounded-full border transition duration-200",
                  selectedServices.includes(service)
                    ? "bg-gold text-navy-deep border-gold"
                    : "bg-transparent text-text-navy border-[var(--border)] hover:border-gold/50"
                )}
              >
                {service}
              </button>
            ))}
          </div>
          {errors.services && <p className={errorClass}>{errors.services.message}</p>}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="font-sans text-sm font-medium text-text-navy block mb-1.5">Tell us more</label>
          <textarea id="message" {...register("message")} rows={4} placeholder="Theme, references, anything we should know" className={cn(inputClass, "resize-none")} />
        </div>

        {/* Honeypot */}
        <div className="absolute opacity-0 -z-10 select-none pointer-events-none" aria-hidden="true">
          <label htmlFor="honeypot">Leave this field blank</label>
          <input {...register("honeypot")} id="honeypot" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Turnstile */}
        <div className="pt-2">
          <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}></div>
          {errors.turnstileToken && <p className={errorClass}>{errors.turnstileToken.message}</p>}
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button type="submit" variant="primary" size="lg" loading={submitState === "loading"} className="w-full sm:w-auto" id="submit-enquiry">
            Send Enquiry
          </Button>
        </div>

        {/* Success / error messages */}
        <AnimatePresence>
          {submitState === "success" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-4">
              <CheckCircle size={18} className="mt-0.5 shrink-0" />
              <p className="font-sans text-sm">{formMessages.success}</p>
            </motion.div>
          )}
          {submitState === "error" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 rounded-xl px-4 py-4">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p className="font-sans text-sm">{formMessages.error}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={<div className="h-[600px] bg-white rounded-xl" />}>
      <ContactFormInner />
    </Suspense>
  );
}
