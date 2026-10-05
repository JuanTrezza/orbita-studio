import React, { useRef } from 'react';
import { processSteps } from '../data/process';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ProcessSection(): React.ReactElement {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: 'left' | 'right'): void => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 340;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="proceso" className="w-full bg-[#151713] px-4 sm:px-6 md:px-8 py-16 sm:py-24 border-t border-[#5C5E57]/30">
      <div className="w-full flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C6FF3D]">
              <span className="w-1.5 h-1.5 bg-[#C6FF3D]"></span>
              <span>02 / METODOLOGÍA &amp; PROCESO</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#EDEDE6] font-bold">
              ARQUITECTURA DE PRODUCCIÓN
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-md">
            <p className="font-mono text-xs text-[#A6A99E] uppercase leading-relaxed">
              UN PIPELINE INDUSTRIAL CONSTRUIDO PARA EL CONTROL TOTAL DE CADA FOTOGRAMA.
            </p>
            {/* Desktop Navigation Arrows for Horizontal Track */}
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                className="w-9 h-9 bg-[#191B16] border border-[#5C5E57] text-[#EDEDE6] hover:border-[#C6FF3D] hover:text-[#C6FF3D] flex items-center justify-center transition-colors"
                aria-label="Desplazar proceso a la izquierda"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                className="w-9 h-9 bg-[#191B16] border border-[#5C5E57] text-[#EDEDE6] hover:border-[#C6FF3D] hover:text-[#C6FF3D] flex items-center justify-center transition-colors"
                aria-label="Desplazar proceso a la derecha"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Process Cards */}
        {/* Mobile: Vertical List | Desktop: Horizontal Scroll Track */}
        <div
          ref={scrollContainerRef}
          tabIndex={0}
          aria-label="Pasos de la arquitectura de producción"
          className="flex flex-col md:flex-row md:overflow-x-auto gap-6 md:pb-4 md:snap-x md:snap-mandatory scrollbar-thin scrollbar-thumb-[#5C5E57] scrollbar-track-[#0E0F0C] focus:outline-none focus:ring-1 focus:ring-[#C6FF3D]"
        >
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="bg-[#191B16] border border-[#5C5E57]/40 p-6 flex flex-col justify-between gap-6 hover:border-[#C6FF3D]/70 transition-colors w-full md:min-w-[320px] md:max-w-[340px] md:shrink-0 md:snap-start group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#C6FF3D] font-display font-extrabold text-3xl leading-none">
                    {step.step}
                  </span>
                  <span className="text-[#5C5E57] group-hover:text-[#A6A99E] uppercase font-mono text-[10px] tracking-wider transition-colors">
                    {step.week}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-[#EDEDE6] uppercase tracking-tight group-hover:text-[#C6FF3D] transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-[#A6A99E] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#5C5E57]/30 bg-[#0E0F0C]/40 -mx-6 -mb-6 p-4 font-mono text-[11px] text-[#A6A99E] uppercase space-y-1">
                <div className="text-[#EDEDE6] font-semibold text-[10px] tracking-wider">ENTREGABLE:</div>
                <div className="text-[#C6FF3D]">{step.deliverable}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Pipeline Telemetry Gauge / Inline SVG Data Visualization */}
        <div className="bg-[#191B16] border border-[#5C5E57]/40 p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative w-14 h-14 shrink-0">
              <svg className="w-full h-full text-[#C6FF3D] -rotate-90" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" stroke="#434934" strokeWidth="4" fill="none" />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray="125.6"
                  strokeDashoffset="31.4"
                  strokeLinecap="square"
                  fill="none"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-bold text-[#EDEDE6]">
                75%
              </div>
            </div>
            <div>
              <div className="font-mono text-xs text-[#EDEDE6] uppercase font-bold tracking-wide">
                CAPACIDAD OPERATIVA DE RENDER // GPU CLUSTER
              </div>
              <div className="font-mono text-[11px] text-[#A6A99E]">
                32x RTX 4090 NODES EN SAN TELMO LAB — LATENCIA: 1.4MS
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#C6FF3D] uppercase tracking-wider font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#C6FF3D] animate-ping"></span>
            <span>ESTADO: RENDERING DISPONIBLE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
