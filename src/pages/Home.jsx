import React, { useEffect } from 'react';
import Header from '@/components/portfolio/Header';
import Hero from '@/components/portfolio/Hero';
import CaseReferences from '@/components/portfolio/CaseReferences';
import CapabilityGrid from '@/components/portfolio/CapabilityGrid';
import MiniAbout from '@/components/portfolio/MiniAbout';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';
import { useSiteContent } from '@/lib/portfolioData';

export default function Home() {
  const { data: site } = useSiteContent();

  useEffect(() => {
    if (site?.seo_title) document.title = site.seo_title;
    if (site?.seo_description) {
      const tag = document.querySelector('meta[name="description"]');
      if (tag) tag.setAttribute('content', site.seo_description);
    }
  }, [site?.seo_title, site?.seo_description]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <CaseReferences />
        <CapabilityGrid />
        <MiniAbout />
        <Contact />
      </main>
      <Footer />
    </>
  );
}