"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react";

function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
import { contactHero, contactDetails, enquiryFields, formMessages, faqs, careersSection, microcopy, seoMap } from "@/lib/content";
import { enquirySchema, type EnquiryFormValues } from "@/lib/form-schema";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

function FAQItem({ question, answer, idx }: { question: string; answer: string; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--border)]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
        id={`faq-${idx}`}
      >
        <span className="font-display text-base font-semibold text-navy-deep pr-4">{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
          <ChevronDown size={18} className="text-gold-dark" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="font-sans text-body text-text-slate pb-5 pr-8">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

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

  const onSubmit = async (data: EnquiryFormValues) => {
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

  const inputClass = "w-full font-sans text-base text-text-navy bg-white border border-[#E7E1D0] rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-royal/40 focus:border-blue-royal transition-all placeholder:text-text-slate/50";
  const errorClass = "font-sans text-xs text-red-500 mt-1";

  return (
    <>
      {/* Hero — Figma contact.svg style */}
      <section className="pt-36 pb-24 bg-navy-deep relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(92,138,201,0.15), transparent 65%)",
          }}
        />
        <div className="container-site relative z-10">
          <RevealOnScroll className="flex flex-col gap-5 max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold/50" />
              <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-gold-light">
                {contactHero.eyebrow}
              </span>
            </div>
            <h1
              className="font-display font-bold text-cream leading-[1.03]"
              style={{ fontSize: "clamp(2.75rem, 7vw, 6rem)" }}
            >
              {contactHero.headline}
            </h1>
            <div className="w-16 h-[2px] bg-gradient-to-r from-gold to-gold-light rounded-full" />
            <p className="font-sans text-lg text-cream/70 max-w-xl">
              {contactHero.subline}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Form + Details */}
      <section className="section-py bg-bg-base">
        <div className="container-site grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <RevealOnScroll>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {/* Grid: name + phone */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-sans text-sm font-medium text-text-navy block mb-1.5">Your name <span className="text-gold-dark">*</span></label>
                    <input {...register("name")} placeholder="Full name" className={inputClass} />
                    {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="font-sans text-sm font-medium text-text-navy block mb-1.5">Phone / WhatsApp <span className="text-gold-dark">*</span></label>
                    <input {...register("phone")} type="tel" placeholder="+91" className={inputClass} />
                    {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="font-sans text-sm font-medium text-text-navy block mb-1.5">Email <span className="text-text-slate/50 font-normal">(optional)</span></label>
                  <input {...register("email")} type="email" placeholder="you@example.com" className={inputClass} />
                  {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                </div>

                {/* Client type + Event type */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-sans text-sm font-medium text-text-navy block mb-1.5">I am a… <span className="text-gold-dark">*</span></label>
                    <select {...register("clientType")} className={cn(inputClass, "appearance-none cursor-pointer")}>
                      <option value="">Select…</option>
                      {["Family", "Planner / Decorator", "Corporate / Agency", "Venue"].map((o) => <option key={o}>{o}</option>)}
                    </select>
                    {errors.clientType && <p className={errorClass}>{errors.clientType.message}</p>}
                  </div>
                  <div>
                    <label className="font-sans text-sm font-medium text-text-navy block mb-1.5">Event type <span className="text-gold-dark">*</span></label>
                    <select {...register("eventType")} className={cn(inputClass, "appearance-none cursor-pointer")}>
                      <option value="">Select…</option>
                      {["Wedding", "Reception", "Sangeet / Mehendi", "Puja", "Corporate", "Launch", "Other"].map((o) => <option key={o}>{o}</option>)}
                    </select>
                    {errors.eventType && <p className={errorClass}>{errors.eventType.message}</p>}
                  </div>
                </div>

                {/* Date + Venue */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-sans text-sm font-medium text-text-navy block mb-1.5">Event date <span className="text-gold-dark">*</span></label>
                    <input {...register("eventDate")} type="date" className={inputClass} />
                    {errors.eventDate && <p className={errorClass}>{errors.eventDate.message}</p>}
                  </div>
                  <div>
                    <label className="font-sans text-sm font-medium text-text-navy block mb-1.5">Venue & city <span className="text-gold-dark">*</span></label>
                    <input {...register("venue")} placeholder="Venue name, city" className={inputClass} />
                    {errors.venue && <p className={errorClass}>{errors.venue.message}</p>}
                  </div>
                </div>

                {/* Guest count */}
                <div>
                  <label className="font-sans text-sm font-medium text-text-navy block mb-1.5">Guest count <span className="text-gold-dark">*</span></label>
                  <select {...register("guestCount")} className={cn(inputClass, "appearance-none cursor-pointer")}>
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
                          "font-sans text-sm px-4 py-2 rounded-full border transition-all duration-200",
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
                  <label className="font-sans text-sm font-medium text-text-navy block mb-1.5">Tell us more</label>
                  <textarea {...register("message")} rows={4} placeholder="Theme, references, anything we should know" className={cn(inputClass, "resize-none")} />
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
            </RevealOnScroll>
          </div>

          {/* Contact details sidebar */}
          <div className="flex flex-col gap-6">
            <RevealOnScroll direction="right" delay={0.1} className="bg-navy-deep rounded-3xl p-8 flex flex-col gap-6 border border-gold/15">
              {/* Gold rule header */}
              <div className="border-b border-gold/20 pb-4">
                <h3 className="font-display text-xl font-bold text-cream">Reach us</h3>
              </div>
              <a href={`tel:${contactDetails.phoneRaw}`} className="flex items-center gap-3 text-cream/80 hover:text-gold-light transition-colors group">
                <Phone size={16} className="text-gold shrink-0" />
                <div>
                  <p className="font-sans text-sm font-semibold text-gold-light group-hover:text-gold transition-colors">{contactDetails.phone}</p>
                  <p className="font-sans text-xs text-cream/40">Call or WhatsApp</p>
                </div>
              </a>
              <div className="flex items-start gap-3 text-cream/80">
                <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-sans text-sm font-medium">{contactDetails.location}</p>
                  <p className="font-sans text-xs text-cream/50">{contactDetails.locationNote}</p>
                </div>
              </div>
              <a href={contactDetails.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-cream/80 hover:text-gold-light transition-colors">
                <InstagramIcon size={16} className="text-gold shrink-0" />
                <p className="font-sans text-sm font-medium">{contactDetails.instagram}</p>
              </a>
              <div className="border-t border-gold/15 pt-4">
                <p className="font-sans text-xs text-cream/40">{contactDetails.eventSupport}</p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" delay={0.2} className="bg-gold/10 border border-gold/20 rounded-3xl p-6 flex flex-col gap-3">
              <p className="font-display text-base font-semibold text-navy-deep">Prefer to chat?</p>
              <p className="font-sans text-sm text-text-slate">WhatsApp us and we'll get back to you quickly.</p>
              <a
                href={`https://wa.me/${microcopy.whatsappNumber}?text=${encodeURIComponent(microcopy.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-sans text-sm font-semibold text-gold-dark hover:text-gold transition-colors"
              >
                Open WhatsApp
                <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
              </a>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-py bg-bg-panel">
        <div className="container-site max-w-3xl flex flex-col gap-10">
          <SectionHeading eyebrow="FAQ" heading="Common questions, straight answers." />
          <div className="flex flex-col">
            {faqs.map((faq, i) => <FAQItem key={i} idx={i} question={faq.question} answer={faq.answer} />)}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="section-py bg-navy-deep">
        <div className="container-site grid lg:grid-cols-2 gap-12 items-start">
          <RevealOnScroll className="flex flex-col gap-5">
            <span className="font-sans text-[0.7rem] tracking-[0.22em] uppercase font-semibold text-gold-light">{careersSection.eyebrow}</span>
            <h2 className="font-display text-h2 font-semibold text-cream">{careersSection.headline}</h2>
            <p className="font-sans text-body text-cream/75">{careersSection.body}</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="flex flex-col gap-4">
            {careersSection.bullets.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                <p className="font-sans text-body text-cream/80">{b}</p>
              </div>
            ))}
            <a href={careersSection.ctaHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-gold-light hover:text-gold transition-colors mt-2">
              {careersSection.cta}
            </a>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
