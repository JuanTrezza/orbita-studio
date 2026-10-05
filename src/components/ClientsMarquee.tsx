import React from 'react';
import { clientLogos, clientLogosRow2 } from '../data/process';
import { useVelocityMarquee } from '../hooks/useVelocityMarquee';

export function ClientsMarquee(): React.ReactElement {
  // Cada track tiene la lista duplicada: recorre la mitad de su ancho por vuelta (-50)
  const row1Ref = useVelocityMarquee<HTMLDivElement>({ duration: 28, shift: -50 });
  const row2Ref = useVelocityMarquee<HTMLDivElement>({ duration: 30, shift: -50, reverse: true });

  return (
    <section className="w-full bg-[#0E0F0C] py-12 sm:py-16 overflow-hidden border-t border-b border-[#5C5E57]/30">
      <div className="px-4 sm:px-6 md:px-8 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C6FF3D]">
          <span className="w-1.5 h-1.5 bg-[#C6FF3D]"></span>
          <span>03 / ALIANZAS &amp; CLIENTES</span>
        </div>
        <span className="font-mono text-[10px] text-[#A6A99E] uppercase tracking-wider">
          MARCAS GLOBALES &amp; PARTNERS CREATIVOS
        </span>
      </div>

      {/* Row 1: Forward Marquee */}
      <div ref={row1Ref} className="relative w-full overflow-hidden flex whitespace-nowrap select-none py-3 bg-[#151713]">
        <div data-marquee-track className="flex shrink-0 gap-10 items-center text-[#A6A99E] uppercase font-display text-xl sm:text-2xl font-bold tracking-tighter">
          {clientLogos.concat(clientLogos).map((client, idx) => (
            <React.Fragment key={`r1-${client}-${idx}`}>
              <span className="hover:text-[#EDEDE6] transition-colors">{client}</span>
              <span className="text-[#C6FF3D] text-sm">✦</span>
            </React.Fragment>
          ))}
        </div>
        <div
          aria-hidden="true"
          data-marquee-track
          className="flex shrink-0 gap-10 items-center text-[#A6A99E] uppercase font-display text-xl sm:text-2xl font-bold tracking-tighter"
        >
          {clientLogos.concat(clientLogos).map((client, idx) => (
            <React.Fragment key={`r1-dup-${client}-${idx}`}>
              <span className="hover:text-[#EDEDE6] transition-colors">{client}</span>
              <span className="text-[#C6FF3D] text-sm">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Row 2: Reverse Marquee */}
      <div ref={row2Ref} className="relative w-full overflow-hidden flex whitespace-nowrap select-none py-3 bg-[#191B16] mt-1">
        <div data-marquee-track className="flex shrink-0 gap-10 items-center text-[#EDEDE6]/80 uppercase font-display text-xl sm:text-2xl font-bold tracking-tighter">
          {clientLogosRow2.concat(clientLogosRow2).map((client, idx) => (
            <React.Fragment key={`r2-${client}-${idx}`}>
              <span className="hover:text-[#C6FF3D] transition-colors">{client}</span>
              <span className="text-[#C6FF3D] text-xs">■</span>
            </React.Fragment>
          ))}
        </div>
        <div
          aria-hidden="true"
          data-marquee-track
          className="flex shrink-0 gap-10 items-center text-[#EDEDE6]/80 uppercase font-display text-xl sm:text-2xl font-bold tracking-tighter"
        >
          {clientLogosRow2.concat(clientLogosRow2).map((client, idx) => (
            <React.Fragment key={`r2-dup-${client}-${idx}`}>
              <span className="hover:text-[#C6FF3D] transition-colors">{client}</span>
              <span className="text-[#C6FF3D] text-xs">■</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
