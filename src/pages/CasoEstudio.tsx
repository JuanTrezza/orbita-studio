import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, ArrowRight, AlertCircle, LayoutGrid } from 'lucide-react';
import { projects } from '../data/projects';
import { usePageTitle } from '../hooks/usePageTitle';
import { useTitleReveal } from '../hooks/useTitleReveal';

interface CasoEstudioProps {
  onOpenContact: () => void;
  onOpenReel: () => void;
}

export function CasoEstudio({ onOpenContact, onOpenReel }: CasoEstudioProps): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Find project
  const projectIndex = projects.findIndex((p) => p.id === id);

  usePageTitle(projectIndex !== -1 ? 'Caso de Estudio' : 'Proyecto no encontrado');

  // El título de "no encontrado" tiene gradiente con bg-clip-text: no se parte en palabras
  const titleRef = useTitleReveal<HTMLHeadingElement>();
  const challengeTitleRef = useTitleReveal<HTMLHeadingElement>();
  const solutionTitleRef = useTitleReveal<HTMLHeadingElement>();

  // Handle invalid project ID
  if (projectIndex === -1) {
    return (
      <div className="w-full min-h-[75vh] flex flex-col justify-center px-4 sm:px-6 md:px-12 py-16 bg-[#0E0F0C] text-[#EDEDE6]">
        <div className="max-w-4xl mx-auto w-full">
          {/* Top back link */}
          <Link
            to="/trabajos"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#A6A99E] hover:text-[#C6FF3D] transition-colors tracking-widest uppercase font-semibold mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>VOLVER A TRABAJOS</span>
          </Link>

          {/* Telemetry pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#151713] border border-[#5C5E57]/40 font-mono text-xs text-[#C6FF3D] tracking-widest uppercase mb-6">
            <AlertCircle className="w-3.5 h-3.5 text-[#C6FF3D]" />
            <span>ARCHIVO NO ENCONTRADO // REF: {id || 'DESCONOCIDO'}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-[#EDEDE6] leading-none mb-6">
            PROYECTO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6FF3D] to-[#EDEDE6]">
              NO ENCONTRADO
            </span>
          </h1>

          {/* Technical Diagnostics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 my-6 bg-[#151713]/80 border border-[#5C5E57]/30 font-mono text-xs">
            <div>
              <span className="text-[10px] text-[#5C5E57] uppercase block">ID SOLICITADO</span>
              <span className="text-[#FF6B6B] font-bold">"{id}"</span>
            </div>
            <div>
              <span className="text-[10px] text-[#5C5E57] uppercase block">ESTADO</span>
              <span className="text-[#C6FF3D]">ARCHIVO_INEXISTENTE</span>
            </div>
            <div>
              <span className="text-[10px] text-[#5C5E57] uppercase block">COLECCIÓN</span>
              <span className="text-[#EDEDE6]">{projects.length} REGISTROS ACTIVOS</span>
            </div>
          </div>

          <p className="text-[#A6A99E] text-base sm:text-lg max-w-2xl font-light leading-relaxed mb-8">
            El proyecto que buscás no existe o ha sido reindexado en el archivo de ÓRBITA Studio.
            Podés revisar la lista completa de producciones 3D, animación cinética e instalaciones en tiempo real.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/trabajos"
              className="inline-flex items-center gap-3 px-6 py-4 bg-[#C6FF3D] text-[#0E0F0C] font-mono text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-[#d8ff6b] transition-colors"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>EXPLORAR TRABAJOS</span>
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-3 px-6 py-4 bg-transparent border border-[#5C5E57] text-[#EDEDE6] font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase hover:border-[#C6FF3D] hover:text-[#C6FF3D] transition-colors"
            >
              <span>IR A LA HOME</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentProject = projects[projectIndex];

  // Previous and next projects
  const prevProject =
    projectIndex > 0 ? projects[projectIndex - 1] : projects[projects.length - 1];
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : projects[0];

  return (
    <div className="w-full flex flex-col text-[#EDEDE6] bg-[#0E0F0C] pt-6 pb-16">
      {/* 1. PROJECT HEADER & TELEMETRY */}
      <section className="w-full px-4 sm:px-6 md:px-8 pt-6 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#5C5E57]/30">
          <Link
            to="/trabajos"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#A6A99E] hover:text-[#C6FF3D] transition-colors tracking-widest uppercase font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>VOLVER A TRABAJOS</span>
          </Link>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] sm:text-xs text-[#5C5E57] uppercase tracking-widest">
            <span className="text-[#C6FF3D] font-bold">CASO DE ESTUDIO // PROYECTO {currentProject.num}</span>
            <span>·</span>
            <span className="text-[#EDEDE6]">{currentProject.clientFull}</span>
            <span>·</span>
            <span>AÑO: {currentProject.year}</span>
            <span>·</span>
            <span className="text-[#A6A99E]">DURACIÓN: {currentProject.duration || '01:45 // 4K 60FPS'}</span>
          </div>
        </div>

        {/* Gigantic Title Display */}
        <div className="pt-8 pb-8">
          <div className="flex items-baseline justify-between flex-wrap gap-2 mb-2">
            <span className="font-mono text-xs text-[#C6FF3D] tracking-widest uppercase font-bold">
              [ID-SYS: 809-{currentProject.num}]
            </span>
            <span className="font-mono text-xs text-[#5C5E57] uppercase">
              {currentProject.disciplines.join(' / ')}
            </span>
          </div>
          <h1 ref={titleRef} className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[8vw] lg:leading-[0.88] text-[#EDEDE6] tracking-tighter uppercase font-black break-words">
            {currentProject.title}
          </h1>
        </div>

        {/* Descriptor banner */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#151713] border border-[#5C5E57]/40 p-6 md:p-8">
          <div className="md:col-span-8">
            <p className="text-base sm:text-lg text-[#EDEDE6] leading-relaxed max-w-4xl">
              {currentProject.fullDesc}
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col justify-between items-start md:items-end gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 bg-[#0E0F0C] border border-[#5C5E57]/40 px-3 py-1 text-[#C6FF3D] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#C6FF3D] animate-ping"></span>
              <span>ESTADO: CASO ACTIVO / PROD</span>
            </div>
            <span className="text-[#5C5E57] text-[10px]">
              HASH: 0x9F4C2...B18 · LAT: -34.6037 / LON: -58.3816
            </span>
          </div>
        </div>
      </section>

      {/* 2. HERO VIDEO & MEDIA SHOWCASE (Cinematic Player Unit) */}
      <section className="w-full px-4 sm:px-6 md:px-8 py-4">
        <div data-cursor="video" className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#151713] border border-[#5C5E57]/40 overflow-hidden group">
          {/* Background image preview */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-102"
            style={{ backgroundImage: `url('${currentProject.heroImage}')` }}
          />

          {/* Scrim overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F0C] via-[#0E0F0C]/30 to-transparent pointer-events-none"></div>

          {/* Live telemetry HUD on Player */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 bg-[#0E0F0C]/90 backdrop-blur-md px-3 py-1 font-mono text-[10px] text-[#EDEDE6] uppercase border border-[#5C5E57]/30">
              <span className="text-[#C6FF3D] font-bold">● REC LIVE</span>
              <span className="text-[#5C5E57]">|</span>
              <span>4096 × 1744 PXR</span>
              <span className="text-[#5C5E57]">|</span>
              <span>60.00 FPS COLOR-RGB32F</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-[#C6FF3D] text-[#0E0F0C] font-mono text-xs px-3 py-1 font-bold uppercase">
                MASTER REEL
              </span>
            </div>
          </div>

          {/* Central Play Trigger */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => {
                setIsPlaying((p) => !p);
                onOpenReel();
              }}
              aria-label="Reproducir video de simulación cinemática"
              className="w-18 h-18 sm:w-22 sm:h-22 bg-[#0E0F0C]/85 backdrop-blur-md hover:bg-[#C6FF3D] text-[#EDEDE6] hover:text-[#0E0F0C] border border-[#5C5E57] hover:border-[#C6FF3D] flex items-center justify-center transition-all duration-300 shadow-2xl"
            >
              <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-current" />
            </button>
          </div>

          {/* Player Lower Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-[#0E0F0C]/95 backdrop-blur-md border-t border-[#5C5E57]/30 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Audio Waveform SVG */}
            <div className="w-full md:w-1/3 flex items-center gap-3">
              <span className="font-mono text-xs text-[#C6FF3D] uppercase font-bold shrink-0">SUB: 38HZ</span>
              <svg className="w-full h-7 text-[#C6FF3D]" fill="none" preserveAspectRatio="none" viewBox="0 0 240 32">
                <path
                  d="M0 16 H15 L22 4 L30 28 L38 8 L46 24 L54 12 L62 20 L70 16 H90 L98 2 L106 30 L114 6 L122 26 L130 10 L138 22 L146 16 H170 L178 8 L186 24 L194 14 L202 18 L210 16 H240"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            {/* Scrubber / Controls */}
            <div className="w-full md:w-2/3 flex items-center justify-end gap-4 font-mono text-xs">
              <div className="flex-1 max-w-md h-1.5 bg-[#191B16] relative overflow-hidden">
                <div className="h-full bg-[#C6FF3D] w-[42%]"></div>
              </div>
              <div className="flex items-center gap-2 text-[#A6A99E]">
                <span className="text-[#EDEDE6] font-bold">00:42.18</span>
                <span className="text-[#5C5E57]">/</span>
                <span>01:45.00</span>
              </div>
              <div className="flex items-center gap-2 text-[#EDEDE6]">
                <button
                  type="button"
                  onClick={() => setIsMuted((m) => !m)}
                  className="p-1 hover:text-[#C6FF3D] transition-colors"
                  aria-label="Silenciar audio"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={onOpenReel}
                  className="p-1 hover:text-[#C6FF3D] transition-colors"
                  aria-label="Ver a pantalla completa"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROJECT OVERVIEW & METRICS GRID */}
      <section className="w-full px-4 sm:px-6 md:px-8 py-16 border-b border-[#5C5E57]/30">
        <div className="flex items-center justify-between pb-4 border-b border-[#5C5E57]/30">
          <div className="flex items-center gap-2 font-mono text-xs text-[#C6FF3D] uppercase tracking-widest">
            <span>[01 // ANÁLISIS ESTRUCTURAL]</span>
          </div>
          <div className="font-mono text-xs text-[#5C5E57] uppercase">METODOLOGÍA GENERATIVA</div>
        </div>

        {/* Brief & Solution Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-8">
          {/* Brief */}
          <div className="md:col-span-6 bg-[#151713] border border-[#5C5E57]/40 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] text-[#5C5E57] uppercase tracking-widest block mb-2">
                EL DESAFÍO // THE CHALLENGE
              </span>
              <h2 ref={challengeTitleRef} className="font-display text-2xl md:text-3xl text-[#EDEDE6] tracking-tight mb-4 uppercase font-bold">
                {currentProject.challengeTitle || 'Traducción visual de biología sintética imperceptible'}
              </h2>
              {currentProject.challengeDesc?.map((para, i) => (
                <p key={i} className="text-sm text-[#A6A99E] leading-relaxed mb-3">
                  {para}
                </p>
              ))}
            </div>
            <div className="pt-4 mt-6 border-t border-[#5C5E57]/30 bg-[#0E0F0C] p-4 font-mono text-xs">
              <div className="text-[#C6FF3D] text-[10px] uppercase font-bold">INPUT PRINCIPAL</div>
              <div className="text-[#EDEDE6] mt-0.5">
                {currentProject.challengeInput || 'ESPECTRO DE RESONANCIA ACÚSTICA (20Hz - 120Hz)'}
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="md:col-span-6 bg-[#151713] border border-[#5C5E57]/40 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] text-[#5C5E57] uppercase tracking-widest block mb-2">
                LA SOLUCIÓN TÉCNICA // ARCHITECTURE
              </span>
              <h2 ref={solutionTitleRef} className="font-display text-2xl md:text-3xl text-[#EDEDE6] tracking-tight mb-4 uppercase font-bold">
                {currentProject.solutionTitle || 'Simulación multifásica y shaders micro-celulares'}
              </h2>
              {currentProject.solutionDesc?.map((para, i) => (
                <p key={i} className="text-sm text-[#A6A99E] leading-relaxed mb-3">
                  {para}
                </p>
              ))}
            </div>
            <div className="pt-4 mt-6 border-t border-[#5C5E57]/30 bg-[#0E0F0C] p-4 font-mono text-xs">
              <div className="text-[#C6FF3D] text-[10px] uppercase font-bold">OUTPUT ESTRUCTURAL</div>
              <div className="text-[#EDEDE6] mt-0.5">
                {currentProject.solutionOutput || '14 PRESETS HOUDINI + SISTEMA REACTIVO TOUCHDESIGNER'}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Quantitative Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {(currentProject.metrics || [
            { label: 'ALCANCE GLOBAL', value: '2.4M', sub: 'VISTAS TOTALES DE CAMPAÑA', code: '#01' },
            { label: 'DESEMPEÑO REALTIME', value: '0.003s', sub: 'LATENCIA REACTIVA MIDI', code: '#02' },
            { label: 'MODULARIDAD', value: '14', sub: 'PRESETS GENERATIVOS', code: '#03' },
            { label: 'RECONOCIMIENTO', value: 'RED DOT', sub: 'BEST OF THE BEST 2025', code: '#04' },
          ]).map((metric) => (
            <div
              key={metric.code}
              className="bg-[#151713] border border-[#5C5E57]/40 p-5 flex flex-col justify-between min-h-[160px] hover:border-[#C6FF3D]/70 transition-colors"
            >
              <div className="flex items-center justify-between font-mono text-[10px] text-[#5C5E57]">
                <span>{metric.label}</span>
                <span className="text-[#C6FF3D] font-bold">{metric.code}</span>
              </div>
              <div className="my-2">
                <div className="font-display text-3xl sm:text-4xl text-[#EDEDE6] font-extrabold tracking-tight">
                  {metric.value}
                </div>
                <div className="font-mono text-[10px] text-[#A6A99E] uppercase tracking-wider mt-1">
                  {metric.sub}
                </div>
              </div>
              <div className="font-mono text-[9px] text-[#5C5E57] uppercase tracking-wider">
                VALIDADO POR LABORATORIO
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CREDITS & TECHNICAL SPECIFICATIONS */}
      <section className="w-full px-4 sm:px-6 md:px-8 py-16 border-b border-[#5C5E57]/30">
        <div className="flex items-center justify-between pb-4 border-b border-[#5C5E57]/30">
          <div className="flex items-center gap-2 font-mono text-xs text-[#C6FF3D] uppercase tracking-widest">
            <span>[02 // CRÉDITOS &amp; ESPECIFICACIONES TÉCNICAS]</span>
          </div>
          <div className="font-mono text-xs text-[#5C5E57] uppercase">PRODUCCIÓN ÓRBITA</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          {/* Credits Ledger */}
          <div className="lg:col-span-6 bg-[#151713] border border-[#5C5E57]/40 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] text-[#5C5E57] uppercase tracking-widest block mb-4">
                EQUIPO HUMANO &amp; ROLES
              </span>
              <div className="space-y-3 font-mono text-xs">
                {(currentProject.credits || [
                  { role: 'DIRECCIÓN CREATIVA', name: 'VALENTINA ROSSI' },
                  { role: 'DIRECCIÓN TÉCNICA & SHADERS', name: 'MATEO SERRANO' },
                  { role: 'SIMULACIÓN DE FLUIDOS', name: 'CAMILA VÁZQUEZ' },
                  { role: 'DISEÑO SONORO & FOLEY', name: 'IGNACIO BIANCHI & SONAR AUDIO' },
                  { role: 'PRODUCCIÓN EJECUTIVA', name: 'LUCÍA DEL VALLE' },
                ]).map((credit) => (
                  <div
                    key={credit.role}
                    className="flex flex-col sm:flex-row sm:items-center justify-between py-2 bg-[#0E0F0C] border border-[#5C5E57]/20 px-3"
                  >
                    <span className="text-[#A6A99E] uppercase text-[11px]">{credit.role}</span>
                    <span className="text-[#EDEDE6] font-bold">{credit.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 mt-6 border-t border-[#5C5E57]/20 font-mono text-[10px] text-[#5C5E57]">
              REGISTRO ÓRBITA STUDIO S.R.L. // EXP-{currentProject.num}-2025-AR
            </div>
          </div>

          {/* Software Stack Ledger */}
          <div className="lg:col-span-6 bg-[#151713] border border-[#5C5E57]/40 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] text-[#5C5E57] uppercase tracking-widest block mb-4">
                STACK DE SOFTWARE &amp; CLÚSTER
              </span>
              <div className="space-y-3 font-mono text-xs">
                {(currentProject.specs || [
                  { label: 'PIPELINE 3D PRINCIPAL', value: 'HOUDINI 20.0 (VELLUM/FLIP)' },
                  { label: 'MOTOR DE RENDER', value: 'REDSHIFT 3.5.22 GPU ACELERADO' },
                  { label: 'SISTEMA TIEMPO REAL', value: 'TOUCHDESIGNER + UNREAL ENGINE 5.4' },
                  { label: 'COMPUTACIÓN MATEMÁTICA', value: 'CUSTOM GLSL COMPUTE SHADERS' },
                  { label: 'INFRAESTRUCTURA HARDWARE', value: '32× NVIDIA RTX 4090 (CLÚSTER SAN TELMO)' },
                ]).map((spec) => (
                  <div
                    key={spec.label}
                    className="flex flex-col sm:flex-row sm:items-center justify-between py-2 bg-[#0E0F0C] border border-[#5C5E57]/20 px-3"
                  >
                    <span className="text-[#A6A99E] uppercase text-[11px]">{spec.label}</span>
                    <span className="text-[#C6FF3D] font-mono font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 mt-6 border-t border-[#5C5E57]/20 flex items-center justify-between font-mono text-[10px] text-[#5C5E57]">
              <span>TIEMPO TOTAL DE CÓMPUTO: 148 HORAS</span>
              <span className="text-[#C6FF3D] font-bold">100% ENERGÍA RENOVABLE</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VISUAL BREAKDOWN & SHADERS (Macro render, Wireframe vs SSS, Color Palette, Applications) */}
      <section className="w-full px-4 sm:px-6 md:px-8 py-16 border-b border-[#5C5E57]/30">
        <div className="flex items-center justify-between pb-4 border-b border-[#5C5E57]/30">
          <div className="flex items-center gap-2 font-mono text-xs text-[#C6FF3D] uppercase tracking-widest">
            <span>[03 // EXPEDIENTE VISUAL &amp; DESGLOSE DE SHADERS]</span>
          </div>
          <div className="font-mono text-xs text-[#5C5E57] uppercase">ASSET REPOSITORY</div>
        </div>

        {/* Macro Full-Width Image */}
        <div className="w-full my-8 bg-[#151713] border border-[#5C5E57]/40 p-2">
          <div className="relative w-full aspect-[16/8] overflow-hidden group">
            <img
              src={
                currentProject.macroImage ||
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDi2Nw-4rvDlLKs52PYGpxIXPddeu7LTi40zeD3Xil9kG3kRLKsFedeFVkM5lLCaPZz8KZSdonwaf7Rto2EbAb-8waJ5qBEeiJF-4asE4dcV_NJcRrVRt00ZqnhLAFWRX7A-S1RFZiwd7mUCC1U0qVfycM9lcvZTUBZInS-D5cw7VFXTHIsLI-GaWkTzMJCe9HQxuckw6JRmujEjrmcZNOqJ_hKDmM_4WaF9vVocRmbhjhsy9qvl1N4Iw'
              }
              alt="Micro-estructura de membrana celular"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
            />
            <div className="absolute bottom-4 left-4 bg-[#0E0F0C]/90 backdrop-blur-md px-3 py-1 font-mono text-[10px] text-[#EDEDE6] uppercase border border-[#5C5E57]/40">
              <span className="text-[#C6FF3D] font-bold">FIG 01.01</span> — MICRO-ESTRUCTURA DE MEMBRANA CELULAR // PASO DE REFRACCIÓN REDSHIFT
            </div>
          </div>
        </div>

        {/* Two-Column Split: Wireframe vs Redshift SSS Render */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          {/* Wireframe */}
          <div className="bg-[#151713] border border-[#5C5E57]/40 p-3">
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <img
                src={
                  currentProject.wireframeImage ||
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDAWx1VrYLJLD_O5aGpFGjtVKAzXIyl0povh_s7LJVsaF2NJ1ODNLK03PSRyosei3vEE9hiWq0PLlsGeSCFYawnv98jTbZ7smsfh0YeTQcr_VfYLBvuVmumYRoUjsha_GQpL9Bufq_5okpkoGWuDSbBxMg9gnVmyWQiYlE58zZH1PX2au3f3Ub0R9OPGPP443dLRPQkFmGHDGVYzVw4781uFGauQ52X-FF9V4P7sNCT6sjuBqZ_bVHiJA'
                }
                alt="Geometría Malla Dinámica Wireframe"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#0E0F0C]/90 px-2 py-0.5 font-mono text-[10px] text-[#C6FF3D] uppercase border border-[#5C5E57]/30">
                GEOMETRÍA // MALLA DINÁMICA
              </div>
              <div className="absolute bottom-3 left-3 bg-[#0E0F0C]/90 px-2 py-0.5 font-mono text-[10px] text-[#5C5E57] uppercase">
                POLY COUNT: {currentProject.polyCount || '3,450,210 TRIS'}
              </div>
            </div>
            <div className="pt-3 font-mono text-xs text-[#A6A99E]">
              {currentProject.wireframeCaption ||
                'Desglose topológico: Solver Vellum de baja deformación plástica con amortiguación viscoelástica continua.'}
            </div>
          </div>

          {/* SSS Render */}
          <div className="bg-[#151713] border border-[#5C5E57]/40 p-3">
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <img
                src={
                  currentProject.renderImage ||
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDClzhPbyb3-uMBLNRwDAGxiMrYz9HaZzT2dK2-DbctyH2AovcC5eRSGuLQ1Slkmoa-JIJ9Tfypa6mu-eRRaMfRlHtCfGKBYskiWncJWVkn4l8JqTC9CV3Ap8uxnsUi1LTB-biOiqwNghXVi1TyksI5yJeauOXNq75bevqq_uYSEbSRHpcSiR0eakig62i3PtF1hvXOABxhnj6mSScnEoB6iPwvZGReOeQvDGFVR7_TOGRtELiF3rE5vA'
                }
                alt="Render Final Redshift SSS"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#0E0F0C]/90 px-2 py-0.5 font-mono text-[10px] text-[#C6FF3D] uppercase border border-[#5C5E57]/30">
                RENDER FINAL // REDSHIFT SSS
              </div>
              <div className="absolute bottom-3 left-3 bg-[#0E0F0C]/90 px-2 py-0.5 font-mono text-[10px] text-[#5C5E57] uppercase">
                RAY DEPTH: {currentProject.rayDepth || '16 BOUNCES'}
              </div>
            </div>
            <div className="pt-3 font-mono text-xs text-[#A6A99E]">
              {currentProject.renderCaption ||
                'Resultado final: Mapeo de dispersión múltiple (Multiple SSS) con tintes bioluminiscentes variables.'}
            </div>
          </div>
        </div>

        {/* Color Palette Tri-Column */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          {(currentProject.colors || [
            {
              name: 'LÍQUIDO OBSIDIANA',
              hex: '#0E0F0C',
              rgb: '14, 15, 12',
              desc: 'Base volumétrica densa que ancla el contraste del microscopio electrónico y absorbe la luz incidente.',
              dominantRole: 'COLOR DOMINANTE A',
            },
            {
              name: 'ESMERALDA SINTÉTICA',
              hex: '#1B4D3E',
              rgb: '27, 77, 62',
              desc: 'Gradiente de transición que emula la autofluorescencia de proteínas sintéticas bajo radiación ultravioleta.',
              dominantRole: 'COLOR DOMINANTE B',
            },
            {
              name: 'ACID GLOW (VOLT)',
              hex: '#C6FF3D',
              rgb: '198, 255, 61',
              desc: 'Pico de energía luminosa liberado durante el acoplamiento celular y picos de audio de frecuencias bajas.',
              dominantRole: 'COLOR ACCENTO C',
              isAccent: true,
            },
          ]).map((c) => (
            <div
              key={c.name}
              className="bg-[#151713] border border-[#5C5E57]/40 p-5 flex flex-col justify-between"
            >
              <div
                className="w-full h-28 flex items-end p-3 mb-4 border border-[#5C5E57]/30"
                style={{ backgroundColor: c.hex }}
              >
                <span
                  className={`font-mono text-[10px] uppercase font-bold ${
                    c.isAccent ? 'text-[#0E0F0C]' : 'text-white/80'
                  }`}
                >
                  {c.dominantRole}
                </span>
              </div>
              <div>
                <div className="font-display text-lg text-[#EDEDE6] uppercase font-bold">{c.name}</div>
                <div className="font-mono text-xs text-[#C6FF3D] mt-0.5">
                  HEX: {c.hex} // RGB ({c.rgb})
                </div>
                <p className="text-xs text-[#A6A99E] mt-2 leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Applications in Context (Packaging, Billboard, Mobile UI) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          {(currentProject.applications || [
            {
              title: 'PACKAGING BIOMÉDICO',
              tag: 'APLICACIÓN 01 // PACKAGING BIOMÉDICO',
              image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAachNmo_s0nyBf7y4JHJhs_s8qbWoCZ08WG1IyQ6HQRl_A_wSwllU9BOq_MXSyAoeAaPHwFkm5_KTenEf7pMzz3h7zNM2Z4Q8iSIarWuNHR-1A_E6LkW48cPonsgRnhktUXNZIwElA-XaUl7cjpooNLeu_CCTkw6XICHia9WS--5nQnyI3JRPIlt9zUdHNSHJazCiovMZIZs-KoylroWn8kDed38y_McWXd5anwEm4mFsbVFjInCAIgg',
              alt: 'Packaging vial and box on dark stone surface',
            },
            {
              title: 'OOH ANAMÓRFICO 3D',
              tag: 'APLICACIÓN 02 // OOH ANAMÓRFICO 3D',
              image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ6ttKp7bFqmOSdvCseYLOMUD1zU1Tcdza-iAUqpE80v0q5o_bbcINLd7F7TzvEjJzG0SXBAxwl7zvC2lMo4nji6K0FhTGAbsOaXrjcKjyHXRKoUeZ-708XXFdDjJb4R5lLumh4_YHuyUb4uv3CG2h_gI6SwNKJ2QaIdoYKVjkirXZKN0ew6-YV9dIXrFtkDXPe6CO53FVtWQyS-O_a4xEmpEVDFNPpBXqZN88Wq0krzqJugKO70xAXQ',
              alt: 'Gigantic curved anamorphic digital 3D billboard in Shibuya',
            },
            {
              title: 'INTERFAZ DE CONTROL TOUCH',
              tag: 'APLICACIÓN 03 // INTERFAZ DE CONTROL TOUCH',
              image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAdXfMt97PshYTKEwN8Jl-VkD-RhsD0dI2CQC-6yKj8t9G1xabag7mZF3Fb2u6xJhVuHgi8NwGCRPS8xAhKFMhZwc2v7xnnD3Iamk1JNDYIGmYEqbDPNbx2eKky8vjwCboClv-9sqJyIEJs6K9krk5lt6IrdhIQmEH1Q265LEJbWlhkOCNzXT8Goqwc53-HeLPn0mD_6T1YhQ7tytYN1aZOQbtt3AK9pJ_34Rz0Twh7djY28-3qqRAmlQ',
              alt: 'Mobile UI screen mockup for biotech monitoring lab',
            },
          ]).map((app) => (
            <div key={app.tag} className="bg-[#151713] border border-[#5C5E57]/40 p-2">
              <div className="relative w-full aspect-[3/4] overflow-hidden group">
                <img
                  src={app.image}
                  alt={app.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 bg-[#0E0F0C]/90 px-2.5 py-1 font-mono text-[9px] text-[#EDEDE6] uppercase border border-[#5C5E57]/30">
                  {app.tag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. NEXT / PREVIOUS DUAL NAVIGATOR */}
      <section className="w-full px-4 sm:px-6 md:px-8 pt-12 pb-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#5C5E57]/30 mb-8">
          <div className="font-mono text-xs text-[#5C5E57] uppercase tracking-widest">
            CONTINUAR NAVEGACIÓN
          </div>
          <div className="font-mono text-xs text-[#C6FF3D] uppercase">
            ÍNDICE DE CASOS [{currentProject.num} / 12]
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Previous Project */}
          <Link
            to={`/caso/${prevProject.id}`}
            className="group block bg-[#151713] border border-[#5C5E57]/40 p-6 hover:border-[#C6FF3D]/70 transition-colors"
          >
            <div className="flex items-center justify-between font-mono text-xs text-[#5C5E57] mb-4">
              <span className="group-hover:text-[#C6FF3D] transition-colors uppercase font-bold flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>CASO ANTERIOR</span>
              </span>
              <span>PROYECTO {prevProject.num}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-[#191B16] shrink-0 overflow-hidden relative border border-[#5C5E57]/30">
                <img
                  src={prevProject.heroImage}
                  alt={prevProject.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div>
                <h3 className="font-display text-xl text-[#EDEDE6] group-hover:text-[#C6FF3D] transition-colors font-bold uppercase tracking-tight">
                  {prevProject.title}
                </h3>
                <p className="text-xs text-[#A6A99E] line-clamp-1 mt-1">
                  {prevProject.shortDesc}
                </p>
              </div>
            </div>
          </Link>

          {/* Next Project */}
          <Link
            to={`/caso/${nextProject.id}`}
            className="group block bg-[#151713] border border-[#5C5E57]/40 p-6 hover:border-[#C6FF3D]/70 transition-colors"
          >
            <div className="flex items-center justify-between font-mono text-xs text-[#5C5E57] mb-4">
              <span>PROYECTO {nextProject.num}</span>
              <span className="group-hover:text-[#C6FF3D] transition-colors uppercase font-bold flex items-center gap-1">
                <span>SIGUIENTE CASO</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="text-left">
                <h3 className="font-display text-xl text-[#EDEDE6] group-hover:text-[#C6FF3D] transition-colors font-bold uppercase tracking-tight">
                  {nextProject.title}
                </h3>
                <p className="text-xs text-[#A6A99E] line-clamp-1 mt-1">
                  {nextProject.shortDesc}
                </p>
              </div>
              <div className="w-20 h-20 bg-[#191B16] shrink-0 overflow-hidden relative border border-[#5C5E57]/30">
                <img
                  src={nextProject.heroImage}
                  alt={nextProject.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Direct Project Inquiry Banner */}
        <div className="mt-8 p-6 md:p-8 bg-[#151713] border border-[#5C5E57]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-[10px] text-[#C6FF3D] uppercase tracking-widest mb-1 font-bold">
              ¿DESEA DESARROLLAR UN SISTEMA SIMILAR?
            </div>
            <h4 className="font-display text-2xl text-[#EDEDE6] uppercase font-bold tracking-tight">
              Iniciar diálogo técnico de I+D
            </h4>
          </div>
          <button
            type="button"
            onClick={onOpenContact}
            className="px-8 py-3.5 bg-[#C6FF3D] text-[#0E0F0C] font-mono text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors"
          >
            SOLICITAR DOSSIER COMPLETO →
          </button>
        </div>
      </section>
    </div>
  );
}
