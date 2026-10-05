import React, { useRef } from 'react';
import { processSteps } from '../data/process';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getLenis, gsap, MQ, prefersReducedMotion, ScrollTrigger, useGSAP } from '../lib/motion';
import { useTitleReveal } from '../hooks/useTitleReveal';

export function ProcessSection(): React.ReactElement {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  /** Trigger del pin horizontal (solo desktop sin reduced-motion) */
  const pinTrigger = useRef<ScrollTrigger | null>(null);
  const titleRef = useTitleReveal<HTMLHeadingElement>();

  // Desktop: la sección queda fija y los pasos se desplazan de costado con el scroll.
  // Mobile: lista vertical. Reduced-motion: el track horizontal nativo, sin pin.
  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = scrollContainerRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        // El track deja de scrollear por su cuenta: lo mueve el scroll de la página
        gsap.set(section, { overflow: 'clip' });
        gsap.set(track, { overflow: 'visible', scrollSnapType: 'none' });
        // Cards más anchas solo en modo pin, para que siempre haya recorrido horizontal
        // (con 320–340px, desde ~1440px los 4 pasos entran y casi no se desplazan)
        gsap.set(track.children, { width: 'max(340px, 40vw)', maxWidth: 'none' });

        const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);
        const HEADER = 64;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            // Si entra debajo del header, se fija arriba; si es más alta que el viewport, por abajo
            start: () =>
              section.offsetHeight <= window.innerHeight - HEADER ? `top top+=${HEADER}` : 'bottom bottom',
            end: () => `+=${distance()}`,
            pin: true,
            // Explícito: el padre (la Home) es flex, y ahí ScrollTrigger lo apaga por defecto
            pinSpacing: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        pinTrigger.current = tween.scrollTrigger ?? null;

        return () => {
          pinTrigger.current = null;
        };
      });
    },
    { scope: sectionRef }
  );

  const handleScroll = (direction: 'left' | 'right'): void => {
    const track = scrollContainerRef.current;
    if (!track) return;

    const st = pinTrigger.current;
    const lenis = getLenis();
    if (st && lenis) {
      // Con el pin, las flechas llevan el scroll de la página al paso anterior / siguiente
      const cards = Array.from(track.children) as HTMLElement[];
      const distance = st.end - st.start;
      const maxX = track.scrollWidth - track.clientWidth;
      if (!cards.length || distance <= 0 || maxX <= 0) return;

      const stops = cards.map((card) => Math.min(1, (card.offsetLeft - cards[0].offsetLeft) / maxX));
      const current = st.progress;
      const EPS = 0.01;
      const target =
        direction === 'right'
          ? stops.find((p) => p > current + EPS) ?? 1
          : [...stops].reverse().find((p) => p < current - EPS) ?? 0;

      const targetY = st.start + target * distance;
      // Pasado el final (o antes del inicio) del pin, una flecha nunca lleva el scroll al revés
      if (direction === 'right' ? targetY <= lenis.scroll + 1 : targetY >= lenis.scroll - 1) return;

      lenis.scrollTo(targetY, { duration: 1 });
      return;
    }

    const scrollAmount = 340;
    track.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  return (
    <section ref={sectionRef} id="proceso" className="w-full bg-[#151713] px-4 sm:px-6 md:px-8 py-16 sm:py-24 border-t border-[#5C5E57]/30">
      <div className="w-full flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C6FF3D]">
              <span className="w-1.5 h-1.5 bg-[#C6FF3D]"></span>
              <span>02 / METODOLOGÍA &amp; PROCESO</span>
            </div>
            <h2 ref={titleRef} className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#EDEDE6] font-bold">
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
