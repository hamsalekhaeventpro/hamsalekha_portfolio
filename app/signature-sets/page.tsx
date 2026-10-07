"use client";

import Image from "next/image";
import { signatureSets, customSetCTA } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ease, duration } from "@/lib/motion";

const EXPO = ease.expo;

function GlassHouseSection() {
  const set = signatureSets[0];
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const rm = useReducedMotion();
  const animateState = rm ? "visible" : (isInView ? "visible" : "hidden");

  return (
    <Section tone="stage" className="overflow-hidden">
      <div className="container-site" ref={ref}>
        <div className="flex flex-col gap-12 lg:gap-16">
          {/* Large Architectural Image */}
          <div className="w-full relative aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] bg-navy-deep group">
            <motion.div
              initial={rm ? {} : { clipPath: "inset(0 100% 0 0)" }}
              animate={animateState === "visible" ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: duration.hero, ease: EXPO }}
              className="absolute inset-0 overflow-hidden"
            >
              <Image
                src={set.image}
                alt={set.imageAlt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                sizes="100vw"
              />
              {/* Subtle lighting sweep fallback for Glass House */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold/10 to-transparent w-[200%] h-[200%] origin-bottom-left pointer-events-none"
                initial={{ x: "-100%", y: "100%" }}
                animate={animateState === "visible" ? { x: "100%", y: "-100%" } : { x: "-100%", y: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut", delay: 0.8 }}
              />
              <div className="absolute inset-0 border border-gold/15 pointer-events-none" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-5 flex flex-col gap-5">
              <Reveal delay={0.2}>
                <div className="flex items-center gap-4">
                  <span className="h-px w-8 bg-gold/50" />
                  <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-light">
                    {set.eyebrow}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <h2 className="font-display font-bold text-5xl md:text-6xl text-cream leading-tight">
                  {set.title}
                </h2>
              </Reveal>
              {set.launched && (
                <Reveal delay={0.35}>
                  <span className="inline-flex px-4 py-1.5 rounded-[2px] border border-gold/30 bg-gold/10 font-sans text-[0.65rem] uppercase text-gold-light tracking-widest mt-2 self-start">
                    {set.launched}
                  </span>
                </Reveal>
              )}
              <Reveal delay={0.4}>
                <div className="w-12 h-[1px] bg-gold/40 my-2" />
              </Reveal>
              <Reveal delay={0.45}>
                <h3 className="font-display text-2xl font-bold text-cream/90">
                  {set.headline}
                </h3>
              </Reveal>
            </div>
            
            <div className="lg:col-span-7 flex flex-col gap-8 lg:pl-12">
              <Reveal delay={0.5}>
                <div className="flex flex-col gap-4">
                  {set.body.split("\n\n").map((para, j) => (
                    <p key={j} className="font-sans text-lg leading-relaxed text-cream/70">
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>
              
              <Reveal delay={0.6}>
                <div className="flex flex-col md:flex-row gap-12 mt-4">
                  {set.bestFor && (
                    <div className="flex flex-col gap-4">
                      <p className="font-sans text-[0.65rem] uppercase text-gold-light font-bold tracking-[0.2em]">
                        Best for
                      </p>
                      <ul className="flex flex-col gap-2">
                        {set.bestFor.map((item) => (
                          <li key={item} className="font-sans text-sm text-cream/80 flex items-center gap-3">
                            <span className="w-1 h-1 bg-gold rounded-full" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {set.bullets && (
                    <div className="flex flex-col gap-4 max-w-sm">
                      <p className="font-sans text-[0.65rem] uppercase text-gold-light font-bold tracking-[0.2em]">
                        Comes with
                      </p>
                      <ul className="flex flex-col gap-3">
                        {set.bullets.map((b) => (
                          <li key={b} className="font-sans text-sm text-cream/80 flex items-start gap-3">
                            <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0 mt-1.5" />
                            <span className="leading-relaxed">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Reveal>

              <Reveal delay={0.7}>
                <Button href={set.ctaHref} variant="primary" size="lg" className="mt-4 self-start">
                  {set.ctaLabel}
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function MoonGateSection() {
  const set = signatureSets[1];
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const rm = useReducedMotion();
  const animateState = rm ? "visible" : (isInView ? "visible" : "hidden");

  return (
    <Section tone="stage" className="overflow-hidden relative">
      <div className="container-site" ref={ref}>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-5 order-last lg:order-first">
            <Reveal delay={0.2}>
              <div className="flex items-center justify-center lg:justify-start gap-4 w-full">
                <span className="h-px w-8 bg-gold/50" />
                <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-light">
                  {set.eyebrow}
                </span>
                <span className="h-px w-8 bg-gold/50 lg:hidden" />
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <h2 className="font-display font-bold text-5xl md:text-6xl text-cream leading-tight">
                {set.title}
              </h2>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="w-12 h-[1px] bg-gold/40 my-2 mx-auto lg:mx-0" />
            </Reveal>
            <Reveal delay={0.45}>
              <h3 className="font-display text-2xl font-bold text-cream/90">
                {set.headline}
              </h3>
            </Reveal>
            <Reveal delay={0.5}>
              <div className="flex flex-col gap-4">
                {set.body.split("\n\n").map((para, j) => (
                  <p key={j} className="font-sans text-lg leading-relaxed text-cream/70 max-w-md mx-auto lg:mx-0">
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="flex flex-col items-center lg:items-start gap-4 mt-4 w-full">
                {set.bestFor && (
                  <div className="flex flex-col items-center lg:items-start gap-3 w-full">
                    <p className="font-sans text-[0.65rem] uppercase text-gold-light font-bold tracking-[0.2em]">
                      Best for
                    </p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 max-w-sm">
                      {set.bestFor.map((item) => (
                        <span key={item} className="font-sans text-xs px-4 py-2 border border-gold/20 text-cream/80 bg-navy-mid/30">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.7}>
              <Button href={set.ctaHref} variant="outline" size="md" className="mt-6 border-gold/40 text-cream hover:bg-gold/10 hover:border-gold/70">
                {set.ctaLabel}
              </Button>
            </Reveal>
          </div>

          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-square p-4">
              <motion.div
                initial={rm ? {} : { clipPath: "circle(0% at 50% 50%)", scale: 0.9, opacity: 0 }}
                animate={animateState === "visible" ? { clipPath: "circle(50% at 50% 50%)", scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1.4, ease: EXPO }}
                className="w-full h-full relative rounded-full overflow-hidden border border-gold/20 group"
              >
                <Image
                  src={set.image}
                  alt={set.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_80px_rgba(11,31,58,0.7)] pointer-events-none" />
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}

export default function SignatureSetsPage() {
  return (
    <>
      <Section tone="stage" className="pt-36 pb-20 overflow-hidden relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-stage-glow)" }}
        />
        <div className="container-site relative z-10 flex flex-col items-center text-center gap-6">
          <Reveal delay={0.1}>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gold/50" />
              <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-light">
                Signature Sets
              </span>
              <span className="h-px w-8 bg-gold/50" />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="font-display font-bold text-hero text-cream leading-tight">
              Sets you won&apos;t find<br />anywhere else.
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="w-12 h-[1px] bg-gold/40 mx-auto" />
          </Reveal>
          <Reveal delay={0.4}>
            <p className="font-sans text-lg text-cream/70 max-w-xl mx-auto">
              Designed and built by Hamsalekha, our signature sets turn a venue
              into a destination.
            </p>
          </Reveal>
        </div>
      </Section>

      <GlassHouseSection />
      
      {/* Subtle gold separator between the two dark sets */}
      <div className="w-full h-px bg-gold/10" />
      
      <MoonGateSection />

      <Section tone="base" className="relative overflow-hidden">
        <div className="container-site relative z-10 flex flex-col items-center text-center gap-7 max-w-2xl mx-auto">
          <Reveal className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gold/40" />
              <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-dark">
                Custom Sets
              </span>
              <span className="h-px w-8 bg-gold/40" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-deep">
              {customSetCTA.headline}
            </h2>
            <div className="w-12 h-[1px] bg-gold/40 mx-auto" />
            <p className="font-sans text-lg text-text-slate">
              {customSetCTA.body}
            </p>
            <Button href={customSetCTA.ctaHref} variant="outline" size="md" className="mt-4">
              {customSetCTA.ctaLabel}
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
