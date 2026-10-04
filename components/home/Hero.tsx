"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { homeHero } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { staggerContainer, heroWord, fadeIn } from "@/lib/motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";

const words1 = homeHero.line1.split(" ");
const words2 = homeHero.line2.split(" ");

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative h-screen min-h-[640px] flex items-end md:items-center overflow-hidden bg-navy-deep"
      aria-label="Hero"
    >
      {/* Background image with subtle cinematic scale */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: shouldReduceMotion ? 1 : 1.08 }}
          transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        >
          <Image
            src={homeHero.image}
            alt={homeHero.imageAlt}
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        {/* Primary cinematic gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero-overlay)" }}
        />
        {/* Bottom vignette for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(15,38,71,0.65), transparent 70%)",
          }}
        />
        {/* Subtle blue glow */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-screen"
          style={{ background: "var(--gradient-radial-glow)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-site pb-28 pt-32 md:pb-0 md:pt-0 w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-[960px] flex flex-col gap-7"
        >
          {/* Approved eyebrow — from content.ts */}
          <motion.div variants={fadeIn} className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/50 shrink-0" />
            <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-gold-light">
              {homeHero.eyebrow}
            </span>
          </motion.div>

          {/* Headline — word-by-word animation */}
          <div className="overflow-hidden">
            <h1
              className="font-display font-bold text-cream"
              style={{
                fontSize: "clamp(2rem, 5.3vw, 4rem)",
                lineHeight: 1.05,
              }}
              aria-label={`${homeHero.line1} ${homeHero.line2}`}
            >
              {/* Line 1 — cream */}
              <span className="block" aria-hidden="true">
                {words1.map((word, i) => (
                  <span key={`w1-${i}`}>
                    <motion.span
                      variants={heroWord}
                      style={{ display: "inline-block" }}
                    >
                      {word}
                    </motion.span>
                    {i < words1.length - 1 && " "}
                  </span>
                ))}
              </span>
              {/* Line 2 — gold accent */}
              <span className="block mt-1" aria-hidden="true">
                {words2.map((word, i) => (
                  <span key={`w2-${i}`} className="text-gold-light">
                    <motion.span
                      variants={heroWord}
                      style={{ display: "inline-block" }}
                    >
                      {word}
                    </motion.span>
                    {i < words2.length - 1 && " "}
                  </span>
                ))}
              </span>
            </h1>
          </div>

          {/* Gold divider + approved body paragraph */}
          <motion.div variants={fadeIn} className="flex flex-col gap-3">
            <span className="h-px w-12 bg-gold/60" />
            <p className="font-sans text-base md:text-lg text-cream/80 leading-relaxed max-w-2xl">
              {homeHero.subline}
            </p>
          </motion.div>

          {/* CTAs — Plan Your Event + Browse the Catalogue */}
          <motion.div variants={fadeIn} className="flex flex-wrap gap-4 pt-1">
            <Button
              href={homeHero.ctaHref}
              variant="primary"
              size="lg"
              id="hero-cta"
            >
              {homeHero.cta}
            </Button>
            <a
              href={homeHero.catalogueHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-cream/40 text-cream/90 font-sans font-semibold text-base hover:border-cream/70 hover:text-cream transition-all duration-300"
            >
              {homeHero.catalogueLabel.slice(0, -2).trim()}
              <ArrowUpRight size={16} className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-cream/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center"
        >
          <ChevronDown size={14} className="text-cream/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
