"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { signatureSets } from "@/lib/content";
import { ease } from "@/lib/motion";

const EXPO = ease.expo;

export function SignatureFeature() {
  const moongate = signatureSets[1];

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const rm = useReducedMotion();

  const animateState = rm ? "visible" : (isInView ? "visible" : "hidden");

  // Animation Variants
  const containerV = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemV = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO } },
  };

  const circleV = {
    hidden: { scale: 0.8, opacity: 0, clipPath: "circle(0% at 50% 50%)" },
    visible: { scale: 1, opacity: 1, clipPath: "circle(50% at 50% 50%)", transition: { duration: 1.4, ease: EXPO } },
  };

  return (
    <section aria-label="Signature Sets" className="bg-navy-deep py-24 md:py-32 overflow-hidden">
      <div className="container-site relative z-10" ref={ref}>
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
          variants={containerV}
          initial="hidden"
          animate={animateState}
        >
          {/* Left: Large Circular Visual */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <motion.div 
              variants={circleV}
              className="relative w-full max-w-[500px] aspect-square rounded-full overflow-hidden shadow-2xl"
            >
              <Image
                src={moongate.image}
                alt={moongate.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[2s] hover:scale-105"
              />
              <div className="absolute inset-0 border border-gold/20 rounded-full pointer-events-none" />
              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_80px_rgba(15,38,71,0.6)] pointer-events-none" />
            </motion.div>
          </div>

          {/* Right: Editorial Typography */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            <motion.div variants={itemV} className="flex items-center gap-4 mb-6">
              <span className="h-px w-8 bg-gold/50" />
              <span className="font-sans text-[0.65rem] tracking-[0.22em] uppercase font-semibold text-gold-light">
                Signature Feature
              </span>
              <span className="h-px w-8 bg-gold/50 lg:hidden" />
            </motion.div>

            <motion.h2 
              variants={itemV}
              className="font-display font-bold text-cream mb-8 leading-[1.1]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Sets that define<br />
              <span className="italic text-gold-light font-normal">the space.</span>
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
                className="inline-flex items-center gap-3 bg-transparent text-gold hover:text-gold-light px-0 py-2 font-sans text-sm font-bold tracking-[0.15em] uppercase transition-colors duration-400 group"
              >
                Explore Signature Sets
                <ArrowRight
                  size={16}
                  className="transition-transform duration-400 ease-out group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
