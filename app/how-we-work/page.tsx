import type { Metadata } from "next";
import { seoMap, howWeWorkHero, processSteps, howWeWorkCTA } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata("howWeWork", "/how-we-work");

export default function HowWeWorkPage() {
  return (
    <>
      {/* Hero — Figma work.svg style */}
      <section className="pt-36 pb-24 bg-navy-deep relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(92,138,201,0.15), transparent 65%)",
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

      {/* Stage labels strip — dashed connector per Figma */}
      <section className="bg-bg-panel border-y border-gold/15 py-10">
        <div className="container-site">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0">
            {processSteps.map((step, i) => (
              <div
                key={step.number}
                className="flex flex-col md:flex-row items-center flex-1 min-w-0"
              >
                <div className="flex flex-col items-center text-center px-4 flex-1">
                  <span className="font-display text-3xl font-bold text-gold leading-none">
                    {step.number}
                  </span>
                  <span className="font-sans text-[0.7rem] tracking-[0.15em] text-text-slate mt-2 uppercase font-semibold whitespace-nowrap">
                    {step.stage}
                  </span>
                </div>
                {i < processSteps.length - 1 && (
                  <>
                    {/* Desktop dashed connector */}
                    <div
                      className="h-px flex-1 hidden md:block"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(90deg, #C9A227 0px, #C9A227 6px, transparent 6px, transparent 16px)",
                      }}
                    />
                    {/* Mobile vertical connector */}
                    <div
                      className="w-px h-6 block md:hidden"
                      style={{ background: "rgba(201, 162, 39, 0.3)" }}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process steps — large editorial layout */}
      <section className="section-py bg-bg-base">
        <div className="container-site max-w-4xl flex flex-col gap-0">
          {processSteps.map((step, i) => (
            <RevealOnScroll
              key={step.number}
              delay={i * 0.08}
              className="relative flex gap-10 pb-16 last:pb-0"
            >
              {/* Vertical connector line */}
              {i < processSteps.length - 1 && (
                <div className="absolute left-[27px] top-16 bottom-0 w-px bg-gold/20" />
              )}
              {/* Circle with number */}
              <div className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-gold/50 bg-gold/8 flex items-center justify-center z-10 hover:border-gold hover:shadow-gold-glow transition-all duration-300">
                <span className="font-display text-xl font-bold text-gold-dark">
                  {step.number}
                </span>
              </div>
              {/* Content */}
              <div className="flex flex-col gap-3 pt-3">
                <h2 className="font-display text-2xl font-bold text-navy-deep">
                  {step.stage}
                </h2>
                {/* Gold rule */}
                <div className="w-8 h-[2px] bg-gold/40 rounded-full" />
                <p className="font-sans text-body text-text-slate leading-relaxed max-w-xl">
                  {step.body}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-py bg-navy-deep relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{ background: "var(--gradient-radial-glow)" }}
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
