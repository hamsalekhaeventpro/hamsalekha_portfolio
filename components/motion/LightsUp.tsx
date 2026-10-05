"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface LightsUpProps {
  children: React.ReactNode;
  once?: boolean;
  trigger?: "load" | "view";
  delay?: number;
  className?: string;
}

export function LightsUp({ children, once = true, trigger = "view", delay = 0, className }: LightsUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "0px 0px -10% 0px", amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  const start = trigger === "load" ? true : isInView;

  return (
    <div ref={ref} className={cn("relative overflow-hidden w-full h-full", className)}>
      <motion.div
        className="w-full h-full"
        initial={{ scale: shouldReduceMotion ? 1 : 1.06 }}
        animate={{ scale: start ? 1 : (shouldReduceMotion ? 1 : 1.06) }}
        transition={{ duration: duration.settle, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-navy-deep pointer-events-none"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: start ? 0 : 0.7 }}
        transition={{ duration: duration.cue, delay, ease: ease.expo }}
        data-lightsup
      />
    </div>
  );
}
