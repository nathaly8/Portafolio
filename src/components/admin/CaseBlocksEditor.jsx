import React from 'react';
import { Plus } from 'lucide-react';
import CaseSectionEditor from './CaseSectionEditor';
import { templateSections } from '@/lib/caseTemplate';

export default function CaseBlocksEditor({ value = [], onChange }) {
  const sections = value || [];

  const moveSection = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= sections.length) return;
    const next = [...sections];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        Las secciones y los bloques se pueden reordenar. Los que estén vacíos no se muestran en el
        sitio.
      </p>

      {sections.map((section, index) => (
        <CaseSectionEditor
          key={index}
          section={section}
          index={index}
          onChange={(next) => onChange(sections.map((s, i) => (i === index ? next : s)))}
          onRemove={() => onChange(sections.filter((_, i) => i !== index))}
          onMove={(direction) => moveSection(index, direction)}
        />
      ))}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onChange([...sections, { title: '', blocks: [] }])}
          className="inline-flex items-center gap-2 text-sm text-accent-ink transition-colors hover:text-link-hover"
        >
          <Plus size={16} /> Añadir sección
        </button>
        {sections.length === 0 && (
          <button
            type="button"
            onClick={() => onChange(templateSections())}
            className="inline-flex items-center gap-2 text-sm text-accent-ink transition-colors hover:text-link-hover"
          >
            <Plus size={16} /> Insertar las 7 secciones de la plantilla
          </button>
        )}
      </div>
    </div>
  );
}