import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/motion';

/** Solo con mouse (no en pantallas táctiles) y sin reduced-motion. */
const POINTER_MQ = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
const INTERACTIVE = 'a, button, [role="button"], label, select, summary';
const VIDEO = '[data-cursor="video"]';

type CursorState = 'default' | 'link' | 'video';

const SIZES: Record<CursorState, number> = { default: 28, link: 52, video: 84 };

/**
 * Círculo que acompaña al puntero (la flecha del sistema sigue visible).
 * Lo mueve gsap.quickTo sobre refs, sin setState por movimiento. Crece sobre links y
 * botones y muestra "VER" sobre las cards de video (`data-cursor="video"`); si hay un
 * control dentro de un área de video (el player del caso), gana el control.
 */
export function Cursor(): React.ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(POINTER_MQ, () => {
      const root = rootRef.current;
      const ring = ringRef.current;
      const label = labelRef.current;
      if (!root || !ring || !label) return;

      gsap.set(root, { autoAlpha: 0 });
      const xTo = gsap.quickTo(root, 'x', { duration: 0.35, ease: 'power3.out' });
      const yTo = gsap.quickTo(root, 'y', { duration: 0.35, ease: 'power3.out' });

      let state: CursorState = 'default';
      let visible = false;
      let last: { x: number; y: number } | null = null;

      const setState = (next: CursorState) => {
        if (next === state) return;
        state = next;
        gsap.to(ring, {
          width: SIZES[next],
          height: SIZES[next],
          backgroundColor: next === 'video' ? 'rgba(198, 255, 61, 1)' : next === 'link' ? 'rgba(198, 255, 61, 0.12)' : 'rgba(198, 255, 61, 0)',
          duration: 0.35,
          ease: 'power3.out',
          overwrite: 'auto',
        });
        gsap.to(label, { autoAlpha: next === 'video' ? 1 : 0, duration: 0.2, overwrite: 'auto' });
      };

      const stateFor = (target: Element | null): CursorState => {
        if (!target) return 'default';
        const interactive = target.closest(INTERACTIVE);
        const video = target.closest(VIDEO);
        // La card de video es el link (o está dentro de él): "VER". Un botón dentro del video: crece.
        if (video && (!interactive || interactive === video || interactive.contains(video))) return 'video';
        return interactive ? 'link' : 'default';
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        last = { x: e.clientX, y: e.clientY };
        if (!visible) {
          visible = true;
          gsap.set(root, { x: e.clientX, y: e.clientY });
          gsap.to(root, { autoAlpha: 1, duration: 0.25, overwrite: 'auto' });
        }
        xTo(e.clientX);
        yTo(e.clientY);
        setState(stateFor(e.target as Element));
      };

      // Al scrollear (o al cambiar de página) cambia lo que hay debajo sin que el mouse se mueva
      const onScroll = () => {
        if (!last) return;
        setState(stateFor(document.elementFromPoint(last.x, last.y)));
      };

      const onLeave = () => {
        visible = false;
        gsap.to(root, { autoAlpha: 0, duration: 0.25, overwrite: 'auto' });
      };

      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
      document.documentElement.addEventListener('mouseleave', onLeave);

      return () => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('scroll', onScroll);
        document.documentElement.removeEventListener('mouseleave', onLeave);
      };
    });
  });

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[100] pointer-events-none invisible"
    >
      <div
        ref={ringRef}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-[#C6FF3D] flex items-center justify-center"
      >
        {/* Un poco arriba del centro, para que la flecha del sistema no lo tape */}
        <span
          ref={labelRef}
          className="-mt-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[#0E0F0C] invisible"
        >
          VER
        </span>
      </div>
    </div>
  );
}
