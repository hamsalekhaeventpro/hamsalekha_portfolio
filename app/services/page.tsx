import type { Metadata } from "next";
import Image from "next/image";
import { services, eventsWeProduceTags } from "@/lib/content";
import { getPageMetadata } from "@/lib/metadata";
// ... imports
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

export const metadata: Metadata = getPageMetadata("services", "/services");

// Gold checkmark bullet
function GoldCheck() {
  return (
    <span className="w-4 h-4 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center shrink-0 mt-0.5">
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
        <path d="M1.5 4L3 5.5L6.5 2" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
}

import { ClipReveal } from "@/components/motion/ClipReveal";

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <Section tone="stage" className="pt-36 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(92,138,201,0.15), transparent 65%)",
          }}
        />
        <div className="container-site relative z-10">
          <Reveal className="flex flex-col gap-5 max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold/50" />
              <span className="font-sans text-eyebrow uppercase text-gold-light">
                What We Do
              </span>
            </div>
            <h1 className="font-display font-bold text-hero text-cream leading-[1.03]">
              One team.{" "}
              <span className="text-gold-light">Every layer</span>{" "}
              of your event.
            </h1>
            <div className="w-16 h-[2px] bg-gradient-to-r from-gold to-gold-light rounded-full" />
            <p className="font-sans text-body text-cream/70 max-w-2xl">
              Book one service or all of them. Either way, it comes from our
              warehouse and is installed by our crew.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Service blocks — alternating layout with ghost number */}
      {services.map((service, i) => (
        <Section
          key={service.title}
          tone={i % 2 === 0 ? "base" : "panel"}
          id={service.title.toLowerCase().replace(/[^a-z]/g, "-")}
          className={cn(
            "relative overflow-hidden",
            "pt-20 pb-40 md:pt-24 md:pb-48 lg:pt-48 lg:pb-32"
          )}
        >
          {/* Ghost service number */}
          <Reveal
            delay={0}
            className={cn(
              "absolute z-0 pointer-events-none select-none text-navy-deep/10",
              "bottom-4 right-4 md:bottom-8 md:right-8",
              "lg:top-8 lg:bottom-auto",
              i % 2 === 0 ? "lg:right-[10%] lg:left-auto" : "lg:left-[10%] lg:right-auto"
            )}
          >
            <span
              className="font-display font-bold leading-none"
              style={{ fontSize: "clamp(6rem, 12vw, 10rem)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          </Reveal>

          <div className="container-site grid lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Image with ClipReveal */}
            <div
              className={cn(
                "relative h-72 lg:h-[420px] rounded-3xl overflow-hidden shadow-card-hover card-gold-border group",
                i % 2 !== 0 && "lg:order-last"
              )}
            >
              <ClipReveal direction={i % 2 === 0 ? "left" : "right"} delay={0.1} className="w-full h-full">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 md:group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </ClipReveal>
            </div>

            {/* Content with Staggered Reveal */}
            <div className="flex flex-col gap-5">
              <Reveal delay={0.2}>
                <Badge label={service.eyebrow} variant="gold" className="self-start" />
              </Reveal>
              <Reveal delay={0.3}>
                <h2 className="font-display text-h2 font-bold text-navy-deep">
                  {service.title}
                </h2>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="w-10 h-[2px] bg-gold rounded-full" />
              </Reveal>
              <Reveal delay={0.5}>
                <p className="font-sans text-body text-text-slate leading-relaxed">
                  {service.description}
                </p>
                <ul className="flex flex-col gap-3 mt-4">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 font-sans text-sm text-text-slate">
                      <GoldCheck />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.6}>
                <Button
                  href={service.ctaHref}
                  variant="primary"
                  size="md"
                  className="self-start mt-3 md:group-hover:[&_svg]:translate-x-1"
                  external={service.ctaHref.startsWith("http")}
                >
                  {service.ctaLabel}
                </Button>
              </Reveal>
            </div>
          </div>
        </Section>
      ))}

      {/* Events we produce */}
      <Section tone="stage" className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-radial-glow)" }}
        />
        {/* Gold top border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="container-site flex flex-col gap-10 relative z-10">
          <SectionHeading
            eyebrow="EVENTS WE PRODUCE"
            heading="From intimate pujas to city-scale festivals."
            light
            align="center"
          />
          <div className="flex flex-wrap gap-3 justify-center">
            {eventsWeProduceTags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-sm text-cream/80 bg-white/8 border border-white/15 px-5 py-2.5 rounded-full hover:bg-gold/15 hover:border-gold/30 hover:text-cream transition duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="text-center pt-4">
            <Button href="/contact" variant="primary" size="lg">
              Plan Your Event
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
