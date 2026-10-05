import { useEffect } from 'react';
import { initSmoothScroll } from '../lib/motion';

/** Monta el scroll suave global (Lenis) durante toda la vida de la app. */
export function useSmoothScroll() {
  useEffect(() => initSmoothScroll(), []);
}
