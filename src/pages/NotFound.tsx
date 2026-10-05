import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, LayoutGrid } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';

export function NotFound(): React.ReactElement {
  usePageTitle('404');

  return (
    <div className="w-full min-h-[75vh] flex flex-col justify-center px-4 sm:px-6 md:px-12 py-16 bg-[#0E0F0C] text-[#EDEDE6]">
      {/* Container */}
      <div className="max-w-4xl mx-auto w-full">
        {/* Telemetry pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#151713] border border-[#5C5E57]/40 font-mono text-xs text-[#C6FF3D] tracking-widest uppercase mb-6">
          <Compass className="w-3.5 h-3.5 text-[#C6FF3D]" />
          <span>ERROR 404 // TRAYECTORIA DESCONOCIDA</span>
        </div>

        {/* Big Brutalist Heading */}
        <div className="relative mb-6">
          <span className="font-mono text-xs sm:text-sm text-[#5C5E57] tracking-widest uppercase block mb-2">
            [COORDENADAS INDEFINIDAS // FUERA DE ALCANCE]
          </span>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter text-[#EDEDE6] leading-none">
            404 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6FF3D] to-[#EDEDE6]">
              FUERA DE ÓRBITA
            </span>
          </h1>
        </div>

        {/* Technical Data HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 my-8 bg-[#151713]/80 border border-[#5C5E57]/30 font-mono text-xs">
          <div>
            <span className="text-[10px] text-[#5C5E57] uppercase block">ESTADO</span>
            <span className="text-[#C6FF3D] font-bold">404_NOT_FOUND</span>
          </div>
          <div>
            <span className="text-[10px] text-[#5C5E57] uppercase block">ORIGEN</span>
            <span className="text-[#EDEDE6]">CLIENT_NAVIGATION</span>
          </div>
          <div>
            <span className="text-[10px] text-[#5C5E57] uppercase block">SEÑAL</span>
            <span className="text-[#EDEDE6]">PERDIDA (0.00dB)</span>
          </div>
          <div>
            <span className="text-[10px] text-[#5C5E57] uppercase block">ACCIÓN RECOMENDADA</span>
            <span className="text-[#C6FF3D]">REENCAMINAR</span>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-[#A6A99E] text-base sm:text-lg max-w-2xl font-light leading-relaxed mb-10">
          La coordenada o dirección a la que intentás acceder no existe en la infraestructura de ÓRBITA Studio.
          Podés regresar al inicio o explorar nuestro catálogo completo de proyectos.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-6 py-4 bg-[#C6FF3D] text-[#0E0F0C] font-mono text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-[#d8ff6b] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>VOLVER AL INICIO</span>
          </Link>

          <Link
            to="/trabajos"
            className="inline-flex items-center gap-3 px-6 py-4 bg-transparent border border-[#5C5E57] text-[#EDEDE6] font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase hover:border-[#C6FF3D] hover:text-[#C6FF3D] transition-colors"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>EXPLORAR TRABAJOS</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
