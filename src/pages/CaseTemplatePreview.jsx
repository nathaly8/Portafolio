import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/portfolio/Header';
import Footer from '@/components/portfolio/Footer';
import CaseTemplate from '@/components/case/CaseTemplate';
import { caseTemplateDemo } from '@/lib/caseTemplateDemo';

export default function CaseTemplatePreview() {
  useEffect(() => {
    document.title = 'Plantilla de caso · Vista previa';
  }, []);

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Link
            to="/proyectos"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-link-hover"
          >
            Volver a proyectos
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-[240ms] group-hover:translate-x-1"
            />
          </Link>
        </div>
        <CaseTemplate data={caseTemplateDemo} preview />
      </main>
      <Footer />
    </>
  );
}