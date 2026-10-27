import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '@/components/portfolio/Header';
import Footer from '@/components/portfolio/Footer';
import CaseTemplate from '@/components/case/CaseTemplate';
import { useProject, useProjects, useSiteContent } from '@/lib/portfolioData';
import { useAuth } from '@/lib/AuthContext';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data: project, isLoading } = useProject(slug);
  const { data: projects = [] } = useProjects();
  const { data: site } = useSiteContent();
  const { user } = useAuth();
  const email = site?.email || 'cathcarrilloe@gmail.com';

  const isDraft = project?.published === false;
  const canView = !isDraft || user?.role === 'admin';

  useEffect(() => {
    if (project?.title && canView) {
      document.title = `${project.title} — ${site?.name || 'Catherine Carrillo'}`;
    }
    return () => {
      document.title = site?.seo_title || 'Portafolio';
    };
  }, [project, site, canView]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-accent" />
      </div>
    );
  }

  if (!project || !canView) {
    return (
      <>
        <Header />
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-24 text-center">
          <p className="text-muted-foreground">
            {project && isDraft ? 'Este caso todavía no está publicado.' : 'Caso no encontrado.'}
          </p>
          <Link
            to="/proyectos"
            className="mt-4 text-link transition-colors hover:text-link-hover"
          >
            Volver a los proyectos
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx >= 0 && idx < projects.length - 1 ? projects[idx + 1] : null;

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        <div className="mx-auto mb-7 max-w-5xl px-5 md:px-8">
          <Link
            to="/proyectos"
            className="group inline-flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-link-hover"
          >
            <ArrowLeft
              size={16}
              aria-hidden="true"
              className="transition-transform duration-[240ms] group-hover:-translate-x-1"
            />
            Volver a proyectos
          </Link>
        </div>

        <CaseTemplate data={project} draft={isDraft} />

        <div className="mx-auto mt-16 max-w-5xl px-5 md:px-8">
          <div className="offset-cyan relative rounded-xl border border-border-strong bg-card px-6 py-10 text-center md:px-10">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent-ink">
                Contacto
              </span>
            </div>
            <p className="mt-4 font-display text-2xl font-bold tracking-tight text-balance md:text-3xl">
              {site?.contact_heading || 'Las buenas ideas empiezan con una conversación.'}
            </p>
            <p className="mx-auto mt-4 max-w-[65ch] text-muted-foreground text-pretty">
              ¿Tienes un proyecto o una oportunidad en tu equipo? Cuéntame qué tienes en mente.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href={`mailto:${email}`}
                className="inline-flex h-12 items-center justify-center rounded-md border border-border-strong px-6 font-semibold text-foreground transition-colors duration-200 hover:border-accent"
              >
                Escríbeme
              </a>
            </div>
            <p className="mt-4 text-sm text-foreground text-pretty">
              O envíame un correo a:{' '}
              <a
                href={`mailto:${email}`}
                className="break-words text-link underline decoration-border-strong/60 underline-offset-4 transition-colors hover:text-link-hover"
              >
                {email}
              </a>
            </p>
          </div>

          {(prev || next) && (
            <nav
              className="mb-12 mt-12 grid grid-cols-2 gap-6 border-t border-border py-10 md:mb-20"
              aria-label="Navegación entre proyectos"
            >
              {prev ? (
                <Link to={`/proyectos/${prev.slug}`} className="group flex min-w-0 flex-col">
                  <span className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                    Anterior
                    <ArrowLeft size={16} aria-hidden="true" />
                  </span>
                  <span className="mt-2 min-w-0 break-words font-display text-lg font-medium transition-colors group-hover:text-link">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link to={`/proyectos/${next.slug}`} className="group flex min-w-0 flex-col text-right">
                  <span className="flex items-center justify-end gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                    Siguiente
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                  <span className="mt-2 min-w-0 break-words font-display text-lg font-medium transition-colors group-hover:text-link">
                    {next.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}