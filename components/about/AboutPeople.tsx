import { aboutPeople, aboutCTA } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function AboutPeople() {
  return (
    <Section tone="base" aria-label="Our People">
      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container-site relative z-10 flex flex-col items-center text-center gap-10 max-w-3xl mx-auto">
        <div className="flex flex-col gap-6 items-center">
          {/* Eyebrow */}
          <Reveal delay={0.1}>
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-gold-dark/40" />
              <span className="font-sans text-eyebrow uppercase text-gold-dark">
                Our People
              </span>
              <span className="h-px w-10 bg-gold-dark/40" />
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal delay={0.2}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-navy-deep leading-[1.1]">
              {aboutPeople.headline}
            </h2>
          </Reveal>

          {/* Gold rule */}
          <Reveal delay={0.3}>
            <div className="w-16 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full mx-auto" />
          </Reveal>

          {/* Body */}
          <Reveal delay={0.4}>
            <p className="font-sans text-lg text-text-slate leading-relaxed max-w-2xl">
              {aboutPeople.body}
            </p>
          </Reveal>
        </div>

        {/* Quote / CTA */}
        <Reveal delay={0.5} className="flex flex-col items-center gap-8 w-full mt-4">
          <blockquote className="border border-gold/20 rounded-2xl p-8 bg-panel-warm/50 w-full">
            <p className="font-display text-xl md:text-2xl italic text-navy-deep/90 leading-relaxed">
              &ldquo;{aboutCTA.quote}&rdquo;
            </p>
          </blockquote>
          
          <Link
            href={aboutCTA.ctaHref}
            className="group relative flex items-center justify-center gap-3 bg-gold text-navy-deep px-9 py-4 rounded-full font-sans text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-400 hover:bg-gold-light"
          >
            {aboutCTA.ctaLabel}
            <ArrowRight
              size={16}
              className="transition-transform duration-400 ease-out group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}

