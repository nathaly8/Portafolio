import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useSiteContent } from '@/lib/adminPortfolioData';
import ImageUpload from './ImageUpload';
import ListField from './ListField';
import ExperienceList from './ExperienceList';
import { Loader2, Check } from 'lucide-react';

const inputCls =
  'w-full h-11 px-3 bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-accent outline-none';
const taCls =
  'w-full px-3 py-2.5 bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-accent outline-none resize-y';

function Field({ label, children, hint }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
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
      <h2 className="font-display text-sm uppercase tracking-[0.18em] text-accent-ink mb-5">
        {title}
      </h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

const DEFAULTS = {
  name: '',
  professional_title: '',
  hero_headline: '',
  hero_supporting: '',
  profile_image: '',
  profile_alt: '',
  email: '',
  linkedin_url: '',
  calendar_url: '',
  cv_url: '',
  seo_title: '',
  seo_description: '',
  social_image: '',
  primary_cta_label: '',
  primary_cta_link: '',
  about_bio: '',
  mini_about_text: '',
  about_portrait: '',
  about_portrait_alt: '',
  experience: [],
  education: [],
  about_cv: '',
  behance_url: '',
  contact_heading: '',
  contact_description: '',
};

export default function SiteContentForm() {
  const { data: site, isLoading } = useSiteContent();
  const qc = useQueryClient();
  const [form, setForm] = useState(null);
  const [inited, setInited] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!inited && !isLoading) {
      setForm(site ? { ...site } : { ...DEFAULTS });
      setInited(true);
    }
  }, [inited, isLoading, site]);

  if (form === null) {
    return <div className="h-64 animate-pulse bg-card/40 border border-border" />;
  }

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    setSaved(false);
    try {
      if (site?.id) {
        await base44.entities.SiteContent.update(site.id, form);
      } else {
        await base44.entities.SiteContent.create(form);
      }
      qc.invalidateQueries({ queryKey: ['siteContent'] });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      alert('Error al guardar: ' + (e.message || e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      <Group title="Identidad">
        <Field label="Nombre / wordmark">
          <input className={inputCls} value={form.name || ''} onChange={(e) => set('name', e.target.value)} />
        </Field>
        <Field label="Título profesional">
          <input className={inputCls} value={form.professional_title || ''} onChange={(e) => set('professional_title', e.target.value)} />
        </Field>
      </Group>

      <Group title="Hero">
        <Field label="Titular (H1)" hint="Usa *palabra* para resaltarla en cursiva.">
          <textarea rows={2} className={taCls} value={form.hero_headline || ''} onChange={(e) => set('hero_headline', e.target.value)} />
        </Field>
        <Field label="Texto de apoyo">
          <textarea rows={3} className={taCls} value={form.hero_supporting || ''} onChange={(e) => set('hero_supporting', e.target.value)} />
        </Field>

        <div className="grid sm:grid-cols-2 gap-5">
          <ImageUpload label="Retrato (hero)" value={form.profile_image} alt={form.profile_alt} onChange={(v) => set('profile_image', v)} />
          <Field label="Texto alternativo del retrato">
            <input className={inputCls} value={form.profile_alt || ''} onChange={(e) => set('profile_alt', e.target.value)} />
          </Field>
        </div>
      </Group>

      <Group title="CTA principal">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Etiqueta del CTA">
            <input className={inputCls} value={form.primary_cta_label || ''} onChange={(e) => set('primary_cta_label', e.target.value)} />
          </Field>
          <Field label="Enlace del CTA">
            <input className={inputCls} value={form.primary_cta_link || ''} onChange={(e) => set('primary_cta_link', e.target.value)} />
          </Field>
        </div>
      </Group>

      <Group title="SEO">
        <Field label="Título SEO">
          <input className={inputCls} value={form.seo_title || ''} onChange={(e) => set('seo_title', e.target.value)} />
        </Field>
        <Field label="Descripción SEO">
          <textarea rows={2} className={taCls} value={form.seo_description || ''} onChange={(e) => set('seo_description', e.target.value)} />
        </Field>
        <ImageUpload label="Imagen para redes (social)" value={form.social_image} onChange={(v) => set('social_image', v)} />
      </Group>

      <Group title="Sobre mí">
        <Field label="Biografía" hint="Introducción que aparece en la página Sobre mí.">
          <textarea rows={5} className={taCls} value={form.about_bio || ''} onChange={(e) => set('about_bio', e.target.value)} />
        </Field>
        <Field label="Bloque «Sobre mí» del inicio" hint="Párrafo corto del bloque resumen de la página de inicio.">
          <textarea rows={3} className={taCls} value={form.mini_about_text || ''} onChange={(e) => set('mini_about_text', e.target.value)} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-5">
          <ImageUpload label="Retrato (sobre mí)" value={form.about_portrait} alt={form.about_portrait_alt} onChange={(v) => set('about_portrait', v)} />
          <Field label="Texto alternativo del retrato">
            <input className={inputCls} value={form.about_portrait_alt || ''} onChange={(e) => set('about_portrait_alt', e.target.value)} />
          </Field>
        </div>
        <ExperienceList value={form.experience} onChange={(v) => set('experience', v)} />
        <ListField label="Educación" value={form.education} onChange={(v) => set('education', v)} rows={3} />
        <Field label="Enlace de CV (sobre mí)">
          <input className={inputCls} value={form.about_cv || ''} onChange={(e) => set('about_cv', e.target.value)} />
        </Field>
      </Group>

      <Group title="Contacto">
        <Field label="Titular de contacto">
          <input className={inputCls} value={form.contact_heading || ''} onChange={(e) => set('contact_heading', e.target.value)} />
        </Field>
        <Field label="Descripción de contacto">
          <textarea rows={3} className={taCls} value={form.contact_description || ''} onChange={(e) => set('contact_description', e.target.value)} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Email">
            <input className={inputCls} type="email" value={form.email || ''} onChange={(e) => set('email', e.target.value)} />
          </Field>
          <Field label="LinkedIn">
            <input className={inputCls} value={form.linkedin_url || ''} onChange={(e) => set('linkedin_url', e.target.value)} />
          </Field>
          <Field label="Behance">
            <input className={inputCls} value={form.behance_url || ''} onChange={(e) => set('behance_url', e.target.value)} />
          </Field>
          <Field label="URL de agenda / calendario">
            <input className={inputCls} value={form.calendar_url || ''} onChange={(e) => set('calendar_url', e.target.value)} />
          </Field>
          <Field label="URL de CV">
            <input className={inputCls} value={form.cv_url || ''} onChange={(e) => set('cv_url', e.target.value)} />
          </Field>
        </div>
      </Group>

      <div className="sticky bottom-4 flex justify-end">
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 h-11 px-6 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <Check size={16} /> : null}
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </div>
  );
}