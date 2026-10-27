import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import ImageUpload from './ImageUpload';
import ListField from './ListField';
import CaseBlocksEditor from './CaseBlocksEditor';
import { templateSections } from '@/lib/caseTemplate';
import { Loader2, Check, X } from 'lucide-react';

const inputCls =
  'w-full h-11 px-3 bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-accent outline-none';
const taCls =
  'w-full px-3 py-2.5 bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-accent outline-none resize-y';

function Field({ label, children, hint }) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-muted-foreground/70">{hint}</p>}
    </div>
  );
}

function Group({ title, children }) {
  return (
    <section className="border border-border p-5 md:p-6">
      <h2 className="mb-5 font-display text-sm uppercase tracking-[0.18em] text-accent-ink">
        {title}
      </h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const EMPTY = {
  title: '',
  slug: '',
  featured: false,
  published: false,
  display_order: 0,
  summary: '',
  contribution: '',
  category: '',
  type: '',
  status: '',
  role: '',
  team: '',
  duration: '',
  cover_image: '',
  cover_alt: '',
  cover_caption: '',
  external_link: '',
  final_note: '',
  tags: [],
  tools: [],
  sections: templateSections(),
  year: null,
  client: '',
  metric: '',
  context: '',
  challenge: '',
  research: '',
  design_decisions: '',
  results: '',
  learnings: '',
  solution: '',
  gallery: [],
};

export default function ProjectForm({ project, onClose }) {
  const qc = useQueryClient();
  const [form, setForm] = useState(() => (project ? { ...EMPTY, ...project } : { ...EMPTY }));
  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    if (!form.title) {
      alert('El título es obligatorio.');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        slug: form.slug || slugify(form.title),
        year: form.year === '' || form.year === null ? null : Number(form.year),
        display_order: Number(form.display_order) || 0,
      };
      if (project?.id) {
        await base44.entities.Project.update(project.id, payload);
      } else {
        await base44.entities.Project.create(payload);
      }
      qc.invalidateQueries({ queryKey: ['projects'] });
      qc.invalidateQueries({ queryKey: ['project'] });
      onClose();
    } catch (e) {
      alert('Error al guardar: ' + (e.message || e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pb-24">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">
          {project ? 'Editar caso' : 'Nuevo caso'}
        </h2>
        <button
          onClick={onClose}
          className="p-2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>
      </div>

      <div className="space-y-6">
        <Group title="Publicación">
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!form.published}
                onChange={(e) => set('published', e.target.checked)}
                className="h-4 w-4 accent-[#1769FF]"
              />
              Publicado
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!form.featured}
                onChange={(e) => set('featured', e.target.checked)}
                className="h-4 w-4 accent-[#1769FF]"
              />
              Destacado
            </label>
          </div>
          <p className="text-xs text-muted-foreground/70">
            Si no está publicado, solo lo ves tú desde la administración.
          </p>
          <Field label="Orden de visualización">
            <input
              type="number"
              className={inputCls}
              value={form.display_order ?? 0}
              onChange={(e) => set('display_order', e.target.value)}
            />
          </Field>
        </Group>

        <Group title="Ficha del caso">
          <Field label="Título">
            <input
              className={inputCls}
              value={form.title || ''}
              onChange={(e) => set('title', e.target.value)}
            />
          </Field>
          <Field label="Slug" hint="Se genera automáticamente si lo dejas vacío.">
            <input
              className={inputCls}
              value={form.slug || ''}
              onChange={(e) => set('slug', e.target.value)}
              placeholder="caso-ejemplo"
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Disciplina">
              <input
                className={inputCls}
                value={form.category || ''}
                onChange={(e) => set('category', e.target.value)}
                placeholder="Service design, UX, Auditoría…"
              />
            </Field>
            <Field label="Tipo">
              <input
                className={inputCls}
                value={form.type || ''}
                onChange={(e) => set('type', e.target.value)}
                placeholder="Reto Product Designer, proyecto de curso…"
              />
            </Field>
            <Field label="Rol">
              <input
                className={inputCls}
                value={form.role || ''}
                onChange={(e) => set('role', e.target.value)}
              />
            </Field>
            <Field label="Equipo">
              <input
                className={inputCls}
                value={form.team || ''}
                onChange={(e) => set('team', e.target.value)}
                placeholder="Quiénes más participaron"
              />
            </Field>
            <Field label="Duración">
              <input
                className={inputCls}
                value={form.duration || ''}
                onChange={(e) => set('duration', e.target.value)}
                placeholder="Ej. 3 meses"
              />
            </Field>
            <Field label="Estado">
              <input
                className={inputCls}
                value={form.status || ''}
                onChange={(e) => set('status', e.target.value)}
                placeholder="Borrador, en curso, completado…"
              />
            </Field>
          </div>
        </Group>

        <Group title="Portada">
          <ImageUpload
            label="Imagen de portada"
            value={form.cover_image}
            alt={form.cover_alt}
            onChange={(v) => set('cover_image', v)}
          />
          <Field label="Texto alternativo de la portada">
            <input
              className={inputCls}
              value={form.cover_alt || ''}
              onChange={(e) => set('cover_alt', e.target.value)}
            />
          </Field>
          <Field label="Pie de la portada">
            <input
              className={inputCls}
              value={form.cover_caption || ''}
              onChange={(e) => set('cover_caption', e.target.value)}
            />
          </Field>
        </Group>

        <Group title="Resumen">
          <Field label="Resumen de 30 segundos">
            <textarea
              rows={3}
              className={taCls}
              value={form.summary || ''}
              onChange={(e) => set('summary', e.target.value)}
            />
          </Field>
          <ListField label="Etiquetas" value={form.tags} onChange={(v) => set('tags', v)} />
          <ListField label="Herramientas" value={form.tools} onChange={(v) => set('tools', v)} />
        </Group>

        <Group title="Mi aporte">
          <Field
            label="Mi aporte individual"
            hint="Lo que hiciste tú, separado del equipo. El equipo se escribe en la ficha."
          >
            <textarea
              rows={4}
              className={taCls}
              value={form.contribution || ''}
              onChange={(e) => set('contribution', e.target.value)}
            />
          </Field>
        </Group>

        <Group title="Secciones y bloques">
          <CaseBlocksEditor value={form.sections} onChange={(v) => set('sections', v)} />
        </Group>

        <Group title="Nota final y enlace externo">
          <Field
            label="Nota final (se muestra al cierre del proyecto)"
            hint="Nota breve que aparece antes del bloque de contacto. Opcional."
          >
            <textarea
              rows={3}
              className={taCls}
              value={form.final_note || ''}
              onChange={(e) => set('final_note', e.target.value)}
            />
          </Field>
          <Field label="URL (opcional)" hint="Referencia interna: no se muestra en el sitio público.">
            <input
              className={inputCls}
              value={form.external_link || ''}
              onChange={(e) => set('external_link', e.target.value)}
            />
          </Field>
        </Group>

        <details className="border border-border p-5 md:p-6">
          <summary className="cursor-pointer font-display text-sm uppercase tracking-[0.18em] text-muted-foreground">
            Texto heredado (no se muestra en el sitio)
          </summary>
          <div className="mt-5 space-y-5">
            <p className="text-xs text-muted-foreground/70">
              Estos campos se conservan para no perder texto anterior. El caso se arma ahora con
              secciones y bloques.
            </p>
            {[
              { key: 'context', label: 'Contexto' },
              { key: 'challenge', label: 'Reto' },
              { key: 'research', label: 'Investigación' },
              { key: 'design_decisions', label: 'Decisiones' },
              { key: 'results', label: 'Resultados' },
              { key: 'learnings', label: 'Aprendizajes' },
              { key: 'metric', label: 'Métrica' },
              { key: 'solution', label: 'Solución' },
            ].map((field) => (
              <Field key={field.key} label={field.label}>
                <textarea
                  rows={3}
                  className={taCls}
                  value={form[field.key] || ''}
                  onChange={(e) => set(field.key, e.target.value)}
                />
              </Field>
            ))}
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Año">
                <input
                  type="number"
                  className={inputCls}
                  value={form.year ?? ''}
                  onChange={(e) => set('year', e.target.value)}
                />
              </Field>
              <Field label="Cliente / empresa">
                <input
                  className={inputCls}
                  value={form.client || ''}
                  onChange={(e) => set('client', e.target.value)}
                />
              </Field>
            </div>
          </div>
        </details>
      </div>

      <div className="sticky bottom-4 mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="h-11 border border-border px-5 font-medium text-foreground transition-colors hover:border-accent"
        >
          Cancelar
        </button>
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex h-11 items-center gap-2 bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
          {saving ? 'Guardando...' : 'Guardar caso'}
        </button>
      </div>
    </div>
  );
}