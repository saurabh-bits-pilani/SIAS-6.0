import { IS_STAGING } from '../config/site';

/**
 * Small floating "STAGING" pill in the top-right corner. Renders only when
 * VITE_SITE_ENV === 'staging'. Purely a visual reminder for human viewers
 * that the page is not production.
 */
export default function StagingBanner() {
  if (!IS_STAGING) return null;
  return (
    <div
      role="status"
      aria-label="Staging environment"
      className="fixed top-3 right-3 z-[100] pointer-events-none select-none"
    >
      <span className="inline-flex items-center gap-1.5 bg-yellow-500/90 text-yellow-950 text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full shadow-md backdrop-blur-sm">
        <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-yellow-950 animate-pulse" />
        Staging
      </span>
    </div>
  );
}
