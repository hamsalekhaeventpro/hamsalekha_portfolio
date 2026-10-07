"use client";

import { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { formMessages } from "@/lib/content";
import { enquirySchema, type EnquiryFormValues } from "@/lib/form-schema";
import { Button } from "@/components/ui/Button";
import { ease } from "@/lib/motion";

function ContactFormInner() {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const rm = useReducedMotion();

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

  // Replaced oversized rounded styles with sharp editorial borders
  const inputClass = "w-full font-sans text-base text-navy-deep bg-transparent border-b border-navy-deep/20 rounded-none px-0 py-3 focus:outline-none focus:border-gold-dark transition-colors placeholder:text-text-slate/40";
  const selectClass = "w-full font-sans text-base text-navy-deep bg-transparent border-b border-navy-deep/20 rounded-none px-0 py-3 focus:outline-none focus:border-gold-dark transition-colors appearance-none cursor-pointer";
  const errorClass = "font-sans text-xs text-red-500 mt-2 block";

  const containerVars = {
    hidden: {},
    visible: {
      transition: { staggerChildren: rm ? 0 : 0.1, delayChildren: 0.2 },
    },
  };

  const itemVars = {
    hidden: { opacity: rm ? 1 : 0, y: rm ? 0 : 15 },
    visible: { opacity: 1, y: 0, transition: { duration: rm ? 0 : 0.6, ease: ease.expo } },
  };

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
      <motion.form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10" variants={containerVars} initial="hidden" animate="visible">
        
        {/* Name / Phone */}
        <motion.div variants={itemVars} className="grid sm:grid-cols-2 gap-10">
          <div className="relative group">
            <label htmlFor="name" className="font-sans text-xs uppercase tracking-widest font-bold text-navy-deep block mb-2">Your name <span className="text-gold-dark">*</span></label>
            <input id="name" {...register("name")} placeholder="Full name" className={inputClass} />
            {errors.name && <span className={errorClass}>{errors.name.message}</span>}
          </div>
          <div className="relative group">
            <label htmlFor="phone" className="font-sans text-xs uppercase tracking-widest font-bold text-navy-deep block mb-2">Phone / WhatsApp <span className="text-gold-dark">*</span></label>
            <input id="phone" {...register("phone")} type="tel" placeholder="+91" className={inputClass} />
            {errors.phone && <span className={errorClass}>{errors.phone.message}</span>}
          </div>
        </motion.div>

        {/* Email */}
        <motion.div variants={itemVars} className="relative group">
          <label htmlFor="email" className="font-sans text-xs uppercase tracking-widest font-bold text-navy-deep block mb-2">Email <span className="text-text-slate/50 font-normal">(optional)</span></label>
          <input id="email" {...register("email")} type="email" placeholder="you@example.com" className={inputClass} />
          {errors.email && <span className={errorClass}>{errors.email.message}</span>}
        </motion.div>

        {/* Client / Event Type */}
        <motion.div variants={itemVars} className="grid sm:grid-cols-2 gap-10">
          <div className="relative group">
            <label htmlFor="clientType" className="font-sans text-xs uppercase tracking-widest font-bold text-navy-deep block mb-2">I am a… <span className="text-gold-dark">*</span></label>
            <select id="clientType" {...register("clientType")} className={selectClass}>
              <option value="">Select…</option>
              {["Family", "Planner / Decorator", "Corporate / Agency", "Venue"].map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            {errors.clientType && <span className={errorClass}>{errors.clientType.message}</span>}
          </div>
          <div className="relative group">
            <label htmlFor="eventType" className="font-sans text-xs uppercase tracking-widest font-bold text-navy-deep block mb-2">Event type <span className="text-gold-dark">*</span></label>
            <select id="eventType" {...register("eventType")} className={selectClass}>
              <option value="">Select…</option>
              {["Wedding", "Reception", "Sangeet / Mehendi", "Puja", "Corporate", "Launch", "Other"].map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            {errors.eventType && <span className={errorClass}>{errors.eventType.message}</span>}
          </div>
        </motion.div>

        {/* Date / Venue */}
        <motion.div variants={itemVars} className="grid sm:grid-cols-2 gap-10">
          <div className="relative group">
            <label htmlFor="eventDate" className="font-sans text-xs uppercase tracking-widest font-bold text-navy-deep block mb-2">Event date <span className="text-gold-dark">*</span></label>
            <input id="eventDate" {...register("eventDate")} type="date" className={inputClass} />
            {errors.eventDate && <span className={errorClass}>{errors.eventDate.message}</span>}
          </div>
          <div className="relative group">
            <label htmlFor="venue" className="font-sans text-xs uppercase tracking-widest font-bold text-navy-deep block mb-2">Venue & city <span className="text-gold-dark">*</span></label>
            <input id="venue" {...register("venue")} placeholder="Venue name, city" className={inputClass} />
            {errors.venue && <span className={errorClass}>{errors.venue.message}</span>}
          </div>
        </motion.div>

        {/* Guest Count */}
        <motion.div variants={itemVars} className="relative group">
          <label htmlFor="guestCount" className="font-sans text-xs uppercase tracking-widest font-bold text-navy-deep block mb-2">Guest count <span className="text-gold-dark">*</span></label>
          <select id="guestCount" {...register("guestCount")} className={selectClass}>
            <option value="">Select…</option>
            {["Under 200", "200–500", "500–1,000", "1,000+"].map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          {errors.guestCount && <span className={errorClass}>{errors.guestCount.message}</span>}
        </motion.div>

        {/* Services */}
        <motion.div variants={itemVars}>
          <label className="font-sans text-xs uppercase tracking-widest font-bold text-navy-deep block mb-4">Services needed <span className="text-gold-dark">*</span></label>
          <div className="flex flex-wrap gap-3">
            {["Lighting", "Gensets", "Truss & Structures", "Furniture", "Decor & Props", "Signature Set", "Full Production"].map((service) => (
              <button
                type="button"
                key={service}
                onClick={() => toggleService(service)}
                className={`font-sans text-sm px-6 py-3 transition-colors duration-300 border ${
                  selectedServices.includes(service)
                    ? "bg-navy-deep text-cream border-navy-deep"
                    : "bg-transparent text-navy-deep border-navy-deep/20 hover:border-gold-dark"
                }`}
              >
                {service}
              </button>
            ))}
          </div>
          {errors.services && <span className={errorClass}>{errors.services.message}</span>}
        </motion.div>

        {/* Message */}
        <motion.div variants={itemVars} className="relative group">
          <label htmlFor="message" className="font-sans text-xs uppercase tracking-widest font-bold text-navy-deep block mb-2">Tell us more</label>
          <textarea id="message" {...register("message")} rows={4} placeholder="Theme, references, anything we should know" className={`${inputClass} resize-none border-b`} />
        </motion.div>

        {/* Honeypot */}
        <div className="absolute opacity-0 -z-10 select-none pointer-events-none" aria-hidden="true">
          <label htmlFor="honeypot">Leave this field blank</label>
          <input {...register("honeypot")} id="honeypot" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Turnstile */}
        <motion.div variants={itemVars} className="pt-2">
          <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}></div>
          {errors.turnstileToken && <span className={errorClass}>{errors.turnstileToken.message}</span>}
        </motion.div>

        {/* Submit */}
        <motion.div variants={itemVars} className="pt-4 flex items-center justify-between">
          <Button type="submit" variant="primary" size="lg" loading={submitState === "loading"} className="w-full sm:w-auto px-12" id="submit-enquiry">
            Submit Enquiry
          </Button>
        </motion.div>

        {/* Success / Error Messages */}
        <AnimatePresence mode="wait">
          {submitState === "success" && (
            <motion.div 
              initial={rm ? { opacity: 0 } : { opacity: 0, height: 0 }} 
              animate={rm ? { opacity: 1 } : { opacity: 1, height: "auto" }} 
              className="flex flex-col gap-4 bg-transparent border-l-2 border-gold-dark pl-6 py-2 mt-4"
            >
              <div className="flex items-center gap-3">
                <motion.svg 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6 text-gold-dark" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <motion.path 
                    d="M20 6L9 17l-5-5" 
                    initial={rm ? { pathLength: 1 } : { pathLength: 0 }} 
                    animate={{ pathLength: 1 }} 
                    transition={{ duration: 0.6, ease: ease.expo }}
                  />
                </motion.svg>
                <p className="font-display text-2xl font-bold text-navy-deep">Enquiry sent.</p>
              </div>
              <p className="font-sans text-text-slate">{formMessages.success}</p>
            </motion.div>
          )}
          {submitState === "error" && (
            <motion.div 
              initial={rm ? { opacity: 0 } : { opacity: 0, height: 0 }} 
              animate={rm ? { opacity: 1 } : { opacity: 1, height: "auto" }} 
              className="flex flex-col gap-2 border-l-2 border-red-500 pl-6 py-2 mt-4"
            >
              <p className="font-display text-2xl font-bold text-red-600">Something went wrong.</p>
              <p className="font-sans text-text-slate">{formMessages.error}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={<div className="h-[600px]" />}>
      <ContactFormInner />
    </Suspense>
  );
}
