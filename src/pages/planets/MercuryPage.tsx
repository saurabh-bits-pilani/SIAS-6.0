import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import {
  getArticleSchema,
  getBreadcrumbSchema,
  getWebPageSchema,
  type JsonLd,
  SITE_ORIGIN,
} from '../../data/schema-entities';
import mercuryAssetsRaw from '../../../scripts/planets-mercury-manifest.json';

type MercuryAssets = {
  mercury: {
    ring: { url: string };
    stickyNoteGreen: { url: string };
    ovalBorderGreen: { url: string };
    offeringDurva: { url: string };
    offeringFruitGreen: { url: string };
    offeringMoong: { url: string };
    heroBudha: { url: string };
  };
  shared: {
    parchmentStripe: { url: string };
    notebookPage: { url: string };
    parchmentStickyNote: { url: string };
    sacredGeometry: { url: string };
    featherDoodle: { url: string };
    diya: { url: string };
    offeringGheeLamp: { url: string };
    mandala: { url: string };
    bgLarge: { url: string };
    bgSmall: { url: string };
    stripBg: { url: string };
    allFooterImages: { url: string };
    offeringTulsi: { url: string };
  };
};

const mercuryAssets = mercuryAssetsRaw as MercuryAssets;

const PAGE_TITLE = 'Budh (Mercury) | The Awakened Intelligence | Soul Infinity';
const PAGE_DESCRIPTION =
  "Discover Budh (Mercury), the planet of intellect, communication, and adaptability. Mantras, gemstone (Emerald), remedies, and Vedic traditions to awaken Budh's blessings.";
const PAGE_KEYWORDS =
  'budh, budha, mercury in vedic astrology, budh mantra, emerald panna, mercury remedies, communication planet, intellect astrology, soul infinity';
const PAGE_URL = `${SITE_ORIGIN}/planets/mercury`;

const HERO_URL = mercuryAssets.mercury.heroBudha.url;
const RING_URL = mercuryAssets.mercury.ring.url;
const STICKY_NOTE_URL = mercuryAssets.mercury.stickyNoteGreen.url;
const OVAL_BORDER_URL = mercuryAssets.mercury.ovalBorderGreen.url;
const MOONG_URL = mercuryAssets.mercury.offeringMoong.url;
const DURVA_URL = mercuryAssets.mercury.offeringDurva.url;
const GREEN_FRUIT_URL = mercuryAssets.mercury.offeringFruitGreen.url;
const NOTEBOOK_URL = mercuryAssets.shared.notebookPage.url;
const PARCHMENT_STRIPE_URL = mercuryAssets.shared.parchmentStripe.url;
const SACRED_GEOMETRY_URL = mercuryAssets.shared.sacredGeometry.url;
const FEATHER_URL = mercuryAssets.shared.featherDoodle.url;
const DIYA_URL = mercuryAssets.shared.diya.url;
const GHEE_LAMP_URL = mercuryAssets.shared.offeringGheeLamp.url;
const TULSI_URL = mercuryAssets.shared.offeringTulsi.url;
const MANDALA_URL = mercuryAssets.shared.mandala.url;
const BG_SMALL_URL = mercuryAssets.shared.bgSmall.url;
const STRIP_BG_URL = mercuryAssets.shared.stripBg.url;
const PAGE_NEBULA_URL =
  'https://pub-e1337dd263d041bba0fa87fe1c597575.r2.dev/Pillar/Hub/Planets/bg-nebula-overlay.webp';

type IconName =
  | 'planet'
  | 'air'
  | 'nature'
  | 'metal'
  | 'day'
  | 'direction'
  | 'intellect'
  | 'governs'
  | 'sign'
  | 'up'
  | 'down'
  | 'symbol'
  | 'benefit'
  | 'practice'
  | 'gem'
  | 'memory'
  | 'wit'
  | 'communication'
  | 'analysis'
  | 'learning'
  | 'adaptability';

type QuickFact = {
  icon: IconName;
  label: string;
  value: string;
};

type MantraBlock = {
  title: string;
  devanagari: string;
  iast: string;
  meaning: string;
};

type DetailRow = {
  icon: IconName;
  label: string;
  value: string;
};

type AttributeCard = {
  icon: IconName;
  title: string;
  sub: string;
};

const quickFacts: QuickFact[] = [
  { icon: 'planet', label: 'Planet', value: 'Budh' },
  { icon: 'air', label: 'Element', value: 'Air' },
  { icon: 'nature', label: 'Nature', value: 'Neutral' },
  { icon: 'metal', label: 'Metal', value: 'Bronze' },
  { icon: 'day', label: 'Day', value: 'Wednesday' },
  { icon: 'direction', label: 'Direction', value: 'North' },
];

