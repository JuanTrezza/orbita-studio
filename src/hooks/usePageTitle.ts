import { useEffect } from 'react';

/**
 * Custom hook to update document title per page.
 * Enforces the exact format:
 *   "Nombre de sección — ÓRBITA Studio"
 *
 * Examples across the 4 screens:
 *   - "Inicio"          -> "Inicio — ÓRBITA Studio"
 *   - "Trabajos"        -> "Trabajos — ÓRBITA Studio"
 *   - "Caso de Estudio" -> "Caso de Estudio — ÓRBITA Studio"
 *   - "Estudio"         -> "Estudio — ÓRBITA Studio"
 */
export function usePageTitle(sectionName?: string): void {
  useEffect(() => {
    const prevTitle = document.title;
    if (!sectionName) {
      document.title = 'ÓRBITA Studio';
    } else if (sectionName.endsWith('— ÓRBITA Studio')) {
      document.title = sectionName;
    } else {
      document.title = `${sectionName} — ÓRBITA Studio`;
    }

    return () => {
      document.title = prevTitle;
    };
  }, [sectionName]);
}
