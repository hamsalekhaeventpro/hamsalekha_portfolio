import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { LightsUp } from "@/components/motion/LightsUp";

export function StoryTeaser() {
  return (
    <Section tone="panel" aria-label="Our Story">
      <div className="container-site flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
        
        {/* Left: Archive Image */}
        <div className="w-full md:w-1/2">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-navy-deep">
            <LightsUp trigger="view">
              <Image
                src="/images/hero.jpg"
                alt="Hamsalekha early event production setup"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </LightsUp>
          </div>
          {/* TODO(owner): provide approved Story Teaser archive photograph */}
        </div>

        {/* Right: Copy */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gold/50" />
              <span className="font-sans text-[0.7rem] tracking-[0.2em] uppercase font-semibold text-gold-dark">
                2006 — 2026
              </span>
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h2 className="font-display text-h2 font-bold text-navy-deep leading-tight">
              Built one event at a time.
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="font-sans text-lg text-text-slate leading-relaxed">
              Hamsalekha began in 2006 with general lighting, prepared inside a family home by a team of two or three. Twenty years later, the same belief drives every build: keep moving forward, and let one opportunity lead to the next.
            </p>
          </Reveal>
          
          <Reveal delay={0.3}>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-4 font-sans text-sm font-semibold text-gold-dark hover:text-gold transition-colors group/link"
            >
              Read our story
              <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
            </Link>
          </Reveal>
        </div>

      </div>
    </Section>
  );
}
