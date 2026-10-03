import { aboutPeople, aboutCTA } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function AboutPeople() {
  return (
    <section className="section-py bg-navy-deep relative overflow-hidden" aria-label="Our People">
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
        <RevealOnScroll className="flex flex-col gap-8">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold/40" />
            <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-gold-light">
              Our People
            </span>
            <span className="h-px w-10 bg-gold/40" />
          </div>

          {/* Headline */}
          <h2 className="font-display text-[clamp(1.75rem,4vw,3.5rem)] font-bold text-cream leading-[1.1]">
            {aboutPeople.headline}
          </h2>

          {/* Gold rule */}
          <div className="w-16 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full mx-auto" />

          {/* Body */}
          <p className="font-sans text-base md:text-lg text-cream/70 leading-relaxed">
            {aboutPeople.body}
          </p>
        </RevealOnScroll>

        {/* Quote / CTA */}
        <RevealOnScroll delay={0.2} className="flex flex-col items-center gap-8">
          <blockquote className="border border-gold/20 rounded-2xl p-8 bg-white/5">
            <p className="font-display text-xl md:text-2xl italic text-cream/90 leading-relaxed">
              &ldquo;{aboutCTA.quote}&rdquo;
            </p>
          </blockquote>
          <Button href={aboutCTA.ctaHref} variant="primary" size="lg">
            {aboutCTA.ctaLabel}
          </Button>
        </RevealOnScroll>
      </div>
    </section>
  );
}
