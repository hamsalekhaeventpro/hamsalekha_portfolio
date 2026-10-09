"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Warehouse, Users, Zap } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ease, duration } from "@/lib/motion";

const EXPO = ease.expo;

const PROOF = [
  { label: "Own warehouse", icon: Warehouse },
  { label: "Own crew", icon: Users },
  { label: "Own power", icon: Zap },
];

export function BehindTheBuild() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const rm = useReducedMotion();
  const animate = rm ? "visible" : (isInView ? "visible" : "hidden");

  const imgV = {
    hidden:  { clipPath: "inset(0 0 100% 0)", scale: rm ? 1 : 1.04 },
    visible: { clipPath: "inset(0 0 0% 0)", scale: 1, transition: { duration: 1.0, ease: EXPO } },
  };
  const eyebrowV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5, delay: 0.5, ease: EXPO } } };
  const headingV = { hidden: { clipPath: "inset(0 0 100% 0)" }, visible: { clipPath: "inset(0 0 0% 0)", transition: { duration: 0.8, delay: 0.65, ease: EXPO } } };
  const bodyV    = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: duration.reveal, delay: 0.85, ease: EXPO } } };
  const ctaV     = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4, delay: 1.25, ease: EXPO } } };

  return (
    <section
      ref={ref}
      aria-label="Behind The Build"
      className="relative overflow-hidden bg-navy-deep"
      style={{ minHeight: "clamp(420px, 65vh, 800px)" }}
    >
      {/* Full-bleed warehouse image */}
      <motion.div
        className="absolute inset-0"
        variants={imgV}
        initial="hidden"
        animate={animate}
      >
        <Image
          src="/images/vault/warehouse.jpg"
          alt="Hamsalekha Event Production warehouse with equipment staging"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Dark gradient — heavy at bottom, lighter at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy-deep/20" />

      {/* Content — centered, sits above gradient */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full text-center container-site pb-16 md:pb-24 pt-24">

        <motion.div variants={eyebrowV} initial="hidden" animate={animate} className="flex items-center gap-4 mb-5">
          <span className="h-px w-8 bg-gold/50" />
          <span className="font-sans text-[0.7rem] tracking-[0.22em] uppercase font-semibold text-gold-light">
            Behind The Build
          </span>
          <span className="h-px w-8 bg-gold/50" />
        </motion.div>

        <div className="overflow-hidden mb-6">
          <motion.h2
            variants={headingV}
            initial="hidden"
            animate={animate}
            className="font-display font-bold text-cream"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)", lineHeight: 1.08 }}
          >
            Everything you don&apos;t see is ours too.
          </motion.h2>
        </div>

        <motion.p
          variants={bodyV}
          initial="hidden"
          animate={animate}
          className="font-sans text-lg text-cream/75 leading-relaxed max-w-2xl mb-8"
        >
          Load-ins before sunrise. Truss raised and checked. Gensets running before the first guest arrives. Our crew owns the backstage, so planners and families can stay out front.
        </motion.p>

        {/* Proof line — staggered items */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 1.05 } }
          }}
          initial="hidden"
          animate={animate}
          className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-8"
        >
          {PROOF.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EXPO } } }}
                className="inline-flex items-center gap-2 bg-navy-mid/80 border border-gold/30 px-4 py-2 rounded-full text-gold-light font-sans text-xs tracking-wider uppercase font-semibold backdrop-blur-xs"
              >
                <Icon size={14} className="text-gold" />
                <span>{item.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={ctaV} initial="hidden" animate={animate}>
          <Link
            href="/the-vault"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-gold-light hover:text-gold transition-colors duration-300 group/link uppercase tracking-wider"
          >
            Step inside The Vault
            <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
