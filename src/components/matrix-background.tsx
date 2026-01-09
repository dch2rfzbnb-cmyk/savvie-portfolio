"use client";

import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mousePosRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const columns = Math.floor(width / 20);
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
    const baseColor = '#16a34a';
    const highlightColor = '#ef4444';
    const highlightRadius = 80 / 3;

    function draw() {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = '15px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * 20;
        const y = drops[i] * 20;
        
        let fillColor = baseColor;
        const mouse = mousePosRef.current;

        if (mouse) {
            const dx = mouse.x - x;
            const dy = mouse.y - y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < highlightRadius) {
                fillColor = highlightColor;
            }
        }
        
        ctx.fillStyle = fillColor;
        ctx.fillText(text, x, y);

        if (drops[i] * 20 > height && Math.random() > 0.985) { // Slower reset
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    let lastTime = 0;
    const speed = 40; // higher is slower, represents ms per frame
    let animationFrameId: number;

    const renderLoop = (timestamp: number) => {
        if (timestamp - lastTime > speed) {
            draw();
            lastTime = timestamp;
        }
        animationFrameId = window.requestAnimationFrame(renderLoop);
    };
    
    renderLoop(0);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0"></canvas>;
};

export default MatrixBackground;
