"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { processSteps } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function HowWeWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px -10% 0px" });
  const prefersReducedMotion = useReducedMotion();

  // Desktop step timings synchronized with a 2.2s line animation
  const stepTimings = [0.25, 0.60, 0.95, 1.30, 1.65];

  return (
    <section className="section-py bg-bg-panel" aria-label="How We Work" ref={containerRef}>
      <div className="container-site">
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-24">
          
          {/* Left Column: Intro */}
          <div className="lg:col-span-5 flex flex-col gap-8 self-start lg:sticky lg:top-32">
            <motion.div 
              className="flex items-center gap-4"
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={isInView || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="h-px w-8 bg-gold-dark/40" />
              <span className="font-sans text-[0.7rem] font-semibold tracking-[0.22em] uppercase text-gold-dark">
                HOW WE WORK
              </span>
            </motion.div>
            
            <div className="flex flex-col gap-5">
              <motion.h2
                className="font-display font-bold text-navy-deep leading-[1.1]"
                style={{ fontSize: "clamp(2.5rem, 4.5vw, 3.75rem)" }}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                animate={isInView || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: prefersReducedMotion ? 0 : 0.1, ease: "easeOut" }}
              >
                From first call to final strike.
              </motion.h2>
              
              <motion.p
                className="font-sans text-base md:text-lg text-text-slate leading-relaxed max-w-sm"
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                animate={isInView || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.2, ease: "easeOut" }}
              >
                Five stages, one team and no surprises on the day.
              </motion.p>
            </div>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={isInView || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.3, ease: "easeOut" }}
              className="pt-2"
            >
              <Button href="/contact" variant="primary">
                START YOUR BRIEF →
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Timeline */}
          <div className="lg:col-span-7 mt-16 lg:mt-0 relative">
            {/* Background Track */}
            <div className="absolute left-[13px] md:left-[19px] top-4 bottom-8 w-[2px] bg-gold/15" />
            
            {/* Animated Solid Gold Line */}
            <motion.div
              className="absolute left-[13px] md:left-[19px] top-4 bottom-8 w-[2px] bg-gold origin-top"
              initial={prefersReducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
              animate={isInView || prefersReducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 2.2, ease: "easeOut", delay: prefersReducedMotion ? 0 : 0.2 }}
            />

            <div className="flex flex-col">
              {processSteps.map((step, i) => {
                const delay = stepTimings[i];
                const isLast = i === processSteps.length - 1;

                return (
                  <div key={step.number} className="relative flex items-start gap-6 md:gap-10">
                    
                    {/* Marker Wrapper */}
                    <div className="relative z-10 flex shrink-0 items-center justify-center w-7 h-7 md:w-10 md:h-10 bg-bg-panel mt-1">
                      {/* Subtle active pulse */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gold/20 z-0"
                        initial={prefersReducedMotion ? { opacity: 0, scale: 1 } : { opacity: 0, scale: 1 }}
                        animate={isInView && !prefersReducedMotion ? { opacity: [0, 0.8, 0], scale: [1, 1.4, 1] } : { opacity: 0, scale: 1 }}
                        transition={{ duration: 1, delay: delay, ease: "easeOut" }}
                      />
                      {/* Number */}
                      <motion.span
                        className="relative z-10 font-display text-lg md:text-2xl font-bold transition-colors duration-500"
                        initial={prefersReducedMotion ? { color: "#C9A227" } : { color: "rgba(201,162,39,0.3)" }}
                        animate={isInView || prefersReducedMotion ? { color: "#C9A227" } : { color: "rgba(201,162,39,0.3)" }}
                        transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : delay }}
                      >
                        {step.number}
                      </motion.span>
                    </div>

                    {/* Text Content */}
                    <div className={cn(
                      "flex flex-col gap-3 pt-1 w-full",
                      !isLast ? "pb-12 md:pb-16 border-b border-gold/15 mb-12 md:mb-16" : ""
                    )}>
                      <motion.h4
                        className="font-display text-xl md:text-2xl text-navy-deep font-semibold"
                        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        animate={isInView || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : delay + 0.15, ease: "easeOut" }}
                      >
                        {step.stage}
                      </motion.h4>
                      <motion.p
                        className="font-sans text-sm md:text-base text-text-slate leading-relaxed max-w-md"
                        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        animate={isInView || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : delay + 0.25, ease: "easeOut" }}
                      >
                        {step.body}
                      </motion.p>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
