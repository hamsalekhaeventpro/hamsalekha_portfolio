import Image from "next/image";
import { services } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";

export function TheCraft() {
  // Extract specific services to feature
  const furniture = services.find((s) => s.title.includes("Furniture"))!;
  const lighting = services.find((s) => s.title.includes("Lighting"))!;
  const truss = services.find((s) => s.title.includes("Truss"))!;
  const production = services.find((s) => s.title.includes("Production"))!;

  const craftItems = [
    { num: "01", label: "FURNITURE", ...furniture },
    { num: "02", label: "LIGHTING", ...lighting },
    { num: "03", label: "TRUSS", ...truss },
    { num: "04", label: "PRODUCTION", ...production },
  ];

  return (
    <Section tone="panel" aria-label="The Craft">
      <div className="container-site flex flex-col gap-24 md:gap-32">
        {craftItems.map((item, i) => {
          const isEven = i % 2 === 0;
          return (
            <div key={item.num} className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              {/* Image Side */}
              <div className={`lg:col-span-7 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-[10s] hover:scale-105"
                />
              </div>

              {/* Text Side */}
              <div className={`lg:col-span-5 flex flex-col gap-6 ${isEven ? "lg:order-2" : "lg:order-1 lg:pl-8"}`}>
                <Reveal>
                  <div className="flex items-center gap-4 text-gold-dark mb-2">
                    <span className="font-display text-xl font-bold">{item.num}</span>
                    <span className="w-8 h-px bg-gold-dark/30" />
                    <span className="font-sans text-eyebrow uppercase text-gold-dark">
                      {item.label}
                    </span>
                  </div>
                  <h3 className="font-display text-h3 font-bold text-navy-deep leading-tight mb-4">
                    {item.title}
                  </h3>
                  <p className="font-sans text-text-slate text-body leading-relaxed">
                    {item.description}
                  </p>
                </Reveal>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
