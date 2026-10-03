import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function BrandStatement() {
  return (
    <section
      className="py-20 md:py-28 border-y border-gold/15"
      style={{ background: "#E7E1D0" }}
      aria-label="Brand Statement"
    >
      <div className="container-site">
        <RevealOnScroll className="flex flex-col items-center text-center max-w-5xl mx-auto gap-8">
          {/* Eyebrow gold rule */}
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold-dark/50" />
            <span className="font-sans text-[0.7rem] tracking-[0.22em] uppercase font-semibold text-gold-dark">
              Since 2006
            </span>
            <span className="h-px w-10 bg-gold-dark/50" />
          </div>

          {/* Headline — large editorial, matches Figma BrandStatement section */}
          <h2 className="font-display text-[clamp(2.5rem,5.5vw,5rem)] font-bold text-navy-deep leading-[1.08]">
            We build what{" "}
            <em className="not-italic text-gold-dark">holds the show</em>{" "}
            together.
          </h2>

          {/* Services tagline */}
          <p className="font-sans text-[0.95rem] text-gold-dark font-semibold tracking-[0.22em] uppercase">
            Furniture{" "}
            <span className="text-navy-deep/25 mx-3">·</span> Lighting{" "}
            <span className="text-navy-deep/25 mx-3">·</span> Structure{" "}
            <span className="text-navy-deep/25 mx-3">·</span> Production
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
