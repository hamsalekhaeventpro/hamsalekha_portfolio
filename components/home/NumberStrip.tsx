"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { homeStats } from "@/lib/content";
import { cn } from "@/lib/utils";

export function NumberStrip() {
  return (
    <section
      className="bg-navy-deep py-12 lg:py-16 border-t border-white/5"
      aria-label="Scale statistics"
    >
      <div className="container-site">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 lg:gap-y-0 lg:divide-x lg:divide-gold/15">
          {homeStats.map((stat, i) => (
            <RevealOnScroll
              key={stat.label}
              delay={i * 0.1}
              className={cn(
                "flex flex-col items-center text-center gap-3 px-2 sm:px-4",
                // Mobile/Tablet layout trick to center the 5th item elegantly
                i === 4 ? "col-span-2 md:col-span-1 md:col-start-2 lg:col-span-1 lg:col-start-auto" : ""
              )}
            >
              {/* Stat Value — Editorial serif, gold, one-line safe */}
              <p className="font-display text-[clamp(1.8rem,2.7vw,3rem)] font-medium text-gold leading-none tabular-nums whitespace-nowrap tracking-tight">
                <AnimatedCounter
                  from={0}
                  to={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  duration={2.5}
                />
              </p>
              
              {/* Gold divider micro-rule */}
              <span className="w-10 h-[1px] bg-gold/40 rounded-full" />
              
              {/* Label */}
              <p className="font-sans text-[0.65rem] md:text-[0.7rem] text-cream/70 font-medium tracking-[0.2em] uppercase">
                {stat.label}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
