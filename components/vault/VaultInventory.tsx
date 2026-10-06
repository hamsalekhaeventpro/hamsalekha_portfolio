"use client";

import { motion } from "framer-motion";
import { inventory } from "@/lib/content";

export function VaultInventory() {
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const rowVars = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-gold/20 shadow-gold-glow">
      <div className="overflow-x-auto">
        <motion.table 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          variants={containerVars}
          className="w-full text-left whitespace-nowrap sm:whitespace-normal min-w-[400px]"
        >
          <thead>
            <tr className="bg-navy-deep">
              <th className="font-sans text-eyebrow text-gold-light uppercase px-8 py-5">
                Category
              </th>
              <th className="font-sans text-eyebrow text-gold-light uppercase px-8 py-5">
                Capacity
              </th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((row, i) => (
              <motion.tr
                key={row.category}
                variants={rowVars}
                className={`border-b border-gold/10 last:border-0 transition-colors hover:bg-gold/5 ${
                  i % 2 === 0 ? "bg-card-bg" : "bg-panel-warm/40"
                }`}
              >
                <td className="font-display text-body font-semibold text-navy-deep px-8 py-5">
                  {row.category}
                </td>
                <td className="font-sans text-body text-text-slate px-8 py-5">
                  {row.capacity}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
}
