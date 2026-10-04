"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { aboutHero } from "@/lib/content";
import { fadeIn, fadeUp, staggerContainer } from "@/lib/motion";


export function AboutHero() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <section className="relative h-screen min-h-[600px] flex items-end md:items-center overflow-hidden bg-navy-deep">
      {/* Background image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: shouldReduceMotion ? 1 : 1.08 }}
          transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        >
          <Image
            src={aboutHero.image}
            alt={aboutHero.imageAlt}
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        {/* Left-to-right dark overlay — text side dark, right open */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-transparent" />
        {/* Bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-site pb-24 pt-32 md:pb-0 md:pt-0 w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-[820px] flex flex-col gap-6"
        >
          {/* Eyebrow — gold, clearly visible */}
          <motion.div variants={fadeIn} className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/50 shrink-0" />
            <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-gold-light">
              {aboutHero.eyebrow}
            </span>
          </motion.div>

          {/* Main title — two lines, large editorial Playfair */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-bold text-cream leading-[1.05]"
            style={{ fontSize: "clamp(2.75rem, 7vw, 6.5rem)" }}
            aria-label={`${aboutHero.title1} ${aboutHero.title2}`}
          >
            <span aria-hidden="true">
              {aboutHero.title1}
              <br />
              <span className="text-gold-light">{aboutHero.title2}</span>
            </span>
          </motion.h1>

          {/* Gold hairline rule */}
          <motion.span
            variants={fadeIn}
            className="h-[2px] w-16 bg-gradient-to-r from-gold to-gold-light rounded-full"
          />

          {/* Approved body paragraph */}
          <motion.p
            variants={fadeIn}
            className="font-sans text-base md:text-lg text-cream/80 leading-relaxed max-w-xl"
          >
            {aboutHero.body}
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-cream/50"
      >
        <span className="font-sans text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-cream/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
