import { homeIntro } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Introduction() {
  return (
    <section className="section-py bg-bg-base" aria-label="Introduction">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: large quote */}
          <SectionHeading
            eyebrow={homeIntro.eyebrow}
            heading={homeIntro.headline}
            align="left"
          />
          {/* Right: body paragraphs */}
          <RevealOnScroll delay={0.15} className="flex flex-col gap-5 pt-2">
            <p className="font-sans text-body text-text-slate leading-relaxed">
              {homeIntro.body}
            </p>
            <p className="font-sans text-body text-text-slate leading-relaxed">
              {homeIntro.body2}
            </p>
            {/* Decorative gold divider */}
            <div className="w-12 h-0.5 bg-gold/50 mt-2" />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
