import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function AboutBrandStatement() {
  return (
    <section className="py-32 md:py-48 bg-navy-deep relative overflow-hidden" aria-label="Brand Statement">
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
        style={{ background: "var(--gradient-radial-glow)" }}
      />
      <div className="container-site relative z-10">
        <RevealOnScroll className="flex flex-col items-center text-center max-w-5xl mx-auto gap-8">
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-bold text-cream leading-[1.1]">
            WE BUILD WHAT HOLDS THE SHOW TOGETHER.
          </h2>
          <div className="w-12 h-0.5 bg-gold-dark mt-4" />
        </RevealOnScroll>
      </div>
    </section>
  );
}
