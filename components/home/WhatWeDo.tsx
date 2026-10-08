"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/content";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ServiceTicker } from "./ServiceTicker";
import { TrussMotionAccent } from "./TrussMotionAccent";

const EXPO = ease.expo;

// Helper to render service-specific motion accents over the image
function ServiceMotionAccent({ index }: { index: number }) {
  const rm = useReducedMotion();
  if (rm) return null;

  // 0: Lighting (beam sweep)
  if (index === 0) {
    return (
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold-light/20 to-transparent w-full h-[200%] origin-bottom-left"
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
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
      />
    );
  }
  // 2: Truss (structural line draw)
  if (index === 2) {
    return <TrussMotionAccent />;
  }
  
  // 3 & 4: Furniture & Decor will just use the elegant image clip reveal built into the card itself
  
  // 5: Full Event Production
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

  return null;
}

export function WhatWeDo() {
  const rm = useReducedMotion();
  
  return (
    <Section tone="base" aria-label="Services" className="overflow-hidden">
      <div className="container-site flex flex-col gap-10">
        
        {/* Intro */}
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="SERVICES"
            heading="The pillars of production."
            subHeading="Book one service or combine them for complete event execution."
            className="max-w-xl"
          />
          <ServiceTicker />
        </div>

        {/* Desktop Bento Grid */}
        <div className="hidden lg:grid grid-cols-12 gap-4 auto-rows-[minmax(340px,auto)]">
          {services.map((s, i) => {
            let colSpan = "col-span-12";
            let rowSpan = "row-span-1";
            let sizes = "50vw";
            let isLarge = false;

            if (i === 5) { // Full Event Production
              colSpan = "col-span-12 lg:col-start-7 lg:col-span-6";
              rowSpan = "row-span-1 lg:row-start-1 lg:row-span-2";
              sizes = "50vw";
              isLarge = true;
            } else if (i === 2) { // Truss & Structures
              colSpan = "col-span-12 lg:col-start-1 lg:col-span-12";
              rowSpan = "row-span-1 lg:row-start-3 lg:row-span-1";
              sizes = "100vw";
              isLarge = true; 
            } else if (i === 0) { // Lighting
              colSpan = "col-span-12 lg:col-start-1 lg:col-span-3";
              rowSpan = "row-span-1 lg:row-start-1 lg:row-span-1";
              sizes = "25vw";
            } else if (i === 1) { // Power
              colSpan = "col-span-12 lg:col-start-4 lg:col-span-3";
              rowSpan = "row-span-1 lg:row-start-1 lg:row-span-1";
              sizes = "25vw";
            } else if (i === 3) { // Furniture
              colSpan = "col-span-12 lg:col-start-1 lg:col-span-3";
              rowSpan = "row-span-1 lg:row-start-2 lg:row-span-1";
              sizes = "25vw";
            } else if (i === 4) { // Decor
              colSpan = "col-span-12 lg:col-start-4 lg:col-span-3";
              rowSpan = "row-span-1 lg:row-start-2 lg:row-span-1";
              sizes = "25vw";
            }

            // Remove hardcoded arrow from content if present, so we can use the animated icon
            const cleanCtaLabel = s.ctaLabel.replace(/→|\u2192/g, '').trim();

            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: rm ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                transition={{ duration: 0.8, delay: rm ? 0 : i * 0.1, ease: EXPO }}
                className={cn(
                  "group relative overflow-hidden bg-navy-deep rounded-sm border border-white/5",
                  "hover:border-gold/30 transition-colors duration-500",
                  colSpan, rowSpan,
                  isLarge && i === 2 ? "flex flex-row items-center" : "flex flex-col"
                )}
              >
                {/* Image Container */}
                <div className={cn("relative overflow-hidden", 
                  isLarge && i === 2 ? "w-1/2 h-full" : "w-full flex-1",
                  isLarge && i === 5 ? "h-2/3" : ""
                )}>
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes={sizes}
                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-navy-deep/20 pointer-events-none" />
                  <ServiceMotionAccent index={i} />
                </div>
                
                {/* Content Container */}
                <div className={cn("flex flex-col justify-between p-6 lg:p-8", 
                  isLarge && i === 2 ? "w-1/2 h-full" : "shrink-0 bg-navy-deep/95"
                )}>
                  <div>
                    <span className="font-sans text-[0.65rem] font-bold text-gold-border tracking-[0.25em] uppercase mb-3 block">
                      0{i + 1}
                    </span>
                    <h3 className={cn("font-display font-bold text-cream leading-tight mb-4", 
                      isLarge ? "text-3xl lg:text-4xl" : "text-xl lg:text-2xl"
                    )}>
                      {s.title}
                    </h3>
                    {(isLarge || i === 2) && (
                      <p className="font-sans text-sm md:text-base text-cream/70 leading-relaxed mb-6 max-w-sm">
                        {s.description}
                      </p>
                    )}
                  </div>
                  
                  <Link
                    href={s.ctaHref}
                    className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-gold-light hover:text-gold transition-colors duration-300 tracking-wider uppercase mt-4"
                  >
                    {cleanCtaLabel}
                    <ArrowRight size={15} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Swipe Carousel */}
        <div className="lg:hidden w-full relative">
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-8" style={{ scrollbarWidth: "none", touchAction: "pan-x pan-y" }}>
            {services.map((s, i) => {
              const cleanCtaLabel = s.ctaLabel.replace(/→|\u2192/g, '').trim();
              return (
                <div key={s.title} className="w-[80vw] shrink-0 snap-center first:ml-4 last:mr-4 flex flex-col bg-navy-deep border border-white/5 rounded-sm overflow-hidden">
                  <div className="relative w-full aspect-[4/3]">
                    <Image src={s.image} alt={s.imageAlt} fill sizes="80vw" className="object-cover" />
                    <div className="absolute inset-0 bg-navy-deep/20" />
                  </div>
                  <div className="flex flex-col p-6 flex-1 justify-between">
                    <div>
                      <span className="font-sans text-[0.65rem] font-bold text-gold-border tracking-[0.25em] uppercase mb-2 block">
                        0{i + 1}
                      </span>
                      <h3 className="font-display text-2xl font-bold text-cream leading-tight mb-3">
                        {s.title}
                      </h3>
                      <p className="font-sans text-sm text-cream/70 leading-relaxed mb-6">
                        {s.description}
                      </p>
                    </div>
                    <Link
                      href={s.ctaHref}
                      className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-gold-light tracking-wider uppercase"
                    >
                      {cleanCtaLabel}
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Progress Indicator Fake/Decorative */}
          <div className="w-[80vw] mx-auto h-[2px] bg-white/10 mt-2 rounded-full overflow-hidden">
            <div className="h-full bg-gold-light w-1/4 rounded-full" />
          </div>
        </div>

      </div>
    </Section>
  );
}
