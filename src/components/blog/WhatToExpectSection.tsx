import { Sparkles, Sun, Flower2, type LucideIcon } from 'lucide-react';

export interface WhatToExpectItem {
  number: string;
  icon: LucideIcon;
  title: string;
  body: string;
}

interface WhatToExpectSectionProps {
  titleLine1: string;
  titleLine2: string;
  introIcon: LucideIcon;
  introBody: string;
  introHighlight: string;
  items: readonly WhatToExpectItem[];
  footerIcon: LucideIcon;
  footerLine1: string;
  footerLine2: string;
}

export default function WhatToExpectSection({
  titleLine1,
  titleLine2,
  introIcon: IntroIcon,
  introBody,
  introHighlight,
  items,
  footerIcon: FooterIcon,
  footerLine1,
  footerLine2,
}: WhatToExpectSectionProps) {
  return (
    <section className="my-12 md:my-16 relative overflow-hidden not-prose">
      {/* Decorative motifs */}
      <Sun
        className="absolute top-4 right-4 w-32 h-32 text-blog-gold/10 pointer-events-none"
        aria-hidden="true"
      />
      <Flower2
        className="absolute bottom-4 left-4 w-24 h-24 text-blog-gold/10 pointer-events-none"
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
      <div className="bg-blog-cream-soft border border-blog-gold/30 rounded-2xl p-5 md:p-6 mb-8 flex items-start gap-4 relative overflow-hidden">
        <div className="w-14 h-14 flex-shrink-0 bg-blog-gold rounded-full flex items-center justify-center">
          <IntroIcon className="w-7 h-7 text-white" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <p className="font-poppins text-blog-ink/85 text-base md:text-lg leading-relaxed">
            {introBody}
          </p>
          <p className="font-poppins font-semibold text-blog-ink text-base md:text-lg leading-relaxed mt-1">
            {introHighlight}
          </p>
        </div>
      </div>

      {/* Numbered step cards */}
      <div className="space-y-5">
        {items.map((item, i) => {
          const Icon = item.icon;
          const isLast = i === items.length - 1;
          return (
            <div
              key={item.number}
              className="bg-blog-cream-soft border border-blog-gold/25 rounded-2xl p-5 md:p-6 flex items-start gap-5 md:gap-6 relative"
            >
              {/* Left: icon + dotted divider */}
              <div className="w-16 md:w-20 flex-shrink-0 flex flex-col items-center self-stretch">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-blog-cream rounded-full flex items-center justify-center border border-blog-gold/30">
                  <Icon
                    className="w-7 h-7 md:w-8 md:h-8 text-blog-navy"
                    aria-hidden="true"
                  />
                </div>
                {!isLast && (
                  <div
                    className="mt-3 w-px flex-1 border-l border-dashed border-blog-gold/40 min-h-[40px]"
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Right: number badge, title, body */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-9 h-9 rounded-full bg-blog-cream border-2 border-blog-gold flex items-center justify-center">
                    <span className="font-poppins font-bold text-blog-gold text-sm">
                      {item.number}
                    </span>
                  </div>
                </div>
                <h3 className="font-poppins font-bold text-blog-ink text-lg md:text-2xl leading-tight">
                  {item.title}
                </h3>
                <p className="font-poppins text-blog-ink/80 text-sm md:text-base leading-relaxed">
                  {item.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer banner */}
      <div className="mt-10 bg-blog-cream-soft border border-blog-gold/30 rounded-2xl p-5 md:p-6 flex items-start gap-4 relative overflow-hidden">
        <Sparkles
          className="absolute bottom-3 right-4 w-5 h-5 text-blog-gold/40 pointer-events-none"
          aria-hidden="true"
        />
        <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 bg-blog-gold rounded-full flex items-center justify-center">
          <FooterIcon className="w-6 h-6 md:w-7 md:h-7 text-white" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <p className="font-poppins text-blog-ink/85 text-base md:text-lg leading-relaxed">
            {footerLine1}
          </p>
          <p className="font-poppins text-blog-gold font-semibold text-base md:text-lg leading-relaxed mt-1">
            {footerLine2}
          </p>
        </div>
      </div>
    </section>
  );
}
