import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
}

export function Footer({ onOpenContact }: FooterProps): React.ReactElement {
  const [bueTime, setBueTime] = useState('14:38:09');

  useEffect(() => {
    const updateTime = (): void => {
      const now = new Date();
      // UTC-3 Buenos Aires
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const bueDate = new Date(utc - 3600000 * 3);
      const hh = String(bueDate.getHours()).padStart(2, '0');
      const mm = String(bueDate.getMinutes()).padStart(2, '0');
      const ss = String(bueDate.getSeconds()).padStart(2, '0');
      setBueTime(`${hh}:${mm}:${ss}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollTop = (e: React.MouseEvent): void => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0E0F0C] border-t border-[#5C5E57]/30 pt-12 sm:pt-16 pb-8 relative z-20 overflow-hidden">
      {/* Massive Typographic Signature */}
      <div className="w-full px-4 sm:px-6 md:px-8 mb-10 sm:mb-14">
        <div className="w-full select-none overflow-hidden leading-none border-b border-[#5C5E57]/30 pb-4">
          <span className="block font-display text-[18vw] leading-none font-black uppercase tracking-tighter text-[#22251F] hover:text-[#EDEDE6] transition-colors duration-700">
            ÓRBITA
          </span>
        </div>
      </div>

      {/* 3 Modular Columns */}
      <div className="w-full px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 text-[#A6A99E]">
        {/* Col 1 */}
        <div className="md:col-span-4 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#5C5E57]/30 pb-8 md:pb-0 md:pr-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[#C6FF3D]"></span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#EDEDE6]">
                ESTUDIO CENTRAL
              </span>
            </div>
            <p className="text-sm text-[#A6A99E] leading-relaxed">
              Motion Direction, Procedural Systems &amp; Realtime Visuals for Future-Facing Brands.
            </p>
          </div>

          <div className="pt-8">
            <div className="font-mono text-xs text-[#5C5E57] uppercase tracking-wider">
              HORA LOCAL (UTC-3)
            </div>
            <div className="font-mono text-xs text-[#C6FF3D] font-bold tracking-widest mt-0.5">
              BUENOS AIRES // {bueTime}
            </div>
          </div>
        </div>

        {/* Col 2 */}
        <div className="md:col-span-4 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#5C5E57]/30 py-8 md:py-0 md:px-8">
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-[#5C5E57]">
              DIRECTORIO DE CONTACTO
            </div>
            <a
              href="mailto:contacto@orbitastudio.ar"
              className="block font-display text-xl sm:text-2xl text-[#EDEDE6] hover:text-[#C6FF3D] transition-colors tracking-tight font-bold"
            >
              contacto@orbitastudio.ar
            </a>
            <div className="font-mono text-xs text-[#A6A99E] uppercase tracking-wider">
              INQUIRIES // R&amp;D COLLABS
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={onOpenContact}
              className="inline-block font-mono text-xs uppercase tracking-wider text-[#EDEDE6] hover:text-[#C6FF3D] transition-colors underline decoration-[#5C5E57] underline-offset-4"
            >
              INICIAR PROYECTO →
            </button>
          </div>
        </div>

        {/* Col 3 */}
        <div className="md:col-span-4 flex flex-col justify-between pt-8 md:pt-0 md:pl-8">
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-[#5C5E57]">
              REDES Y REGISTROS
            </div>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs uppercase">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#A6A99E] hover:text-[#C6FF3D] transition-colors"
              >
                INSTAGRAM
              </a>
              <a
                href="https://vimeo.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#A6A99E] hover:text-[#C6FF3D] transition-colors"
              >
                VIMEO
              </a>
              <a
                href="https://behance.net"
                target="_blank"
                rel="noreferrer"
                className="text-[#A6A99E] hover:text-[#C6FF3D] transition-colors"
              >
                BEHANCE
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#A6A99E] hover:text-[#C6FF3D] transition-colors"
              >
                TWITTER / X
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#A6A99E] hover:text-[#C6FF3D] transition-colors"
              >
                LINKEDIN
              </a>
              <a
                href="https://are.na"
                target="_blank"
                rel="noreferrer"
                className="text-[#A6A99E] hover:text-[#C6FF3D] transition-colors"
              >
                ARE.NA
              </a>
            </div>
          </div>

          <div className="pt-8">
            <div className="font-mono text-xs text-[#5C5E57]">
              FRAMEWORK 0.4.1 // BUILD 2024.11
            </div>
          </div>
        </div>
      </div>

      {/* Legal & Back to Top */}
      <div className="w-full px-4 sm:px-6 md:px-8 mt-12 pt-6 border-t border-[#5C5E57]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#5C5E57]">
        <div className="flex items-center gap-3">
          <span>© 2019–2025 ÓRBITA STUDIO S.R.L.</span>
          <span className="hidden sm:inline">ALL RIGHTS RESERVED</span>
        </div>
        <div className="flex items-center gap-6 uppercase">
          <button
            onClick={onOpenContact}
            className="hover:text-[#EDEDE6] transition-colors"
          >
            PRIVACIDAD &amp; TÉRMINOS
          </button>
          <a
            href="#colofon"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-[#EDEDE6] transition-colors"
          >
            COLOFÓN
          </a>
          <button
            onClick={handleScrollTop}
            className="hover:text-[#C6FF3D] transition-colors text-[#C6FF3D] font-bold flex items-center gap-1"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
