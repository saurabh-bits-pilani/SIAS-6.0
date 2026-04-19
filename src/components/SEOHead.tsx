import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getLocalBusinessSchema, SITE_ORIGIN, type JsonLd } from '../data/schema-entities';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  robots?: string;
  /**
   * Extra JSON-LD objects to emit alongside the default LocalBusiness schema.
   * Pages that render <SchemaMarkup /> can set `omitDefaultSchema` to true
   * to avoid duplicate emissions (SchemaMarkup already emits LocalBusiness
   * with the same @id, so duplicates merge cleanly, but omitting saves bytes).
   */
  schemas?: readonly JsonLd[];
  /** If true, skip the default LocalBusiness JSON-LD emission. */
  omitDefaultSchema?: boolean;
}

const SEOHead = ({
  title = 'Soul Infinity - Vedic Astrology & Spiritual Guidance by Saurabh Jain',
  description = 'Discover your cosmic path with Soul Infinity. Expert Vedic astrology, spiritual healing, and divine guidance by certified astrologer Saurabh Jain in Ahmedabad.',
  keywords = 'soul infinity, vedic astrology, saurabh jain, spiritual guidance, astrology ahmedabad, KP astrology, BNN, ashtakavarga, reiki healing, tarot reading',
  image = 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Logo/Soul%20-Infinity-logo%201.png',
  url,
  type = 'website',
  robots = 'index, follow, max-image-preview:large, max-snippet:-1',
  schemas,
  omitDefaultSchema = false,
}: SEOHeadProps) => {
  const location = useLocation();
  const resolvedUrl = url ?? `${SITE_ORIGIN}${location.pathname}${location.search}`;

  const allSchemas: JsonLd[] = [
    ...(omitDefaultSchema ? [] : [getLocalBusinessSchema()]),
    ...(schemas ?? []),
  ];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={resolvedUrl} />
      <meta property="og:type" content={type} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={resolvedUrl} />

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
