"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { aboutHero } from "@/lib/content";
import { ease } from "@/lib/motion";

const EXPO = ease.expo;

export function AboutHero() {
  const rm = useReducedMotion();
  const t = rm ? 0 : 1;
  
  const lineV = {
    initial: { clipPath: "inset(0 0 100% 0)" },
    animate: { clipPath: "inset(0 0 0% 0)", transition: { duration: 0.8, ease: EXPO } }
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-end md:items-center overflow-hidden bg-navy-deep">
      {/* Background image — static, no zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={aboutHero.image}
          alt={aboutHero.imageAlt}
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover"
        />
        {/* Lights-up: black → transparent */}
        <motion.div
          className="absolute inset-0 bg-navy-deep"
          initial={{ opacity: rm ? 0 : 0.95 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        {/* Left-to-right dark overlay — text side dark, right open */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-transparent pointer-events-none" />
        {/* Bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/50 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-site pb-24 pt-32 md:pb-0 md:pt-0 w-full">
        <div className="max-w-[820px] flex flex-col gap-6">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.8 * t, ease: EXPO } }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-10 bg-gold/50 shrink-0" />
            <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-gold-light">
              {aboutHero.eyebrow}
            </span>
          </motion.div>

          {/* Main title — masked reveal */}
          <h1
            className="font-display text-hero font-bold text-cream leading-[1.05]"
            aria-label={`${aboutHero.title1} ${aboutHero.title2}`}
          >
            <span className="block overflow-hidden" aria-hidden="true">
              <motion.span
                style={{ display: "block" }}
                variants={lineV}
                initial="initial"
                animate="animate"
                transition={{ delay: 1.0 * t }}
              >
                {aboutHero.title1}
              </motion.span>
            </span>
            <span className="block overflow-hidden mt-1" aria-hidden="true">
              <motion.span
                style={{ display: "block" }}
                className="text-gold-light font-cormorant italic font-normal tracking-wide"
                variants={lineV}
                initial="initial"
                animate="animate"
                transition={{ delay: 1.2 * t }}
              >
                {aboutHero.title2}
              </motion.span>
            </span>
          </h1>

          {/* Gold hairline rule */}
          <motion.span
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1, transition: { duration: 0.6, delay: 1.4 * t, ease: EXPO } }}
            className="h-[2px] w-12 bg-gradient-to-r from-gold to-gold-light rounded-full"
          />

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 1.5 * t, ease: EXPO } }}
            className="font-sans text-lg text-cream/80 leading-relaxed max-w-xl"
          >
            {aboutHero.body}
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 2.2 * t, duration: 1 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-cream/50"
      >
        <span className="font-sans text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-cream/50 to-transparent" />
      </motion.div>
    </section>
  );
}
