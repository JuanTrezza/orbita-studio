import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Video } from 'lucide-react';
import { projects } from '../data/projects';
import { teamMembers } from '../data/team';
import { ProcessSection } from '../components/ProcessSection';
import { ClientsMarquee } from '../components/ClientsMarquee';
import { usePageTitle } from '../hooks/usePageTitle';
import { useTitleReveal } from '../hooks/useTitleReveal';
import { useStaggerReveal } from '../hooks/useStaggerReveal';

interface HomeProps {
  onOpenReel: () => void;
  onOpenContact: () => void;
}

export function Home({ onOpenReel, onOpenContact }: HomeProps): React.ReactElement {
  usePageTitle('Inicio');
  
  const heroTitleRef = useTitleReveal<HTMLHeadingElement>();
  const manifestoTitleRef = useTitleReveal<HTMLHeadingElement>();
  const recentTitleRef = useTitleReveal<HTMLHeadingElement>();
  const teamTitleRef = useTitleReveal<HTMLHeadingElement>();
  const ctaTitleRef = useTitleReveal<HTMLHeadingElement>();
  const recentGridRef = useStaggerReveal<HTMLDivElement>();

  // First 6 featured projects
  const recentProjects = projects.slice(0, 6);
  // First 4 team members
  const featuredTeam = teamMembers.slice(0, 4);

  return (
    <div className="w-full flex flex-col text-[#EDEDE6]">
      {/* ==================== 1. HERO SECTION (FULL SHOWREEL HERO) ==================== */}
      <section className="relative w-full min-h-[90vh] md:min-h-[940px] flex flex-col justify-between p-4 sm:p-6 md:p-8 overflow-hidden bg-[#0E0F0C]">
        {/* Generative ambient background canvas & grid pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <svg className="w-full h-full object-cover" preserveAspectRatio="none" viewBox="0 0 1440 900">
            <defs>
              <radialGradient id="limeGlowHero" cx="65%" cy="35%" r="55%">
                <stop offset="0%" stopColor="#C6FF3D" stopOpacity="0.18" />
                <stop offset="60%" stopColor="#151713" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#0E0F0C" stopOpacity="0" />
              </radialGradient>
              <pattern id="gridMicroHero" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#434934" strokeWidth="0.75" strokeOpacity="0.35" />
                <circle cx="48" cy="48" r="1" fill="#C6FF3D" fillOpacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#limeGlowHero)" />
            <rect width="100%" height="100%" fill="url(#gridMicroHero)" />
          </svg>
        </div>

        {/* Telemetry Bar */}
        <div className="relative z-10 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 font-mono text-xs text-[#A6A99E] tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-[#C6FF3D] animate-pulse"></span>
            <span className="text-[#EDEDE6]">[ SHOWREEL 2025 // 01:40 // 4K 60FPS ]</span>
          </div>
          <div className="flex items-center gap-4 text-[#A6A99E]">
            <span>BUENOS AIRES</span>
            <span className="text-[#5C5E57]">/</span>
            <span className="text-[#C6FF3D]">34.6037° S, 58.3816° W</span>
            <span className="text-[#5C5E57]">/</span>
            <span className="hidden md:inline text-[#5C5E57]">SYS.OK · 120 FPS LOCK</span>
          </div>
        </div>

        {/* Center Display Typographic Content */}
        <div className="relative z-10 my-auto py-12 md:py-20 flex flex-col justify-center">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#C6FF3D] mb-4">
            <span className="w-1.5 h-1.5 bg-[#C6FF3D]"></span>
            <span>LABORATORIO DE MOVIMIENTO GENERATIVO</span>
          </div>

          <h1 ref={heroTitleRef} className="font-display text-6xl sm:text-8xl md:text-[120px] lg:text-[140px] font-black uppercase tracking-tighter text-[#EDEDE6] select-none leading-none">
            ÓRBITA
          </h1>

          <div className="mt-4 sm:mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <p className="font-display text-lg sm:text-2xl md:text-3xl text-[#A6A99E] max-w-2xl uppercase tracking-tight font-semibold">
              ESTUDIO DE ANIMACIÓN &amp; TECNOLOGÍA CREATIVA
            </p>
            <span className="font-mono text-xs text-[#5C5E57] uppercase tracking-wider">
              EST. 2019 // MOTION LAB // HIGH PRECISION RENDER
            </span>
          </div>
        </div>

        {/* Bottom Showcase Bar & Rotating Ring Button */}
        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-[#5C5E57]/20">
          {/* Media ticker metadata */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 font-mono text-xs text-[#A6A99E] uppercase">
            <div className="space-y-1">
              <span className="block text-[#5C5E57] text-[10px]">DISCIPLINA CENTRAL</span>
              <span className="text-[#EDEDE6] font-semibold">3D CGI · SHADERS · CINEMÁTICA</span>
            </div>
            <div className="space-y-1">
              <span className="block text-[#5C5E57] text-[10px]">TECNOLOGÍAS ACTIVAS</span>
              <span className="text-[#EDEDE6] font-semibold">HOUDINI // REDSHIFT // UNREAL ENGINE 5</span>
            </div>
            <div className="space-y-1">
              <span className="block text-[#5C5E57] text-[10px]">ESTADO DE DISPONIBILIDAD</span>
              <span className="text-[#C6FF3D] font-bold">● Q2/Q3 COMISIONES ABIERTAS</span>
            </div>
          </div>

          {/* Rotating Ring Button (opens Showreel Modal) */}
          <button
            type="button"
            onClick={onOpenReel}
            className="self-start md:self-end group relative cursor-pointer focus:outline-none"
            aria-label="Abrir Showreel 2025"
          >
            <div className="w-32 h-32 sm:w-36 sm:h-36 relative flex items-center justify-center">
              {/* Outer rotating SVG track */}
              <svg className="absolute inset-0 w-full h-full animate-[spin_18s_linear_infinite] group-hover:animate-[spin_6s_linear_infinite] transition-all" viewBox="0 0 160 160">
                <path
                  id="circlePathHero"
                  d="M 80, 80 m -64, 0 a 64,64 0 1,1 128,0 a 64,64 0 1,1 -128,0"
                  fill="none"
                  stroke="none"
                />
                <text className="fill-[#C6FF3D] uppercase font-mono text-[9.5px] tracking-widest">
                  <textPath href="#circlePathHero" startOffset="0%">
                    REEL 2025 · EXPLORAR MOVIMIENTO · REEL 2025 · EXPLORAR MOVIMIENTO ·
                  </textPath>
                </text>
              </svg>

              {/* Center Core Button */}
              <div className="w-18 h-18 sm:w-20 sm:h-20 bg-[#C6FF3D] text-[#0E0F0C] flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-95 group-active:scale-90 shadow-xl">
                <Play className="w-6 h-6 fill-current leading-none" />
                <span className="font-mono text-[9px] uppercase font-extrabold tracking-widest mt-0.5">
                  VER REEL
                </span>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* ==================== 2. MANIFESTO / STATEMENT SECTION ==================== */}
      <section className="w-full bg-[#151713] px-4 sm:px-6 md:px-8 py-16 sm:py-24 border-t border-[#5C5E57]/30">
        <div className="w-full flex flex-col gap-12 sm:gap-16">
          {/* Section Index Header */}
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest">
            <div className="flex items-center gap-2 text-[#C6FF3D]">
              <span className="w-1.5 h-1.5 bg-[#C6FF3D]"></span>
              <span>00 / MANIFIESTO</span>
            </div>
            <div className="text-[#A6A99E] font-mono text-[10px]">PHILOSOPHY // VECTOR TENSION</div>
          </div>

          {/* Main Typographic Blast */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <h2 ref={manifestoTitleRef} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter text-[#EDEDE6] font-extrabold leading-none">
                Diseñamos movimiento para marcas que quieren ser recordadas.
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              <p className="text-base sm:text-lg text-[#A6A99E] leading-relaxed">
                Transformamos conceptos complejos en coreografías visuales que atrapan la atención y perduran en la memoria. Combinamos dirección de arte experimental con simulación 3D, física procedural y narrativa visual implacable.
              </p>
              <div className="font-mono text-xs text-[#A6A99E] uppercase space-y-1 border-l-2 border-[#C6FF3D] pl-3">
                <div>FILOSOFÍA TÉCNICA: SUIZA + PROCEDURAL</div>
                <div className="text-[#C6FF3D] font-bold">CERO PLANTILLAS. CERO INTERPOLACIÓN LINEAL.</div>
              </div>
            </div>
          </div>

          {/* 4 High Impact Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            <div className="bg-[#191B16] border border-[#5C5E57]/40 p-6 flex flex-col justify-between min-h-[160px] group hover:border-[#C6FF3D]/70 transition-colors">
              <span className="font-mono text-[10px] uppercase text-[#A6A99E]">MÉTRICA // 01</span>
              <div className="space-y-1 my-3">
                <span className="font-display text-4xl sm:text-5xl text-[#C6FF3D] font-extrabold tracking-tighter">140+</span>
                <span className="block font-display text-lg text-[#EDEDE6] font-semibold">Obras Realizadas</span>
              </div>
              <span className="font-mono text-[10px] text-[#5C5E57] uppercase tracking-wider">Publicidad · Moda · Sonido</span>
            </div>

            <div className="bg-[#191B16] border border-[#5C5E57]/40 p-6 flex flex-col justify-between min-h-[160px] group hover:border-[#C6FF3D]/70 transition-colors">
              <span className="font-mono text-[10px] uppercase text-[#A6A99E]">MÉTRICA // 02</span>
              <div className="space-y-1 my-3">
                <span className="font-display text-4xl sm:text-5xl text-[#EDEDE6] font-extrabold tracking-tighter">24</span>
                <span className="block font-display text-lg text-[#EDEDE6] font-semibold">Reconocimientos</span>
              </div>
              <span className="font-mono text-[10px] text-[#5C5E57] uppercase tracking-wider">Latin American Design · FWA · D&amp;AD</span>
            </div>

            <div className="bg-[#191B16] border border-[#5C5E57]/40 p-6 flex flex-col justify-between min-h-[160px] group hover:border-[#C6FF3D]/70 transition-colors">
              <span className="font-mono text-[10px] uppercase text-[#A6A99E]">MÉTRICA // 03</span>
              <div className="space-y-1 my-3">
                <span className="font-display text-4xl sm:text-5xl text-[#C6FF3D] font-extrabold tracking-tighter">14</span>
                <span className="block font-display text-lg text-[#EDEDE6] font-semibold">Países</span>
              </div>
              <span className="font-mono text-[10px] text-[#5C5E57] uppercase tracking-wider">Producciones Internacionales</span>
            </div>

            <div className="bg-[#191B16] border border-[#5C5E57]/40 p-6 flex flex-col justify-between min-h-[160px] group hover:border-[#C6FF3D]/70 transition-colors">
              <span className="font-mono text-[10px] uppercase text-[#A6A99E]">MÉTRICA // 04</span>
              <div className="space-y-1 my-3">
                <span className="font-display text-4xl sm:text-5xl text-[#EDEDE6] font-extrabold tracking-tighter">100%</span>
                <span className="block font-display text-lg text-[#EDEDE6] font-semibold">Animación Pura</span>
              </div>
              <span className="font-mono text-[10px] text-[#5C5E57] uppercase tracking-wider">Artesanía Cuadro x Cuadro</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 3. SELECTED WORKS SECTION ==================== */}
      <section className="w-full bg-[#0E0F0C] px-4 sm:px-6 md:px-8 py-16 sm:py-24 border-t border-[#5C5E57]/30">
        <div className="w-full flex flex-col gap-8 sm:gap-12">
          {/* Section Header with Archive Link */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#5C5E57]/30">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C6FF3D]">
                <span className="w-1.5 h-1.5 bg-[#C6FF3D]"></span>
                <span>01 / PROYECTOS SELECCIONADOS</span>
              </div>
              <h2 ref={recentTitleRef} className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#EDEDE6] font-bold">
                TRABAJOS RECIENTES
              </h2>
            </div>
            <Link
              to="/trabajos"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#EDEDE6] hover:text-[#C6FF3D] transition-colors group"
            >
              <span>ARCHIVO COMPLETO [12]</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Asymmetric Grid of 6 Cards Matching Design */}
          <div ref={recentGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* CARD 1: Span 2 Columns */}
            <article className="md:col-span-2 bg-[#151713] border border-[#5C5E57]/40 flex flex-col group overflow-hidden hover:border-[#C6FF3D]/70 transition-colors">
              <Link to={`/caso/${recentProjects[0].id}`} className="block relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#191B16] overflow-hidden">
                <img
                  src={recentProjects[0].heroImage}
                  alt={recentProjects[0].title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F0C] via-transparent to-black/20 pointer-events-none"></div>
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#0E0F0C]/80 backdrop-blur-sm px-3 py-1 font-mono text-[10px] text-[#C6FF3D] uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-[#C6FF3D]"></span>
                  <span>DESTACADO Q1 2025</span>
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-[#0E0F0C]/90 px-3 py-1 font-mono text-xs text-[#A6A99E] uppercase">
                  <Video className="w-3.5 h-3.5 text-[#C6FF3D]" />
                  <span>00:45 // 4K RENDER</span>
                </div>
              </Link>
              <div className="p-6 md:p-8 flex flex-col justify-between flex-1 gap-4">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] text-[#A6A99E] uppercase tracking-widest block">
                      PROYECTO 01 / CLIENTE: {recentProjects[0].client}
                    </span>
                    <Link to={`/caso/${recentProjects[0].id}`}>
                      <h3 className="font-display text-2xl sm:text-3xl text-[#EDEDE6] uppercase tracking-tight group-hover:text-[#C6FF3D] transition-colors mt-1 font-bold">
                        {recentProjects[0].title}
                      </h3>
                    </Link>
                  </div>
                  <span className="font-mono text-xs text-[#5C5E57] uppercase">[{recentProjects[0].year}]</span>
                </div>
                <p className="text-sm text-[#A6A99E] max-w-xl leading-relaxed">
                  {recentProjects[0].shortDesc}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-2 font-mono text-[10px]">
                  {recentProjects[0].disciplines.map((d) => (
                    <span key={d} className="px-2.5 py-1 bg-[#191B16] text-[#EDEDE6] uppercase border border-[#5C5E57]/40">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* CARD 2 */}
            <article className="bg-[#151713] border border-[#5C5E57]/40 flex flex-col group overflow-hidden hover:border-[#C6FF3D]/70 transition-colors">
              <Link to={`/caso/${recentProjects[1].id}`} className="block relative w-full aspect-[4/3] bg-[#191B16] overflow-hidden">
                <img
                  src={recentProjects[1].heroImage}
                  alt={recentProjects[1].title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F0C] via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute top-4 right-4 bg-[#0E0F0C]/80 px-2.5 py-1 font-mono text-[10px] text-[#EDEDE6] uppercase tracking-widest">
                  2D CEL &amp; TYPO
                </div>
              </Link>
              <div className="p-6 flex flex-col justify-between flex-1 gap-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] text-[#A6A99E] uppercase tracking-widest">
                    02 / {recentProjects[1].client}
                  </span>
                  <span className="font-mono text-xs text-[#5C5E57]">[{recentProjects[1].year}]</span>
                </div>
                <Link to={`/caso/${recentProjects[1].id}`}>
                  <h3 className="font-display text-xl text-[#EDEDE6] uppercase tracking-tight group-hover:text-[#C6FF3D] transition-colors font-bold">
                    {recentProjects[1].title}
                  </h3>
                </Link>
                <p className="text-xs text-[#A6A99E] leading-relaxed">
                  {recentProjects[1].shortDesc}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 pt-2 font-mono text-[9px]">
                  {recentProjects[1].disciplines.slice(0, 2).map((d) => (
                    <span key={d} className="px-2 py-0.5 bg-[#191B16] text-[#EDEDE6] uppercase border border-[#5C5E57]/40">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* CARD 3 */}
            <article className="bg-[#151713] border border-[#5C5E57]/40 flex flex-col group overflow-hidden hover:border-[#C6FF3D]/70 transition-colors">
              <Link to={`/caso/${recentProjects[2].id}`} className="block relative w-full aspect-[4/3] bg-[#191B16] overflow-hidden">
                <img
                  src={recentProjects[2].heroImage}
                  alt={recentProjects[2].title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F0C] via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute top-4 right-4 bg-[#0E0F0C]/80 px-2.5 py-1 font-mono text-[10px] text-[#EDEDE6] uppercase tracking-widest">
                  LUXURY CGI
                </div>
              </Link>
              <div className="p-6 flex flex-col justify-between flex-1 gap-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] text-[#A6A99E] uppercase tracking-widest">
                    03 / {recentProjects[2].client}
                  </span>
                  <span className="font-mono text-xs text-[#5C5E57]">[{recentProjects[2].year}]</span>
                </div>
                <Link to={`/caso/${recentProjects[2].id}`}>
                  <h3 className="font-display text-xl text-[#EDEDE6] uppercase tracking-tight group-hover:text-[#C6FF3D] transition-colors font-bold">
                    {recentProjects[2].title}
                  </h3>
                </Link>
                <p className="text-xs text-[#A6A99E] leading-relaxed">
                  {recentProjects[2].shortDesc}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 pt-2 font-mono text-[9px]">
                  {recentProjects[2].disciplines.slice(0, 2).map((d) => (
                    <span key={d} className="px-2 py-0.5 bg-[#191B16] text-[#EDEDE6] uppercase border border-[#5C5E57]/40">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* CARD 4 */}
            <article className="bg-[#151713] border border-[#5C5E57]/40 flex flex-col group overflow-hidden hover:border-[#C6FF3D]/70 transition-colors">
              <Link to={`/caso/${recentProjects[3].id}`} className="block relative w-full aspect-[4/3] bg-[#191B16] overflow-hidden">
                <img
                  src={recentProjects[3].heroImage}
                  alt={recentProjects[3].title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F0C] via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute top-4 right-4 bg-[#0E0F0C]/80 px-2.5 py-1 font-mono text-[10px] text-[#EDEDE6] uppercase tracking-widest">
                  VIRTUAL FASHION
                </div>
              </Link>
              <div className="p-6 flex flex-col justify-between flex-1 gap-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] text-[#A6A99E] uppercase tracking-widest">
                    04 / {recentProjects[3].client}
                  </span>
                  <span className="font-mono text-xs text-[#5C5E57]">[{recentProjects[3].year}]</span>
                </div>
                <Link to={`/caso/${recentProjects[3].id}`}>
                  <h3 className="font-display text-xl text-[#EDEDE6] uppercase tracking-tight group-hover:text-[#C6FF3D] transition-colors font-bold">
                    {recentProjects[3].title}
                  </h3>
                </Link>
                <p className="text-xs text-[#A6A99E] leading-relaxed">
                  {recentProjects[3].shortDesc}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 pt-2 font-mono text-[9px]">
                  {recentProjects[3].disciplines.slice(0, 2).map((d) => (
                    <span key={d} className="px-2 py-0.5 bg-[#191B16] text-[#EDEDE6] uppercase border border-[#5C5E57]/40">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* CARD 5 */}
            <article className="bg-[#151713] border border-[#5C5E57]/40 flex flex-col group overflow-hidden hover:border-[#C6FF3D]/70 transition-colors">
              <Link to={`/caso/${recentProjects[4].id}`} className="block relative w-full aspect-[4/3] bg-[#191B16] overflow-hidden">
                <img
                  src={recentProjects[4].heroImage}
                  alt={recentProjects[4].title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F0C] via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute top-4 right-4 bg-[#0E0F0C]/80 px-2.5 py-1 font-mono text-[10px] text-[#EDEDE6] uppercase tracking-widest">
                  STAGE VISUALS
                </div>
              </Link>
              <div className="p-6 flex flex-col justify-between flex-1 gap-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] text-[#A6A99E] uppercase tracking-widest">
                    05 / {recentProjects[4].client}
                  </span>
                  <span className="font-mono text-xs text-[#5C5E57]">[{recentProjects[4].year}]</span>
                </div>
                <Link to={`/caso/${recentProjects[4].id}`}>
                  <h3 className="font-display text-xl text-[#EDEDE6] uppercase tracking-tight group-hover:text-[#C6FF3D] transition-colors font-bold">
                    {recentProjects[4].title}
                  </h3>
                </Link>
                <p className="text-xs text-[#A6A99E] leading-relaxed">
                  {recentProjects[4].shortDesc}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 pt-2 font-mono text-[9px]">
                  {recentProjects[4].disciplines.slice(0, 2).map((d) => (
                    <span key={d} className="px-2 py-0.5 bg-[#191B16] text-[#EDEDE6] uppercase border border-[#5C5E57]/40">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* CARD 6: Full Width Span in 3-col layout */}
            <article className="md:col-span-2 lg:col-span-3 bg-[#151713] border border-[#5C5E57]/40 flex flex-col lg:flex-row group overflow-hidden hover:border-[#C6FF3D]/70 transition-colors">
              <Link to={`/caso/${recentProjects[5].id}`} className="block relative w-full lg:w-3/5 aspect-[16/9] lg:aspect-auto min-h-[300px] bg-[#191B16] overflow-hidden">
                <img
                  src={recentProjects[5].heroImage}
                  alt={recentProjects[5].title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#151713] via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute top-4 left-4 bg-[#0E0F0C]/90 px-3 py-1 font-mono text-[10px] text-[#C6FF3D] uppercase tracking-widest">
                  LARGOMETRAJE // VFX TITLES
                </div>
              </Link>
              <div className="w-full lg:w-2/5 p-6 md:p-8 flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-xs text-[#A6A99E] uppercase">
                    <span>06 / {recentProjects[5].client}</span>
                    <span className="text-[#5C5E57]">[{recentProjects[5].year}]</span>
                  </div>
                  <Link to={`/caso/${recentProjects[5].id}`}>
                    <h3 className="font-display text-2xl sm:text-3xl text-[#EDEDE6] uppercase tracking-tight group-hover:text-[#C6FF3D] transition-colors font-bold">
                      {recentProjects[5].title}
                    </h3>
                  </Link>
                  <p className="text-sm text-[#A6A99E] leading-relaxed">
                    {recentProjects[5].shortDesc}
                  </p>
                </div>
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
                    {recentProjects[5].disciplines.map((d) => (
                      <span key={d} className="px-2.5 py-1 bg-[#191B16] text-[#EDEDE6] uppercase border border-[#5C5E57]/40">
                        {d}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/caso/${recentProjects[5].id}`}
                    className="font-mono text-xs text-[#C6FF3D] flex items-center gap-2 font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                  >
                    <span>EXPLORAR CASE STUDY</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ==================== 4. PROCESS SECTION ==================== */}
      <ProcessSection />

      {/* ==================== 5. CLIENTS MARQUEE ==================== */}
      <ClientsMarquee />

      {/* ==================== 6. TEAM PREVIEW SECTION ==================== */}
      <section className="w-full bg-[#151713] px-4 sm:px-6 md:px-8 py-16 sm:py-24 border-t border-[#5C5E57]/30">
        <div className="w-full flex flex-col gap-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#5C5E57]/30">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C6FF3D]">
                <span className="w-1.5 h-1.5 bg-[#C6FF3D]"></span>
                <span>04 / EQUIPO PRINCIPAL</span>
              </div>
              <h2 ref={teamTitleRef} className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#EDEDE6] font-bold">
                DIRECCIÓN &amp; INGENIERÍA
              </h2>
            </div>
            <Link
              to="/estudio"
              className="font-mono text-xs text-[#A6A99E] hover:text-[#C6FF3D] transition-colors uppercase tracking-wider"
            >
              VER TODOS LOS PERFILES [6] →
            </Link>
          </div>

          {/* 4 Portrait Profile Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTeam.map((member) => (
              <article
                key={member.id}
                className="bg-[#191B16] border border-[#5C5E57]/40 flex flex-col group overflow-hidden hover:border-[#C6FF3D]/70 transition-colors"
              >
                <div className="relative w-full aspect-[4/5] bg-[#22251F] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.alt}
                    loading="lazy"
                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#191B16] via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute top-3 left-3 bg-[#0E0F0C]/90 px-2 py-0.5 font-mono text-[9px] text-[#C6FF3D] uppercase tracking-wider">
                    {member.tag.split('//')[0].trim()}
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1 gap-3">
                  <div>
                    <span className="font-mono text-[10px] text-[#C6FF3D] uppercase tracking-widest block font-semibold">
                      {member.role}
                    </span>
                    <h3 className="font-display text-xl text-[#EDEDE6] uppercase tracking-tight mt-1 font-bold">
                      {member.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#A6A99E] leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="font-mono text-[10px] text-[#5C5E57] uppercase pt-2 border-t border-[#5C5E57]/20">
                    {member.origin}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 7. BIG LIME CTA BLOCK ==================== */}
      <section className="w-full bg-[#C6FF3D] text-[#0E0F0C] py-16 sm:py-24 px-4 sm:px-6 md:px-8 select-none">
        <div className="w-full flex flex-col justify-between gap-10">
          {/* Top Meta Track */}
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#141F00]">
            <div className="flex items-center gap-2 font-bold">
              <span className="w-2 h-2 bg-[#0E0F0C]"></span>
              <span>ESTUDIO ÓRBITA // NUEVOS PROYECTOS</span>
            </div>
            <div className="hidden sm:inline font-mono text-[10px] font-bold">
              BUENOS AIRES // CONEXIÓN GLOBAL
            </div>
          </div>

          {/* Center Huge Headline */}
          <div className="space-y-4 max-w-5xl">
            <h2 ref={ctaTitleRef} className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-[#0E0F0C]">
              ¿HACEMOS ALGO QUE SE MUEVA?
            </h2>
            <p className="text-base sm:text-xl md:text-2xl text-[#141F00] font-medium max-w-3xl leading-relaxed">
              Estamos coordinando proyectos para el segundo semestre. Desarrollemos juntos piezas que transformen la presencia de tu marca a través del movimiento de alta precisión.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0E0F0C] text-[#EDEDE6] hover:bg-white hover:text-[#0E0F0C] font-mono text-xs font-bold uppercase tracking-widest transition-all"
            >
              <span>INICIAR PROYECTO</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center justify-center px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-[#0E0F0C] underline underline-offset-4 hover:opacity-75 transition-opacity"
            >
              ESCRIBINOS DIRECTO: CONTACTO@ORBITASTUDIO.AR
            </button>
          </div>

          {/* Monospace Telemetry Footer Bar */}
          <div className="pt-8 border-t border-[#0E0F0C]/20 flex flex-col md:flex-row md:items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-widest text-[#141F00] font-bold">
            <div>[ BUENOS AIRES // GMT-3 ]</div>
            <div>[ DISPONIBILIDAD INMEDIATA PARA CONSULTORÍA &amp; DIRECTION PITCH ]</div>
            <div>[ RENDER CORES: ONLINE ]</div>
          </div>
        </div>
      </section>
    </div>
  );
}
