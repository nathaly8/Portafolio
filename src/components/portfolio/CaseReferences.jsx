import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectList from '@/components/portfolio/ProjectList';

export default function CaseReferences() {
  return (
    <section id="proyectos" className="relative border-t border-border py-20 md:py-28 scroll-mt-20">
      <span
        className="absolute right-4 top-8 font-display text-[8rem] font-extrabold leading-none pointer-events-none select-none md:right-8 md:text-[12rem]"
        style={{ color: 'hsl(var(--foreground) / 0.04)' }}
        aria-hidden="true"
      >
        01
      </span>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
        <div className="mb-12 max-w-2xl md:mb-16">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent-ink">
              Proyectos
            </span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
            Más fácil para tus clientes. Mejor para tu negocio.
          </h2>
          <p className="mt-5 max-w-[65ch] text-lg text-muted-foreground text-pretty">
            Estos proyectos muestran cómo identifico qué dificulta una compra, una consulta o una
            tarea, y propongo mejoras en la atención, los procesos y las herramientas.
          </p>
        </div>

        <ProjectList />

        <div className="mt-10">
          <Link
            to="/proyectos"
            className="group inline-flex items-center gap-2 font-medium text-link transition-colors hover:text-link-hover"
          >
            Ver todos los proyectos
            <ArrowRight
              size={18}
              aria-hidden="true"
              className="transition-transform duration-[240ms] group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}