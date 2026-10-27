import React from 'react';
import CaseBlockRenderer from './blocks/CaseBlockRenderer';
import { blockHasContent, sectionAnchor, sectionNumber, visibleSections } from '@/lib/caseTemplate';

const FICHA = [
  { label: 'Rol', key: 'role' },
  { label: 'Equipo', key: 'team' },
  { label: 'Duración', key: 'duration' },
  { label: 'Tipo', key: 'type' },
  { label: 'Estado', key: 'status' },
];

export default function CaseTemplate({ data, preview = false, draft = false }) {
  if (!data) return null;

  const sections = visibleSections(data.sections, preview);
  const ficha = FICHA.map((item) => ({ ...item, value: data[item.key] })).filter(
    (item) => item.value
  );
  const kicker = [data.category, data.type].filter(Boolean).join(' · ');

  return (
    <article className="pb-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        {preview && (
          <div className="mb-10 rounded-xl border border-accent bg-lightSection p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink">
              Plantilla de caso · Vista previa
            </p>
            <p className="mt-2 max-w-[65ch] text-sm text-muted-foreground text-pretty">
              Contenido orientativo para revisar la estructura. No es un caso real. Las secciones y
              los bloques son opcionales y se pueden reordenar.
            </p>
          </div>
        )}

        {draft && (
          <div className="mb-10 rounded-xl border border-accent bg-lightSection p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink">
              Borrador sin publicar
            </p>
            <p className="mt-2 max-w-[65ch] text-sm text-muted-foreground text-pretty">
              Este caso todavía no está publicado: solo lo puedes ver tú desde la sesión de
              administración.
            </p>
          </div>
        )}

        {kicker && (
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.1em] text-accent-ink">
            <span className="h-px w-8 bg-accent" />
            <span>{kicker}</span>
          </div>
        )}

        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
          {data.title}
        </h1>

        {data.summary && (
          <div className="mt-8 max-w-[65ch]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink">
              Resumen de 30 segundos
            </p>
            <p className="mt-3 text-lg text-muted-foreground text-pretty leading-relaxed md:text-xl">
              {data.summary}
            </p>
          </div>
        )}

        {ficha.length > 0 && (
          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-border py-6 md:grid-cols-5">
            {ficha.map((item) => (
              <div key={item.key}>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-foreground/90">{item.value}</dd>
              </div>
            ))}
          </dl>
        )}

      </div>

      {sections.length > 0 && (
        <div className="mx-auto mt-12 max-w-5xl space-y-16 px-5 md:px-8">
          {sections.map((section, index) => (
            <section key={section.title || index} id={sectionAnchor(index)} className="scroll-mt-24">
              <div className="flex items-start gap-3 md:gap-4">
                <span className="font-display text-2xl font-bold leading-tight tabular-nums text-accent-ink md:text-4xl">
                  {sectionNumber(index)}
                </span>
                <h2 className="min-w-0 break-words font-display text-2xl font-bold leading-tight tracking-tight text-balance md:text-4xl">
                  {section.title}
                </h2>
              </div>
              <div className="mt-6 space-y-8">
                {(section.blocks || [])
                  .filter((block) => blockHasContent(block, preview))
                  .map((block, blockIndex) => (
                    <CaseBlockRenderer key={blockIndex} block={block} preview={preview} />
                  ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {data.final_note && (
        <div className="mx-auto mt-16 max-w-5xl px-5 md:px-8">
          <p className="max-w-[65ch] border-l-2 border-accent bg-lightSection px-4 py-3 text-sm text-muted-foreground text-pretty">
            {data.final_note}
          </p>
        </div>
      )}
    </article>
  );
}