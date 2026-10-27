import React from 'react';

const SERVICES = [
  {
    number: '01',
    title: 'Mejorar la atención al cliente',
    desc: 'Identifico qué cuesta entender al consultar, comprar o pedir ayuda, y propongo cambios para que la información y los pasos sean más claros.',
  },
  {
    number: '02',
    title: 'Organizar el trabajo del equipo',
    desc: 'Hago visibles los pasos, responsables y tareas repetidas para proponer procesos más claros, con menos demoras y errores.',
  },
  {
    number: '03',
    title: 'Elegir y crear herramientas útiles',
    desc: 'Convierto las necesidades del equipo en herramientas, formularios, guías o soluciones digitales que faciliten el trabajo y el seguimiento.',
  },
  {
    number: '04',
    title: 'Comprobar si la mejora funciona',
    desc: 'Pruebo las propuestas con personas y defino qué medir: tiempo, errores, esfuerzo o cuántos clientes completan el proceso.',
  },
];

export default function CapabilityGrid() {
  return (
    <section id="enfoque" className="relative py-20 md:py-28 border-t border-border scroll-mt-20">
      <span
        className="absolute top-8 right-4 md:right-8 font-display font-extrabold text-[8rem] md:text-[12rem] leading-none pointer-events-none select-none"
        style={{ color: 'hsl(var(--foreground) / 0.04)' }}
        aria-hidden="true"
      >
        02
      </span>
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        <div className="max-w-2xl mb-12 md:mb-16">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-accent" />
            <span className="text-xs uppercase tracking-[0.1em] text-accent-ink font-semibold">
              Enfoque
            </span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
            Qué aporto a un proyecto
          </h2>
          <p className="mt-5 max-w-[65ch] text-lg text-muted-foreground text-pretty">
            Encuentro oportunidades de mejora desde el primer contacto con un cliente hasta las
            tareas que realiza tu equipo para atenderlo.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {SERVICES.map((cap) => (
            <div
              key={cap.number}
              className="group relative cursor-default overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-[240ms] hover:-translate-y-1.5 hover:border-accent hover:bg-lightSection md:p-8"
              style={{ transitionTimingFunction: 'cubic-bezier(.22,1,.36,1)' }}
            >
              <span className="font-display text-5xl font-bold text-foreground/20 transition-colors duration-[240ms] group-hover:text-primary md:text-6xl">
                {cap.number}
              </span>
              <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
                {cap.title}
              </h3>
              <p className="mt-3 text-muted-foreground">{cap.desc}</p>
              <div className="mt-6 h-[3px] w-0 bg-primary transition-all duration-[240ms] group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}