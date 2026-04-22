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
  IconBook,
  IconSun,
  IconDroplet,
  IconDiamond,
  IconYoga,
  IconHeart,
  IconCalendar,
  IconGift,
  IconArrowRight,
  IconPaperclip,
} from '@tabler/icons-react';
import SEOHead from '../../components/SEOHead';
import SchemaMarkup from '../../components/SchemaMarkup';
import Breadcrumbs from '../../components/Breadcrumbs';
import sunData, { sunAsset } from '../../data/planets/sun';
import {
  getArticleSchema,
  getFaqPageSchemaFromList,
  type JsonLd,
} from '../../data/schema-entities';

const {
  meta,
  hero,
  quickFacts,
  mantras,
  significations,
  benefits,
  midBreak,
  connect,
  gemstone,
  affirmation,
  footer,
  faqs,
  related,
} = sunData;

/**
 * Marker-highlighted inline span. Wraps content in the global
 * .highlight-marker utility defined in src/index.css.
 */
function Mark({ children }: { children: React.ReactNode }) {
  return <mark className="highlight-marker bg-transparent text-inherit">{children}</mark>;
}

function SectionDivider() {
  return (
    <div className="my-16 flex items-center justify-center gap-4 opacity-60">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-300" />
      <img
        src={sunAsset('star-accent.svg')}
        alt=""
        aria-hidden="true"
        className="w-8 h-8"
      />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-300" />
    </div>
  );
}

