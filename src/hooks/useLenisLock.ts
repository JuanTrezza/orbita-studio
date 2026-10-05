import { useEffect } from 'react';
import { lockScroll } from '../lib/motion';

/** Pausa Lenis mientras `active` es true, así los overlays conservan su propio scroll. */
export function useLenisLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    return lockScroll();
  }, [active]);
}
