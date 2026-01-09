'use client';

import { useEffect, useRef, useState } from 'react';

export default function SilhouetteMatrixSection() {
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const maskedCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const backgroundAnimationRef = useRef<number>();
  const maskedAnimationRef = useRef<number>();

  // Intersection Observer для fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Функция для создания матричного дождя на canvas
  const initMatrixRain = (
    canvas: HTMLCanvasElement,
    isMasked: boolean,
    animationRef: React.MutableRefObject<number | undefined>
  ) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const baseColor = isMasked ? '#22c55e' : '#16a34a';
    const opacity = isMasked ? 0.9 : 0.3;

    let lastTime = 0;
    const speed = 30;

    const draw = (timestamp: number) => {
      if (timestamp - lastTime > speed) {
        ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '15px monospace';

        for (let i = 0; i < drops.length; i++) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length));
          const x = i * 20;
          const y = drops[i] * 20;

          ctx.fillStyle = isMasked ? baseColor : `rgba(22, 163, 74, ${opacity})`;
          ctx.fillText(text, x, y);

          if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }

        lastTime = timestamp;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  };

  // Инициализация фонового дождя
  useEffect(() => {
    if (!backgroundCanvasRef.current) return;
    return initMatrixRain(backgroundCanvasRef.current, false, backgroundAnimationRef);
  }, []);

  // Инициализация маскированного дождя
  useEffect(() => {
    if (!maskedCanvasRef.current || !isVisible) return;
    return initMatrixRain(maskedCanvasRef.current, true, maskedAnimationRef);
  }, [isVisible]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-black overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s ease-in-out',
      }}
    >
      {/* Фоновый слой дождя */}
      <canvas
        ref={backgroundCanvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Маскированный слой дождя */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="relative w-full h-full max-w-[90vw] max-h-[90vh] md:max-w-[80vw] md:max-h-[85vh]"
          style={{
            WebkitMaskImage: 'url("/matrix-portrait.png")',
            WebkitMaskSize: 'contain',
            WebkitMaskPosition: 'center',
            WebkitMaskRepeat: 'no-repeat',
            maskImage: 'url("/matrix-portrait.png")',
            maskSize: 'contain',
            maskPosition: 'center',
            maskRepeat: 'no-repeat',
          }}
        >
          <canvas
            ref={maskedCanvasRef}
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}

