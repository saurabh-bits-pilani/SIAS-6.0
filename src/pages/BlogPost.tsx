/**
 * Dynamic blog post template (redesigned).
 *
 * Layout: dark navy hero (full-bleed) + cream two-column content section
 * (article + sticky right sidebar). Typography driven by the custom
 * `prose-blog` Tailwind variant defined in tailwind.config.js (sourced from
 * @tailwindcss/typography). Hero/sidebar/CTA visuals use the additive
 * `blog.*` color namespace, no impact on the existing primary/secondary/
 * accent palette used elsewhere on the site.
 *
 * Frontmatter still resolved from src/data/blog-manifest.json (built by
 * scripts/generate-blog-manifest.mjs as a `prebuild` step). MDX body still
 * compiled by @mdx-js/rollup. Schema injection (Article + FAQ + Person)
 * preserved verbatim from prior version.
 */

import { useEffect, useState, type ComponentType } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Calendar,
  Clock,
  User,
  BookOpen,
  Plus,
  ChevronDown,
  Twitter,
  Facebook,
  MessageCircle,
  Link2,
  Bookmark,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
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

const POST_MODULES = import.meta.glob<MdxModule>('../../content/blog/*.mdx', {
  eager: true,
});

const TEMPLATE_FILENAME = '_template.mdx';

const AUTHOR_PORTRAIT_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Brand/Saurabh/author-portrait-256.webp';

interface ResolvedPost {
  Content: ComponentType;
  fm: PostFrontmatter;
  slug: string;
}

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
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
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
    worksFor: { '@type': 'Organization', name: 'Soul Infinity Astro Solutions' },
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
      ? { '@type': 'ImageObject', url: fm.heroImage, width: 1200, height: 630 }
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
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

interface TocItem {
  id: string;
  text: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const resolved = resolvePost(slug);

  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  // Auto-generate TOC anchors after mount: query article H2s, slugify the
  // text, set each h2 id, populate the TOC list. Client-only; prerendered
  // HTML will not have the IDs (acceptable for v1, follow-up to migrate to
  // a build-time remark plugin tracked in scripts/blog-detail-redesign-status.md).
  useEffect(() => {
    if (!resolved) return;
    const headings = document.querySelectorAll('article.blog-content h2');
    const items: TocItem[] = [];
    headings.forEach((h) => {
      const text = h.textContent?.trim() ?? '';
      if (!text) return;
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      h.setAttribute('id', id);
      items.push({ id, text });
    });
    setTocItems(items);
  }, [resolved]);

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
  const canonicalUrl = `${SITE_ORIGIN}/blog/${resolvedSlug}`;

