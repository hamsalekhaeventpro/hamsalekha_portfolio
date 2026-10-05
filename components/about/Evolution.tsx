"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { timeline } from "@/lib/content";
import { Section } from "@/components/layout/Section";

export function Evolution() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px -10% 0px" });
  const prefersReducedMotion = useReducedMotion();

  // Animation constants
  const lineDrawDuration = 2.5;
  const sequenceStartDelay = 0.8;
  const nodeInterval = lineDrawDuration / Math.max(1, timeline.length - 1);

  return (
    <Section tone="base" aria-label="Evolution Timeline">
      <div className="container-site mb-16" ref={containerRef}>
        
        {/* Custom Staggered Header for Evolution */}
        <div className="flex flex-col gap-4">
          <motion.div 
            className="flex items-center gap-4"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={isInView || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="h-px w-8 bg-gold-dark/40" />
            <span className="font-sans text-eyebrow uppercase text-gold-dark">
              EVOLUTION
            </span>
          </motion.div>
          <motion.h2
            className="font-display font-bold text-h2 text-navy-deep leading-[1.1]"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={isInView || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: prefersReducedMotion ? 0 : 0.1, ease: "easeOut" }}
          >
            Two decades, one step at a time.
          </motion.h2>
        </div>
      </div>

      <div className="container-site relative">
        {/* Faint vertical line background */}
        <div className="absolute left-[4px] md:left-[12px] top-3 bottom-0 w-[2px] bg-gold/10" />

        {/* Animated vertical gold line */}
        <motion.div
          className="absolute left-[4px] md:left-[12px] top-3 bottom-0 w-[2px] bg-gold origin-top z-10"
          initial={prefersReducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
          animate={isInView || prefersReducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: lineDrawDuration, ease: "linear", delay: prefersReducedMotion ? 0 : sequenceStartDelay }}
        />

        <div className="flex flex-col gap-0">
          {timeline.map((entry, i) => {
            const nodeDelay = sequenceStartDelay + (i * nodeInterval);
            
            return (
              <div key={entry.year} className="relative pl-16 md:pl-20 pb-12 group">
                
                {/* Horizontal connector (Faint background) */}
                <div className="absolute top-[11px] left-[4px] md:left-[12px] w-[16px] h-[2px] bg-gold/10" />
                
                {/* Horizontal connector (Animated fill) */}
                <motion.div 
                  className="absolute top-[11px] left-[4px] md:left-[12px] w-[16px] h-[2px] bg-gold origin-left z-10"
                  initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
                  animate={isInView || prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.3, delay: prefersReducedMotion ? 0 : nodeDelay }}
                />

                {/* Glow pulse */}
                <motion.div
                  className="absolute left-[16px] md:left-[24px] top-0 w-6 h-6 rounded-full bg-gold/20 z-0"
                  initial={prefersReducedMotion ? { opacity: 0, scale: 1 } : { opacity: 0, scale: 1 }}
                  animate={isInView && !prefersReducedMotion ? { opacity: [0, 0.25, 0], scale: [1, 1.10, 1] } : { opacity: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : nodeDelay + 0.1, ease: "easeOut" }}
                />

                {/* Gold dot node */}
                <motion.div 
                  className="absolute left-[20px] md:left-[28px] top-1 w-4 h-4 rounded-full bg-bg-base border-2 z-20 transition-colors duration-300"
                  initial={prefersReducedMotion ? { borderColor: "rgba(201,162,39,1)", backgroundColor: "rgba(201,162,39,0.1)" } : { borderColor: "rgba(201,162,39,0.3)", backgroundColor: "rgba(251,250,248,1)" }}
                  animate={isInView || prefersReducedMotion ? { 
                    borderColor: "rgba(201,162,39,1)", 
                    backgroundColor: "rgba(201,162,39,0.1)"
                  } : { 
                    borderColor: "rgba(201,162,39,0.3)",
                    backgroundColor: "rgba(251,250,248,1)"
                  }}
                  transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : nodeDelay + 0.1 }}
                />

                {/* Year in gold */}
                <motion.span 
                  className="font-display text-h4 font-bold text-gold-dark block mb-1 origin-left"
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 12 }}
                  animate={isInView || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 12 }}
                  transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : nodeDelay + 0.15, ease: "easeOut" }}
                >
                  {entry.year}
                </motion.span>
                
                {/* Description */}
                <motion.p 
                  className="font-sans text-body text-text-slate leading-relaxed max-w-xl"
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  animate={isInView || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : nodeDelay + 0.3, ease: "easeOut" }}
                >
                  {entry.description}
                </motion.p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
