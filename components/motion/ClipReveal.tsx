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
  /** Duration override */
  dur?: number;
}

const clips = {
  up:    { hidden: "inset(100% 0 0 0)", visible: "inset(0% 0 0 0)" },
  down:  { hidden: "inset(0 0 100% 0)", visible: "inset(0 0 0% 0)" },
  left:  { hidden: "inset(0 100% 0 0)", visible: "inset(0 0% 0 0)" },
  right: { hidden: "inset(0 0 0 100%)", visible: "inset(0 0 0 0%)" },
};

export function ClipReveal({
  children,
  direction = "up",
  delay = 0,
  className,
  dur = duration.reveal,
}: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -8% 0px", amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  const clip = clips[direction];

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: clip.hidden }}
      animate={isInView ? { clipPath: clip.visible } : { clipPath: clip.hidden }}
      transition={{ duration: dur, delay, ease: ease.expo }}
    >
      {children}
    </motion.div>
  );
}