const mantras: MantraBlock[] = [
  {
    title: 'Navagraha Stotra, Budh Mantra',
    devanagari:
      'प्रियंगुकलिकाश्यामं रूपेणाप्रतिमं बुधम् । सौम्यं सौम्यगुणोपेतं तं बुधं प्रणमाम्यहम् ॥',
    iast:
      'Priyaṅgu-kalikā-śyāmaṁ rūpeṇāpratimaṁ budham | Saumyaṁ saumya-guṇopetaṁ taṁ budhaṁ praṇamāmyaham ||',
    meaning:
      'I bow to Budh, dark like the bud of the priyaṅgu flower, incomparable in form, gentle and endowed with refined qualities, the awakener of intelligence and graceful expression.',
  },
];

const lifeRows: DetailRow[] = [
  {
    icon: 'intellect',
    label: 'Represents',
    value: 'Intellect, communication, analysis, learning',
  },
  {
    icon: 'governs',
    label: 'Governs',
    value: 'Speech, writing, commerce, logic, memory',
  },
  { icon: 'sign', label: 'Signs Ruled', value: 'Gemini (Mithuna), Virgo (Kanya)' },
  { icon: 'up', label: 'Exalted In', value: 'Virgo (Kanya)' },
  { icon: 'down', label: 'Debilitated In', value: 'Pisces (Meena)' },
  { icon: 'direction', label: 'Direction', value: 'North' },
  { icon: 'symbol', label: 'Symbol', value: 'Hexagonal yantra, sacred book' },
];

const benefits = [
  'Enhances intelligence and clarity',
  'Improves communication skills',
  'Strengthens memory and learning',
  'Brings success in business and trade',
  'Helps in exams and academics',
  'Promotes adaptability and wit',
];

const connectPractices = [
  'Chant Budh mantra on Wednesdays with a clear and steady mind.',
  'Offer green moong dal with sincerity and gratitude.',
  'Wear Emerald, Panna, in silver or bronze on the little finger after chart verification.',
  'Read spiritual and intellectual books that sharpen discernment.',
  'Practice meditation and pranayama to refine the mind and speech.',
];

const attributes: AttributeCard[] = [
  { icon: 'intellect', title: 'Intellect', sub: 'Clear understanding' },
  { icon: 'communication', title: 'Communication', sub: 'Wise expression' },
  { icon: 'analysis', title: 'Analysis', sub: 'Discern the pattern' },
  { icon: 'learning', title: 'Learning', sub: 'Absorb and integrate' },
  { icon: 'adaptability', title: 'Adaptability', sub: 'Respond with grace' },
  { icon: 'memory', title: 'Memory', sub: 'Retain what matters' },
  { icon: 'wit', title: 'Wit', sub: 'Quickness with balance' },
];

const notebookStyle = {
  backgroundImage: `linear-gradient(rgba(247,240,223,0.96), rgba(247,240,223,0.96)), url(${NOTEBOOK_URL})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const stripeStyle = {
  backgroundImage: `linear-gradient(rgba(246,234,206,0.93), rgba(246,234,206,0.93)), url(${PARCHMENT_STRIPE_URL}), url(${STRIP_BG_URL})`,
  backgroundSize: 'cover, cover, cover',
  backgroundPosition: 'center',
};

const pageShellStyle = {
  backgroundImage: `linear-gradient(rgba(6,26,20,0.76), rgba(6,26,20,0.9)), url(${PAGE_NEBULA_URL})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center top',
  backgroundAttachment: 'fixed',
  backgroundColor: '#061a14',
};

const StickyOval = () => (
  <svg viewBox="0 0 200 90" className="h-16 w-36 text-[#b3202a]" fill="none" stroke="currentColor" strokeWidth="3">
    <ellipse cx="100" cy="44" rx="82" ry="28" />
    <path d="M24 50c12-5 34-8 69-8 48 0 79 8 90 13" strokeLinecap="round" opacity="0.8" />
  </svg>
);

const NebulaDoodle = ({ className = '' }: { className?: string }) => (
  <svg
    className={`pointer-events-none ${className}`}
    viewBox="0 0 900 600"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    {Array.from({ length: 70 }).map((_, i) => {
      const x = (i * 131.3) % 900;
      const y = (i * 83.7) % 600;
      const r = 0.8 + (((i * 17) % 9) / 9) * 1.6;
      const opacity = 0.18 + (((i * 13) % 10) / 10) * 0.65;
      return <circle key={i} cx={x} cy={y} r={r} fill="#d9f99d" opacity={opacity} />;
    })}
  </svg>
);

const MercuryOrbitDoodle = ({ className = '' }: { className?: string }) => (
  <svg
    className={`pointer-events-none ${className}`}
    viewBox="0 0 900 600"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <ellipse cx="470" cy="290" rx="160" ry="118" fill="none" stroke="#22c55e" strokeWidth="1.1" strokeDasharray="5 8" opacity="0.32" />
    <ellipse cx="470" cy="290" rx="215" ry="156" fill="none" stroke="#86efac" strokeWidth="1" strokeDasharray="4 10" opacity="0.28" />
    <ellipse cx="470" cy="290" rx="280" ry="205" fill="none" stroke="#22c55e" strokeWidth="0.9" strokeDasharray="3 11" opacity="0.22" />
  </svg>
);

