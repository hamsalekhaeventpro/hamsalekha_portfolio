"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ease } from "@/lib/motion";
import { projects } from "@/lib/projects";

const EXPO = ease.expo;

export function PortfolioPreview() {
  const preview = projects.slice(0, 6);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const rm = useReducedMotion();

  return (
    <Section tone="panel" aria-label="Portfolio Preview">
      <div className="container-site flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="10 · PORTFOLIO PREVIEW"
            heading="Recent stages."
            subHeading="Weddings, celebrations and corporate events, built by Hamsalekha."
          />
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-gold-dark hover:text-gold transition-colors shrink-0 group uppercase tracking-wider"
          >
            VIEW PORTFOLIO
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Editorial mixed grid */}
        <div ref={ref} className="grid grid-cols-12 gap-2 md:gap-3 lg:gap-4 auto-rows-[minmax(180px,auto)] md:auto-rows-[minmax(240px,auto)]">
          {preview.map((project, i) => {
            const delay = rm ? 0 : Math.min(i * 0.08, 0.45);
            
            // Grid cell classes based on index
            let gridClass = "";
            let sizes = "";
            
            switch (i) {
              case 0: // Dominant
                gridClass = "col-span-12 md:col-span-6 row-span-2";
                sizes = "(max-width: 768px) 100vw, 50vw";
                break;
              case 1: // Supporting 1
                gridClass = "col-span-6 md:col-span-6 row-span-1";
                sizes = "(max-width: 768px) 50vw, 50vw";
                break;
              case 2: // Supporting 2
                gridClass = "col-span-6 md:col-span-6 row-span-1";
                sizes = "(max-width: 768px) 50vw, 50vw";
                break;
              case 3: // Wide
                gridClass = "col-span-12 md:col-span-6 row-span-1";
                sizes = "(max-width: 768px) 100vw, 50vw";
                break;
              case 4: // Small 1
                gridClass = "col-span-6 md:col-span-3 row-span-1";
                sizes = "(max-width: 768px) 50vw, 25vw";
                break;
              case 5: // Small 2
                gridClass = "col-span-6 md:col-span-3 row-span-1";
                sizes = "(max-width: 768px) 50vw, 25vw";
                break;
              default:
                gridClass = "col-span-6";
                sizes = "50vw";
            }

            return (
              <motion.div
                key={project.slug}
                initial={rm ? {} : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.65, delay, ease: EXPO }}
                className={`relative overflow-hidden rounded-xl bg-navy-deep ${gridClass} h-full min-h-[200px]`}
              >
                <Link href={`/portfolio/${project.slug}`} className="group block w-full h-full">
                  <Image
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    fill
                    sizes={sizes}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />

                  {/* Hover overlay — slides up from bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5 md:p-6">
                    <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-400 ease-out">
                      <p className="font-sans text-xs tracking-[0.14em] uppercase text-gold-light font-semibold mb-1">
                        {project.category}
                      </p>
                      <h3 className="font-display text-lg md:text-xl font-bold text-cream leading-tight drop-shadow-md">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
