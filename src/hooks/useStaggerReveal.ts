import { useRef } from 'react';
import { afterPageReveal, gsap, MQ, ScrollTrigger, useGSAP } from '../lib/motion';

/**
 * Entrada escalonada de los ítems de un grid a medida que entran en el viewport.
 * Cuando cambia alguna de `dependencies` (filtro, orden, vista) se revierte y vuelve
 * a correr, así la entrada se repite con los ítems nuevos. Con prefers-reduced-motion
 * no se crea. Solo anima opacidad y desplazamiento: los ítems siguen siendo focuseables.
 */
export function useStaggerReveal<T extends HTMLElement>(
  selector = ':scope > *',
  dependencies: unknown[] = []
) {
  const ref = useRef<T>(null);

  useGSAP(
    (_context, contextSafe) => {
      const container = ref.current;
      if (!container) return;

      return afterPageReveal(
        contextSafe!(() => {
          const items = gsap.utils.toArray<HTMLElement>(selector, container);
          if (!items.length) return;

          const mm = gsap.matchMedia();
          mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
            const { desktop } = ctx.conditions as { desktop: boolean };

            gsap.killTweensOf(items);
            gsap.set(items, { opacity: 0, y: desktop ? 60 : 30 });

            ScrollTrigger.batch(items, {
              start: 'top 92%',
              once: true,
              // Tween común (no contextSafe): onEnter puede dispararse sincrónico dentro del
              // contexto de matchMedia, y anidar ahí el contexto externo crea un ciclo en GSAP
              onEnter: (batch) => {
                gsap.to(batch, {
                  opacity: 1,
                  y: 0,
                  duration: desktop ? 0.9 : 0.6,
                  stagger: desktop ? 0.08 : 0.05,
                  ease: 'expo.out',
                  overwrite: true,
                });
              },
            });

            return () => gsap.killTweensOf(items);
          });
        })
      );
    },
    { scope: ref, dependencies, revertOnUpdate: true }
  );

  return ref;
}