function iconSvg(name: IconName, className = 'h-6 w-6'): JSX.Element {
  const base = 'none';
  switch (name) {
    case 'planet':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M4 14c2.4 2.6 13 4 16 1.2 1.6-1.5-.3-3.6-2.8-4.8-2.5-1.2-7.2-2-11-.7C3.6 10.5 2.9 12.8 4 14Z" />
        </svg>
      );
    case 'air':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M4 9c2-2 4.2-2.3 6.2-.8 1.5 1.1 3.1 1.1 4.7-.1 2-1.4 3.9-1.2 5.1.9" />
          <path d="M3 13c2.4-1.7 4.7-1.8 6.8-.3 1.4 1 2.8 1 4.2.1 2.3-1.6 4.5-1.4 6.8.3" />
          <path d="M5 17c1.9-1.1 3.7-1.1 5.5 0 1.1.7 2.2.7 3.3 0 1.9-1.1 3.8-1.1 5.7 0" />
        </svg>
      );
    case 'nature':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="4.7" />
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
        </svg>
      );
    case 'metal':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="m12 3 7 4v10l-7 4-7-4V7l7-4Z" />
          <path d="M5 8.5 12 13l7-4.5M12 13v8" />
        </svg>
      );
    case 'day':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <rect x="3" y="5" width="18" height="16" rx="2.5" />
          <path d="M7 3v4M17 3v4M3 10h18" />
        </svg>
      );
    case 'direction':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="7.5" />
          <path d="m12 6 3 6h-6l3-6Zm0 6v5" />
        </svg>
      );
    case 'intellect':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M9 9.5a3 3 0 1 1 6 0c0 1.2-.5 1.8-1.3 2.4-.7.6-1.2 1.1-1.2 2.1h-1.2c0-1.3.5-2.1 1.3-2.7.8-.6 1.1-1 1.1-1.8a1.7 1.7 0 1 0-3.4 0H9Z" />
          <path d="M10 17h4M8 5.8A6.3 6.3 0 0 1 18 10c0 1.6-.5 2.8-1.5 3.8-.7.8-1.2 1.5-1.2 2.7h-6.6c0-1.2-.5-1.9-1.2-2.7A5.6 5.6 0 0 1 6 10a6 6 0 0 1 2-4.2Z" />
        </svg>
      );
    case 'governs':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M4 18h16M6 18V8l6-4 6 4v10M9 12h6M9 15h6" />
        </svg>
      );
    case 'sign':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M7 5c2.2 0 4 1.8 4 4v10" />
          <path d="M17 5c-2.2 0-4 1.8-4 4v10" />
          <path d="M7 5h10" />
        </svg>
      );
    case 'up':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 19V5M6.5 10.5 12 5l5.5 5.5" />
        </svg>
      );
    case 'down':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 5v14M17.5 13.5 12 19l-5.5-5.5" />
        </svg>
      );
    case 'symbol':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 4 18 8v8l-6 4-6-4V8l6-4Z" />
          <path d="M9.5 9.5h5v5h-5z" />
        </svg>
      );
    case 'benefit':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.9">
          <path d="m5 12 4 4 10-10" />
        </svg>
      );
    case 'practice':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 3v18M3 12h18" />
          <circle cx="12" cy="12" r="5.5" />
        </svg>
      );
    case 'gem':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="m7 4-3 5 8 11 8-11-3-5H7Z" />
          <path d="m9 4 3 5 3-5M4 9h16" />
        </svg>
      );
    case 'memory':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M7 5h10a2 2 0 0 1 2 2v12l-4-2-3 2-3-2-4 2V7a2 2 0 0 1 2-2Z" />
          <path d="M9 9h6M9 12h6" />
        </svg>
      );
    case 'wit':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 4c3.8 0 7 3 7 6.8 0 2.8-1.7 5.2-4.2 6.3L12 20l-2.8-2c-2.5-1.1-4.2-3.5-4.2-6.3C5 7 8.2 4 12 4Z" />
          <path d="M9 10h6M10 13h4" />
        </svg>
      );
    case 'communication':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M5 18V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3v-2Z" />
          <path d="M8.5 9h7M8.5 12h5" />
        </svg>
      );
    case 'analysis':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M4 18h16M7 15V9M12 15V6M17 15v-3" />
          <circle cx="7" cy="8" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="12" cy="5" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="17" cy="11" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'learning':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M4 6.5 12 4l8 2.5L12 9 4 6.5Z" />
          <path d="M6 8.5V14c0 1.7 2.7 3 6 3s6-1.3 6-3V8.5" />
        </svg>
      );
    case 'adaptability':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={base} stroke="currentColor" strokeWidth="1.7">
          <path d="M7 7c1.8-1.9 4.2-3 7-3v4l5-5-5-5v4c-3.9 0-7.3 1.5-9.8 4.2" transform="translate(0 5)" />
          <path d="M17 17c-1.8 1.9-4.2 3-7 3v-4l-5 5 5 5v-4c3.9 0 7.3-1.5 9.8-4.2" transform="translate(0 -5)" />
        </svg>
      );
  }
}

