"use client";

import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";

export function RecognitionStrip() {
  return (
    <Section tone="panel" aria-label="Recognition" className="border-y border-gold/10 !py-12 bg-bg-muted">
      <div className="container-site flex justify-center text-center">
        <Reveal>
          <p className="font-sans text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-navy-deep/80">
            Furniture Partner — Bengaluru Wedding Fraternity Meet Up 4.0
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
