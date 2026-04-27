import { type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import SEOHead from '../../components/SEOHead';
import SchemaMarkup from '../../components/SchemaMarkup';
import planetAssetsRaw from '../../../scripts/planets-hub-assets.json';

type AssetMap = {
  backgrounds: {
    nebula: string;
    notebookPaper: string;
    parchmentTexture: string;
  };
  doodles: {
    arrows: string;
    compass: string;
    feather: string;
    featherSingle: string;
    heart: string;
    moon: string;
    planetOrbit: string;
    sparkles: string;
    spiral: string;
    stars: string;
    sun: string;
  };
  planets: {
    surya: string;
    chandra: string;
    mangala: string;
    budha: string;
    guru: string;
    shukra: string;
    shani: string;
    rahu: string;
    ketu: string;
    navagrahaOrbit: string;
  };
  ui: {
    highlightStroke: string;
    paperClip: string;
    redCircle: string;
    washiTape: string;
  };
  misc: {
    geometry: string;
    layer: string;
    main: string;
  };
};

const planetAssets = planetAssetsRaw as AssetMap;

type PlanetKey =
  | 'surya'
  | 'chandra'
  | 'mangala'
  | 'budha'
  | 'guru'
  | 'shukra'
  | 'shani'
  | 'rahu'
  | 'ketu';

type PlanetConfig = {
  key: PlanetKey;
  english: string;
  devanagari: string;
  iast: string;
  meaning: string;
  trait: string;
  cardBlurb: string;
  heroTrait: string;
  accent: string;
  glowClass: string;
  cardClass: string;
  symbolClass: string;
  symbolStroke: string;
  href?: string;
  heroPosition: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    width: string;
  };
  orbit?: {
    radius: number;
    squash: number;
    duration: string;
    start: string;
    reverse?: boolean;
    size: string;
    labelX: string;
    labelY: string;
  };
  imageTreatment?: string;
};

const PLANETS: PlanetConfig[] = [
  {
    key: 'surya',
    english: 'Sun',
    devanagari: 'सूर्य',
    iast: 'Surya',
    meaning: 'the radiant sun',
    trait: 'Soul, power, consciousness',
    cardBlurb: 'Steady radiance, purpose, and inner authority.',
    heroTrait: 'Identity and life force',
    accent: '#facc15',
    glowClass: 'glow-gold',
    cardClass:
      'border-yellow-400/70 shadow-[0_0_30px_rgba(250,204,21,0.28)] hover:shadow-[0_0_36px_rgba(250,204,21,0.44)]',
    symbolClass: 'text-yellow-300',
    symbolStroke: '#facc15',
    href: '/planets/sun',
    heroPosition: { top: '28%', left: '49%', width: 'auto' },
  },
  {
    key: 'chandra',
    english: 'Moon',
    devanagari: 'चन्द्र',
    iast: 'Chandra',
    meaning: 'the shining moon',
    trait: 'Mind, emotions, inner peace',
    cardBlurb: 'Feeling, reflection, and emotional nourishment.',
    heroTrait: 'Mind and emotional tides',
    accent: '#93c5fd',
    glowClass: 'glow-moon',
    cardClass:
      'border-sky-300/70 shadow-[0_0_30px_rgba(147,197,253,0.24)] hover:shadow-[0_0_36px_rgba(147,197,253,0.4)]',
    symbolClass: 'text-sky-300',
    symbolStroke: '#93c5fd',
    href: '/planets/moon',
    heroPosition: { top: '25%', left: '28%', width: 'auto' },
  },
  {
    key: 'mangala',
    english: 'Mars',
    devanagari: 'मंगल',
    iast: 'Mangala',
    meaning: 'auspicious strength',
    trait: 'Courage, energy, determination',
    cardBlurb: 'Action, stamina, and fearless momentum.',
    heroTrait: 'Drive and assertive fire',
    accent: '#dc2626',
    glowClass: '',
    cardClass:
      'border-red-500/70 shadow-[0_0_30px_rgba(220,38,38,0.24)] hover:shadow-[0_0_36px_rgba(220,38,38,0.4)]',
    symbolClass: 'text-red-400',
    symbolStroke: '#f87171',
    href: '/planets/mars',
    heroPosition: { top: '26%', right: '25%', width: 'auto' },
    orbit: {
      radius: 280,
      squash: 0.56,
      duration: '72s',
      start: '316deg',
      size: 'clamp(40px,4.2vw,56px)',
      labelX: '44px',
      labelY: '-62px',
    },
  },
  {
    key: 'budha',
    english: 'Mercury',
    devanagari: 'बुध',
    iast: 'Budha',
    meaning: 'awakened intelligence',
    trait: 'Intelligence, communication, wit',
    cardBlurb: 'Thought, language, and adaptable skill.',
    heroTrait: 'Intellect and expression',
    accent: '#22c55e',
    glowClass: '',
    cardClass:
      'border-lime-400/70 shadow-[0_0_30px_rgba(34,197,94,0.24)] hover:shadow-[0_0_36px_rgba(34,197,94,0.4)]',
    symbolClass: 'text-lime-300',
    symbolStroke: '#86efac',
    href: '/planets/mercury',
    heroPosition: { top: '42%', right: '14%', width: 'auto' },
    orbit: {
      radius: 135,
      squash: 0.56,
      duration: '42s',
      start: '24deg',
      size: 'clamp(32px,3.4vw,46px)',
      labelX: '34px',
      labelY: '-46px',
    },
    imageTreatment: 'brightness(1.12) contrast(1.08) saturate(1.12)',
  },
  {
    key: 'guru',
    english: 'Jupiter',
    devanagari: 'गुरु',
    iast: 'Guru',
    meaning: 'the guide and teacher',
    trait: 'Wisdom, growth, abundance',
    cardBlurb: 'Grace, counsel, and expansive faith.',
    heroTrait: 'Wisdom and benevolence',
    accent: '#fbbf24',
    glowClass: '',
    cardClass:
      'border-amber-300/70 shadow-[0_0_30px_rgba(251,191,36,0.24)] hover:shadow-[0_0_36px_rgba(251,191,36,0.4)]',
    symbolClass: 'text-amber-300',
    symbolStroke: '#fcd34d',
    href: '/planets/jupiter',
    heroPosition: { bottom: '33%', right: '26%', width: 'auto' },
    orbit: {
      radius: 345,
      squash: 0.56,
      duration: '96s',
      start: '44deg',
      size: 'clamp(58px,6vw,80px)',
      labelX: '58px',
      labelY: '-58px',
    },
    imageTreatment: 'brightness(1.1) contrast(1.06) saturate(1.08)',
  },
  {
    key: 'shukra',
    english: 'Venus',
    devanagari: 'शुक्र',
    iast: 'Shukra',
    meaning: 'brightness and refinement',
    trait: 'Love, beauty, relationships',
    cardBlurb: 'Pleasure, harmony, and refined attraction.',
    heroTrait: 'Love and refinement',
    accent: '#f472b6',
    glowClass: '',
    cardClass:
      'border-pink-300/70 shadow-[0_0_30px_rgba(244,114,182,0.22)] hover:shadow-[0_0_36px_rgba(244,114,182,0.38)]',
    symbolClass: 'text-pink-300',
    symbolStroke: '#f9a8d4',
    href: '/planets/venus',
    heroPosition: { top: '43%', left: '14%', width: 'auto' },
    orbit: {
      radius: 190,
      squash: 0.56,
      duration: '58s',
      start: '166deg',
      size: 'clamp(38px,4.1vw,54px)',
      labelX: '-92px',
      labelY: '-54px',
    },
  },
  {
    key: 'shani',
    english: 'Saturn',
    devanagari: 'शनि',
    iast: 'Shani',
    meaning: 'discipline and karmic law',
    trait: 'Discipline, karma, justice',
    cardBlurb: 'Maturity, patience, and karmic accountability.',
    heroTrait: 'Discipline and karmic lessons',
    accent: '#1e3a8a',
    glowClass: '',
    cardClass:
      'border-blue-900/80 shadow-[0_0_30px_rgba(30,58,138,0.34)] hover:shadow-[0_0_40px_rgba(30,58,138,0.5)]',
    symbolClass: 'text-violet-300',
    symbolStroke: '#93c5fd',
    href: '/planets/saturn',
    heroPosition: { bottom: '29%', left: '55%', width: 'auto' },
    orbit: {
      radius: 410,
      squash: 0.56,
      duration: '122s',
      start: '82deg',
      size: 'clamp(68px,7vw,92px)',
      labelX: '62px',
      labelY: '-66px',
    },
    imageTreatment: 'brightness(1.12) contrast(1.06)',
  },
  {
    key: 'rahu',
    english: 'Rahu',
    devanagari: 'राहु',
    iast: 'Rahu',
    meaning: 'the ascending node',
    trait: 'Desire, illusion, worldly hunger',
    cardBlurb: 'Obsession, ambition, and material appetite.',
    heroTrait: 'Desire and amplification',
    accent: '#7c3aed',
    glowClass: '',
    cardClass:
      'border-violet-500/70 shadow-[0_0_30px_rgba(124,58,237,0.28)] hover:shadow-[0_0_40px_rgba(124,58,237,0.44)]',
    symbolClass: 'text-violet-300',
    symbolStroke: '#c4b5fd',
    heroPosition: { bottom: '32%', left: '30%', width: 'auto' },
    orbit: {
      radius: 460,
      squash: 0.56,
      duration: '140s',
      start: '135deg',
      reverse: true,
      size: 'clamp(38px,4.1vw,54px)',
      labelX: '-104px',
      labelY: '-48px',
    },
    imageTreatment: 'brightness(1.12) contrast(1.06)',
  },
  {
    key: 'ketu',
    english: 'Ketu',
    devanagari: 'केतु',
    iast: 'Ketu',
    meaning: 'the descending node',
    trait: 'Spirituality, moksha, detachment',
    cardBlurb: 'Release, inwardness, and spiritual distance.',
    heroTrait: 'Detachment and liberation',
    accent: '#9ca3af',
    glowClass: '',
    cardClass:
      'border-gray-300/70 shadow-[0_0_30px_rgba(156,163,175,0.22)] hover:shadow-[0_0_40px_rgba(156,163,175,0.36)]',
    symbolClass: 'text-gray-300',
    symbolStroke: '#d1d5db',
    heroPosition: { bottom: '24%', right: '13%', width: 'auto' },
    orbit: {
      radius: 460,
      squash: 0.56,
      duration: '140s',
      start: '315deg',
      reverse: true,
      size: 'clamp(38px,4.1vw,54px)',
      labelX: '48px',
      labelY: '-48px',
    },
  },
];

