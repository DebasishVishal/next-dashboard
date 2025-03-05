"use client";

import { useEffect, useRef } from "react";

interface MiniGraphProps {
  data: number[];
}

export function MiniGraph({ data }: MiniGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set line style
    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 2;

    // Calculate points
    const points = data.map((value, index) => ({
      x: (index / (data.length - 1)) * canvas.width,
      y: canvas.height - (value / Math.max(...data)) * canvas.height,
    }));

    // Draw line
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      width={96}
      height={48}
      className="w-full h-full bg-red-200"
    />
  );
}
