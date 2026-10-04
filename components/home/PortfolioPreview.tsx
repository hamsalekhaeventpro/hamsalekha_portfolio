"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryImages } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

const tabs = ["All", "Weddings", "Corporate", "Signature Sets"] as const;
type Tab = (typeof tabs)[number];

const categoryMap: Record<Tab, string | null> = {
  All: null,
  Weddings: "weddings",
  Corporate: "corporate",
  "Signature Sets": "signature-sets",
};

export function PortfolioPreview() {
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const filtered = activeTab === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === categoryMap[activeTab]);

  // Show max 6 in preview
  const preview = filtered.slice(0, 6);

  return (
    <section className="section-py bg-bg-panel" aria-label="Project Stories">
      <div className="container-site flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="PROJECT STORIES"
            heading="Stages we've set."
            subHeading="Twenty years of events across Bengaluru."
          />
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-gold-dark hover:text-gold transition-colors shrink-0 group"
          >
            Explore all stories
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter portfolio">
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full font-sans text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? "bg-navy-deep text-cream shadow-md"
                  : "bg-white border border-navy-deep/10 text-text-slate hover:border-gold/40 hover:text-navy-deep"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {preview.map((img, i) => (
              <PortfolioCard key={img.id} img={img} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all CTA */}
        <div className="text-center pt-2">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-navy-deep/20 font-sans text-sm font-semibold text-navy-deep hover:bg-navy-deep hover:text-cream hover:border-navy-deep transition-all duration-300 group"
          >
            View all projects
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({ img, index }: { img: (typeof galleryImages)[0]; index: number }) {
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (window.innerWidth < 1024) {
          setInView(entry.isIntersecting);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.35 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      data-inview={inView}
      onClick={() => setInView(!inView)}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-navy-deep card-gold-border ${
        img.span === "tall" ? "row-span-2" : ""
      } ${index === 0 ? "sm:col-span-2 lg:col-span-2" : ""}`}
      style={{ minHeight: index === 0 ? "420px" : "260px" }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] group-data-[inview=true]:scale-[1.05]"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent opacity-70 group-hover:opacity-100 group-data-[inview=true]:opacity-100 transition-opacity duration-400" />
      {/* Caption */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-2 group-hover:translate-y-0 group-data-[inview=true]:translate-y-0 transition-transform duration-400">
        <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-gold-light mb-1 opacity-0 group-hover:opacity-100 group-data-[inview=true]:opacity-100 transition-opacity duration-300">
          {img.eventType} · {img.year}
        </span>
        <h3 className="font-display text-xl font-bold text-cream">
          {img.venue}
        </h3>
      </div>
    </div>
  );
}
