import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useAllProjects } from '@/lib/adminPortfolioData';
import ProjectForm from './ProjectForm';
import { ArrowRight, Plus, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectEditor() {
  const { data: projects = [], isLoading } = useAllProjects();
  const qc = useQueryClient();
  const [editing, setEditing] = useState(null);

  const remove = async (p) => {
    if (!window.confirm(`¿Eliminar "${p.title}"? Esta acción no se puede deshacer.`)) return;
    try {
      await base44.entities.Project.delete(p.id);
      qc.invalidateQueries({ queryKey: ['projects'] });
    } catch (e) {
      alert('Error al eliminar: ' + (e.message || e));
    }
  };

  if (editing) {
    return <ProjectForm project={editing === 'new' ? null : editing} onClose={() => setEditing(null)} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">{projects.length} proyecto(s)</p>
        <button
          onClick={() => setEditing('new')}
          className="inline-flex items-center gap-2 h-10 px-4 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} /> Nuevo proyecto
        </button>
      </div>

      {isLoading ? (
        <div className="h-40 animate-pulse bg-card/40 border border-border" />
      ) : (
        <div className="divide-y divide-border border border-border">
          {projects.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-4">
              <div className="w-16 h-12 bg-card border border-border overflow-hidden shrink-0">
                {p.cover_image && (
                  <img src={p.cover_image} alt="" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{p.title || 'Sin título'}</p>
                <p className="text-xs text-muted-foreground">
                  {[p.category, p.year, !p.published && 'Borrador', p.featured && 'Destacado']
                    .filter(Boolean)
                    .join(' · ')}
                </p>
                {!p.published && p.slug && (
                  <Link
                    to={`/proyectos/${p.slug}`}
                    className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-link transition-colors hover:text-link-hover"
                  >
                    Ver borrador
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                )}
              </div>
              <button
                onClick={() => setEditing(p)}
                className="p-2 text-muted-foreground hover:text-link-hover transition-colors"
                aria-label={`Editar ${p.title}`}
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => remove(p)}
                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                aria-label={`Eliminar ${p.title}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="p-6 text-sm text-muted-foreground">No hay proyectos todavía.</p>
          )}
        </div>
      )}
    </div>
  );
}