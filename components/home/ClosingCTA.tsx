"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { homeClosingCTA } from "@/lib/content";
import { Section } from "@/components/layout/Section";
import { ease } from "@/lib/motion";

const EXPO = ease.expo;

export function ClosingCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const rm = useReducedMotion();
  const animate = rm ? "visible" : (isInView ? "visible" : "hidden");

  const eyebrowV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5, ease: EXPO } } };
  const headingV = { hidden: { clipPath: "inset(0 0 100% 0)" }, visible: { clipPath: "inset(0 0 0% 0)", transition: { duration: 0.9, delay: 0.15, ease: EXPO } } };
  const ruleV    = { hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.6, delay: 0.45, ease: EXPO } } };
  const sublineV = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.6, ease: EXPO } } };
  const ctasV    = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.8, ease: EXPO } } };
  const proofV   = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4, delay: 1.1, ease: EXPO } } };

  return (
    <Section tone="stage" aria-label="Get in touch" id="final-cta" data-final-cta="true" className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
      {/* Warm stage-light treatment — gold/amber at very low opacity */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-stage-glow)" }}
      />
      <div ref={ref} className="relative container-site flex flex-col items-center text-center gap-0 z-10">

        {/* Eyebrow */}
        <motion.div
          variants={eyebrowV}
          initial="hidden"
          animate={animate}
          className="flex items-center gap-4 mb-6"
        >
          <span className="h-px w-10 bg-gold/40" />
          <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-gold-light">
            Let&apos;s build something extraordinary
          </span>
          <span className="h-px w-10 bg-gold/40" />
        </motion.div>

        {/* Headline — clip reveal */}
        <div className="overflow-hidden mb-6">
          <motion.h2
            variants={headingV}
            initial="hidden"
            animate={animate}
            className="font-display font-bold text-hero text-cream"
            style={{ lineHeight: 1.04 }}
          >
            {homeClosingCTA.headline}
          </motion.h2>
        </div>

        {/* Gold rule */}
        <motion.div
          variants={ruleV}
          initial="hidden"
          animate={animate}
          style={{ transformOrigin: "center" }}
          className="w-20 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full mb-6"
        />

        {/* Subline */}
        <motion.p
          variants={sublineV}
          initial="hidden"
          animate={animate}
          className="font-sans text-lg text-cream/65 max-w-xl whitespace-pre-line mb-8"
        >
          {homeClosingCTA.subline}
        </motion.p>

        {/* Short Form: Date, Venue, Phone */}
        <motion.div
          variants={ctasV}
          initial="hidden"
          animate={animate}
          className="w-full max-w-xl mx-auto mb-8"
        >
          <form
            action="/contact"
            method="GET"
            className="flex flex-col gap-4 bg-navy-mid/60 border border-gold/20 p-5 sm:p-7 rounded-sm backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col text-left">
                <label htmlFor="cta-date" className="font-sans text-[10px] tracking-wider uppercase text-gold-light font-semibold mb-1.5">
                  Event Date
                </label>
                <input
                  type="date"
                  id="cta-date"
                  name="date"
                  required
                  className="w-full bg-navy-deep/80 border border-gold/20 rounded-none px-3 py-2 text-xs text-cream font-sans focus:outline-none focus:border-gold min-h-[44px]"
                />
              </div>
              <div className="flex flex-col text-left">
                <label htmlFor="cta-venue" className="font-sans text-[10px] tracking-wider uppercase text-gold-light font-semibold mb-1.5">
                  Venue / City
                </label>
                <input
                  type="text"
                  id="cta-venue"
                  name="venue"
                  placeholder="e.g. Palace Grounds"
                  required
                  className="w-full bg-navy-deep/80 border border-gold/20 rounded-none px-3 py-2 text-xs text-cream font-sans placeholder:text-cream/30 focus:outline-none focus:border-gold min-h-[44px]"
                />
              </div>
              <div className="flex flex-col text-left">
                <label htmlFor="cta-phone" className="font-sans text-[10px] tracking-wider uppercase text-gold-light font-semibold mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="cta-phone"
                  name="phone"
                  placeholder="+91"
                  required
                  className="w-full bg-navy-deep/80 border border-gold/20 rounded-none px-3 py-2 text-xs text-cream font-sans placeholder:text-cream/30 focus:outline-none focus:border-gold min-h-[44px]"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="submit"
                id="closing-cta"
                className="w-full sm:w-auto flex-1 bg-gold text-navy-deep font-sans text-xs font-bold tracking-[0.15em] uppercase px-7 py-3 rounded-[2px] transition-colors duration-300 hover:bg-gold-light min-h-[44px] cursor-pointer"
              >
                {homeClosingCTA.cta}
              </button>
              <a
                href={homeClosingCTA.secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gold/40 text-cream px-6 py-3 rounded-[2px] font-sans text-xs font-semibold tracking-wider hover:bg-gold/10 hover:border-gold/70 transition-colors min-h-[44px]"
              >
                {homeClosingCTA.secondaryLabel}
              </a>
            </div>
          </form>
        </motion.div>

        {/* Proof line */}
        <motion.p
          variants={proofV}
          initial="hidden"
          animate={animate}
          className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-gold-light"
        >
          {homeClosingCTA.proof}
        </motion.p>

      </div>
    </Section>
  );
}
