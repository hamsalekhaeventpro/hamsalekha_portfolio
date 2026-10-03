import { microcopy } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowRight } from "lucide-react";

export function CatalogueBridge() {
  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden text-center px-4"
      style={{ background: "#E7E1D0" }}
      aria-label="Catalogue Bridge"
    >
      {/* Gold top + bottom borders per Figma */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <RevealOnScroll className="max-w-2xl mx-auto flex flex-col items-center gap-7">
        {/* Eyebrow */}
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-gold-dark/50" />
          <span className="font-sans text-[0.7rem] tracking-[0.22em] uppercase font-semibold text-gold-dark">
            Furniture &amp; Decor Inventory
          </span>
          <span className="h-px w-10 bg-gold-dark/50" />
        </div>

        {/* Headline — editorial large */}
        <h2 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold text-navy-deep leading-[1.06]">
          Our complete inventory.
          <br />
          Ready to deploy.
        </h2>

        {/* Gold hairline */}
        <div className="w-16 h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full" />

        <p className="font-sans text-base text-text-slate max-w-md leading-relaxed">
          Explore 10,000+ chairs, 1,100+ sofa units, and our full range of
          premium decor in the dedicated product catalogue.
        </p>

        <Button
          href={microcopy.catalogueUrl}
          variant="primary"
          size="lg"
          external
          className="group flex items-center gap-2"
        >
          Access the Catalogue{" "}
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Button>
      </RevealOnScroll>
    </section>
  );
}
