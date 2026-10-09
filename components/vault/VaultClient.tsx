"use client";

import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { EditorialPlaceholder } from "@/components/ui/EditorialPlaceholder";
import { 
  vaultHero, 
  inventory, 
  warehouseSection, 
  crewSection, 
  protectionPoints, 
  vaultCTA 
} from "@/lib/content";
import { useInView, useReducedMotion, animate } from "framer-motion";
import { useRef, useEffect } from "react";

// ── 1. HERO ────────────────────────────────────────────────────────
function VaultHeroSection() {
  return (
    <Section tone="stage" className="pt-36 pb-24 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.12),transparent_50%)]" />
      <div className="container-site relative z-10 flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
        <Reveal delay={0.1}>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gold/50" />
            <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-light">
              {vaultHero.eyebrow}
            </span>
            <span className="h-px w-8 bg-gold/50" />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <h1 className="font-display font-bold text-6xl md:text-7xl text-cream leading-[1.05]">
            {vaultHero.headline}
          </h1>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="w-16 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full mx-auto my-2" />
        </Reveal>
        <Reveal delay={0.4}>
          <p className="font-sans text-lg md:text-xl text-cream/70 max-w-2xl mx-auto leading-relaxed">
            {vaultHero.subline}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

// ── 2. INVENTORY AT A GLANCE ─────────────────────────────────────
function AnimatedCounter({ value, text }: { value: string; text: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "0px 0px -10% 0px" });
  const rm = useReducedMotion();
  const target = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const hasPlus = value.includes("+");
  const isRange = value.includes("-");

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || isRange || target === 0) return;

    if (rm) {
      node.textContent = target.toLocaleString("en-IN");
      return;
    }

    if (!isInView) {
      node.textContent = "0";
      return;
    }

    const controls = animate(0, target, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        if (node) {
          node.textContent = Math.round(latest).toLocaleString("en-IN");
        }
      },
    });

    return () => controls.stop();
  }, [isInView, target, rm, isRange]);

  return (
    <div className="flex flex-col gap-1">
      <span className="sr-only">{value} {text}</span>
      <span aria-hidden="true" className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-deep">
        {isRange ? (
          value
        ) : (
          <>
            <span ref={nodeRef}>{target.toLocaleString("en-IN")}</span>
            {hasPlus && "+"}
          </>
        )}
      </span>
      <span aria-hidden="true" className="font-sans text-xs uppercase tracking-widest text-text-slate font-bold mt-1">
        {text}
      </span>
    </div>
  );
}

