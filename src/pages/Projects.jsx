import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/portfolio/Header';
import Footer from '@/components/portfolio/Footer';
import ProjectList from '@/components/portfolio/ProjectList';
import { useSiteContent } from '@/lib/portfolioData';

export default function Projects() {
  const { data: site } = useSiteContent();

  useEffect(() => {
    document.title = `Proyectos — ${site?.name || 'Catherine Carrillo'}`;
  }, [site?.name]);

  return (
    <>
      <Header />
      <main className="pb-20 pt-24 md:pt-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent-ink">
              Proyectos
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
            Más fácil para tus clientes. Mejor para tu negocio.
          </h1>
          <p className="mt-5 max-w-[65ch] text-lg text-muted-foreground text-pretty">
            Estos proyectos muestran cómo identifico qué dificulta una compra, una consulta o una
            tarea, y propongo mejoras en la atención, los procesos y las herramientas.
          </p>

          <div className="mt-12">
            <ProjectList />
          </div>

          <div className="mt-12 border-t border-border pt-6">
            <Link
              to="/plantilla-caso"
              className="text-sm text-muted-foreground underline decoration-border-strong/60 underline-offset-4 transition-colors hover:text-link"
            >
              Plantilla de caso · Vista previa
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}