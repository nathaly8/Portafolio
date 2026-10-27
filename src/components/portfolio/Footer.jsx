import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Mail, Linkedin } from 'lucide-react';
import { useSiteContent } from '@/lib/portfolioData';

export default function Footer() {
  const { data: site } = useSiteContent();
  const name = site?.name || 'Nombre Apellido';
  const email = site?.email || '';
  const linkedin = site?.linkedin_url || '';
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-surfaceDark-border bg-surfaceDeep py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="font-display font-semibold text-lg text-surfaceDark-foreground">{name}</p>
          </div>

          <div className="flex flex-col md:items-end gap-4">
            <div className="flex items-center gap-5">
              {email && (
                <a
                  href={`mailto:${email}`}
                  aria-label="Email"
                  className="text-surfaceDark-muted hover:text-accent transition-colors focus-visible:outline-accent"
                >
                  <Mail size={18} aria-hidden="true" />
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="text-surfaceDark-muted hover:text-accent transition-colors focus-visible:outline-accent"
                >
                  <Linkedin size={18} aria-hidden="true" />
                </a>
              )}
              <Link
                to="/#inicio"
                className="inline-flex items-center gap-1.5 text-sm text-surfaceDark-muted hover:text-accent transition-colors focus-visible:outline-accent"
              >
                Volver arriba
                <ArrowUp size={16} aria-hidden="true" />
              </Link>
            </div>
            <p className="text-xs text-surfaceDark-muted">
              © {year} {name}. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}