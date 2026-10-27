import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSiteContent } from '@/lib/portfolioData';

const NAV = [
  { label: 'Inicio', to: '/' },
  { label: 'Proyectos', to: '/proyectos' },
  { label: 'Sobre mí', to: '/sobre-mi' },
];

// Destino activo según la ruta: /proyectos/:slug pertenece a Casos, y / nunca queda activo fuera de inicio
function activePath(pathname) {
  if (pathname === '/') return '/';
  if (pathname.startsWith('/proyectos') || pathname.startsWith('/casos')) return '/proyectos';
  if (pathname.startsWith('/sobre-mi')) return '/sobre-mi';
  return '';
}

export default function Header() {
  const { data: site } = useSiteContent();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const current = activePath(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cierra el panel al cambiar de ruta
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Bloquea el scroll del fondo mientras el menú está abierto y lo restaura al cerrar o desmontar
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Foco en el primer enlace al abrir y cierre con Escape devolviendo el foco al botón
  useEffect(() => {
    if (!open) return undefined;
    panelRef.current?.querySelector('a')?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const name = site?.name || 'Catherine Carrillo';
  const email = site?.email || 'cathcarrilloe@gmail.com';
  const closeMenu = () => setOpen(false);
  const linkCls = (to) =>
    `text-sm font-medium transition-colors focus-visible:outline-accent ${
      current === to ? 'text-accent' : 'text-surfaceDark-muted hover:text-surfaceDark-foreground'
    }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-surfaceDeep transition-colors duration-300 ${
          scrolled || open ? 'border-b border-surfaceDark-border' : ''
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
          <div className="flex h-16 items-center justify-between md:h-[4.5rem]">
            <Link
              to="/"
              className="font-display text-lg font-bold tracking-tight text-surfaceDark-foreground transition-colors focus-visible:outline-accent"
              aria-label="Ir al inicio"
            >
              {name}
            </Link>

            <nav
              className="hidden items-center gap-5 md:flex lg:gap-8"
              aria-label="Navegación principal"
            >
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} className={linkCls(n.to)}>
                  {n.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:block">
              <a
                href={`mailto:${email}`}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-105 focus-visible:outline-accent"
              >
                Hablemos
              </a>
            </div>

            <button
              ref={toggleRef}
              type="button"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-surfaceDark-foreground transition-colors focus-visible:outline-accent md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              aria-controls="menu-movil"
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Panel fuera del header: fondo sólido, cubre bajo el header hasta el final del viewport */}
      {open && (
        <div
          id="menu-movil"
          ref={panelRef}
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain border-t border-surfaceDark-border bg-surfaceDeep md:hidden"
        >
          <nav aria-label="Navegación móvil" className="mx-auto max-w-7xl px-5 pb-16 pt-2">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={closeMenu}
                className={`flex items-center border-b border-surfaceDark-border py-4 font-display text-2xl font-bold focus-visible:outline-accent ${
                  current === n.to ? 'text-accent' : 'text-surfaceDark-foreground'
                }`}
              >
                {n.label}
              </Link>
            ))}
            <a
              href={`mailto:${email}`}
              onClick={closeMenu}
              className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-5 font-semibold text-primary-foreground focus-visible:outline-accent"
            >
              Hablemos
            </a>
          </nav>
        </div>
      )}
    </>
  );
}