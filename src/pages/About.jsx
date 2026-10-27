import React, { useEffect } from 'react';
import Header from '@/components/portfolio/Header';
import Footer from '@/components/portfolio/Footer';
import { useSiteContent } from '@/lib/portfolioData';

const DEFAULT_BIO =
'Llevo más de ocho años trabajando con equipos de salud, finanzas, educación y telecomunicaciones. Hablo con clientes y con quienes los atienden, reviso los pasos de cada tarea y propongo mejoras en los procesos y las herramientas que utilizan.';

export default function About() {
  const { data: site } = useSiteContent();

  const bio = site?.about_bio || DEFAULT_BIO;
  const email = site?.email || 'cathcarrilloe@gmail.com';
  const experience = site?.experience || [];
  const education = site?.education || [];

  useEffect(() => {
    document.title = `Sobre mí — ${site?.name || 'Catherine Carrillo'}`;
  }, [site?.name]);

  return (
    <>
      <Header />
      <main className="pb-20 pt-28 md:pt-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent-ink">
              Sobre mí
            </span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">Soy Cath

          </h1>
          <p className="mt-6 max-w-[65ch] text-lg text-foreground/90 text-pretty leading-relaxed md:text-xl">
            {bio}
          </p>

          {experience.length > 0 &&
          <section className="mt-16">
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Experiencia
              </h2>
              <ol className="mt-8 space-y-8">
                {experience.map((item, index) =>
              <li key={`${item.company}-${index}`} className="border-l-2 border-border pl-5">
                    <p className="font-display text-lg font-semibold text-foreground">
                      {item.company}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {[item.role, item.dates].filter(Boolean).join(' · ')}
                    </p>
                    {item.note &&
                <p className="mt-2 max-w-[65ch] text-foreground/90 text-pretty">
                        {item.note}
                      </p>
                }
                  </li>
              )}
              </ol>
            </section>
          }

          {education.length > 0 &&
          <section className="mt-16">
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Educación
              </h2>
              <ul className="mt-6 space-y-3">
                {education.map((item) =>
              <li key={item} className="max-w-[65ch] text-foreground/90 text-pretty">
                    {item}
                  </li>
              )}
              </ul>
            </section>
          }

          <section className="mt-16">
            <div className="offset-cyan rounded-xl border border-border-strong bg-card p-8 text-center md:p-12">
              <h2 className="mx-auto max-w-2xl font-display text-2xl font-bold tracking-tight text-balance md:text-3xl">
                ¿Necesitas ayuda con un proyecto?
              </h2>
              <p className="mx-auto mt-4 max-w-[65ch] text-muted-foreground text-pretty">
                Cuéntame qué quieres mejorar: la atención a tus clientes, los procesos de tu
                negocio o las herramientas que usa tu equipo.
              </p>
              <div className="mt-8 flex justify-center">
                <a
                  href={`mailto:${email}`}
                  className="inline-flex h-12 items-center justify-center rounded-md border border-border-strong px-6 font-semibold text-foreground transition-colors duration-200 hover:border-accent">
                  
                  Escríbeme
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>);

}