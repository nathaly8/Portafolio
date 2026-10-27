import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { useProjects } from '@/lib/portfolioData';

// Listado de proyectos: los datos vienen de los registros Project publicados.
export default function ProjectList() {
  const { data: projects = [], isLoading } = useProjects();

  if (isLoading) {
    return (
      <ul className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) =>
        <li
          key={i}
          className="h-80 animate-pulse rounded-xl border border-border bg-card"
          aria-hidden="true" />

        )}
      </ul>);

  }

  if (projects.length === 0) {
    return (
      <p className="max-w-[65ch] text-muted-foreground text-pretty">
        Todavía no hay proyectos publicados.
      </p>);

  }

  return (
    <ul className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
      {projects.map((project) => {
        const meta = [project.type, project.duration].filter(Boolean).join(' · ');

        return (
          <li
            key={project.slug}
            className="offset-cyan group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-[240ms] hover:-translate-y-1.5 hover:border-accent md:p-7"
            style={{ transitionTimingFunction: 'cubic-bezier(.22,1,.36,1)' }}>
            
            {project.cover_image &&
            <div className="mb-5 overflow-hidden rounded-lg border border-border bg-lightSection">
                <div className="aspect-[16/10]">
                  <Image
                  src={project.cover_image}
                  alt={project.cover_alt || project.title}
                  className="h-full w-full"
                  loading="lazy" />
                
                </div>
              </div>
            }

            {project.category &&
            <span className="inline-flex w-fit items-center rounded-pill border border-accent/60 bg-lightSection px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-accent-ink">
                {project.category}
              </span>
            }

            <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-balance">
              {project.title}
            </h3>

            {project.summary &&
            <p className="mt-3 line-clamp-3 text-sm text-muted-foreground text-pretty">
                {project.summary}
              </p>
            }

            {meta && <p className="mt-3 text-xs text-muted-foreground hidden">{meta}</p>}

            <Link
              to={`/proyectos/${project.slug}`}
              className="mt-auto inline-flex w-fit items-center gap-2 self-end pt-6 text-sm font-medium text-link transition-colors hover:text-link-hover">
              
              Ver proyecto
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-[240ms] group-hover:translate-x-1" />
              
            </Link>

            <span
              className="mt-5 block h-[3px] w-0 bg-primary transition-all duration-[240ms] group-hover:w-full"
              aria-hidden="true" />
            
          </li>);

      })}
    </ul>);

}