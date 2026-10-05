import { aboutPeople, aboutCTA } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";

export function AboutPeople() {
  return (
    <Section tone="stage" aria-label="Our People">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(92,138,201,0.15), transparent 70%)",
        }}
      />
      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="container-site relative z-10 flex flex-col items-center text-center gap-12 max-w-3xl mx-auto">
        <Reveal className="flex flex-col gap-8">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold/40" />
            <span className="font-sans text-eyebrow uppercase text-gold-light">
              Our People
            </span>
            <span className="h-px w-10 bg-gold/40" />
          </div>

          {/* Headline */}
          <h2 className="font-display text-hero font-bold text-cream leading-[1.1]">
            {aboutPeople.headline}
          </h2>

          {/* Gold rule */}
          <div className="w-16 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full mx-auto" />

          {/* Body */}
          <p className="font-sans text-body text-cream/70 leading-relaxed">
            {aboutPeople.body}
          </p>
        </Reveal>

        {/* Quote / CTA */}
        <Reveal delay={0.2} className="flex flex-col items-center gap-8">
          <blockquote className="border border-gold/20 rounded-2xl p-8 bg-white/5">
            <p className="font-display text-xl md:text-2xl italic text-cream/90 leading-relaxed">
              &ldquo;{aboutCTA.quote}&rdquo;
            </p>
          </blockquote>
          <Button href={aboutCTA.ctaHref} variant="primary" size="lg">
            {aboutCTA.ctaLabel}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
