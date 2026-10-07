"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subHeading?: string;
  align?: "left" | "center";
  /** Use light=true when on navy/dark backgrounds */
  light?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

/**
 * SectionHeading — reusable heading block with eyebrow, heading, optional subheading.
 *
 * Eyebrow: short gold hairline + small-caps label
 * Heading: Playfair Display, bold, text-balance
 * SubHeading: Inter, body size, max-width 65ch
 *
 * Phase 1: uses viewport token for reveal timing, respects reduced-motion.
 */
export function SectionHeading({
  eyebrow,
  heading,
  subHeading,
  align = "left",
  light = false,
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  const rm = useReducedMotion();

  return (
    <motion.div
      initial={rm ? false : "hidden"}
      whileInView="visible"
      viewport={viewport}
      variants={fadeUp}
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <div className={cn("flex items-center gap-4", align === "center" && "justify-center")}>
          {/* Short gold hairline */}
          <span
            aria-hidden="true"
            className={cn(
              "h-px w-8 shrink-0",
              light ? "bg-gold/50" : "bg-gold/60"
            )}
          />
          <span
            className={cn(
              "font-sans text-eyebrow uppercase",
              light ? "text-gold" : "text-gold-text"
            )}
          >
            {eyebrow}
          </span>
        </div>
      )}

      <Tag
        className={cn(
          "font-display font-bold text-balance",
          light ? "text-cream" : "text-navy-deep",
          Tag === "h1" ? "text-h1" : Tag === "h3" ? "text-h3" : "text-h2"
        )}
      >
        {heading}
      </Tag>

      {subHeading && (
        <p
          className={cn(
            "font-sans text-base max-w-[65ch] leading-relaxed",
            light ? "text-cream/70" : "text-text-slate"
          )}
        >
          {subHeading}
        </p>
      )}
    </motion.div>
  );
}
