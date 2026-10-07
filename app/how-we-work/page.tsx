"use client";

import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { howWeWorkHero, processSteps, howWeWorkCTA } from "@/lib/content";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

// ── Hero ────────────────────────────────────────────────────────
function HowWeWorkHeroSection() {
  return (
    <Section tone="base" className="pt-40 pb-20 overflow-hidden relative">
      <div className="container-site flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
        <Reveal delay={0.1}>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gold-dark/40" />
            <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-dark">
              {howWeWorkHero.eyebrow}
            </span>
            <span className="h-px w-8 bg-gold-dark/40" />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <h1 className="font-display font-bold text-5xl md:text-7xl text-navy-deep leading-tight">
            {howWeWorkHero.headline}
          </h1>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="w-12 h-[1px] bg-gold-dark/40 mx-auto my-2" />
        </Reveal>
        <Reveal delay={0.4}>
          <p className="font-sans text-lg md:text-xl text-text-slate max-w-2xl mx-auto leading-relaxed">
            {howWeWorkHero.subline}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

// ── Process Experience (Desktop Pinned) ─────────────────────────
function ProcessDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll over the pinned height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate widths for the gold progress line
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Instead of translating all nodes horizontally, we can do a crossfade in place 
  // or a slight upward translate + crossfade for the content. The prompt says:
  // "previous/current/next relationship is visible... crossfade, translate, line draw... No bounce."
  // A horizontal track works well. We slide the nodes left.
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]); // roughly sliding to the end

  return (
    <div className="hidden lg:block relative h-[400vh] bg-panel-warm" ref={containerRef}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        <div className="absolute top-24 left-[10vw] flex items-center gap-4">
          <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-dark">
            Our Process
          </span>
          <span className="h-px w-12 bg-gold-dark/40" />
        </div>

        <div className="relative w-full pl-[10vw] pr-[10vw]">
          {/* Background Track */}
          <div className="absolute top-[80px] left-[10vw] right-[10vw] h-[1px] bg-gold-dark/20" />
          
          {/* Active Fill */}
          <motion.div 
            className="absolute top-[80px] left-[10vw] h-[1px] bg-gold-dark origin-left z-10"
            style={{ width: "80vw", scaleX: progressWidth }}
          />

          <motion.div 
            className="flex items-start gap-[15vw]"
            style={{ x: xTransform }}
          >
            {processSteps.map((step) => {
              // We could compute active state strictly by progress, but here we just show all nodes 
              // horizontally and let the user scroll through them (like the timeline).
              // For a true "crossfade" stationary step experience, we'd overlap them. But horizontal track is Replit style.
              return (
                <div key={step.number} className="relative flex flex-col shrink-0 w-[320px]">
                  <div className="h-[80px] flex items-end mb-10 relative">
                    {/* Node dot on the track */}
                    <div className="absolute left-0 bottom-0 w-3 h-3 rounded-full bg-gold-dark translate-y-1.5 z-20" />
                    
                    <h3 className="font-display font-bold text-6xl text-navy-deep">
                      {step.number}
                    </h3>
                  </div>
                  <h4 className="font-display text-3xl font-bold text-navy-deep mb-4">
                    {step.stage}
                  </h4>
                  <p className="font-sans text-lg text-text-slate leading-relaxed">
                    {step.body}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </div>
  );
}

// ── Process Experience (Mobile Stacked) ─────────────────────────
function ProcessMobile() {
  return (
    <div className="lg:hidden relative py-20 bg-panel-warm">
      <div className="container-site">
        <div className="flex flex-col gap-16 relative pl-6">
          <div className="absolute top-4 bottom-0 left-6 w-[1px] bg-gold-dark/20" />
          {processSteps.map((step, i) => (
            <MobileStepNode key={step.number} step={step} isLast={i === processSteps.length - 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileStepNode({ step, isLast }: { step: (typeof processSteps)[0]; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  
  return (
    <div className="relative" ref={ref}>
      {/* Active Line Fill */}
      {!isLast && (
        <motion.div 
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="absolute -left-[1px] top-4 h-[calc(100%+64px)] w-[1px] bg-gold-dark origin-top z-10"
        />
      )}
      
      {/* Dot */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        className="absolute -left-[6px] top-4 w-3 h-3 rounded-full bg-gold-dark z-20"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="pl-8"
      >
        <span className="font-display font-bold text-5xl text-navy-deep/20 block mb-2">
          {step.number}
        </span>
        <h3 className="font-display text-3xl font-bold text-navy-deep mb-3">
          {step.stage}
        </h3>
        <p className="font-sans text-lg leading-relaxed text-text-slate">
          {step.body}
        </p>
      </motion.div>
    </div>
  );
}

// ── Process Experience Wrapper (Handles Reduced Motion) ─────────
function ProcessSection() {
  const rm = useReducedMotion();

  if (rm) {
    return (
      <Section tone="panel" className="py-24">
        <div className="container-site flex flex-col gap-16">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gold-dark/40" />
            <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-dark">
              Our Process
            </span>
          </div>
          <div className="flex flex-col gap-12 border-l border-gold-dark/20 pl-8 relative">
            {processSteps.map((step) => (
              <div key={step.number} className="relative">
                <div className="absolute -left-[37px] top-2 w-2 h-2 rounded-full bg-gold-dark" />
                <span className="font-display font-bold text-4xl text-navy-deep/20 block mb-1">{step.number}</span>
                <h3 className="font-display text-2xl font-bold text-navy-deep mb-2">{step.stage}</h3>
                <p className="font-sans text-text-slate max-w-lg">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    );
  }

  return (
    <>
      <ProcessDesktop />
      <ProcessMobile />
    </>
  );
}

// ── CTA ─────────────────────────────────────────────────────────
function HowWeWorkCTASection() {
  return (
    <Section tone="stage" className="py-32 relative overflow-hidden text-center">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-stage-glow)" }} />
      <div className="container-site relative z-10 flex flex-col items-center gap-8 max-w-2xl mx-auto">
        <Reveal>
          <h2 className="font-display font-bold text-5xl md:text-6xl text-cream">
            {howWeWorkCTA.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="w-16 h-[2px] bg-gold rounded-full mx-auto" />
        </Reveal>
        <Reveal delay={0.3}>
          <Button href={howWeWorkCTA.ctaHref} variant="primary" size="lg" className="mt-4">
            {howWeWorkCTA.ctaLabel}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}

export default function HowWeWorkPage() {
  return (
    <>
      <HowWeWorkHeroSection />
      <ProcessSection />
      <HowWeWorkCTASection />
    </>
  );
}
