"use client";

import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";

export function RecognitionStrip() {
  return (
    <Section tone="base" aria-label="Industry Partnerships" className="border-y border-gold/20 !py-8 bg-cream/40">
      <div className="container-site flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-gold-dark/40" />
            <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.25em] text-gold-dark">
              Trusted Partner
            </span>
            <span className="w-6 h-px bg-gold-dark/40" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-deep/[0.04] border border-gold/20">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            <p className="font-sans text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-navy-deep">
              Furniture Partner, Bengaluru Wedding Fraternity Meet Up 4.0
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
