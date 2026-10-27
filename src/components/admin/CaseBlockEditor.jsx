import React from 'react';
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { BLOCK_TYPES } from '@/lib/caseTemplate';

const inputCls =
  'w-full h-11 px-3 bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-accent outline-none';
const taCls =
  'w-full px-3 py-2.5 bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-accent outline-none resize-y';

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

function NumberField({ label, value, onChange }) {
  return (
    <Field label={label}>
      <input
        type="number"
        className={inputCls}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
      />
    </Field>
  );
}

export default function CaseBlockEditor({ block, index, onChange, onRemove, onMove }) {
  const set = (key, val) => onChange({ ...block, [key]: val });
  const images = block.images || [];

  const setImage = (i, key, val) =>
    set(
      'images',
      images.map((item, idx) => (idx === i ? { ...item, [key]: val } : item))
    );

  return (
    <div className="space-y-4 border border-border bg-card/40 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <select
          className={`${inputCls} w-auto`}
          value={block.type || 'html'}
          onChange={(e) => set('type', e.target.value)}
        >
          {BLOCK_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => onMove(-1)}
            disabled={index === 0}
            className="p-2 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
            aria-label="Subir bloque"
          >
            <ArrowUp size={16} />
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            className="p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Bajar bloque"
          >
            <ArrowDown size={16} />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="p-2 text-muted-foreground transition-colors hover:text-destructive"
            aria-label="Quitar bloque"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {block.type === 'html' && (
        <Field label="Texto (HTML)">
          <textarea
            rows={6}
            className={taCls}
            value={block.content || ''}
            onChange={(e) => set('content', e.target.value)}
            placeholder="<p>Escribe el texto del bloque.</p>"
          />
        </Field>
      )}

      {block.type === 'image' && (
        <>
          <ImageUpload label="Imagen" value={block.image} alt={block.alt} onChange={(v) => set('image', v)} />
          <Field label="Texto alternativo">
            <input className={inputCls} value={block.alt || ''} onChange={(e) => set('alt', e.target.value)} />
          </Field>
          <Field label="Pie de imagen">
            <input className={inputCls} value={block.caption || ''} onChange={(e) => set('caption', e.target.value)} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField label="Ancho original (px)" value={block.width} onChange={(v) => set('width', v)} />
            <NumberField label="Alto original (px)" value={block.height} onChange={(v) => set('height', v)} />
          </div>
        </>
      )}

      {block.type === 'compare' && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageUpload label="Antes" value={block.before_image} alt={block.before_alt} onChange={(v) => set('before_image', v)} />
            <ImageUpload label="Después" value={block.after_image} alt={block.after_alt} onChange={(v) => set('after_image', v)} />
          </div>
          <Field label="Pie de «Antes»">
            <input className={inputCls} value={block.before_caption || ''} onChange={(e) => set('before_caption', e.target.value)} />
          </Field>
          <Field label="Pie de «Después»">
            <input className={inputCls} value={block.after_caption || ''} onChange={(e) => set('after_caption', e.target.value)} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Alt de «Antes»">
              <input className={inputCls} value={block.before_alt || ''} onChange={(e) => set('before_alt', e.target.value)} />
            </Field>
            <Field label="Alt de «Después»">
              <input className={inputCls} value={block.after_alt || ''} onChange={(e) => set('after_alt', e.target.value)} />
            </Field>
          </div>
        </>
      )}

      {block.type === 'quote' && (
        <>
          <Field label="Cita anonimizada">
            <textarea
              rows={3}
              className={taCls}
              value={block.quote || ''}
              onChange={(e) => set('quote', e.target.value)}
            />
          </Field>
          <Field label="Atribución (sin nombre real)">
            <input
              className={inputCls}
              value={block.attribution || ''}
              onChange={(e) => set('attribution', e.target.value)}
              placeholder="Participante 2 · entrevista, marzo 2025"
            />
          </Field>
        </>
      )}

      {block.type === 'decision' && (
        <>
          <Field label="Hallazgo">
            <textarea rows={2} className={taCls} value={block.finding || ''} onChange={(e) => set('finding', e.target.value)} />
          </Field>
          <Field label="Decisión">
            <textarea rows={2} className={taCls} value={block.decision || ''} onChange={(e) => set('decision', e.target.value)} />
          </Field>
          <Field label="Por qué">
            <textarea rows={2} className={taCls} value={block.reason || ''} onChange={(e) => set('reason', e.target.value)} />
          </Field>
          <Field label="Alternativa descartada">
            <textarea rows={2} className={taCls} value={block.alternative || ''} onChange={(e) => set('alternative', e.target.value)} />
          </Field>
        </>
      )}

      {block.type === 'split' && (
        <>
          <ImageUpload label="Imagen" value={block.image} alt={block.alt} onChange={(v) => set('image', v)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Texto alternativo">
              <input className={inputCls} value={block.alt || ''} onChange={(e) => set('alt', e.target.value)} />
            </Field>
            <Field label="Lado de la imagen">
              <select
                className={inputCls}
                value={block.side || 'left'}
                onChange={(e) => set('side', e.target.value)}
              >
                <option value="left">Izquierda</option>
                <option value="right">Derecha</option>
              </select>
            </Field>
          </div>
          <Field label="Título (opcional)">
            <input className={inputCls} value={block.heading || ''} onChange={(e) => set('heading', e.target.value)} />
          </Field>
          <Field label="Texto (HTML)">
            <textarea
              rows={4}
              className={taCls}
              value={block.content || ''}
              onChange={(e) => set('content', e.target.value)}
              placeholder="<p>Texto que acompaña a la imagen.</p>"
            />
          </Field>
          <Field label="Frase destacada (opcional)">
            <textarea
              rows={2}
              className={taCls}
              value={block.quote || ''}
              onChange={(e) => set('quote', e.target.value)}
            />
          </Field>
        </>
      )}

      {block.type === 'gallery' && (
        <div className="space-y-4">
          {images.map((item, i) => (
            <div key={i} className="space-y-3 border border-border p-3">
              <div className="grid gap-3 sm:grid-cols-3">
                <ImageUpload value={item.image} alt={item.alt} onChange={(v) => setImage(i, 'image', v)} />
                <input
                  className={inputCls}
                  placeholder="Texto alternativo"
                  value={item.alt || ''}
                  onChange={(e) => setImage(i, 'alt', e.target.value)}
                />
                <input
                  className={inputCls}
                  placeholder="Pie de imagen"
                  value={item.caption || ''}
                  onChange={(e) => setImage(i, 'caption', e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => set('images', images.filter((_, idx) => idx !== i))}
                  className="p-2 text-muted-foreground transition-colors hover:text-destructive"
                  aria-label="Quitar imagen"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => set('images', [...images, { image: '', alt: '', caption: '' }])}
            className="inline-flex items-center gap-2 text-sm text-accent-ink transition-colors hover:text-link-hover"
          >
            <Plus size={16} /> Añadir imagen
          </button>
        </div>
      )}
    </div>
  );
}