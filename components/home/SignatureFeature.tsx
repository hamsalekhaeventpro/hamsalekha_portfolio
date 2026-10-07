"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { signatureSets } from "@/lib/content";
import { ease, duration } from "@/lib/motion";
import { Section } from "@/components/layout/Section";

const EXPO = ease.expo;

export function SignatureFeature() {
  const glassHouse = signatureSets[0];
  const moongate = signatureSets[1];

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const rm = useReducedMotion();

  const animateState = rm ? "visible" : (isInView ? "visible" : "hidden");

  // Animation Variants
  const containerV = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const primaryV = {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: duration.hero, ease: EXPO } },
  };

  const circleV = {
    hidden: { scale: 0.8, opacity: 0, clipPath: "circle(0% at 50% 50%)" },
    visible: { scale: 1, opacity: 1, clipPath: "circle(50% at 50% 50%)", transition: { duration: 1.4, ease: EXPO } },
  };

  const itemV = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: duration.reveal, ease: EXPO } },
  };

  return (
    <Section tone="stage" aria-label="Signature Sets" className="overflow-hidden">
      {/* Unclipped measurable wrapper for IO */}
      <div className="container-site relative z-10" ref={ref}>
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
          variants={containerV}
          initial="hidden"
          animate={animateState}
        >
          {/* Left: Signature Sets Visuals */}
          <div className="w-full lg:w-1/2 flex flex-col gap-10 lg:gap-0">
            
            {/* Glass House - Primary */}
            <div className="relative w-full lg:w-[85%] aspect-[4/3] lg:aspect-[4/5] xl:aspect-[3/4] z-0 bg-navy-deep">
              <motion.div
                variants={primaryV}
                className="absolute inset-0 overflow-hidden group"
              >
                <Image
                  src={glassHouse.image}
                  alt={glassHouse.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                {/* Subtle lighting sweep fallback for Glass House */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold/10 to-transparent w-[200%] h-[200%] origin-bottom-left"
                  initial={{ x: "-100%", y: "100%" }}
                  animate={animateState === "visible" ? { x: "100%", y: "-100%" } : { x: "-100%", y: "100%" }}
                  transition={{ duration: 2.5, ease: "easeInOut", delay: 0.6 }}
                />
                <div className="absolute inset-0 border border-gold/15 pointer-events-none" />
              </motion.div>
            </div>

            {/* MoonGate - Secondary */}
            <motion.div 
              variants={circleV}
              className="relative w-[70%] sm:w-[50%] lg:w-[55%] aspect-square self-center lg:self-end rounded-full overflow-hidden lg:-mt-40 lg:-mr-12 z-10 lg:border-[8px] lg:border-navy-deep group"
            >
              <Image
                src={moongate.image}
                alt={moongate.imageAlt || "MoonGate"}
                fill
                sizes="(max-width: 1024px) 70vw, 30vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 border border-gold/15 rounded-full pointer-events-none" />
              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_80px_rgba(11,31,58,0.7)] pointer-events-none" />
            </motion.div>
          </div>

          {/* Right: Editorial Typography */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mt-4 lg:mt-0">
            
            <motion.div variants={itemV} className="flex items-center gap-4 mb-6">
              <span className="h-px w-8 bg-gold/50" />
              <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-gold-light">
                Signature Feature
              </span>
              <span className="h-px w-8 bg-gold/50 lg:hidden" />
            </motion.div>

            <motion.h2
              variants={itemV}
              className="font-display font-bold text-cream mb-8 text-h1"
            >
              Sets that define<br />
              <span className="font-display italic font-medium text-gold-light">the space.</span>
            </motion.h2>

            <motion.div variants={itemV} className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4 mb-10 text-cream/70 font-sans text-sm md:text-base uppercase tracking-widest">
              <span>The Glass House</span>
              <span className="text-gold-dark text-xl leading-none">·</span>
              <span>MoonGate</span>
              <span className="text-gold-dark text-xl leading-none">·</span>
              <span>Custom Sets</span>
            </motion.div>

            <motion.div variants={itemV} className="w-16 h-[1px] bg-gradient-to-r from-gold-dark to-transparent mb-10 hidden lg:block" />

            <motion.div variants={itemV}>
              <Link
                href="/signature-sets"
                className="inline-flex items-center gap-3 bg-transparent text-gold hover:text-gold-light px-0 py-2 font-sans text-sm font-bold tracking-[0.15em] uppercase transition-colors duration-300 group/link underline-draw"
              >
                Explore Signature Sets
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 ease-out group-hover/link:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
