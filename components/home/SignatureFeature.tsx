"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { signatureSets, customSetCTA } from "@/lib/content";
import { ease, duration } from "@/lib/motion";
import { Section } from "@/components/layout/Section";

const EXPO = ease.expo;

/* =========================================================================
   DESKTOP TEXT COMPONENT (UNTOUCHED)
   ========================================================================= */
function SignatureText({ set }: { set: typeof signatureSets[0] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const rm = useReducedMotion();
  
  const v = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: duration.reveal, ease: EXPO } },
  };
  const cV = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cleanCtaLabel = set.ctaLabel.replace(/→|\u2192/g, '').trim();

  return (
    <motion.div ref={ref} variants={cV} initial="hidden" animate={rm ? "visible" : (isInView ? "visible" : "hidden")} className="flex flex-col items-start text-left max-w-lg">
      <motion.span variants={v} className="font-sans text-[0.65rem] tracking-[0.2em] uppercase font-bold text-gold-border mb-4 block">
        {set.eyebrow}
      </motion.span>
      <motion.h3 variants={v} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6 leading-tight">
        {set.title}
      </motion.h3>
      <motion.p variants={v} className="font-sans text-base text-cream/80 leading-relaxed mb-6">
        {set.body}
      </motion.p>
      
      {set.bullets && (
        <motion.ul variants={v} className="flex flex-col gap-3 mb-8">
          {set.bullets.map((b: string, i: number) => (
            <li key={i} className="flex items-start gap-3 font-sans text-sm text-cream/70">
              <span className="text-gold-light mt-0.5">✦</span>
              {b}
            </li>
          ))}
        </motion.ul>
      )}

      {set.bestFor && (
        <motion.div variants={v} className="flex flex-wrap gap-2 mb-8">
          {set.bestFor.map((b: string, i: number) => (
            <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-sans text-xs text-cream/80 uppercase tracking-widest">
              {b}
            </span>
          ))}
        </motion.div>
      )}

      <motion.div variants={v}>
        <Link
          href={set.ctaHref}
          className="inline-flex items-center gap-3 font-sans text-sm font-bold text-gold-light hover:text-gold transition-colors duration-300 uppercase tracking-widest group"
        >
          {cleanCtaLabel}
          <ArrowRight size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

function CustomCTA() {
  return (
    <div className="w-full flex flex-col items-center text-center p-8 border border-white/5 bg-white/5 backdrop-blur-sm rounded-sm">
      <h4 className="font-display text-2xl text-cream font-bold mb-4">
        {customSetCTA.headline}
      </h4>
      <p className="font-sans text-sm text-cream/70 mb-8 max-w-xl">
        {customSetCTA.body}
      </p>
      <Link
        href={customSetCTA.ctaHref}
        className="inline-flex items-center justify-center bg-gold hover:bg-gold-light text-navy-deep font-sans text-xs font-bold uppercase tracking-widest px-8 py-4 transition-colors duration-300"
      >
        {customSetCTA.ctaLabel}
      </Link>
    </div>
  );
}

function MobileCustomCTA() {
  return (
    <div className="w-full max-w-none flex flex-col items-start text-left p-6 sm:p-8 border border-white/5 bg-white/5 backdrop-blur-sm rounded-sm">
      <h4 className="font-display text-2xl text-cream font-bold mb-3 text-left">
        {customSetCTA.headline}
      </h4>
      <p className="font-sans text-sm text-cream/70 mb-6 max-w-xl text-left leading-relaxed">
        {customSetCTA.body}
      </p>
      <Link
        href={customSetCTA.ctaHref}
        className="inline-flex items-center justify-center bg-gold hover:bg-gold-light text-navy-deep font-sans text-xs font-bold uppercase tracking-widest px-6 py-3.5 transition-colors duration-300 text-center"
      >
        {customSetCTA.ctaLabel}
      </Link>
    </div>
  );
}

/* =========================================================================
   MOBILE SIGNATURE SEQUENCE: DESKTOP-MIRROR STICKY OVERLAP CHOREOGRAPHY
   ========================================================================= */
function MobileSignatureSequence() {
  const glassHouse = signatureSets[0];
  const moongate = signatureSets[1];

  return (
    <div className="signature-mobile-section relative w-full pb-16 lg:hidden">
      {/* ================= 1. GLASS HOUSE (STICKY PRIMARY) ================= */}
      <div className="gh-stage w-full sticky top-[72px] z-0 bg-navy-deep pb-8 px-5 motion-reduce:static motion-reduce:top-auto">
        <article className="signature-mobile-card glass-house w-full rounded-2xl overflow-hidden bg-[#0C223F] border border-gold/25 shadow-2xl">
          <div className="signature-card-inner flex flex-col p-5 sm:p-6">
            
            {/* Glass House Image */}
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/10 mb-5">
              <Image
                src={glassHouse.image}
                alt={glassHouse.imageAlt}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-navy-deep/15 pointer-events-none" />
            </div>

            {/* Glass House Content Panel */}
            <div className="signature-card-content flex flex-col items-start text-left">
              <span className="font-sans text-[0.65rem] tracking-[0.25em] uppercase font-bold text-gold-border mb-2 block">
                Signature Set 01
              </span>
              <h3 className="font-display text-3xl font-bold text-cream mb-3 leading-tight">
                {glassHouse.title}
              </h3>
              <p className="font-sans text-sm text-cream/75 leading-relaxed mb-5">
                A walk-in glass structure set inside your venue or on an open lawn. By day it fills with natural light. By night it glows like a lantern, lit from within and visible from every corner of the event.
              </p>
              <Link
                href="/signature-sets#glass-house"
                className="inline-flex items-center gap-2.5 font-sans text-xs font-bold text-gold-light hover:text-gold uppercase tracking-widest min-h-[44px] group"
              >
                <span>View set</span>
                <ArrowRight size={14} className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </Link>
            </div>

          </div>
        </article>
      </div>

      {/* ================= 2. MOONGATE (NORMAL DOCUMENT FLOW, RISING OVER GLASS HOUSE) ================= */}
      <div className="mg-stage w-full relative z-10 bg-navy-deep pt-6 pb-12 px-5 shadow-[0_-40px_80px_rgba(11,31,58,1)]">
        <article className="signature-mobile-card moongate w-full rounded-2xl overflow-hidden bg-[#0d2647] border border-gold/30 shadow-2xl">
          <div className="signature-card-inner flex flex-col p-5 sm:p-6">
            
            {/* MoonGate Circular Image */}
            <div className="w-full flex justify-center mb-5">
              <div className="w-[170px] h-[170px] relative rounded-full overflow-hidden border border-gold/35 shadow-xl">
                <Image
                  src={moongate.image}
                  alt={moongate.imageAlt || "MoonGate"}
                  fill
                  sizes="60vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(11,31,58,0.7)] rounded-full pointer-events-none" />
              </div>
            </div>

            {/* MoonGate Content Panel */}
            <div className="signature-card-content flex flex-col items-start text-left">
              <span className="font-sans text-[0.65rem] tracking-[0.25em] uppercase font-bold text-gold-border mb-2 block">
                Signature Set 02
              </span>
              <h3 className="font-display text-3xl font-bold text-cream mb-3 leading-tight">
                {moongate.title}
              </h3>
              <p className="font-sans text-sm text-cream/75 leading-relaxed mb-5">
                Our circular arch set: a full-moon frame for entries, stages and photo moments. It turns a walkway into a threshold and gives every guest the photograph they came for.
              </p>
              <Link
                href="/signature-sets#moongate"
                className="inline-flex items-center gap-2.5 font-sans text-xs font-bold text-gold-light hover:text-gold uppercase tracking-widest min-h-[44px] group"
              >
                <span>View set</span>
                <ArrowRight size={14} className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </Link>
            </div>

          </div>
        </article>

        {/* ================= 3. BESPOKE CUSTOM SETS CTA (IMMEDIATELY FOLLOWS) ================= */}
        <div className="w-full mt-8">
          <MobileCustomCTA />
        </div>
      </div>
    </div>
  );
}

export function SignatureFeature() {
  const glassHouse = signatureSets[0];
  const moongate = signatureSets[1];
  const rm = useReducedMotion();

  // Desktop Refs
  const ghRefD = useRef(null);
  const ghInViewD = useInView(ghRefD, { once: true, margin: "0px 0px -10% 0px" });

  const mgRefD = useRef(null);
  const mgInViewD = useInView(mgRefD, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <Section tone="stage" aria-label="Signature Sets" className="overflow-visible pb-0">
      
      {/* Intro */}
      <div className="container-site mb-16 lg:mb-24 text-center">
        <h2 className="font-display text-4xl md:text-5xl lg:text-7xl text-cream font-bold leading-tight">
          Sets that define<br/>
          <span className="italic text-gold-light font-medium pr-2 relative inline-block">
            the space.
            <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          </span>
        </h2>
      </div>

      {/* ================= DESKTOP (>=1024px) (UNTOUCHED) ================= */}
      <div className="relative w-full pb-32 hidden lg:block">
        {/* Glass House - Primary (Sticky on Desktop) */}
        <div className="w-full lg:sticky lg:top-24 z-0 bg-navy-deep pb-16 lg:pb-32">
          <div className="container-site flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Image */}
            <div className="w-full lg:w-[60%] flex-shrink-0" ref={ghRefD}>
              <motion.div 
                className="relative w-full aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-sm group"
                initial={rm ? {} : { clipPath: "inset(5% 5% 5% 5%)" }}
                animate={rm ? {} : (ghInViewD ? { clipPath: "inset(0% 0% 0% 0%)" } : { clipPath: "inset(5% 5% 5% 5%)" })}
                transition={{ duration: 1.2, ease: EXPO }}
              >
                <Image
                  src={glassHouse.image}
                  alt={glassHouse.imageAlt}
                  fill
                  sizes="60vw"
                  className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.03]"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold-light/20 to-transparent w-[200%] h-[200%] origin-bottom-left mix-blend-overlay"
                  initial={{ x: "-100%", y: "100%" }}
                  animate={ghInViewD ? { x: "100%", y: "-100%" } : { x: "-100%", y: "100%" }}
                  transition={{ duration: 2.5, ease: EXPO, delay: 0.5 }}
                />
              </motion.div>
            </div>
            
            {/* Text */}
            <div className="w-full lg:w-[40%] flex justify-center lg:justify-start">
              <SignatureText set={glassHouse} />
            </div>
          </div>
        </div>

        {/* MoonGate - Secondary (Overlaps Glass House on Scroll) */}
        <div className="w-full relative z-10 bg-navy-deep lg:mt-[10vh] pt-16 lg:pt-32 lg:shadow-[0_-40px_80px_rgba(11,31,58,1)]">
          <div className="container-site flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            {/* Image */}
            <div className="w-full lg:w-[50%] flex justify-center" ref={mgRefD}>
              <motion.div 
                className="relative w-[85%] md:w-[70%] lg:w-[85%] aspect-square rounded-full overflow-hidden group border-[1px] border-gold/15"
                initial={rm ? {} : { clipPath: "circle(0% at 50% 50%)", opacity: 0, scale: 0.95 }}
                animate={rm ? {} : (mgInViewD ? { clipPath: "circle(100% at 50% 50%)", opacity: 1, scale: 1 } : { clipPath: "circle(0% at 50% 50%)", opacity: 0, scale: 0.95 })}
                transition={{ duration: 1.5, ease: EXPO }}
              >
                <Image
                  src={moongate.image}
                  alt={moongate.imageAlt || "MoonGate Signature Set"}
                  fill
                  sizes="40vw"
                  className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(11,31,58,0.7)] pointer-events-none rounded-full" />
                <motion.div
                  className="absolute inset-0 bg-gold-light/10 mix-blend-overlay rounded-full"
                  initial={{ opacity: 0 }}
                  animate={mgInViewD ? { opacity: [0, 0.3, 0] } : { opacity: 0 }}
                  transition={{ duration: 2, ease: EXPO, delay: 0.8 }}
                />
              </motion.div>
            </div>

            {/* Text */}
            <div className="w-full lg:w-[50%] flex justify-center lg:justify-end">
              <SignatureText set={moongate} />
            </div>
          </div>

          {/* Custom Sets CTA */}
          <div className="container-site mt-24 lg:mt-32">
             <CustomCTA />
          </div>
        </div>
      </div>

      {/* ================= MOBILE (<1024px) (IMAGE + TEXT MOVE AS ONE UNIT) ================= */}
      <MobileSignatureSequence />

    </Section>
  );
}
