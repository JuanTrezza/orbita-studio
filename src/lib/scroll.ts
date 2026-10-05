/**
 * Smoothly scrolls to an element by its ID without adding scroll-smooth to <html>
 * and respecting user prefers-reduced-motion settings.
 */
export function scrollToId(id: string, offset = 80): void {
  const element = document.getElementById(id);
  if (!element) return;

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const behavior: ScrollBehavior = mediaQuery.matches ? 'auto' : 'smooth';

  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const targetPosition = Math.max(0, elementPosition - offset);

  window.scrollTo({
    top: targetPosition,
    behavior,
  });
}
