import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UserRound } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { useSiteContent } from '@/lib/portfolioData';

function renderHeadline(headline) {
  if (!headline) return null;
  const parts = headline.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={i} className="editorial font-normal text-accent-ink">
          {part.slice(1, -1)}
        </em>);

    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

export default function Hero() {
  const { data: site } = useSiteContent();
  const headline = site?.hero_headline || 'Menos complicaciones para tus clientes y tu equipo.';
  const supporting =
  site?.hero_supporting ||
  'Te ayudo a ordenar procesos, mejorar la atención y crear herramientas que faciliten el trabajo. Detecto tareas que toman demasiado tiempo, errores frecuentes y dificultades para entender una oferta, comprar o pedir ayuda.';
  const profile = site?.profile_image;
  const profileAlt = site?.profile_alt || 'Retrato pendiente de Catherine Carrillo';

  return (
    <section
      id="inicio"
      className="relative bg-background pt-24 pb-12 text-foreground scroll-mt-20 md:pt-28 md:pb-16">
      
      <div className="relative mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <h1 className="max-w-[22ch] font-display text-[clamp(2.1rem,7vw,3.4rem)] font-bold leading-[1.05] tracking-tight text-balance">
              {renderHeadline(headline)}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
              {supporting}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                to="/proyectos"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105">
                
                Conocer mi trabajo
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1 hidden" />
                
              </Link>
              <Link
                to="/sobre-mi"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border-strong px-6 font-semibold text-foreground transition-colors duration-200 hover:border-accent">
                Ver mi experiencia
                
                
                <ArrowRight size={18}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1 hidden" />
                
              </Link>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative mx-auto w-full max-w-[320px] md:max-w-none">
              <div className="offset-cyan relative aspect-[4/5] overflow-hidden rounded-xl border-2 border-border-strong bg-card md:aspect-[5/6]">
                {profile ?
                <Image
                  src={profile}
                  alt={profileAlt}
                  fittingType="fit"
                  className="h-full w-full" /> :


                <div
                  className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground"
                  role="img"
                  aria-label={profileAlt}>
                  
                    <UserRound size={28} aria-hidden="true" />
                    <span className="text-sm">Retrato pendiente</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}