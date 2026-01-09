'use client';

import type { Dispatch, SetStateAction } from 'react';
import { Folder, User, Lightbulb, Package, Briefcase, Mail } from 'lucide-react';
import type { SectionId } from '@/lib/types';
import { cn } from '@/lib/utils';
import { FadeIn } from './fade-in';

interface FolderPanelProps {
  setActiveSection: Dispatch<SetStateAction<SectionId>>;
}

const sections: { id: SectionId; label: string; icon: React.ElementType }[] = [
  { id: 'about', label: 'about_me/', icon: User },
  { id: 'skills', label: 'skills/', icon: Lightbulb },
  { id: 'projects', label: 'projects/', icon: Briefcase },
  { id: 'stack', label: 'stack/', icon: Package },
  { id: 'contact', label: 'contacts/', icon: Mail },
];

export function FolderPanel({ setActiveSection }: FolderPanelProps) {
  const handleSectionActivate = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      // element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <FadeIn delay={200} className="h-full">
      <div className="grid grid-cols-3 md:grid-cols-1 gap-2 md:gap-4 h-full">
        {sections.map((section, index) => (
          <div
            key={section.id}
            onMouseEnter={() => setActiveSection(section.id)}
            onClick={() => handleSectionActivate(section.id)}
            onFocus={() => setActiveSection(section.id)}
            className="group"
            tabIndex={0}
          >
            <div className={cn(
              "flex md:flex-row flex-col items-center justify-center md:justify-start text-center md:text-left gap-1 md:gap-3 p-2 md:p-4 rounded-lg border border-primary/10 bg-black/40 backdrop-blur-md transition-colors duration-200 md:transition-all md:duration-300 md:glow-border hover:border-primary/50 hover:bg-primary/10 aspect-square md:aspect-auto cursor-pointer min-h-[50px] md:min-h-[70px]"
            )}>
              <section.icon className="h-5 w-5 md:h-8 md:w-8 text-primary/70 transition-colors group-hover:text-primary" />
              <span className="font-mono text-[10px] md:text-base text-gray-300 group-hover:text-white">{section.label}</span>
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}
