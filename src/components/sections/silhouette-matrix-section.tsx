'use client';

import { useEffect, useRef, useState } from 'react';

export default function SilhouetteMatrixSection() {
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const maskedCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitImageRef = useRef<HTMLImageElement | null>(null);
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
    animationRef: React.MutableRefObject<number | undefined>,
    portraitImage?: HTMLImageElement
  ) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Для маскированного слоя перерисовываем портрет при ресайзе
      if (isMasked && portraitImage && portraitImage.complete) {
        drawPortrait(ctx, canvas, portraitImage);
      }
    };

    resizeCanvas();
    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    // Увеличиваем шаг между колонками для меньшей плотности
    const columnSpacing = isMasked ? 35 : 20; // Было 20, стало 35 для маскированного
    const columns = Math.floor(canvas.width / columnSpacing);
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    // Уменьшаем непрозрачность для маскированного слоя
    const baseColor = isMasked ? 'rgba(34, 197, 94, 0.4)' : '#16a34a'; // Было 0.9, стало 0.4
    const opacity = isMasked ? 0.4 : 0.3;
    
    // Функция для отрисовки портрета
    const drawPortrait = (context: CanvasRenderingContext2D, canvasEl: HTMLCanvasElement, img: HTMLImageElement) => {
      // Вычисляем размеры с сохранением пропорций
      const imgAspect = img.width / img.height;
      const canvasAspect = canvasEl.width / canvasEl.height;
      
      let drawWidth = canvasEl.width;
      let drawHeight = canvasEl.height;
      let offsetX = 0;
      let offsetY = 0;
      
      if (imgAspect > canvasAspect) {
        // Изображение шире
        drawHeight = canvasEl.width / imgAspect;
        offsetY = (canvasEl.height - drawHeight) / 2;
      } else {
        // Изображение выше
        drawWidth = canvasEl.height * imgAspect;
        offsetX = (canvasEl.width - drawWidth) / 2;
      }
      
      // Рисуем портрет
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };
    
    // Если есть портрет, отрисовываем его один раз в начале
    if (isMasked && portraitImage) {
      if (portraitImage.complete) {
        drawPortrait(ctx, canvas, portraitImage);
      } else {
        portraitImage.onload = () => {
          drawPortrait(ctx, canvas, portraitImage);
        };
      }
    }

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
        // Для маскированного слоя используем очень лёгкую заливку хвостов с перерисовкой портрета
        if (isMasked) {
          // Очень лёгкая заливка для хвостов (затемняет старые символы, но не сильно затемняет портрет)
          ctx.fillStyle = 'rgba(0, 0, 0, 0.12)'; // Увеличено с 0.08 для более заметных хвостов
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Перерисовываем портрет поверх заливки, чтобы он оставался ярким
          if (portraitImage && portraitImage.complete) {
            drawPortrait(ctx, canvas, portraitImage);
          }
        } else {
          // Для фонового слоя - стандартная заливка для эффекта хвостов
          ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Увеличиваем размер шрифта для маскированного слоя (меньше символов, больше размер)
        const fontSize = isMasked ? 18 : 15; // Было 15, стало 18 для маскированного
        ctx.font = `${fontSize}px monospace`;

        // Масштабируем частоту спавна на основе прогресса (для маскированного делаем ещё меньше)
        const spawnChance = isMasked 
          ? 0.25 + (progress * 0.35) // От 0.25 до 0.6 (было от 0.4 до 1.0)
          : 1.0;

        // Масштабируем скорость падения символов (для маскированного медленнее)
        const baseDropStep = isMasked ? 1.5 : 1; // Было 2, стало 1.5 для маскированного
        const dropStepMultiplier = isMasked 
          ? 1 + (progress * 2) // От 1 до 3 (было от 1 до 5)
          : 1;
        const dropStep = Math.max(1, Math.floor(baseDropStep * dropStepMultiplier));

        for (let i = 0; i < drops.length; i++) {
          // Пропускаем некоторые колонки для контроля плотности
          if (Math.random() > spawnChance) {
            continue;
          }

          const text = characters.charAt(Math.floor(Math.random() * characters.length));
          const x = i * columnSpacing; // Используем увеличенный шаг
          const y = drops[i] * 20;

          // Используем rgba с прозрачностью для символов
          ctx.fillStyle = isMasked ? baseColor : `rgba(22, 163, 74, ${opacity})`;
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

  // Загрузка портрета
  useEffect(() => {
    const img = new Image();
    img.src = '/matrix-portrait.png';
    img.onload = () => {
      portraitImageRef.current = img;
    };
  }, []);

  // Инициализация маскированного дождя
  useEffect(() => {
    if (!maskedCanvasRef.current || !isVisible || !portraitImageRef.current) return;
    return initMatrixRain(maskedCanvasRef.current, true, maskedAnimationRef, portraitImageRef.current);
  }, [isVisible, portraitImageRef.current]);

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

      {/* Маскированный слой дождя с портретом */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] md:max-w-[80vw] md:max-h-[85vh]">
          <canvas
            ref={maskedCanvasRef}
            className="w-full h-full"
            style={{
              mixBlendMode: 'screen', // Смешивание для более стильного эффекта
            }}
          />
        </div>
      </div>
    </section>
  );
}

