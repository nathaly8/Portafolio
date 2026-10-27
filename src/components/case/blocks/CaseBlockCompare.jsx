import React from 'react';
import CaseImage from '@/components/case/CaseImage';

const PANELS = [
  {
    label: 'Antes',
    prefix: 'before',
    tone: 'muted',
    pill: 'border-border bg-lightSection text-muted-foreground',
  },
  {
    label: 'Después',
    prefix: 'after',
    tone: 'accent',
    pill: 'border-accent bg-lightSection text-accent-ink',
  },
];

export default function CaseBlockCompare({ block, preview }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {PANELS.map((panel, index) => (
        <div key={panel.prefix} className={index === 1 ? 'offset-cyan sm:mt-4' : ''}>
          <span
            className={`inline-flex items-center rounded-pill border px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${panel.pill}`}
          >
            {panel.label}
          </span>
          <CaseImage
            src={block[`${panel.prefix}_image`]}
            alt={block[`${panel.prefix}_alt`]}
            caption={block[`${panel.prefix}_caption`]}
            tone={panel.tone}
            preview={preview}
            className="mt-3"
          />
        </div>
      ))}
    </div>
  );
}