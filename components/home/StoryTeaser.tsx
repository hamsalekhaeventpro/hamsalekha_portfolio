import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ClipReveal } from "@/components/motion/ClipReveal";

export function StoryTeaser() {
  return (
    <Section tone="panel" aria-label="Our Story">
      <div className="container-site flex flex-col md:flex-row gap-12 lg:gap-24 items-center">
        
        {/* Left: Archive Image */}
        <div className="w-full md:w-1/2">
          <div className="relative aspect-[4/5] md:aspect-[3/4] w-full rounded-2xl overflow-hidden bg-navy-deep">
            <ClipReveal direction="up" delay={0.1} className="w-full h-full">
              <Image
                src="/images/hero.jpg"
                alt="Hamsalekha early event production setup"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
            </ClipReveal>
          </div>
          {/* TODO(owner): provide approved Story Teaser archive photograph */}
        </div>

        {/* Right: Copy */}
        <div className="w-full md:w-1/2 flex flex-col gap-8 md:pl-8">
          <Reveal delay={0.3}>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold/50" />
              <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-gold-dark">
                2006 — 2026
              </span>
            </div>
          </Reveal>
          
          <Reveal delay={0.4}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-navy-deep leading-[1.1] tracking-tight">
              Built one event<br className="hidden md:block" /> at a time.
            </h2>
          </Reveal>
          
          <Reveal delay={0.5}>
            <p className="font-sans text-lg lg:text-xl text-text-slate leading-relaxed max-w-lg">
              Hamsalekha began in 2006 with general lighting, prepared inside a family home by a team of two or three. Twenty years later, the same belief drives every build: keep moving forward, and let one opportunity lead to the next.
            </p>
          </Reveal>
          
          <Reveal delay={0.6}>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 mt-4 font-sans text-sm font-semibold text-gold-dark hover:text-gold transition-colors group/link tracking-wider uppercase"
            >
              Read our story
              <ArrowRight size={18} className="transition-transform group-hover/link:translate-x-1" />
            </Link>
          </Reveal>
        </div>

      </div>
    </Section>
  );
}
