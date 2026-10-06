"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { CountUp } from "@/components/motion/CountUp";
import { Section } from "@/components/layout/Section";
import { homeStats } from "@/lib/content";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const EXPO = ease.expo;

export function NumberStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const rm = useReducedMotion();
  const animateState = rm ? "visible" : (inView ? "visible" : "hidden");

  return (
    <Section tone="stage" aria-label="Scale statistics">
      <div className="container-site" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 lg:gap-y-0 lg:divide-x lg:divide-gold/15">
          {homeStats.map((stat, i) => {
            const delayBase = i * 0.15;
            
            return (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col items-center text-center gap-3 px-2 sm:px-4",
                  i === 4 ? "col-span-2 md:col-span-1 md:col-start-2 lg:col-span-1 lg:col-start-auto" : ""
                )}
              >
                {/* Stat Value — Editorial serif, gold */}
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={animateState === "visible" ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.6, delay: delayBase, ease: EXPO }}
                  className="font-display text-[clamp(1.8rem,2.7vw,3rem)] font-medium text-gold leading-none tabular-nums whitespace-nowrap tracking-tight"
                >
                  <CountUp
                    to={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                </motion.p>
                
                {/* Gold divider micro-rule — draws from center */}
                <motion.span 
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={animateState === "visible" ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.6, delay: delayBase + 0.3, ease: EXPO }}
                  className="w-10 h-[1px] bg-gold/40 rounded-full origin-center" 
                />
                
                {/* Label — follows subtly */}
                <motion.p 
                  initial={{ opacity: 0, y: 5 }}
                  animate={animateState === "visible" ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                  transition={{ duration: 0.5, delay: delayBase + 0.45, ease: EXPO }}
                  className="font-sans text-[0.65rem] md:text-[0.7rem] text-cream/70 font-medium tracking-[0.2em] uppercase whitespace-pre-line mt-1"
                >
                  {stat.label}
                </motion.p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

