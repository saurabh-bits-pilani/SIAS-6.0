/**
 * Dynamic blog post template.
 *
 * Future blog posts are added by dropping an MDX file into content/blog/.
 * The filename (sans extension) becomes the URL slug. Frontmatter is parsed
 * at build time by scripts/generate-blog-manifest.mjs and emitted to
 * src/data/blog-manifest.json (gitignored, regenerated on every build via the
 * `prebuild` npm lifecycle hook). The MDX body is compiled to a React
 * component by @mdx-js/rollup at build time.
 *
 * Why a build-time manifest instead of `import.meta.glob('...mdx', { query: '?raw' })`:
 *   @mdx-js/rollup's load hook intercepts the `?raw` query suffix and returns
 *   the compiled MDXContent component instead of raw text, which makes a
 *   runtime gray-matter call impossible. Pre-extracting frontmatter sidesteps
 *   the conflict entirely.
 *
 * The eager glob below loads compiled MDX modules; once the post count grows
 * past ~30, switch to lazy loading per-route.
 */

import { useParams, Link } from 'react-router-dom';
import { type ComponentType } from 'react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { SITE_ORIGIN, type JsonLd } from '../data/schema-entities';
import blogManifest from '../data/blog-manifest.json';

interface MdxModule {
  default: ComponentType;
}

interface FaqEntry {
  question: string;
  answer: string;
}

interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  lastModified?: string;
  author?: string;
  category?: string;
  tags?: readonly string[];
  excerpt?: string;
  heroImage?: string;
  heroImageAlt?: string;
  featured?: boolean;
  draft?: boolean;
  faqs?: readonly FaqEntry[];
}

const POST_FRONTMATTER = blogManifest as Record<string, PostFrontmatter>;

// Eager glob compiled MDX modules (default export = body component).
const POST_MODULES = import.meta.glob<MdxModule>('../../content/blog/*.mdx', {
  eager: true,
});

const TEMPLATE_FILENAME = '_template.mdx';

interface ResolvedPost {
  Content: ComponentType;
  fm: PostFrontmatter;
  slug: string;
}

/**
 * Resolve a slug into the compiled MDX component plus its frontmatter.
 * Returns null if the slug is missing, the file isn't bundled, or the post
 * isn't in the manifest (e.g. it's a draft or the template).
 */
function resolvePost(slug: string | undefined): ResolvedPost | null {
  if (!slug) return null;
  const fm = POST_FRONTMATTER[slug];
  if (!fm) return null;

  const targetBase = `${slug}.mdx`;
  for (const fullPath of Object.keys(POST_MODULES)) {
    const base = fullPath.split('/').pop() ?? '';
    if (base === TEMPLATE_FILENAME) continue;
    if (base !== targetBase) continue;
    const mod = POST_MODULES[fullPath];
    if (!mod) return null;
    return { Content: mod.default, fm, slug };
  }
  return null;
}

function buildFaqSchema(faqs: readonly FaqEntry[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

function buildSaurabhPersonSchema(heroImage: string | undefined): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Saurabh Jain',
    url: 'https://www.soulinfinity.space/',
    image: heroImage,
    jobTitle: 'Vedic Astrologer',
    worksFor: {
      '@type': 'Organization',
      name: 'Soul Infinity Astro Solutions',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'K.N. Rao Institute of Vedic Astrology',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
  };
}

function buildArticleSchema(fm: PostFrontmatter, slug: string): JsonLd {
  const url = `${SITE_ORIGIN}/blog/${slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: fm.title,
    url,
    image: fm.heroImage
      ? {
          '@type': 'ImageObject',
          url: fm.heroImage,
          width: 1200,
          height: 630,
        }
      : undefined,
    author: {
      '@type': 'Person',
      name: fm.author ?? 'Saurabh Jain',
      url: 'https://www.soulinfinity.space/cosmic-guide',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Soul Infinity',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Logo/Soul%20-Infinity-logo%201.png',
        width: 512,
        height: 512,
      },
    },
    datePublished: fm.date,
    dateModified: fm.lastModified ?? fm.date,
    description: fm.excerpt ?? '',
    inLanguage: 'en-IN',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const resolved = resolvePost(slug);

  if (!resolved) {
    return (
      <div className="bg-white">
        <SEOHead
          title="Post not found | Soul Infinity"
          description="The requested blog post could not be found."
        />
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: 'Not found' },
          ]}
        />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="font-heading font-bold text-3xl text-gray-900 mb-4">
            Post not found
          </h1>
          <p className="text-gray-700 mb-6">
            We could not find the blog post you are looking for. It may have been
            moved or has not been published yet.
          </p>
          <Link
            to="/blog"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-semibold"
          >
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const { Content, fm, slug: resolvedSlug } = resolved;
  const schemas: JsonLd[] = [buildArticleSchema(fm, resolvedSlug)];
  if (fm.faqs && fm.faqs.length > 0) {
    schemas.push(buildFaqSchema(fm.faqs));
  }
  if (fm.author === 'Saurabh Jain') {
    schemas.push(buildSaurabhPersonSchema(fm.heroImage));
  }

  return (
    <div className="bg-white">
      <SEOHead
        title={`${fm.title} | Soul Infinity`}
        description={fm.excerpt ?? fm.title}
        keywords={(fm.tags ?? []).join(', ')}
        image={fm.heroImage}
        url={`${SITE_ORIGIN}/blog/${resolvedSlug}`}
        type="article"
        omitDefaultSchema
        schemas={schemas}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: fm.title },
        ]}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {fm.category && (
          <div className="text-xs uppercase tracking-[0.2em] text-primary-600 font-semibold mb-3">
            {fm.category}
          </div>
        )}

        <h1 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-4 leading-tight">
          {fm.title}
        </h1>

        <div className="text-sm text-gray-500 mb-8">
          By {fm.author ?? 'Saurabh Jain'}
          <span className="mx-2">·</span>
          <time dateTime={fm.date}>{fm.date}</time>
          {fm.lastModified && fm.lastModified !== fm.date && (
            <>
              <span className="mx-2">·</span>
              <span>Updated {fm.lastModified}</span>
            </>
          )}
        </div>

        {fm.heroImage && (
          <img
            src={fm.heroImage}
            alt={fm.heroImageAlt ?? fm.title}
            width={1200}
            height={630}
            loading="eager"
            fetchpriority="high"
            className="w-full h-auto rounded-2xl shadow-md mb-10"
          />
        )}

        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          <Content />
        </div>
      </article>
    </div>
  );
}
