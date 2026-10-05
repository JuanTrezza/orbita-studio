import { useRef } from 'react';
import { gsap, MQ, SplitText, useGSAP } from '../lib/motion';

/**
 * Reveal enmascarado palabra por palabra para títulos de sección al entrar en el viewport.
 * SplitText vuelve a partir en resize / carga de fuentes y deja un aria-label con el texto completo.
 *
 * `splitKey` debe cambiar cuando cambia el texto del título y usarse también como `key`
 * del elemento: así React monta un elemento nuevo en vez de actualizar nodos de texto que
 * SplitText ya reemplazó, y el hook revierte el split anterior y parte el título nuevo.
 * Si el título ya se reveló, el nuevo aparece directamente, sin volver a animar.
 * (Se marca al completar: si fuentes o resize re-parten a mitad del reveal, SplitText
 * sincroniza la animación nueva con el progreso de la anterior.)
 */
export function useTitleReveal<T extends HTMLElement>(splitKey?: unknown) {
  const ref = useRef<T>(null);
  const revealed = useRef(false);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean };

        SplitText.create(el, {
          type: 'words',
          mask: 'words',
          wordsClass: 'reveal-word',
          autoSplit: true,
          onSplit: (self) => {
            if (revealed.current) return;
            return gsap.from(self.words, {
              yPercent: 120,
              duration: desktop ? 1.1 : 0.8,
              stagger: desktop ? 0.08 : 0.05,
              ease: 'expo.out',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
              onComplete: () => {
                revealed.current = true;
              },
            });
          },
        });
      });
    },
    { scope: ref, dependencies: [splitKey], revertOnUpdate: true }
  );

  return ref;
}