const HERO_IMAGE_PRIORITY = { fetchpriority: 'high' } as const;

const cosmicShell: CSSProperties = {
  backgroundColor: '#000',
  backgroundImage: [
    'radial-gradient(circle at top, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 30%, rgba(42,15,15,0.78) 68%, rgba(0,0,0,0.96) 100%)',
    `url(${planetAssets.backgrounds.nebula})`,
    `url(${planetAssets.misc.main})`,
  ].join(', '),
  backgroundSize: 'cover, cover, cover',
  backgroundPosition: 'center, center, center',
};

const parchmentStyle: CSSProperties = {
  backgroundImage: `linear-gradient(rgba(245,230,200,0.9), rgba(245,230,200,0.9)), url(${planetAssets.backgrounds.parchmentTexture})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const notebookStyle: CSSProperties = {
  backgroundImage: `linear-gradient(rgba(245,230,200,0.9), rgba(245,230,200,0.9)), url(${planetAssets.backgrounds.notebookPaper})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const tornParchmentStyle: CSSProperties = {
  ...parchmentStyle,
  clipPath: 'polygon(1% 5%, 8% 2%, 18% 4%, 31% 1%, 45% 4%, 60% 2%, 76% 5%, 92% 2%, 99% 6%, 97% 92%, 86% 96%, 71% 93%, 54% 97%, 38% 94%, 21% 97%, 5% 92%)',
};

const tornNotebookStyle: CSSProperties = {
  ...notebookStyle,
  clipPath: 'polygon(1% 3%, 12% 1%, 28% 4%, 45% 1%, 63% 3%, 82% 1%, 99% 4%, 98% 94%, 89% 98%, 72% 96%, 53% 99%, 34% 96%, 16% 99%, 2% 95%)',
};

const heroMotionStyles = `
  @keyframes orbit-rotate {
    from { transform: rotate(var(--start-angle)); }
    to { transform: rotate(calc(var(--start-angle) + 360deg)); }
  }

  @keyframes orbit-counter {
    from { transform: rotate(calc(-1 * var(--start-angle))); }
    to { transform: rotate(calc(-1 * (var(--start-angle) + 360deg))); }
  }

  @keyframes sun-pulse {
    0%, 100% { filter: drop-shadow(0 0 34px rgba(250, 204, 21, 0.62)); transform: translate(-50%, -50%) scale(1); }
    50% { filter: drop-shadow(0 0 54px rgba(250, 204, 21, 0.84)); transform: translate(-50%, -50%) scale(1.025); }
  }

  @keyframes planet-self-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes moon-orbit {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes moon-counter {
    from { transform: rotate(0deg); }
    to { transform: rotate(-360deg); }
  }

  .cosmos-sun {
    animation: sun-pulse 7s ease-in-out infinite;
  }

  .orbit-rotator {
    animation: orbit-rotate var(--duration) linear infinite;
    animation-direction: var(--direction);
    transform: rotate(var(--start-angle));
    transform-origin: 0 0;
    will-change: transform;
  }

  .orbit-label {
    animation: orbit-counter var(--duration) linear infinite;
    animation-direction: var(--direction);
    transform: rotate(calc(-1 * var(--start-angle)));
    transform-origin: center;
    will-change: transform;
  }

  .orbit-planet-art {
    animation: planet-self-spin var(--self-spin-duration, 34s) linear infinite;
    animation-direction: var(--self-spin-direction, normal);
  }

  .moon-orbit {
    animation: moon-orbit 14s linear infinite;
    transform-origin: 0 0;
  }

  .moon-counter {
    animation: moon-counter 14s linear infinite;
    transform-origin: center;
  }

  @media (max-width: 639px), (prefers-reduced-motion: reduce) {
    .cosmos-sun,
    .orbit-rotator,
    .orbit-label,
    .orbit-planet-art,
    .moon-orbit,
    .moon-counter {
      animation: none !important;
    }
  }
`;

function CosmicDust({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 900"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      {[
        [104, 72, 2.2],
        [248, 148, 1.4],
        [372, 86, 1.6],
        [566, 118, 1.8],
        [694, 142, 1.4],
        [828, 106, 2.3],
        [1040, 138, 1.9],
        [980, 258, 2.4],
        [164, 270, 1.8],
        [282, 332, 1.3],
        [726, 324, 1.6],
        [1100, 352, 2.1],
        [196, 530, 1.7],
        [428, 562, 1.6],
        [934, 554, 1.5],
        [1090, 610, 2.2],
        [300, 742, 1.9],
        [632, 732, 1.7],
        [906, 768, 2.1],
      ].map(([cx, cy, r], index) => (
        <circle key={index} cx={cx} cy={cy} r={r} fill="rgba(250,230,180,0.75)" />
      ))}
    </svg>
  );
}

