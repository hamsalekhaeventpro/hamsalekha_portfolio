"use client";

import { motion } from "framer-motion";
import { homeClosingCTA, microcopy } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function ClosingCTA() {
  return (
    <section
      className="section-py relative overflow-hidden bg-navy-deep"
      aria-label="Get in touch"
    >
      {/* Multi-layer glow — centred radial per Figma */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(92,138,201,0.14), transparent 68%)",
        }}
      />
      {/* Subtle warm rim at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(201,162,39,0.08), transparent 70%)",
        }}
      />

      {/* Gold top border per Figma */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="relative container-site flex flex-col items-center text-center gap-10">
        <RevealOnScroll className="flex flex-col items-center gap-6">
          {/* Eyebrow */}
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/40" />
            <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-gold-light">
              Let&apos;s build something extraordinary
            </span>
            <span className="h-px w-10 bg-gold/40" />
          </div>

          {/* Headline — very large per Figma closing CTA */}
          <h2
            className="font-display font-bold text-cream leading-[1.04]"
            style={{ fontSize: "clamp(2.75rem, 7vw, 6.5rem)" }}
          >
            {homeClosingCTA.headline}
          </h2>

          {/* Gold hairline rule */}
          <div className="w-20 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full" />

          <p className="font-sans text-lg text-cream/65 max-w-xl">
            {homeClosingCTA.subline}
          </p>

          {/* CTA buttons — side by side */}
          <div className="flex flex-wrap items-center justify-center gap-5 pt-2">
            <Button
              href={homeClosingCTA.ctaHref}
              variant="primary"
              size="lg"
              id="closing-cta"
            >
              {homeClosingCTA.cta}
            </Button>
            <Button
              href={homeClosingCTA.secondaryHref}
              variant="outline"
              size="lg"
              external
            >
              {homeClosingCTA.secondaryLabel}
            </Button>
          </div>
        </RevealOnScroll>

        {/* Quote */}
        <RevealOnScroll delay={0.25}>
          <p className="font-display text-base text-cream/35 italic mt-2">
            &ldquo;You see the magic. We set the stage for it.&rdquo;
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
