import { Link } from 'react-router-dom';

interface LiveCardProps {
  title: string;
  sanskrit?: string;
  href: string;
  /** Tailwind accent color key (e.g. "yellow", "red"). Default "yellow". */
  accentColor?: 'yellow' | 'red' | 'blue' | 'green' | 'orange';
}

const accentClasses: Record<NonNullable<LiveCardProps['accentColor']>, string> = {
  yellow:
    'border-yellow-400/70 hover:border-yellow-500 shadow-[0_0_0_1px_rgba(252,211,77,0.25),0_8px_30px_-12px_rgba(252,211,77,0.5)] hover:shadow-[0_0_0_1px_rgba(252,211,77,0.45),0_12px_40px_-10px_rgba(252,211,77,0.65)]',
  red: 'border-red-400/70 hover:border-red-500 shadow-[0_0_0_1px_rgba(248,113,113,0.25),0_8px_30px_-12px_rgba(248,113,113,0.5)]',
  blue: 'border-blue-400/70 hover:border-blue-500 shadow-[0_0_0_1px_rgba(96,165,250,0.25),0_8px_30px_-12px_rgba(96,165,250,0.5)]',
  green:
    'border-green-400/70 hover:border-green-500 shadow-[0_0_0_1px_rgba(74,222,128,0.25),0_8px_30px_-12px_rgba(74,222,128,0.5)]',
  orange:
    'border-orange-400/70 hover:border-orange-500 shadow-[0_0_0_1px_rgba(251,146,60,0.25),0_8px_30px_-12px_rgba(251,146,60,0.5)]',
};

const badgeClasses: Record<NonNullable<LiveCardProps['accentColor']>, string> = {
  yellow: 'bg-yellow-400 text-gray-900',
  red: 'bg-red-500 text-white',
  blue: 'bg-blue-500 text-white',
  green: 'bg-green-500 text-white',
  orange: 'bg-orange-500 text-white',
};

/**
 * Live pillar-page card for the /planets, /zodiac, and /dosha hubs.
 * Rendered as a `Link` so navigation stays SPA-side (no full reload).
 * Pair with ComingSoonCard for planets/signs not yet shipped.
 */
export default function LiveCard({
  title,
  sanskrit,
  href,
  accentColor = 'yellow',
}: LiveCardProps) {
  return (
    <Link
      to={href}
      role="listitem"
      aria-label={`${title} — now live`}
      className={`group relative block rounded-2xl border-2 bg-white px-6 py-10 text-center cursor-pointer select-none transition-all duration-200 hover:-translate-y-1 ${accentClasses[accentColor]}`}
    >
      <span
        className={`absolute top-3 right-3 font-inter text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${badgeClasses[accentColor]}`}
      >
        Now Live
      </span>
      <h3 className="font-kalam text-2xl text-gray-900 leading-tight group-hover:text-primary-700 transition-colors">
        {title}
      </h3>
      {sanskrit ? (
        <p className="font-devanagari text-xl text-gray-700 mt-2">{sanskrit}</p>
      ) : null}
      <p className="mt-4 text-xs font-inter font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
        Read more →
      </p>
    </Link>
  );
}
