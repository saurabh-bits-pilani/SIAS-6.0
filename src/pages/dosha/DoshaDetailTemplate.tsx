import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  CircleDot,
  Clock,
  Heart,
  Home,
  ShieldCheck,
  Star,
  Target,
  type LucideIcon,
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import SchemaMarkup from '../../components/SchemaMarkup';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getFaqPageSchemaFromList } from '../../data/schema-entities';

export interface IntroCard {
  title: string;
  body: string;
  icon: LucideIcon;
  dark?: boolean;
}

export interface DetailCard {
  num: string;
  heading: string;
  desc: string;
  icon: LucideIcon;
  color: string;
}

export interface Remedy {
  main: string;
  detail: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface StripItem {
  title: string;
  body: string;
}

export interface DoshaDetailData {
  theme: {
    light: string;
    border: string;
    dark: string;
    accent: string;
    accentText: string;
    secondary: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
    url: string;
    image: string;
    articleHeadline: string;
    articleDescription: string;
    webpageName: string;
    webpageDescription: string;
  };
  hero: {
    url: string;
    alt: string;
  };
  quickFacts: {
    url: string;
    alt: string;
  };
  breadcrumbLabel: string;
  breadcrumbSchemaLabel: string;
  sanskritName: string;
  englishName: string;
  h1: string;
  subtitleParts: readonly string[];
  introCards: readonly IntroCard[];
  ruling: {
    heading: string;
    body: string;
    power: string;
    affliction: string;
    mahadasha: string;
  };
  stripTitle: string;
  stripItems: readonly StripItem[];
  mantra: {
    devanagari: string;
    iast: string;
    english: string;
    instructionPrimary: string;
    instructionSecondary: string;
  };
  traits: {
    heading: string;
    subheading: string;
    strengthsTitle: string;
    challengesTitle: string;
    strengths: readonly string[];
    challenges: readonly string[];
  };
  detailSection: {
    heading: string;
    subheading: string;
    icon: LucideIcon;
    items: readonly DetailCard[];
  };
  remedies: {
    heading: string;
    subheading: string;
    items: readonly Remedy[];
  };
  faqIntro: string;
  faqs: readonly FaqItem[];
  cta: {
    heading: string;
    body: string;
  };
}

function FaqIcon({ index }: { index: number }) {
  const shared = {
    className: 'h-6 w-6 text-purple-700',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    viewBox: '0 0 24 24',
  };

  if (index === 0) {
    return (
      <svg {...shared} aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg {...shared} aria-hidden="true">
        <path d="M4 12h16" />
        <path d="M7 6h10" />
        <path d="M7 18h10" />
        <path d="M12 3v18" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg {...shared} aria-hidden="true">
        <path d="M20 6v5h-5" />
        <path d="M4 18v-5h5" />
        <path d="M18.4 9A7 7 0 0 0 6.1 6.6L4 9" />
        <path d="M5.6 15A7 7 0 0 0 17.9 17.4L20 15" />
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg {...shared} aria-hidden="true">
        <circle cx="8" cy="8" r="3" />
        <circle cx="16" cy="8" r="3" />
        <path d="M3 21c1-4 2.8-6 5-6s4 2 5 6" />
        <path d="M11 21c1-4 2.8-6 5-6s4 2 5 6" />
      </svg>
    );
  }

  return (
    <svg {...shared} aria-hidden="true">
      <path d="M12 20s-7-4.4-9-8.7C1.8 8.8 3.3 6 6 6c1.7 0 3 1 3.8 2.2C10.7 7 12 6 13.7 6c2.7 0 4.2 2.8 3 5.3C14.7 15.6 12 20 12 20Z" />
      <path d="M18 10.5c1.7.2 3 1.5 3 3.2 0 2.7-3.8 5-5.5 6" />
    </svg>
  );
}

function FaqItemCard({
  faq,
  index,
  open,
  onToggle,
}: {
  faq: FaqItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-purple-100 bg-indigo-50 shadow-sm">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100 ring-1 ring-purple-200">
          <FaqIcon index={index} />
        </span>
        <span className="h-12 w-px shrink-0 bg-purple-200" aria-hidden="true" />
        <span className="flex-1 font-poppins text-base font-medium leading-snug text-gray-900 md:text-lg">
          {faq.question}
        </span>
        <span
          className={`ml-2 text-3xl leading-none text-purple-700 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
          aria-hidden="true"
        >
          ›
        </span>
      </button>
      {open ? (
        <div className="border-t border-purple-100 px-5 pb-6 pt-1 sm:px-6">
          <p className="ml-16 border-l border-purple-200 pl-5 text-sm leading-relaxed text-gray-700 md:text-base">
            {faq.answer}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function TraitPanel({
  title,
  rows,
  icon: Icon,
  color,
}: {
  title: string;
  rows: readonly string[];
  icon: LucideIcon;
  color: string;
}) {
  return (
    <div className="overflow-hidden rounded-[20px] bg-white shadow-lg">
      <div className="flex items-center gap-4 p-5" style={{ background: color }}>
        <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-white p-3">
          <Icon className="h-7 w-7" style={{ color }} aria-hidden="true" />
        </div>
        <h3 className="m-0 text-2xl font-bold text-white">{title}</h3>
      </div>
      <div className="divide-y divide-red-50 bg-white">
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-red-50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
              <Activity className="h-5 w-5 text-red-700" aria-hidden="true" />
            </div>
            <div className="flex-1 text-sm font-bold text-gray-800">{row}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DoshaDetailTemplate({ data }: { data: DoshaDetailData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const DetailIcon = data.detailSection.icon;
  const faqSchema = getFaqPageSchemaFromList(
    data.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
  );
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.seo.articleHeadline,
    description: data.seo.articleDescription,
    image: data.hero.url,
    author: {
      '@type': 'Person',
      name: 'Saurabh Jain',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Soul Infinity',
    },
    mainEntityOfPage: data.seo.url,
  };

  return (
    <>
      <SEOHead
        title={data.seo.title}
        description={data.seo.description}
        keywords={data.seo.keywords}
        image={data.seo.image}
        url={data.seo.url}
        type="article"
        omitDefaultSchema
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: data.seo.webpageName,
          description: data.seo.webpageDescription,
          url: new URL(data.seo.url).pathname,
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Doshas', url: '/dosha' },
          { name: data.breadcrumbSchemaLabel, url: new URL(data.seo.url).pathname },
        ]}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <img
        src={data.hero.url}
        alt={data.hero.alt}
        className="w-full h-auto block"
        loading="eager"
        fetchpriority="high"
      />

      <div className="bg-white">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Doshas', href: '/dosha' },
            { label: data.breadcrumbLabel },
          ]}
        />
      </div>

      <section className="bg-white px-4 pb-8 pt-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] md:text-base" style={{ color: data.theme.accentText }}>
            <span className="font-devanagari" lang="sa">{data.sanskritName}</span>
            <span className="mx-2 opacity-60">·</span>
            {data.englishName}
          </p>
          <h1 className="mb-2 font-caveat text-5xl font-bold leading-tight text-gray-900 md:text-7xl">
            {data.h1}
          </h1>
          <p className="text-base text-gray-700 md:text-lg">
            {data.subtitleParts.map((part, index) => (
              <span key={part}>
                {index > 0 ? <span className="mx-2 text-gray-400">·</span> : null}
                {part}
              </span>
            ))}
          </p>
        </div>
      </section>

      <section className="px-6 py-12" style={{ background: data.theme.light }}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            {data.introCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className={`flex gap-3 rounded-xl p-4 ${card.dark ? 'text-white' : 'bg-white text-gray-900'}`}
                  style={{
                    background: card.dark ? data.theme.dark : undefined,
                    border: `1px solid ${data.theme.border}`,
                  }}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${card.dark ? 'bg-white' : ''}`}
                    style={{ background: card.dark ? '#fff' : data.theme.secondary, color: data.theme.accentText }}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className={`mb-1 font-heading text-base font-bold ${card.dark ? 'text-white' : ''}`} style={{ color: card.dark ? undefined : data.theme.accentText }}>
                      {card.title}
                    </h3>
                    <p className={`m-0 text-sm leading-relaxed ${card.dark ? 'text-white/90' : 'text-gray-700'}`}>
                      {card.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 lg:col-span-7">
            <img
              src={data.quickFacts.url}
              alt={data.quickFacts.alt}
              className="block h-auto w-full rounded-xl shadow-lg"
              loading="lazy"
            />

            <div className="rounded-xl bg-white p-4" style={{ border: `1px solid ${data.theme.border}` }}>
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ background: data.theme.secondary, color: data.theme.accentText }}>
                  <Star className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="mb-1 font-heading text-base font-bold" style={{ color: data.theme.accentText }}>
                    {data.ruling.heading}
                  </h2>
                  <p className="m-0 text-sm leading-relaxed text-gray-700">
                    {data.ruling.body}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-4" style={{ border: `1px solid ${data.theme.border}` }}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="flex gap-3 md:col-span-2">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ background: data.theme.secondary, color: data.theme.accentText }}>
                    <Target className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-heading text-base font-bold text-gray-900">
                      Power and Potential
                    </h3>
                    <p className="m-0 text-sm leading-relaxed text-gray-700">
                      {data.ruling.power}
                    </p>
                  </div>
                </div>
                <div className="rounded-lg p-3" style={{ background: data.theme.light, border: `1px solid ${data.theme.border}` }}>
                  <p className="m-0 text-xs italic leading-relaxed" style={{ color: data.theme.accentText }}>
                    {data.ruling.affliction}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 rounded-xl bg-white p-4" style={{ border: `1px solid ${data.theme.border}` }}>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ background: data.theme.secondary, color: data.theme.accentText }}>
                <Clock className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="mb-1 font-heading text-base font-bold text-gray-900">
                  Mahadasha Timing
                </h3>
                <p className="m-0 text-sm leading-relaxed text-gray-700">
                  {data.ruling.mahadasha}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-white p-5" style={{ border: `1px solid ${data.theme.border}` }}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ background: data.theme.secondary, color: data.theme.accentText }}>
                  <Home className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="m-0 font-heading text-lg font-bold text-gray-900">
                  {data.stripTitle}
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {data.stripItems.map((item) => (
                  <div key={item.title} className="rounded-lg p-3 text-center" style={{ background: data.theme.light, border: `1px solid ${data.theme.border}` }}>
                    <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full" style={{ background: data.theme.secondary, color: data.theme.accentText }}>
                      <Star className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="font-heading text-sm font-bold" style={{ color: data.theme.accentText }}>{item.title}</div>
                    <div className="mt-1 text-xs text-gray-600">{item.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex items-center" style={{ background: data.theme.dark }}>
        <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center text-white sm:px-6 lg:px-8">
          <div className="mb-5 font-devanagari text-3xl leading-relaxed text-amber-300 md:text-4xl" lang="sa">
            {data.mantra.devanagari}
          </div>
          <div className="mb-3 text-lg italic text-white md:text-xl">
            {data.mantra.iast}
          </div>
          <div className="mx-auto mb-6 max-w-xl text-sm text-white/80 md:text-base">
            {data.mantra.english}
          </div>
          <div className="inline-block rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-gray-900 shadow-md">
            {data.mantra.instructionPrimary}
            <span className="mx-2">·</span>
            {data.mantra.instructionSecondary}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-16" style={{ background: data.theme.light }}>
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              {data.traits.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-gray-600">
              {data.traits.subheading}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TraitPanel title={data.traits.strengthsTitle} rows={data.traits.strengths} icon={ShieldCheck} color={data.theme.accent} />
            <TraitPanel title={data.traits.challengesTitle} rows={data.traits.challenges} icon={AlertTriangle} color="#b91c1c" />
          </div>
        </div>
      </section>

      <section className="px-6 py-16" style={{ background: data.theme.light }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full" style={{ background: data.theme.secondary, color: data.theme.accentText }}>
              <DetailIcon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mb-3 font-heading text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              {data.detailSection.heading}
            </h2>
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: data.theme.accentText }}>
              {data.detailSection.subheading}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.detailSection.items.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.num} className="rounded-2xl bg-white p-4" style={{ border: `1px solid ${item.color}4d` }}>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-white" style={{ background: item.color }}>
                      {item.num}
                    </div>
                    <Icon className="h-6 w-6" style={{ color: item.color }} aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-heading text-[11px] font-bold tracking-wider" style={{ color: item.color }}>
                    {item.heading}
                  </h3>
                  <div className="mb-3 h-px" style={{ background: item.color, opacity: 0.3 }} />
                  <p className="mb-0 text-[13px] leading-snug text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-16" style={{ background: data.theme.dark }}>
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
              {data.remedies.heading}
            </h2>
            <p className="text-base text-white/70">
              {data.remedies.subheading}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {data.remedies.items.map((remedy) => (
              <div
                key={remedy.main}
                className="rounded-xl p-5"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(245,158,11,0.35)',
                }}
              >
                <p className="m-0 mb-2 text-sm font-semibold leading-relaxed text-white">
                  {remedy.main}
                </p>
                <p className="m-0 text-xs leading-relaxed text-white/70">
                  <span aria-hidden="true" className="mr-1">›</span>
                  {remedy.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-purple-50 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="font-kalam text-4xl font-bold text-gray-950 md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600">
              {data.faqIntro}
            </p>
          </div>
          <div className="space-y-4">
            {data.faqs.map((faq, index) => (
              <FaqItemCard
                key={faq.question}
                faq={faq}
                index={index}
                open={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 text-white" style={{ background: `linear-gradient(90deg, ${data.theme.dark}, ${data.theme.accent})` }}>
        <div className="absolute inset-0 opacity-15">
          <img
            src={data.hero.url}
            alt=""
            aria-hidden="true"
            className="w-full h-auto block"
            loading="lazy"
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 font-heading text-3xl font-bold md:text-4xl">
            {data.cta.heading}
          </h2>
          <p className="mb-8 text-xl leading-relaxed text-white/85">
            {data.cta.body}
          </p>
          <Link
            to="/contact#contact-form-section"
            className="inline-flex items-center rounded-full bg-amber-400 px-8 py-4 text-lg font-semibold text-gray-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-amber-300"
          >
            Book a Consultation
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
