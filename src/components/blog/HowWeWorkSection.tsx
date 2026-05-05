import { Link } from 'react-router-dom';
import {
  Sparkles,
  Sun,
  Flower2,
  User,
  Moon,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

export interface HowWeWorkPrimaryItem {
  icon: LucideIcon;
  title: string;
  /** Body string. Use `\n` to split into paragraphs. */
  body: string;
}

export interface HowWeWorkInfoItem {
  icon: LucideIcon;
  title: string;
  body: string;
}

interface HowWeWorkSectionProps {
  titleLine1: string;
  titleLine2: string;
  introIcon: LucideIcon;
  introTitle: string;
  introBody: string;
  primaryItems: readonly HowWeWorkPrimaryItem[];
  infoItems: readonly HowWeWorkInfoItem[];
  ctaIntro: string;
  ctaLinkText: string;
  ctaLinkHref: string;
  ctaOutro: string;
  closingIcon: LucideIcon;
  closingLine1: string;
  closingLine2: string;
}

function PrimaryCard({ item }: { item: HowWeWorkPrimaryItem }) {
  const Icon = item.icon;
  const paragraphs = item.body.split('\n');
  return (
    <div className="bg-blog-cream-soft border border-blog-gold/25 rounded-2xl p-5 md:p-6 flex items-start gap-5 md:gap-6 relative">
      <div className="w-16 md:w-20 flex-shrink-0 flex flex-col items-center">
        <div className="w-14 h-14 md:w-16 md:h-16 bg-blog-cream rounded-full flex items-center justify-center border border-blog-gold/30">
          <Icon className="w-7 h-7 md:w-8 md:h-8 text-blog-navy" aria-hidden="true" />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-poppins font-bold text-blog-ink text-xl md:text-2xl mb-2 leading-tight">
          {item.title}
        </h3>
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className={`font-poppins text-blog-ink/80 text-sm md:text-base leading-relaxed ${i > 0 ? 'mt-2' : ''}`}
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

function InfoCard({ item }: { item: HowWeWorkInfoItem }) {
  const Icon = item.icon;
  return (
    <div className="bg-blog-cream-soft border border-blog-gold/25 rounded-2xl p-5 flex items-start gap-4">
      <div className="w-12 h-12 flex-shrink-0 bg-blog-cream rounded-full flex items-center justify-center border border-blog-gold/30">
        <Icon className="w-6 h-6 text-blog-gold" aria-hidden="true" />
      </div>
      <div className="flex-1">
        <h4 className="font-poppins font-bold text-blog-ink text-lg mb-1">{item.title}</h4>
        <p className="font-poppins text-blog-ink/80 text-sm md:text-base leading-relaxed">
          {item.body}
        </p>
      </div>
    </div>
  );
}

export default function HowWeWorkSection({
  titleLine1,
  titleLine2,
  introIcon: IntroIcon,
  introTitle,
  introBody,
  primaryItems,
  infoItems,
  ctaIntro,
  ctaLinkText,
  ctaLinkHref,
  ctaOutro,
  closingIcon: ClosingIcon,
  closingLine1,
  closingLine2,
}: HowWeWorkSectionProps) {
  return (
    <section className="my-12 md:my-16 relative overflow-hidden not-prose">
      {/* Decorative motifs */}
      <Flower2
        className="absolute top-4 left-4 w-32 h-32 text-blog-gold/10 pointer-events-none"
        aria-hidden="true"
      />
      <Sun
        className="absolute top-4 right-4 w-32 h-32 text-blog-gold/10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Title block */}
      <div className="text-center mb-10 relative z-10">
        <Sparkles className="w-4 h-4 mx-auto text-blog-gold mb-3" aria-hidden="true" />
        <h2 className="font-poppins font-bold text-3xl md:text-5xl text-blog-ink text-center">
          {titleLine1}
        </h2>
        <div className="flex items-center justify-center gap-3 mt-1">
          <Sparkles className="w-5 h-5 text-blog-gold" aria-hidden="true" />
          <p className="font-caveat italic text-3xl md:text-5xl text-blog-gold text-center">
            {titleLine2}
          </p>
          <Sparkles className="w-5 h-5 text-blog-gold" aria-hidden="true" />
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <span className="h-px w-16 bg-blog-gold/40" aria-hidden="true" />
          <Sun className="w-4 h-4 text-blog-gold" aria-hidden="true" />
          <span className="h-px w-16 bg-blog-gold/40" aria-hidden="true" />
        </div>
      </div>

      {/* Intro callout */}
      <div className="bg-blog-cream-soft border border-blog-gold/30 rounded-2xl p-5 md:p-6 mb-8 flex items-start gap-4 relative z-10">
        <div className="w-14 h-14 flex-shrink-0 bg-blog-gold rounded-full flex items-center justify-center">
          <IntroIcon className="w-7 h-7 text-white" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <p className="font-poppins font-bold text-blog-ink text-base md:text-lg mb-1">
            {introTitle}
          </p>
          <p className="font-poppins text-blog-ink/75 text-sm md:text-base leading-relaxed">
            {introBody}
          </p>
        </div>
      </div>

      {/* Primary cards */}
      <div className="space-y-5 mb-8 relative z-10">
        {primaryItems.map((item) => (
          <PrimaryCard key={item.title} item={item} />
        ))}
      </div>

      {/* Info strip (Languages + Location) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 relative z-10">
        {infoItems.map((item) => (
          <InfoCard key={item.title} item={item} />
        ))}
      </div>

      {/* CTA banner with meditator illustration */}
      <div className="bg-blog-cream-soft border border-blog-gold/30 rounded-2xl p-6 md:p-8 mb-8 flex items-start gap-6 md:gap-8 relative overflow-hidden z-10">
        <Sparkles
          className="absolute bottom-4 right-6 w-5 h-5 text-blog-gold/40 pointer-events-none"
          aria-hidden="true"
        />
        {/* Illustration: navy circle with seated User figure + Moon + scattered Sparkles */}
        <div className="hidden sm:flex w-24 md:w-32 flex-shrink-0 h-24 md:h-32 bg-blog-navy rounded-full items-center justify-center relative">
          <Moon
            className="w-6 h-6 text-blog-cream/60 absolute top-3 right-3"
            aria-hidden="true"
          />
          <Sparkles
            className="w-3 h-3 text-blog-gold/50 absolute top-4 left-4"
            aria-hidden="true"
          />
          <Sparkles
            className="w-3 h-3 text-blog-gold/50 absolute bottom-5 left-5"
            aria-hidden="true"
          />
          <Sparkles
            className="w-3 h-3 text-blog-gold/50 absolute bottom-3 right-5"
            aria-hidden="true"
          />
          <User className="w-12 h-12 md:w-14 md:h-14 text-blog-gold relative z-10" aria-hidden="true" />
        </div>

        <div className="flex-1">
          <p className="font-poppins text-blog-ink text-base md:text-lg leading-relaxed mb-3">
            {ctaIntro}
          </p>
          <Link
            to={ctaLinkHref}
            className="inline-flex items-center gap-2 bg-blog-gold hover:bg-blog-gold-bright text-blog-navy px-5 py-2.5 rounded-full font-semibold font-poppins transition-colors text-sm md:text-base"
          >
            {ctaLinkText}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <p className="font-poppins text-blog-ink/75 text-sm md:text-base leading-relaxed mt-3">
            {ctaOutro}
          </p>
        </div>
      </div>

      {/* Closing line */}
      <div className="bg-blog-cream-soft border border-blog-gold/30 rounded-2xl p-4 md:p-5 flex items-center gap-4 relative z-10">
        <div className="w-10 h-10 flex-shrink-0 bg-blog-cream rounded-full flex items-center justify-center border border-blog-gold/30">
          <ClosingIcon className="w-5 h-5 text-blog-gold" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <p className="font-poppins font-bold text-blog-ink text-base md:text-lg leading-relaxed">
            {closingLine1}
          </p>
          <p className="font-poppins text-blog-gold font-semibold text-base md:text-lg leading-relaxed">
            {closingLine2}
          </p>
        </div>
      </div>
    </section>
  );
}
