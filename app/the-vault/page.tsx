import type { Metadata } from "next";
import Image from "next/image";
import {
  seoMap,
  vaultHero,
  inventory,
  warehouseSection,
  crewSection,
  protectionPoints,
  vaultCTA,
} from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: seoMap.vault.title,
  description: seoMap.vault.description,
};

export default function VaultPage() {
  return (
    <>
      {/* Hero — very large serif matching Figma vault1.svg */}
      <section className="pt-36 pb-24 bg-navy-deep relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(92,138,201,0.15), transparent 65%)",
          }}
        />
        <div className="container-site relative z-10">
          <RevealOnScroll className="flex flex-col gap-5 max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold/50" />
              <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-gold-light">
                {vaultHero.eyebrow}
              </span>
            </div>
            <h1
              className="font-display font-bold text-cream leading-[1.02]"
              style={{ fontSize: "clamp(2.75rem, 7vw, 6rem)" }}
            >
              {vaultHero.headline}
            </h1>
            <div className="w-16 h-[2px] bg-gradient-to-r from-gold to-gold-light rounded-full" />
            <p className="font-sans text-lg text-cream/70 max-w-xl">
              {vaultHero.subline}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Inventory table — premium Figma style */}
      <section className="section-py bg-bg-base">
        <div className="container-site flex flex-col gap-10">
          <SectionHeading
            eyebrow="INVENTORY AT A GLANCE"
            heading="The scale behind every event."
          />
          {/* Premium table */}
          <div className="overflow-hidden rounded-3xl border border-gold/20 shadow-gold-glow">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-navy-deep">
                  <th className="font-sans text-[0.65rem] text-gold-light tracking-[0.22em] uppercase px-8 py-5 font-semibold">
                    Category
                  </th>
                  <th className="font-sans text-[0.65rem] text-gold-light tracking-[0.22em] uppercase px-8 py-5 font-semibold">
                    Capacity
                  </th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((row, i) => (
                  <tr
                    key={row.category}
                    className={`border-b border-gold/10 last:border-0 transition-colors hover:bg-gold/5 ${
                      i % 2 === 0 ? "bg-card-bg" : "bg-panel-warm/40"
                    }`}
                  >
                    <td className="font-display text-base font-semibold text-navy-deep px-8 py-5">
                      {row.category}
                    </td>
                    <td className="font-sans text-base text-text-slate px-8 py-5">
                      {row.capacity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Warehouse — image with overlay caption */}
      <section className="section-py" style={{ background: "#E7E1D0" }}>
        <div className="container-site grid lg:grid-cols-2 gap-12 items-center">
          <RevealOnScroll
            direction="left"
            className="relative h-80 lg:h-[480px] rounded-3xl overflow-hidden shadow-gold-glow"
          >
            <Image
              src={warehouseSection.image}
              alt={warehouseSection.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={0.1} className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold-dark/50" />
              <span className="font-sans text-[0.7rem] tracking-[0.22em] uppercase font-semibold text-gold-dark">
                {warehouseSection.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-h2 font-bold text-navy-deep">
              {warehouseSection.headline}
            </h2>
            <div className="w-12 h-[2px] bg-gold rounded-full" />
            <p className="font-sans text-body text-text-slate leading-relaxed">
              {warehouseSection.body}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Crew — gold left-border bullet list per Figma */}
      <section className="section-py bg-navy-deep relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{ background: "var(--gradient-radial-glow)" }}
        />
        <div className="container-site relative z-10 grid lg:grid-cols-2 gap-12 items-start">
          <RevealOnScroll className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold/50" />
              <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-gold-light">
                {crewSection.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-h2 font-bold text-cream">
              {crewSection.headline}
            </h2>
            <p className="font-sans text-body text-cream/70 leading-relaxed">
              {crewSection.body}
            </p>
          </RevealOnScroll>

          {/* Protection points — gold left border style per Figma */}
          <RevealOnScroll delay={0.1} className="flex flex-col gap-4">
            <h3 className="font-sans text-[0.7rem] tracking-[0.22em] uppercase font-semibold text-gold-light mb-2">
              How we protect your event
            </h3>
            {protectionPoints.map((point, i) => (
              <div
                key={i}
                className="border-l-4 border-gold pl-5 py-1 hover:border-gold-light transition-colors duration-300"
              >
                <p className="font-sans text-sm text-cream/85 leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-py bg-bg-base">
        <div className="container-site flex flex-col items-center text-center gap-6 max-w-xl mx-auto">
          <RevealOnScroll className="flex flex-col items-center gap-5">
            <h2 className="font-display text-h2 font-bold text-navy-deep">
              {vaultCTA.headline}
            </h2>
            <div className="w-12 h-[2px] bg-gold rounded-full" />
            <p className="font-sans text-body text-text-slate">{vaultCTA.body}</p>
            <Button href={vaultCTA.ctaHref} variant="primary" size="lg">
              {vaultCTA.ctaLabel}
            </Button>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
