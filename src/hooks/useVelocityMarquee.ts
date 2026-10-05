import { useRef } from 'react';
import { gsap, MQ, onScroll, useGSAP } from '../lib/motion';

interface VelocityMarqueeOptions {
  /** Segundos por vuelta completa en reposo */
  duration: number;
  /** xPercent que recorre cada `[data-marquee-track]` por vuelta (-100 para track original + clon, -50 para un único track duplicado) */
  shift: number;
  /** Frena el marquee suavemente mientras tiene el mouse encima */
  pauseOnHover?: boolean;
  /** Recorre de `shift` a 0 en vez de 0 a `shift` (fila que corre hacia el otro lado) */
  reverse?: boolean;
}

/**
 * Marquee infinito cuya velocidad sigue a la del scroll y que invierte el sentido
 * al scrollear hacia arriba. Con prefers-reduced-motion no se crea (queda quieto).
 */
export function useVelocityMarquee<T extends HTMLElement>({
  duration,
  shift,
  pauseOnHover = false,
  reverse = false,
}: VelocityMarqueeOptions) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const container = ref.current;
      if (!container) return;
      const tracks = gsap.utils.toArray<HTMLElement>('[data-marquee-track]', container);

      const mm = gsap.matchMedia();
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean };
        const velocityFactor = desktop ? 0.25 : 0.1;
        const maxBoost = desktop ? 6 : 3;

        const loop = gsap.fromTo(
          tracks,
          { xPercent: reverse ? shift : 0 },
          {
            xPercent: reverse ? 0 : shift,
            duration,
            ease: 'none',
            repeat: -1,
            // Seguir en loop cuando el tiempo corre hacia atrás (scroll hacia arriba)
            onReverseComplete: () => {
              loop.totalTime(loop.duration() * 100);
            },
          }
        );

        const speed = { value: 1 };
        const setSpeed = gsap.quickTo(speed, 'value', {
          duration: 0.6,
          ease: 'power3.out',
          onUpdate: () => {
            loop.timeScale(speed.value);
          },
        });

        let velocity = 0;
        let direction = 1;
        let hovered = false;

        const unsubscribe = onScroll((state) => {
          velocity = state.velocity;
          if (state.direction !== 0) direction = state.direction;
        });

        const tick = () => {
          const boost = Math.min(Math.abs(velocity) * velocityFactor, maxBoost);
          setSpeed(hovered ? 0 : direction * (1 + boost));
          velocity *= 0.9;
        };
        gsap.ticker.add(tick);

        const onEnter = () => {
          hovered = true;
        };
        const onLeave = () => {
          hovered = false;
        };
        if (pauseOnHover) {
          container.addEventListener('mouseenter', onEnter);
          container.addEventListener('mouseleave', onLeave);
        }

        return () => {
          unsubscribe();
          gsap.ticker.remove(tick);
          container.removeEventListener('mouseenter', onEnter);
          container.removeEventListener('mouseleave', onLeave);
        };
      });
    },
    { scope: ref }
  );

  return ref;
}
