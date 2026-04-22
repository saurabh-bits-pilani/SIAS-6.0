import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import {
  IconSparkles,
  IconStar,
  IconHome,
  IconCrown,
  IconClock,
  IconLeaf,
  IconHeartHandshake,
  IconUserCircle,
  IconSun,
  IconMoon,
  IconVenus,
  IconDroplet,
  IconDiamond,
  IconCalendar,
  IconHeart,
  IconGift,
  IconCompass,
  IconCircle,
  IconArrowUp,
  IconArrowDown,
  IconZodiacCancer,
  IconYoga,
  IconBook,
  IconPaperclip,
  IconFlame,
  IconPlanet,
  type Icon as TablerIconType,
} from '@tabler/icons-react';
import SEOHead from '../SEOHead';
import SchemaMarkup from '../SchemaMarkup';
import Breadcrumbs from '../Breadcrumbs';
import {
  getArticleSchema,
  getFaqPageSchemaFromList,
  type JsonLd,
} from '../../data/schema-entities';

/* ────────────────────────── Shared types ────────────────────────── */

/**
 * String keys map to Tabler icon components via ICON_MAP below. Data files
 * reference icons by key so the data stays serialisable and planet-page
 * authors never touch the layout source.
 */
export type IconKey =
  | 'sparkles'
  | 'star'
  | 'home'
  | 'crown'
  | 'clock'
  | 'leaf'
  | 'heart-handshake'
  | 'user-circle'
  | 'sun'
  | 'moon'
  | 'venus'
  | 'droplet'
  | 'diamond'
  | 'calendar'
  | 'heart'
  | 'gift'
  | 'compass'
  | 'circle'
  | 'arrow-up'
  | 'arrow-down'
  | 'zodiac-cancer'
  | 'yoga'
  | 'book'
  | 'flame'
  | 'planet';

const ICON_MAP: Record<IconKey, TablerIconType> = {
  sparkles: IconSparkles,
  star: IconStar,
  home: IconHome,
  crown: IconCrown,
  clock: IconClock,
  leaf: IconLeaf,
  'heart-handshake': IconHeartHandshake,
  'user-circle': IconUserCircle,
  sun: IconSun,
  moon: IconMoon,
  venus: IconVenus,
  droplet: IconDroplet,
  diamond: IconDiamond,
  calendar: IconCalendar,
  heart: IconHeart,
  gift: IconGift,
  compass: IconCompass,
  circle: IconCircle,
  'arrow-up': IconArrowUp,
  'arrow-down': IconArrowDown,
  'zodiac-cancer': IconZodiacCancer,
  yoga: IconYoga,
  book: IconBook,
  flame: IconFlame,
  planet: IconPlanet,
};

function TIcon({
  name,
  size = 20,
  className = '',
}: {
  name: IconKey;
  size?: number;
  className?: string;
}) {
  const Cmp = ICON_MAP[name];
  return <Cmp size={size} className={className} aria-hidden="true" />;
}

export interface QuickFact {
  icon: IconKey;
  label: string;
  value: string;
}

export interface Mantra {
  title: string;
  /** Optional phrases within the title to wrap in Mark */
  titleHighlight?: string;
  devanagari: string;
  iast: string;
  meaning: string;
  /** Phrases in `meaning` to wrap in Mark, in order. Case-sensitive literal. */
  meaningHighlights?: readonly string[];
  /** If true, wrap "ॐ" symbol in a red pen-circle (.circle-mark). */
  circleOm?: boolean;
}

export interface LifeRow {
  icon: IconKey;
  label: string;
  value: string;
  /** Phrases within `value` to wrap in Mark (case-sensitive). */
  valueHighlights?: readonly string[];
}

export interface Benefit {
  text: string;
  highlights?: readonly string[];
}

export interface ConnectStep {
  icon: IconKey;
  text: string;
}

