"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { ease, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ClipRevealProps {
  children: React.ReactNode;
  direction?: "up" | "left" | "right" | "down";
  delay?: number;
  className?: string;
  /** Duration override (uses duration.reveal by default) */
  dur?: number;
}

const clips = {
  up:    { hidden: "inset(100% 0 0 0)",   visible: "inset(0% 0 0 0)" },
  down:  { hidden: "inset(0 0 100% 0)",   visible: "inset(0 0 0% 0)" },
  left:  { hidden: "inset(0 100% 0 0)",   visible: "inset(0 0% 0 0)" },
  right: { hidden: "inset(0 0 0 100%)",   visible: "inset(0 0 0 0%)" },
};

/**
 * ClipReveal — clip-path reveal motion primitive.
 *
 * IMPORTANT: the IntersectionObserver ref is placed on an UNCLIPPED outer
 * wrapper so it always has measurable area. The clip-path lives on the inner
 * motion.div only. This prevents the Signature Sets visibility regression
 * where a fully-clipped zero-area element never triggers.
 */
export function ClipReveal({
  children,
  direction = "up",
  delay = 0,
  className,
  dur = duration.reveal,
}: ClipRevealProps) {
  // Observation target — unclipped, always has layout area
  const observeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(observeRef, {
    once:   true,
    margin: "0px 0px -8% 0px",
    amount: 0.1,
  });
  const shouldReduceMotion = useReducedMotion();

  const clip = clips[direction];

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    // Outer wrapper: unclipped — this is what the IO observes
    <div ref={observeRef} className={cn("relative", className)}>
      {/* Inner: clip-path lives here — overflow-hidden scopes the clip visually */}
      <motion.div
        className="overflow-hidden w-full h-full"
        initial={{ clipPath: clip.hidden }}
        animate={isInView ? { clipPath: clip.visible } : { clipPath: clip.hidden }}
        transition={{ duration: dur, delay, ease: ease.expo }}
      >
        {children}
      </motion.div>
    </div>
  );
}