function SparklesDoodle({ className = '', stroke = '#f5d46b' }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4">
        <path d="M16 6v13" />
        <path d="M9.5 12.5h13" />
        <path d="M13 9l6 7" />
        <path d="M19 9l-6 7" />
        <path d="M46 22v10" />
        <path d="M41 27h10" />
        <path d="M29 38v18" />
        <path d="M20 47h18" />
        <path d="M49 43v15" />
        <path d="M41.5 50.5h15" />
      </g>
    </svg>
  );
}

function StarsDoodle({ className = '', stroke = '#f5d46b' }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 84 84" className={className} aria-hidden="true">
      <g fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.1">
        <path d="M14 16l4 10 10 4-10 4-4 10-4-10-10-4 10-4 4-10Z" />
        <path d="M58 10l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5 2.5-6Z" />
        <path d="M58 46l4 10 10 4-10 4-4 10-4-10-10-4 10-4 4-10Z" />
      </g>
    </svg>
  );
}

function FeatherDoodle({ className = '', stroke = '#2b1a0f' }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 120 220" className={className} aria-hidden="true">
      <g fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round">
        <path d="M88 20c-34 18-56 56-59 103-1 24 6 43 25 63 6-27 13-46 28-67 19-28 28-63 26-99Z" strokeWidth="3.2" />
        <path d="M52 181c10-31 25-58 46-85" strokeWidth="2.6" />
        <path d="M57 97c12 2 22 1 32-5" strokeWidth="2.1" />
        <path d="M49 120c13 2 26 0 39-8" strokeWidth="2.1" />
        <path d="M44 144c16 2 30-1 45-11" strokeWidth="2.1" />
        <path d="M40 171c18 2 34-3 49-16" strokeWidth="2.1" />
      </g>
    </svg>
  );
}

function MoonDoodle({ className = '', stroke = '#2b1a0f' }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M42 8c-13 2-23 13-23 27 0 11 6 20 16 25-4 1-7 1-10 0C15 57 7 47 7 35 7 20 19 8 34 8c3 0 6 0 8 0Z"
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.2"
      />
    </svg>
  );
}

function HeartDoodle({ className = '', stroke = '#2b1a0f' }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 72 72" className={className} aria-hidden="true">
      <path
        d="M36 60 14 38c-6-6-6-16 0-22 6-6 16-6 22 0 6-6 16-6 22 0 6 6 6 16 0 22L36 60Z"
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </svg>
  );
}

function ArrowDoodle({ className = '', stroke = '#2b1a0f' }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true">
      <g fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
        <path d="M108 15c-25 0-38 13-42 28-4 16-16 25-38 24" />
        <path d="m38 58-10 9 13 1" />
        <path d="M92 14 104 5l2 14" />
      </g>
    </svg>
  );
}

function WashiTapeDoodle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 72" className={className} aria-hidden="true">
      <path
        d="M9 18c28-4 54-5 78-3 27 2 54 1 84-3l-9 43c-24 4-50 4-78 2-25-2-51 0-76 4L9 18Z"
        fill="#d8bc6a"
        fillOpacity="0.84"
      />
      <path d="M16 22c43-7 90 3 150-5" fill="none" stroke="#f8e7a0" strokeOpacity="0.45" strokeWidth="2" />
      <path d="M22 51c36-5 77 2 132-3" fill="none" stroke="#8b5e34" strokeOpacity="0.2" strokeWidth="2" />
    </svg>
  );
}

function SpiralBinding({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 42 520" className={className} aria-hidden="true" preserveAspectRatio="none">
      {Array.from({ length: 14 }).map((_, index) => {
        const y = 18 + index * 36;
        return (
          <g key={index} fill="none" stroke="#2b1a0f" strokeLinecap="round">
            <path d={`M31 ${y}c-22 0-22 26 0 26`} strokeWidth="3" />
            <path d={`M4 ${y + 13}h30`} strokeWidth="2" opacity="0.5" />
          </g>
        );
      })}
    </svg>
  );
}

