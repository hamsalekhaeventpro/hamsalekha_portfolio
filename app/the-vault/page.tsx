"use client";

import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { 
  vaultHero, 
  warehouseSection, 
  inventory, 
  crewSection, 
  protectionPoints, 
  vaultPillars, 
  vaultCTA 
} from "@/lib/content";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ease, duration } from "@/lib/motion";

const EXPO = ease.expo;

// ── Hero ────────────────────────────────────────────────────────
function VaultHeroSection() {
  return (
    <Section tone="stage" className="pt-36 pb-24 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.12),transparent_50%)]" />
      <div className="container-site relative z-10 flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
        <Reveal delay={0.1}>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gold/50" />
            <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-light">
              {vaultHero.eyebrow}
            </span>
            <span className="h-px w-8 bg-gold/50" />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <h1 className="font-display font-bold text-6xl md:text-7xl text-cream leading-[1.05]">
            {vaultHero.headline}
          </h1>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="w-16 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full mx-auto my-2" />
        </Reveal>
        <Reveal delay={0.4}>
          <p className="font-sans text-lg md:text-xl text-cream/70 max-w-2xl mx-auto leading-relaxed">
            {vaultHero.subline}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

// ── Image-led Warehouse ─────────────────────────────────────────
function WarehouseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const rm = useReducedMotion();
  const animateState = rm ? "visible" : (isInView ? "visible" : "hidden");

  return (
    <Section tone="stage" className="pb-32 overflow-hidden">
      <div className="container-site flex flex-col gap-12 lg:gap-16" ref={ref}>
        {/* Large Architectural Image */}
        <div className="w-full relative aspect-[4/3] md:aspect-[21/9] bg-navy-deep group overflow-hidden">
          <motion.div
            initial={rm ? {} : { clipPath: "inset(0 100% 0 0)" }}
            animate={animateState === "visible" ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: duration.hero, ease: EXPO }}
            className="absolute inset-0"
          >
            <Image
              src={warehouseSection.image}
              alt={warehouseSection.imageAlt}
              fill
              className="object-cover transition-transform duration-[3s] ease-out group-hover:scale-[1.03]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-navy-deep/20 pointer-events-none" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Reveal delay={0.2}>
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-gold/50" />
                <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-light">
                  {warehouseSection.eyebrow}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <h2 className="font-display font-bold text-4xl text-cream leading-tight">
                {warehouseSection.headline}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Reveal delay={0.4}>
              <p className="font-sans text-lg text-cream/70 leading-relaxed max-w-2xl">
                {warehouseSection.body}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Inventory Table / Count-Ups ─────────────────────────────────
function AnimatedCounter({ value, text }: { value: string; text: string }) {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/[^0-9]/g, ""));
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (isInView && target > 0) {
      const end = target;
      const durationMs = 1500;
      const frameRate = 1000 / 60;
      const totalFrames = Math.round(durationMs / frameRate);
      
      let frame = 0;
      const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(end * (1 - Math.pow(1 - progress, 3))); // easeOutCubic
        setCount(currentCount);

        if (frame === totalFrames) {
          clearInterval(timer);
          setCount(end);
        }
      }, frameRate);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="font-display text-5xl md:text-6xl font-bold text-navy-deep">
        {target > 0 ? count.toLocaleString() : value}
        {value.includes("+") && "+"}
      </span>
      <span className="font-sans text-sm uppercase tracking-widest text-text-slate font-semibold">
        {text}
      </span>
    </div>
  );
}

function InventorySection() {
  return (
    <Section tone="base" className="py-24 lg:py-32">
      <div className="container-site flex flex-col gap-24">
        
        {/* Count-Up Proofs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <AnimatedCounter value="10000+" text="Chairs" />
          <AnimatedCounter value="1100+" text="Sofa Units" />
          <AnimatedCounter value="100000" text="Sq ft Trussing" />
          <AnimatedCounter value="40-125" text="KVA Power" />
        </div>

        <div className="w-full h-[1px] bg-gold-dark/20" />

        {/* Structured Inventory List */}
        <div className="flex flex-col gap-12">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gold-dark/40" />
              <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-dark">
                The Inventory
              </span>
            </div>
          </Reveal>
          
          <div className="flex flex-col border-t border-navy-deep/10">
            {inventory.map((item, i) => (
              <Reveal key={item.category} delay={0.1 * i}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-8 border-b border-navy-deep/10">
                  <h3 className="font-display text-2xl font-bold text-navy-deep w-full md:w-1/3">
                    {item.category}
                  </h3>
                  <p className="font-sans text-lg text-text-slate w-full md:w-2/3 md:text-right">
                    {item.capacity}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
}

// ── Dark Production Proof ───────────────────────────────────────
function ProductionProofSection() {
  return (
    <Section tone="stage" className="py-24 lg:py-32 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
      <div className="container-site flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* The Crew */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          <Reveal delay={0.1}>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gold/50" />
              <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-light">
                {crewSection.eyebrow}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="font-display font-bold text-4xl text-cream leading-tight">
              {crewSection.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="w-12 h-[1px] bg-gold/40 my-2" />
          </Reveal>
          <Reveal delay={0.4}>
            <p className="font-sans text-lg text-cream/70 leading-relaxed">
              {crewSection.body}
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <ul className="flex flex-col gap-4 mt-4">
              {protectionPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 font-sans text-sm text-cream/80">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0 mt-1.5" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Vault Pillars */}
        <div className="w-full lg:w-[55%] grid sm:grid-cols-2 gap-x-8 gap-y-12 content-start">
          {vaultPillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={0.2 + (0.1 * i)} className="flex flex-col gap-3">
              <span className="font-sans text-[0.6rem] uppercase tracking-widest text-gold-light font-bold">
                {pillar.eyebrow}
              </span>
              <h3 className="font-display text-xl font-bold text-cream">
                {pillar.title}
              </h3>
              <p className="font-sans text-sm text-cream/60 leading-relaxed">
                {pillar.body}
              </p>
            </Reveal>
          ))}
        </div>

      </div>
    </Section>
  );
}

// ── CTA ─────────────────────────────────────────────────────────
function VaultCTASection() {
  return (
    <Section tone="stage" className="py-24 relative overflow-hidden text-center border-t border-gold/10">
      <div className="container-site relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
        <Reveal>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-cream">
            {vaultCTA.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="w-12 h-[1px] bg-gold-dark/40 mx-auto" />
        </Reveal>
        <Reveal delay={0.3}>
          <p className="font-sans text-lg text-cream/70 leading-relaxed">
            {vaultCTA.body}
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <Button href={vaultCTA.ctaHref} variant="primary" size="lg" className="mt-4">
            {vaultCTA.ctaLabel}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}

export default function TheVaultPage() {
  return (
    <>
      <VaultHeroSection />
      <WarehouseSection />
      <InventorySection />
      <ProductionProofSection />
      <VaultCTASection />
    </>
  );
}
