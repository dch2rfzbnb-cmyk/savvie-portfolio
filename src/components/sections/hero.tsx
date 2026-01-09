'use client';

import type { Dispatch, SetStateAction } from 'react';
import { Terminal } from '@/components/terminal';
import { FolderPanel } from '@/components/folder-panel';
import type { SectionId } from '@/lib/types';

interface HeroProps {
  activeSection: SectionId;
  setActiveSection: Dispatch<SetStateAction<SectionId>>;
}

export default function Hero({ activeSection, setActiveSection }: HeroProps) {
  return (
    <section id="hero" className="relative h-[calc(100vh-5rem)] min-h-[500px] md:min-h-[700px] w-full">
      <div className="container mx-auto px-4 md:px-6 h-full flex items-center">
        <div className="grid md:grid-cols-[2fr,1fr] gap-4 md:gap-8 lg:gap-16 items-start w-full">
          <Terminal activeSection={activeSection} />
          <FolderPanel setActiveSection={setActiveSection} />
        </div>
      </div>
    </section>
  );
}
