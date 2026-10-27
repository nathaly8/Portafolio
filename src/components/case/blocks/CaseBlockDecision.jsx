import React from 'react';

const ROWS = [
  { label: 'Hallazgo', key: 'finding' },
  { label: 'Decisión', key: 'decision' },
  { label: 'Por qué', key: 'reason' },
  { label: 'Alternativa descartada', key: 'alternative' },
];

export default function CaseBlockDecision({ block }) {
  const rows = ROWS.filter((row) => block?.[row.key]);
  if (rows.length === 0) return null;

  return (
    <div className="offset-cyan max-w-[65ch] rounded-xl border border-accent bg-card p-6 md:p-8">
      <div className="space-y-6">
        {rows.map((row, index) => (
          <div key={row.key} className={index > 0 ? 'border-t border-border pt-5' : ''}>
            <p
              className={`text-xs font-semibold uppercase tracking-[0.14em] ${
                index === 0 ? 'text-accent-ink' : 'text-link'
              }`}
            >
              {row.label}
            </p>
            <p className="mt-2 leading-relaxed text-foreground/90 text-pretty">{block[row.key]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}