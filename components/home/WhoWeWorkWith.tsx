"use client";

import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/lib/motion";
import { whoWeWorkWith } from "@/lib/content";

export function WhoWeWorkWith() {
  return (
    <Section tone="panel" aria-label="Who we work with">
      <div className="container-site flex flex-col gap-12 lg:gap-20">
        <Reveal>
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gold/50" />
              <span className="font-sans text-[0.7rem] tracking-[0.2em] uppercase font-semibold text-gold-dark">
                WHO WE WORK WITH
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy-deep leading-tight">
              Built for everyone who builds events.
            </h2>
          </div>
        </Reveal>
        
        {/* Minimal text-based grid — calm editorial spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {whoWeWorkWith.map((item, i) => (
            <Reveal
              key={item.label}
              delay={staggerDelay(i) + 0.2}
              className="flex flex-col gap-3"
            >
              {/* Subtle line instead of icon */}
              <span className="w-6 h-[2px] bg-gold-dark/40 mb-2" />
              
              <h3 className="font-display text-xl font-bold text-navy-deep">
                {item.label}
              </h3>
              
              <p className="font-sans text-base text-text-slate leading-relaxed">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
