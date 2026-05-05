import {
  Sparkles,
  Sun,
  Flower2,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react';

export interface QuestionsToAskItem {
  number: string;
  icon: LucideIcon;
  title: string;
  body: string;
}

interface QuestionsToAskProps {
  titleLine1: string;
  titleLine2: string;
  introTitle: string;
  introBody: string;
  items: readonly QuestionsToAskItem[];
  closingNote: string;
}

export default function QuestionsToAsk({
  titleLine1,
  titleLine2,
  introTitle,
  introBody,
  items,
  closingNote,
}: QuestionsToAskProps) {
  return (
    <section className="my-12 md:my-16 relative overflow-hidden not-prose">
      {/* Decorative mandala, top-right corner. */}
      <Flower2
        className="absolute top-4 right-4 w-32 h-32 text-blog-gold/10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Title block */}
      <div className="text-center mb-8 relative z-10">
        <Sparkles
          className="w-4 h-4 mx-auto text-blog-gold mb-2"
          aria-hidden="true"
        />
        <h2 className="font-poppins font-bold text-3xl md:text-5xl text-blog-ink text-center">
          {titleLine1}
        </h2>
        <p className="font-caveat italic text-3xl md:text-5xl text-blog-gold text-center mt-1">
          {titleLine2}
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <span className="h-px w-16 bg-blog-gold/40" aria-hidden="true" />
          <Sun className="w-4 h-4 text-blog-gold" aria-hidden="true" />
          <span className="h-px w-16 bg-blog-gold/40" aria-hidden="true" />
        </div>
      </div>

      {/* Intro callout */}
      <div className="bg-blog-cream-soft border border-blog-gold/30 rounded-2xl p-5 md:p-6 mb-6 flex items-start gap-4 relative overflow-hidden">
        <Flower2
          className="absolute top-4 right-4 w-16 h-16 text-blog-gold/15 pointer-events-none"
          aria-hidden="true"
        />
        <div className="w-12 h-12 flex-shrink-0 bg-blog-gold rounded-full flex items-center justify-center relative z-10">
          <HelpCircle className="w-6 h-6 text-white" aria-hidden="true" />
        </div>
        <div className="flex-1 relative z-10">
          <p className="font-poppins font-bold text-blog-ink text-lg mb-1">
            {introTitle}
          </p>
          <p className="font-poppins text-blog-ink/75 text-sm md:text-base leading-relaxed">
            {introBody}
          </p>
        </div>
      </div>

      {/* Question cards */}
      <div className="space-y-4">
        {items.map((item, i) => {
          const Icon = item.icon;
          const isLast = i === items.length - 1;
          return (
            <div
              key={item.number}
              className="bg-blog-cream-soft border border-blog-gold/20 rounded-2xl p-5 md:p-6 flex items-start gap-4 md:gap-6"
            >
              {/* Left: icon */}
              <div className="w-16 md:w-20 flex-shrink-0 flex flex-col items-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-blog-cream rounded-full flex items-center justify-center border border-blog-gold/20">
                  <Icon
                    className="w-7 h-7 md:w-8 md:h-8 text-blog-navy"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Center: number badge + dotted vertical line (desktop only) */}
              <div className="hidden md:flex flex-col items-center pt-1 self-stretch">
                <div className="w-8 h-8 bg-blog-gold rounded-full flex items-center justify-center">
                  <span className="font-poppins font-bold text-white text-xs">
                    {item.number}
                  </span>
                </div>
                {!isLast && (
                  <div
                    className="w-px border-l border-dashed border-blog-gold/40 mt-2 flex-1"
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Right: title + body */}
              <div className="flex-1">
                <h3 className="font-poppins font-bold text-blog-ink text-lg md:text-xl mb-2 leading-tight">
                  <span className="md:hidden inline-flex items-center justify-center w-7 h-7 bg-blog-gold rounded-full text-white text-xs font-bold mr-2 align-middle">
                    {item.number}
                  </span>
                  {item.title}
                </h3>
                <p className="font-poppins text-blog-ink/75 text-sm md:text-base leading-relaxed">
                  {item.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Closing callout */}
      <div className="bg-blog-cream-soft border border-blog-gold/20 rounded-full px-6 py-4 mt-8 text-center">
        <div className="flex items-center justify-center gap-3">
          <Sparkles className="w-4 h-4 text-blog-gold" aria-hidden="true" />
          <p className="font-poppins italic text-blog-ink/85 text-sm md:text-base">
            {closingNote}
          </p>
          <Sparkles className="w-4 h-4 text-blog-gold" aria-hidden="true" />
        </div>
        <Flower2
          className="w-5 h-5 text-blog-gold/40 mx-auto mt-3"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
