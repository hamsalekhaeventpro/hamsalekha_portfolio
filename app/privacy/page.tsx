import type { Metadata } from "next";
import Link from "next/link";
import { getPageMetadata } from "@/lib/metadata";
import { Section } from "@/components/layout/Section";
import { microcopy } from "@/lib/content";

export const metadata: Metadata = getPageMetadata("privacy", "/privacy");

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>

          <p className="mt-6 font-sans text-base md:text-lg text-cream/70 leading-relaxed max-w-2xl">
            How Hamsalekha Event Production Pvt. Ltd. collects, handles, and protects information submitted through our event enquiry forms and digital services.
          </p>

          <p className="mt-4 font-sans text-xs text-cream/45">
            Effective Date: March 2026 · Bengaluru, Karnataka, India
          </p>
        </div>
      </Section>

      {/* 2. POLICY BODY */}
      <Section tone="base" className="py-20 md:py-28">
        <div className="container-site max-w-3xl mx-auto font-sans text-navy-deep space-y-14">
          
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-deep">
              1. Overview
            </h2>
            <div className="w-10 h-0.5 bg-gold-dark/40 mb-4" />
            <p className="text-text-slate leading-relaxed">
              Hamsalekha Event Production Pvt. Ltd. (“Hamsalekha”, “we”, “our”, or “us”) provides technical production, lighting, silent gensets, truss structures, and premium furniture for weddings, corporate galas, and celebrations across Bengaluru and Karnataka. This Privacy Policy details our principles regarding information shared when submitting an event enquiry or browsing our website.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-deep">
              2. Information We Collect
            </h2>
            <div className="w-10 h-0.5 bg-gold-dark/40 mb-4" />
            <p className="text-text-slate leading-relaxed">
              When you submit our event enquiry form or contact us via WhatsApp or phone, we collect only the details necessary to assess and prepare a quotation for your event:
            </p>
            <ul className="space-y-3 pl-2">
              <li className="flex items-start gap-3 text-text-slate">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-2.5 shrink-0" />
                <span><strong className="text-navy-deep">Name:</strong> To address you and identify your booking request.</span>
              </li>
              <li className="flex items-start gap-3 text-text-slate">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-2.5 shrink-0" />
                <span><strong className="text-navy-deep">Phone / WhatsApp Number:</strong> Required for direct coordination, site recce scheduling, and sending quotations.</span>
              </li>
              <li className="flex items-start gap-3 text-text-slate">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-2.5 shrink-0" />
                <span><strong className="text-navy-deep">Email Address:</strong> (Optional) For sending formal PDF proposals, itemised inventory lists, and agreements.</span>
              </li>
              <li className="flex items-start gap-3 text-text-slate">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-2.5 shrink-0" />
                <span><strong className="text-navy-deep">Event Details:</strong> Client type (family, planner, agency, venue), event date, venue location in Bengaluru, estimated guest count, required services (lighting, power, truss, furniture, decor, full production), and any special design notes or references.</span>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-deep">
              3. How Your Information Is Used
            </h2>
            <div className="w-10 h-0.5 bg-gold-dark/40 mb-4" />
            <p className="text-text-slate leading-relaxed">
              All information collected is used solely for event production purposes:
            </p>
            <ul className="space-y-3 pl-2 text-text-slate">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-2.5 shrink-0" />
                <span>Evaluating inventory availability in our warehouse for your specific date.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-2.5 shrink-0" />
                <span>Calculating power requirements (KVA), truss engineering spans, and transport logistics.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-2.5 shrink-0" />
                <span>Direct correspondence regarding venue access, site recce timelines, and setup schedules.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-2.5 shrink-0" />
                <span>We <strong className="text-navy-deep">never</strong> sell, rent, or trade your contact information with external marketing agencies or third parties.</span>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-deep">
              4. Cookies & Security
            </h2>
            <div className="w-10 h-0.5 bg-gold-dark/40 mb-4" />
            <p className="text-text-slate leading-relaxed">
              Our website uses essential technical cookies required for proper site navigation, accessibility preferences, and Cloudflare Turnstile spam protection on enquiry submissions. We do not run invasive tracking or retargeting pixels.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-deep">
              5. Data Removal & Contact Method
            </h2>
            <div className="w-10 h-0.5 bg-gold-dark/40 mb-4" />
            <p className="text-text-slate leading-relaxed">
              You may request an update, verification, or complete deletion of your submitted enquiry data from our records at any time. To do so, please contact us directly:
            </p>
            <div className="p-6 bg-navy-deep/5 border-l-2 border-gold-dark rounded-r space-y-2 mt-4">
              <p className="text-sm font-semibold text-navy-deep">Hamsalekha Event Production Pvt. Ltd.</p>
              <p className="text-sm text-text-slate">Email: <a href={`mailto:${microcopy.email}`} className="text-gold-dark hover:underline font-medium">{microcopy.email}</a></p>
              <p className="text-sm text-text-slate">Phone / WhatsApp: <a href={`tel:${microcopy.phoneRaw}`} className="text-gold-dark hover:underline font-medium">{microcopy.phone}</a></p>
              <p className="text-sm text-text-slate">Warehouse & Office: {microcopy.address} (visits by appointment)</p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-deep">
              6. Governing Jurisdiction
            </h2>
            <div className="w-10 h-0.5 bg-gold-dark/40 mb-4" />
            <p className="text-text-slate leading-relaxed">
              This policy is governed by the laws of India and subject to the exclusive jurisdiction of the competent courts in Bengaluru, Karnataka.
            </p>
          </section>

          {/* Return home link */}
          <div className="pt-8 border-t border-navy-deep/10 flex items-center justify-between">
            <Link href="/" className="font-sans text-sm font-bold uppercase tracking-wider text-gold-dark hover:text-navy-deep transition-colors">
              ← Return to Home
            </Link>
            <Link href="/terms" className="font-sans text-sm font-bold uppercase tracking-wider text-gold-dark hover:text-navy-deep transition-colors">
              Terms of Service →
            </Link>
          </div>
        </div>
      </Section>
    </article>
  );
}