function PlanetSymbol({
  planet,
  className = '',
}: {
  planet: PlanetKey;
  className?: string;
}) {
  const strokeMap: Record<PlanetKey, string> = {
    surya: '#facc15',
    chandra: '#93c5fd',
    mangala: '#f87171',
    budha: '#86efac',
    guru: '#fcd34d',
    shukra: '#f9a8d4',
    shani: '#93c5fd',
    rahu: '#c4b5fd',
    ketu: '#d1d5db',
  };

  const stroke = strokeMap[planet];

  const shapes: Record<PlanetKey, JSX.Element> = {
    surya: (
      <>
        <circle cx="32" cy="32" r="9" />
        <path d="M32 4v10M32 50v10M4 32h10M50 32h10M12 12l7 7M45 45l7 7M12 52l7-7M45 19l7-7" />
      </>
    ),
    chandra: <path d="M41 10c-11 2-19 11-19 23 0 9 5 17 13 21-3 1-6 1-8 0C18 50 12 42 12 32 12 19 23 8 36 8c2 0 3 0 5 2Z" />,
    mangala: (
      <>
        <circle cx="26" cy="38" r="11" />
        <path d="M34 30 50 14M40 14h10v10" />
      </>
    ),
    budha: (
      <>
        <circle cx="32" cy="27" r="8" />
        <path d="M24 14c2 4 6 6 8 6s6-2 8-6M32 35v18M23 46h18M27 56h10" />
      </>
    ),
    guru: (
      <>
        <path d="M23 17c8-6 18-1 18 8 0 8-7 12-13 16" />
        <path d="M37 22h11M32 40v18M23 49h18" />
      </>
    ),
    shukra: (
      <>
        <circle cx="32" cy="24" r="10" />
        <path d="M32 34v20M22 46h20" />
      </>
    ),
    shani: (
      <>
        <path d="M42 12c-8 2-13 8-13 15 0 6 3 10 8 13M20 24h18M35 40v18M29 51h18" />
      </>
    ),
    rahu: (
      <>
        <path d="M14 39c6-10 12-15 18-15s12 5 18 15" />
        <path d="M24 21v20M40 21v20M21 49c3 4 7 6 11 6s8-2 11-6" />
      </>
    ),
    ketu: (
      <>
        <path d="M14 25c6 10 12 15 18 15s12-5 18-15" />
        <path d="M24 43V23M40 43V23M21 15c3-4 7-6 11-6s8 2 11 6" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3.2"
    >
      {shapes[planet]}
    </svg>
  );
}

function HandDrawnEllipse({
  className = '',
  stroke = '#b91c1c',
}: {
  className?: string;
  stroke?: string;
}) {
  return (
    <svg viewBox="0 0 240 112" className={className} aria-hidden="true">
      <path
        d="M25 56c0-23 43-40 97-40 57 0 100 17 100 39 0 24-43 42-100 42-54 0-97-17-97-41Z"
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <path
        d="M18 55c4-27 48-48 104-48 60 0 109 20 112 48"
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.82"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function DiyaDoodle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 90" className={className} aria-hidden="true">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 57c26 20 74 20 100 0-7 20-25 30-50 30S27 77 20 57Z" fill="#7c2d12" stroke="#f59e0b" strokeWidth="3" />
        <path d="M70 55c-14-13-10-29 2-49 12 20 15 36-2 49Z" fill="#facc15" stroke="#fbbf24" strokeWidth="3" />
        <path d="M70 49c-6-7-4-16 1-26 5 10 7 18-1 26Z" fill="#fb923c" stroke="#fed7aa" strokeWidth="2" />
        <path d="M28 58c22 8 62 8 84 0" stroke="#fde68a" strokeWidth="2" />
      </g>
    </svg>
  );
}

function OmMark({ className = '' }: { className?: string }) {
  return (
    <div
      className={`font-devanagari text-[3.5rem] leading-none text-amber-300 [text-shadow:0_0_20px_rgba(251,191,36,0.35)] ${className}`}
      aria-hidden="true"
    >
      ॐ
    </div>
  );
}

function SacredMandalaDoodle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 220" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="footer-mandala-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.42" />
          <stop offset="52%" stopColor="#f59e0b" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="110" cy="110" r="104" fill="url(#footer-mandala-glow)" />
      <g fill="none" stroke="#facc15" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="110" cy="110" r="72" strokeOpacity="0.72" strokeWidth="1.8" />
        <circle cx="110" cy="110" r="48" strokeOpacity="0.7" strokeWidth="1.5" />
        <circle cx="110" cy="110" r="20" strokeOpacity="0.74" strokeWidth="1.4" />
        <path d="M110 36 174 146H46L110 36Z" strokeOpacity="0.72" strokeWidth="1.8" />
        <path d="M110 184 46 74h128l-64 110Z" strokeOpacity="0.72" strokeWidth="1.8" />
        <path d="M38 110h144M110 38v144" strokeOpacity="0.38" strokeWidth="1.2" />
        <path d="M58 58l104 104M162 58 58 162" strokeOpacity="0.34" strokeWidth="1.2" />
        {Array.from({ length: 16 }).map((_, index) => {
          const angle = (index * 22.5 * Math.PI) / 180;
          const x1 = 110 + Math.cos(angle) * 82;
          const y1 = 110 + Math.sin(angle) * 82;
          const x2 = 110 + Math.cos(angle) * 96;
          const y2 = 110 + Math.sin(angle) * 96;
          return (
            <path
              key={index}
              d={`M${x1.toFixed(1)} ${y1.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`}
              strokeOpacity="0.44"
              strokeWidth="1.3"
            />
          );
        })}
      </g>
      <g fill="#facc15" opacity="0.66">
        <circle cx="110" cy="20" r="2.4" />
        <circle cx="110" cy="200" r="2.4" />
        <circle cx="20" cy="110" r="2.4" />
        <circle cx="200" cy="110" r="2.4" />
      </g>
    </svg>
  );
}

function LotusDoodle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 132 72" className={className} aria-hidden="true">
      <g fill="none" stroke="#f59e0b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4">
        <path d="M66 55c-11-12-11-27 0-44 11 17 11 32 0 44Z" />
        <path d="M49 56c-17-7-24-20-20-39 17 7 25 20 20 39Z" />
        <path d="M83 56c17-7 24-20 20-39-17 7-25 20-20 39Z" />
        <path d="M34 58c-14-1-24-7-30-18 15-2 27 4 36 18" />
        <path d="M98 58c14-1 24-7 30-18-15-2-27 4-36 18" />
        <path d="M18 62c29 7 67 7 96 0" />
      </g>
    </svg>
  );
}