  const schemas: JsonLd[] = [buildArticleSchema(fm, resolvedSlug)];
  if (fm.faqs && fm.faqs.length > 0) schemas.push(buildFaqSchema(fm.faqs));
  if (fm.author === 'Saurabh Jain') schemas.push(buildSaurabhPersonSchema(fm.heroImage));

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch {
      // Silent failure: user can still copy the URL from the address bar.
    }
  };

  const formattedDate = format(new Date(fm.date), 'MMM dd, yyyy');
  const authorName = fm.author ?? 'Saurabh Jain';
  const category = fm.category ?? '';

  // Decorative SVG, dark hero left side. Constellation pattern, low opacity.
  const heroDecor = (
    <svg
      className="absolute top-1/2 -translate-y-1/2 left-0 w-[40%] h-[120%] opacity-30 pointer-events-none"
      viewBox="0 0 400 600"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {Array.from({ length: 40 }).map((_, i) => {
        const x = (i * 53) % 400;
        const y = (i * 71) % 600;
        const r = 1 + ((i * 7) % 10) / 10 * 1.5;
        return <circle key={`s-${i}`} cx={x} cy={y} r={r} fill="#FBBF24" opacity={0.5 + ((i * 13) % 10) / 20} />;
      })}
      {[
        [50, 80, 110, 130, 90, 200],
        [220, 150, 280, 220, 320, 180],
        [60, 350, 130, 410, 200, 380],
        [250, 450, 320, 480, 360, 530],
      ].map((line, i) => (
        <polyline
          key={`l-${i}`}
          points={`${line[0]},${line[1]} ${line[2]},${line[3]} ${line[4]},${line[5]}`}
          fill="none"
          stroke="#F59E0B"
          strokeWidth="0.4"
          opacity="0.4"
        />
      ))}
    </svg>
  );

  // Decorative SVG, used in the bottom CTA banner (top-right corner).
  const ctaDecorLarge = (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <circle cx="100" cy="100" r="80" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 4" />
      <circle cx="100" cy="100" r="60" fill="none" stroke="#F59E0B" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="40" fill="none" stroke="#F59E0B" strokeWidth="0.5" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + Math.cos(rad) * 40;
        const y1 = 100 + Math.sin(rad) * 40;
        const x2 = 100 + Math.cos(rad) * 80;
        const y2 = 100 + Math.sin(rad) * 80;
        return <line key={`r-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F59E0B" strokeWidth="0.5" />;
      })}
    </svg>
  );

  // Decorative SVG, sidebar dark CTA card.
  const ctaDecorSmall = (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <circle cx="100" cy="100" r="80" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 4" />
      <circle cx="100" cy="100" r="60" fill="none" stroke="#F59E0B" strokeWidth="0.5" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 100 + Math.cos(rad) * 80;
        const y = 100 + Math.sin(rad) * 80;
        return <circle key={`d-${i}`} cx={x} cy={y} r="3" fill="#F59E0B" />;
      })}
    </svg>
  );

  const tocList = (
    <>
      {tocItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="flex items-center gap-2 text-blog-ink hover:text-blog-red-warm transition-colors py-1 font-poppins text-sm"
        >
          <Plus className="w-4 h-4 text-blog-gold flex-shrink-0" aria-hidden="true" />
          <span>{item.text}</span>
        </a>
      ))}
    </>
  );

  return (
    <div className="bg-blog-cream-soft">
      <SEOHead
        title={`${fm.title} | Soul Infinity`}
        description={fm.excerpt ?? fm.title}
        keywords={(fm.tags ?? []).join(', ')}
        image={fm.heroImage}
        url={canonicalUrl}
        type="article"
        omitDefaultSchema
        schemas={schemas}
      />

      {/* ─────────── Hero ─────────── */}
      <section className="relative bg-blog-navy py-12 md:py-20 overflow-hidden">
        {heroDecor}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-8 lg:gap-12 items-center">
            {/* Left column: breadcrumb, pill, title, excerpt, meta, mobile hero */}
            <div>
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-blog-cream/70">
                  <li>
                    <Link to="/" className="hover:text-blog-gold transition-colors">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link to="/blog" className="hover:text-blog-gold transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-blog-gold">{category}</li>
                  <li aria-hidden="true">/</li>
                  <li className="text-blog-cream truncate max-w-xs" aria-current="page">
                    {fm.title}
                  </li>
                </ol>
              </nav>

              {category && (
                <div className="inline-flex items-center gap-1.5 bg-blog-gold text-blog-navy px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{category}</span>
                </div>
              )}

              <h1 className="font-sacramento text-blog-cream text-5xl md:text-6xl lg:text-7xl leading-tight mb-4">
                {fm.title}
              </h1>

              {fm.excerpt && (
                <p className="font-poppins text-blog-cream/80 text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
                  {fm.excerpt}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-6 text-blog-cream/70 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>8 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" aria-hidden="true" />
                  <span>{authorName}</span>
                </div>
              </div>

              {/* Mobile-only hero image */}
              {fm.heroImage && (
                <img
                  src={fm.heroImage}
                  alt={fm.heroImageAlt ?? fm.title}
                  width={1600}
                  height={1000}
                  loading="eager"
                  fetchpriority="high"
                  className="lg:hidden mt-8 w-full h-auto rounded-2xl shadow-2xl object-cover"
                />
              )}
            </div>

            {/* Right column: desktop hero image */}
            {fm.heroImage && (
              <div className="hidden lg:block">
                <img
                  src={fm.heroImage}
                  alt={fm.heroImageAlt ?? fm.title}
                  width={1600}
                  height={1000}
                  loading="eager"
                  fetchpriority="high"
                  className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────── Content + Sidebar ─────────── */}
      <section className="bg-blog-cream-soft py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12">
            {/* Left column: TOC, article body, FAQ, bottom CTA */}
            <div>
              {/* TOC desktop */}
              {tocItems.length > 0 && (
                <div className="hidden lg:block bg-blog-cream rounded-2xl border border-blog-gold/30 p-6 mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-blog-gold" aria-hidden="true" />
                    <span className="font-kalam font-bold text-lg text-blog-ink">
                      In This Article
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">{tocList}</div>
                </div>
              )}

              {/* TOC mobile */}
              {tocItems.length > 0 && (
                <details className="lg:hidden bg-blog-cream rounded-2xl border border-blog-gold/30 p-6 mb-8 group">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blog-gold" aria-hidden="true" />
                      <span className="font-kalam font-bold text-lg text-blog-ink">
                        In This Article
                      </span>
                    </div>
                    <ChevronDown
                      className="w-5 h-5 text-blog-gold transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="mt-4 space-y-2">{tocList}</div>
                </details>
              )}

              {/* Article body */}
              <article className="blog-content prose prose-blog max-w-none">
                <Content />
              </article>

              {/* FAQ */}
              {fm.faqs && fm.faqs.length > 0 && (
                <section className="my-12">
                  <h2 className="font-kalam font-bold text-3xl text-blog-ink mb-6 inline-block border-b-2 border-blog-gold pb-2">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-2">
                    {fm.faqs.map((faq, i) => (
                      <details key={i} className="group border-b border-blog-gold/30 py-4">
                        <summary className="flex items-center justify-between cursor-pointer list-none">
                          <span className="font-poppins font-semibold text-blog-ink text-lg pr-4">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className="w-5 h-5 text-blog-gold flex-shrink-0 transition-transform group-open:rotate-180"
                            aria-hidden="true"
                          />
                        </summary>
                        <div className="mt-3 text-blog-ink/80 leading-relaxed font-poppins">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* Bottom CTA banner */}
              <section className="my-12 bg-blog-navy rounded-2xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 opacity-20 pointer-events-none">
                  {ctaDecorLarge}
                </div>
                <div className="relative z-10">
                  <h2 className="font-sacramento text-3xl md:text-4xl text-blog-cream mb-3">
                    Want a Personalised Astrology Reading?
                  </h2>
                  <p className="text-blog-cream/80 mb-2 font-poppins">
                    Get clarity on your life path, challenges, and opportunities.
                  </p>
                  <p className="text-blog-cream/80 mb-6 font-poppins">
                    Saurabh Jain, Soul Infinity, K.N. Rao Institute trained, based in Ahmedabad.
                  </p>
                  <Link
                    to="/services/vedic-astrology"
                    className="inline-flex items-center gap-2 bg-blog-gold hover:bg-blog-gold-bright text-blog-navy font-semibold px-6 py-3 rounded-full transition-colors"
                  >
                    Book a Consultation
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </section>
            </div>

            {/* Right sidebar */}
            <aside className="lg:sticky lg:top-24 self-start space-y-6">
              {/* Share This Article */}
              <div>
                <h3 className="font-poppins font-semibold text-blog-ink text-lg mb-3">
                  Share This Article
                </h3>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(fm.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Twitter"
                    className="w-10 h-10 rounded-full bg-blog-gold hover:bg-blog-gold-bright transition-colors flex items-center justify-center"
                  >
                    <Twitter className="w-5 h-5 text-white" aria-hidden="true" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    className="w-10 h-10 rounded-full bg-blog-gold hover:bg-blog-gold-bright transition-colors flex items-center justify-center"
                  >
                    <Facebook className="w-5 h-5 text-white" aria-hidden="true" />
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(fm.title + ' ' + canonicalUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on WhatsApp"
                    className="w-10 h-10 rounded-full bg-blog-gold hover:bg-blog-gold-bright transition-colors flex items-center justify-center"
                  >
                    <MessageCircle className="w-5 h-5 text-white" aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    aria-label="Copy link"
                    className="w-10 h-10 rounded-full bg-blog-gold hover:bg-blog-gold-bright transition-colors flex items-center justify-center"
                  >
                    <Link2 className="w-5 h-5 text-white" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label="Bookmark"
                    className="w-10 h-10 rounded-full bg-blog-gold hover:bg-blog-gold-bright transition-colors flex items-center justify-center"
                  >
                    <Bookmark className="w-5 h-5 text-white" aria-hidden="true" />
                  </button>
                </div>
                {copyStatus === 'copied' && (
                  <p className="text-blog-red-warm text-xs mt-2 font-poppins">Copied!</p>
                )}
              </div>

              {/* Author card */}
              <div className="bg-blog-cream rounded-2xl border border-blog-gold/30 p-5">
                <h3 className="font-poppins font-semibold text-blog-ink mb-4">
                  About the Author
                </h3>
                <div className="flex items-start gap-4">
                  <img
                    src={AUTHOR_PORTRAIT_URL}
                    alt="Saurabh Jain"
                    width={64}
                    height={64}
                    loading="lazy"
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-blog-gold"
                  />
                  <div>
                    <p className="font-poppins font-semibold text-blog-ink mb-1">Saurabh Jain</p>
                    <p className="text-sm text-blog-ink/70 leading-relaxed font-poppins">
                      Founder, Soul Infinity. Trained at the Bharatiya Vidya Bhavan school of
                      astrology under the late Shri K.N. Rao. Based in Ahmedabad.
                    </p>
                  </div>
                </div>
                <Link
                  to="/blog"
                  className="block text-center mt-4 px-4 py-2 border border-blog-gold rounded-full text-blog-red-warm hover:bg-blog-gold hover:text-blog-navy transition-colors text-sm font-semibold font-poppins"
                >
                  View More Articles
                </Link>
              </div>

              {/* Dark CTA card */}
              <div className="bg-blog-navy rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none">
                  {ctaDecorSmall}
                </div>
                <div className="relative z-10">
                  <h3 className="font-sacramento text-2xl text-blog-cream mb-2">
                    Want Personalised Astrology Guidance?
                  </h3>
                  <p className="text-blog-cream/70 text-sm mb-4 font-poppins">
                    Get clarity on your life path, challenges, and opportunities with a personalized reading.
                  </p>
                  <Link
                    to="/services/vedic-astrology"
                    className="inline-flex items-center gap-2 bg-blog-gold hover:bg-blog-gold-bright text-blog-navy font-semibold px-5 py-2.5 rounded-full transition-colors text-sm font-poppins"
                  >
                    Book a Consultation
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
