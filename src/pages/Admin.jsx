import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import SiteContentForm from '@/components/admin/SiteContentForm';
import ProjectEditor from '@/components/admin/ProjectEditor';

export default function Admin() {
  const { user, isAuthenticated, isLoadingAuth, navigateToLogin } = useAuth();
  const [tab, setTab] = useState('site');

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-border border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-2xl font-semibold">Área privada</h1>
          <p className="mt-3 text-muted-foreground">
            Inicia sesión como administrador para gestionar el contenido del portafolio.
          </p>
          <button
            onClick={() => navigateToLogin()}
            className="mt-6 inline-flex h-11 px-6 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-2xl font-semibold">Acceso restringido</h1>
          <p className="mt-3 text-muted-foreground">
            Tu cuenta no tiene permisos de administrador.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex h-11 px-6 border border-border font-medium hover:border-accent transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-semibold">Admin</h1>
            <p className="text-sm text-muted-foreground">Gestiona el contenido de tu portafolio.</p>
          </div>
          <Link to="/" className="text-sm text-accent-ink hover:text-link-hover transition-colors">
            Ver sitio →
          </Link>
        </div>

        <div className="flex gap-2 border-b border-border mb-8" role="tablist">
          {[
            { id: 'site', label: 'Contenido del sitio' },
            { id: 'projects', label: 'Proyectos' },
          ].map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                tab === t.id
                  ? 'border-accent text-accent-ink'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'site' ? <SiteContentForm /> : <ProjectEditor />}
      </div>
    </div>
  );
}