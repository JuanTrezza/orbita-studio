import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, List, ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';
import { ProjectCategory } from '../data/types';
import { usePageTitle } from '../hooks/usePageTitle';

interface TrabajosProps {
  onOpenContact: () => void;
}

export function Trabajos({ onOpenContact }: TrabajosProps): React.ReactElement {
  usePageTitle('Trabajos');

  const [filter, setFilter] = useState<ProjectCategory>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOrder, setSortOrder] = useState<'chrono' | 'alpha'>('chrono');

  // Filtered projects
  const filteredProjects = useMemo(() => {
    let result = projects;
    if (filter !== 'all') {
      result = result.filter((p) => p.categories.includes(filter));
    }
    if (sortOrder === 'alpha') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      result = [...result].sort((a, b) => b.year.localeCompare(a.year));
    }
    return result;
  }, [filter, sortOrder]);

  const spans = [
    'lg:col-span-8',
    'lg:col-span-4',
    'lg:col-span-4',
    'lg:col-span-4',
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-6',
    'lg:col-span-4',
    'lg:col-span-4',
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-6',
  ];

  return (
    <div className="w-full flex flex-col text-[#EDEDE6] bg-[#0E0F0C] pt-6 pb-16">
      {/* Header & Meta Strip */}
      <section className="w-full px-4 sm:px-6 md:px-8 pt-8 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#5C5E57]/30">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-[#A6A99E] tracking-widest uppercase">
              <span className="inline-block w-1.5 h-1.5 bg-[#C6FF3D]"></span>
              <span>ARCHIVO COMPLETO // 2019 — 2025</span>
              <span className="text-[#5C5E57]">/</span>
              <span className="text-[#C6FF3D]">REPOSITORIO DE OBRA</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-[#EDEDE6]">
              TRABAJOS SELECCIONADOS
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 self-start md:self-end">
            <div className="px-4 py-2 bg-[#151713] border border-[#5C5E57]/40 font-mono text-xs uppercase text-[#EDEDE6] flex items-center gap-2">
              <span className="text-[#C6FF3D] font-bold text-sm">12</span>
              <span>OBRAS CATALOGADAS</span>
            </div>
            <div className="hidden lg:flex items-center gap-2 font-mono text-[10px] text-[#A6A99E] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#C6FF3D] animate-ping"></span>
              <span>LATENCIA MOTOR: 11.4MS</span>
            </div>
          </div>
        </div>

        {/* Filter Bar & Display Controls */}
        <div className="w-full bg-[#151713] border border-[#5C5E57]/40 p-2 mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'TODOS (12)' },
              { id: 'cgi', label: '3D CGI & SHADERS (4)' },
              { id: 'kinetic', label: 'KINETIC TYPE (3)' },
              { id: 'realtime', label: 'REALTIME & VIRTUAL (3)' },
              { id: 'audio', label: 'AUDIO REACTIVO (2)' },
            ].map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setFilter(btn.id as ProjectCategory)}
                className={`px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                  filter === btn.id
                    ? 'bg-[#C6FF3D] text-[#0E0F0C] font-bold'
                    : 'bg-[#191B16] text-[#A6A99E] hover:text-[#EDEDE6] hover:bg-[#22251F]'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* View Mode & Sort */}
          <div className="flex items-center gap-3 self-end lg:self-auto font-mono text-xs text-[#A6A99E]">
            <div className="flex items-center bg-[#191B16] border border-[#5C5E57]/40">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 uppercase flex items-center gap-1.5 transition-colors ${
                  viewMode === 'grid' ? 'bg-[#22251F] text-[#C6FF3D] font-bold' : 'hover:text-[#EDEDE6]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">GRILLA</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 uppercase flex items-center gap-1.5 transition-colors ${
                  viewMode === 'list' ? 'bg-[#22251F] text-[#C6FF3D] font-bold' : 'hover:text-[#EDEDE6]'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">LISTA</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSortOrder((prev) => (prev === 'chrono' ? 'alpha' : 'chrono'))}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#191B16] border border-[#5C5E57]/40 text-[#EDEDE6] hover:border-[#C6FF3D] transition-colors"
            >
              <span className="text-[#5C5E57]">ORDEN:</span>
              <span className="uppercase font-semibold text-[#C6FF3D]">
                {sortOrder === 'chrono' ? 'CRONOLÓGICO ↓' : 'ALFABÉTICO A-Z'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Visual Project Gallery */}
      <section className="w-full px-4 sm:px-6 md:px-8 py-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {filteredProjects.map((project, index) => {
              const spanClass = filter === 'all' ? spans[index % spans.length] : 'lg:col-span-6';
              return (
                <article
                  key={project.id}
                  className={`${spanClass} bg-[#151713] border border-[#5C5E57]/40 flex flex-col justify-between group overflow-hidden hover:border-[#C6FF3D]/70 transition-all duration-300`}
                >
                  {/* Top Bar inside card */}
                  <div className="p-4 flex items-center justify-between bg-[#191B16]/60 border-b border-[#5C5E57]/20 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[#C6FF3D] font-bold tracking-widest">{project.num}</span>
                      <span className="text-[#5C5E57]">/</span>
                      <span className="text-[#EDEDE6] uppercase tracking-wider">{project.client}</span>
                    </div>
                    {project.timecode ? (
                      <div className="flex items-center gap-2 text-[10px] text-[#5C5E57] uppercase">
                        <span>{project.timecode}</span>
                        <span className="text-[#C6FF3D]">■ {project.resolution}</span>
                      </div>
                    ) : (
                      <span className="text-[#A6A99E]">{project.year}</span>
                    )}
                  </div>

                  {/* Image Container with link */}
                  <Link
                    to={`/caso/${project.id}`}
                    className="relative w-full aspect-[16/10] overflow-hidden bg-[#0E0F0C] block"
                  >
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F0C]/80 via-transparent to-transparent pointer-events-none"></div>

                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {project.disciplines.map((d) => (
                          <span
                            key={d}
                            className="px-2 py-0.5 bg-[#0E0F0C]/90 font-mono text-[9px] text-[#EDEDE6] uppercase border border-[#5C5E57]/30"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                      <span className="font-mono text-xs text-[#C6FF3D] bg-[#0E0F0C]/90 px-2 py-0.5">
                        {project.year}
                      </span>
                    </div>
                  </Link>

                  {/* Body & CTA */}
                  <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                    <div>
                      <Link to={`/caso/${project.id}`}>
                        <h2 className="font-display text-xl sm:text-2xl text-[#EDEDE6] uppercase tracking-tight group-hover:text-[#C6FF3D] transition-colors font-bold">
                          {project.title}
                        </h2>
                      </Link>
                      <p className="text-xs sm:text-sm text-[#A6A99E] mt-2 line-clamp-2 leading-relaxed">
                        {project.shortDesc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#5C5E57]/20">
                      <span className="font-mono text-[10px] text-[#5C5E57] uppercase">
                        {project.categories.join(' · ').toUpperCase()}
                      </span>
                      <Link
                        to={`/caso/${project.id}`}
                        className="inline-flex items-center gap-1 font-mono text-xs text-[#EDEDE6] uppercase tracking-wider group-hover:text-[#C6FF3D] transition-colors"
                      >
                        <span>EXPLORAR CASO</span>
                        <span className="text-[#C6FF3D] font-bold">+</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* List Mode */
          <div className="flex flex-col border border-[#5C5E57]/40 divide-y divide-[#5C5E57]/30 bg-[#151713]">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/caso/${project.id}`}
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#191B16] transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-[#C6FF3D] font-bold w-8">{project.num}</span>
                  <div>
                    <span className="font-mono text-[10px] text-[#A6A99E] uppercase tracking-wider block">
                      {project.client}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-[#EDEDE6] group-hover:text-[#C6FF3D] transition-colors font-bold">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {project.disciplines.map((d) => (
                    <span
                      key={d}
                      className="px-2 py-0.5 bg-[#0E0F0C] font-mono text-[9px] text-[#EDEDE6] uppercase border border-[#5C5E57]/30"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 font-mono text-xs">
                  <span className="text-[#5C5E57]">[{project.year}]</span>
                  <div className="inline-flex items-center gap-1 text-[#C6FF3D] font-bold uppercase group-hover:translate-x-1 transition-transform">
                    <span>EXPLORAR</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Production Capacity Status Banner */}
      <section className="w-full px-4 sm:px-6 md:px-8 py-16 mt-8 bg-[#151713] border-t border-[#5C5E57]/30">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C6FF3D]">
              <span className="w-2 h-2 rounded-full bg-[#C6FF3D] animate-ping"></span>
              <span>ESTADO OPERATIVO // PRODUCCIÓN 2025</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-[#EDEDE6] uppercase tracking-tight font-bold">
              CAPACIDAD DE PRODUCCIÓN ACTUALIZADA AÑO 2025 // BUENOS AIRES HQ
            </h3>
            <p className="text-sm sm:text-base text-[#A6A99E] leading-relaxed">
              Aceptando comisiones seleccionadas para dirección de movimiento, investigación visual en tiempo real y desarrollo generativo para marcas con visión de futuro.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
            <button
              type="button"
              onClick={onOpenContact}
              className="px-8 py-4 bg-[#C6FF3D] text-[#0E0F0C] font-mono text-xs font-bold uppercase tracking-wider text-center hover:bg-white transition-colors"
            >
              INICIAR NUEVO BRIEF →
            </button>
            <button
              type="button"
              onClick={onOpenContact}
              className="px-8 py-4 bg-[#191B16] border border-[#5C5E57] text-[#EDEDE6] hover:border-[#C6FF3D] hover:text-[#C6FF3D] font-mono text-xs uppercase tracking-wider text-center transition-colors"
            >
              AGENDAR LLAMADA TÉCNICA
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
