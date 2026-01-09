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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-4 h-full">
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
              "flex md:flex-row flex-col items-center justify-center md:justify-start text-center md:text-left gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border border-primary/10 bg-black/40 backdrop-blur-md transition-all duration-300 glow-border hover:border-primary/50 hover:bg-primary/10 aspect-square md:aspect-auto cursor-pointer min-h-[60px] sm:min-h-[70px]"
            )}>
              <section.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary/70 transition-colors group-hover:text-primary" />
              <span className="font-mono text-xs sm:text-sm md:text-base text-gray-300 group-hover:text-white">{section.label}</span>
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}
