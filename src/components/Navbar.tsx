import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { scrollToId, scrollToTop } from '../lib/scroll';
import { useLenisLock } from '../hooks/useLenisLock';

interface NavbarProps {
  onOpenContact: () => void;
}

export function Navbar({ onOpenContact }: NavbarProps): React.ReactElement {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useLenisLock(mobileMenuOpen);

  const isTrabajosActive = location.pathname.startsWith('/trabajos') || location.pathname.startsWith('/caso');
  const isEstudioActive = location.pathname.startsWith('/estudio');
  const isHomeActive = location.pathname === '/' && !location.hash;

  const handleProcesoClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname === '/') {
      scrollToId('proceso');
    } else {
      navigate('/#proceso');
      setTimeout(() => scrollToId('proceso'), 150);
    }
  };

  const handleContactoClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onOpenContact();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0E0F0C]/90 backdrop-blur-md border-b border-[#5C5E57]/30">
        <div className="h-16 w-full px-4 sm:px-6 md:px-8 flex items-center justify-between">
          {/* Logo & Coordinates */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-3 group"
              onClick={() => {
                if (location.pathname === '/') {
                  scrollToTop();
                }
              }}
            >
              <span className="font-display text-xl sm:text-2xl font-black text-[#EDEDE6] tracking-tighter uppercase group-hover:text-[#C6FF3D] transition-colors">
                ÓRBITA
              </span>
              <span className="hidden lg:inline-block w-px h-4 bg-[#5C5E57]/50"></span>
            </Link>

            <div className="hidden lg:flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#A6A99E] uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6FF3D] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6FF3D]"></span>
              </span>
              <span>BUENOS AIRES</span>
              <span className="text-[#5C5E57]">·</span>
              <span>34°36'S</span>
              <span className="text-[#5C5E57]">·</span>
              <span>EST. 2019</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 font-mono text-xs uppercase tracking-wider">
              <Link
                to="/trabajos"
                className={`transition-colors py-1 ${
                  isTrabajosActive ? 'text-[#C6FF3D] font-bold border-b border-[#C6FF3D]' : 'text-[#A6A99E] hover:text-[#EDEDE6]'
                }`}
              >
                TRABAJOS
              </Link>
              <Link
                to="/estudio"
                className={`transition-colors py-1 ${
                  isEstudioActive ? 'text-[#C6FF3D] font-bold border-b border-[#C6FF3D]' : 'text-[#A6A99E] hover:text-[#EDEDE6]'
                }`}
              >
                ESTUDIO
              </Link>
              <a
                href="#proceso"
                onClick={handleProcesoClick}
                className="text-[#A6A99E] hover:text-[#EDEDE6] transition-colors py-1"
              >
                PROCESO
              </a>
              <button
                type="button"
                onClick={handleContactoClick}
                className="text-[#A6A99E] hover:text-[#EDEDE6] transition-colors py-1 text-left uppercase"
              >
                CONTACTO
              </button>
            </nav>

            {/* Action / Availability pill */}
            <div className="flex items-center gap-3 pl-3 md:border-l md:border-[#5C5E57]/30">
              <button
                type="button"
                onClick={onOpenContact}
                className="hidden sm:inline-flex items-center px-3.5 py-1.5 border border-[#C6FF3D] text-[#C6FF3D] font-mono text-xs uppercase tracking-widest hover:bg-[#C6FF3D] hover:text-[#0E0F0C] transition-colors font-semibold"
              >
                DISPONIBLE Q2/24
              </button>

              <button
                type="button"
                onClick={onOpenContact}
                aria-label="Abrir contacto de usuario"
                className="w-8 h-8 bg-[#EDEDE6] text-[#0E0F0C] hover:bg-[#C6FF3D] transition-colors flex items-center justify-center"
              >
                <User className="w-4 h-4" />
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 text-[#EDEDE6] hover:text-[#C6FF3D] transition-colors"
                aria-label="Abrir menú de navegación"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent
          className="fixed inset-0 z-50 bg-[#0E0F0C] text-[#EDEDE6] flex flex-col justify-between p-6 animate-in fade-in duration-200"
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between border-b border-[#5C5E57]/40 pb-4">
            <span className="font-display text-2xl font-black text-[#EDEDE6] tracking-tighter uppercase">
              ÓRBITA
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#EDEDE6] hover:text-[#C6FF3D] transition-colors"
              aria-label="Cerrar menú"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col space-y-6 my-auto font-display text-3xl font-black uppercase tracking-tight">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`transition-colors ${isHomeActive ? 'text-[#C6FF3D]' : 'text-[#EDEDE6] hover:text-[#C6FF3D]'}`}
            >
              01 // INICIO
            </Link>
            <Link
              to="/trabajos"
              onClick={() => setMobileMenuOpen(false)}
              className={`transition-colors ${isTrabajosActive ? 'text-[#C6FF3D]' : 'text-[#EDEDE6] hover:text-[#C6FF3D]'}`}
            >
              02 // TRABAJOS
            </Link>
            <Link
              to="/estudio"
              onClick={() => setMobileMenuOpen(false)}
              className={`transition-colors ${isEstudioActive ? 'text-[#C6FF3D]' : 'text-[#EDEDE6] hover:text-[#C6FF3D]'}`}
            >
              03 // ESTUDIO
            </Link>
            <a
              href="#proceso"
              onClick={handleProcesoClick}
              className="text-[#EDEDE6] hover:text-[#C6FF3D] transition-colors"
            >
              04 // PROCESO
            </a>
            <button
              onClick={handleContactoClick}
              className="text-left text-[#EDEDE6] hover:text-[#C6FF3D] transition-colors uppercase"
            >
              05 // CONTACTO
            </button>
          </nav>

          {/* Footer info in mobile menu */}
          <div className="border-t border-[#5C5E57]/40 pt-4 space-y-3 font-mono text-xs text-[#A6A99E]">
            <div className="flex items-center justify-between text-[#C6FF3D]">
              <span>BUENOS AIRES // GMT-3</span>
              <span>COMISIONES ABIERTAS</span>
            </div>
            <button
              onClick={handleContactoClick}
              className="w-full py-3 bg-[#C6FF3D] text-[#0E0F0C] font-mono text-xs font-bold uppercase tracking-widest text-center"
            >
              INICIAR PROYECTO →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
