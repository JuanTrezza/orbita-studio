import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLenis } from '../lib/motion';

/**
 * Ensures the viewport resets to the top when navigating to a new route.
 * Uses Lenis (instantly) when it's active so its internal position stays in sync.
 */
export function ScrollToTop(): null {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
      return;
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [pathname, search]);

  return null;
}
