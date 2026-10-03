"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subHeading?: string;
  align?: "left" | "center";
  light?: boolean; // cream text on navy backgrounds
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  heading,
  subHeading,
  align = "left",
  light = false,
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <div className={cn("flex items-center gap-4", align === "center" && "justify-center")}>
          <span
            className={cn(
              "h-px w-8",
              light ? "bg-gold/40" : "bg-gold-dark/40"
            )}
          />
          <span
            className={cn(
              "font-sans text-[0.7rem] font-semibold tracking-[0.22em] uppercase",
              light ? "text-gold-light" : "text-gold-dark"
            )}
          >
            {eyebrow}
          </span>
        </div>
      )}
      <Tag
        className={cn(
          "font-display font-bold",
          light ? "text-cream" : "text-navy-deep"
        )}
        style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: "1.1" }}
      >
        {heading}
      </Tag>
      {subHeading && (
        <p
          className={cn(
            "font-sans text-base max-w-2xl leading-relaxed",
            light ? "text-cream/75" : "text-text-slate"
          )}
        >
          {subHeading}
        </p>
      )}
    </motion.div>
  );
}
