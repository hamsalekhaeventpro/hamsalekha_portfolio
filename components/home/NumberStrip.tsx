"use client";

import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { homeStats } from "@/lib/content";
import { staggerDelay } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function NumberStrip() {
  return (
    <Section tone="stage" aria-label="Scale statistics">
      <div className="container-site">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 lg:gap-y-0 lg:divide-x lg:divide-gold/15">
          {homeStats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={staggerDelay(i)}
              className={cn(
                "flex flex-col items-center text-center gap-3 px-2 sm:px-4",
                // Mobile/Tablet layout trick to center the 5th item elegantly
                i === 4 ? "col-span-2 md:col-span-1 md:col-start-2 lg:col-span-1 lg:col-start-auto" : ""
              )}
            >
              {/* Stat Value — Editorial serif, gold, one-line safe */}
              <p className="font-display text-[clamp(1.8rem,2.7vw,3rem)] font-medium text-gold leading-none tabular-nums whitespace-nowrap tracking-tight">
                <CountUp
                  to={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </p>
              
              {/* Gold divider micro-rule */}
              <span className="w-10 h-[1px] bg-gold/40 rounded-full" />
              
              {/* Label */}
              <p className="font-sans text-[0.65rem] md:text-[0.7rem] text-cream/70 font-medium tracking-[0.2em] uppercase whitespace-pre-line mt-1">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