export interface Gemstone {
  name: string;
  sanskrit: string;
  imageUrl: string;
  imageAlt: string;
  caption: string;
  /** Accent glow behind the gem photo. Use a CSS `filter` drop-shadow. */
  glowFilter: string;
  /** Accent doodle rendered below the gem label (PNG/WebP). */
  accentDoodleUrl?: string;
  accentDoodleAlt?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface RelatedLink {
  href: string;
  title: string;
  blurb: string;
}

export interface PlanetMeta {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonicalPath: string;
  articleHeadline: string;
  articleDatePublished: string;
  articleDateModified: string;
  articleKeywords: readonly string[];
  /** Visible webpage name for SchemaMarkup (e.g. "Chandra (Moon) in Vedic Astrology"). */
  webpageName: string;
  /** Last breadcrumb label, e.g. "Moon (Chandra)". */
  breadcrumbLabel: string;
}

export interface Theme {
  /** Tailwind color family for hero title + accents: "yellow" | "blue" | "red" | etc. */
  accentFamily: string;
  /** Accent color hex for the gradient under section dividers. */
  accentHex: string;
  /** Hero background radial-gradient color (rgba). */
  heroRadialRgba: string;
  /** Dark gradient stops for hero section. */
  darkGradientFrom: string;
  darkGradientTo: string;
  /** Hero title color class, e.g. "text-yellow-400". */
  heroTitleClass: string;
  /** Hero title text-shadow (for golden/blue glow behind the big title). */
  heroTitleShadow: string;
  /** Footer caption color class (typically lighter variant). */
  footerCaptionClass: string;
  /** Ring color on hero image, e.g. "ring-yellow-400/20". */
  heroImageRingClass: string;
  /** Hero image inner glow color (rgba). */
  heroImageGlowRgba: string;
}

/**
 * Closing shloka at the footer of the visual hero area (3-column strip).
 * e.g. for Sun: "Lead me from darkness to light." (tamaso ma jyotirgamaya).
 */
export interface ClosingShloka {
  left: string;
  devanagari: string;
  translation: string;
}

export interface MidBreak {
  imageUrl: string;
  imageAlt: string;
  caption: string;
}

export interface DoodleUrls {
  /** Planet-specific primary doodle (e.g. doodle-sun.png, doodle-moon.webp). */
  primary: string;
  /** Secondary doodle , often a sign-specific accent (lion, crab, etc). */
  secondary: string;
  /** Small tertiary accent, usually star-accent.svg or similar. */
  tertiary: string;
  /** Parchment texture URL used as background for all cards. */
  parchmentTextureUrl: string;
  /** Quick-facts icon URLs (relative filenames inside same R2 prefix or full URLs). */
  quickFactIconBase: string;
  /** Life-row icon URLs base , defaults to quickFactIconBase. */
  lifeRowIconBase?: string;
  /** Footer SVGs (om, diya, star-accent) base. */
  footerDecorBase: string;
}

export interface PlanetPageData {
  meta: PlanetMeta;
  name: {
    english: string;
    sanskrit: string;
    devanagari: string;
  };
  tagline: string;
  hero: {
    description: string;
    /** Words/phrases in `description` to wrap in Mark, in order. Case-sensitive. */
    descriptionHighlights: readonly string[];
    imageUrl: string;
    imageAlt: string;
  };
  theme: Theme;
  quickFacts: readonly QuickFact[];
  mantras: readonly Mantra[];
  mantrasTitle: string;
  lifeRows: readonly LifeRow[];
  lifeCardTitle: string;
  benefits: readonly Benefit[];
  benefitsTitle: string;
  midBreak: MidBreak;
  howToConnect: readonly ConnectStep[];
  howToConnectTitle: string;
  gemstone: Gemstone;
  affirmation: {
    text: string;
    highlights: readonly string[];
  };
  closingShloka: ClosingShloka;
  doodles: DoodleUrls;
  faqs: readonly FaqItem[];
  related: readonly RelatedLink[];
  seoBody: React.ReactNode;
  /** e.g. "Surya" or "Chandra" , the short personal name the CTA uses. */
  ctaName: string;
  /** Headline above the CTA buttons. */
  ctaHeadline: string;
  /** Supporting line under the CTA headline. */
  ctaSubline: string;
}

/* ────────────────────────── Shared helpers ────────────────────────── */

/**
 * Wraps occurrences of each highlight phrase (in order) within `text` in a
 * <Mark>. Phrases are replaced left-to-right and the remaining string is
 * searched for the next phrase. Unmatched phrases are ignored silently
 * (so data-side typos don't crash the page).
 */
function renderWithMarks(
  text: string,
  highlights: readonly string[] | undefined,
): React.ReactNode {
  if (!highlights || highlights.length === 0) return text;
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyCounter = 0;
  for (const phrase of highlights) {
    const i = remaining.indexOf(phrase);
    if (i < 0) continue;
    if (i > 0) parts.push(remaining.slice(0, i));
    parts.push(
      <mark
        key={`m-${keyCounter++}`}
        className="highlight-marker bg-transparent text-inherit"
      >
        {phrase}
      </mark>,
    );
    remaining = remaining.slice(i + phrase.length);
  }
  if (remaining) parts.push(remaining);
  return parts;
}

function Mark({ children }: { children: React.ReactNode }) {
  return <mark className="highlight-marker bg-transparent text-inherit">{children}</mark>;
}

function ParchmentCard({
  children,
  className = '',
  rotation = '',
  parchmentUrl,
}: {
  children: React.ReactNode;
  className?: string;
  rotation?: string;
  parchmentUrl: string;
}) {
  return (
    <div
      className={`relative rounded-xl border border-amber-900/20 p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${rotation} ${className}`}
      style={{
        backgroundImage: `url(${parchmentUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#fdf6e3',
      }}
    >
      {children}
    </div>
  );
}

/** Wrap every "ॐ" in the given Devanagari string with a red pen-circle. */
function renderDevanagariWithCircleOm(text: string): React.ReactNode {
  const OM = 'ॐ'; // ॐ
  if (!text.includes(OM)) return text;
  const parts: React.ReactNode[] = [];
  let i = 0;
  let k = 0;
  while (i < text.length) {
    const idx = text.indexOf(OM, i);
    if (idx < 0) {
      parts.push(text.slice(i));
      break;
    }
    if (idx > i) parts.push(text.slice(i, idx));
    parts.push(
      <span key={`om-${k++}`} className="circle-mark mx-1 text-red-700">
        {OM}
      </span>,
    );
    i = idx + OM.length;
  }
  return parts;
}

/* ────────────────────────── Main layout ────────────────────────── */

export default function PlanetPageLayout(props: PlanetPageData) {
  const {
    meta,
    name,
    tagline,
    hero,
    theme,
    quickFacts,
    mantras,
    mantrasTitle,
    lifeRows,
    lifeCardTitle,
    benefits,
    benefitsTitle,
    midBreak,
    howToConnect,
    howToConnectTitle,
    gemstone,
    affirmation,
    closingShloka,
    doodles,
    faqs,
    related,
    seoBody,
    ctaName,
    ctaHeadline,
    ctaSubline,
  } = props;

  const articleSchema: JsonLd = getArticleSchema({
    headline: meta.articleHeadline,
    description: meta.description,
    image: hero.imageUrl,
    datePublished: meta.articleDatePublished,
    dateModified: meta.articleDateModified,
    url: meta.canonicalPath,
    articleSection: 'Vedic Astrology',
    keywords: meta.articleKeywords,
  });

  return (
    <div className="bg-white">
      <SEOHead
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        image={meta.ogImage}
        type="article"
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: meta.webpageName,
          description: meta.description,
          url: meta.canonicalPath,
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Planets', url: '/planets' },
          { name: meta.breadcrumbLabel, url: meta.canonicalPath },
        ]}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">
          {JSON.stringify(getFaqPageSchemaFromList(faqs))}
        </script>
      </Helmet>

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Planets', href: '/planets' },
          { label: meta.breadcrumbLabel },
        ]}
      />

      {/* ───────────── Hero ───────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, ${theme.heroRadialRgba}, transparent 55%), linear-gradient(to bottom, ${theme.darkGradientFrom} 0%, ${theme.darkGradientTo} 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="relative">
              <h1
                className={`font-sacramento text-8xl md:text-9xl leading-none ${theme.heroTitleClass}`}
                style={{ textShadow: theme.heroTitleShadow }}
              >
                {name.english === 'Moon' || name.english === 'Sun'
                  ? name.sanskrit
                  : name.english}
              </h1>
              <img
                src={doodles.primary}
                alt=""
                width={48}
                height={48}
                loading="eager"
                className="absolute -top-2 right-6 md:right-10 w-12 h-12 rotate-12 opacity-90 pointer-events-none"
                aria-hidden="true"
              />
              <p className="font-devanagari text-3xl text-white/80 mt-2">
                {name.devanagari}
              </p>
              <p className="font-caveat text-3xl text-white/90 mt-3">{tagline}</p>
              <p className="font-poppins text-base text-white/85 mt-6 max-w-md leading-relaxed py-1">
                {renderWithMarks(hero.description, hero.descriptionHighlights)}
              </p>
            </div>
            <div className="relative">
              <img
                src={hero.imageUrl}
                alt={hero.imageAlt}
                width={800}
                height={450}
                loading="eager"
                fetchPriority="high"
                className={`w-full h-auto rounded-xl shadow-2xl ring-1 ${theme.heroImageRingClass}`}
              />
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{ boxShadow: `0 0 120px 10px ${theme.heroImageGlowRgba} inset` }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Quick Facts Strip ───────────── */}
      <section className="relative bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-2 md:grid-cols-5 gap-0 rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden -translate-y-10"
            style={{
              backgroundImage: `url(${doodles.parchmentTextureUrl})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#fdf6e3',
            }}
          >
            {quickFacts.map((fact, i) => (
              <div
                key={fact.label}
                className={`flex items-center gap-3 p-5 md:p-6 ${
                  i < quickFacts.length - 1 ? 'md:border-r md:border-yellow-800/20' : ''
                }`}
              >
                <TIcon name={fact.icon} size={40} className="text-yellow-800 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-poppins text-xs uppercase tracking-wide text-yellow-900/70">
                    {fact.label}
                  </p>
                  <p className="font-poppins text-base font-semibold text-gray-900">
                    {fact.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Mantras + Life + Benefits ───────────── */}
      <section
        className="pb-20"
        style={{
          background: `linear-gradient(to bottom, #000 0%, #0d0805 50%, ${theme.darkGradientFrom} 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* LEFT: Sacred Mantras */}
            <ParchmentCard
              className="md:col-span-3"
              rotation="md:-rotate-[0.5deg]"
              parchmentUrl={doodles.parchmentTextureUrl}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <IconBook size={28} className="text-yellow-700" aria-hidden="true" />
                <h2 className="font-caveat text-4xl md:text-5xl text-yellow-700">
                  {mantrasTitle}
                </h2>
                <IconBook size={28} className="text-yellow-700" aria-hidden="true" />
              </div>

              {mantras.map((m, idx) => (
                <div key={m.title} className={idx < mantras.length - 1 ? 'mb-8' : ''}>
                  <p className="font-caveat text-2xl text-yellow-700 mb-3">
                    {m.titleHighlight ? (
                      <Mark>{m.title}</Mark>
                    ) : (
                      m.title
                    )}
                  </p>
                  <div className="my-4 bg-[#fdf6e3] border-2 border-red-700/70 rounded-lg p-5">
                    <p className="font-devanagari text-xl md:text-2xl leading-loose text-gray-900">
                      {m.circleOm
                        ? renderDevanagariWithCircleOm(m.devanagari)
                        : m.devanagari}
                    </p>
                  </div>
                  <p className="italic font-semibold text-gray-800 mb-2 leading-relaxed">
                    {m.iast}
                  </p>
                  <p className="italic font-semibold text-gray-800 leading-relaxed">
                    {renderWithMarks(m.meaning, m.meaningHighlights)}
                  </p>
                </div>
              ))}
            </ParchmentCard>

            {/* RIGHT: Life rows + Benefits */}
            <div className="md:col-span-2 space-y-6">
              <ParchmentCard
                rotation="md:rotate-[0.5deg]"
                parchmentUrl={doodles.parchmentTextureUrl}
              >
                <IconPaperclip
                  size={40}
                  className="absolute -top-3 -right-3 text-red-600 -rotate-45 drop-shadow-md"
                  aria-hidden="true"
                />
                <img
                  src={doodles.secondary}
                  alt=""
                  width={96}
                  height={96}
                  loading="lazy"
                  aria-hidden="true"
                  className="absolute bottom-2 right-2 w-24 h-24 opacity-40 pointer-events-none"
                />
                <h3 className="font-caveat text-4xl md:text-5xl text-yellow-700 border-b-2 border-yellow-500 pb-2 mb-4 inline-block">
                  {lifeCardTitle}
                </h3>
                <ul className="space-y-3 font-poppins text-sm text-gray-800 relative z-10">
                  {lifeRows.map((row) => (
                    <li key={row.label} className="flex items-start gap-3">
                      <TIcon name={row.icon} size={20} className="text-yellow-800 mt-0.5 flex-shrink-0" />
                      <span>
                        <span className="font-bold">{row.label}:</span>{' '}
                        {renderWithMarks(row.value, row.valueHighlights)}
                      </span>
                    </li>
                  ))}
                </ul>
              </ParchmentCard>

              <ParchmentCard
                rotation="md:-rotate-[0.3deg]"
                parchmentUrl={doodles.parchmentTextureUrl}
              >
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-caveat text-4xl md:text-5xl text-yellow-700">
                    {benefitsTitle}
                  </h3>
                  <img
                    src={doodles.primary}
                    alt=""
                    width={48}
                    height={48}
                    loading="lazy"
                    aria-hidden="true"
                    className="w-12 h-12 opacity-80"
                  />
                </div>
                <ul className="space-y-2.5 font-poppins text-sm text-gray-800">
                  {benefits.map((b) => (
                    <li key={b.text} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{renderWithMarks(b.text, b.highlights)}</span>
                    </li>
                  ))}
                </ul>
              </ParchmentCard>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Mid Break ───────────── */}
      <section
        className="py-16 md:py-20"
        style={{
          backgroundImage: `radial-gradient(circle at center, ${theme.heroRadialRgba}, transparent 60%), linear-gradient(to bottom, ${theme.darkGradientFrom}, ${theme.darkGradientTo})`,
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img
            src={midBreak.imageUrl}
            alt={midBreak.imageAlt}
            width={600}
            height={400}
            loading="lazy"
            className={`mx-auto rounded-2xl shadow-2xl ring-1 ${theme.heroImageRingClass} max-w-full h-auto`}
          />
          <p
            className={`font-caveat text-3xl md:text-4xl mt-8 ${theme.footerCaptionClass}`}
          >
            {midBreak.caption}
          </p>
        </div>
      </section>

      {/* ───────────── Bottom 3 cards ───────────── */}
      <section
        className="py-16"
        style={{
          background: `linear-gradient(to bottom, ${theme.darkGradientTo}, ${theme.darkGradientFrom})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* How to Connect */}
            <ParchmentCard
              rotation="md:rotate-[0.5deg]"
              parchmentUrl={doodles.parchmentTextureUrl}
            >
              <h3 className="font-caveat text-4xl md:text-5xl text-yellow-700 mb-4">
                {howToConnectTitle}
              </h3>
              <ul className="space-y-3 font-poppins text-sm text-gray-800">
                {howToConnect.map((step) => (
                  <li key={step.text} className="flex items-start gap-3">
                    <TIcon name={step.icon} size={20} className="text-yellow-800 mt-0.5 flex-shrink-0" />
                    <span>{step.text}</span>
                  </li>
                ))}
              </ul>
            </ParchmentCard>

            {/* Gemstone (transparent) */}
            <div className="relative flex flex-col items-center justify-center text-center py-10 px-4">
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at center, rgba(234,179,8,0.18) 0%, transparent 65%)',
                }}
                aria-hidden="true"
              />
              <img
                src={gemstone.imageUrl}
                alt={gemstone.imageAlt}
                width={288}
                height={288}
                loading="lazy"
                className="w-60 h-60 md:w-72 md:h-72 object-contain"
                style={{ filter: gemstone.glowFilter }}
              />
              <h3 className={`font-caveat text-3xl mt-6 ${theme.footerCaptionClass}`}>
                Gemstone:
              </h3>
              <h4 className="font-sacramento text-6xl md:text-7xl text-white mt-1">
                {gemstone.name}
              </h4>
              <p className="font-poppins text-sm text-white/60 mt-1">
                ({gemstone.sanskrit})
              </p>
              {gemstone.accentDoodleUrl ? (
                <img
                  src={gemstone.accentDoodleUrl}
                  alt={gemstone.accentDoodleAlt ?? ''}
                  width={64}
                  height={64}
                  loading="lazy"
                  className="w-16 h-16 mt-4 opacity-50 pointer-events-none"
                />
              ) : null}
              <p className="italic text-sm text-gray-400 mt-2 text-center max-w-xs">
                {gemstone.caption}
              </p>
            </div>

            {/* Affirmation */}
            <ParchmentCard
              className="pt-10"
              rotation="md:-rotate-[1deg]"
              parchmentUrl={doodles.parchmentTextureUrl}
            >
              <div className="tape-decoration" aria-hidden="true" />
              <div className="flex items-center gap-2 mb-4">
                <IconHeart size={24} className="text-red-500" aria-hidden="true" />
                <h3 className="font-caveat text-4xl md:text-5xl text-yellow-700">
                  Affirmation
                </h3>
              </div>
              <p className="font-poppins text-lg italic text-gray-800 leading-relaxed">
                {renderWithMarks(affirmation.text, affirmation.highlights)}
              </p>
            </ParchmentCard>
          </div>
        </div>
      </section>

      {/* ───────────── Footer strip ───────────── */}
      <section
        className="py-14"
        style={{
          background: `linear-gradient(to bottom, ${theme.darkGradientFrom} 0%, ${theme.darkGradientTo} 100%)`,
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
            <div className="flex items-center justify-center gap-3">
              <img
                src={`${doodles.footerDecorBase}/icon-om.svg`}
                alt=""
                width={36}
                height={36}
                loading="lazy"
                aria-hidden="true"
              />
              <p className={`italic font-caveat text-2xl ${theme.footerCaptionClass}`}>
                {closingShloka.left}
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src={doodles.tertiary}
                alt=""
                width={96}
                height={96}
                loading="lazy"
                aria-hidden="true"
                className="opacity-90"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className={`font-devanagari text-xl ${theme.footerCaptionClass}`}>
                {closingShloka.devanagari}
              </p>
              <div className="flex items-center gap-2">
                <p className={`italic font-caveat text-2xl ${theme.footerCaptionClass}`}>
                  {closingShloka.translation}
                </p>
                <img
                  src={`${doodles.footerDecorBase}/diya.svg`}
                  alt=""
                  width={28}
                  height={28}
                  loading="lazy"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── SEO Body (planet-authored) ───────────── */}
      {seoBody}

      {/* ───────────── FAQ ───────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 font-inter">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-white border border-gray-200 rounded-xl p-5"
              >
                <summary className="cursor-pointer font-semibold text-gray-900">
                  {faq.question}
                </summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Related + CTA ───────────── */}
      <section className="py-16 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl text-gray-900 mb-8 text-center">
            Explore Related Practices
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-primary-300 transition-all"
              >
                <h3 className="font-heading text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-16"
        style={{
          background: `linear-gradient(to bottom, ${theme.darkGradientFrom}, ${theme.darkGradientTo})`,
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className={`font-caveat text-4xl md:text-5xl ${theme.footerCaptionClass}`}
          >
            {ctaHeadline}
          </h2>
          <p className="mt-4 font-poppins text-lg text-white/85">{ctaSubline}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919079053840"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-colors"
              aria-label={`Chat on WhatsApp about ${ctaName}`}
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
            <a
              href="tel:+919079053840"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-lg ring-1 ring-white/30 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call +91 90790 53840
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ────────────────────────── SEO body building blocks ────────────────────────── */

export function SectionDivider({ starUrl }: { starUrl: string }) {
  return (
    <div className="my-16 flex items-center justify-center gap-4 opacity-60">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-300" />
      <img src={starUrl} alt="" aria-hidden="true" className="w-8 h-8" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-300" />
    </div>
  );
}

export function HouseCard({
  number,
  name,
  text,
}: {
  number: string;
  name: string;
  text: string;
}) {
  return (
    <div className="bg-white/70 border border-yellow-200 rounded-lg p-5 hover:shadow-md hover:border-yellow-400 transition-all">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-caveat text-3xl text-yellow-700 leading-none">{number}</span>
        <span className="font-poppins font-semibold text-gray-900">{name}</span>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

export function RemedyCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  text: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 p-5 bg-white/70 border-l-4 border-yellow-500 rounded-r-lg shadow-sm">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
        {icon}
      </div>
      <div className="min-w-0">
        <h4 className="font-caveat text-2xl text-yellow-800 mb-1 leading-tight">
          {title}
        </h4>
        <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

export function CredentialBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-yellow-800 border border-yellow-300 shadow-sm">
      {children}
    </span>
  );
}

export { Mark };
