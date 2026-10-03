import { Zap, Layers, Box, Users } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const pillars = [
  {
    Icon: Zap,
    eyebrow: "POWER",
    title: "In-house gensets",
    body: "Silent 40–125 KVA sets with our own operators. Power planned before any wire is laid.",
  },
  {
    Icon: Layers,
    eyebrow: "STRUCTURES",
    title: "Own crew, always",
    body: "Riggers and carpenters on every build — not subcontractors. They carry the same standards site to site.",
  },
  {
    Icon: Box,
    eyebrow: "INVENTORY",
    title: "One warehouse",
    body: "10,000+ chairs, 1,100+ sofa units, lighting and props — all dispatched from Kothanur.",
  },
  {
    Icon: Users,
    eyebrow: "CREW",
    title: "People who stay",
    body: "From load-in to strike, our team is on-site. We leave when the venue is back to how we found it.",
  },
];

export function TheVault() {
  return (
    <section className="section-py bg-navy-deep relative overflow-hidden" aria-label="The Vault">
      {/* Multi-layer radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50 mix-blend-screen"
        style={{ background: "var(--gradient-radial-glow)" }}
      />
      {/* Gold top border per Figma */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="container-site flex flex-col gap-12 relative z-10">
        {/* Section heading */}
        <RevealOnScroll className="flex flex-col items-center text-center gap-5">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/40" />
            <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-gold-light">
              The Vault
            </span>
            <span className="h-px w-10 bg-gold/40" />
          </div>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3.5rem)] font-bold text-cream max-w-2xl">
            What you don&apos;t see is what never fails.
          </h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full" />
        </RevealOnScroll>

        {/* 4-column cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
          {pillars.map((pillar, i) => {
            const { Icon } = pillar;
            return (
              <RevealOnScroll
                key={pillar.title}
                delay={i * 0.1}
                className="flex flex-col gap-5 p-7 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/8 hover:border-gold/30 hover:bg-white/8 transition-all duration-400 group card-gold-border"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center group-hover:bg-gold/25 group-hover:scale-105 transition-all duration-400">
                  <Icon size={24} className="text-gold-light" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1.5 mt-1">
                  <span className="font-sans text-[0.65rem] tracking-[0.22em] uppercase font-semibold text-gold-light/70">
                    {pillar.eyebrow}
                  </span>
                  <h3 className="font-display text-xl font-bold text-cream">
                    {pillar.title}
                  </h3>
                </div>
                <p className="font-sans text-sm text-cream/65 leading-relaxed">
                  {pillar.body}
                </p>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* CTA link */}
        <RevealOnScroll className="flex justify-center pt-4">
          <Link
            href="/the-vault"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-gold-light hover:text-gold transition-colors group"
          >
            Discover the full vault
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
