import React, { useState, useEffect } from 'react';
import { ArrowRight, Cpu, Volume2, Box } from 'lucide-react';
import { teamMembers } from '../data/team';
import { awards } from '../data/awards';
import { usePageTitle } from '../hooks/usePageTitle';

interface EstudioProps {
  onOpenContact: () => void;
}

export function Estudio({ onOpenContact }: EstudioProps): React.ReactElement {
  usePageTitle('Estudio');

  const [bueTime, setBueTime] = useState('14:48:22');
  const [timecode, setTimecode] = useState('00:14:48:19');

  useEffect(() => {
    let frame = 19;
    const interval = setInterval(() => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const bueDate = new Date(utc - 3600000 * 3);

      const hh = String(bueDate.getHours()).padStart(2, '0');
      const mm = String(bueDate.getMinutes()).padStart(2, '0');
      const ss = String(bueDate.getSeconds()).padStart(2, '0');
      setBueTime(`${hh}:${mm}:${ss}`);

      frame = (frame + 1) % 24;
      const ff = String(frame).padStart(2, '0');
      setTimecode(`00:${mm}:${ss}:${ff}`);
    }, 1000 / 24); // 24fps update loop

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col text-[#EDEDE6] bg-[#0E0F0C] pt-6 pb-16">
      {/* SECTION 1: MANIFESTO & HUD TELEMETRY */}
      <section className="w-full px-4 sm:px-6 md:px-8 pt-8 pb-16 border-b border-[#5C5E57]/30">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Dossier Marker & Telemetry Meta */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#C6FF3D] tracking-wider uppercase font-semibold">
              <span className="inline-block w-2 h-2 bg-[#C6FF3D]"></span>
              <span>ESTUDIO // REF. 001-BUE</span>
            </div>

            <div className="bg-[#151713] border border-[#5C5E57]/40 p-5 space-y-3 font-mono text-xs">
              <div className="text-[10px] text-[#5C5E57] uppercase tracking-widest">Coordenadas Base</div>
              <div className="text-[#EDEDE6] font-bold">34.6037° S // 58.3816° W</div>
              <div className="text-xs text-[#A6A99E]">San Telmo, Buenos Aires, ARG</div>

              <div className="pt-3 border-t border-[#5C5E57]/30 text-[10px] text-[#5C5E57] uppercase tracking-widest">
                Capacidad Activa
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C6FF3D] animate-ping"></span>
                <span className="text-[#C6FF3D] font-bold">5 PIPELINES SIMULTÁNEOS</span>
              </div>

              <div className="pt-3 border-t border-[#5C5E57]/30 text-[10px] text-[#5C5E57] uppercase tracking-widest">
                Hardware Cluster
              </div>
              <div className="text-[#A6A99E]">32x RTX 4090 // NVLink Local</div>
            </div>

            {/* Realtime UTC-3 Audio Clock Telemetry */}
            <div className="bg-[#191B16] border border-[#5C5E57]/40 p-5 font-mono text-xs flex flex-col space-y-2">
              <div className="flex justify-between items-center text-[#5C5E57]">
                <span>SYNC TIME</span>
                <span className="text-[#C6FF3D] font-bold">{bueTime}</span>
              </div>
              <div className="flex justify-between items-center text-[#A6A99E]">
                <span>TIMECODE</span>
                <span className="text-[#EDEDE6] tracking-widest">{timecode}</span>
              </div>
              <div className="flex justify-between items-center text-[#5C5E57]">
                <span>STATUS</span>
                <span className="text-[#C6FF3D] uppercase font-bold">ONLINE // R&amp;D</span>
              </div>
            </div>
          </div>

          {/* Right Column: Massive Editorial Manifesto */}
          <div className="md:col-span-8 lg:col-span-9 flex flex-col space-y-8">
            <div className="font-mono text-xs uppercase tracking-widest text-[#5C5E57]">
              [ EL ESTUDIO // MANIFIESTO &amp; VISIÓN COMPUTACIONAL ]
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#EDEDE6] uppercase tracking-tighter leading-none">
              CREEMOS EN EL MOVIMIENTO COMO ARQUITECTURA EMOCIONAL.
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
              <p className="lg:col-span-8 text-base sm:text-lg text-[#A6A99E] leading-relaxed">
                Fundado en Buenos Aires en 2019, ÓRBITA es un laboratorio de animación experimental, simulación procedural y dirección de arte computacional. Operamos en la frontera exacta donde el arte digital de ultra-precisión converge con la narrativa implacable. No decoramos superficies: modelamos la física, la luz y la vibración sonora para redefinir el impacto visual de marcas e instituciones que moldean el futuro cultural.
              </p>

              <div className="lg:col-span-4 flex flex-col justify-end bg-[#151713] border border-[#5C5E57]/40 p-5">
                <span className="font-mono text-xs text-[#C6FF3D] tracking-widest uppercase font-bold">
                  FILOSOFÍA TÉCNICA
                </span>
                <p className="text-xs text-[#A6A99E] pt-2 leading-relaxed">
                  El render final no es el objetivo; es el registro exacto de un sistema vivo diseñado con rigor matemático y sensibilidad plástica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CORE VALUES / 4 BOLD PILLARS */}
      <section className="w-full px-4 sm:px-6 md:px-8 py-16 sm:py-24 border-b border-[#5C5E57]/30">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-10 pb-4 border-b border-[#5C5E57]/30">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#C6FF3D] font-bold">02 //</span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#EDEDE6] tracking-tight uppercase font-bold">
              PRINCIPIOS DE TRABAJO
            </h2>
          </div>
          <div className="font-mono text-xs text-[#5C5E57] uppercase tracking-widest mt-2 sm:mt-0">
            ARQUITECTURA DE PROCESOS ESTRICTA
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 01 */}
          <div className="bg-[#151713] border border-[#5C5E57]/40 p-6 flex flex-col justify-between group hover:border-[#C6FF3D]/70 transition-colors">
            <div>
              <div className="flex items-center justify-between pb-4">
                <span className="font-display text-4xl text-[#C6FF3D] font-extrabold">01</span>
                <span className="font-mono text-[9px] px-2 py-0.5 bg-[#0E0F0C] text-[#C6FF3D] border border-[#5C5E57]/40 uppercase">
                  Zero-Preset
                </span>
              </div>
              <h3 className="font-display text-xl text-[#EDEDE6] uppercase pb-1 tracking-tight font-bold group-hover:text-[#C6FF3D] transition-colors">
                CERO PLANTILLAS
              </h3>
              <h4 className="font-mono text-xs text-[#5C5E57] uppercase pb-4">ARTESANÍA CUADRO A CUADRO</h4>
              <p className="text-sm text-[#A6A99E] leading-relaxed">
                Cada fotograma se concibe y construye desde cero. Descartamos sistemáticamente presets comerciales, automatizaciones genéricas y fórmulas algorítmicas sin intención autoral.
              </p>
            </div>
            <div className="pt-6 font-mono text-[10px] text-[#5C5E57] tracking-wider uppercase border-t border-[#5C5E57]/20 mt-6">
              FRAME BY FRAME // NO COMPROMISE
            </div>
          </div>

          {/* Pillar 02 */}
          <div className="bg-[#151713] border border-[#5C5E57]/40 p-6 flex flex-col justify-between group hover:border-[#C6FF3D]/70 transition-colors">
            <div>
              <div className="flex items-center justify-between pb-4">
                <span className="font-display text-4xl text-[#C6FF3D] font-extrabold">02</span>
                <span className="font-mono text-[9px] px-2 py-0.5 bg-[#0E0F0C] text-[#C6FF3D] border border-[#5C5E57]/40 uppercase">
                  Simulation
                </span>
              </div>
              <h3 className="font-display text-xl text-[#EDEDE6] uppercase pb-1 tracking-tight font-bold group-hover:text-[#C6FF3D] transition-colors">
                RIGOR CIENTÍFICO + EMOCIÓN
              </h3>
              <h4 className="font-mono text-xs text-[#5C5E57] uppercase pb-4">FÍSICA EXACTA AL SERVICIO DEL ARTE</h4>
              <p className="text-sm text-[#A6A99E] leading-relaxed">
                Simulamos dinámicas reales de fluidos viscosos, tensión superficial y óptica fotónica no para imitar la realidad, sino para conmover las sinapsis del espectador en los primeros 3 segundos.
              </p>
            </div>
            <div className="pt-6 font-mono text-[10px] text-[#5C5E57] tracking-wider uppercase border-t border-[#5C5E57]/20 mt-6">
              HOUDINICRAFT // WAVE PROPAGATION
            </div>
          </div>

          {/* Pillar 03 */}
          <div className="bg-[#151713] border border-[#5C5E57]/40 p-6 flex flex-col justify-between group hover:border-[#C6FF3D]/70 transition-colors">
            <div>
              <div className="flex items-center justify-between pb-4">
                <span className="font-display text-4xl text-[#C6FF3D] font-extrabold">03</span>
                <span className="font-mono text-[9px] px-2 py-0.5 bg-[#0E0F0C] text-[#C6FF3D] border border-[#5C5E57]/40 uppercase">
                  Acoustics
                </span>
              </div>
              <h3 className="font-display text-xl text-[#EDEDE6] uppercase pb-1 tracking-tight font-bold group-hover:text-[#C6FF3D] transition-colors">
                SINCRO TOTAL AUDIO-VISUAL
              </h3>
              <h4 className="font-mono text-xs text-[#5C5E57] uppercase pb-4">KINETISMO SONORO INTEGRADO</h4>
              <p className="text-sm text-[#A6A99E] leading-relaxed">
                El sonido no acompaña a la imagen; define su geometría temporal. Diseñamos la respuesta acústica y la vibración háptica desde la preproducción como un único sistema cinético indivisible.
              </p>
            </div>
            <div className="pt-6 font-mono text-[10px] text-[#5C5E57] tracking-wider uppercase border-t border-[#5C5E57]/20 mt-6">
              DOLBY ATMOS // 192KHZ SPATIAL
            </div>
          </div>

          {/* Pillar 04 */}
          <div className="bg-[#151713] border border-[#5C5E57]/40 p-6 flex flex-col justify-between group hover:border-[#C6FF3D]/70 transition-colors">
            <div>
              <div className="flex items-center justify-between pb-4">
                <span className="font-display text-4xl text-[#C6FF3D] font-extrabold">04</span>
                <span className="font-mono text-[9px] px-2 py-0.5 bg-[#0E0F0C] text-[#C6FF3D] border border-[#5C5E57]/40 uppercase">
                  Pipeline
                </span>
              </div>
              <h3 className="font-display text-xl text-[#EDEDE6] uppercase pb-1 tracking-tight font-bold group-hover:text-[#C6FF3D] transition-colors">
                CONTROL TOTAL DEL PIPELINE
              </h3>
              <h4 className="font-mono text-xs text-[#5C5E57] uppercase pb-4">ACES COLOR &amp; MASTERIZACIÓN 8K</h4>
              <p className="text-sm text-[#A6A99E] leading-relaxed">
                Supervisión técnica absoluta desde el primer trazo vectorial hasta el master final en ACES 2065-1. Compatibilidad nativa para proyección IMAX, domos inmersivos y hardware de computación espacial.
              </p>
            </div>
            <div className="pt-6 font-mono text-[10px] text-[#5C5E57] tracking-wider uppercase border-t border-[#5C5E57]/20 mt-6">
              END-TO-END RENDER PIPELINE
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE TEAM / DIRECCIÓN & ARTISTAS */}
      <section className="w-full px-4 sm:px-6 md:px-8 py-16 sm:py-24 border-b border-[#5C5E57]/30">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#5C5E57]/30">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#C6FF3D] font-bold uppercase">03 // EQUIPO CENTRAL</span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#EDEDE6] uppercase tracking-tight font-bold">
              DIRECCIÓN &amp; ARTISTAS
            </h2>
          </div>
          <div className="font-mono text-xs text-[#A6A99E] mt-2 md:mt-0 uppercase">
            6 PERFILES // DISCIPLINA COMPUTACIONAL // ENFOQUE RADICAL
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-[#151713] border border-[#5C5E57]/40 flex flex-col group overflow-hidden hover:border-[#C6FF3D]/70 transition-colors"
            >
              <div className="relative w-full aspect-[4/5] bg-[#191B16] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.alt}
                  loading="lazy"
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#0E0F0C]/90 px-2 py-0.5 font-mono text-[9px] text-[#C6FF3D] tracking-widest uppercase">
                  {member.tag}
                </div>
                <div className="absolute bottom-3 right-3 font-mono text-[10px] text-[#EDEDE6]/80 bg-[#0E0F0C]/80 px-2 py-0.5">
                  {member.origin}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <h3 className="font-display text-2xl text-[#EDEDE6] uppercase tracking-tight font-bold group-hover:text-[#C6FF3D] transition-colors">
                    {member.name}
                  </h3>
                  <div className="font-mono text-xs text-[#C6FF3D] uppercase font-semibold">
                    {member.subRole}
                  </div>
                  <p className="text-xs text-[#A6A99E] pt-2 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#5C5E57]/20 space-y-2">
                  <div className="font-mono text-[9px] text-[#5C5E57] uppercase tracking-wider">
                    HERRAMIENTAS / FOCO
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {member.tools.map((t) => (
                      <span
                        key={t}
                        className="bg-[#191B16] border border-[#5C5E57]/40 px-2 py-0.5 font-mono text-[10px] text-[#EDEDE6]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: AWARDS & RECOGNITION (Swiss Editorial Index Table) */}
      <section className="w-full px-4 sm:px-6 md:px-8 py-16 sm:py-24 border-b border-[#5C5E57]/30">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 pb-4 border-b border-[#5C5E57]/30">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#C6FF3D] font-bold uppercase">04 // PALMARÉS &amp; REGISTRO</span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#EDEDE6] uppercase tracking-tight font-bold">
              PREMIOS &amp; FESTIVALES
            </h2>
          </div>
          <div className="font-mono text-xs text-[#5C5E57] uppercase mt-2 md:mt-0">
            RECONOCIMIENTOS GLOBALES // 2022–2025
          </div>
        </div>

        {/* Editorial Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-6 px-5 py-3 bg-[#151713] border border-[#5C5E57]/40 font-mono text-[10px] uppercase tracking-widest text-[#5C5E57]">
          <div className="col-span-2">AÑO // ÍNDICE</div>
          <div className="col-span-4">CERTAMEN &amp; DISTINCIÓN</div>
          <div className="col-span-4">PROYECTO SELECCIONADO</div>
          <div className="col-span-2 text-right">DISCIPLINA</div>
        </div>

        {/* Table Rows */}
        <div className="flex flex-col space-y-1.5 mt-2">
          {awards.map((award) => (
            <div
              key={award.index}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 bg-[#151713] border border-[#5C5E57]/30 hover:border-[#C6FF3D]/70 transition-colors items-center group"
            >
              <div className="md:col-span-2 font-mono text-xs text-[#C6FF3D] font-bold">
                {award.year} // {award.index}
              </div>
              <div className="md:col-span-4">
                <div className="font-display text-lg font-bold text-[#EDEDE6] group-hover:text-[#C6FF3D] transition-colors uppercase">
                  {award.title}
                </div>
                <div className="font-mono text-[10px] text-[#A6A99E]">{award.location}</div>
              </div>
              <div className="md:col-span-4 text-sm text-[#EDEDE6]">
                {award.project}
              </div>
              <div className="md:col-span-2 md:text-right font-mono text-[10px] text-[#5C5E57] uppercase">
                {award.discipline}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: STUDIO SPECS & INFRAESTRUCTURA */}
      <section className="w-full px-4 sm:px-6 md:px-8 py-16 sm:py-24 border-b border-[#5C5E57]/30">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-10 pb-4 border-b border-[#5C5E57]/30">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#C6FF3D] font-bold uppercase">05 // CAPACIDAD TÉCNICA</span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#EDEDE6] uppercase tracking-tight font-bold">
              INFRAESTRUCTURA &amp; SPECS
            </h2>
          </div>
          <div className="font-mono text-xs text-[#A6A99E]">
            PROCESAMIENTO IN-HOUSE SIN EXTERNALIZACIÓN
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Spec 1: Render Farm */}
          <div className="bg-[#151713] border border-[#5C5E57]/40 p-6 space-y-4 hover:border-[#C6FF3D]/70 transition-colors">
            <div className="flex items-center justify-between">
              <Cpu className="w-8 h-8 text-[#C6FF3D]" />
              <span className="font-mono text-[10px] text-[#C6FF3D] bg-[#0E0F0C] border border-[#5C5E57]/40 px-2 py-0.5 font-bold uppercase">
                NODES: 32
              </span>
            </div>
            <div>
              <h3 className="font-display text-xl text-[#EDEDE6] uppercase font-bold">RENDER FARM IN-HOUSE</h3>
              <div className="font-mono text-xs text-[#C6FF3D] pt-1 uppercase">32x NVIDIA RTX 4090 // 512GB ECC</div>
            </div>
            <p className="text-xs text-[#A6A99E] leading-relaxed">
              Cluster dedicado local refrigerado por líquido para iteraciones volumétricas en tiempo real. Redundancia de almacenamiento en matriz NVMe con velocidad sostenida de 24GB/s para secuencias sin comprimir EXR 32-bit.
            </p>
            <div className="pt-4 border-t border-[#5C5E57]/20 space-y-1 font-mono text-[10px] text-[#5C5E57]">
              <div className="flex justify-between">
                <span>BENCHMARK SPEED</span>
                <span className="text-[#EDEDE6]">1.2 PETAFLOPS FP32</span>
              </div>
              <div className="flex justify-between">
                <span>STORAGE POOL</span>
                <span className="text-[#EDEDE6]">320TB NVME RAID-Z2</span>
              </div>
            </div>
          </div>

          {/* Spec 2: Dolby Atmos Suite */}
          <div className="bg-[#151713] border border-[#5C5E57]/40 p-6 space-y-4 hover:border-[#C6FF3D]/70 transition-colors">
            <div className="flex items-center justify-between">
              <Volume2 className="w-8 h-8 text-[#C6FF3D]" />
              <span className="font-mono text-[10px] text-[#C6FF3D] bg-[#0E0F0C] border border-[#5C5E57]/40 px-2 py-0.5 font-bold uppercase">
                CERT: DOLBY
              </span>
            </div>
            <div>
              <h3 className="font-display text-xl text-[#EDEDE6] uppercase font-bold">SALA DOLBY ATMOS 7.1.4</h3>
              <div className="font-mono text-xs text-[#C6FF3D] pt-1 uppercase">CALIBRADA GENELEC SAM™</div>
            </div>
            <p className="text-xs text-[#A6A99E] leading-relaxed">
              Entorno acústico neutro con tiempo de reverberación RT60 de 0.18s. Monitoreo coaxial activo Genelec The Ones con procesador GLM™ para masterización inmersiva certificada para cine y plataformas binaurales.
            </p>
            <div className="pt-4 border-t border-[#5C5E57]/20 space-y-1 font-mono text-[10px] text-[#5C5E57]">
              <div className="flex justify-between">
                <span>MONITOR ARRAY</span>
                <span className="text-[#EDEDE6]">11x COAXIAL + 2x SUB</span>
              </div>
              <div className="flex justify-between">
                <span>DAC PROTOCOL</span>
                <span className="text-[#EDEDE6]">DANTE AV 192KHZ</span>
              </div>
            </div>
          </div>

          {/* Spec 3: Optical MoCap Studio */}
          <div className="bg-[#151713] border border-[#5C5E57]/40 p-6 space-y-4 hover:border-[#C6FF3D]/70 transition-colors">
            <div className="flex items-center justify-between">
              <Box className="w-8 h-8 text-[#C6FF3D]" />
              <span className="font-mono text-[10px] text-[#C6FF3D] bg-[#0E0F0C] border border-[#5C5E57]/40 px-2 py-0.5 font-bold uppercase">
                MOCAP RIG
              </span>
            </div>
            <div>
              <h3 className="font-display text-xl text-[#EDEDE6] uppercase font-bold">ESTUDIO DE CAPTURA ÓPTICA</h3>
              <div className="font-mono text-xs text-[#C6FF3D] pt-1 uppercase">16 CÁMARAS OPTITRACK PRIME 13W</div>
            </div>
            <p className="text-xs text-[#A6A99E] leading-relaxed">
              Volumen de captura de 8x6x4 metros para adquisición cinemática de alta velocidad a 240fps. Retargeting directo a esqueletos procedurales en Unreal Engine y rigs biomecánicos en Houdini.
            </p>
            <div className="pt-4 border-t border-[#5C5E57]/20 space-y-1 font-mono text-[10px] text-[#5C5E57]">
              <div className="flex justify-between">
                <span>TRACKING PRECISION</span>
                <span className="text-[#EDEDE6]">&lt; 0.2MM LATENCY 4MS</span>
              </div>
              <div className="flex justify-between">
                <span>STREAMING PIPE</span>
                <span className="text-[#EDEDE6]">LIVE LINK // UNREAL 5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FINAL CALL TO ACTION */}
      <section className="w-full px-4 sm:px-6 md:px-8 py-16 bg-[#151713] border-b border-[#5C5E57]/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[#C6FF3D] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 bg-[#C6FF3D]"></span>
              <span>DISPONIBILIDAD CONFIRMADA // Q2 &amp; Q3 2025</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl text-[#EDEDE6] uppercase tracking-tighter font-bold">
              ¿TIENES UN PROYECTO QUE DESAFÍA LA GRAVEDAD CONVENCIONAL?
            </h2>
            <p className="text-base text-[#A6A99E] max-w-2xl leading-relaxed">
              Aceptamos un número limitado de comisiones por temporada para preservar el compromiso absoluto de nuestro equipo central y la excelencia de cada cuadro renderizado.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center space-y-4">
            <button
              type="button"
              onClick={onOpenContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C6FF3D] text-[#0E0F0C] font-mono text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors"
            >
              <span>INICIAR CONVERSACIÓN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="font-mono text-xs text-[#5C5E57] flex items-center gap-2">
              <span>RESPUESTA DIRECTA:</span>
              <span className="text-[#EDEDE6] font-semibold">contacto@orbitastudio.ar</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
