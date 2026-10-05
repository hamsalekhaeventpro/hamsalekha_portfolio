"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { homeIntro } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { ease, duration } from "@/lib/motion";

const EXPO = ease.expo;

export function HomeIntro() {
  const rm = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px", amount: 0.2 });

  const line1V = {
    initial: { clipPath: "inset(0 0 100% 0)", opacity: 1 },
    visible: { clipPath: "inset(0 0 0% 0)", opacity: 1, transition: { duration: 0.8, ease: EXPO } },
  };
  const line2V = {
    initial: { clipPath: "inset(0 0 100% 0)", opacity: 1 },
    visible: { clipPath: "inset(0 0 0% 0)", opacity: 1, transition: { duration: 0.8, delay: 0.18, ease: EXPO } },
  };
  const bodyV = {
    initial: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: duration.reveal, delay: 0.45, ease: EXPO } },
  };
  const ctaV = {
    initial: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.65, ease: EXPO } },
  };
  const imgV = {
    initial: { clipPath: "inset(0 100% 0 0)", scale: rm ? 1 : 1.04 },
    visible: {
      clipPath: "inset(0 0% 0 0)",
      scale: 1,
      transition: { duration: 1.0, delay: 0.1, ease: EXPO },
    },
  };

  const animate = rm ? "visible" : (isInView ? "visible" : "initial");

  return (
    <section
      ref={ref}
      className="section-py bg-bg-base overflow-hidden relative"
      aria-label="Introduction"
    >
      <div className="container-site">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Text content */}
          <div className="lg:col-span-7 flex flex-col gap-6 lg:pr-8">

            {/* Eyebrow */}
            <motion.div
              variants={{ initial: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4, ease: EXPO } } }}
              initial="initial"
              animate={animate}
              className="flex items-center gap-4"
            >
              <span className="h-px w-8 bg-gold/60 shrink-0" />
              <span className="font-sans text-[0.7rem] tracking-[0.22em] uppercase font-semibold text-gold-dark">
                {homeIntro.eyebrow}
              </span>
            </motion.div>

            {/* Manifesto headline — clipped line-by-line */}
            <h2
              className="font-display font-bold text-navy-deep leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)" }}
              aria-label="An event production house, not a rental counter."
            >
              {/* Line 1 */}
              <span className="block overflow-hidden" aria-hidden="true">
                <motion.span
                  style={{ display: "block" }}
                  variants={line1V}
                  initial="initial"
                  animate={animate}
                >
                  An event production house,
                </motion.span>
              </span>
              {/* Line 2 — gold italic accent */}
              <span className="block overflow-hidden mt-1" aria-hidden="true">
                <motion.span
                  style={{ display: "block" }}
                  className="font-cormorant italic text-gold-dark font-normal"
                  variants={line2V}
                  initial="initial"
                  animate={animate}
                >
                  not a rental counter.
                </motion.span>
              </span>
            </h2>

            {/* Gold rule */}
            <motion.span
              variants={{
                initial: { scaleX: 0, originX: 0 },
                visible: { scaleX: 1, originX: 0, transition: { duration: 0.6, delay: 0.35, ease: EXPO } },
              }}
              initial="initial"
              animate={animate}
              className="block h-[2px] w-12 bg-gradient-to-r from-gold-dark to-gold rounded-full"
              style={{ transformOrigin: "left" }}
            />

            {/* Body */}
            <motion.div
              variants={bodyV}
              initial="initial"
              animate={animate}
              className="flex flex-col gap-5 text-body text-text-slate font-sans leading-relaxed"
            >
              <p>{homeIntro.body}</p>
              <p>{homeIntro.body2}</p>
            </motion.div>

            {/* CTA */}
            <motion.div variants={ctaV} initial="initial" animate={animate}>
              <Button href="/about" variant="outline" size="md" className="self-start mt-2">
                OUR STORY →
              </Button>
            </motion.div>
          </div>

          {/* Image — clips in from right */}
          <div className="lg:col-span-5 relative order-last">
            <motion.div
              variants={imgV}
              initial="initial"
              animate={animate}
              className="relative aspect-[4/5] lg:aspect-[3/4] w-full rounded-2xl overflow-hidden group shadow-xl"
            >
              <Image
                src="/images/about/hero.jpg"
                alt="Early days of Hamsalekha Event Production warehouse in Kothanur"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
