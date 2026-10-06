import type { Metadata } from "next";
import { howWeWorkHero, howWeWorkCTA } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ProcessTimeline } from "@/components/how-we-work/ProcessTimeline";

import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata("howWeWork", "/how-we-work");

export default function HowWeWorkPage() {
  return (
    <>
      {/* Hero — Figma work.svg style */}
      <section className="pt-36 pb-24 bg-navy-deep relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(201,162,39,0.12), transparent 65%)",
          }}
        />
        <div className="container-site relative z-10">
          <RevealOnScroll className="flex flex-col gap-5 max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold/50" />
              <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-gold-light">
                {howWeWorkHero.eyebrow}
              </span>
            </div>
            <h1
              className="font-display font-bold text-cream leading-[1.03]"
              style={{ fontSize: "clamp(2.75rem, 7vw, 6rem)" }}
            >
              {howWeWorkHero.headline}
            </h1>
            <div className="w-16 h-[2px] bg-gradient-to-r from-gold to-gold-light rounded-full" />
            <p className="font-sans text-lg text-cream/70 max-w-xl">
              {howWeWorkHero.subline}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <ProcessTimeline />

      {/* Closing CTA */}
      <section className="section-py bg-navy-deep relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{ background: "radial-gradient(circle at 50% 30%, rgba(201,162,39,0.10), transparent 70%)" }}
        />
        <div className="container-site relative z-10 flex flex-col items-center text-center gap-8 max-w-2xl mx-auto">
          <RevealOnScroll className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold/40" />
              <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-gold-light">
                Ready to begin?
              </span>
              <span className="h-px w-10 bg-gold/40" />
            </div>
            <h2 className="font-display text-h1 font-bold text-cream">
              {howWeWorkCTA.headline}
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full" />
            <Button href={howWeWorkCTA.ctaHref} variant="primary" size="lg">
              {howWeWorkCTA.ctaLabel}
            </Button>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
