"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { services } from "@/lib/content";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ease, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";

const EXPO = ease.expo;

// Helper to render service-specific motion accents over the image
function ServiceMotionAccent({ index }: { index: number }) {
  const rm = useReducedMotion();
  if (rm) return null;

  // 0: Lighting (beam sweep)
  if (index === 0) {
    return (
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent w-full h-[200%] origin-bottom-left"
        initial={{ rotate: 15, x: "-100%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
      />
    );
  }
  // 1: Power (subtle energy pulse)
  if (index === 1) {
    return (
      <motion.div
        className="absolute inset-0 bg-gold/10 mix-blend-overlay"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 0.4, 0] }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
      />
    );
  }
  // 2: Truss (structural line draw)
  if (index === 2) {
    return (
      <div className="absolute inset-0 pointer-events-none p-4 opacity-50">
        <motion.div
          className="w-full h-full border border-white/20"
          initial={{ clipPath: "inset(0 100% 100% 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0% 0)" }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1.2, ease: EXPO, delay: 0.3 }}
        />
      </div>
    );
  }
  // 5: Full Event Production (sequential choreography/pulse)
  if (index === 5) {
    return (
      <motion.div
        className="absolute inset-0 bg-navy-deep/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 0.3, 0] }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
      />
    );
  }

  // 3 & 4 (Furniture & Decor) rely on the ClipReveal wrapper alone.
  return null;
}

export function WhatWeDo() {
  return (
    <Section tone="base" aria-label="Services chapters">
      <div className="container-site flex flex-col gap-16 lg:gap-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <SectionHeading
            eyebrow="SERVICES"
            heading="The pillars of production."
            subHeading="Book one service or combine them for complete event execution."
            className="max-w-xl"
          />
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-gold-dark hover:text-gold transition-colors duration-300 shrink-0 group uppercase tracking-wider underline-draw"
          >
            View all services
            <ArrowRight size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Services Alternating List */}
        <div className="flex flex-col gap-20 lg:gap-32 mt-4">
          {services.map((s, i) => {
            const isEven = i % 2 === 0;

            return (
              <div
                key={s.title}
                className={cn(
                  "flex flex-col lg:items-center gap-8 lg:gap-16",
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2 relative group">
                  <ClipReveal direction={isEven ? "right" : "left"} dur={duration.hero}>
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image
                        src={s.image}
                        alt={s.imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <ServiceMotionAccent index={i} />
                    </div>
                  </ClipReveal>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:px-8">
                  <Reveal delay={0.2}>
                    <span
                      aria-hidden="true"
                      className="font-sans text-[0.65rem] font-bold text-gold-border tracking-[0.25em] uppercase"
                    >
                      0{i + 1}
                    </span>
                  </Reveal>
                  
                  <Reveal delay={0.3}>
                    <h3 className="font-display text-3xl lg:text-4xl font-bold text-navy-deep leading-tight">
                      {s.title}
                    </h3>
                  </Reveal>

                  <Reveal delay={0.4}>
                    <p className="font-sans text-lg text-text-slate leading-relaxed max-w-md">
                      {s.description}
                    </p>
                  </Reveal>

                  <Reveal delay={0.5}>
                    <div aria-hidden="true" className="w-12 h-[1px] bg-gold/40 my-2" />
                    <Link
                      href={s.ctaHref}
                      className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-gold-dark hover:text-gold transition-colors duration-300 tracking-wider uppercase group/btn"
                    >
                      {s.ctaLabel}
                      <ArrowRight size={15} className="transition-transform duration-300 ease-out group-hover/btn:translate-x-1" />
                    </Link>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
