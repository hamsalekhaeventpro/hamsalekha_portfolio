"use client";

import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Button } from "@/components/ui/Button";
import { aboutHero, aboutStory, timeline, founder, values, aboutPeople, aboutCTA } from "@/lib/content";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

// ── Hero ────────────────────────────────────────────────────────
function AboutHeroSection() {
  return (
    <Section tone="stage" className="pt-36 pb-24 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.12),transparent_50%)]" />
      <div className="container-site relative z-10 flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
        <Reveal delay={0.1}>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gold/50" />
            <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-light">
              Enter The Story
            </span>
            <span className="h-px w-8 bg-gold/50" />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <h1 className="font-display font-bold text-6xl md:text-7xl lg:text-[5.5rem] text-cream leading-[1.05]">
            {aboutHero.title1}
            <br />
            <span className="font-display italic text-gold-light font-medium">{aboutHero.title2}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="w-16 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full mx-auto my-2" />
        </Reveal>
        <Reveal delay={0.4}>
          <p className="font-sans text-lg md:text-xl text-cream/70 max-w-2xl mx-auto leading-relaxed">
            {aboutHero.body}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

// ── Origin ──────────────────────────────────────────────────────
function OriginSection() {
  return (
    <Section tone="base" className="py-24 lg:py-32 overflow-hidden">
      <div className="container-site flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        {/* Archive Image */}
        <div className="w-full lg:w-[45%]">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy-deep group">
            <ClipReveal direction="up" delay={0.2} className="w-full h-full">
              <Image
                src={aboutHero.image}
                alt={aboutHero.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              />
            </ClipReveal>
          </div>
        </div>
        {/* Story Typography */}
        <div className="w-full lg:w-[55%] flex flex-col gap-8">
          <Reveal delay={0.2}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-deep leading-tight">
              {aboutHero.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="w-12 h-[1px] bg-gold-dark/40" />
          </Reveal>
          <div className="flex flex-col gap-6">
            {aboutStory.slice(0, 3).map((para, j) => (
              <Reveal delay={0.4 + j * 0.1} key={j}>
                <p className="font-sans text-lg text-text-slate leading-relaxed">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Cinematic Timeline (Journey) ──────────────────────────────────
function TimelineSection() {
  const rm = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Desktop Horizontal Scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate widths based on timeline length
  // 9 nodes total
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (rm) {
    return (
      <Section tone="charcoal" className="py-24">
        <div className="container-site flex flex-col gap-16">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gold/50" />
            <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-light">
              The Journey
            </span>
          </div>
          <div className="flex flex-col gap-12 border-l border-gold/20 pl-8 relative">
            {timeline.map((node) => (
              <div key={node.year} className="relative">
                <div className="absolute -left-[37px] top-2 w-2 h-2 rounded-full bg-gold" />
                <h3 className="font-display text-4xl font-bold text-cream mb-2">{node.year}</h3>
                <p className="font-sans text-cream/70 max-w-sm">{node.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    );
  }

  return (
    <>
      {/* Desktop Pinned Timeline */}
      <div className="hidden lg:block relative bg-navy-deep h-[300vh]" ref={containerRef}>
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          
          <div className="absolute top-24 left-1/2 -translate-x-1/2 flex items-center gap-4 w-full justify-center">
            <span className="h-px w-8 bg-gold/50" />
            <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-light">
              2006 — 2026
            </span>
            <span className="h-px w-8 bg-gold/50" />
          </div>

          <div className="relative w-full px-[10vw]">
            {/* The Track */}
            <div className="absolute top-[80px] left-[10vw] right-0 h-[1px] bg-gold/20" />
            
            {/* The Active Line */}
            <motion.div 
              className="absolute top-[80px] left-[10vw] h-[1px] bg-gold origin-left"
              style={{ width: "80vw", scaleX: progressWidth }}
            />

            <motion.div 
              className="flex items-start gap-[15vw]"
              style={{ x: xTransform }}
            >
              {timeline.map((node) => {
                // Determine active state manually or let CSS handle it via proximity.
                // For simplicity, we just render them clearly.
                const is2020 = node.year === "2020";
                
                return (
                  <div key={node.year} className="relative flex flex-col shrink-0 w-[300px] group">
                    <div className="h-[80px] flex items-end mb-8 relative">
                      {/* Node dot */}
                      <div className="absolute left-0 bottom-0 w-3 h-3 rounded-full bg-gold-dark translate-y-1.5 transition-colors duration-500" />
                      
                      <h3 className={`font-display font-bold text-6xl transition-colors duration-500 ${is2020 ? "text-gold italic" : "text-cream"}`}>
                        {node.year}
                      </h3>
                    </div>
                    <p className={`font-sans text-lg leading-relaxed transition-opacity duration-500 ${is2020 ? "text-gold-light/90" : "text-cream/70"}`}>
                      {node.description}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Vertical Timeline */}
      <Section tone="charcoal" className="py-24 lg:hidden relative overflow-hidden">
        <div className="container-site">
          <Reveal>
            <div className="flex items-center gap-4 mb-16">
              <span className="h-px w-8 bg-gold/50" />
              <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-light">
                The Journey
              </span>
            </div>
          </Reveal>
          
          <div className="relative pl-6">
            {/* Vertical Track */}
            <div className="absolute top-4 bottom-0 left-0 w-[1px] bg-gold/20" />
            
            <div className="flex flex-col gap-12">
              {timeline.map((node) => {
                const is2020 = node.year === "2020";
                return (
                  <TimelineMobileNode key={node.year} node={node} is2020={is2020} />
                );
              })}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function TimelineMobileNode({ node, is2020 }: { node: (typeof timeline)[0]; is2020: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  
  return (
    <div className="relative" ref={ref}>
      {/* Active Line Fill */}
      <motion.div 
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute -left-[24px] top-4 h-[calc(100%+48px)] w-[1px] bg-gold origin-top"
      />
      {/* Dot */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        className={`absolute -left-[29px] top-4 w-3 h-3 rounded-full ${is2020 ? "bg-gold" : "bg-gold-dark"}`}
      />
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      >
        <h3 className={`font-display text-4xl font-bold mb-3 ${is2020 ? "text-gold italic" : "text-cream"}`}>
          {node.year}
        </h3>
        <p className={`font-sans text-base leading-relaxed ${is2020 ? "text-gold-light/90" : "text-cream/70"}`}>
          {node.description}
        </p>
      </motion.div>
    </div>
  );
}

// ── Craft / Values ──────────────────────────────────────────────
function CraftSection() {
  return (
    <Section tone="base" className="py-24 lg:py-32">
      <div className="container-site flex flex-col gap-16">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gold/50" />
            <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-dark">
              What We Built
            </span>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {values.map((val, i) => (
            <Reveal key={val.title} delay={0.1 * i} className="flex flex-col gap-4">
              <h3 className="font-display text-3xl font-bold text-navy-deep">
                {val.title}
              </h3>
              <div className="w-8 h-[1px] bg-gold-dark/40" />
              <p className="font-sans text-lg text-text-slate leading-relaxed">
                {val.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ── People ──────────────────────────────────────────────────────
function PeopleSection() {
  return (
    <Section tone="panel" className="py-24 lg:py-32">
      <div className="container-site grid lg:grid-cols-2 gap-16 items-center">
        {/* Founder Image */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-navy-deep">
            <ClipReveal direction="up" delay={0.2} className="w-full h-full">
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-1000 ease-out hover:scale-[1.03]"
              />
            </ClipReveal>
          </div>
          <Reveal delay={0.4} className="mt-6 flex flex-col gap-1 text-center lg:text-left">
            <h3 className="font-display text-2xl font-bold text-navy-deep">{founder.name}</h3>
            <p className="font-sans text-sm uppercase tracking-widest text-gold-dark font-semibold">{founder.title}</p>
          </Reveal>
        </div>

        {/* The Crew / People Copy */}
        <div className="flex flex-col gap-8">
          <Reveal delay={0.2}>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gold/50" />
              <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-dark">
                The People
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-deep leading-tight">
              {aboutPeople.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="w-12 h-[1px] bg-gold-dark/40" />
          </Reveal>
          <Reveal delay={0.5}>
            <div className="flex flex-col gap-6">
              {aboutPeople.body.split("\n\n").map((para, j) => (
                <p key={j} className="font-sans text-lg text-text-slate leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

// ── CTA ─────────────────────────────────────────────────────────
function AboutCTASection() {
  return (
    <Section tone="stage" className="py-32 relative overflow-hidden text-center">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-stage-glow)" }} />
      <div className="container-site relative z-10 flex flex-col items-center gap-8 max-w-3xl mx-auto">
        <Reveal>
          <p className="font-display text-3xl md:text-4xl text-cream leading-tight">
            &quot;{aboutCTA.quote}&quot;
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="w-16 h-[2px] bg-gold rounded-full mx-auto" />
        </Reveal>
        <Reveal delay={0.3}>
          <Button href={aboutCTA.ctaHref} variant="primary" size="lg" className="mt-4">
            {aboutCTA.ctaLabel}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <OriginSection />
      <TimelineSection />
      <CraftSection />
      <PeopleSection />
      <AboutCTASection />
    </>
  );
}
