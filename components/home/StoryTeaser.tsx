import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aboutStory, timeline } from "@/lib/content";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function StoryTeaser() {
  return (
    <section className="section-py bg-bg-base border-y border-gold/12" aria-label="Company story">
      <div className="container-site grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left — badge + headline + mini timeline */}
        <RevealOnScroll direction="left" className="flex flex-col gap-7">
          {/* Badge */}
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold-dark/50" />
            <span className="font-sans text-[0.7rem] tracking-[0.22em] uppercase font-semibold text-gold-dark">
              Hamsalekha · 20 Years · Since 2006
            </span>
          </div>

          {/* Editorial headline */}
          <h2
            className="font-display font-bold text-navy-deep leading-[1.06]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
          >
            Twenty years.
            <br />
            One warehouse.
            <br />
            <em className="not-italic text-gold-dark">One family.</em>
          </h2>

          {/* Gold hairline */}
          <div className="w-12 h-[2px] bg-gradient-to-r from-gold-dark to-gold rounded-full" />

          {/* Mini timeline */}
          <div className="flex flex-col gap-4">
            {timeline.slice(0, 4).map((entry) => (
              <div key={entry.year} className="flex items-start gap-4 group">
                <span className="font-display text-sm font-bold text-gold shrink-0 w-16 pt-0.5 group-hover:text-gold-dark transition-colors">
                  {entry.year}
                </span>
                <span className="w-px h-full bg-gold/20 shrink-0 mt-1" />
                <p className="font-sans text-sm text-text-slate leading-relaxed">
                  {entry.description}
                </p>
              </div>
            ))}
            <div className="flex items-start gap-4 opacity-30">
              <span className="font-display text-sm font-bold text-gold shrink-0 w-16 pt-0.5">···</span>
              <span className="w-px h-full bg-gold/20 shrink-0 mt-1" />
              <p className="font-sans text-sm text-text-slate italic">
                and five more chapters to the present day
              </p>
            </div>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-gold-dark hover:text-gold transition-colors group mt-1"
          >
            Read our full story
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </RevealOnScroll>

        {/* Right — editorial quote + story excerpt */}
        <RevealOnScroll direction="right" delay={0.15} className="flex flex-col gap-7 pt-2">
          {/* Quote with gold left border — Figma style */}
          <blockquote className="border-l-4 border-gold/60 pl-6 py-2 bg-gold/5 rounded-r-xl">
            <p className="font-display text-xl md:text-2xl text-navy-deep/85 italic leading-relaxed">
              &ldquo;Ramesh V started Hamsalekha from his home in 2006 with
              lighting equipment and a small, loyal team. The name came first — a
              word that carried weight, a name that felt like a promise.&rdquo;
            </p>
          </blockquote>
          <p className="font-sans text-base text-text-slate leading-relaxed">
            {aboutStory[1]}
          </p>
          <p className="font-sans text-base text-text-slate leading-relaxed">
            {aboutStory[4]}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
