import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const inputCls =
  'w-full h-11 px-3 bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-accent outline-none';
const taCls =
  'w-full px-3 py-2.5 bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-accent outline-none resize-y';

export default function ExperienceList({ value = [], onChange }) {
  const items = value || [];

  const setItem = (index, key, val) =>
    onChange(items.map((item, i) => (i === index ? { ...item, [key]: val } : item)));

  const removeItem = (index) => onChange(items.filter((_, i) => i !== index));

  const addItem = () => onChange([...items, { company: '', role: '', dates: '', note: '' }]);

  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
        Experiencia laboral
      </label>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="space-y-3 border border-border p-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <input
                className={inputCls}
                placeholder="Empresa"
                value={item.company || ''}
                onChange={(e) => setItem(index, 'company', e.target.value)}
              />
              <input
                className={inputCls}
                placeholder="Rol"
                value={item.role || ''}
                onChange={(e) => setItem(index, 'role', e.target.value)}
              />
              <input
                className={inputCls}
                placeholder="Fechas (ej. ene 2021 – mayo 2022)"
                value={item.dates || ''}
                onChange={(e) => setItem(index, 'dates', e.target.value)}
              />
            </div>
            <textarea
              rows={2}
              className={taCls}
              placeholder="Una sola oración general de lo que hiciste, sin métricas."
              value={item.note || ''}
              onChange={(e) => setItem(index, 'note', e.target.value)}
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="p-2 text-muted-foreground transition-colors hover:text-destructive"
                aria-label="Quitar experiencia"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-2 text-sm text-accent-ink transition-colors hover:text-link-hover"
        >
          <Plus size={16} /> Añadir experiencia
        </button>
      </div>
    </div>
  );
}