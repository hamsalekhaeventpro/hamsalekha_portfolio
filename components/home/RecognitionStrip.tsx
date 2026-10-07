"use client";

import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";

export function RecognitionStrip() {
  return (
    <Section tone="base" aria-label="Recognition" className="border-y border-gold/10 !py-12">
      <div className="container-site flex flex-col items-center justify-center text-center gap-4">
        <Reveal>
          <span className="block w-12 h-px bg-gold/50 mx-auto" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-sans text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-navy-deep/80">
            Furniture Partner — Bengaluru Wedding Fraternity Meet Up 4.0
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
