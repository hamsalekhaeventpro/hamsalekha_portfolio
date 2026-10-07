"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ease } from "@/lib/motion";

const EXPO = ease.expo;

export function HomeIntro() {
  const rm = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px", amount: 0.2 });

  const animate = rm ? "visible" : (isInView ? "visible" : "initial");

  return (
    <section
      ref={ref}
      className="min-h-[60vh] md:min-h-[70vh] flex items-center justify-center py-32 bg-bg-base overflow-hidden relative"
      aria-label="Brand Positioning"
    >
      <div className="container-site">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-10">
          
          {/* Minimal gold line instead of a text eyebrow */}
          <motion.div
            variants={{
              initial: { scaleX: 0, opacity: 0 },
              visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: EXPO } }
            }}
            initial="initial"
            animate={animate}
            className="w-16 h-px bg-gold-dark/50"
          />

          {/* Large Editorial Manifesto Statement */}
          <motion.h2
            variants={{
              initial: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.1, ease: EXPO } }
            }}
            initial="initial"
            animate={animate}
            className="font-display font-bold text-navy-deep leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)" }}
          >
            An event production house,
            <span className="block italic text-gold-dark font-normal mt-2 md:mt-4">
              not a rental counter.
            </span>
          </motion.h2>

        </div>
      </div>
    </section>
  );
}
