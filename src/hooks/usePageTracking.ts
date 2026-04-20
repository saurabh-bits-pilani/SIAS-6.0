import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

/**
 * Fires a GA4 page_view on every client-side route change.
 *
 * `initAnalytics()` already emits a page_view for the initial landing, so
 * this hook only fires when the path or search string actually changes.
 * Uses a small setTimeout to let React Helmet commit the new
 * `<title>` first, so GA records the right title for the route.
 */
export function usePageTracking(): void {
  const { pathname, search } = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const path = pathname + search;
    if (lastPath.current === path) return;
    const isInitial = lastPath.current === null;
    lastPath.current = path;
    if (isInitial) return; // initial page_view fired by initAnalytics

    // Defer so Helmet-applied <title> for the new route is in place.
    const id = window.setTimeout(() => {
      trackPageView(path, document.title);
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname, search]);
}
