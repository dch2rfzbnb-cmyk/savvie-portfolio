'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { FadeIn } from '@/components/fade-in';
import { Button } from '@/components/ui/button';

type ChatMessage = {
  id: number;
  role: 'user' | 'bot';
  text: string;
};

// Backend base URL (eto-tours API). Set NEXT_PUBLIC_API_BASE_URL in Vercel / .env.local. Default: VPS.
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://155.212.208.92:8000';
const API_URL = `${API_BASE_URL}/api/search`;
const DEBUG_TOURS_JSON = process.env.NEXT_PUBLIC_DEBUG_TOURS_JSON === 'true';

function renderMultiline(text: string) {
  const lines = text.split('\n');
  return lines.map((line, idx) => (
    <span key={idx}>
      {line}
      {idx < lines.length - 1 && <br />}
    </span>
  ));
}

function MatrixBeachBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const symbols = ['✶', '✦', '✺', '✸', '✹', '✻', '✼', '✾', '✿', '🌴', '🌊', '★'];
    const fontSize = 16;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns)
        .fill(0)
        .map(() => Math.floor(Math.random() * canvas.height));
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      if (!ctx) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const t = y / canvas.height;
        if (t > 0.7) {
          ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
        } else if (t > 0.4) {
          ctx.fillStyle = 'rgba(34, 197, 94, 0.9)';
        } else {
          ctx.fillStyle = 'rgba(132, 204, 22, 0.8)';
        }

        const text = symbols[Math.floor(Math.random() * symbols.length)];
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i]++;
        }
      }

      animationFrameId = window.requestAnimationFrame(draw);
    };

    animationFrameId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-60 pointer-events-none"
    />
  );
}

export default function ToursChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: 'bot',
      text:
        'Привет! Я AI‑ассистент по подбору туров.\n' +
        'Напиши, что тебе нужно, в формате:\n' +
        'город вылета, направление, даты, кол-во человек, бюджет.\n' +
        'Например: \"Москва Тай 3 человека июль 200к\".',
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [debugJson, setDebugJson] = useState<unknown[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const nextIdRef = useRef(2);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const userMessage: ChatMessage = {
      id: nextIdRef.current++,
      role: 'user',
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsSending(true);
    if (DEBUG_TOURS_JSON) setDebugJson([]);

    const payload = {
      text: trimmed,
      user_id: 1,
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let bodyText = '';
      let replyText = '';

      if (!response.ok) {
        try {
          bodyText = await response.text();
        } catch {
          bodyText = '<no body>';
        }

        console.error('Tours chat request error', {
          url: API_URL,
          payload,
          status: response.status,
          statusText: response.statusText,
          bodyText,
        });

        replyText = 'Сервис временно недоступен, попробуйте еще раз позже.';
      } else {
        const data = (await response.json()) as { reply?: string };
        if (DEBUG_TOURS_JSON) setDebugJson((prev) => [...prev, data]);
        replyText = data.reply?.trim() || 'Сервис временно недоступен, попробуйте еще раз позже.';
      }

      const botMessage: ChatMessage = {
        id: nextIdRef.current++,
        role: 'bot',
        text: replyText,
      };

      setMessages((prev) => [...prev, botMessage]);
      if (DEBUG_TOURS_JSON) {
        setTimeout(() => setDebugJson([]), 2000);
      }
    } catch (error) {
      console.error('Tours chat network/CORS error RAW:', error);
      if (error instanceof Error) {
        console.error('name:', error.name);
        console.error('message:', error.message);
        console.error('stack:', error.stack);
      }
      console.error('Extra context:', { url: API_URL, payload });

      const botMessage: ChatMessage = {
        id: nextIdRef.current++,
        role: 'bot',
        text: 'Сервис временно недоступен, попробуйте еще раз позже.',
      };

      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative flex-1 pt-28 md:pt-0 overflow-hidden">
        <MatrixBeachBackground />

        <div className="container mx-auto px-4 md:px-6 pb-16">
          <FadeIn>
            <section className="py-10 md:py-16">
              <div className="mx-auto max-w-3xl">
                <div className="mb-8 text-center">
                  <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-3">
                    AI‑подбор туров
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Терминальный чат для подбора туров: напиши параметры поездки, а ассистент
                    вернёт варианты и уточняющие вопросы.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-black/70 border border-primary/40" />

                  <div className="relative p-4 md:p-5">
                    <div
                      className="flex flex-col h-[480px] md:h-[540px] font-mono text-xs md:text-sm
                                 bg-black/90 text-lime-300 border border-lime-500/60
                                 shadow-[0_0_0_1px_rgba(190,242,100,0.4),0_0_0_2px_rgba(21,128,61,0.4)]"
                      style={{ borderRadius: 0 }}
                    >
                      <div
                        className="flex items-center justify-between px-3 py-2
                                   border-b border-lime-500/40 bg-black/90"
                      >
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 bg-red-500" />
                          <span className="h-2 w-2 bg-yellow-400" />
                          <span className="h-2 w-2 bg-emerald-400" />
                          <span className="text-[11px] uppercase tracking-widest text-lime-300/80">
                            tours-cli@nano.dev
                          </span>
                        </div>
                        <span className="text-[11px] text-lime-400/70">AI tour assistant v0.1</span>
                      </div>

                      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 custom-scrollbar">
                        {messages.map((msg) => (
                          <div key={msg.id} className="leading-relaxed">
                            {msg.role === 'user' ? (
                              <div className="text-sky-300">
                                <span className="text-lime-400 mr-1">&gt;</span>
                                {msg.text}
                              </div>
                            ) : (
                              <div className="text-lime-300">
                                <span className="text-emerald-400 mr-1">bot$</span>
                                {renderMultiline(msg.text)}
                              </div>
                            )}
                          </div>
                        ))}
                        {isSending && (
                          <div className="text-lime-400/70 animate-pulse">
                            <span className="text-emerald-400 mr-1">bot$</span>
                            думаю над маршрутами...
                          </div>
                        )}
                        {DEBUG_TOURS_JSON && debugJson.length > 0 && (
                          <div className="space-y-1 mt-2">
                            {debugJson.map((raw, idx) => (
                              <pre
                                key={idx}
                                className="text-[10px] font-mono text-lime-400/40 bg-black/60 p-2 rounded border border-lime-500/20 overflow-x-auto whitespace-pre-wrap break-words"
                                style={{ opacity: 0.35 }}
                              >
                                {JSON.stringify(raw, null, 2)}
                              </pre>
                            ))}
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>

                      <form
                        onSubmit={handleSubmit}
                        className="border-t border-lime-500/40 bg-black/95 px-3 py-2 flex items-center gap-2"
                      >
                        <span className="text-lime-400 text-xs md:text-sm">&gt;</span>
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="москва тай 3 человека июль 200к"
                          className="flex-1 bg-transparent outline-none border-none text-lime-200 placeholder:text-lime-500/40 text-xs md:text-sm"
                          disabled={isSending}
                        />
                        <Button
                          type="submit"
                          size="sm"
                          variant="outline"
                          className="border-lime-500/60 text-lime-300 hover:bg-lime-500/10 hover:text-lime-100 px-3 py-1 h-7 md:h-8 text-xs"
                          disabled={isSending}
                        >
                          {isSending ? '...' : 'SEND'}
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
}

