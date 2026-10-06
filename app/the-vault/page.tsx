import type { Metadata } from "next";
import Image from "next/image";
import {
  vaultHero,
  warehouseSection,
  crewSection,
  protectionPoints,
  vaultCTA,
} from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Section } from "@/components/layout/Section";
import { VaultInventory } from "@/components/vault/VaultInventory";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata("vault", "/the-vault");

export default function VaultPage() {
  return (
    <>
      {/* Hero */}
      <Section tone="stage" className="pt-36 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(201,162,39,0.10), transparent 65%)",
          }}
        />
        <div className="container-site relative z-10">
          <Reveal className="flex flex-col gap-5 max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold/50" />
              <span className="font-sans text-eyebrow uppercase text-gold-light">
                {vaultHero.eyebrow}
              </span>
            </div>
            <h1 className="font-display font-bold text-hero text-cream leading-[1.02]">
              {vaultHero.headline}
            </h1>
            <div className="w-16 h-[2px] bg-gradient-to-r from-gold to-gold-light rounded-full" />
            <p className="font-sans text-body text-cream/70 max-w-xl">
              {vaultHero.subline}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Inventory table */}
      <Section tone="base">
        <div className="container-site flex flex-col gap-10">
          <SectionHeading
            eyebrow="INVENTORY AT A GLANCE"
            heading="The scale behind every event."
          />
          {/* Premium table */}
          <VaultInventory />
        </div>
      </Section>

      {/* Warehouse */}
      <Section tone="panel">
        <div className="container-site grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 lg:h-[640px] rounded-xl overflow-hidden shadow-2xl bg-navy-deep">
            <ClipReveal direction="left" className="w-full h-full">
              <Image
                src={warehouseSection.image}
                alt={warehouseSection.imageAlt}
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ClipReveal>
          </div>
          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold-dark/50" />
              <span className="font-sans text-eyebrow uppercase text-gold-dark">
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
          </Reveal>
        </div>
      </Section>

      {/* Crew */}
      <Section tone="stage" className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{ background: "var(--gradient-radial-glow)" }}
        />
        <div className="container-site relative z-10 grid lg:grid-cols-2 gap-12 items-start">
          <Reveal className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold/50" />
              <span className="font-sans text-eyebrow uppercase text-gold-light">
                {crewSection.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-h2 font-bold text-cream">
              {crewSection.headline}
            </h2>
            <p className="font-sans text-body text-cream/70 leading-relaxed">
              {crewSection.body}
            </p>
          </Reveal>

          {/* Protection points */}
          <Reveal delay={0.1} className="flex flex-col gap-4">
            <h3 className="font-sans text-eyebrow uppercase text-gold-light mb-2">
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
          </Reveal>
        </div>
      </Section>

      {/* Closing CTA */}
      <Section tone="base">
        <div className="container-site flex flex-col items-center text-center gap-6 max-w-xl mx-auto">
          <Reveal className="flex flex-col items-center gap-5">
            <h2 className="font-display text-h2 font-bold text-navy-deep">
              {vaultCTA.headline}
            </h2>
            <div className="w-12 h-[2px] bg-gold rounded-full" />
            <p className="font-sans text-body text-text-slate">{vaultCTA.body}</p>
            <Button href={vaultCTA.ctaHref} variant="primary" size="lg">
              {vaultCTA.ctaLabel}
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
