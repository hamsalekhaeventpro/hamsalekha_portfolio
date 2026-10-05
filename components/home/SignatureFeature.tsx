"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { signatureSets } from "@/lib/content";
import { ease } from "@/lib/motion";
import { LightsUp } from "@/components/motion/LightsUp";

const EXPO = ease.expo;

/** Full-bleed glass house cinematic reveal. All text floats inside the image composition. */
export function SignatureFeature() {
  const glassHouse = signatureSets[0];
  const moongate   = signatureSets[1];

  const ghRef = useRef<HTMLDivElement>(null);
  const mgRef = useRef<HTMLDivElement>(null);
  const ghInView = useInView(ghRef, { once: true, amount: 0.2 });
  const mgInView = useInView(mgRef, { once: true, amount: 0.2 });
  const rm = useReducedMotion();

  const ghAnimate = rm ? "visible" : (ghInView ? "visible" : "hidden");
  const mgAnimate = rm ? "visible" : (mgInView ? "visible" : "hidden");

  /** Shared clip reveal for the section image frame: expands from bottom */
  const frameV = {
    hidden:  { clipPath: "inset(100% 0 0 0)" },
    visible: { clipPath: "inset(0% 0 0 0)", transition: { duration: 1.1, ease: EXPO } },
  };

  const eyebrowV = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.6, ease: EXPO } },
  };
  const titleV = {
    hidden:  { clipPath: "inset(0 0 100% 0)" },
    visible: { clipPath: "inset(0 0 0% 0)", transition: { duration: 0.85, delay: 0.75, ease: EXPO } },
  };
  const ruleV = {
    hidden:  { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.6, delay: 1.05, ease: EXPO } },
  };
  const bodyV = {
    hidden:  { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 1.2, ease: EXPO } },
  };
  const ctaV = {
    hidden:  { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: 1.4, ease: EXPO } },
  };

  // MoonGate delays are slightly faster (already past the heavy reveal)
  const mgEyebrowV = { ...eyebrowV, visible: { ...eyebrowV.visible, transition: { ...eyebrowV.visible.transition, delay: 0.5 } } };
  const mgTitleV   = { ...titleV,   visible: { ...titleV.visible,   transition: { ...titleV.visible.transition,   delay: 0.65 } } };
  const mgRuleV    = { ...ruleV,    visible: { ...ruleV.visible,    transition: { ...ruleV.visible.transition,    delay: 0.9 } } };
  const mgBodyV    = { ...bodyV,    visible: { ...bodyV.visible,    transition: { ...bodyV.visible.transition,    delay: 1.05 } } };
  const mgCtaV     = { ...ctaV,     visible: { ...ctaV.visible,     transition: { ...ctaV.visible.transition,    delay: 1.2 } } };

  const LEFT_SCRIM =
    "linear-gradient(90deg, rgba(15,38,71,0.88) 0%, rgba(15,38,71,0.65) 28%, rgba(15,38,71,0.28) 50%, transparent 68%)";

  return (
    <section aria-label="Signature Sets" className="bg-navy-deep pb-16 md:pb-24">
      {/* Section header — compact, inside navy */}
      <div className="container-site pt-16 pb-8 md:pt-24 md:pb-10 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="h-px w-8 bg-gold/50" />
          <span className="font-sans text-[0.7rem] tracking-[0.22em] uppercase font-semibold text-gold-light">
            Signature Feature
          </span>
          <span className="h-px w-8 bg-gold/50" />
        </div>
        <h2 className="font-display font-bold text-cream" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
          Sets that define the space.
        </h2>
      </div>

      {/* ── 1. Glass House — cinematic wide frame ──────────── */}
      {/* Wrapper div holds the ref so IntersectionObserver isn't broken by the child's clipPath */}
      <div ref={ghRef} className="px-4 md:px-6 w-full max-w-[1760px] mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-2xl md:rounded-[2rem] aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9]"
          variants={frameV}
          initial="hidden"
          animate={ghAnimate}
        >
          {/* Image fills the entire frame */}
          <div className="absolute inset-0">
            <Image
              src={glassHouse.image}
              alt={glassHouse.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 96vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Gradient scrims — bottom-up + left side */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/30 to-transparent" />
          <div className="absolute inset-0" style={{ background: LEFT_SCRIM }} />

          {/* Text floats inside composition, bottom-left */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-14 lg:p-20">
            <div className="max-w-2xl flex flex-col gap-4">

              {/* Eyebrow badge */}
              <motion.span
                variants={eyebrowV}
                initial="hidden"
                animate={ghAnimate}
                className="inline-flex w-fit px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 font-sans text-[0.65rem] tracking-[0.2em] uppercase text-gold-light"
              >
                NEW FOR 2026 · SIGNATURE SET
              </motion.span>

              {/* Title — clipped */}
              <div className="overflow-hidden">
                <motion.h3
                  variants={titleV}
                  initial="hidden"
                  animate={ghAnimate}
                  className="font-display font-bold text-cream"
                  style={{ fontSize: "clamp(2.75rem, 7vw, 7rem)", lineHeight: 0.95 }}
                >
                  {glassHouse.title}
                </motion.h3>
              </div>

              {/* Gold rule — scale-draws from left */}
              <motion.div
                variants={ruleV}
                initial="hidden"
                animate={ghAnimate}
                style={{ transformOrigin: "left" }}
                className="w-16 h-[2px] bg-gradient-to-r from-gold to-gold-light"
              />

              {/* Body */}
              <motion.p
                variants={bodyV}
                initial="hidden"
                animate={ghAnimate}
                className="font-sans text-base md:text-lg text-cream/80 max-w-lg leading-relaxed text-shadow-cinematic"
              >
                South India&apos;s first-of-its-kind glass theme set — a new canvas for extraordinary celebrations. A transparent venue within your venue, glowing by day and lit like a lantern by night.
              </motion.p>

              {/* CTA */}
              <motion.div variants={ctaV} initial="hidden" animate={ghAnimate} className="pt-2">
                <Link
                  href="/signature-sets"
                  className="inline-flex items-center gap-2 font-sans font-semibold text-gold-light hover:text-gold transition-colors duration-300 group/link uppercase tracking-wider text-sm text-shadow-cinematic"
                >
                  DISCOVER THE GLASS HOUSE
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>

      {/* ── 2. MoonGate ────────────────────────────────────────────── */}
      <div className="pt-12 md:pt-16 pb-4">
        {/* Wrapper div holds the ref so LightsUp isn't the only trigger context */}
        <div ref={mgRef} className="px-4 md:px-6 w-full max-w-[1400px] mx-auto">
          <motion.div
            className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/5] md:aspect-[2/1] lg:aspect-[2.5/1]"
            variants={{
              hidden:  { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO } },
            }}
            initial="hidden"
            animate={mgAnimate}
          >
            <LightsUp trigger="view">
              <Image
                src={moongate.image}
                alt={moongate.imageAlt}
                fill
                sizes="(max-width: 1024px) 96vw, 85vw"
                className="object-cover"
              />
            </LightsUp>

            {/* Gradient scrims */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/30 to-transparent" />
            <div className="absolute inset-0" style={{ background: LEFT_SCRIM }} />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16">
              <div className="max-w-xl flex flex-col gap-3">
                <motion.span
                  variants={mgEyebrowV}
                  initial="hidden"
                  animate={mgAnimate}
                  className="inline-flex w-fit px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 font-sans text-[0.65rem] tracking-[0.2em] uppercase text-gold-light"
                >
                  Signature Set
                </motion.span>

                <div className="overflow-hidden">
                  <motion.h3
                    variants={mgTitleV}
                    initial="hidden"
                    animate={mgAnimate}
                    className="font-display font-bold text-cream"
                    style={{ fontSize: "clamp(2.25rem, 5vw, 5rem)", lineHeight: 1.0 }}
                  >
                    {moongate.title}
                  </motion.h3>
                </div>

                <motion.div
                  variants={mgRuleV}
                  initial="hidden"
                  animate={mgAnimate}
                  style={{ transformOrigin: "left" }}
                  className="w-12 h-[2px] bg-gradient-to-r from-gold to-gold-light"
                />

                <motion.p
                  variants={mgBodyV}
                  initial="hidden"
                  animate={mgAnimate}
                  className="font-sans text-base md:text-lg text-cream/80 max-w-md leading-relaxed text-shadow-cinematic"
                >
                  {moongate.headline}
                </motion.p>

                <motion.div variants={mgCtaV} initial="hidden" animate={mgAnimate} className="pt-1">
                  <Link
                    href="/signature-sets"
                    className="inline-flex items-center gap-2 font-sans font-semibold text-gold-light hover:text-gold transition-colors duration-300 group/link uppercase tracking-wider text-sm text-shadow-cinematic"
                  >
                    SEE MOONGATE
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
