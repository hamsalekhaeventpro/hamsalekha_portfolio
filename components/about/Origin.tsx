import Image from "next/image";
import { aboutStory, founder, values } from "@/lib/content";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Origin() {
  return (
    <>
      {/* 2-Column Origin — matches Figma about1.svg */}
      <section className="section-py bg-bg-base" aria-label="Origin Story">
        <div className="container-site grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Story text */}
          <RevealOnScroll direction="left" className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold-dark/50" />
              <span className="font-sans text-[0.7rem] tracking-[0.22em] uppercase font-semibold text-gold-dark">
                Our Origin
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold text-navy-deep leading-[1.1]">
              From a home in Kothanur to a production house.
            </h2>
            <div className="flex flex-col gap-5 text-text-slate leading-relaxed">
              {aboutStory.map((para, i) => (
                <p key={i} className="font-sans text-base md:text-[1.05rem]">
                  {para}
                </p>
              ))}
            </div>
          </RevealOnScroll>

          {/* Right: Founder photo */}
          <RevealOnScroll direction="right" delay={0.15}>
            <div className="flex flex-col gap-6 sticky top-28">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden ring-4 ring-gold/25 shadow-gold-glow-lg">
                <Image
                  src={founder.image}
                  alt={`${founder.name}, ${founder.title} — Hamsalekha`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                {/* Subtle bottom caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-deep/90 to-transparent px-8 py-10">
                  <p className="font-display text-xl font-bold text-cream">{founder.name}</p>
                  <p className="font-sans text-xs text-gold-light tracking-[0.15em] uppercase mt-1">
                    {founder.title}
                  </p>
                </div>
              </div>
              {/* Founder bio */}
              <p className="font-sans text-sm text-text-slate leading-relaxed italic border-l-2 border-gold/40 pl-4">
                &ldquo;{founder.bio}&rdquo;
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Values — 2×2 grid per Figma */}
      <section className="section-py" style={{ background: "#E7E1D0" }} aria-label="Our Values">
        <div className="container-site flex flex-col gap-12">
          <SectionHeading
            eyebrow="OUR VALUES"
            heading="What we stand for."
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto w-full">
            {values.map((value, i) => (
              <RevealOnScroll
                key={value.title}
                delay={i * 0.1}
                className="bg-bg-base border border-gold/15 rounded-2xl p-8 flex flex-col gap-3 hover:shadow-card-hover hover:border-gold/35 transition-all duration-300"
              >
                {/* Number */}
                <span className="font-display text-4xl font-bold text-gold/25 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-bold text-navy-deep">
                  {value.title}
                </h3>
                <p className="font-sans text-sm text-text-slate leading-relaxed">
                  {value.body}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
