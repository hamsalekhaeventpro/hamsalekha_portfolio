import Image from "next/image";
import { aboutStory, founder, values } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/layout/Section";
import { staggerDelay } from "@/lib/motion";

export function Origin() {
  return (
    <>
      {/* 2-Column Origin */}
      <Section tone="base" aria-label="Origin Story">
        <div className="container-site grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Story text */}
          <Reveal className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold-dark/50" />
              <span className="font-sans text-eyebrow uppercase text-gold-dark">
                Our Origin
              </span>
            </div>
            <h2 className="font-display text-h2 font-bold text-navy-deep leading-[1.1]">
              From a home in Kothanur to a production house.
            </h2>
            <div className="flex flex-col gap-5 text-text-slate leading-relaxed">
              {aboutStory.map((para, i) => (
                <p key={i} className="font-sans text-body">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Right: Founder photo */}
          <Reveal delay={0.15}>
            <div className="flex flex-col gap-6 lg:sticky lg:top-28">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-gold/15">
                <Image
                  src={founder.image}
                  alt={`${founder.name}, ${founder.title} — Hamsalekha`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                {/* Subtle bottom caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-deep/90 to-transparent px-8 py-10">
                  <p className="font-display text-2xl font-bold text-cream tracking-wide">{founder.name}</p>
                  <p className="font-sans text-xs text-gold-light tracking-[0.15em] uppercase mt-1">
                    {founder.title}
                  </p>
                </div>
              </div>
              {/* Founder bio */}
              <p className="font-sans text-body text-text-slate leading-relaxed italic border-l-2 border-gold/40 pl-4">
                &ldquo;{founder.bio}&rdquo;
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section tone="panel" aria-label="Our Values">
        <div className="container-site flex flex-col gap-12">
          <SectionHeading
            eyebrow="OUR VALUES"
            heading="What we stand for."
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto w-full">
            {values.map((value, i) => (
              <Reveal
                key={value.title}
                delay={staggerDelay(i)}
                className="bg-bg-base border border-gold/15 rounded-2xl p-8 flex flex-col gap-3 hover:shadow-card-hover hover:border-gold/35 transition duration-300"
              >
                {/* Number */}
                <span className="font-display text-4xl font-bold text-gold/25 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-h4 font-bold text-navy-deep">
                  {value.title}
                </h3>
                <p className="font-sans text-body text-text-slate leading-relaxed">
                  {value.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
