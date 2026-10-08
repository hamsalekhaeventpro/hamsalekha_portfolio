import { Metadata } from "next";
import { contactHero, contactDetails, faqs, careersSection, microcopy, portfolioCTA } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { FaqAccordion } from "@/components/contact/FaqAccordion";
import { getPageMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = getPageMetadata("contact", "/contact");

function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="4" ry="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* 1. DARK CINEMATIC HERO */}
      <Section tone="stage" className="relative min-h-[560px] md:min-h-[640px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.1),transparent_50%)]" />
        <div className="container-site relative z-10 w-full pt-20">
          <div className="max-w-2xl flex flex-col gap-6">
            <Reveal delay={0.1}>
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-gold-dark/40" />
                <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-dark">
                  {contactHero.eyebrow}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <h1 className="font-display font-bold text-5xl md:text-7xl text-cream leading-[1.05]">
                Let&apos;s create<br />
                extraordinary.
              </h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-sans text-lg md:text-xl text-cream/70 leading-relaxed max-w-lg mt-2">
                {contactHero.subline}
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 2. WARM IVORY CONTACT + ENQUIRY */}
      <Section tone="base" className="py-24 lg:py-32">
        <div className="container-site grid lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-12">
          
          {/* LEFT: Contact Details */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <Reveal>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <span className="h-px w-8 bg-gold-dark/40" />
                  <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-dark">
                    CONTACT DETAILS
                  </span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-deep">
                  Tell us about<br />
                  your event.
                </h2>
                <div className="w-12 h-[1px] bg-gold-dark/40" />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-col gap-8 mt-2">
                
                {/* Location */}
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-gold-dark shrink-0 mt-1" />
                  <div className="flex flex-col gap-1">
                    <span className="font-sans text-xs uppercase tracking-widest text-text-slate font-bold">Warehouse</span>
                    <span className="font-sans text-lg text-navy-deep max-w-[250px] leading-relaxed">{contactDetails.location}</span>
                    <span className="font-sans text-sm text-text-slate mt-1">{contactDetails.locationNote}</span>
                  </div>
                </div>
                
                {/* Phone */}
                <a href={`tel:${contactDetails.phoneRaw}`} className="flex items-start gap-4 group">
                  <Phone size={20} className="text-gold-dark shrink-0 mt-1 transition-transform group-hover:scale-110 duration-300" />
                  <div className="flex flex-col gap-1">
                    <span className="font-sans text-xs uppercase tracking-widest text-text-slate font-bold">Call or WhatsApp</span>
                    <span className="font-display text-2xl text-navy-deep group-hover:text-gold-dark transition-colors">{contactDetails.phone}</span>
                  </div>
                </a>

                {/* Instagram */}
                <a href={contactDetails.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                  <InstagramIcon size={20} className="text-gold-dark shrink-0 mt-1 transition-transform group-hover:scale-110 duration-300" />
                  <div className="flex flex-col gap-1">
                    <span className="font-sans text-xs uppercase tracking-widest text-text-slate font-bold">Instagram</span>
                    <span className="font-sans text-lg text-navy-deep group-hover:text-gold-dark transition-colors">{contactDetails.instagram}</span>
                  </div>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-4 flex flex-col gap-4">
                <p className="font-sans text-text-slate leading-relaxed border-l-2 border-gold-dark pl-4">
                  {contactDetails.eventSupport}
                </p>
                <a
                  href={`https://wa.me/${microcopy.whatsappNumber}?text=${encodeURIComponent(microcopy.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-sans text-sm uppercase tracking-widest font-bold text-gold-dark hover:text-navy-deep transition-colors mt-2"
                >
                  Open WhatsApp
                  <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Enquiry Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 3. DARK FAQ */}
      <Section tone="stage" id="faq" className="py-24 lg:py-32 relative overflow-hidden border-t border-gold/10">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,162,39,0.08),transparent_60%)]" />
        <div className="container-site relative z-10 max-w-3xl flex flex-col gap-16 mx-auto">
          <Reveal>
            <div className="flex flex-col items-center text-center gap-6">
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-gold-dark/40" />
                <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-dark">
                  FAQ
                </span>
                <span className="h-px w-8 bg-gold-dark/40" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-cream">
                Common questions.
              </h2>
            </div>
          </Reveal>
          <FaqAccordion faqs={faqs} />
        </div>
      </Section>

      {/* 4. LIGHT CAREERS */}
      <Section tone="base" id="careers" className="py-24 lg:py-32">
        <div className="container-site grid lg:grid-cols-2 gap-16 items-start">
          <Reveal className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gold-dark/40" />
              <span className="font-sans text-[0.65rem] uppercase font-bold tracking-[0.25em] text-gold-dark">
                {careersSection.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold text-navy-deep">{careersSection.headline}</h2>
            <p className="font-sans text-lg text-text-slate leading-relaxed max-w-md">{careersSection.body}</p>
          </Reveal>
          
          <Reveal delay={0.1} className="flex flex-col gap-6 lg:mt-12">
            <ul className="flex flex-col gap-4">
              {careersSection.bullets.map((b) => (
                <li key={b} className="flex items-start gap-4 font-sans text-text-slate">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-2.5 shrink-0" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
            <a href={careersSection.ctaHref} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 font-sans text-sm uppercase tracking-widest font-bold text-gold-dark hover:text-navy-deep transition-colors mt-4">
              {careersSection.cta}
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>
      </Section>

      {/* 5. DARK CLOSING CTA */}
      <Section tone="stage" className="py-24 relative overflow-hidden text-center border-t border-gold/10">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-stage-glow)" }} />
        <div className="container-site relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
          <Reveal>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-cream">
              {portfolioCTA.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="w-12 h-[1px] bg-gold-dark/40 mx-auto" />
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Button href={portfolioCTA.ctaHref} variant="primary" size="lg">
                {portfolioCTA.ctaLabel}
              </Button>
              <Button href={portfolioCTA.instagramHref} variant="outline" size="lg" external>
                {portfolioCTA.instagramLabel}
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
