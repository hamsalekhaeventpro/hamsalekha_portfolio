"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface AnimatedCounterProps {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

function formatNumber(n: number): string {
  if (n >= 100000) return n.toLocaleString("en-IN");
  if (n >= 1000) return n.toLocaleString("en-IN");
  return n.toString();
}

export function AnimatedCounter({
  to,
  from = 0,
  duration = 2, // GSAP duration is in seconds
  suffix = "",
  prefix = "",
  className,
}: AnimatedCounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (numberRef.current) {
        numberRef.current.innerText = formatNumber(from);
      }

      const target = { val: from };
      
      gsap.to(target, {
        val: to,
        duration: duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.innerText = formatNumber(Math.round(target.val));
          }
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <span ref={containerRef} className={cn("tabular-nums", className)}>
      {prefix}
      <span ref={numberRef}>{formatNumber(to)}</span>
      {suffix}
    </span>
  );
}
