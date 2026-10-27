import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useSiteContent } from '@/lib/portfolioData';

export default function Contact() {
  const { data: site } = useSiteContent();
  const heading = site?.contact_heading || 'Las buenas ideas empiezan con una conversación.';
  const description =
    site?.contact_description ||
    '¿Un proyecto, un equipo o una oportunidad por explorar? Conversemos.';
  const email = site?.email || 'cathcarrilloe@gmail.com';
  const ctaLabel = site?.primary_cta_label || 'Conversemos';
  const ctaLink = site?.primary_cta_link || `mailto:${email}`;

  return (
    <section id="contacto" className="relative py-20 md:py-32 scroll-mt-20">
      <span
        className="absolute top-8 right-4 md:right-8 font-display font-extrabold text-[8rem] md:text-[12rem] leading-none pointer-events-none select-none"
        style={{ color: 'hsl(var(--foreground) / 0.04)' }}
        aria-hidden="true"
      >
        04
      </span>
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        <div className="relative max-w-4xl mx-auto">
          <div className="offset-cyan relative rounded-xl border border-border-strong bg-card p-8 md:p-12 lg:p-16">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <span className="text-xs uppercase tracking-[0.1em] text-accent-ink font-semibold">
                Contacto
              </span>
            </div>
            <h2 className="mt-6 font-display text-3xl md:text-5xl font-bold tracking-tight text-balance leading-tight">
              {heading}
            </h2>
            <p className="mt-5 text-lg text-muted-foreground text-pretty max-w-xl">
              {description}
            </p>
            <div className="mt-8 flex justify-end">
              <a
                href={ctaLink}
                className="group inline-flex h-[52px] w-fit items-center justify-center gap-2 rounded-md bg-primary px-6 font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105"
              >
                {ctaLabel}
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </a>
            </div>
            <p className="mt-4 text-right text-sm text-foreground text-pretty">
              O envíame un correo a:{' '}
              <a
                href={`mailto:${email}`}
                className="break-words text-link underline decoration-border-strong/60 underline-offset-4 transition-colors hover:text-link-hover"
              >
                {email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}