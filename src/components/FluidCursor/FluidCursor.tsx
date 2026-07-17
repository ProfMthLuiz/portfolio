import React, { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  age: number;
}

export const FluidCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  // Guarda a posição "atrasada" que persegue o mouse
  const trailCursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pointsRef = useRef<Point[]>([]);
  const hueRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      // Apenas atualiza a posição real do mouse do usuário
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- CONFIGURAÇÃO DO LERP (EFEITO ATRAZO/SUAVIDADE) ---
      // Quanto menor o número (ex: 0.05), mais lento e fluido o rastro persegue o mouse.
      // Quanto maior (ex: 0.2), mais colado na ponta ele fica.
      const ease = 0.08;

      // Verifica se o mouse real está sobre algo interativo
      const target = document.elementFromPoint(
        mouseRef.current.x,
        mouseRef.current.y,
      ) as HTMLElement | null;
      const isOverInteractive = target?.closest('a, button, [role="button"]');

      // Calcula a nova posição interpolada (perseguição)
      trailCursorRef.current.x +=
        (mouseRef.current.x - trailCursorRef.current.x) * ease;
      trailCursorRef.current.y +=
        (mouseRef.current.y - trailCursorRef.current.y) * ease;

      // Só adiciona pontos se NÃO estiver sobre um botão/link
      if (!isOverInteractive) {
        pointsRef.current.push({
          x: trailCursorRef.current.x,
          y: trailCursorRef.current.y,
          age: 0,
        });
      }

      const points = pointsRef.current;
      hueRef.current = (hueRef.current + 2) % 360;

      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        // Conecta ao próximo ponto ou à ponta do rastro atrasado (trailCursor), não ao mouse real
        const nextPoint = points[i + 1] || trailCursorRef.current;

        const maxAge = 25;
        const opacity = 1 - point.age / maxAge;
        const radius = (1 - point.age / maxAge) * 10;

        if (opacity <= 0) {
          points.splice(i, 1);
          i--;
          continue;
        }

        const currentHue = (hueRef.current - i * 2 + 360) % 360;

        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(nextPoint.x, nextPoint.y);

        ctx.strokeStyle = `hsla(${currentHue}, 100%, 50%, ${opacity})`;
        ctx.lineWidth = radius;
        ctx.lineCap = "round";
        ctx.stroke();

        point.age += 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 999999,
      }}
    />
  );
};