function Highlight({ children }: { children: string }) {
  return <span className="highlight-marker rounded px-1.5 py-0.5 text-slate-900">{children}</span>;
}

function getOfferingFallback(src: string, className: string) {
  const strokeProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  if (src.includes('moong')) {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path d="M10 18c0-4.5 3.3-8 7.6-8 2.8 0 5.1 1.2 6.8 3.2-1 6.2-4.7 10-9.4 10-3 0-5-1.8-5-5.2Z" {...strokeProps} />
        <path d="M13.5 14.5c2 1 3.6 2.7 4.6 5" {...strokeProps} />
        <path d="M8.5 20.5c.7 1.7 2.1 2.9 4.1 3.5" {...strokeProps} />
      </svg>
    );
  }

  if (src.includes('tulsi')) {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path d="M16 8v16" {...strokeProps} />
        <path d="M16 14c-4.2 0-7-2.7-7-6 4 0 7 2.3 7 6Z" {...strokeProps} />
        <path d="M16 14c4.2 0 7-2.7 7-6-4 0-7 2.3-7 6Z" {...strokeProps} />
        <path d="M16 21c-3.7 0-6.1-2.4-6.1-5.3 3.5 0 6.1 2 6.1 5.3Z" {...strokeProps} />
        <path d="M16 21c3.7 0 6.1-2.4 6.1-5.3-3.5 0-6.1 2-6.1 5.3Z" {...strokeProps} />
      </svg>
    );
  }

  if (src.includes('fruit-green')) {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <circle cx="13" cy="18" r="6.5" {...strokeProps} />
        <circle cx="19.5" cy="17" r="5.5" {...strokeProps} />
        <path d="M16 10c.2-2.5 1.5-4 3.8-4.8" {...strokeProps} />
        <path d="M16.5 8.5c1.5-1 3.2-1.2 5.1-.4-1 1.8-2.6 2.7-4.8 2.8" {...strokeProps} />
      </svg>
    );
  }

  if (src.includes('durva')) {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path d="M8 24c4-2 6.4-6.4 7.1-13.2" {...strokeProps} />
        <path d="M12 24c2.9-2.1 4.6-5.8 5-10.9" {...strokeProps} />
        <path d="M16 24c1.7-1.9 2.8-4.7 3.1-8.5" {...strokeProps} />
        <path d="M15 13c-2.5-.3-4.6-1.6-6.4-3.9" {...strokeProps} />
        <path d="M17.2 15.5c2.3-.2 4.3-1.2 6-3.2" {...strokeProps} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M16 7c2.8 3.1 4.2 5.9 4.2 8.6 0 3.3-1.9 5.8-4.2 5.8s-4.2-2.5-4.2-5.8c0-2.7 1.4-5.5 4.2-8.6Z" {...strokeProps} />
      <path d="M10 21h12" {...strokeProps} />
      <path d="M12.5 24h7" {...strokeProps} />
    </svg>
  );
}

function cropOfferingSvg(svgText: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');
  const root = doc.documentElement;
  const defs = root.querySelector('defs');
  const clipRect = root.querySelector('clipPath rect');
  const translatedGroups = Array.from(root.querySelectorAll('g[transform^="matrix(1, 0, 0, 1,"]'));
  const iconGroup = translatedGroups.at(-1);

  if (!clipRect || !iconGroup) {
    return null;
  }

  const width = clipRect.getAttribute('width') ?? '32';
  const height = clipRect.getAttribute('height') ?? '24';
  const clonedGroup = iconGroup.cloneNode(true) as SVGElement;
  clonedGroup.setAttribute('transform', 'matrix(1, 0, 0, 1, 0, 0)');

  const croppedSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet">
      ${defs ? defs.outerHTML : ''}
      ${clonedGroup.outerHTML}
    </svg>
  `;

  return croppedSvg;
}

function OfferingIcon({
  src,
  alt,
  className = 'h-16 w-16',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [markup, setMarkup] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadSvg = async () => {
      try {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`Failed to load ${src}`);
        }
        const text = await response.text();
        const cropped = cropOfferingSvg(text);
        if (active) {
          setMarkup(cropped);
        }
      } catch {
        if (active) {
          setMarkup(null);
        }
      }
    };

    void loadSvg();

    return () => {
      active = false;
    };
  }, [src]);

  return (
    <div className={`${className} flex items-center justify-center text-[#166534]`} role="img" aria-label={alt}>
      {markup ? (
        <span
          className="block h-full w-full"
          dangerouslySetInnerHTML={{ __html: markup }}
        />
      ) : (
        getOfferingFallback(src, 'h-full w-full')
      )}
    </div>
  );
}

