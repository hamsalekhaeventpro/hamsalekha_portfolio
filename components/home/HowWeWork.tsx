"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { processSteps } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";

export function HowWeWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px -10% 0px" });

  const lineDrawDuration = 2.0;
  const sequenceStartDelay = 0.6;
  const nodeInterval = lineDrawDuration / Math.max(1, processSteps.length - 1);

  return (
    <Section tone="panel" aria-label="How We Work">
      <div className="container-site" ref={containerRef}>
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-24">

          {/* Left Column: Intro */}
          <div className="lg:col-span-5 flex flex-col gap-8 self-start lg:sticky lg:top-32">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-gold-dark/40" />
                <span className="font-sans text-eyebrow uppercase text-gold-dark">
                  HOW WE WORK
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-col gap-5">
                <h2 className="font-display text-h2 font-bold text-navy-deep leading-[1.1]">
                  From first call to final strike.
                </h2>
                <p className="font-sans text-body text-text-slate max-w-sm">
                  Five stages, one team and no surprises on the day.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="pt-2">
              <Button href="/contact" variant="primary">
                START YOUR BRIEF
              </Button>
            </Reveal>
          </div>

          {/* Right Column: Timeline */}
          <div className="lg:col-span-7 mt-16 lg:mt-0 relative">
            {/* Background Track */}
            <div className="absolute left-[13px] md:left-[19px] top-4 bottom-8 w-[2px] bg-gold/15" />

            <motion.div
              className="absolute left-[13px] md:left-[19px] top-4 bottom-8 w-[2px] bg-gold origin-top"
              initial={prefersReducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
              animate={isInView || prefersReducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: lineDrawDuration, ease: "linear", delay: prefersReducedMotion ? 0 : sequenceStartDelay }}
            />

            <div className="flex flex-col">
              {processSteps.map((step, i) => {
                const nodeDelay = sequenceStartDelay + (i * nodeInterval);
                const isLast = i === processSteps.length - 1;

                return (
                  <div key={step.number} className="relative flex items-start gap-6 md:gap-10">
                    {/* Marker Wrapper */}
                    <div className="relative z-10 flex shrink-0 items-center justify-center w-7 h-7 md:w-10 md:h-10 bg-bg-panel mt-1">
                      {/* Number */}
                      <motion.span 
                        className="relative z-10 font-display text-lg md:text-2xl font-bold text-gold-dark"
                        initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0.4, scale: 0.9 }}
                        animate={isInView || prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0.4, scale: 0.9 }}
                        transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : nodeDelay, ease: "easeOut" }}
                      >
                        {step.number}
                      </motion.span>
                    </div>

                    {/* Text Content */}
                    <motion.div 
                      className={cn(
                        "flex flex-col gap-3 pt-1 w-full origin-left",
                        !isLast ? "pb-12 md:pb-16 border-b border-gold/15 mb-12 md:mb-16" : ""
                      )}
                      initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
                      animate={isInView || prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
                      transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : nodeDelay + 0.1, ease: "easeOut" }}
                    >
                      <h4 className="font-display text-h4 text-navy-deep font-bold">
                        {step.stage}
                      </h4>
                      <p className="font-sans text-body text-text-slate max-w-md">
                        {step.body}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}
