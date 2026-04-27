import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getLocalBusinessSchema, SITE_ORIGIN, type JsonLd } from '../data/schema-entities';
import { IS_STAGING } from '../config/site';

type TwitterCard = 'summary' | 'summary_large_image' | 'app' | 'player';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  /** OG + Twitter image. Use 1200x630 for best rendering. */
  image?: string;
  /** Absolute canonical URL. If omitted, built from SITE_ORIGIN + current path. */
  url?: string;
  /** og:type (e.g. "website", "article"). Default "website". */
  type?: string;
  /** Full robots directive. Overridden by `noindex` when `noindex` is true. */
  robots?: string;
  /** Convenience: when true, emits `noindex, follow` (overrides `robots`). */
  noindex?: boolean;
  /** Twitter card type. Default "summary_large_image". */
  twitterCard?: TwitterCard;
  /** Extra JSON-LD objects to emit alongside the default LocalBusiness schema. */
  schemas?: readonly JsonLd[];
  /** If true, skip the default LocalBusiness JSON-LD emission. */
  omitDefaultSchema?: boolean;
}

const DEFAULT_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
const NOINDEX_ROBOTS = 'noindex, follow';
// Staging environment blanket directive, applied to every route regardless
// of per-page `robots`/`noindex` props. Keeps staging out of every crawler
// index, including archives and snippets.
const STAGING_ROBOTS = 'noindex, nofollow, noarchive, nosnippet';

const SEOHead = ({
  title = 'Soul Infinity - Vedic Astrology & Spiritual Guidance by Saurabh Jain',
  description = 'Discover your cosmic path with Soul Infinity. Expert Vedic astrology, spiritual healing, and divine guidance by certified astrologer Saurabh Jain in Ahmedabad.',
  keywords = 'soul infinity, vedic astrology, saurabh jain, spiritual guidance, astrology ahmedabad, KP astrology, BNN, ashtakavarga, reiki healing, tarot reading',
  image = 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Logo/Soul%20-Infinity-logo%201.png',
  url,
  type = 'website',
  robots,
  noindex = false,
  twitterCard = 'summary_large_image',
  schemas,
  omitDefaultSchema = false,
}: SEOHeadProps) => {
  const location = useLocation();
  // Canonical: SITE_ORIGIN + current path, with trailing slash stripped
  // except for the root.
  const pathname = location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '');
  const resolvedUrl = url ?? `${SITE_ORIGIN}${pathname}${location.search}`;

  // Staging overrides everything. Otherwise: explicit `noindex` prop beats
  // `robots`, which beats the site-wide default.
  const resolvedRobots = IS_STAGING
    ? STAGING_ROBOTS
    : noindex
      ? NOINDEX_ROBOTS
      : (robots ?? DEFAULT_ROBOTS);

  const allSchemas: JsonLd[] = [
    ...(omitDefaultSchema ? [] : [getLocalBusinessSchema()]),
    ...(schemas ?? []),
  ];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={resolvedRobots} />
      <meta name="author" content="Saurabh Jain" />

      {/* Open Graph */}
      <meta property="og:site_name" content="Soul Infinity" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={resolvedUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical + hreflang */}
      <link rel="canonical" href={resolvedUrl} />
      <link rel="alternate" hrefLang="en-in" href={resolvedUrl} />
      <link rel="alternate" hrefLang="x-default" href={resolvedUrl} />

      {/* JSON-LD Structured Data */}
      {allSchemas.map((schema, i) => (
        <script key={`ld-${i}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
