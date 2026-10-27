import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSiteContent } from '@/lib/portfolioData';

const DEFAULT_TEXT =
  'Trabajo con empresas y emprendimientos que quieren atender mejor a sus clientes y simplificar las tareas del día a día. Mi experiencia combina investigación, mejora de procesos y herramientas digitales.';

export default function MiniAbout() {
  const { data: site } = useSiteContent();
  const text = site?.mini_about_text || DEFAULT_TEXT;

  return (
    <section id="sobre-mi" className="relative border-t border-border py-20 md:py-28 scroll-mt-20">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
        <div className="offset-cyan relative overflow-hidden rounded-xl border border-border bg-card p-8 md:p-10">
          <span
            className="pointer-events-none absolute right-4 top-0 select-none font-display text-[6rem] font-extrabold leading-none md:right-8 md:top-2 md:text-[8rem]"
            style={{ color: 'hsl(var(--foreground) / 0.04)' }}
            aria-hidden="true"
          >
            03
          </span>
          <div className="relative flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent-ink">
                Sobre mí
              </span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
              Hola, soy Cath
            </h2>
            <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl">
              {text}
            </p>
            <div className="mt-8 flex justify-end">
              <Link
                to="/sobre-mi"
                className="group inline-flex w-fit items-center gap-2 font-medium text-link transition-colors hover:text-link-hover"
              >
                Más sobre mí
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-[240ms] group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
    </section>
  );
}