function NotebookCard({
  children,
  className = '',
  rotate = '',
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: string;
}) {
  return (
    <div
      className={`card-parchment relative overflow-hidden rounded-[30px] border border-[rgba(245,230,200,0.24)] p-5 text-[#26180d] shadow-[0_26px_60px_rgba(0,0,0,0.42),0_10px_24px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,248,232,0.55)] sm:p-6 ${rotate} ${className}`}
      style={notebookStyle}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white/40 via-white/12 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.16),transparent_64%)]" />
      <div className="pointer-events-none absolute left-5 top-5 h-8 w-24 rounded-full border border-[#1f6a40]/12 opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.34),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(73,43,19,0.18),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-[10px] rounded-[24px] border border-[#7a5a37]/10" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function MercuryPage() {
  const schemas = useMemo<JsonLd[]>(
    () => [
      getArticleSchema({
        headline: 'Budh (Mercury), The Awakened Intelligence',
        description: PAGE_DESCRIPTION,
        image: HERO_URL,
        datePublished: '2026-04-25',
        dateModified: '2026-04-25',
        url: '/planets/mercury',
        articleSection: 'Vedic Astrology',
        keywords: [
          'Budh',
          'Mercury in Vedic astrology',
          'Budh mantra',
          'Emerald gemstone',
          'Mercury remedies',
          'communication planet',
        ],
      }),
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Planets', url: '/planets' },
        { name: 'Budh (Mercury)', url: '/planets/mercury' },
      ]),
      getWebPageSchema({
        name: 'Budh (Mercury), The Awakened Intelligence',
        description: PAGE_DESCRIPTION,
        url: PAGE_URL,
      }),
    ],
    [],
  );

  return (
    <>
      <SEOHead
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        keywords={PAGE_KEYWORDS}
        image={HERO_URL}
        url={PAGE_URL}
        type="article"
        schemas={schemas}
      />

      <div className="min-h-screen text-[#2b1a0f]" style={pageShellStyle}>
        <section
          className="relative overflow-hidden"
          style={pageShellStyle}
        >
          <img
            src={HERO_URL}
            alt="Budh deity artwork"
            fetchpriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[center_22%]"
          />
          <img
            src={SACRED_GEOMETRY_URL}
            alt=""
            className="pointer-events-none absolute right-[6%] top-[6%] hidden h-[78%] w-[42%] object-contain opacity-[0.06] lg:block"
          />
          <div className="absolute inset-0 opacity-[0.08]">
            <NebulaDoodle className="absolute inset-0" />
          </div>

          <div className="mx-auto max-w-[1440px] px-4 pb-8 pt-6 sm:px-6 lg:px-10">
            <div className="relative mt-2 min-h-[42rem] sm:min-h-[48rem] lg:min-h-[52rem]">
              <Link
                to="/planets"
                aria-label="Back to Planets hub"
                className="relative z-20 inline-flex font-caveat text-lg text-[#d7f9df] drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] transition hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22c55e]"
              >
                ← Back to Planets
              </Link>

              <div className="relative z-10 max-w-2xl pt-8 sm:pt-12 lg:max-w-[44rem] lg:pt-16">
                <div className="mb-5 text-sm uppercase tracking-[0.45em] text-[#d7f9df] drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
                  Planetary Wisdom
                </div>
                <h1 className="font-caveat text-[6.3rem] leading-[0.84] text-[#4ade80] drop-shadow-[0_0_34px_rgba(34,197,94,0.6)] sm:text-[7.9rem] lg:text-[9.1rem] xl:text-[9.8rem]">
                  Budh
                </h1>
                <div className="mt-3 flex flex-wrap items-end gap-3">
                  <div className="font-devanagari text-3xl text-[#fff6de] drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-4xl">बुध</div>
                  <div className="font-kalam text-2xl text-[#d7f9df] drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-3xl">(Mercury)</div>
                </div>
                <h2 className="mt-4 font-caveat text-4xl leading-none text-[#fff6de] drop-shadow-[0_3px_12px_rgba(0,0,0,0.6)] sm:text-5xl lg:text-[4rem]">
                  the awakened intelligence
                </h2>

                <div className="mt-8 max-w-[34rem] space-y-3 font-kalam text-[1.75rem] leading-relaxed text-[#fff6de] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] sm:text-[2rem]">
                  <p>
                    Budh refines <Highlight>intellect</Highlight> and <Highlight>communication</Highlight>.
                  </p>
                  <p>
                    He sharpens <Highlight>logic</Highlight> and teaches graceful{' '}
                    <Highlight>adaptability</Highlight>.
                  </p>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 hidden lg:block">
                <MercuryOrbitDoodle className="absolute inset-0 opacity-95" />
                <img src={FEATHER_URL} alt="" className="absolute left-[7%] top-[12%] h-24 w-24 opacity-24" />
                <img src={FEATHER_URL} alt="" className="absolute right-[10%] top-[18%] h-20 w-20 rotate-[20deg] opacity-18" />
              </div>

              <div className="relative z-10 mt-10 lg:absolute lg:bottom-5 lg:left-1/2 lg:w-full lg:max-w-6xl lg:-translate-x-1/2">
                <div className="rounded-[24px] bg-[#f8ecd2]/96 p-2.5 shadow-[0_18px_40px_rgba(89,60,25,0.18)] sm:p-3">
                  <div
                    className="rounded-[20px] px-2 py-2"
                    style={stripeStyle}
                  >
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
                      {quickFacts.map((fact, index) => (
                        <div
                          key={fact.label}
                          className={`flex min-h-[98px] flex-col items-center justify-center px-2.5 py-2.5 text-center sm:min-h-[108px] ${
                            index < quickFacts.length - 1 ? 'lg:border-r lg:border-[#755632]/22' : ''
                          }`}
                        >
                          <div className="text-[#173f28]">{iconSvg(fact.icon, 'h-7 w-7 sm:h-8 sm:w-8')}</div>
                          <div className="mt-1.5 font-caveat text-[1.55rem] leading-none sm:text-[1.85rem]">
                            {fact.label}
                          </div>
                          <div className="mt-1 font-kalam text-[0.98rem] leading-tight text-[#166534] sm:text-[1.08rem]">
                            {fact.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-4 sm:px-6 sm:pt-5 lg:px-10">
            <div className="mt-2 grid gap-5 xl:items-start xl:grid-cols-[1.18fr_0.82fr]">
              <NotebookCard className="h-fit self-start" rotate="xl:-rotate-[0.5deg]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 inline-flex items-center gap-3 rounded-full border border-[#1f6a40]/15 bg-white/45 px-4 py-2 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
                      <span className="font-devanagari text-4xl text-[#1f140d]">ॐ</span>
                      <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                        Sacred Mantras
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-[3px] w-56 rounded-full bg-gradient-to-r from-[#15803d] via-[#4ade80] to-transparent" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/70" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[#1d402b]/75">
                    <img src={FEATHER_URL} alt="" className="h-12 w-12 opacity-65" />
                    {iconSvg('communication', 'h-8 w-8')}
                  </div>
                </div>

                <div className="mt-6 space-y-10">
                  {mantras.map((mantra) => (
                    <div key={mantra.title}>
                      <div className="inline-flex items-center gap-3 rounded-full bg-[#e7f7eb] px-4 py-2 shadow-[0_8px_18px_rgba(34,197,94,0.12)]">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#22c55e]/25 bg-white text-[1.3rem] font-caveat leading-none text-[#15803d]">
                          1
                        </span>
                        <div className="font-caveat text-[2rem] leading-none text-[#15803d] sm:text-[2.35rem]">
                          {mantra.title}
                        </div>
                      </div>

                      <div className="mt-5 rounded-[22px] border-2 border-[#b3202a]/85 bg-[linear-gradient(180deg,rgba(250,241,219,0.98),rgba(246,235,214,0.98))] px-5 py-5 shadow-[0_14px_30px_rgba(179,32,42,0.08),inset_0_0_24px_rgba(34,197,94,0.08)]">
                        <div className="font-devanagari text-[1.8rem] leading-tight text-[#1e120c] sm:text-[2.1rem]">
                          {mantra.devanagari}
                        </div>
                      </div>

                      <div className="mt-5 space-y-3 font-kalam text-xl leading-relaxed text-[#2d1e13]">
                        <div className="rounded-2xl bg-white/35 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                          <span className="font-semibold text-[#166534]">IAST:</span> {mantra.iast}
                        </div>
                        <div className="rounded-2xl bg-white/30 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.42)]">
                          <span className="font-semibold text-[#166534]">Meaning:</span> {mantra.meaning}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Offerings section, added in Mercury, retrofit Sun/Moon in follow-up pass. */}
                <div className="mt-10 border-t border-[#7b603e]/20 pt-8">
                  <div className="inline-flex items-center gap-3 rounded-full bg-[#edf8ef] px-4 py-2 shadow-[0_8px_18px_rgba(34,197,94,0.12)]">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
                    <div className="font-kalam text-[1.4rem] uppercase tracking-[0.12em] text-[#166534]">
                    Offerings
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-5">
                    {[
                      { src: MOONG_URL, label: 'Green Moong' },
                      { src: TULSI_URL, label: 'Tulsi Leaves' },
                      { src: GREEN_FRUIT_URL, label: 'Green Fruits' },
                      { src: DURVA_URL, label: 'Durva Grass' },
                      { src: GHEE_LAMP_URL, label: 'Ghee Lamp' },
                    ].map((item) => (
                      <div key={item.label} className="flex flex-col items-center rounded-[20px] border border-[#1f6a40]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.42),rgba(248,241,222,0.5))] px-2 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.92),rgba(235,249,237,0.96)_44%,rgba(187,247,208,0.82)_100%)] shadow-[0_10px_22px_rgba(34,197,94,0.14)]">
                          <OfferingIcon src={item.src} alt={item.label} className="h-12 w-12" />
                        </div>
                        <div className="mt-2 font-caveat text-[1.35rem] leading-tight text-[#2b1a0f]">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <img
                  src={FEATHER_URL}
                  alt=""
                  className="pointer-events-none absolute bottom-3 left-2 hidden h-40 w-auto opacity-80 lg:block"
                />
              </NotebookCard>

              <div className="grid gap-6">
                <NotebookCard rotate="xl:rotate-[0.35deg]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                      Budh in Our Life
                      </h3>
                      <div className="mt-3 h-[3px] w-40 rounded-full bg-gradient-to-r from-[#15803d] via-[#4ade80] to-transparent" />
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e7f7eb] text-[#166534] shadow-[0_10px_22px_rgba(34,197,94,0.12)]">{iconSvg('intellect', 'h-8 w-8')}</div>
                  </div>
                  <div className="mt-5 space-y-3">
                    {lifeRows.map((row) => (
                      <div key={row.label} className="flex gap-3 rounded-2xl border border-[#745834]/10 bg-white/24 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f7ec] text-[#166534] shadow-[0_8px_16px_rgba(34,197,94,0.12)]">{iconSvg(row.icon, 'h-5 w-5')}</div>
                        <div className="font-kalam text-lg leading-relaxed text-[#2b1b10]">
                          <span className="font-semibold text-[#166534]">{row.label}:</span> {row.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <img src={FEATHER_URL} alt="" className="pointer-events-none absolute bottom-4 right-4 h-16 w-16 opacity-25" />
                </NotebookCard>

                <NotebookCard rotate="xl:-rotate-[0.35deg]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                      Benefits of Budh Mantra
                      </h3>
                      <div className="mt-3 h-[3px] w-44 rounded-full bg-gradient-to-r from-[#22c55e] via-[#86efac] to-transparent" />
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e7f7eb] text-[#166534] shadow-[0_10px_22px_rgba(34,197,94,0.12)]">{iconSvg('benefit', 'h-8 w-8')}</div>
                  </div>
                  <div className="mt-5 space-y-3">
                    {benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-3 rounded-2xl bg-white/24 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.32)]">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ecfaef] text-[#22c55e] shadow-[0_8px_16px_rgba(34,197,94,0.12)]">{iconSvg('benefit', 'h-4.5 w-4.5')}</div>
                        <p className="font-kalam text-xl leading-relaxed text-[#29190f]">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </NotebookCard>
              </div>
            </div>

            <div className="mt-6">
              <NotebookCard rotate="lg:-rotate-[0.25deg]">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                    How to Connect with Budh
                  </h3>
                  <div className="flex items-center gap-2">
                    <OfferingIcon src={MOONG_URL} alt="Green moong offering" className="h-10 w-10" />
                    <OfferingIcon src={DURVA_URL} alt="Durva grass offering" className="h-10 w-10" />
                  </div>
                </div>
                <div className="mt-5 grid gap-4 lg:grid-cols-5">
                  {connectPractices.map((practice, index) => (
                    <div
                      key={practice}
                      className="rounded-2xl border border-[#7b603e]/20 bg-white/25 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.32)]"
                    >
                      <div className="mb-3 flex items-center gap-2 text-[#166534]">
                        {iconSvg('practice', 'h-6 w-6')}
                        {index === 1 ? (
                          <OfferingIcon src={MOONG_URL} alt="Green moong offering" className="h-6 w-6" />
                        ) : null}
                        {index === 2 ? <img src={RING_URL} alt="" className="h-6 w-6 rounded-full object-cover" /> : null}
                      </div>
                      <p className="font-kalam text-lg leading-relaxed text-[#2a190f]">{practice}</p>
                    </div>
                  ))}
                </div>
              </NotebookCard>
            </div>

            <div className="mt-6">
              <div
                className="relative overflow-hidden rounded-[28px] border border-[#7b603e]/25 px-6 py-8 shadow-[0_20px_55px_rgba(0,0,0,0.18)] sm:px-8"
                style={stripeStyle}
              >
                <div className="absolute inset-0 opacity-[0.16]" style={{ backgroundImage: `url(${BG_SMALL_URL})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                  <div>
                    <div className="font-caveat text-4xl text-[#2b1a0f] sm:text-5xl">A Mind in Devotion</div>
                    <p className="mt-3 max-w-xl font-kalam text-xl leading-relaxed text-[#2a190f]">
                      Budh becomes luminous when intelligence serves wisdom, and language serves truth.
                    </p>
                  </div>
                  <div className="relative mx-auto h-44 w-44 sm:h-52 sm:w-52">
                    <img src={MANDALA_URL} alt="" className="absolute inset-0 h-full w-full rounded-full object-cover opacity-18 mix-blend-multiply" />
                    <img src={SACRED_GEOMETRY_URL} alt="" className="absolute inset-[12%] h-[76%] w-[76%] object-contain opacity-90" />
                  </div>
                  <div className="space-y-4 text-center lg:text-right">
                    <div className="font-caveat text-3xl text-[#2b1a0f] sm:text-4xl">
                      Let wisdom guide the word, and let silence sharpen the mind.
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-end">
                      <OfferingIcon src={MOONG_URL} alt="Green moong offering" className="h-14 w-14" />
                      <OfferingIcon src={GREEN_FRUIT_URL} alt="Green fruits offering" className="h-14 w-14" />
                      <OfferingIcon src={TULSI_URL} alt="Tulsi leaves offering" className="h-14 w-14" />
                      <OfferingIcon src={GHEE_LAMP_URL} alt="Ghee lamp offering" className="h-14 w-14" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
              <NotebookCard rotate="xl:-rotate-[0.55deg]">
                <div className="text-center">
                  <div className="font-caveat text-4xl leading-none text-[#1a110a] sm:text-5xl">
                    Gemstone: Emerald
                  </div>
                  <p className="mt-2 font-kalam text-xl text-[#166534]">Panna</p>
                </div>
                <div className="relative mx-auto mt-5 max-w-[360px]">
                  <img src={OVAL_BORDER_URL} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-85" />
                  <div className="rounded-[24px] bg-[#07140c] p-2 shadow-[0_14px_28px_rgba(0,0,0,0.3)]">
                    <img
                      src={RING_URL}
                      alt="Emerald ring associated with Budh"
                      className="mx-auto w-full rounded-[18px] object-cover"
                    />
                  </div>
                </div>
                <div className="mt-5 text-center font-kalam text-lg leading-relaxed text-[#2a190f]">
                  Strengthens Budh blessings. Wear in silver or bronze on the little finger of the right hand on Wednesday morning, after offering it to Budh with the mantra.
                </div>
              </NotebookCard>

              <div className="relative overflow-hidden rounded-[28px] border border-[rgba(245,230,200,0.22)] bg-[linear-gradient(180deg,rgba(248,237,213,0.98),rgba(240,224,194,0.96))] p-6 text-[#1f130b] shadow-[0_24px_55px_rgba(0,0,0,0.34),0_10px_22px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,248,232,0.55)] sm:p-8 xl:rotate-[0.45deg]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.38),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(106,71,34,0.14),transparent_28%)]" />
                <img src={STICKY_NOTE_URL} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.12] mix-blend-multiply" />
                <div className="tape-decoration hidden sm:block" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <StickyOval />
                      <h3 className="-mt-3 font-caveat text-4xl leading-none text-[#7c1d1d] sm:text-5xl">
                        Affirmation
                      </h3>
                    </div>
                    <div className="rounded-full bg-[#ecfaef] p-2 text-[#166534] shadow-[0_10px_22px_rgba(34,197,94,0.12)]">{iconSvg('wit', 'h-8 w-8')}</div>
                  </div>
                  <div className="mt-8 rounded-[22px] bg-white/24 px-4 py-5 font-kalam text-[2rem] leading-snug text-[#2b1a0f] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] sm:text-[2.35rem]">
                    “I think clearly, I speak wisely, I learn constantly, and I create my own path.”
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 w-full rounded-[30px] border border-[#7c6746]/25 bg-[#f6ead0]/95 px-5 py-6 shadow-[0_20px_50px_rgba(89,60,25,0.16)] sm:px-8">
              <div className="grid w-full gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                <div className="flex items-start gap-4">
                  <div className="mt-1 font-devanagari text-4xl text-[#166534]">ॐ</div>
                  <div>
                    <div className="font-devanagari text-3xl text-[#2b1a0f] sm:text-4xl">ॐ बुं बुधाय नमः॥</div>
                    <div className="mt-2 font-kalam text-xl text-[#2b1a0f]/80 sm:text-2xl">
                      Om Buṁ Budhāya Namaḥ.
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-3">
                  <img src={SACRED_GEOMETRY_URL} alt="" className="h-16 w-16 opacity-70" />
                  <div className="h-px w-28 bg-gradient-to-r from-transparent via-[#22c55e]/50 to-transparent" />
                </div>

                <div className="flex items-center justify-between gap-4 lg:justify-end">
                  <div className="max-w-sm text-left lg:text-right">
                    <div className="font-caveat text-3xl text-[#2b1a0f] sm:text-4xl">
                      Use your mind as a tool, not as a trap.
                    </div>
                  </div>
                  <img src={DIYA_URL} alt="" className="h-16 w-16 shrink-0" />
                </div>
              </div>

              <div className="mt-8 border-t border-[#7c6746]/20 pt-6">
                <div className="text-center font-caveat text-3xl text-[#2b1a0f] sm:text-4xl">
                  Budh&apos;s 7 Attributes of Intelligence
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 text-center sm:grid-cols-3 xl:grid-cols-7">
                  {attributes.map((attribute) => (
                    <div key={attribute.title} className="rounded-2xl border border-[#7c6746]/20 bg-white/35 px-3 py-4">
                      <div className="mx-auto w-fit text-[#22c55e] drop-shadow-[0_0_10px_rgba(34,197,94,0.18)]">
                        {iconSvg(attribute.icon, 'h-8 w-8')}
                      </div>
                      <div className="mt-3 font-caveat text-2xl leading-none text-[#2b1a0f]">
                        {attribute.title}
                      </div>
                      <div className="mt-1 text-sm leading-snug text-[#2b1a0f]/70">{attribute.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-8" />

            {/* TODO: SEO body (8 H2 sections, 2000 words, drop-cap, sidebars). Add in follow-up pass. */}
            <section id="mercury-seo-body" className="hidden" />

            {/* TODO: FAQ accordion (7 Q&As). Add in follow-up pass. */}
            <section id="mercury-faqs" className="hidden" />
          </div>
        </section>
      </div>
    </>
  );
}
