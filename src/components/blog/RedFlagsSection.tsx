import { Flag, Flower2, AlertCircle, type LucideIcon } from 'lucide-react';

export interface RedFlagItem {
  number: string;
  icon: LucideIcon;
  title: string;
  body: string;
}

interface RedFlagsSectionProps {
  titleLine1: string;
  titleLine2: string;
  introIcon: LucideIcon;
  introTitle: string;
  introBody: string;
  items: readonly RedFlagItem[];
  closingIcon: LucideIcon;
  closingLine1: string;
  closingLine2: string;
}

export default function RedFlagsSection({
  titleLine1,
  titleLine2,
  introIcon: IntroIcon,
  introTitle,
  introBody,
  items,
  closingIcon: ClosingIcon,
  closingLine1,
  closingLine2,
}: RedFlagsSectionProps) {
  return (
    <section className="my-12 md:my-16 relative overflow-hidden not-prose">
      {/* Decorative motifs */}
      <Flower2
        className="absolute top-4 right-4 w-32 h-32 text-blog-gold/10 pointer-events-none"
        aria-hidden="true"
      />
      <Flower2
        className="absolute bottom-4 left-4 w-24 h-24 text-blog-gold/10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Title block */}
      <div className="mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 mb-2 bg-red-50 border border-red-200 rounded-full px-3 py-1">
          <Flag className="w-4 h-4 text-red-600" aria-hidden="true" />
          <span className="font-poppins text-xs font-semibold text-red-700">Important</span>
        </div>
        <h2 className="font-poppins font-bold text-2xl md:text-4xl">
          <span className="text-red-600">Red Flags:</span>
          <span className="text-blog-ink">
            {' '}
            {titleLine1.replace(/^Red Flags:\s*/, '')}
          </span>
          <br />
          <span className="text-blog-ink">{titleLine2}</span>
        </h2>
      </div>

      {/* Intro callout */}
      <div className="bg-blog-cream-soft border border-blog-gold/30 rounded-2xl p-5 mb-8 flex items-start gap-4">
        <div className="w-12 h-12 flex-shrink-0 bg-blog-gold/15 rounded-full flex items-center justify-center">
          <IntroIcon className="w-6 h-6 text-blog-gold" aria-hidden="true" />
        </div>
        <div>
          <p className="font-poppins font-semibold text-blog-ink text-base mb-1">
            {introTitle}
          </p>
          <p className="font-poppins text-blog-ink/75 text-sm md:text-base leading-relaxed">
            {introBody}
          </p>
        </div>
      </div>

      {/* Numbered red-flag cards */}
      <div className="space-y-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.number}
              className="bg-blog-cream-soft border border-red-100 rounded-2xl p-5 md:p-6 flex items-start gap-5 relative"
            >
              {/* Left: icon */}
              <div className="w-16 md:w-20 flex-shrink-0">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-red-50 rounded-full flex items-center justify-center border border-red-100">
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-red-500" aria-hidden="true" />
                </div>
              </div>

              {/* Center: number badge (desktop only) */}
              <div className="hidden md:flex w-10 flex-shrink-0 items-start pt-1">
                <span className="font-poppins font-bold text-red-500 text-base">
                  {item.number}
                </span>
              </div>

              {/* Right: title + body */}
              <div className="flex-1">
                <h3 className="font-poppins font-bold text-red-600 text-lg md:text-xl mb-2 leading-tight">
                  <span className="md:hidden inline-block text-red-500 font-bold text-sm mr-2">
                    {item.number}
                  </span>
                  {item.title}
                </h3>
                <p className="font-poppins text-blog-ink/80 text-sm md:text-base leading-relaxed">
                  {item.body}
                </p>
              </div>

              {/* Far right: small alert indicator (desktop only) */}
              <div className="hidden md:flex w-10 flex-shrink-0 items-start justify-center pt-1">
                <div className="w-7 h-7 bg-red-50 rounded-full flex items-center justify-center border border-red-100">
                  <AlertCircle className="w-4 h-4 text-red-500" aria-hidden="true" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Closing reassurance callout */}
      <div className="mt-10 bg-blog-cream-soft border border-blog-gold/30 rounded-2xl p-5 md:p-6 flex items-start gap-4 relative overflow-hidden">
        <Flower2
          className="absolute right-4 bottom-4 w-16 h-16 text-blog-gold/15 pointer-events-none"
          aria-hidden="true"
        />
        <div className="w-12 h-12 flex-shrink-0 bg-blog-gold/20 rounded-full flex items-center justify-center relative z-10">
          <ClosingIcon className="w-6 h-6 text-blog-gold" aria-hidden="true" />
        </div>
        <div className="relative z-10">
          <p className="font-poppins text-blog-ink/85 text-sm md:text-base leading-relaxed">
            {closingLine1}
          </p>
          <p className="font-poppins font-semibold text-blog-gold text-base md:text-lg leading-relaxed mt-1">
            {closingLine2}
          </p>
        </div>
      </div>
    </section>
  );
}