function InventorySection() {
  return (
    <Section tone="base" className="py-24 lg:py-32">
      <div className="container-site flex flex-col gap-20">
        
        {/* Count-Up Proofs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 p-8 sm:p-12 bg-panel-warm rounded-sm border border-navy-deep/10">
          <AnimatedCounter value="10000+" text="Chairs" />
          <AnimatedCounter value="1100+" text="Sofa Units" />
          <AnimatedCounter value="100000" text="Sq ft Trussing" />
          <AnimatedCounter value="40-125" text="KVA Power" />
        </div>

        {/* Structured Inventory Table */}
        <div className="flex flex-col gap-8">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gold-dark/40" />
              <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-dark">
                Inventory at a Glance
              </span>
              <span className="h-px w-8 bg-gold-dark/40" />
            </div>
          </Reveal>
          
          <div className="flex flex-col border-t border-navy-deep/10">
            {inventory.map((item, i) => (
              <Reveal key={item.category} delay={0.08 * i}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 py-6 border-b border-navy-deep/10">
                  <h3 className="font-display text-2xl font-bold text-navy-deep w-full md:w-1/3">
                    {item.category}
                  </h3>
                  <p className="font-sans text-base lg:text-lg text-text-slate w-full md:w-2/3 md:text-right font-medium">
                    {item.capacity}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
}

// ── 3. THE WAREHOUSE ─────────────────────────────────────────────
function WarehouseSection() {
  return (
    <Section tone="stage" className="py-24 lg:py-32 overflow-hidden border-t border-gold/15">
      <div className="container-site flex flex-col gap-12 lg:gap-16">
        {/* Large Architectural Image Placeholder */}
        <div className="w-full relative aspect-[16/10] md:aspect-[21/9]">
          <Reveal delay={0.1}>
            <EditorialPlaceholder
              aspectRatio="aspect-[16/10] md:aspect-[21/9]"
              tone="dark"
              contextLabel="WAREHOUSE"
              caption="Kothanur Inventory & Maintenance Facility"
              subline="Central facility for 10,000+ chairs, 1,100+ sofa units, power & structures"
              className="w-full shadow-2xl"
            />
          </Reveal>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Reveal delay={0.2}>
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-gold/50" />
                <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-light">
                  {warehouseSection.eyebrow}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-cream leading-tight">
                {warehouseSection.headline}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Reveal delay={0.4}>
              <p className="font-sans text-lg lg:text-xl text-cream/75 leading-relaxed max-w-2xl">
                {warehouseSection.body}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── 4. THE CREW ──────────────────────────────────────────────────
function CrewSection() {
  return (
    <Section tone="base" className="py-24 lg:py-32">
      <div className="container-site max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
        <Reveal delay={0.1}>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gold-dark/40" />
            <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-dark">
              {crewSection.eyebrow}
            </span>
            <span className="h-px w-8 bg-gold-dark/40" />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-navy-deep leading-tight">
            {crewSection.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="w-12 h-[1px] bg-gold-dark/40 my-2" />
        </Reveal>

        {/* Authentic Crew / Scale Image Placeholder */}
        <Reveal delay={0.3} className="w-full">
          <EditorialPlaceholder
            aspectRatio="aspect-[16/10] sm:aspect-[21/9]"
            tone="light"
            contextLabel="CREW / BACKSTAGE"
            caption="Own crew on every build — riggers, carpenters, and technicians"
            subline="From load-in to final strike"
            className="w-full max-w-3xl mx-auto my-3 shadow-sm"
          />
        </Reveal>

        <Reveal delay={0.35}>
          <p className="font-sans text-lg lg:text-xl text-text-slate leading-relaxed max-w-2xl">
            {crewSection.body}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

// ── 5. HOW WE PROTECT YOUR EVENT ─────────────────────────────────
function ProtectionSection() {
  return (
    <Section tone="panel" className="py-24 lg:py-32 border-t border-navy-deep/10">
      <div className="container-site max-w-4xl mx-auto flex flex-col gap-12">
        <Reveal>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gold-dark/40" />
              <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.2em] text-gold-dark">
                SAFETY & RELIABILITY
              </span>
              <span className="h-px w-8 bg-gold-dark/40" />
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-navy-deep">
              How We Protect Your Event
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {protectionPoints.map((point, i) => (
            <Reveal key={point} delay={0.1 * i} className="p-8 bg-base-warm rounded-sm border border-navy-deep/10 flex items-start gap-4">
              <span className="w-2 h-2 rounded-full bg-gold-dark shrink-0 mt-2.5" />
              <p className="font-sans text-base lg:text-lg text-navy-deep leading-relaxed font-medium">
                {point}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ── 6. CLOSING / WAREHOUSE VISIT ─────────────────────────────────
function VaultCTASection() {
  return (
    <Section tone="stage" className="py-24 lg:py-32 relative overflow-hidden text-center border-t border-gold/15">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-stage-glow)" }} />
      <div className="container-site relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
        <Reveal>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-cream">
            {vaultCTA.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="w-12 h-[1px] bg-gold/40 mx-auto" />
        </Reveal>
        <Reveal delay={0.3}>
          <p className="font-sans text-lg text-cream/75 leading-relaxed">
            {vaultCTA.body}
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <Button href={vaultCTA.ctaHref} variant="primary" size="lg" className="mt-4">
            {vaultCTA.ctaLabel}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}

export function VaultClient() {
  return (
    <>
      <VaultHeroSection />
      <InventorySection />
      <WarehouseSection />
      <CrewSection />
      <ProtectionSection />
      <VaultCTASection />
    </>
  );
}
