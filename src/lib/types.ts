import type { LucideIcon } from 'lucide-react';

export type NavLink = {
  name: string;
  href: string;
};

export type SkillCategory = {
  name:string;
  skills: string[];
}

export type Project = {
  title: string;
  description: string;
  tags: string[];
  url?: string;
};

export type StackItem = {
  name:string;
  icon?: LucideIcon | React.ElementType;
}

export type SocialLink = {
  name: string;
  url: string;
  icon: LucideIcon;
};

export type SectionId = 'hero' | 'about' | 'skills' | 'projects' | 'stack' | 'contact';

export type TerminalText = {
  command: string;
  lines: string[];
};

export type TerminalProjectLink = {
  id: string;
  label: string;
  asciiIcon: string;
  href: string;
};
