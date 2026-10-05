"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { LightsUp } from "@/components/motion/LightsUp";
import { cn } from "@/lib/utils";

interface DayNightCrossfadeProps {
  dayImage: string;
  nightImage: string;
  alt: string;
  className?: string;
}

export function DayNightCrossfade({
  dayImage,
  nightImage,
  alt,
  className,
}: DayNightCrossfadeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const isPlaceholder = !dayImage || !nightImage || dayImage === nightImage;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Crossfade between 30% and 70% of the element's scroll progress
  const nightOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);

  if (isPlaceholder) {
    return (
      <div ref={containerRef} className={cn("relative w-full h-full", className)}>
        <LightsUp trigger="view">
          <Image
            src={nightImage || dayImage}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </LightsUp>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative w-full h-full", className)}>
      {/* Day Image (Background) */}
      <div className="absolute inset-0">
        <Image
          src={dayImage}
          alt={`Daytime view of ${alt}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Night Image (Foreground crossfading in) */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: shouldReduceMotion ? 1 : nightOpacity }}
      >
        <Image
          src={nightImage}
          alt={`Nighttime view of ${alt}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </motion.div>
    </div>
  );
}
