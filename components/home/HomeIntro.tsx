"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ease } from "@/lib/motion";

const EXPO = ease.expo;

export function HomeIntro() {
  const rm = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px", amount: 0.1 });

  const animate = rm ? "visible" : (isInView ? "visible" : "initial");

  return (
    <section
      ref={ref}
      className="min-h-[65vh] md:min-h-[75vh] flex items-center justify-center py-32 bg-bg-base overflow-hidden relative"
      aria-label="Brand Positioning and Story"
    >
      <div className="container-site">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* LAYER 1: BRAND MANIFESTO */}
          <div className="flex flex-col items-center gap-10 w-full">
            <motion.div
              variants={{
                initial: { scaleX: 0, opacity: 0 },
                visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: EXPO } }
              }}
              initial="initial"
              animate={animate}
              className="w-16 h-px bg-gold-dark/50"
            />

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

          {/* LAYER 2: COMPANY STORY PREVIEW */}
          <motion.div
            variants={{
              initial: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.3, ease: EXPO } }
            }}
            initial="initial"
            animate={animate}
            className="mt-20 md:mt-32 max-w-2xl flex flex-col items-center gap-6"
          >
            <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-gold-dark">
              2006 — 2026
            </span>
            <h3 className="font-display font-bold text-navy-deep text-2xl md:text-3xl">
              Built one event at a time.
            </h3>
            <p className="font-sans text-lg text-text-slate leading-relaxed">
              Hamsalekha began in 2006 with general lighting, prepared inside a family home by a team of two or three. Twenty years later, the same belief drives every build: keep moving forward, and let one opportunity lead to the next.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 mt-2 font-sans text-sm font-bold text-gold-dark hover:text-navy-deep transition-colors group/link tracking-wider uppercase"
            >
              Read our story
              <ArrowRight size={18} className="transition-transform group-hover/link:translate-x-1" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
