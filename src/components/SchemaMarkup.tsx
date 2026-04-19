import { Helmet } from 'react-helmet-async';
import {
  getAboutPageSchema,
  getArticleSchema,
  getBlogSchema,
  getBreadcrumbSchema,
  getContactPageSchema,
  getFaqPageSchema,
  getLocalBusinessSchema,
  getOrganizationSchema,
  getPersonSaurabhSchema,
  getServiceSchema,
  getServicesItemListSchema,
  getWebPageSchema,
  getWebsiteSchema,
  SITE_ORIGIN,
  type BlogPostMeta,
  type BreadcrumbCrumb,
  type JsonLd,
  type ServiceEntry,
  type ServiceOfferOpts,
} from '../data/schema-entities';

export type SchemaPageType =
  | 'home'
  | 'services-list'
  | 'service-detail'
  | 'service-category'
  | 'blog-list'
  | 'blog-post'
  | 'contact'
  | 'cosmic-guide'
  | 'panchang'
  | 'webpage';

interface SchemaMarkupProps {
  type: SchemaPageType;
  /** Required for `service-detail`. */
  service?: ServiceEntry;
  /** Optional pricing/duration for `service-detail` Offer schema. */
  serviceOffer?: ServiceOfferOpts;
  /** Required for `blog-post`. */
  post?: BlogPostMeta;
  /** Auto-constructed for known types, but can be overridden. */
  breadcrumbs?: readonly BreadcrumbCrumb[];
  /** For `webpage` type, the page descriptor. */
  webPage?: { name: string; description: string; url: string };
}

/**
 * Base entities emitted on every page (so crawlers can resolve @id references
 * no matter which page they land on first). Keep this set minimal — just
 * the global identity graph. Page-specific schemas are appended per `type`.
 */
function baseEntities(): JsonLd[] {
  return [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getPersonSaurabhSchema(),
    getWebsiteSchema(),
  ];
}

function schemasForType(props: SchemaMarkupProps): JsonLd[] {
  const out: JsonLd[] = baseEntities();

  switch (props.type) {
    case 'home':
      // Home gets only the base identity graph + optional breadcrumbs.
      // (No BreadcrumbList for the root itself.)
      break;

    case 'services-list':
      out.push(getServicesItemListSchema());
      out.push(
        props.breadcrumbs
          ? getBreadcrumbSchema(props.breadcrumbs)
          : getBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Services', url: '/services' },
            ]),
      );
      break;

    case 'service-category': {
      if (!props.webPage) {
        throw new Error('SchemaMarkup: type="service-category" requires webPage prop');
      }
      out.push(getWebPageSchema(props.webPage));
      out.push(
        props.breadcrumbs
          ? getBreadcrumbSchema(props.breadcrumbs)
          : getBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Services', url: '/services' },
              { name: props.webPage.name, url: props.webPage.url },
            ]),
      );
      break;
    }

    case 'service-detail': {
      if (!props.service) {
        throw new Error('SchemaMarkup: type="service-detail" requires service prop');
      }
      const { service } = props;
      out.push(getServiceSchema(service, props.serviceOffer));
      out.push(
        props.breadcrumbs
          ? getBreadcrumbSchema(props.breadcrumbs)
          : getBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Services', url: '/services' },
              { name: service.categoryName, url: `/services/${service.category}` },
              {
                name: service.title,
                url: `/services/${service.category}/${service.slug}`,
              },
            ]),
      );
      break;
    }

    case 'blog-list':
      out.push(getBlogSchema());
      out.push(
        props.breadcrumbs
          ? getBreadcrumbSchema(props.breadcrumbs)
          : getBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Blog', url: '/blog' },
            ]),
      );
      break;

    case 'blog-post': {
      if (!props.post) {
        throw new Error('SchemaMarkup: type="blog-post" requires post prop');
      }
      const { post } = props;
      out.push(getArticleSchema(post));
      const absPostUrl = post.url.startsWith('http') ? post.url : `${SITE_ORIGIN}${post.url}`;
      out.push(
        props.breadcrumbs
          ? getBreadcrumbSchema(props.breadcrumbs)
          : getBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Blog', url: '/blog' },
              { name: post.headline, url: absPostUrl },
            ]),
      );
      break;
    }

    case 'contact':
      out.push(getContactPageSchema());
      // FAQPage emitted only here — this is the only page where the 5 Q&As
      // are visibly rendered (see Contact.tsx). Emitting FAQPage on pages
      // without visible Q&As risks a Google manual action.
      out.push(getFaqPageSchema());
      out.push(
        props.breadcrumbs
          ? getBreadcrumbSchema(props.breadcrumbs)
          : getBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Contact', url: '/contact' },
            ]),
      );
      break;

    case 'cosmic-guide':
      out.push(getAboutPageSchema());
      out.push(
        props.breadcrumbs
          ? getBreadcrumbSchema(props.breadcrumbs)
          : getBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Our Cosmic Guide', url: '/cosmic-guide' },
            ]),
      );
      break;

    case 'panchang':
      out.push(
        getWebPageSchema({
          name: 'Daily Panchang — Tithi, Nakshatra, Yoga, Karana',
          description:
            'Daily Panchang with Tithi, Nakshatra, Yoga, Karana, sunrise and sunset timings. A traditional Hindu calendar reference for auspicious timing.',
          url: '/panchang',
        }),
      );
      out.push(
        props.breadcrumbs
          ? getBreadcrumbSchema(props.breadcrumbs)
          : getBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Panchang', url: '/panchang' },
            ]),
      );
      break;

    case 'webpage': {
      if (!props.webPage) {
        throw new Error('SchemaMarkup: type="webpage" requires webPage prop');
      }
      out.push(getWebPageSchema(props.webPage));
      if (props.breadcrumbs) out.push(getBreadcrumbSchema(props.breadcrumbs));
      break;
    }
  }

  return out;
}

/**
 * Injects a page-appropriate bundle of schema.org JSON-LD via react-helmet-async.
 * Emits the global identity graph (Organization / LocalBusiness / Person /
 * WebSite) on every page plus type-specific schemas layered on top. All
 * schemas are connected via @id references declared in schema-entities.ts.
 */
export default function SchemaMarkup(props: SchemaMarkupProps) {
  const schemas = schemasForType(props);
  return (
    <Helmet>
      {schemas.map((schema, i) => (
        <script key={`sm-${i}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
