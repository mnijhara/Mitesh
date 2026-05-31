import React, { useEffect, useRef } from 'react';

interface AcousticWaveProps {
  isPlaying: boolean;
  isRecording: boolean;
  color?: string;
  speed?: number;
}

export default function AcousticWave({
  isPlaying,
  isRecording,
  color = '#2563eb', // Blue-600
  speed = 1
}: AcousticWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    let phase = 0;
    const lines = isRecording ? 8 : 4;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      phase += (isPlaying ? 0.08 : isRecording ? 0.12 : 0.01) * speed;

      const numPoints = 80;
      const amplitude = isPlaying ? 25 : isRecording ? 40 : 4;

      for (let l = 0; l < lines; l++) {
        ctx.beginPath();
        ctx.lineWidth = l === 0 ? 3 : 1.5;
        
        // Stagger colors for depth
        if (isRecording) {
          ctx.strokeStyle = `rgba(239, 68, 68, ${1 - l * 0.1})` ; // Red colors for recording
        } else if (isPlaying) {
          ctx.strokeStyle = `rgba(16, 185, 129, ${1 - l * 0.2})`; // Emerald green gradients for speaking
        } else {
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.25 - l * 0.05})`; // Weak green glow when idle
        }

        for (let i = 0; i <= numPoints; i++) {
          const x = (i / numPoints) * width;
          // Apply a sine wave multiplied by a gaussian-like envelope to pin the ends to 0 amplitude
          const envelope = Math.sin((i / numPoints) * Math.PI);
          const freqMultiplier = 1.5 + l * 0.3;
          const shift = phase + (l * Math.PI) / 3;
          const y = (height / 2) + Math.sin(i * 0.15 * freqMultiplier + shift) * amplitude * envelope;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, isRecording, speed]);

  return (
    <div className="relative w-full h-24 overflow-hidden rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {isRecording && (
        <span className="absolute top-2 right-3 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
      )}
    </div>
  );
}
