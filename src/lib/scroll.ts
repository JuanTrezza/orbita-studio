import { getLenis, prefersReducedMotion } from './motion';

/**
 * Utilidad centralizada de scroll para ÓRBITA.
 * Toda la navegación interna pasa por acá (sin scrollIntoView sueltos ni scroll-smooth
 * global). Usa Lenis cuando está activo y scroll nativo si no (reduced-motion).
 */
const HEADER_OFFSET = 64; // Altura fija del header (h-16 = 64px)

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/** Corre `run` con Lenis, esperando un frame si un overlay que se cerró en el mismo handler todavía lo tiene detenido. */
function withLenis(run: (lenis: NonNullable<ReturnType<typeof getLenis>>) => void): boolean {
  const lenis = getLenis();
  if (!lenis) return false;
  if (lenis.isStopped) requestAnimationFrame(() => run(lenis));
  else run(lenis);
  return true;
}

export function scrollToId(id: string): void {
  // Limpiar el selector en caso de recibir '#'
  const cleanId = id.replace(/^#/, '');
  const targetElement = document.getElementById(cleanId);

  if (!targetElement) {
    return;
  }

  const handled = withLenis((lenis) =>
    lenis.scrollTo(targetElement, { offset: -HEADER_OFFSET, duration: 1.4, easing: easeOutQuart })
  );
  if (handled) return;

  // Sin Lenis (reduced-motion o antes de inicializar): scroll nativo
  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - HEADER_OFFSET;

  window.scrollTo({
    top: Math.max(0, offsetPosition),
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });
}

/** Vuelve al inicio de la página (logo y botones "volver arriba" del footer). */
export function scrollToTop(): void {
  const handled = withLenis((lenis) => lenis.scrollTo(0, { duration: 1.4, easing: easeOutQuart }));
  if (handled) return;

  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}
