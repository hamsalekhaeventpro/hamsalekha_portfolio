import { Plus } from "lucide-react";

export function FAQItem({
  question,
  answer,
  idx,
}: {
  question: string;
  answer: string;
  idx: number;
}) {
  return (
    <details className="border-b border-cream/10 group" id={`faq-${idx}`}>
      <summary className="w-full flex items-center justify-between gap-4 py-6 md:py-8 text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-gold-light select-none">
        <span className="font-display text-xl md:text-2xl font-bold text-cream group-hover:text-gold-light transition-colors pr-4">
          {question}
        </span>
        <div className="shrink-0 transition-transform duration-300 ease-out group-open:rotate-45">
          <Plus size={24} className="text-gold-dark group-hover:text-gold-light transition-colors" />
        </div>
      </summary>
      <div className="pb-8 pr-8 font-sans text-lg text-cream/70 leading-relaxed max-w-2xl">
        <p>{answer}</p>
      </div>
    </details>
  );
}

export function FaqAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <div className="flex flex-col border-t border-cream/10 w-full" id="faq-list">
      {faqs.map((faq, i) => (
        <FAQItem key={i} idx={i} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}
