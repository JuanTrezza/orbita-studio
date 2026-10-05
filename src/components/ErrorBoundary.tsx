import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ÓRBITA STUDIO Error Boundary caught an exception:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
    window.location.hash = '/';
  };

  handleReload = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#0E0F0C] text-[#EDEDE6] flex flex-col justify-between p-6 sm:p-12 font-sans selection:bg-[#C6FF3D] selection:text-[#0E0F0C]">
          {/* Top HUD Telemetry */}
          <header className="w-full flex items-center justify-between border-b border-[#5C5E57]/30 pb-4 font-mono text-[11px] sm:text-xs tracking-widest text-[#5C5E57] uppercase">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#FF4D4D] animate-ping" />
              <span className="text-[#FF4D4D] font-bold">[SYS.ERR // INTERRUPCIÓN DE SISTEMA]</span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span>ESTADO: FALLA_CONTENIDA</span>
              <span>·</span>
              <span>BUENOS AIRES // 34°36'S</span>
            </div>
          </header>

          {/* Main Error Content */}
          <main className="w-full max-w-3xl my-auto py-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1C16] border border-[#5C5E57]/40 text-[#C6FF3D] font-mono text-xs tracking-widest uppercase mb-6">
              <AlertTriangle className="w-4 h-4 text-[#C6FF3D]" />
              <span>ANOMALÍA EN EL MOTOR DE RENDERIZADO</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-[#EDEDE6] mb-6 leading-none">
              INTERRUPCIÓN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6FF3D] to-[#EDEDE6]">
                DE SEÑAL
              </span>
            </h1>

            <p className="text-[#A6A99E] text-base sm:text-lg max-w-xl font-light leading-relaxed mb-8">
              Ocurrió un error inesperado al procesar la secuencia visual. La arquitectura ha contenido
              la anomalía para preservar la integridad de la sesión de navegación.
            </p>

            {/* Error Diagnostics Box */}
            {this.state.error && (
              <div className="w-full p-4 mb-8 bg-[#151713] border border-[#5C5E57]/40 font-mono text-xs text-[#A6A99E] overflow-x-auto">
                <div className="text-[10px] text-[#5C5E57] uppercase tracking-wider mb-1 font-bold">
                  DIAGNÓSTICO // REGISTRO TÉCNICO:
                </div>
                <code className="text-[#FF6B6B] block">
                  {this.state.error.name}: {this.state.error.message}
                </code>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#/"
                onClick={this.handleReset}
                className="inline-flex items-center gap-3 px-6 py-4 bg-[#C6FF3D] text-[#0E0F0C] font-mono text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-[#d8ff6b] transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>VOLVER AL INICIO</span>
              </a>

              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center gap-3 px-6 py-4 bg-transparent border border-[#5C5E57] text-[#EDEDE6] font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase hover:border-[#C6FF3D] hover:text-[#C6FF3D] transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>REINTENTAR</span>
              </button>
            </div>
          </main>

          {/* Bottom HUD bar */}
          <footer className="w-full border-t border-[#5C5E57]/30 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[10px] text-[#5C5E57] tracking-widest uppercase">
            <span>ÓRBITA STUDIO // NÚCLEO DE CONTENCIÓN v2.5</span>
            <span>RESTABLECER COORDENADAS RECOMENDADO</span>
          </footer>
        </div>
      );
    }

    return this.props.children;
  }
}
