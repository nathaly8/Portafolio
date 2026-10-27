import React from 'react';
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import CaseBlockEditor from './CaseBlockEditor';
import { TEMPLATE_SECTIONS } from '@/lib/caseTemplate';

const inputCls =
  'w-full h-11 px-3 bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-accent outline-none';

export default function CaseSectionEditor({ section, index, onChange, onRemove, onMove }) {
  const blocks = section.blocks || [];
  const hint = TEMPLATE_SECTIONS.find((item) => item.title === section.title)?.hint;

  const setBlocks = (next) => onChange({ ...section, blocks: next });

  const moveBlock = (i, direction) => {
    const target = i + direction;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[i], next[target]] = [next[target], next[i]];
    setBlocks(next);
  };

  return (
    <div className="space-y-4 border border-border-strong p-4">
      <div className="flex items-start gap-3">
        <span className="pt-3 font-display text-sm font-bold tabular-nums text-accent-ink">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex-1">
          <input
            className={inputCls}
            placeholder="Título de la sección"
            value={section.title || ''}
            onChange={(e) => onChange({ ...section, title: e.target.value })}
          />
          {hint && <p className="mt-1.5 text-xs text-muted-foreground/70">{hint}</p>}
        </div>
        <div className="flex items-center gap-1 pt-1">
          <button
            type="button"
            onClick={() => onMove(-1)}
            disabled={index === 0}
            className="p-2 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
            aria-label="Subir sección"
          >
            <ArrowUp size={16} />
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            className="p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Bajar sección"
          >
            <ArrowDown size={16} />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="p-2 text-muted-foreground transition-colors hover:text-destructive"
            aria-label="Quitar sección"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-3 pl-0 md:pl-8">
        {blocks.map((block, i) => (
          <CaseBlockEditor
            key={i}
            block={block}
            index={i}
            onChange={(next) => setBlocks(blocks.map((b, idx) => (idx === i ? next : b)))}
            onRemove={() => setBlocks(blocks.filter((_, idx) => idx !== i))}
            onMove={(direction) => moveBlock(i, direction)}
          />
        ))}
        <button
          type="button"
          onClick={() => setBlocks([...blocks, { type: 'html' }])}
          className="inline-flex items-center gap-2 text-sm text-accent-ink transition-colors hover:text-link-hover"
        >
          <Plus size={16} /> Añadir bloque
        </button>
      </div>
    </div>
  );
}