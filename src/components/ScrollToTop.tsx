import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Ensures the viewport resets to the top when navigating to a new route.
 */
export function ScrollToTop(): null {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [pathname, search]);

  return null;
}
