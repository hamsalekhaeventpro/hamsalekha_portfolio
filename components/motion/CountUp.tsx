"use client";

import { useRef, useEffect } from "react";
import { useInView, useReducedMotion, animate } from "framer-motion";
import { duration, ease } from "@/lib/motion";

interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

function formatNumber(n: number): string {
  if (n >= 100000) return n.toLocaleString("en-IN");
  if (n >= 1000) return n.toLocaleString("en-IN");
  return n.toString();
}

export function CountUp({ to, prefix = "", suffix = "", className }: CountUpProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "0px 0px -10% 0px", amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    
    if (shouldReduceMotion) {
      node.textContent = formatNumber(to);
      return;
    }

    if (!isInView) {
      node.textContent = "0";
      return;
    }

    const controls = animate(0, to, {
      duration: duration.large,
      ease: ease.expo,
      onUpdate(value) {
        if (node) {
          node.textContent = formatNumber(Math.round(value));
        }
      },
    });

    return () => controls.stop();
  }, [to, isInView, shouldReduceMotion]);

  const finalValueStr = `${prefix}${formatNumber(to)}${suffix}`;

  return (
    <span className={className} data-value={to}>
      <span className="sr-only">{finalValueStr}</span>
      <span aria-hidden="true" className="inline-block">
        {prefix}
        <span ref={nodeRef}>{formatNumber(to)}</span>
        {suffix}
      </span>
    </span>
  );
}

// Kept for backward compatibility
export const AnimatedCounter = CountUp;
