'use client';

import { useState, useEffect, useRef } from 'react';

interface AboutTerminalProps {
  text: string;
  typingSpeed?: number;
}

export function AboutTerminal({ text, typingSpeed = 30 }: AboutTerminalProps) {
  const [displayed, setDisplayed] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const currentIndexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    currentIndexRef.current = 0;
    setDisplayed('');
    setIsFinished(false);

    if (text.length === 0) {
      setIsFinished(true);
      return;
    }

    const typeChar = () => {
      const currentIndex = currentIndexRef.current;
      
      if (currentIndex >= text.length) {
        setIsFinished(true);
        return;
      }

      const char = text[currentIndex];
      setDisplayed(text.slice(0, currentIndex + 1));
      currentIndexRef.current++;

      // Замедление после точек, запятых и переносов строк
      let delay = typingSpeed;
      if (char === '.' || char === '!' || char === '?') {
        delay = typingSpeed * 8; // Пауза после предложений
      } else if (char === ',') {
        delay = typingSpeed * 3;
      } else if (char === '\n') {
        delay = typingSpeed * 5; // Пауза после абзацев
      }

      timeoutRef.current = setTimeout(typeChar, delay);
    };

    timeoutRef.current = setTimeout(typeChar, typingSpeed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, typingSpeed]);

  // Функция для обработки зачёркнутого текста
  const renderText = (text: string) => {
    const parts: (string | { text: string; strikethrough: boolean })[] = [];
    let currentIndex = 0;
    const regex = /~~(.*?)~~/g;
    let match;
    const matches: RegExpExecArray[] = [];

    // Собираем все совпадения
    while ((match = regex.exec(text)) !== null) {
      matches.push(match);
    }

    // Обрабатываем совпадения
    matches.forEach((match) => {
      // Добавляем текст до зачёркнутого
      if (match.index > currentIndex) {
        parts.push(text.slice(currentIndex, match.index));
      }
      // Добавляем зачёркнутый текст (без ~~)
      parts.push({ text: match[1], strikethrough: true });
      currentIndex = match.index + match[0].length;
    });

    // Добавляем оставшийся текст
    if (currentIndex < text.length) {
      parts.push(text.slice(currentIndex));
    }

    return parts.map((part, index) => {
      if (typeof part === 'string') {
        return <span key={index}>{part}</span>;
      } else {
        return (
          <span key={index} className="line-through text-muted-foreground/60">
            {part.text}
          </span>
        );
      }
    });
  };

  return (
    <div className="rounded-xl border border-primary/30 bg-black/70 shadow-2xl shadow-black/50 backdrop-blur-sm font-mono text-sm md:text-base text-gray-300 overflow-hidden">
      <div className="flex items-center gap-2 p-3 border-b border-primary/20">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <p className="text-xs md:text-sm text-gray-400 font-mono">~/about_me.txt</p>
      </div>
      <div className="p-4 md:p-6">
        <pre className="whitespace-pre-wrap leading-relaxed font-mono">
          {renderText(displayed)}
          <span className="inline-block w-2 h-[1em] bg-primary ml-1 type-cursor"></span>
        </pre>
      </div>
    </div>
  );
}

