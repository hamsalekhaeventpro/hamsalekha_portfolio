import type { Metadata } from "next";
import Image from "next/image";
import { seoMap, signatureSets, customSetCTA } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata("signatureSets", "/signature-sets");

export default function SignatureSetsPage() {
  return (
    <>
      {/* Hero — Figma sigsets1.svg style */}
      <section className="pt-36 pb-24 bg-navy-deep relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 25% 50%, rgba(92,138,201,0.14), transparent 60%)",
          }}
        />
        <div className="container-site relative z-10">
          <RevealOnScroll className="flex flex-col gap-5 max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold/50" />
              <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-gold-light">
                Signature Sets
              </span>
            </div>
            <h1
              className="font-display font-bold text-cream leading-[1.03]"
              style={{ fontSize: "clamp(2.75rem, 7vw, 6rem)" }}
            >
              Sets you won&apos;t find anywhere else.
            </h1>
            <div className="w-16 h-[2px] bg-gradient-to-r from-gold to-gold-light rounded-full" />
            <p className="font-sans text-lg text-cream/70 max-w-xl">
              Designed and built by Hamsalekha, our signature sets turn a venue
              into a destination.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Signature set blocks — very large editorial layout per Figma */}
      {signatureSets.map((set, i) => {
        const isDark = i === 0;
        return (
          <section
            key={set.title}
            id={set.title.toLowerCase().replace(/\s/g, "-")}
            className={`relative overflow-hidden ${isDark ? "bg-navy-deep" : "bg-bg-base"}`}
          >
            {isDark && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "var(--gradient-radial-glow)" }}
              />
            )}

            <div className="relative section-py container-site grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image — rounded-3xl with gold glow ring */}
              <RevealOnScroll
                direction={i % 2 === 0 ? "right" : "left"}
                className={`relative h-[480px] lg:h-[600px] rounded-3xl overflow-hidden shadow-gold-glow-lg card-gold-border ${
                  i % 2 !== 0 ? "lg:order-last" : ""
                }`}
              >
                <Image
                  src={set.image}
                  alt={set.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </RevealOnScroll>

              {/* Content */}
              <RevealOnScroll
                direction={i % 2 === 0 ? "left" : "right"}
                delay={0.12}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-4">
                  <span className="h-px w-8 bg-gold/50" />
                  <span
                    className={`font-sans text-[0.7rem] tracking-[0.25em] uppercase font-semibold ${
                      isDark ? "text-gold-light" : "text-gold-dark"
                    }`}
                  >
                    {set.eyebrow}
                  </span>
                </div>

                {/* Title — large editorial */}
                <h2
                  className={`font-display font-bold leading-[1.04] ${
                    isDark ? "text-cream" : "text-navy-deep"
                  }`}
                  style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
                >
                  {set.title}
                </h2>

                {set.launched && (
                  <span
                    className={`inline-flex px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 font-sans text-[0.65rem] tracking-[0.2em] uppercase font-semibold ${
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
                  className={`font-display text-xl font-semibold ${
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
                      className={`font-sans text-[0.65rem] tracking-[0.2em] uppercase font-semibold ${
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
              </RevealOnScroll>
            </div>
          </section>
        );
      })}

      {/* Custom Sets CTA */}
      <section className="section-py bg-navy-deep relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{ background: "var(--gradient-radial-glow)" }}
        />
        <div className="container-site relative z-10 flex flex-col items-center text-center gap-7 max-w-2xl mx-auto">
          <RevealOnScroll className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold/40" />
              <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-gold-light">
                Custom Sets
              </span>
              <span className="h-px w-10 bg-gold/40" />
            </div>
            <h2 className="font-display text-h1 font-bold text-cream">
              {customSetCTA.headline}
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full" />
            <p className="font-sans text-lg text-cream/70">
              {customSetCTA.body}
            </p>
            <Button href={customSetCTA.ctaHref} variant="primary" size="lg">
              {customSetCTA.ctaLabel}
            </Button>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
