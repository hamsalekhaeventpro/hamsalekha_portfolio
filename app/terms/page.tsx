import type { Metadata } from "next";
import Link from "next/link";
import { getPageMetadata } from "@/lib/metadata";
import { Section } from "@/components/layout/Section";
import { microcopy } from "@/lib/content";

export const metadata: Metadata = getPageMetadata("terms", "/terms");

export default function TermsPage() {
  return (
    <article className="min-h-screen">
      {/* 1. HERO HEADER */}
      <Section tone="stage" className="pt-32 pb-20 md:pt-40 md:pb-24 border-b border-gold/15">
        <div className="container-site max-w-4xl mx-auto">
          {/* Draft Notice */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-gold/30 bg-gold/5 text-gold-light text-xs font-mono uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Draft — Review before publishing
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-8 bg-gold-dark/40" />
            <span className="font-sans text-[0.6875rem] uppercase font-bold tracking-[0.25em] text-gold-dark">
              Legal & Compliance
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream tracking-tight leading-[1.1]">
            Terms of Service
          </h1>

          <p className="mt-6 font-sans text-base md:text-lg text-cream/70 leading-relaxed max-w-2xl">
            Guidelines and legal provisions governing the use of this website, event enquiry submissions, and service quotations with Hamsalekha Event Production Pvt. Ltd.
          </p>

          <p className="mt-4 font-sans text-xs text-cream/45">
            Effective Date: March 2026 · Bengaluru, Karnataka, India
          </p>
        </div>
      </Section>

      {/* 2. TERMS BODY */}
      <Section tone="base" className="py-20 md:py-28">
        <div className="container-site max-w-3xl mx-auto font-sans text-navy-deep space-y-14">
          
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-deep">
              1. Website Usage & Intellectual Property
            </h2>
            <div className="w-10 h-0.5 bg-gold-dark/40 mb-4" />
            <p className="text-text-slate leading-relaxed">
              All editorial copy, event photography, architectural set designs (including The Glass House and MoonGate), technical specifications, and branding materials on this website are the proprietary assets of Hamsalekha Event Production Pvt. Ltd. You may browse and download content solely for personal, non-commercial evaluation of event services. Reproduction, redistribution, or commercial use without prior written consent is strictly prohibited.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-deep">
              2. Enquiry Submissions & Quotations
            </h2>
            <div className="w-10 h-0.5 bg-gold-dark/40 mb-4" />
            <p className="text-text-slate leading-relaxed">
              Submitting an enquiry via our website form, phone, or WhatsApp does not constitute a confirmed event booking or date lock.
            </p>
            <ul className="space-y-3 pl-2 text-text-slate">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-2.5 shrink-0" />
                <span><strong className="text-navy-deep">Proposals & Estimates:</strong> All quotations, line-item budgets, and equipment lists provided are preliminary estimates based on client-provided requirements and available inventory.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-2.5 shrink-0" />
                <span><strong className="text-navy-deep">Site Recce & Feasibility:</strong> Final power calculations, truss engineering spans, and rigging safety are subject to a mandatory site inspection (recce) at the venue by our technical supervisors.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-2.5 shrink-0" />
                <span><strong className="text-navy-deep">Formal Confirmation:</strong> Bookings are finalized only upon signing an official contract/work order and receipt of the agreed advance payment.</span>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-deep">
              3. Catalogue & External Links
            </h2>
            <div className="w-10 h-0.5 bg-gold-dark/40 mb-4" />
            <p className="text-text-slate leading-relaxed">
              Our website provides links to our dedicated furniture and lighting catalogue (<span className="text-navy-deep font-medium">https://hamsalekha-event-production.web.app/</span>) and social channels. While we maintain real-time inventory updates, listed availability, piece counts, and fabric finishes remain indicative until verified against ongoing event schedules at our Kothanur warehouse.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-deep">
              4. Accuracy & Technical Disclaimers
            </h2>
            <div className="w-10 h-0.5 bg-gold-dark/40 mb-4" />
            <p className="text-text-slate leading-relaxed">
              Hamsalekha strives to provide accurate descriptions of equipment, genset capacities (40–125 KVA), and structural dimensions. However, on-site venue regulations, ceiling load ratings, municipal sound curfews, and weather conditions may require technical adjustments. Our on-site rigging supervisors retain final authority on safety parameters to ensure attendee protection.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-deep">
              5. Governing Law & Dispute Resolution
            </h2>
            <div className="w-10 h-0.5 bg-gold-dark/40 mb-4" />
            <p className="text-text-slate leading-relaxed">
              These terms are governed in all respects by the laws of India. Any legal proceedings or disputes arising under these terms or our event production agreements shall be subject to the exclusive jurisdiction of the competent courts in Bengaluru, Karnataka.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-deep">
              6. Contact & Office Information
            </h2>
            <div className="w-10 h-0.5 bg-gold-dark/40 mb-4" />
            <div className="p-6 bg-navy-deep/5 border-l-2 border-gold-dark rounded-r space-y-2">
              <p className="text-sm font-semibold text-navy-deep">Hamsalekha Event Production Pvt. Ltd.</p>
              <p className="text-sm text-text-slate">Email: <a href={`mailto:${microcopy.email}`} className="text-gold-dark hover:underline font-medium">{microcopy.email}</a></p>
              <p className="text-sm text-text-slate">Phone / WhatsApp: <a href={`tel:${microcopy.phoneRaw}`} className="text-gold-dark hover:underline font-medium">{microcopy.phone}</a></p>
              <p className="text-sm text-text-slate">Warehouse & Office: {microcopy.address} (visits by appointment)</p>
            </div>
          </section>

          {/* Return home link */}
          <div className="pt-8 border-t border-navy-deep/10 flex items-center justify-between">
            <Link href="/" className="font-sans text-sm font-bold uppercase tracking-wider text-gold-dark hover:text-navy-deep transition-colors">
              ← Return to Home
            </Link>
            <Link href="/privacy" className="font-sans text-sm font-bold uppercase tracking-wider text-gold-dark hover:text-navy-deep transition-colors">
              Privacy Policy →
            </Link>
          </div>
        </div>
      </Section>
    </article>
  );
}
