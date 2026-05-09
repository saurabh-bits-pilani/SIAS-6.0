/**
 * Vercel Routing Middleware — host-conditional 301 from the auto-generated
 * *.vercel.app aliases to the canonical production origin.
 *
 * Why this exists:
 *   The host-conditional redirect rules in `vercel.json` empirically do NOT
 *   fire for the auto-generated production alias `soul-infinity-liard.vercel.app`.
 *   Verification (after deploying ea0947a):
 *     curl -sI https://soul-infinity-liard.vercel.app/?cb=<random>
 *     → HTTP/2 200 (still serving the production HTML)
 *     → response headers lack the CSP, s-maxage=3600, and other custom
 *       headers that vercel.json `headers` rules apply on www.soulinfinity.space
 *   This indicates the alias bypasses the project's vercel.json
 *   redirects/headers entirely (likely pinned to an older deployment that
 *   pre-dates these rules, and Vercel's auto-alias system isn't routing
 *   it through the current deployment's config).
 *
 *   Routing Middleware runs at Vercel's edge BEFORE static routing and
 *   redirects config, so a host check here catches the alias regardless
 *   of how vercel.json is interpreted for it.
 *
 * Why at project root, not src/middleware.ts:
 *   This is a Vite SPA, not Next.js. Anything in `src/` is bundled into
 *   the client JS by Vite and would never run on Vercel's platform.
 *   Vercel's framework-agnostic Routing Middleware looks for `middleware.ts`
 *   at the project root.
 *
 * Defense-in-depth, not replacement:
 *   The vercel.json redirect rules remain in place for future deployments
 *   where the alias may pick up the routing config correctly. This file is
 *   the belt-and-suspenders that fires regardless.
 */

const ALIAS_HOSTS: ReadonlySet<string> = new Set([
  'soul-infinity-liard.vercel.app',
  'soul-infinitycom.vercel.app',
  'www.soul-infinitycom.vercel.app',
]);

const CANONICAL_ORIGIN = 'https://www.soulinfinity.space';

export const config = {
  matcher: '/:path*',
};

export default function middleware(request: Request): Response | undefined {
  const url = new URL(request.url);
  if (ALIAS_HOSTS.has(url.host)) {
    const target = `${CANONICAL_ORIGIN}${url.pathname}${url.search}`;
    return Response.redirect(target, 301);
  }
  return undefined;
}
