import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Breakpoints para gsap.matchMedia — las animaciones de scroll solo corren sin reduced motion. */
export const MQ = {
  desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
};

export { gsap, ScrollTrigger, SplitText, useGSAP };

export interface ScrollState {
  /** 0 → 1 a lo largo de toda la página */
  progress: number;
  /** Velocidad de Lenis en px/frame (0 cuando Lenis está desactivado) */
  velocity: number;
  /** 1 = abajo, -1 = arriba, 0 = quieto */
  direction: number;
}

type ScrollListener = (state: ScrollState) => void;

let lenis: Lenis | null = null;
const listeners = new Set<ScrollListener>();

export const getLenis = () => lenis;

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function nativeState(): ScrollState {
  const limit = document.documentElement.scrollHeight - window.innerHeight;
  return {
    progress: limit > 0 ? Math.min(1, Math.max(0, window.scrollY / limit)) : 0,
    velocity: 0,
    direction: 0,
  };
}

function emit(state: ScrollState) {
  listeners.forEach((cb) => cb(state));
}

/**
 * Suscripción a los cambios de scroll. Funciona con o sin Lenis activo,
 * así los componentes pueden suscribirse antes de que se inicialice.
 */
export function onScroll(cb: ScrollListener) {
  listeners.add(cb);
  cb(lenis ? { progress: lenis.progress, velocity: lenis.velocity, direction: lenis.direction } : nativeState());
  return () => {
    listeners.delete(cb);
  };
}

/**
 * Crea la instancia global de Lenis movida por el ticker de GSAP (un solo loop RAF)
 * y conectada a ScrollTrigger. Con prefers-reduced-motion no se crea Lenis y los
 * listeners reciben los eventos de scroll nativo.
 */
export function initSmoothScroll() {
  if (prefersReducedMotion()) {
    const handleScroll = () => emit(nativeState());
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }

  const instance = new Lenis({ autoRaf: false, lerp: 0.1, smoothWheel: true });
  lenis = instance;

  instance.on('scroll', (l: Lenis) => {
    ScrollTrigger.update();
    emit({ progress: l.progress, velocity: l.velocity, direction: l.direction });
  });

  const tick = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // Los cambios de alto de la página (filtros, acordeones, imágenes, fuentes) mueven los triggers
  let refreshTimer: number | undefined;
  const resizeObserver = new ResizeObserver(() => {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
  });
  resizeObserver.observe(document.body);

  return () => {
    resizeObserver.disconnect();
    window.clearTimeout(refreshTimer);
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(500, 33);
    instance.destroy();
    lenis = null;
  };
}

let lockCount = 0;

/** Detiene Lenis mientras hay un overlay abierto (con contador para overlays apilados). */
export function lockScroll() {
  lockCount += 1;
  lenis?.stop();
  return () => {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) lenis?.start();
  };
}

let pageCovered = false;
const revealQueue = new Set<() => void>();

/** Lo marca la transición entre páginas: true mientras la cortina tapa la página. */
export function setPageCovered(covered: boolean) {
  pageCovered = covered;
  if (covered) return;
  const pending = [...revealQueue];
  revealQueue.clear();
  pending.forEach((cb) => cb());
}

/**
 * Corre `cb` cuando la página está a la vista: ya mismo, o cuando la cortina de la
 * transición empieza a abrirse. Así los reveals de entrada no se animan tapados.
 * Devuelve una función que cancela la espera (para la limpieza de useGSAP).
 */
export function afterPageReveal(cb: () => void) {
  if (!pageCovered) {
    cb();
    return () => {};
  }
  revealQueue.add(cb);
  return () => {
    revealQueue.delete(cb);
  };
}
