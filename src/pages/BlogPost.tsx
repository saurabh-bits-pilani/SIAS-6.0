/**
 * Dynamic blog post template.
 *
 * Future blog posts are added by dropping an MDX file into content/blog/.
 * The filename (sans extension) becomes the URL slug. Frontmatter is parsed
 * with gray-matter from the raw file content; MDX body is compiled to a
 * React component by @mdx-js/rollup at build time.
 *
 * Both globs use eager loading so content is bundled at build time and
 * available synchronously during SSR prerender. Once the post count grows
 * past ~30, switch to lazy loading per-route.
 */

import { useParams, Link } from 'react-router-dom';
import { type ComponentType } from 'react';
import matter from 'gray-matter';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { SITE_ORIGIN, type JsonLd } from '../data/schema-entities';

interface MdxModule {
  default: ComponentType;
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
}

// Eager glob compiled MDX modules (default export = body component).
const POST_MODULES = import.meta.glob<MdxModule>('../../content/blog/*.mdx', {
  eager: true,
});

// Eager glob raw text (for gray-matter frontmatter parsing).
const POST_RAW = import.meta.glob<string>('../../content/blog/*.mdx', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const TEMPLATE_FILENAME = '_template.mdx';

interface ResolvedPost {
  Content: ComponentType;
  fm: PostFrontmatter;
  slug: string;
}

/** Map URL slug -> module path -> { Content, frontmatter }. */
function resolvePost(slug: string | undefined): ResolvedPost | null {
  if (!slug) return null;
  const targetBase = `${slug}.mdx`;
  for (const fullPath of Object.keys(POST_MODULES)) {
    const base = fullPath.split('/').pop() ?? '';
    if (base === TEMPLATE_FILENAME) continue;
    if (base !== targetBase) continue;
    const mod = POST_MODULES[fullPath];
    const raw = POST_RAW[fullPath];
    if (!mod || !raw) return null;
    const { data } = matter(raw);
    const fm = data as PostFrontmatter;
    if (fm.draft) return null;
    return { Content: mod.default, fm, slug };
  }
  return null;
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
  const articleSchema = buildArticleSchema(fm, resolvedSlug);

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
        schemas={[articleSchema]}
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
