"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { homeClosingCTA } from "@/lib/content";
import { Button } from "@/components/ui/Button";
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
    <Section tone="stage" aria-label="Get in touch">
      <div ref={ref} className="relative container-site flex flex-col items-center text-center gap-0">

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

        {/* CTAs */}
        <motion.div
          variants={ctasV}
          initial="hidden"
          animate={animate}
          className="flex flex-wrap items-center justify-center gap-5 mb-10"
        >
          <Button href={homeClosingCTA.ctaHref} variant="primary" size="lg" id="closing-cta">
            {homeClosingCTA.cta}
          </Button>
          <Button href={homeClosingCTA.secondaryHref} variant="outline" size="lg" external>
            {homeClosingCTA.secondaryLabel}
          </Button>
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
