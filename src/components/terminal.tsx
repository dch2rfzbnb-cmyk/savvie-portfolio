'use client';

import { useState, useEffect, useRef } from 'react';
import { terminalTexts, terminalProjects, contactLink } from '@/lib/data';
import type { SectionId, TerminalProjectLink } from '@/lib/types';

interface TypewriterProps {
  text: string;
  typingSpeed?: number;
  onFinished?: () => void;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, typingSpeed = 10, onFinished }) => {
  const [displayed, setDisplayed] = useState('');
  const currentIndexRef = useRef(0);

  useEffect(() => {
    currentIndexRef.current = 0;
    setDisplayed('');
    
    if (text.length === 0) {
        if(onFinished) onFinished();
        return;
    }

    const interval = setInterval(() => {
      const currentIndex = currentIndexRef.current;
      currentIndexRef.current++;
      setDisplayed(text.slice(0, currentIndex + 1));
      
      if (currentIndex + 1 >= text.length) {
        clearInterval(interval);
        if (onFinished) onFinished();
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [text, typingSpeed, onFinished]);

    return <pre className="whitespace-pre-wrap leading-[1.3]">{displayed}{displayed.length < text.length && <span className="inline-block w-2 h-[1em] bg-primary ml-1 type-cursor"></span>}</pre>;
};

type ProjectsTypewriterGridProps = {
  projects: TerminalProjectLink[];
  typingSpeed?: number;
};

const ProjectsTypewriterGrid: React.FC<ProjectsTypewriterGridProps> = ({
  projects,
  typingSpeed = 25,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    const maxLen = Math.max(...projects.map(p => p.asciiIcon.length));
    if (maxLen === 0) return;

    const interval = setInterval(() => {
      setIndex(prev => {
        const next = prev + 1;
        if (next >= maxLen) {
          clearInterval(interval);
        }
        return next;
      });
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [projects, typingSpeed]);

  return (
    <div className="min-h-[250px] md:min-h-[400px] flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
        {projects.map(project => {
          const visibleText = project.asciiIcon.slice(0, index);
          return (
            <button
              key={project.id}
              onClick={() => window.open(project.href, '_blank')}
              className="text-left font-mono px-1 py-1 rounded-md transition-colors hover:bg-primary/10"
              aria-label={project.label}
            >
              <pre className="whitespace-pre leading-[1.1] text-gray-300 hover:text-white">
                {visibleText}
                 {visibleText.length < project.asciiIcon.length && <span className="inline-block w-2 h-[1em] bg-primary ml-1 type-cursor"></span>}
              </pre>
            </button>
          );
        })}
      </div>
    </div>
  );
};

type TerminalTypewriterScrambleProps = {
  text: string;
  typingSpeed?: number;
  scrambleDuration?: number;
};

const TerminalTypewriterScramble: React.FC<TerminalTypewriterScrambleProps> = ({
  text,
  typingSpeed = 30,
  scrambleDuration = 100,
}) => {
  const [displayed, setDisplayed] = useState('');
  const scramblingRef = useRef<string | null>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    let index = 0;
    let mainInterval: NodeJS.Timeout;
    const chars = text.split('');
    const randomChars = '!@#$%^&*()-_=+[]{}<>?/\\|0123456789';
    
    setDisplayed('');

    const processChar = () => {
      if (index >= chars.length) {
        scramblingRef.current = null;
        setDisplayed(text); // Ensure final text is perfect
        return;
      }

      const targetChar = chars[index];

      if (targetChar === ' ' || targetChar === '\n') {
        setDisplayed(prev => prev + targetChar);
        index += 1;
        scramblingRef.current = null;
        // Move to next char immediately
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        mainInterval = setTimeout(processChar, typingSpeed);
        return;
      }
      
      const startTime = performance.now();

      const scramble = (now: number) => {
        const elapsed = now - startTime;

        if (elapsed < scrambleDuration) {
          const randomIndex = Math.floor(Math.random() * randomChars.length);
          const randomChar = randomChars[randomIndex];
          scramblingRef.current = randomChar;
          setDisplayed(prev => prev.slice(0, index) + randomChar);
          rafRef.current = requestAnimationFrame(scramble);
        } else {
          setDisplayed(prev => prev.slice(0, index) + targetChar);
          scramblingRef.current = null;
          index += 1;
          // Move to the next character after scramble is done
          mainInterval = setTimeout(processChar, typingSpeed);
        }
      };

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(scramble);
    };

    mainInterval = setTimeout(processChar, typingSpeed);

    return () => {
      clearInterval(mainInterval);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text, typingSpeed, scrambleDuration]);

  return (
    <pre className="whitespace-pre-wrap leading-[1.3]">
      {displayed}
      {scramblingRef.current && <span className="inline-block w-2 h-[1em] bg-primary ml-1 type-cursor">{scramblingRef.current}</span>}
    </pre>
  );
};


interface TerminalProps {
  activeSection: SectionId;
}

export function Terminal({ activeSection }: TerminalProps) {
  const currentContent = terminalTexts[activeSection];
  const fullText = `${currentContent.command}\n${currentContent.lines.join('\n')}`;

  const allProjectLinks = [...terminalProjects, contactLink];

  const renderContent = () => {
    if (activeSection === 'hero') {
      const heroText = `${terminalTexts.hero.command}\n${terminalTexts.hero.lines.join('\n')}`;
      return <TerminalTypewriterScramble text={heroText} typingSpeed={30} scrambleDuration={100} />;
    }

    if (activeSection === 'projects') {
      return <ProjectsTypewriterGrid projects={allProjectLinks} typingSpeed={10} />;
    }
    
    // Fallback to the original typewriter for other sections
    return <Typewriter text={fullText} typingSpeed={10}/>;
  }

  return (
    <div className="rounded-xl border border-primary/30 bg-black/70 shadow-2xl shadow-black/50 backdrop-blur-sm h-full min-h-[300px] md:min-h-[500px] flex flex-col shadow-inner overflow-hidden">
        <div className="flex items-center gap-2 p-3 border-b border-primary/20">
            <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <p className="text-xs md:text-sm text-gray-400 font-mono truncate">~/workspace/nano-architect</p>
        </div>
        <div className="p-4 md:p-6 flex-grow font-mono text-sm md:text-base text-gray-300">
            <div className="relative min-h-[250px] md:min-h-[400px]">
                {renderContent()}
            </div>
        </div>
    </div>
  );
}
