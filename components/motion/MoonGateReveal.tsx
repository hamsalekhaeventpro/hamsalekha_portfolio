"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function MoonGateReveal({ image, imageAlt }: { image: string, imageAlt: string }) {
  return (
    <motion.div
      initial={{ clipPath: "circle(0% at 50% 50%)", scale: 0.9, opacity: 0 }}
      whileInView={{ clipPath: "circle(50% at 50% 50%)", scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full relative"
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover transition-transform duration-[2s] hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div className="absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(201,162,39,0.15)] pointer-events-none" />
    </motion.div>
  );
}
