'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Skills from '@/components/sections/skills';
import Projects from '@/components/sections/projects';
import Stack from '@/components/sections/stack';
import Contact from '@/components/sections/contact';
import type { SectionId } from '@/lib/types';

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-28 md:pt-0">
        <Hero activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="container mx-auto px-4 md:px-6 space-y-20 md:space-y-32">
            <About />
            <Skills />
            <Projects />
            <Stack />
            <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
