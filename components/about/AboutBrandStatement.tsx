import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";

export function AboutBrandStatement() {
  return (
    <Section tone="stage" aria-label="Brand Statement">
      <div className="container-site relative z-10">
        <Reveal className="flex flex-col items-center text-center max-w-5xl mx-auto gap-8">
          <h2 className="font-display text-hero font-bold text-cream leading-[1.1]">
            WE BUILD WHAT HOLDS THE SHOW TOGETHER.
          </h2>
          <div className="w-12 h-0.5 bg-gold-dark mt-4" />
        </Reveal>
      </div>
    </Section>
  );
}

