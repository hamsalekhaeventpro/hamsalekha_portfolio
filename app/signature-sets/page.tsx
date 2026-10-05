import type { Metadata } from "next";
import Image from "next/image";
import { signatureSets, customSetCTA } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { LightsUp } from "@/components/motion/LightsUp";
import { DayNightCrossfade } from "@/components/motion/DayNightCrossfade";
import { Section } from "@/components/layout/Section";

import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata("signatureSets", "/signature-sets");

export default function SignatureSetsPage() {
  return (
    <>
      {/* Hero */}
      <Section tone="stage" className="pt-36 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 25% 50%, rgba(92,138,201,0.14), transparent 60%)",
          }}
        />
        <div className="container-site relative z-10">
          <Reveal className="flex flex-col gap-5 max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold/50" />
              <span className="font-sans text-eyebrow uppercase text-gold-light">
                Signature Sets
              </span>
            </div>
            <h1 className="font-display font-bold text-hero text-cream leading-[1.03]">
              Sets you won&apos;t find anywhere else.
            </h1>
            <div className="w-16 h-[2px] bg-gradient-to-r from-gold to-gold-light rounded-full" />
            <p className="font-sans text-body text-cream/70 max-w-xl">
              Designed and built by Hamsalekha, our signature sets turn a venue
              into a destination.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Signature set blocks */}
      {signatureSets.map((set, i) => {
        const isDark = i === 0;
        return (
          <Section
            key={set.title}
            tone={isDark ? "stage" : "base"}
            id={set.title.toLowerCase().replace(/\s/g, "-")}
            className="relative overflow-hidden"
          >
            {isDark && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "var(--gradient-radial-glow)" }}
              />
            )}

            <div className="relative container-site grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image */}
              <Reveal
                className={`relative h-[480px] lg:h-[720px] rounded-xl overflow-hidden shadow-2xl ${
                  i % 2 !== 0 ? "lg:order-last" : ""
                }`}
              >
                {i === 0 ? (
                  <DayNightCrossfade
                    dayImage={set.image} // TODO: Replace with day image
                    nightImage={set.image}
                    alt={set.imageAlt}
                  />
                ) : (
                  <LightsUp trigger="view">
                    <Image
                      src={set.image}
                      alt={set.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </LightsUp>
                )}
              </Reveal>

              {/* Content */}
              <Reveal
                delay={0.12}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-4">
                  <span className="h-px w-8 bg-gold/50" />
                  <span
                    className={`font-sans text-eyebrow uppercase ${
                      isDark ? "text-gold-light" : "text-gold-dark"
                    }`}
                  >
                    {set.eyebrow}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className={`font-display font-bold text-h2 leading-[1.04] ${
                    isDark ? "text-cream" : "text-navy-deep"
                  }`}
                >
                  {set.title}
                </h2>

                {set.launched && (
                  <span
                    className={`inline-flex px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 font-sans text-eyebrow uppercase ${
                      isDark ? "text-gold-light" : "text-gold-dark"
                    }`}
                  >
                    {set.launched}
                  </span>
                )}

                {/* Gold hairline */}
                <div className="w-12 h-[2px] bg-gradient-to-r from-gold to-gold-light rounded-full" />

                {/* Headline / Sub-heading */}
                <h3
                  className={`font-display text-h4 font-bold ${
                    isDark ? "text-cream/90" : "text-navy-deep"
                  }`}
                >
                  {set.headline}
                </h3>

                {/* Body */}
                {set.body.split("\n\n").map((para, j) => (
                  <p
                    key={j}
                    className={`font-sans leading-relaxed ${
                      isDark ? "text-cream/70" : "text-text-slate"
                    }`}
                  >
                    {para}
                  </p>
                ))}

                {/* Best for chips */}
                {set.bestFor && (
                  <div className="flex flex-col gap-3">
                    <p
                      className={`font-sans text-eyebrow uppercase ${
                        isDark ? "text-gold-light" : "text-gold-dark"
                      }`}
                    >
                      Best for
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {set.bestFor.map((item) => (
                        <span
                          key={item}
                          className={`font-sans text-xs px-3 py-1.5 rounded-full border ${
                            isDark
                              ? "text-cream/80 bg-white/10 border-white/15"
                              : "text-navy-deep bg-tile-taupe border-gold/20"
                          }`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bullets */}
                {set.bullets && (
                  <ul className="flex flex-col gap-2.5">
                    {set.bullets.map((b) => (
                      <li
                        key={b}
                        className={`flex items-start gap-3 font-sans text-sm ${
                          isDark ? "text-cream/80" : "text-text-slate"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0 shadow-[0_0_6px_rgba(201,162,39,0.6)]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                <Button
                  href={set.ctaHref}
                  variant={isDark ? "primary" : "outline"}
                  size="md"
                  className="self-start mt-2"
                >
                  {set.ctaLabel}
                </Button>
              </Reveal>
            </div>
          </Section>
        );
      })}

      {/* Custom Sets CTA */}
      <Section tone="stage" className="relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{ background: "var(--gradient-radial-glow)" }}
        />
        <div className="container-site relative z-10 flex flex-col items-center text-center gap-7 max-w-2xl mx-auto">
          <Reveal className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold/40" />
              <span className="font-sans text-eyebrow uppercase text-gold-light">
                Custom Sets
              </span>
              <span className="h-px w-10 bg-gold/40" />
            </div>
            <h2 className="font-display text-h1 font-bold text-cream">
              {customSetCTA.headline}
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full" />
            <p className="font-sans text-body text-cream/70">
              {customSetCTA.body}
            </p>
            <Button href={customSetCTA.ctaHref} variant="primary" size="lg">
              {customSetCTA.ctaLabel}
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
