import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, type Location } from 'react-router-dom';
import { getLenis, gsap, lockScroll, prefersReducedMotion, ScrollTrigger } from '../lib/motion';
import { scrollToId } from '../lib/scroll';

interface PageTransitionProps {
  /** Renderiza las rutas para la ubicación que se está mostrando (no la de la URL, que cambia antes). */
  children: (location: Location) => React.ReactNode;
}

type Phase = 'idle' | 'covering' | 'covered' | 'revealing';

/** Dos ubicaciones son la misma página si comparten pathname y search (el hash solo mueve el scroll). */
const pageKey = (l: Location) => `${l.pathname}${l.search}`;

/**
 * Transición entre páginas con una cortina lima.
 *
 * La URL cambia primero (click, navigate o botón atrás: todos pasan por useLocation),
 * la cortina sube y cubre, y recién ahí se cambian las rutas renderizadas. Con la página
 * nueva montada y todavía tapada: se matan los ScrollTrigger que quedaron de la anterior
 * (useGSAP ya revierte los suyos al desmontar; esto barre los que se hayan escapado),
 * Lenis vuelve arriba al instante (o al #hash), se refrescan los triggers y la cortina
 * sale por arriba. Si la ruta cambia en medio, la cortina vuelve a cubrir y se usa la
 * última ubicación, así nunca queda un timeline colgado.
 *
 * Con prefers-reduced-motion el cambio es directo, sin cortina.
 */
export function PageTransition({ children }: PageTransitionProps): React.ReactElement {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);

  const curtainRef = useRef<HTMLDivElement>(null);
  const latestLocation = useRef(location);
  const phase = useRef<Phase>('idle');
  const tween = useRef<gsap.core.Tween | null>(null);
  const releaseLock = useRef<(() => void) | null>(null);
  /** Cambio de página sin cortina (reduced-motion): igual hay que resetear scroll y triggers. */
  const swappedWithoutCurtain = useRef(false);
  const isFirstRender = useRef(true);

  latestLocation.current = location;

  useEffect(() => {
    history.scrollRestoration = 'manual';
    gsap.set(curtainRef.current, { yPercent: 100, autoAlpha: 0 });

    return () => {
      tween.current?.kill();
      releaseLock.current?.();
      releaseLock.current = null;
    };
  }, []);

  // La URL cambió: decidir si hace falta transición
  useEffect(() => {
    if (location === displayLocation) return;

    // Misma página (cambio de hash o click al link actual) y nada en curso: sin transición
    if (phase.current === 'idle' && pageKey(location) === pageKey(displayLocation)) {
      setDisplayLocation(location);
      return;
    }

    if (prefersReducedMotion()) {
      swappedWithoutCurtain.current = true;
      setDisplayLocation(location);
      return;
    }

    // Ya está cubriendo: al terminar va a tomar latestLocation
    if (phase.current === 'covering') return;

    tween.current?.kill();
    releaseLock.current ??= lockScroll();
    phase.current = 'covering';

    // Desde abajo si estaba quieta; si venía saliendo por arriba, vuelve desde donde quedó
    tween.current = gsap.to(curtainRef.current, {
      yPercent: 0,
      autoAlpha: 1,
      duration: 0.55,
      ease: 'power3.inOut',
      onComplete: () => {
        phase.current = 'covered';
        setDisplayLocation(latestLocation.current);
      },
    });
  }, [location]);

  // Las rutas nuevas ya están en el DOM (los useGSAP de la página corrieron antes que esto)
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Carga directa con hash (ej. #/#proceso): esperar al primer layout
      const { hash } = displayLocation;
      if (hash) requestAnimationFrame(() => scrollToId(hash, { immediate: true }));
      return;
    }

    const pageSwap = phase.current === 'covered' || swappedWithoutCurtain.current;
    swappedWithoutCurtain.current = false;

    if (!pageSwap) {
      // Misma página: solo seguir el hash
      if (displayLocation.hash) scrollToId(displayLocation.hash);
      return;
    }

    resetScroll(displayLocation.hash);

    if (phase.current !== 'covered') return;

    phase.current = 'revealing';
    tween.current = gsap.to(curtainRef.current, {
      yPercent: -100,
      duration: 0.65,
      delay: 0.1,
      ease: 'power3.inOut',
      onComplete: () => {
        gsap.set(curtainRef.current, { yPercent: 100, autoAlpha: 0 });
        phase.current = 'idle';
        releaseLock.current?.();
        releaseLock.current = null;
      },
    });
  }, [displayLocation]);

  return (
    <>
      {children(displayLocation)}
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="fixed inset-0 z-[60] bg-[#C6FF3D] invisible"
      />
    </>
  );
}

/** Arriba (o al #hash) al instante, con Lenis sincronizado y los triggers recalculados para la página nueva. */
function resetScroll(hash: string) {
  // Triggers cuyo elemento ya no está en el DOM: quedaron colgados de la página anterior
  ScrollTrigger.getAll().forEach((st) => {
    const el = st.trigger;
    if (el && !el.isConnected) st.kill(true);
  });

  const lenis = getLenis();
  if (lenis) {
    lenis.resize();
    lenis.scrollTo(0, { immediate: true, force: true });
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }

  ScrollTrigger.refresh();

  if (hash) scrollToId(hash, { immediate: true });
}
