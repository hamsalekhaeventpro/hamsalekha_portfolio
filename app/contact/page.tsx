import { Metadata } from "next";
import { contactHero, contactDetails, faqs, careersSection, microcopy } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { FaqAccordion } from "@/components/contact/FaqAccordion";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata("contact", "/contact");

function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <Section tone="stage" className="pt-36 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(201,162,39,0.12), transparent 65%)",
          }}
        />
        <div className="container-site relative z-10">
          <Reveal className="flex flex-col gap-5 max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold/50" />
              <span className="font-sans text-eyebrow uppercase text-gold-light">
                {contactHero.eyebrow}
              </span>
            </div>
            <h1 className="font-display font-bold text-hero text-cream leading-[1.03]">
              {contactHero.headline}
            </h1>
            <div className="w-16 h-[2px] bg-gradient-to-r from-gold to-gold-light rounded-full" />
            <p className="font-sans text-body text-cream/70 max-w-xl">
              {contactHero.subline}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Form + Details */}
      <Section tone="base">
        <div className="container-site grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>

          {/* Contact details sidebar */}
          <div className="flex flex-col gap-6">
            <Reveal delay={0.1} className="bg-navy-deep rounded-3xl p-8 flex flex-col gap-6 border border-gold/15">
              {/* Gold rule header */}
              <div className="border-b border-gold/20 pb-4">
                <h3 className="font-display text-h4 font-bold text-cream">Reach us</h3>
              </div>
              <a href={`tel:${contactDetails.phoneRaw}`} className="flex items-center gap-3 text-cream/80 hover:text-gold-light transition-colors group">
                <Phone size={16} className="text-gold shrink-0" />
                <div>
                  <p className="font-sans text-sm font-semibold text-gold-light group-hover:text-gold transition-colors">{contactDetails.phone}</p>
                  <p className="font-sans text-xs text-cream/40">Call or WhatsApp</p>
                </div>
              </a>
              <div className="flex items-start gap-3 text-cream/80">
                <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-sans text-sm font-medium">{contactDetails.location}</p>
                  <p className="font-sans text-xs text-cream/50">{contactDetails.locationNote}</p>
                </div>
              </div>
              <a href={contactDetails.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-cream/80 hover:text-gold-light transition-colors">
                <InstagramIcon size={16} className="text-gold shrink-0" />
                <p className="font-sans text-sm font-medium">{contactDetails.instagram}</p>
              </a>
              <div className="border-t border-gold/15 pt-4">
                <p className="font-sans text-xs text-cream/40">{contactDetails.eventSupport}</p>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="bg-gold/10 border border-gold/20 rounded-3xl p-6 flex flex-col gap-3">
              <p className="font-display text-body font-semibold text-navy-deep">Prefer to chat?</p>
              <p className="font-sans text-sm text-text-slate">WhatsApp us and we&apos;ll get back to you quickly.</p>
              <a
                href={`https://wa.me/${microcopy.whatsappNumber}?text=${encodeURIComponent(microcopy.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-sans text-sm font-semibold text-gold-dark hover:text-gold transition-colors"
              >
                Open WhatsApp
                <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
              </a>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="panel" id="faq">
        <div className="container-site max-w-3xl flex flex-col gap-10">
          <SectionHeading eyebrow="FAQ" heading="Common questions, straight answers." />
          <FaqAccordion faqs={faqs} />
        </div>
      </Section>

      {/* Careers */}
      <Section tone="stage" id="careers">
        <div className="container-site grid lg:grid-cols-2 gap-12 items-start">
          <Reveal className="flex flex-col gap-5">
            <span className="font-sans text-eyebrow uppercase text-gold-light">{careersSection.eyebrow}</span>
            <h2 className="font-display text-h2 font-semibold text-cream">{careersSection.headline}</h2>
            <p className="font-sans text-body text-cream/75">{careersSection.body}</p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-4">
            {careersSection.bullets.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                <p className="font-sans text-body text-cream/80">{b}</p>
              </div>
            ))}
            <a href={careersSection.ctaHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-gold-light hover:text-gold transition-colors mt-2">
              {careersSection.cta}
            </a>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
