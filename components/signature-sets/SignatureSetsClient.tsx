"use client";

import { signatureSets, customSetCTA } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { EditorialPlaceholder } from "@/components/ui/EditorialPlaceholder";

// ── 1. THE GLASS HOUSE (PRIMARY VISUAL EXPERIENCE) ─────────────────
function GlassHouseSection() {
  const set = signatureSets[0];

  return (
    <Section id="glass-house" tone="stage" className="overflow-hidden scroll-mt-20">
      <div className="container-site">
        <div className="flex flex-col gap-12 lg:gap-16">
          {/* Large Architectural Image Placeholder */}
          <div className="w-full relative aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9]">
            <Reveal delay={0.1}>
              {/* TODO: Needs source verification or named award/evidence for claim: South India's first-of-its-kind glass theme set */}
              <EditorialPlaceholder
                aspectRatio="aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9]"
                tone="dark"
                contextLabel="GLASS HOUSE"
                caption="The Glass House · Signature Architecture"
                subline="South India's first-of-its-kind glass theme set · 2026"
                className="w-full shadow-2xl"
              />
            </Reveal>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-5 flex flex-col gap-5">
              <Reveal delay={0.2}>
                <div className="flex items-center gap-4">
                  <span className="h-px w-8 bg-gold/50" />
                  <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-light">
                    {set.eyebrow}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <h2 className="font-display font-bold text-5xl md:text-6xl text-cream leading-tight">
                  {set.title}
                </h2>
              </Reveal>
              {set.launched && (
                <Reveal delay={0.35}>
                  <span className="inline-flex px-4 py-1.5 rounded-[2px] border border-gold/30 bg-gold/10 font-sans text-[0.65rem] uppercase text-gold-light tracking-widest mt-2 self-start font-bold">
                    {set.launched}
                  </span>
                </Reveal>
              )}
              <Reveal delay={0.4}>
                <div className="w-12 h-[1px] bg-gold/40 my-2" />
              </Reveal>
              <Reveal delay={0.45}>
                <h3 className="font-display italic text-2xl font-bold text-gold-light">
                  {set.headline}
                </h3>
              </Reveal>
            </div>
            
            <div className="lg:col-span-7 flex flex-col gap-8 lg:pl-12">
              <Reveal delay={0.5}>
                <div className="flex flex-col gap-4">
                  {set.body.split("\n\n").map((para, j) => (
                    <p key={j} className="font-sans text-lg leading-relaxed text-cream/75">
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>
              
              <Reveal delay={0.6}>
                <div className="grid sm:grid-cols-2 gap-8 pt-4 border-t border-gold/15">
                  {set.bestFor && (
                    <div className="flex flex-col gap-4">
                      <p className="font-sans text-[0.65rem] uppercase text-gold-light font-bold tracking-[0.2em]">
                        Best for
                      </p>
                      <ul className="flex flex-col gap-2.5">
                        {set.bestFor.map((item) => (
                          <li key={item} className="font-sans text-sm text-cream/80 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {set.comesWith && (
                    <div className="flex flex-col gap-4">
                      <p className="font-sans text-[0.65rem] uppercase text-gold-light font-bold tracking-[0.2em]">
                        Comes with
                      </p>
                      <ul className="flex flex-col gap-3">
                        {set.comesWith.map((item) => (
                          <li key={item} className="font-sans text-sm text-cream/80 flex items-start gap-3">
                            <span className="w-1.5 h-1.5 bg-gold-light rounded-full shrink-0 mt-1.5" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Reveal>

              <Reveal delay={0.7}>
                <Button href={set.ctaHref} variant="primary" size="lg" className="mt-4 self-start">
                  {set.ctaLabel}
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── 2. MOONGATE (CIRCULAR ARCHITECTURAL TREATMENT) ─────────────────
function MoonGateSection() {
  const set = signatureSets[1];

  return (
    <Section id="moongate" tone="stage" className="overflow-hidden relative py-24 lg:py-32 scroll-mt-20">
      <div className="container-site">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Narrative */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-5 order-last lg:order-first">
            <Reveal delay={0.2}>
              <div className="flex items-center justify-center lg:justify-start gap-4 w-full">
                <span className="h-px w-8 bg-gold/50" />
                <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-light">
                  {set.eyebrow}
                </span>
                <span className="h-px w-8 bg-gold/50 lg:hidden" />
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <h2 className="font-display font-bold text-5xl md:text-6xl text-cream leading-tight">
                {set.title}
              </h2>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="w-12 h-[1px] bg-gold/40 my-2 mx-auto lg:mx-0" />
            </Reveal>
            <Reveal delay={0.45}>
              <h3 className="font-display italic text-2xl font-bold text-gold-light">
                {set.headline}
              </h3>
            </Reveal>
            <Reveal delay={0.5}>
              <p className="font-sans text-lg leading-relaxed text-cream/75 max-w-md mx-auto lg:mx-0">
                {set.body}
              </p>
            </Reveal>

            {/* MoonGate Capabilities */}
            {set.bullets && (
              <Reveal delay={0.6}>
                <div className="flex flex-col items-center lg:items-start gap-3 mt-4 w-full">
                  <p className="font-sans text-[0.65rem] uppercase text-gold-light font-bold tracking-[0.2em]">
                    Key Capabilities
                  </p>
                  <ul className="flex flex-col gap-2.5 text-left max-w-md">
                    {set.bullets.map((b) => (
                      <li key={b} className="font-sans text-sm text-cream/80 flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0 mt-1.5" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.7}>
              <Button href={set.ctaHref} variant="outline" size="md" className="mt-6 border-gold/40 text-cream hover:bg-gold/10 hover:border-gold/70">
                {set.ctaLabel}
              </Button>
            </Reveal>
          </div>

          {/* MoonGate Circular Architectural Placeholder (Mobile First) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end order-first lg:order-last w-full">
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-square p-2 sm:p-4">
              <Reveal delay={0.1}>
                <EditorialPlaceholder
                  aspectRatio="aspect-square"
                  tone="dark"
                  circular={true}
                  contextLabel="MOONGATE"
                  caption="The MoonGate Signature Set"
                  subline="Circular architectural arch with integrated illumination · 2025"
                  className="w-full shadow-2xl"
                />
              </Reveal>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}

// ── 3. CUSTOM SETS (EDITORIAL CLOSING CONCEPT) ────────────────────
function CustomSetsSection() {
  return (
    <Section tone="base" className="relative overflow-hidden py-24 lg:py-32 border-t border-navy-deep/10">
      <div className="container-site relative z-10 flex flex-col items-center text-center gap-7 max-w-2xl mx-auto">
        <Reveal className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gold-dark/40" />
            <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-dark">
              CUSTOM COMMISSIONS
            </span>
            <span className="h-px w-8 bg-gold-dark/40" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-deep">
            {customSetCTA.headline}
          </h2>
          <div className="w-12 h-[1px] bg-gold-dark/40 mx-auto" />
          <p className="font-sans text-lg text-text-slate leading-relaxed">
            {customSetCTA.body}
          </p>
          <Button href={customSetCTA.ctaHref} variant="outline" size="md" className="mt-4">
            {customSetCTA.ctaLabel}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}

export function SignatureSetsClient() {
  return (
    <>
      {/* HERO */}
      <Section tone="stage" className="pt-36 pb-20 overflow-hidden relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-stage-glow)" }}
        />
        <div className="container-site relative z-10 flex flex-col items-center text-center gap-6">
          <Reveal delay={0.1}>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gold/50" />
              <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-light">
                SIGNATURE SETS
              </span>
              <span className="h-px w-8 bg-gold/50" />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="font-display font-bold text-hero text-cream leading-tight">
              Sets you won&apos;t find<br />anywhere else.
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="w-12 h-[1px] bg-gold/40 mx-auto" />
          </Reveal>
          <Reveal delay={0.4}>
            <p className="font-sans text-lg text-cream/70 max-w-xl mx-auto leading-relaxed">
              Designed and built by Hamsalekha, our signature sets turn a venue
              into a destination.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 1. GLASS HOUSE */}
      <GlassHouseSection />
      
      <div className="w-full h-px bg-gold/15" />
      
      {/* 2. MOONGATE */}
      <MoonGateSection />

      {/* 3. CUSTOM SETS */}
      <CustomSetsSection />
    </>
  );
}
