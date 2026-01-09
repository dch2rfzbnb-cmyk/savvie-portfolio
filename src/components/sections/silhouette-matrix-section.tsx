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
      // Для маскированного слоя сохраняем содержимое при ресайзе
      if (isMasked) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.putImageData(imageData, 0, 0);
      } else {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
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
    // Базовая скорость для фонового слоя
    const baseSpeed = 30;
    
    // Константа целевого времени заполнения (в секундах) - можно менять для настройки длительности
    // Измените это значение, чтобы сделать заполнение быстрее (меньше) или медленнее (больше)
    const TARGET_FILL_TIME = 15; // секунд
    
    const startTime = performance.now();
    let isFilled = false;

    const draw = (timestamp: number) => {
      // Для фонового слоя - стандартное поведение без изменений
      if (!isMasked) {
        if (timestamp - lastTime > baseSpeed) {
          ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.font = '15px monospace';

          for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            const x = i * 20;
            const y = drops[i] * 20;

            ctx.fillStyle = `rgba(22, 163, 74, ${opacity})`;
            ctx.fillText(text, x, y);

            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
              drops[i] = 0;
            }
            drops[i]++;
          }

          lastTime = timestamp;
        }
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      // Для маскированного слоя - логика с таймером
      const elapsedSeconds = (performance.now() - startTime) / 1000; // Время в секундах
      const progress = Math.min(elapsedSeconds / TARGET_FILL_TIME, 1); // Прогресс от 0 до 1
      
      // После завершения заполнения останавливаем анимацию маскированного слоя
      if (elapsedSeconds >= TARGET_FILL_TIME) {
        // После заполнения не обновляем анимацию, прекращаем цикл
        return;
      }

      // Масштабируем скорость обновления на основе прогресса
      // В начале анимация быстрее (меньше интервал), к концу немного замедляется для плавности
      const currentSpeed = baseSpeed / (1 + progress * 2); // От baseSpeed до baseSpeed/3 (быстрее при большем прогрессе)

      if (timestamp - lastTime > currentSpeed) {
        // НЕ очищаем canvas - символы накапливаются
        ctx.font = '15px monospace';

        // Масштабируем частоту спавна на основе прогресса
        // Увеличиваем плотность к концу для равномерного заполнения
        const spawnChance = 0.4 + (progress * 0.6); // От 0.4 до 1.0

        // Масштабируем скорость падения символов на основе прогресса
        // Базовый шаг умножаем на коэффициент, зависящий от времени
        const baseDropStep = 2;
        const dropStepMultiplier = 1 + (progress * 4); // От 1 до 5
        const dropStep = Math.max(1, Math.floor(baseDropStep * dropStepMultiplier));

        for (let i = 0; i < drops.length; i++) {
          // Пропускаем некоторые колонки для контроля плотности
          if (Math.random() > spawnChance) {
            continue;
          }

          const text = characters.charAt(Math.floor(Math.random() * characters.length));
          const x = i * 20;
          const y = drops[i] * 20;

          ctx.fillStyle = baseColor;
          ctx.fillText(text, x, y);

          // Символы падают и остаются на canvas
          if (drops[i] * 20 > canvas.height) {
            // После достижения низа, сбрасываем в начало для нового цикла
            if (Math.random() > 0.98) {
              drops[i] = 0;
            } else {
              drops[i] += dropStep;
            }
          } else {
            drops[i] += dropStep;
          }
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