function HouseCard({
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

function RemedyCard({
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

function CredentialBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-yellow-800 border border-yellow-300 shadow-sm">
      {children}
    </span>
  );
}

function ParchmentCard({
  children,
  className = '',
  rotation = '',
  style,
}: {
  children: React.ReactNode;
  className?: string;
  rotation?: string;
  style?: React.CSSProperties;
}) {
  const parchmentStyle: React.CSSProperties = {
    backgroundImage: `url(${sunAsset('parchment-texture.webp')})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#fdf6e3',
    ...style,
  };
  return (
    <div
      className={`relative rounded-xl border border-amber-900/20 p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${rotation} ${className}`}
      style={parchmentStyle}
    >
      {children}
    </div>
  );
}

function IconImg({ file, alt = '', size = 20 }: { file: string; alt?: string; size?: number }) {
  return (
    <img
      src={sunAsset(file)}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      className="inline-block flex-shrink-0"
    />
  );
}

export default function SunPage() {
  const articleSchema: JsonLd = getArticleSchema({
    headline: meta.articleHeadline,
    description: meta.description,
    image: hero.imageUrl,
    datePublished: meta.articleDatePublished,
    dateModified: meta.articleDateModified,
    url: meta.canonicalPath,
    articleSection: 'Vedic Astrology',
    keywords: [
      'Surya',
      'Sun in Vedic astrology',
      'Navagraha',
      'Ruby Manikya',
      'Surya mantra',
      'exaltation Aries',
      'debilitation Libra',
    ],
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
          name: 'Surya (Sun) in Vedic Astrology',
          description: meta.description,
          url: meta.canonicalPath,
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Planets', url: '/planets' },
          { name: 'Sun (Surya)', url: meta.canonicalPath },
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
          { label: 'Sun (Surya)' },
        ]}
      />

      {/* ───────────────────────── Section 1: Hero ───────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 20%, rgba(252,211,77,0.15), transparent 55%), linear-gradient(to bottom, #1a0f05 0%, #000000 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="relative">
              <h1
                className="font-sacramento text-8xl md:text-9xl leading-none text-yellow-400"
                style={{
                  textShadow:
                    '0 0 30px rgba(250, 204, 21, 0.4), 0 0 60px rgba(250, 204, 21, 0.2)',
                }}
              >
                {hero.name}
              </h1>
              <img
                src={sunAsset('doodle-sun.png')}
                alt=""
                width={48}
                height={48}
                loading="eager"
                className="absolute -top-2 right-6 md:right-10 w-12 h-12 rotate-12 opacity-90 pointer-events-none"
                aria-hidden="true"
              />
              <p className="font-devanagari text-3xl text-white/80 mt-2">सूर्य</p>
              <p className="font-caveat text-3xl text-white/90 mt-3">{hero.subtitle}</p>
              <p className="font-poppins text-base text-white/85 mt-6 max-w-md leading-relaxed py-1">
                The source of light, life and consciousness. Surya illuminates our{' '}
                <Mark>soul</Mark>, <Mark>vitality</Mark> and <Mark>purpose</Mark>.
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
                className="w-full h-auto rounded-xl shadow-2xl ring-1 ring-yellow-400/20"
              />
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  boxShadow: '0 0 120px 10px rgba(252,211,77,0.25) inset',
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── Section 2: Quick Facts Strip ───────────────────── */}
      <section className="relative bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-2 md:grid-cols-5 gap-0 rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden -translate-y-10"
            style={{
              backgroundImage: `url(${sunAsset('parchment-texture.webp')})`,
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
                <img
                  src={sunAsset(fact.icon)}
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                  aria-hidden="true"
                  className="flex-shrink-0"
                />
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

      {/* ─────────────────── Section 3: Mantras + Significations ─────────────────── */}
      <section className="bg-gradient-to-b from-black via-[#0d0805] to-[#1a0f05] pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* LEFT: Sacred Mantras */}
            <ParchmentCard
              className="md:col-span-3"
              rotation="md:-rotate-[0.5deg]"
            >
              <img
                src={sunAsset('icon-praying-hands.svg')}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                aria-hidden="true"
                className="absolute top-4 left-4 opacity-70"
              />
              <div className="flex items-center justify-center gap-3 mb-6">
                <IconImg file="icon-om.svg" size={32} />
                <h2 className="font-caveat text-4xl md:text-5xl text-yellow-700">
                  {mantras.title}
                </h2>
                <IconImg file="icon-om.svg" size={32} />
              </div>

              <div className="mb-8">
                <p className="font-caveat text-2xl text-yellow-700 mb-3">
                  <Mark>{mantras.primary.heading}</Mark>
                </p>
                <div className="my-4 bg-[#fdf6e3] border-2 border-red-700/70 rounded-lg p-5">
                  <p className="font-devanagari text-xl md:text-2xl leading-loose text-gray-900">
                    {mantras.primary.devanagari}
                  </p>
                </div>
                <p className="italic font-semibold text-gray-800 mb-2 leading-relaxed">
                  {mantras.primary.iast}
                </p>
                <p className="italic font-semibold text-gray-800 leading-relaxed">
                  I bow to Surya, who shines like the{' '}
                  <Mark>red hibiscus flower</Mark>, son of <Mark>Kashyapa</Mark>, greatly
                  radiant, the enemy of darkness, and destroyer of all sins.
                </p>
              </div>

              <div className="relative">
                <img
                  src={sunAsset('doodle-sun.png')}
                  alt=""
                  width={64}
                  height={64}
                  loading="lazy"
                  aria-hidden="true"
                  className="absolute -top-2 right-0 opacity-50"
                />
                <p className="font-caveat text-2xl text-yellow-700 mb-3">
                  {mantras.short.heading}
                </p>
                <div className="inline-block my-4 bg-[#fdf6e3] border-2 border-red-700/70 rounded-lg px-6 py-4">
                  <p className="font-devanagari text-xl md:text-2xl leading-loose text-gray-900">
                    {mantras.short.devanagari}
                  </p>
                </div>
                <p className="italic font-semibold text-gray-800 mb-2">
                  {mantras.short.iast}
                </p>
                <p className="italic font-semibold text-gray-800">
                  Salutations to Surya, the <Mark>Sun-god</Mark>.
                </p>
              </div>
            </ParchmentCard>

            {/* RIGHT: stacked cards */}
            <div className="md:col-span-2 space-y-6">
              {/* Surya in Our Life */}
              <ParchmentCard rotation="md:rotate-[0.5deg]">
                <IconPaperclip
                  size={40}
                  className="absolute -top-3 -right-3 text-red-600 -rotate-45 drop-shadow-md"
                  aria-hidden="true"
                />
                <img
                  src={sunAsset('doodle-scales.png')}
                  alt=""
                  width={64}
                  height={64}
                  loading="lazy"
                  aria-hidden="true"
                  className="absolute bottom-24 right-4 w-16 h-16 opacity-50 pointer-events-none"
                />
                <img
                  src={sunAsset('doodle-lion.png')}
                  alt=""
                  width={96}
                  height={96}
                  loading="lazy"
                  aria-hidden="true"
                  className="absolute bottom-2 right-2 w-24 h-24 opacity-40 pointer-events-none"
                />
                <h3 className="font-caveat text-4xl md:text-5xl text-yellow-700 border-b-2 border-yellow-500 pb-2 mb-4 inline-block">
                  Surya in Our Life
                </h3>
                <ul className="space-y-3 font-poppins text-sm text-gray-800 relative z-10">
                  {significations.map((row) => (
                    <li key={row.label} className="flex items-start gap-3">
                      <IconImg file={row.icon} size={20} />
                      <span>
                        <span className="font-bold">{row.label}:</span>{' '}
                        {row.label === 'Represents' ? (
                          <>
                            <Mark>Soul</Mark>, Atma, Consciousness
                          </>
                        ) : (
                          row.value
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </ParchmentCard>

              {/* Benefits */}
              <ParchmentCard rotation="md:-rotate-[0.3deg]">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-caveat text-4xl md:text-5xl text-yellow-700">
                    Benefits of Surya Mantra
                  </h3>
                  <img
                    src={sunAsset('doodle-sun.png')}
                    alt=""
                    width={48}
                    height={48}
                    loading="lazy"
                    aria-hidden="true"
                    className="w-12 h-12 opacity-80"
                  />
                </div>
                <ul className="space-y-2.5 font-poppins text-sm text-gray-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Boosts <Mark>confidence</Mark> and self-esteem
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Improves leadership qualities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Brings <Mark>success</Mark>, recognition, fame
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Enhances <Mark>vitality</Mark> and immune system
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Dispels negative energy and darkness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Brings <Mark>clarity</Mark>, <Mark>purpose</Mark>, willpower
                    </span>
                  </li>
                </ul>
                {/* fallback so benefits data stays in sync if list ever reuses data export */}
                <span className="sr-only">
                  {benefits.join('. ')}
                </span>
              </ParchmentCard>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── Section 4: Mid-Page Visual Break ───────────────── */}
      <section
        className="py-16 md:py-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(252,211,77,0.15), transparent 60%), linear-gradient(to bottom, #1a0f05, #000000)',
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img
            src={midBreak.imageUrl}
            alt={midBreak.imageAlt}
            width={600}
            height={400}
            loading="lazy"
            className="mx-auto rounded-2xl shadow-2xl ring-1 ring-yellow-400/20 max-w-full h-auto"
          />
          <p className="font-caveat text-3xl md:text-4xl text-yellow-400 mt-8">
            {midBreak.caption}
          </p>
        </div>
      </section>

      {/* ───────────────── Section 5: Bottom 3-Card Row ───────────────── */}
      <section className="py-16 bg-gradient-to-b from-black to-[#1a0f05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: How to Connect */}
            <ParchmentCard rotation="md:rotate-[0.5deg]">
              <img
                src={sunAsset('feather-quill.png')}
                alt=""
                width={80}
                height={80}
                loading="lazy"
                aria-hidden="true"
                className="absolute -top-3 -left-3 w-20 h-auto opacity-70 -rotate-12 pointer-events-none"
              />
              <h3 className="font-caveat text-4xl md:text-5xl text-yellow-700 mb-4 pl-14">
                How to Connect with Surya
              </h3>
              <ul className="space-y-3 font-poppins text-sm text-gray-800">
                {connect.map((step) => (
                  <li key={step.text} className="flex items-start gap-3">
                    <IconImg file={step.icon} size={20} />
                    <span>{step.text}</span>
                  </li>
                ))}
              </ul>
            </ParchmentCard>

            {/* Card 2: Gemstone Ruby (transparent, real photo) */}
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
                alt="Ornate gold ring with a large oval ruby gemstone representing Manikya, the gemstone of Surya"
                width={288}
                height={288}
                loading="lazy"
                className="w-60 h-60 md:w-72 md:h-72 object-contain"
                style={{ filter: 'drop-shadow(0 0 40px rgba(234, 179, 8, 0.45))' }}
              />
              <h3 className="font-caveat text-3xl text-yellow-400 mt-6">Gemstone:</h3>
              <h4 className="font-sacramento text-6xl md:text-7xl text-white mt-1">
                {gemstone.name}
              </h4>
              <img
                src={sunAsset('doodle-temple.png')}
                alt=""
                width={64}
                height={64}
                loading="lazy"
                aria-hidden="true"
                className="w-16 h-16 mt-4 opacity-50 pointer-events-none"
              />
              <p className="italic text-sm text-gray-400 mt-2 text-center max-w-xs">
                {gemstone.caveat}
              </p>
            </div>

            {/* Card 3: Affirmation */}
            <ParchmentCard className="pt-10" rotation="md:-rotate-[1deg]">
              <img
                src={sunAsset('tape-strip.svg')}
                alt=""
                width={80}
                height={20}
                loading="lazy"
                aria-hidden="true"
                className="absolute -top-2 left-4 rotate-[-8deg] opacity-85"
              />
              <div className="flex items-center gap-2 mb-4">
                <img
                  src={sunAsset('icon-heart.svg')}
                  alt=""
                  width={28}
                  height={28}
                  loading="lazy"
                  aria-hidden="true"
                />
                <h3 className="font-caveat text-4xl md:text-5xl text-yellow-700">
                  Affirmation
                </h3>
              </div>
              <p className="font-poppins text-lg italic text-gray-800 leading-relaxed">
                I am a <Mark>radiant being of light</Mark>, filled with{' '}
                <Mark>purpose and power</Mark>.
              </p>
              <span className="sr-only">{affirmation}</span>
            </ParchmentCard>
          </div>
        </div>
      </section>

      {/* ───────────────── Section 6: Footer Strip ───────────────── */}
      <section
        className="py-14"
        style={{
          background:
            'linear-gradient(to bottom, #1a0f05 0%, #0a0603 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
            <div className="flex items-center justify-center gap-3">
              <img
                src={sunAsset('icon-om.svg')}
                alt=""
                width={36}
                height={36}
                loading="lazy"
                aria-hidden="true"
              />
              <p className="italic text-yellow-100/90 font-caveat text-2xl">
                {footer.left}
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src={sunAsset('star-accent.svg')}
                alt=""
                width={96}
                height={96}
                loading="lazy"
                aria-hidden="true"
                className="opacity-90"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="font-devanagari text-xl text-yellow-100">
                {footer.devanagari}
              </p>
              <div className="flex items-center gap-2">
                <p className="italic font-caveat text-2xl text-yellow-200">
                  {footer.translation}
                </p>
                <img
                  src={sunAsset('diya.svg')}
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

      {/* ───────────────── Section 7: SEO Body (2,000 words) ───────────────── */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          backgroundColor: '#FBF7EF',
          backgroundImage: `url(${sunAsset('parchment-texture.webp')})`,
          backgroundSize: '800px',
          backgroundRepeat: 'repeat',
          backgroundBlendMode: 'multiply',
        }}
      >
        {/* Cream wash over the texture so it reads as faint, not busy */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: 'rgba(251, 247, 239, 0.92)' }}
          aria-hidden="true"
        />

        {/* Margin doodles (desktop only) */}
        <img
          src={sunAsset('doodle-sun.png')}
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute top-[22%] right-4 w-28 h-28 opacity-10 pointer-events-none"
        />
        <img
          src={sunAsset('doodle-scales.png')}
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute top-[48%] left-4 w-28 h-28 opacity-10 pointer-events-none"
        />
        <img
          src={sunAsset('doodle-lion.png')}
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute top-[70%] right-4 w-32 h-32 opacity-10 pointer-events-none"
        />
        <img
          src={sunAsset('star-accent.svg')}
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute top-[85%] left-6 w-16 h-16 opacity-15 pointer-events-none"
        />

        <div className="relative max-w-4xl mx-auto px-6 md:px-0 font-inter text-gray-800">

          {/* ── Section 1: Soul ─────────────────────────────────── */}
          <div className="flex items-center gap-4 mb-3">
            <IconSparkles size={40} className="text-yellow-600 flex-shrink-0" aria-hidden="true" />
            <h2 className="font-caveat text-5xl md:text-6xl text-yellow-700 leading-none">
              Surya <span className="font-devanagari text-4xl md:text-5xl">(सूर्य)</span>: The Soul of Vedic Astrology
            </h2>
          </div>
          <div className="h-0.5 w-32 bg-gradient-to-r from-yellow-500 via-orange-400 to-transparent mb-8" />

          <p className="text-lg leading-relaxed mb-6 first-letter:font-caveat first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-yellow-700 first-letter:leading-none">
            In the classical Vedic tradition, Surya is not merely a celestial body in the sky.
            He is the luminous centre of the chart, the karaka of the Atma, the{' '}
            <Mark>soul</Mark> itself. The Brihat Parashara Hora Shastra, the seminal text
            attributed to <Mark>Sage Parashara</Mark>, names the Sun as the king among the
            Navagraha, seated on a chariot drawn by seven horses that represent the seven
            colours of light and the seven major pranic currents in the body.
          </p>

          <div className="my-6 inline-flex items-center gap-3 px-4 py-2 rounded-lg shadow-sm ring-1 ring-yellow-700/20"
            style={{
              backgroundImage: `url(${sunAsset('parchment-texture.webp')})`,
              backgroundSize: 'cover',
              backgroundColor: '#fdf6e3',
            }}
          >
            <IconBook size={20} className="text-yellow-700" aria-hidden="true" />
            <span className="font-caveat text-xl text-yellow-900">Brihat Parashara Hora Shastra</span>
          </div>

          <p className="text-lg leading-relaxed mb-6">
            Mythologically, Surya is the son of the sage <Mark>Kashyapa</Mark> and the
            goddess Aditi. His lineage places him within the highest strata of Vedic
            cosmology, and his epithets, among them Divakara (maker of day), Bhaskara
            (maker of light), and Savitur (the quickener), hint at the depth with which
            the tradition has observed him. The Gayatri Mantra itself is addressed to the
            solar deity Savitur, and its daily recitation is considered a foundational
            spiritual practice.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            A classical invocation from the Aditya Hridayam captures the mood:
          </p>

          <blockquote className="my-10 mx-auto max-w-2xl border-l-4 border-yellow-500 pl-8 pr-6 py-6 bg-yellow-50/60 rounded-r-xl shadow-sm">
            <p className="font-kalam text-xl md:text-2xl italic text-gray-800 mb-2">
              ādityaṁ sarva bhūtānām antaryāmiṇaṁ param
            </p>
            <p className="font-poppins text-base text-gray-600">
              The Sun, the inner witness of all beings, the supreme one.
            </p>
            <cite className="block mt-3 text-sm text-yellow-700 font-semibold uppercase tracking-wide not-italic">
              Aditya Hridayam
            </cite>
          </blockquote>

          <p className="text-lg leading-relaxed mb-6">
            This line reminds the student that the Sun in the chart is less about the
            outer persona and more about the <Mark>Atmakaraka</Mark>, the soul-witness
            behind every action.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            At Soul Infinity, this luminary is always read with reverence. Before looking
            at house placement, dignity, or dasha, Saurabh Jain studies the solar planet
            as the silent observer at the centre of the chart, the fixed point from which
            the rest of the planetary orchestra can be understood. This contemplative
            first step, rarely discussed in modern commentary, is the difference between
            a predictive reading and a reading that helps a client meet themselves.
          </p>

          <SectionDivider />

          {/* ── Section 2: Significations ────────────────────────── */}
          <div className="flex items-center gap-4 mb-3">
            <IconStar size={40} className="text-yellow-600 flex-shrink-0" aria-hidden="true" />
            <h2 className="font-caveat text-5xl md:text-6xl text-yellow-700 leading-none">
              Significations of the Sun in a Birth Chart
            </h2>
          </div>
          <div className="h-0.5 w-32 bg-gradient-to-r from-yellow-500 via-orange-400 to-transparent mb-8" />

          <p className="text-lg leading-relaxed mb-6 first-letter:font-caveat first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-yellow-700 first-letter:leading-none">
            The Sun represents the <Mark>father</Mark>, the source of{' '}
            <Mark>authority</Mark>, and the way a person relates to power, hierarchy,
            and recognition. Karaka for the first house and the tenth, Surya shapes
            identity, reputation, and the capacity to hold a position of responsibility.
            A well-placed Sun often correlates with a stable father figure, a clear
            sense of purpose, and a natural ability to lead without needing to dominate.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            In the physical body, Surya is linked to the bones, the heart, and the eyes.
            For men, the right eye is read through the Sun; for women, the left.{' '}
            <Mark>Vitality</Mark>, immunity, and the functioning of the circulatory
            system are all assessed in part through the strength of Surya in the natal
            chart and its transits, especially during Solar return periods.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            The Sun is also the karaka for government, institutional structures, and
            public-facing roles. When Saurabh evaluates a chart for career direction, a
            strong Sun placed in angular houses often suggests natural alignment with{' '}
            <Mark>leadership</Mark>, administration, or civil service paths. A weak Sun
            does not rule out such paths, but points instead to cycles where confidence
            and timing need careful cultivation.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            In Hindu cultural vocabulary, the Sun is often called{' '}
            <span className="font-devanagari text-xl">आत्मकारक</span>{' '}
            (<em>ātmakāraka</em>), the significator of the soul, when it is the planet
            with the highest degrees in the chart according to Jaimini astrology. This
            role makes the Sun one of the most studied planets in soul-level analysis,
            relationship karma, and dharmic direction.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Beyond individual life, Surya also governs the immune system in subtle
            energetic terms and the spinal column in somatic reading. Classical texts
            associate a weak or afflicted solar position with pride, arrogance, or
            conversely a collapsed sense of self, and a dignified placement with
            generosity, fairness, and a steady commitment to truth.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Another layer that often gets missed in surface readings is the way this
            luminary interacts with the rising sign. When the ascendant lord happens to
            be Surya or shares nakshatra with him, identity and life direction tend to
            braid together, and the person often reports a strong inner compass even in
            turbulent periods. Reading this interaction is part of every Soul Infinity
            consultation because it frames the rest of the chart narrative.
          </p>

          <SectionDivider />

          {/* ── Section 3: 12 Houses ────────────────────────────── */}
          <div className="flex items-center gap-4 mb-3">
            <IconHome size={40} className="text-yellow-600 flex-shrink-0" aria-hidden="true" />
            <h2 className="font-caveat text-5xl md:text-6xl text-yellow-700 leading-none">
              Sun in the 12 Houses
            </h2>
          </div>
          <div className="h-0.5 w-32 bg-gradient-to-r from-yellow-500 via-orange-400 to-transparent mb-8" />

          <p className="text-lg leading-relaxed mb-6 first-letter:font-caveat first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-yellow-700 first-letter:leading-none">
            A concise overview of the solar luminary’s classical themes house by house.
            Each placement is modulated by sign, aspect, and dasha, so these summaries
            are a starting point rather than a final verdict.
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <HouseCard
              number="1st"
              name="First house"
              text="Strong sense of self, leadership inclination, visible confidence. Tendency toward the right eye being dominant."
            />
            <HouseCard
              number="2nd"
              name="Second house"
              text="Authority in family matters, speech that carries weight. Wealth often tied to government or institutional work."
            />
            <HouseCard
              number="3rd"
              name="Third house"
              text="Courage, initiative, assertive communication. Favours independent ventures and younger-sibling dynamics."
            />
            <HouseCard
              number="4th"
              name="Fourth house"
              text="Complex relationship with mother or home-base, intense inner drive for emotional sovereignty."
            />
            <HouseCard
              number="5th"
              name="Fifth house"
              text="Creative authority, teaching talent, classical scholarship. Strong bond with first-born child."
            />
            <HouseCard
              number="6th"
              name="Sixth house"
              text="Fighter placement, capacity to overcome enemies and illness. Can indicate father-related service themes."
            />
            <HouseCard
              number="7th"
              name="Seventh house"
              text="As marriage karaka, this luminary raises independence in partnerships. Partner with a strong public profile."
            />
            <HouseCard
              number="8th"
              name="Eighth house"
              text="Deep soul research, interest in the occult. Father’s longevity and karmic inheritance are themes."
            />
            <HouseCard
              number="9th"
              name="Ninth house"
              text="Classical favourable placement for dharma, guru connection, long-distance travel, and legal standing."
            />
            <HouseCard
              number="10th"
              name="Tenth house"
              text="Digbala placement. One of the strongest positions, giving career visibility and institutional authority."
            />
            <HouseCard
              number="11th"
              name="Eleventh house"
              text="Gains through leaders, mentors, and elder brothers. Network of powerful associations."
            />
            <HouseCard
              number="12th"
              name="Twelfth house"
              text="Inner spiritual focus, foreign residence, work behind the scenes. Ego dissolution as a life theme."
            />
          </div>

          <SectionDivider />

          {/* ── Section 4: Dignities ─────────────────────────────── */}
          <div className="flex items-center gap-4 mb-3">
            <IconCrown size={40} className="text-yellow-600 flex-shrink-0" aria-hidden="true" />
            <h2 className="font-caveat text-5xl md:text-6xl text-yellow-700 leading-none">
              Sun’s Dignities: Exaltation, Debilitation, and Relationships
            </h2>
          </div>
          <div className="h-0.5 w-32 bg-gradient-to-r from-yellow-500 via-orange-400 to-transparent mb-8" />

          <p className="text-lg leading-relaxed mb-6 first-letter:font-caveat first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-yellow-700 first-letter:leading-none">
            Surya is <Mark>exalted in Aries</Mark>, with peak exaltation at 10 degrees.
            In Leo, the Sun occupies its own sign and is in <Mark>Mooltrikona</Mark> from
            0 to 20 degrees. The debilitation sign is{' '}
            <Mark>debilitated in Libra</Mark>, with deepest debilitation at 10 degrees.
            These dignity points are the backbone of classical strength assessment and
            inform every remedy recommendation.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            In Parashari relationship tables, this luminary counts Moon, Mars, and
            Jupiter as friends. Venus and Saturn are treated as enemies because of
            their opposing cosmological character, and Mercury is neutral. The shadow
            nodes Rahu and Ketu carry a special, often antagonistic relationship with
            the solar principle, and an eclipse-like conjunction in the birth chart
            (Grahan Yoga) is read with particular care. The timing of such yogas
            relative to Vimshottari periods often surfaces themes of authority-testing
            and identity reinvention, which is why Saurabh pays particular attention to
            these configurations before framing any remedy sequence.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            When Saurabh evaluates the Sun’s strength, he looks beyond dignity alone.
            Shadbala, Ashtakavarga points, nakshatra placement, and Vargottama status
            all feed into a layered reading. A technically debilitated Sun can still
            yield powerful results through Neecha Bhanga Raja Yoga, while a technically
            exalted Sun can underperform if surrounded by malefic aspects.
          </p>

          <SectionDivider />

          {/* ── Section 5: Mahadasha ─────────────────────────────── */}
          <div className="flex items-center gap-4 mb-3">
            <IconClock size={40} className="text-yellow-600 flex-shrink-0" aria-hidden="true" />
            <h2 className="font-caveat text-5xl md:text-6xl text-yellow-700 leading-none">
              <Mark>Surya Mahadasha</Mark>: The Six-Year Period
            </h2>
          </div>
          <div className="h-0.5 w-32 bg-gradient-to-r from-yellow-500 via-orange-400 to-transparent mb-8" />

          <p className="text-lg leading-relaxed mb-6 first-letter:font-caveat first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-yellow-700 first-letter:leading-none">
            In the Vimshottari Dasha system, Surya Mahadasha runs for six years. The
            themes that rise during this period often relate to authority, recognition,
            father’s health, career positioning, and the individual’s relationship with
            their own ego. Saurabh frequently observes clients experiencing a
            crystallising sense of purpose during these years, sometimes accompanied by
            a public milestone or a pivotal shift in professional standing.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Results depend entirely on the natal placement. A luminary dignified in Leo,
            Aries, or an angular house can bring promotions, recognition, and a
            consolidation of personal power. A solar placement in Libra, debilitated and
            under affliction, may surface ego-wound themes, health events related to the
            heart or eyes, or challenges with authority figures. The sub-periods
            (antardasha) within this six-year cycle refine these themes month by month.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Because Surya rules the immune system and vitality in Ayurvedic and
            astrological terms, Mahadasha outcomes often manifest physically as well as
            circumstantially. Saurabh therefore recommends a wellbeing baseline at the
            start of Surya dasha, and gentle lifestyle disciplines that can support the
            body through the period’s intensity.
          </p>

          <SectionDivider />

          {/* ── Section 6: Remedies ──────────────────────────────── */}
          <div className="flex items-center gap-4 mb-3">
            <IconLeaf size={40} className="text-yellow-600 flex-shrink-0" aria-hidden="true" />
            <h2 className="font-caveat text-5xl md:text-6xl text-yellow-700 leading-none">
              Traditional Remedies for a Weak or Afflicted Sun
            </h2>
          </div>
          <div className="h-0.5 w-32 bg-gradient-to-r from-yellow-500 via-orange-400 to-transparent mb-8" />

          <p className="text-lg leading-relaxed mb-6 first-letter:font-caveat first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-yellow-700 first-letter:leading-none">
            Classical Vedic remedies for this luminary are grounded in lifestyle,
            mantra, and charity. They can support a well-placed but weak position, and
            they work best when practised consistently over a dasha-appropriate window,
            not as quick fixes. None of these carry medical or financial guarantees and
            should be adopted with clear intention rather than expectation.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-10">
            <RemedyCard
              icon={<IconSun size={24} className="text-yellow-700" />}
              title={<>Chant at Sunrise</>}
              text={
                <>
                  <Mark>Chant the Surya mantra at sunrise</Mark>, facing East.
                </>
              }
            />
            <RemedyCard
              icon={<IconDroplet size={24} className="text-yellow-700" />}
              title={<>Offer Arghya</>}
              text={
                <>
                  Offer Arghya, a stream of water mixed with red flowers, to the rising
                  Sun each morning.
                </>
              }
            />
            <RemedyCard
              icon={<IconDiamond size={24} className="text-yellow-700" />}
              title={<>Wear Ruby</>}
              text={
                <>
                  Wear Ruby (Manikya) set in gold on the ring finger of the right hand,
                  only after <Mark>astrological verification</Mark>.
                </>
              }
            />
            <RemedyCard
              icon={<IconYoga size={24} className="text-yellow-700" />}
              title={<>Surya Namaskar</>}
              text={
                <>
                  Practise <Mark>Surya Namaskar</Mark> twelve rounds daily as a sadhana.
                </>
              }
            />
            <RemedyCard
              icon={<IconHeart size={24} className="text-yellow-700" />}
              title={<>Honour the Father</>}
              text={
                <>
                  Honour the father and father-figures. In the classical view, this
                  alone can shift the Sun’s expression significantly.
                </>
              }
            />
            <RemedyCard
              icon={<IconCalendar size={24} className="text-yellow-700" />}
              title={<>Sunday Fasts</>}
              text={
                <>
                  Observe Sunday fasts with appropriate discipline, breaking them before
                  sunset with simple food.
                </>
              }
            />
            <RemedyCard
              icon={<IconGift size={24} className="text-yellow-700" />}
              title={<>Donate Traditional Offerings</>}
              text={
                <>
                  Donate wheat, jaggery, or copper on Sundays, traditionally before
                  noon.
                </>
              }
            />
          </div>

          <p className="text-lg leading-relaxed mb-6">
            The tradition is careful to note that gemstone recommendations must come
            from a qualified astrologer after chart analysis. Ruby can support a
            placement that is functionally benefic but weak in strength. It can also
            amplify the difficulties of a karmically difficult Sun, which is why Soul
            Infinity never advises gemstone wearing without a prior consultation.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Mantra practice is the most universally safe remedy, and the two mantras
            above (the Navagraha Stotra verse and the short Om Sūryāya namaḥ) are the
            classical entry points. A suggested starting cadence is 108 repetitions at
            sunrise, continuing for at least 40 days to allow the vibration to settle
            into daily life.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Lifestyle adjustments matter equally. Waking near sunrise, stepping into
            early morning sunlight for a few minutes, and structuring the day around a
            clear dharmic intention all feed the solar current in the chart. These
            small disciplines can sometimes do more than elaborate rituals.
          </p>

          <SectionDivider />

          {/* ── Section 7: Modern Life ───────────────────────────── */}
          <div className="flex items-center gap-4 mb-3">
            <IconHeartHandshake size={40} className="text-yellow-600 flex-shrink-0" aria-hidden="true" />
            <h2 className="font-caveat text-5xl md:text-6xl text-yellow-700 leading-none">
              Surya in Modern Life
            </h2>
          </div>
          <div className="h-0.5 w-32 bg-gradient-to-r from-yellow-500 via-orange-400 to-transparent mb-8" />

          <p className="text-lg leading-relaxed mb-6 first-letter:font-caveat first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-yellow-700 first-letter:leading-none">
            The ancient symbolism of Surya translates directly into contemporary themes.{' '}
            <Mark>Self-confidence</Mark>, <Mark>purpose</Mark>-finding, and the capacity
            for <Mark>leadership</Mark> are all expressions of a healthy solar
            principle. In a culture of distraction, the Sun represents the ability to
            hold a clear inner centre and act from it with steady integrity.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Modern clients often come to Soul Infinity asking about career direction,
            visibility, and relationships with authority. These are textbook Sun
            questions. The answers almost always involve building a stable daily rhythm,
            protecting vitality, and aligning work with a deeper sense of dharma rather
            than chasing external validation.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Practical modern expressions of Surya sadhana include a consistent morning
            routine that greets sunrise, time offline to protect focus, and periodic
            retreats that allow the soul-current to reset. None of this is mystical in
            the theatrical sense. It is simply the ancient wisdom applied to the
            architecture of a twenty-first-century life.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            A useful clarifier here: modern psychology talks about self-actualisation
            and inner locus of control, both of which map cleanly onto a healthy solar
            principle in a chart. When clients describe feeling scattered, overextended,
            or vaguely purposeless, the astrological diagnosis often lands on an
            under-supported luminary that can be strengthened through lifestyle rather
            than elaborate ritual. This reframe helps secular-minded clients engage with
            remedies without feeling they must abandon their rational outlook.
          </p>

          <SectionDivider />

          {/* ── Section 8: Saurabh Jain (gradient card) ──────────── */}
          <div className="my-8 rounded-2xl border border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 p-8 md:p-10 shadow-lg">
            <div className="flex items-center gap-4 mb-5">
              <IconUserCircle size={40} className="text-yellow-600 flex-shrink-0" aria-hidden="true" />
              <h2 className="font-caveat text-5xl md:text-6xl text-yellow-700 leading-none">
                How Saurabh Jain Reads Surya in Your Chart
              </h2>
            </div>
            <div className="h-0.5 w-32 bg-gradient-to-r from-yellow-500 via-orange-400 to-transparent mb-6" />

            <div className="flex flex-wrap gap-2 mb-6">
              <CredentialBadge>M.Tech</CredentialBadge>
              <CredentialBadge>MBA</CredentialBadge>
              <CredentialBadge>M.Phil</CredentialBadge>
              <CredentialBadge>K.N. Rao Institute trained</CredentialBadge>
            </div>

            <p className="text-lg leading-relaxed mb-6 first-letter:font-caveat first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-yellow-700 first-letter:leading-none">
              Saurabh Jain brings a multi-system approach to solar analysis. Trained at
              the <Mark>K.N. Rao Institute</Mark> and holding an M.Tech, MBA, and
              M.Phil, he combines classical <Mark>Parashari Jyotish</Mark> with{' '}
              <Mark>BNN</Mark> and <Mark>KP</Mark> Astrology to triangulate the Sun’s
              role in a chart. This layered method surfaces patterns that a
              single-system reading can miss, from dasha-timed recognition events to
              subtle health signals.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              A personalised Surya analysis includes a review of house and sign
              placement, Shadbala and Ashtakavarga strength, nakshatra lord behaviour,
              and the classical timing tools that indicate when the solar promise is
              set to activate. Clients leave with concrete lifestyle, mantra, and
              remedial guidance, and where appropriate, a considered gemstone
              recommendation. Saurabh also walks through the running Vimshottari and
              Yogini dashas so that the near-term unfolding is mapped out clearly, not
              left abstract. Where relevant, he cross-checks the reading against a
              Bhrigu Nandi Nadi axis or a KP sub-lord query, which lets a single
              question receive a consistent answer across three classical lenses. The
              practice is less about predicting a fixed future and more about showing
              the client the cycles they are already in, so decisions land with more
              clarity.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors"
            >
              Book a Surya reading
              <IconArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── Section 8: FAQ ───────────────── */}
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

      {/* ───────────────── Section 9: Related + CTA ───────────────── */}
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
          background: 'linear-gradient(to bottom, #1a0f05, #000000)',
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-caveat text-4xl md:text-5xl text-yellow-400">
            Want a personalised Surya analysis in your birth chart?
          </h2>
          <p className="mt-4 font-poppins text-lg text-white/85">
            Connect with Saurabh Jain, K.N. Rao Institute trained astrologer, for a
            detailed reading.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919079053840"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-colors"
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
