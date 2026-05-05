import { Link } from 'react-router-dom';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  /** Optional small bar above the CTA card. */
  closingLine?: string;
}

export default function FinalCTA({
  title = "We're here to help you on that journey",
  subtitle = 'Get clarity on your life path, challenges, and opportunities.',
  buttonText = 'Book a Consultation',
  buttonHref = '/services/vedic-astrology',
  closingLine,
}: FinalCTAProps) {
  return (
    <div className="mt-12 not-prose">
      {closingLine && (
        <div className="bg-blog-cream-soft border border-blog-gold/20 rounded-2xl px-5 py-4 mb-4 flex items-center gap-3 relative overflow-hidden">
          <Compass className="w-8 h-8 text-blog-gold/40 flex-shrink-0" aria-hidden="true" />
          <p className="font-poppins text-blog-ink/85 text-sm md:text-base">{closingLine}</p>
          <Sparkles
            className="w-4 h-4 text-blog-gold/30 absolute top-3 right-3"
            aria-hidden="true"
          />
        </div>
      )}
      <div className="bg-blog-navy text-blog-cream rounded-2xl p-8 text-center relative overflow-hidden">
        {/* Decorative cosmic SVG, top-right corner. Mirrors the dark sidebar
            CTA card pattern from BlogPost.tsx for visual consistency. */}
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 right-0 w-32 h-32 opacity-15 pointer-events-none"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="80" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 4" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="#F59E0B" strokeWidth="0.5" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 100 + Math.cos(rad) * 40;
            const y1 = 100 + Math.sin(rad) * 40;
            const x2 = 100 + Math.cos(rad) * 80;
            const y2 = 100 + Math.sin(rad) * 80;
            return (
              <line
                key={`r-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#F59E0B"
                strokeWidth="0.5"
              />
            );
          })}
        </svg>
        <h3 className="font-kalam font-bold text-2xl md:text-3xl mb-3 text-blog-gold relative z-10">
          {title}
        </h3>
        <p className="text-blog-cream/80 mb-6 font-poppins relative z-10">{subtitle}</p>
        <Link
          to={buttonHref}
          className="inline-flex items-center gap-2 bg-blog-gold hover:bg-blog-gold-bright text-blog-navy px-6 py-3 rounded-full font-semibold font-poppins transition-colors relative z-10"
        >
          {buttonText}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
