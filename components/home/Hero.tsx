"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { homeHero } from "@/lib/content";
import { ArrowUpRight, ChevronDown, ArrowRight } from "lucide-react";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const rm = useReducedMotion();

  /* Image settle handled with inline props — avoids Variants type mismatch */
  /* Overlay: dark→transparent (lights up) — inline props */

  /* ─── Stagger timings ─── */
  const t = rm ? 0 : 1; // scale all delays to 0 for reduced-motion
  const eyebrowV   = { initial: { opacity: 0, y: 0 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 1.2 * t, ease: EASE_EXPO } } };
  const line1V     = { initial: { clipPath: "inset(0 0 100% 0)" }, animate: { clipPath: "inset(0 0 0% 0)", transition: { duration: 0.75, delay: 1.5 * t, ease: EASE_EXPO } } };
  const line2V     = { initial: { clipPath: "inset(0 0 100% 0)" }, animate: { clipPath: "inset(0 0 0% 0)", transition: { duration: 0.75, delay: 1.75 * t, ease: EASE_EXPO } } };
  const sublineV   = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 2.1 * t, ease: EASE_EXPO } } };
  const ctaV       = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 2.4 * t, ease: EASE_EXPO } } };
  const scrollV    = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.5, delay: 3.0 * t } } };

  return (
    <section
      className="relative min-h-svh flex items-end md:items-center overflow-hidden bg-navy-deep"
      aria-label="Hero"
    >
      {/* Background image — clip reveal */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-navy-deep">
        <div className="absolute inset-0" style={{ animation: "heroBgReveal 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
          <Image
            src={homeHero.image}
            alt={homeHero.imageAlt}
            fill
            priority
            quality={60}
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* LIGHTS-UP: navy → transparent */}
        <div className="absolute inset-0 bg-navy-deep pointer-events-none" style={{ animation: "lightsUpFade 1.4s ease-out forwards" }} aria-hidden="true" />

        {/* Persistent cinematic gradient — warm navy, not electric blue */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-hero-overlay)" }}
        />
        {/* Bottom vignette for text readability */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 110%, rgba(11,31,58,0.65), transparent 65%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-site pb-28 pt-32 md:pb-0 md:pt-0 w-full">
        <div className="max-w-[960px] flex flex-col gap-7">

          {/* Eyebrow */}
          <div className="flex items-center gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <span className="h-px w-10 bg-gold/50 shrink-0" />
            <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-gold-light">
              {homeHero.eyebrow}
            </span>
          </div>

          {/* Headline — clipped line-by-line reveal */}
          <h1
            className="font-display font-bold text-hero text-cream"
            aria-label={`${homeHero.line1} ${homeHero.line2}`}
          >
            {/* Line 1 */}
            <span className="block overflow-hidden" aria-hidden="true">
              <span className="block animate-wipe-in" style={{ animationDelay: "0.4s", clipPath: "inset(100% 0 0 0)" }}> {homeHero.line1}
              </span>
            </span>
            {/* Line 2 */}
            <span className="block overflow-hidden mt-1" aria-hidden="true">
              <span className="block animate-wipe-in" style={{ animationDelay: "0.55s", clipPath: "inset(100% 0 0 0)" }}> {homeHero.line2}
              </span>
            </span>
          </h1>

          {/* Divider + subline */}
          <div className="flex flex-col gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
            <span className="h-px w-12 bg-gold/60" />
            <p className="font-sans text-base md:text-lg text-cream/80 leading-relaxed max-w-2xl">
              {homeHero.subline}
            </p>
            </div>

            {/* CTAs */}
          <div className=" opacity-0 animate-fade-in-up" style={{ animationDelay: "0.85s" }}>
            {/* Primary CTA — Gold bg, navy text, editorial shape */}
            <a
              href={homeHero.ctaHref}
              className="group relative flex items-center justify-center gap-3 bg-gold text-navy-deep px-9 py-4 rounded-[2px] font-sans text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-300 hover:bg-gold-light min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark"
            >
              {homeHero.cta}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 ease-out group-hover:translate-x-1"
              />
            </a>

            {/* Secondary CTA — editorial text link */}
            <a
              href={homeHero.catalogueHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-cream/75 hover:text-gold-light transition-colors duration-300 font-sans text-xs font-bold tracking-[0.15em] uppercase"
            >
              {homeHero.catalogueLabel.replace("↗", "").trim()}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a></div>


        </div>
      </div>

      {/* Scroll indicator */}
      <div className=" opacity-0 animate-fade-in-up" style={{ animationDelay: "1.5s" }}>
        <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-cream/40">Scroll</span>
          <div className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center animate-bounce">
          <ChevronDown size={14} className="text-cream/40" />
        </div></div>
    </section>
  );
}