function OrbitAccentDoodle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 100" className={className} aria-hidden="true">
      <g fill="none" stroke="#facc15" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 66c30-35 78-50 118-34" strokeOpacity="0.36" strokeWidth="1.6" />
        <path d="M25 76c27-25 68-38 102-27" strokeOpacity="0.28" strokeWidth="1.4" />
        <path d="M36 39l6 12 12 6-12 6-6 12-6-12-12-6 12-6 6-12Z" strokeOpacity="0.58" strokeWidth="1.8" />
        <circle cx="113" cy="35" r="4" strokeOpacity="0.55" strokeWidth="1.5" />
        <circle cx="128" cy="44" r="2" fill="#facc15" stroke="none" opacity="0.5" />
      </g>
    </svg>
  );
}

function OrbitRings() {
  const rings = [135, 190, 230, 280, 345, 410, 460];

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-55"
      viewBox="0 0 1200 820"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {rings.map((radius) => (
        <ellipse
          key={radius}
          cx="600"
          cy="410"
          rx={radius}
          ry={radius * 0.56}
          fill="none"
          stroke="rgba(251, 191, 36, 0.44)"
          strokeDasharray="7 10"
          strokeWidth="1.4"
        />
      ))}
    </svg>
  );
}

function OrbitingPlanet({ planet }: { planet: PlanetConfig }) {
  if (!planet.orbit) return null;

  const orbit = planet.orbit;
  const label = (
    <span className="orbit-label pointer-events-none block min-w-[9rem] whitespace-nowrap text-center">
      <span className="block font-caveat text-[clamp(1.05rem,1.45vw,1.45rem)] leading-none text-[#fff4cf] [text-shadow:0_0_14px_rgba(0,0,0,1)]">
        {planet.iast}
      </span>
      <small className="mx-auto mt-0.5 block max-w-[14ch] text-wrap font-poppins text-[10px] leading-tight tracking-[0.25px] text-white/82 [text-shadow:0_0_10px_rgba(0,0,0,1)]">
        {planet.heroTrait}
      </small>
    </span>
  );

  return (
    <div
      className="orbit-rotator absolute left-1/2 top-1/2 z-30 h-0 w-0"
      style={
        {
          '--duration': orbit.duration,
          '--direction': orbit.reverse ? 'reverse' : 'normal',
          '--start-angle': orbit.start,
          '--orbit-unsquash': 1 / orbit.squash,
        } as CSSProperties
      }
    >
      <div
        className="absolute left-0 top-0 h-0 w-0"
        style={{ transform: `scaleY(${orbit.squash})` }}
      >
        <div
          className="absolute left-0 top-0 z-30"
          style={{
            width: orbit.size,
            height: orbit.size,
            transform: `translateX(${orbit.radius}px) translate(-50%, -50%) scaleY(${1 / orbit.squash})`,
          }}
        >
          <span
            className="pointer-events-none absolute inset-[-22%] z-0 rounded-full blur-2xl"
            style={{
              backgroundColor: `${planet.accent}88`,
            }}
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute inset-[-6%] z-10 rounded-full"
            style={{
              background: `radial-gradient(circle, ${planet.accent}55 0%, rgba(0,0,0,0.82) 64%, transparent 72%)`,
              border: `2px solid ${planet.accent}`,
              boxShadow: `0 0 36px ${planet.accent}99`,
            }}
            aria-hidden="true"
          />
          <div
            className="orbit-planet-art absolute inset-0 z-20"
            style={{
              '--self-spin-duration': planet.key === 'rahu' || planet.key === 'ketu' ? '18s' : '36s',
              '--self-spin-direction': planet.key === 'rahu' || planet.key === 'ketu' ? 'reverse' : 'normal',
            } as CSSProperties}
          >
            <img
              src={planetAssets.planets[planet.key]}
              alt={`${planet.iast} planet`}
              className={`h-full w-full rounded-full object-cover ${planet.glowClass || 'drop-shadow-[0_0_24px_rgba(255,255,255,0.28)]'}`}
              style={{
                filter: planet.imageTreatment
                  ? `${planet.imageTreatment} brightness(1.12) contrast(1.08)`
                  : 'brightness(1.08) contrast(1.06) saturate(1.05)',
              }}
              loading="eager"
              {...HERO_IMAGE_PRIORITY}
            />
          </div>
          <span
            className="absolute left-1/2 top-1/2 z-30"
            style={{ transform: `translate(${orbit.labelX}, ${orbit.labelY})` }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

function EarthMoonSystem() {
  const orbit = {
    radius: 230,
    squash: 0.56,
    duration: '68s',
    start: '232deg',
    size: 'clamp(42px,4.5vw,60px)',
    labelX: '-98px',
    labelY: '-56px',
  };

  return (
    <div
      className="orbit-rotator absolute left-1/2 top-1/2 z-30 h-0 w-0"
      style={
        {
          '--duration': orbit.duration,
          '--direction': 'normal',
          '--start-angle': orbit.start,
        } as CSSProperties
      }
    >
      <div
        className="absolute left-0 top-0 h-0 w-0"
        style={{ transform: `scaleY(${orbit.squash})` }}
      >
        <div
          className="absolute left-0 top-0 z-30"
          style={{
            width: orbit.size,
            height: orbit.size,
            transform: `translateX(${orbit.radius}px) translate(-50%, -50%) scaleY(${1 / orbit.squash})`,
          }}
        >
          <span
            className="pointer-events-none absolute inset-[-24%] z-0 rounded-full bg-sky-300/35 blur-2xl"
            aria-hidden="true"
          />
          <div className="orbit-planet-art absolute inset-0 z-20 rounded-full border border-sky-200/70 bg-[radial-gradient(circle_at_34%_30%,#e0f2fe_0%,#38bdf8_18%,#166534_34%,#0f766e_48%,#0f172a_78%)] shadow-[0_0_30px_rgba(125,211,252,0.62)]" />
          <div className="moon-orbit absolute left-1/2 top-1/2 z-30 h-0 w-0">
            <div className="absolute left-0 top-0 h-0 w-0" style={{ transform: 'scaleY(0.62)' }}>
              <div
                className="absolute left-0 top-0"
                style={{
                  width: 'clamp(18px,2vw,28px)',
                  height: 'clamp(18px,2vw,28px)',
                  transform: 'translateX(clamp(42px,4.4vw,58px)) translate(-50%, -50%) scaleY(1.61)',
                }}
              >
                <img
                  src={planetAssets.planets.chandra}
                  alt="Chandra orbiting Earth"
                  className="moon-counter h-full w-full rounded-full object-cover shadow-[0_0_16px_rgba(147,197,253,0.7)]"
                  loading="eager"
                  {...HERO_IMAGE_PRIORITY}
                />
              </div>
            </div>
          </div>
          <span
            className="absolute left-1/2 top-1/2 z-40"
            style={{ transform: `translate(${orbit.labelX}, ${orbit.labelY})` }}
          >
            <span className="orbit-label pointer-events-none block min-w-[9rem] whitespace-nowrap text-center">
              <span className="block font-caveat text-[clamp(1.05rem,1.45vw,1.45rem)] leading-none text-[#dff6ff] [text-shadow:0_0_14px_rgba(0,0,0,1)]">
                Earth and Chandra
              </span>
              <small className="mx-auto mt-0.5 block max-w-[15ch] text-wrap font-poppins text-[10px] leading-tight tracking-[0.25px] text-white/82 [text-shadow:0_0_10px_rgba(0,0,0,1)]">
                Grounding with emotional tides
              </small>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

function PlanetGridCard({ planet }: { planet: PlanetConfig }) {
  const needsStrongGlow = ['budha', 'guru', 'shani', 'rahu', 'ketu'].includes(planet.key);
  const body = (
    <div
      className={`group relative flex h-full min-h-[132px] flex-col overflow-visible rounded-[18px] border bg-[linear-gradient(145deg,rgba(20,12,7,0.96),rgba(5,4,4,0.92))] p-3.5 text-left transition-all duration-300 ${planet.cardClass}`}
    >
      <SparklesDoodle className="pointer-events-none absolute right-2 top-2 h-6 w-6 opacity-25" />
      <div className="flex items-start gap-3">
        <div
          className="relative h-16 w-16 shrink-0 rounded-full sm:h-[4.5rem] sm:w-[4.5rem]"
          style={{
            background: `radial-gradient(circle, ${planet.accent}45 0%, ${planet.accent}1f 42%, transparent 72%)`,
            boxShadow: needsStrongGlow ? `0 0 28px 5px ${planet.accent}66` : undefined,
          }}
        >
          <img
            src={planetAssets.planets[planet.key]}
            alt={`${planet.iast} card artwork`}
            className={`relative z-10 h-full w-full rounded-full object-cover ${planet.glowClass || 'drop-shadow-[0_0_18px_rgba(255,255,255,0.14)]'}`}
            style={{ filter: planet.imageTreatment }}
            loading="lazy"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-caveat text-[1.45rem] leading-none text-white">{planet.iast}</p>
              <p className="mt-1 font-devanagari text-sm leading-tight text-white/85">
                {planet.devanagari}, {planet.meaning}
              </p>
            </div>
            <PlanetSymbol planet={planet.key} className="mr-0.5 mt-0.5 h-6 w-6 shrink-0" />
          </div>
          <p className="mt-2 font-poppins text-[12px] leading-relaxed text-white/78">{planet.trait}</p>
        </div>
      </div>
      <p className="mt-3 max-w-[24ch] font-poppins text-[11px] leading-relaxed text-white/64">
        {planet.cardBlurb}
      </p>
      <div className="mt-auto pt-3">
        {planet.href ? (
          <span
            className="font-poppins text-[13px] font-medium tracking-[0.4px]"
            style={{ color: planet.accent }}
          >
            Explore →
          </span>
        ) : (
          <span className="inline-flex rounded-full border border-white/15 bg-white/8 px-3 py-1 font-poppins text-xs font-semibold uppercase tracking-[1px] text-white/75">
            Coming Soon
          </span>
        )}
      </div>
    </div>
  );

  if (planet.href) {
    return (
      <Link to={planet.href} aria-label={`${planet.iast} planet page`} className="block h-full">
        {body}
      </Link>
    );
  }

  return (
    <div aria-disabled="true" className="block h-full cursor-not-allowed">
      {body}
    </div>
  );
}

export default function PlanetsHubPage() {
  return (
    <div style={cosmicShell} className="text-white">
      <style>{heroMotionStyles}</style>
      <SEOHead
        title="Planets in Vedic Astrology | Soul Infinity"
        description="Explore the Navagraha, the nine planetary forces of Vedic astrology, through a cinematic Soul Infinity hub built around Surya, Chandra, and the wider cosmic mandala."
        keywords="planets in vedic astrology, navagraha, surya, chandra, mangala, budha, guru, shukra, shani, rahu, ketu, soul infinity"
      />
      <SchemaMarkup
        type="webpage"
        webPage={{
          name: 'Planets in Vedic Astrology',
          description:
            'A cinematic Soul Infinity hub introducing the Navagraha, the nine planetary intelligences of Vedic astrology.',
          url: '/planets',
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Planets', url: '/planets' },
        ]}
      />

      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Planets' }]} />

      <section className="relative overflow-hidden px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative min-h-[680px] overflow-hidden rounded-[30px] border border-amber-300/20 bg-black/35 px-4 py-5 shadow-[0_30px_90px_rgba(0,0,0,0.6)] backdrop-blur-[1px] sm:min-h-[740px] sm:px-8 lg:min-h-[820px]">
            <img
              src={planetAssets.backgrounds.nebula}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-screen"
              loading="eager"
              {...HERO_IMAGE_PRIORITY}
            />
            <CosmicDust className="opacity-80" />
            <StarsDoodle className="pointer-events-none absolute left-4 top-24 hidden h-28 w-28 opacity-30 lg:block" />
            <SparklesDoodle className="pointer-events-none absolute right-10 top-20 h-20 w-20 opacity-35" />
            <img
              src={planetAssets.misc.layer}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-auto w-full opacity-30"
              loading="lazy"
            />
            <ArrowDoodle className="pointer-events-none absolute left-8 bottom-16 hidden h-20 w-28 -rotate-[10deg] opacity-35 lg:block" stroke="#facc15" />
            <ArrowDoodle className="pointer-events-none absolute right-10 top-28 hidden h-20 w-28 rotate-[150deg] opacity-30 lg:block" stroke="#facc15" />
            <OrbitAccentDoodle className="pointer-events-none absolute bottom-12 right-20 hidden h-24 w-36 opacity-40 lg:block" />
            <div className="absolute left-1/2 top-1/2 h-[min(700px,calc(100%-5rem))] w-[min(1120px,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2">
              <OrbitRings />
              {PLANETS.filter((planet) => planet.key !== 'surya' && planet.key !== 'chandra').map((planet) => (
                <OrbitingPlanet key={planet.key} planet={planet} />
              ))}
              <EarthMoonSystem />

              <div className="cosmos-sun absolute left-1/2 top-1/2 z-20 h-[clamp(120px,13vw,185px)] w-[clamp(120px,13vw,185px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-amber-200/25 bg-amber-400 shadow-[0_0_64px_rgba(250,204,21,0.58)]">
                <img
                  src={planetAssets.planets.surya}
                  alt="Surya, the center Sun"
                  className="h-full w-full scale-[1.9] object-cover object-[49%_50%]"
                  loading="eager"
                  {...HERO_IMAGE_PRIORITY}
                />
              </div>

              <div className="absolute left-1/2 top-1/2 z-30 w-[min(220px,44vw)] -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="font-caveat text-[clamp(2rem,3.25vw,3.55rem)] leading-[0.95] text-white [text-shadow:0_0_22px_rgba(255,190,64,0.45)]">
                  The Cosmic Forces
                </p>
                <p className="mx-auto mt-2 max-w-[16ch] font-poppins text-[clamp(0.72rem,1.1vw,0.9rem)] leading-relaxed tracking-[0.35px] text-white/90 [text-shadow:0_0_10px_rgba(255,200,100,0.2)]">
                  Explore the 9 planets that influence your destiny and shape your life.
                </p>
              </div>
            </div>

            <p className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap font-caveat text-[1.35rem] text-white/85">
              Hover on a planet, click to explore
            </p>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div
            className="relative overflow-hidden rounded-[32px] border border-[#b88a52]/40 px-6 py-8 text-[#2b1a0f] shadow-[0_18px_60px_rgba(0,0,0,0.45)] sm:px-10 sm:py-10"
            style={tornParchmentStyle}
          >
            <WashiTapeDoodle className="pointer-events-none absolute left-4 top-0 h-14 w-28 -translate-y-3 -rotate-[10deg]" />
            <FeatherDoodle className="pointer-events-none absolute bottom-4 left-4 hidden h-40 w-24 opacity-75 sm:block" />
            <SparklesDoodle className="pointer-events-none absolute right-8 top-6 h-20 w-20 opacity-45" stroke="#8b5e34" />
            <StarsDoodle className="pointer-events-none absolute bottom-6 right-8 h-14 w-14 opacity-35" stroke="#8b5e34" />

            <div className="grid gap-8 lg:grid-cols-[1.5fr_0.7fr] lg:items-start">
              <div className="max-w-3xl pl-0 sm:pl-20">
                <h2 className="font-kalam text-[clamp(2rem,3vw,3rem)] leading-tight text-[#2b1a0f]">
                  What are Planets in Vedic Astrology?
                </h2>
                <p className="mt-5 font-poppins text-base leading-8 text-[#2b1a0f]/90 sm:text-lg">
                  In Vedic Astrology, planets, Grahas, are not just celestial bodies. They are
                  cosmic intelligences that reveal how{' '}
                  <span className="highlight-marker">karma</span>,{' '}
                  <span className="highlight-marker">mind</span>, and{' '}
                  <span className="highlight-marker">soul&apos;s journey</span> unfold through
                  human life. Each Graha acts like a teacher, showing where we shine, where we
                  struggle, and where consciousness can mature.
                </p>
              </div>

              <aside className="relative justify-self-end rounded-[20px] border border-[#b88a52]/55 bg-[#efd7a8]/90 px-6 py-8 text-[#2b1a0f] shadow-[0_16px_40px_rgba(87,50,18,0.22)] rotate-[3deg]">
                <WashiTapeDoodle className="pointer-events-none absolute left-1/2 top-0 h-12 w-24 -translate-x-1/2 -translate-y-4 rotate-[4deg]" />
                <p className="font-caveat text-[2rem] leading-tight">
                  The planets do not control your life, they simply reveal the path.
                </p>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8 flex flex-wrap items-end justify-center gap-3 text-center">
            <h2 className="font-caveat text-[clamp(2.8rem,5vw,4.3rem)] leading-none text-white">
              Explore the 9 Planets
            </h2>
            <span className="font-caveat text-[clamp(1.7rem,2.7vw,2.3rem)] text-white/85">
              (Navagraha)
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {PLANETS.slice(0, 5).map((planet) => (
              <PlanetGridCard key={planet.key} planet={planet} />
            ))}
          </div>
          <div className="mx-auto mt-4 grid max-w-[1030px] gap-4 md:grid-cols-2 xl:grid-cols-4">
            {PLANETS.slice(5).map((planet) => (
              <PlanetGridCard key={planet.key} planet={planet} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div
            className="relative overflow-hidden rounded-[30px] border border-[#b88a52]/45 px-6 py-8 text-[#2b1a0f] shadow-[0_18px_60px_rgba(0,0,0,0.45)] sm:px-8 lg:px-10"
            style={tornNotebookStyle}
          >
            <SpiralBinding className="pointer-events-none absolute bottom-0 left-0 top-0 h-full w-11 opacity-70" />
            <WashiTapeDoodle className="pointer-events-none absolute right-4 top-2 h-16 w-32 rotate-[18deg]" />
            <SparklesDoodle className="pointer-events-none absolute right-20 bottom-10 h-16 w-16 opacity-25" stroke="#8b5e34" />
            <OrbitAccentDoodle className="pointer-events-none absolute bottom-6 left-16 hidden h-20 w-32 opacity-35 lg:block" />
            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr_0.95fr] lg:items-center">
              <div className="relative pl-4 sm:pl-8">
                <h2 className="font-kalam text-[clamp(2rem,3vw,3rem)] leading-tight text-[#2b1a0f]">
                  How Planets Influence Your Life
                </h2>
                <div className="mt-8 space-y-6">
                  <div className="flex gap-4">
                    <MoonDoodle className="mt-1 h-8 w-8 shrink-0 opacity-80" />
                    <p className="font-poppins text-base leading-8 text-[#2b1a0f]/90">
                      They influence your <span className="highlight-marker">thoughts</span>,{' '}
                      <span className="highlight-marker">emotions</span>, and actions through the
                      habits of the mind.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <HeartDoodle className="mt-1 h-8 w-8 shrink-0 opacity-80" />
                    <p className="font-poppins text-base leading-8 text-[#2b1a0f]/90">
                      They create situations that help you <span className="highlight-marker">evolve</span>{' '}
                      and learn with greater awareness.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <FeatherDoodle className="mt-1 h-8 w-8 shrink-0 opacity-80" />
                    <p className="font-poppins text-base leading-8 text-[#2b1a0f]/90">
                      They reveal your strengths, your challenges, and your{' '}
                      <span className="highlight-marker">purpose</span>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[360px]">
                <div className="relative">
                  <WashiTapeDoodle className="pointer-events-none absolute -right-5 -top-6 z-20 h-14 w-28 rotate-[12deg]" />
                  <ArrowDoodle className="pointer-events-none absolute -left-16 top-1/2 hidden h-20 w-24 -translate-y-1/2 opacity-45 lg:block" />
                  <img
                    src={planetAssets.misc.geometry}
                    alt="Sacred geometry meditation illustration"
                    className="w-full rounded-[18px] object-cover shadow-[0_14px_34px_rgba(43,26,15,0.22)]"
                    loading="lazy"
                  />
                  {/* TODO: Replace with a dedicated meditating figure under a cosmic sky when that asset is generated. */}
                </div>
                <ArrowDoodle className="pointer-events-none absolute -left-10 bottom-8 hidden h-20 w-20 opacity-55 lg:block" />
              </div>

              <aside className="relative rounded-[22px] border border-[#b88a52]/45 bg-[rgba(245,230,200,0.5)] px-6 py-8">
                <HandDrawnEllipse className="pointer-events-none absolute -left-1 -top-5 h-24 w-48 rotate-[4deg] opacity-90" />
                <p className="relative z-10 inline-block px-5 py-4 font-caveat text-[1.95rem] leading-none text-[#6c1a14]">
                  Remember
                </p>
                <p className="mt-6 font-caveat text-[2rem] leading-[1.32] text-[#2b1a0f]">
                  You are not your planets. You are beyond them. But understanding them{' '}
                  <span className="highlight-marker">empowers you</span>.
                </p>
                <FeatherDoodle className="pointer-events-none absolute bottom-4 right-4 h-32 w-16 opacity-60" />
              </aside>
            </div>
            <div className="relative z-10 mx-auto mt-10 max-w-3xl rounded-[22px] border border-[#b88a52]/35 bg-[#f5e6c8]/45 px-5 py-4 text-center shadow-[0_10px_28px_rgba(87,50,18,0.12)]">
              <ArrowDoodle className="pointer-events-none absolute -left-10 top-1/2 hidden h-16 w-20 -translate-y-1/2 opacity-45 md:block" />
              <ArrowDoodle className="pointer-events-none absolute -right-10 top-1/2 hidden h-16 w-20 -translate-y-1/2 rotate-180 opacity-45 md:block" />
              <p className="font-devanagari text-2xl leading-snug text-[#6c1a14]">
                ॐ नवग्रहाय नमः
              </p>
              <p className="mt-1 font-caveat text-[1.45rem] leading-tight text-[#2b1a0f]">
                Om Navagrahāya Namaḥ, salutations to the nine planetary forces.
              </p>
              <div className="mx-auto mt-3 h-px w-48 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 pt-3 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[22px] border border-red-500/35 bg-[linear-gradient(180deg,rgba(61,9,9,0.92),rgba(7,7,7,0.98))] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          <img
            src={planetAssets.misc.layer}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-screen"
            loading="lazy"
          />
          <OrbitAccentDoodle className="pointer-events-none absolute left-6 top-4 h-20 w-28 opacity-55" />
          <SparklesDoodle className="pointer-events-none absolute right-8 top-5 h-14 w-14 opacity-30" />
          <div className="relative z-10 grid gap-4 border-b border-amber-300/15 px-6 py-5 text-center sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:text-left">
            <div>
              <p className="max-w-[26ch] font-caveat text-[1.45rem] leading-7 text-white/88">
                Discover your cosmic blueprint and align with your true path.
              </p>
            </div>
            <div className="relative flex justify-center">
              <span className="pointer-events-none absolute -left-9 top-1/2 hidden h-px w-7 -translate-y-1/2 bg-amber-300/45 sm:block" aria-hidden="true" />
              <span className="pointer-events-none absolute -right-9 top-1/2 hidden h-px w-7 -translate-y-1/2 bg-amber-300/45 sm:block" aria-hidden="true" />
              <SparklesDoodle className="pointer-events-none absolute -left-16 top-1/2 hidden h-9 w-9 -translate-y-1/2 opacity-35 sm:block" />
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-amber-300/60 bg-amber-300 px-8 py-2.5 font-poppins text-sm font-semibold tracking-[0.4px] text-[#2b1a0f] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Book Your Reading
              </Link>
            </div>
            <div>
              <p className="relative inline-block font-caveat text-[1.7rem] leading-none text-white/92 after:absolute after:-bottom-2 after:left-1/2 after:h-px after:w-28 after:-translate-x-1/2 after:bg-red-400/50 lg:text-right">
                Align. Transform. Elevate.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid gap-5 px-6 py-6 text-center sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:text-left">
            <div className="flex items-center justify-center gap-4 lg:justify-start">
              <OmMark className="scale-90" />
              <div>
                <p className="font-devanagari text-xl text-amber-200">ॐ तत् सत्</p>
                <p className="font-caveat text-[1.2rem] tracking-[0.4px] text-white/76">Om Tat Sat</p>
              </div>
            </div>

            <div className="relative mx-auto flex h-24 w-64 items-center justify-center">
              <span
                className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-amber-300/35 to-transparent"
                aria-hidden="true"
              />
              <SacredMandalaDoodle className="relative z-10 h-28 w-28 opacity-95 drop-shadow-[0_0_20px_rgba(250,204,21,0.34)]" />
              <SparklesDoodle className="pointer-events-none absolute left-8 top-1 h-8 w-8 opacity-35" />
              <SparklesDoodle className="pointer-events-none absolute bottom-2 right-9 h-7 w-7 opacity-25" />
            </div>

            <div className="flex items-center justify-center gap-4 lg:justify-end">
              <p className="max-w-[23ch] font-caveat text-[1.45rem] leading-tight text-white/90 lg:text-right">
                The universe is within you. Trust the cosmic journey.
              </p>
              <DiyaDoodle className="h-14 w-24 shrink-0" />
            </div>
          </div>
          <LotusDoodle className="pointer-events-none absolute bottom-5 right-24 hidden h-12 w-24 opacity-45 lg:block" />
        </div>
      </section>
    </div>
  );
}
