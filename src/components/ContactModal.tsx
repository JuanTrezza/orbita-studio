import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Send, AlertCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  discipline?: string;
  message?: string;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps): React.ReactElement | null {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [discipline, setDiscipline] = useState('3d-cgi');
  const [budget, setBudget] = useState('10k-25k');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSubmitted(false);
      setErrors({});
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!name.trim()) newErrors.name = 'El nombre es obligatorio.';
    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Ingrese un correo electrónico válido.';
    }
    if (!message.trim() || message.trim().length < 10) {
      newErrors.message = 'Por favor incluya un breve resumen de al menos 10 caracteres.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate telemetry transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Auto close after 3.5s
      setTimeout(() => {
        onClose();
        setName('');
        setEmail('');
        setCompany('');
        setMessage('');
        setSubmitted(false);
      }, 3500);
    }, 700);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl bg-[#151713] border border-[#5C5E57] text-[#EDEDE6] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Telemetry Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#5C5E57]/40 bg-[#0E0F0C]">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C6FF3D]">
            <span className="w-2 h-2 bg-[#C6FF3D] animate-pulse"></span>
            <span>TRANSMISIÓN DE BRIEF // CANAL DIRECTO</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal de contacto"
            className="p-1 text-[#EDEDE6]/70 hover:text-[#C6FF3D] hover:bg-[#22251F] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 max-h-[85vh] overflow-y-auto">
          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-[#C6FF3D]/10 border border-[#C6FF3D] text-[#C6FF3D] flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-[#EDEDE6]">
                ¡Mensaje Transmitido!
              </h3>
              <p className="text-sm text-[#A6A99E] max-w-md">
                Hemos recibido tu solicitud técnica. Nuestro equipo de dirección en San Telmo revisará los requerimientos y te contactará en menos de 24 horas.
              </p>
              <div className="pt-4 font-mono text-xs text-[#C6FF3D] uppercase tracking-wider">
                ID DE TELEMETRÍA: #{Math.floor(100000 + Math.random() * 900000)} // STATUS: RECIBIDO
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <h2 id="contact-modal-title" className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-[#EDEDE6]">
                  Iniciar Proyecto
                </h2>
                <p className="text-sm text-[#A6A99E] mt-1">
                  Comisiones abiertas para Q2/Q3 2025. Contanos sobre tu marca o visión de movimiento.
                </p>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="contact-name" className="block font-mono text-xs uppercase tracking-wider text-[#A6A99E]">
                    Nombre y Apellido <span className="text-[#C6FF3D]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Martín Soler"
                    className={`w-full px-3 py-2.5 bg-[#0E0F0C] border ${
                      errors.name ? 'border-red-500' : 'border-[#5C5E57] focus:border-[#C6FF3D]'
                    } text-[#EDEDE6] placeholder-[#5C5E57] font-sans text-sm outline-none transition-colors`}
                  />
                  {errors.name && (
                    <p className="font-mono text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-email" className="block font-mono text-xs uppercase tracking-wider text-[#A6A99E]">
                    Correo Corporativo <span className="text-[#C6FF3D]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="martin@empresa.com"
                    className={`w-full px-3 py-2.5 bg-[#0E0F0C] border ${
                      errors.email ? 'border-red-500' : 'border-[#5C5E57] focus:border-[#C6FF3D]'
                    } text-[#EDEDE6] placeholder-[#5C5E57] font-sans text-sm outline-none transition-colors`}
                  />
                  {errors.email && (
                    <p className="font-mono text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Company & Discipline Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="contact-company" className="block font-mono text-xs uppercase tracking-wider text-[#A6A99E]">
                    Empresa / Marca
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Ej. Kael Biotech"
                    className="w-full px-3 py-2.5 bg-[#0E0F0C] border border-[#5C5E57] focus:border-[#C6FF3D] text-[#EDEDE6] placeholder-[#5C5E57] font-sans text-sm outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-discipline" className="block font-mono text-xs uppercase tracking-wider text-[#A6A99E]">
                    Disciplina Principal
                  </label>
                  <select
                    id="contact-discipline"
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#0E0F0C] border border-[#5C5E57] focus:border-[#C6FF3D] text-[#EDEDE6] font-sans text-sm outline-none transition-colors"
                  >
                    <option value="3d-cgi">3D CGI &amp; Shaders Procedurales</option>
                    <option value="kinetic-type">Cinetismo Tipográfico &amp; Branding</option>
                    <option value="realtime-fui">Realtime, FUI &amp; Unreal Engine</option>
                    <option value="audio-reactive">Diseño Sonoro &amp; Audio Reactivo</option>
                    <option value="full-direction">Dirección Integral de Movimiento</option>
                  </select>
                </div>
              </div>

              {/* Budget Range */}
              <div className="space-y-1">
                <label className="block font-mono text-xs uppercase tracking-wider text-[#A6A99E]">
                  Rango de Presupuesto Estimado
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'sub-10k', label: '< $10K USD' },
                    { id: '10k-25k', label: '$10K — $25K' },
                    { id: '25k-50k', label: '$25K — $50K' },
                    { id: '50k-plus', label: '$50K+ USD' },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setBudget(tier.id)}
                      className={`px-3 py-2 text-xs font-mono uppercase tracking-wider border transition-all ${
                        budget === tier.id
                          ? 'bg-[#C6FF3D] text-[#0E0F0C] font-bold border-[#C6FF3D]'
                          : 'bg-[#0E0F0C] text-[#EDEDE6] border-[#5C5E57] hover:border-[#EDEDE6]'
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label htmlFor="contact-message" className="block font-mono text-xs uppercase tracking-wider text-[#A6A99E]">
                  Detalles del Proyecto / Desafío Visual <span className="text-[#C6FF3D]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describí los entregables clave, objetivos de la marca, tiempos de entrega y plataformas deseadas..."
                  className={`w-full px-3 py-2.5 bg-[#0E0F0C] border ${
                    errors.message ? 'border-red-500' : 'border-[#5C5E57] focus:border-[#C6FF3D]'
                  } text-[#EDEDE6] placeholder-[#5C5E57] font-sans text-sm outline-none transition-colors resize-none`}
                />
                {errors.message && (
                  <p className="font-mono text-xs text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="font-mono text-xs text-[#5C5E57] uppercase tracking-wider">
                  SAN TELMO // LAT: -34.6037 LON: -58.3816
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 bg-[#C6FF3D] text-[#0E0F0C] font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3 h-3 border-2 border-black border-t-transparent animate-spin"></span>
                      <span>ENVIANDO TELEMETRÍA...</span>
                    </>
                  ) : (
                    <>
                      <span>ENVIAR SOLICITUD</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
