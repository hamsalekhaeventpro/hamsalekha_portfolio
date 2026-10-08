"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";

export function TrussMotionAccent() {
  const rm = useReducedMotion();
  if (rm) return null;

  return (
    <div className="absolute inset-0 pointer-events-none p-6 md:p-12 opacity-40 flex items-center justify-center z-0">
      <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none" className="text-white">
        <motion.path
          d="M 0,10 L 400,10 M 0,90 L 400,90 M 10,10 L 30,90 L 50,10 L 70,90 L 90,10 L 110,90 L 130,10 L 150,90 L 170,10 L 190,90 L 210,10 L 230,90 L 250,10 L 270,90 L 290,10 L 310,90 L 330,10 L 350,90 L 370,10 L 390,90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1.2, ease: ease.expo, delay: 0.2 }}
        />
      </svg>
    </div>
  );
}
