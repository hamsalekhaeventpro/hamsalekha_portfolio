"use client";

import { motion } from "framer-motion";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { ReactNode } from "react";

export function ServiceMotion({ title, i, children }: { title: string; i: number; children: ReactNode }) {
  if (title === "Lighting") {
    // Subtle beam sweep
    return (
      <div className="w-full h-full relative overflow-hidden">
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          whileInView={{ x: "200%", opacity: [0, 0.4, 0] }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "linear" }}
          className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-cream/30 to-transparent pointer-events-none -skew-x-12"
        />
      </div>
    );
  }
  
  if (title === "Gensets & Power") {
    // Subtle energy/light pulse
    return (
      <div className="w-full h-full relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.3, 0] }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5, times: [0, 0.1, 1], ease: "easeOut", delay: 0.6 }}
          className="absolute inset-0 bg-gold-light pointer-events-none mix-blend-overlay"
        />
      </div>
    );
  }

  if (title === "Truss & Structures") {
    // Structural draw
    return (
      <div className="w-full h-full relative overflow-hidden bg-navy-deep">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
        {/* Draw grid lines */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-1/3 left-0 w-full h-[1px] bg-gold/30 pointer-events-none origin-left"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-2/3 left-0 w-full h-[1px] bg-gold/30 pointer-events-none origin-right"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-1/3 w-[1px] h-full bg-gold/30 pointer-events-none origin-top"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-2/3 w-[1px] h-full bg-gold/30 pointer-events-none origin-bottom"
        />
      </div>
    );
  }

  if (title === "Premium Furniture") {
    // Editorial image reveal
    return (
      <ClipReveal direction="up" delay={0.2} className="w-full h-full">
        {children}
      </ClipReveal>
    );
  }

  if (title === "Decor & Props") {
    // Controlled image reveal
    return (
      <motion.div
        initial={{ clipPath: "inset(10% 10% 10% 10%)", opacity: 0 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    );
  }

  if (title === "Full Event Production") {
    // Sequential choreography (3 panels)
    return (
      <div className="w-full h-full relative overflow-hidden flex">
        <motion.div
          initial={{ y: "100%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="w-1/3 h-full overflow-hidden relative"
        >
          <div className="absolute inset-0 w-[300%]">{children}</div>
        </motion.div>
        <motion.div
          initial={{ y: "-100%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-1/3 h-full overflow-hidden relative"
        >
          <div className="absolute inset-0 w-[300%] -left-[100%]">{children}</div>
        </motion.div>
        <motion.div
          initial={{ y: "100%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-1/3 h-full overflow-hidden relative"
        >
          <div className="absolute inset-0 w-[300%] -left-[200%]">{children}</div>
        </motion.div>
      </div>
    );
  }

  // Fallback
  return (
    <ClipReveal direction={i % 2 === 0 ? "left" : "right"} delay={0.1} className="w-full h-full">
      {children}
    </ClipReveal>
  );
}
