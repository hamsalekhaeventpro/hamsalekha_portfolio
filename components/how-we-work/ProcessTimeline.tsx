"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { processSteps } from "@/lib/content";

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px -10% 0px" });
  const rm = useReducedMotion();

  const lineDrawDuration = 1.5;
  const nodeDelay = 0.5;

  return (
    <div ref={containerRef} className="flex flex-col">
      {/* Desktop horizontal process strip */}
      <section className="bg-panel border-y border-gold/15 py-10 hidden md:block">
        <div className="container-site">
          <div className="flex flex-row items-center">
            {processSteps.map((step, i) => {
              const delay = rm ? 0 : nodeDelay + i * 0.3;
              return (
                <div key={step.number} className="flex flex-row items-center flex-1 min-w-0">
                  <motion.div
                    className="flex flex-col items-center text-center px-4 flex-1"
                    initial={{ opacity: rm ? 1 : 0, y: rm ? 0 : 10 }}
                    animate={isInView || rm ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay, ease: "easeOut" }}
                  >
                    <span className="font-display text-3xl font-bold text-gold leading-none">
                      {step.number}
                    </span>
                    <span className="font-sans text-[0.7rem] tracking-[0.15em] text-text-slate mt-2 uppercase font-semibold whitespace-nowrap">
                      {step.stage}
                    </span>
                  </motion.div>
                  {i < processSteps.length - 1 && (
                    <div className="relative h-px flex-1">
                      <div className="absolute inset-0 bg-gold/10" />
                      <motion.div
                        className="absolute inset-0 bg-gold origin-left"
                        initial={{ scaleX: rm ? 1 : 0 }}
                        animate={isInView || rm ? { scaleX: 1 } : {}}
                        transition={{ duration: lineDrawDuration / processSteps.length, delay, ease: "linear" }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vertical editorial layout */}
      <section className="section-py bg-base">
        <div className="container-site max-w-4xl flex flex-col gap-0 relative">
          <div className="absolute left-[27px] top-[40px] bottom-16 w-px bg-gold/10 hidden md:block" />
          <motion.div
            className="absolute left-[27px] top-[40px] bottom-16 w-px bg-gold origin-top hidden md:block"
            initial={{ scaleY: rm ? 1 : 0 }}
            animate={isInView || rm ? { scaleY: 1 } : {}}
            transition={{ duration: lineDrawDuration, delay: nodeDelay, ease: "linear" }}
          />

          <div className="absolute left-[27px] top-[40px] bottom-16 w-px bg-gold/10 block md:hidden" />
          <motion.div
            className="absolute left-[27px] top-[40px] bottom-16 w-px bg-gold origin-top block md:hidden"
            initial={{ scaleY: rm ? 1 : 0 }}
            animate={isInView || rm ? { scaleY: 1 } : {}}
            transition={{ duration: lineDrawDuration, delay: nodeDelay, ease: "linear" }}
          />

          {processSteps.map((step, i) => {
            const delay = rm ? 0 : nodeDelay + i * (lineDrawDuration / processSteps.length);
            return (
              <div key={step.number} className="relative flex gap-10 pb-16 last:pb-0">
                {/* Node */}
                <motion.div
                  className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-gold/50 bg-base flex items-center justify-center z-10 transition duration-300"
                  initial={{ borderColor: "rgba(201,162,39,0.3)" }}
                  animate={isInView || rm ? { borderColor: "rgba(201,162,39,1)" } : {}}
                  transition={{ duration: 0.4, delay }}
                >
                  <span className="font-display text-xl font-bold text-gold-dark">
                    {step.number}
                  </span>
                </motion.div>
                {/* Content */}
                <motion.div
                  className="flex flex-col gap-3 pt-3"
                  initial={{ opacity: rm ? 1 : 0, y: rm ? 0 : 15 }}
                  animate={isInView || rm ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: delay + 0.2, ease: "easeOut" }}
                >
                  <h2 className="font-display text-2xl font-bold text-navy-deep">
                    {step.stage}
                  </h2>
                  <div className="w-8 h-[2px] bg-gold/40 rounded-full" />
                  <p className="font-sans text-body text-text-slate leading-relaxed max-w-xl">
                    {step.body}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
