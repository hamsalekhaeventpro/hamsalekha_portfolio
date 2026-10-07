"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";

export function FAQItem({ question, answer, idx }: { question: string; answer: string; idx: number }) {
  const [open, setOpen] = useState(false);
  const rm = useReducedMotion();

  return (
    <div className="border-b border-cream/10">
      <button
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && open) {
            setOpen(false);
          }
        }}
        className="w-full flex items-center justify-between gap-4 py-6 md:py-8 text-left group"
        aria-expanded={open}
        aria-controls={`faq-answer-${idx}`}
        id={`faq-${idx}`}
      >
        <span className="font-display text-xl md:text-2xl font-bold text-cream group-hover:text-gold-light transition-colors pr-4">{question}</span>
        <motion.div 
          animate={{ rotate: open ? 45 : 0 }} 
          transition={rm ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }} 
          className="shrink-0"
        >
          <Plus size={24} className="text-gold-dark group-hover:text-gold-light transition-colors" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-answer-${idx}`}
            initial={rm ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={rm ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="font-sans text-lg text-cream/70 pb-8 pr-8 leading-relaxed max-w-2xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <div className="flex flex-col border-t border-cream/10 w-full">
      {faqs.map((faq, i) => (
        <FAQItem key={i} idx={i} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}
