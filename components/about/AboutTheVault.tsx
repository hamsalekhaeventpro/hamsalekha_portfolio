import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function AboutTheVault() {
  return (
    <section className="bg-navy-deep overflow-hidden" aria-label="The Vault">
      <div className="grid lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]">
        {/* Image Side */}
        <div className="relative h-[400px] lg:h-auto order-2 lg:order-1">
          <Image
            src="/images/vault/warehouse.jpg" // Fixed path to actual existing asset
            alt="Hamsalekha Warehouse and Inventory"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-90"
          />
          {/* Subtle inner shadow for premium feel */}
          <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(15,38,71,0.6)]" />
        </div>

        {/* Content Side */}
        <div className="flex flex-col justify-center p-8 md:p-16 lg:p-24 order-1 lg:order-2">
          <RevealOnScroll className="flex flex-col gap-6 max-w-xl">
            <span className="font-sans text-sm tracking-[0.2em] uppercase font-semibold text-gold-light">
              THE VAULT
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream leading-tight">
              One warehouse.<br />Absolute control.
            </h2>
            <div className="w-12 h-0.5 bg-gold-dark my-2" />
            <p className="font-sans text-lg text-cream/75 leading-relaxed">
              We don&apos;t sub-rent what matters. Our Kothanur facility houses 100,000+ sq ft of proprietary inventory. From the heaviest structural truss down to the last brass deepa, everything is owned, maintained, and dispatched by our team.
            </p>
            <div className="flex flex-col gap-3 mt-6 border-l-2 border-gold/30 pl-6">
              <span className="font-sans text-sm text-gold-light uppercase tracking-widest">Core Capabilities</span>
              <ul className="flex flex-col gap-2 font-sans text-cream/90">
                <li>• In-house gensets (40–125 KVA)</li>
                <li>• Bombay truss & structural rigging</li>
                <li>• 10,000+ premium chairs</li>
                <li>• Direct employment crew (No sub-contractors)</li>
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
