import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { useLenisLock } from '../hooks/useLenisLock';

interface ReelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReelModal({ isOpen, onClose }: ReelModalProps): React.ReactElement | null {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(24);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useLenisLock(isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isOpen) onClose();
      if (e.key === ' ' && isOpen) {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsPlaying(true);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Progress timer loop
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.4));
    }, 100);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  // Procedural generative canvas animation in the reel
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = (): void => {
      time += 0.02;
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 450;

      const w = canvas.width;
      const h = canvas.height;

      // Dark obsidian background
      ctx.fillStyle = '#0E0F0C';
      ctx.fillRect(0, 0, w, h);

      // Radial glowing acid lime gradient
      const grad = ctx.createRadialGradient(
        w * 0.5 + Math.sin(time) * 120,
        h * 0.5 + Math.cos(time * 0.8) * 60,
        20,
        w * 0.5,
        h * 0.5,
        w * 0.6
      );
      grad.addColorStop(0, 'rgba(198, 255, 61, 0.28)');
      grad.addColorStop(0.4, 'rgba(27, 77, 62, 0.2)');
      grad.addColorStop(1, 'rgba(14, 15, 12, 0.95)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Kinetic Lissajous & particle lines
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(198, 255, 61, 0.65)';
      ctx.beginPath();
      for (let i = 0; i < 360; i += 2) {
        const angle = (i * Math.PI) / 180;
        const r = Math.min(w, h) * 0.3 + Math.sin(angle * 6 + time * 3) * 35;
        const x = w * 0.5 + Math.cos(angle + time * 0.5) * r;
        const y = h * 0.5 + Math.sin(angle * 2 + time * 0.7) * (r * 0.7);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Secondary fine particles
      ctx.fillStyle = '#EDEDE6';
      for (let j = 0; j < 30; j++) {
        const px = (Math.sin(j * 99 + time) * 0.5 + 0.5) * w;
        const py = (Math.cos(j * 43 + time * 1.2) * 0.5 + 0.5) * h;
        const sz = (Math.sin(j + time) * 0.5 + 0.5) * 2 + 1;
        ctx.fillRect(px, py, sz, sz);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isOpen]);

  if (!isOpen) return null;

  const currentSeconds = Math.floor((progress / 100) * 100);
  const mm = String(Math.floor(currentSeconds / 60)).padStart(2, '0');
  const ss = String(currentSeconds % 60).padStart(2, '0');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reel-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0E0F0C] border border-[#5C5E57] text-[#EDEDE6] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#151713] border-b border-[#5C5E57]/40 font-mono text-xs uppercase tracking-wider">
          <div className="flex items-center gap-2 text-[#C6FF3D]">
            <span className="w-2 h-2 bg-[#C6FF3D] animate-ping"></span>
            <span id="reel-modal-title" className="font-bold">ÓRBITA SHOWREEL 2025 // 4K 60FPS</span>
          </div>
          <div className="flex items-center gap-4 text-[#A6A99E]">
            <span className="hidden sm:inline">ACES 2065-1 // DOLBY ATMOS</span>
            <button
              onClick={onClose}
              aria-label="Cerrar reproductor"
              className="p-1 hover:text-[#C6FF3D] hover:bg-[#22251F] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video / Canvas Area */}
        <div className="relative w-full aspect-[16/9] bg-black overflow-hidden flex items-center justify-center">
          <canvas ref={canvasRef} className="w-full h-full object-cover" />

          {/* Central Title watermark */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
            <h2 className="font-display text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-white/90 drop-shadow-lg">
              ÓRBITA
            </h2>
            <div className="font-mono text-xs sm:text-sm text-[#C6FF3D] uppercase tracking-widest mt-2 bg-black/50 px-3 py-1 backdrop-blur-sm">
              MOTION REEL 2025 // BUENOS AIRES
            </div>
          </div>

          {/* Large Center Play/Pause Overlay Click */}
          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
            className="absolute inset-0 flex items-center justify-center bg-transparent group focus:outline-none"
          >
            {!isPlaying && (
              <div className="w-20 h-20 bg-[#C6FF3D] text-[#0E0F0C] flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-105">
                <Play className="w-8 h-8 ml-1 fill-current" />
              </div>
            )}
          </button>
        </div>

        {/* Bottom Video Transport Controls */}
        <div className="p-4 bg-[#151713] border-t border-[#5C5E57]/40 flex flex-col gap-3 font-mono text-xs">
          {/* Progress Scrubber */}
          <div
            className="w-full h-1.5 bg-[#22251F] cursor-pointer relative overflow-hidden"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              setProgress(Math.max(0, Math.min(100, (clickX / rect.width) * 100)));
            }}
          >
            <div className="h-full bg-[#C6FF3D]" style={{ width: `${progress}%` }}></div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying((prev) => !prev)}
                className="p-1.5 hover:text-[#C6FF3D] transition-colors"
                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>
              <button
                onClick={() => setIsMuted((prev) => !prev)}
                className="p-1.5 hover:text-[#C6FF3D] transition-colors"
                aria-label={isMuted ? 'Activar audio' : 'Silenciar'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <div className="text-[#EDEDE6] ml-2">
                <span className="text-[#C6FF3D] font-bold">{mm}:{ss}</span>
                <span className="text-[#5C5E57] mx-1">/</span>
                <span className="text-[#A6A99E]">01:40</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[#A6A99E]">
              <span className="hidden sm:inline">[ ESPACIO: PAUSA // ESC: CERRAR ]</span>
              <button
                onClick={() => {
                  const elem = canvasRef.current?.parentElement;
                  if (elem?.requestFullscreen) elem.requestFullscreen();
                }}
                className="p-1 hover:text-[#C6FF3D] transition-colors"
                aria-label="Pantalla completa"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
