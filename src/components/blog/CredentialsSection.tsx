import { Sparkles, Sun, Flower2, type LucideIcon } from 'lucide-react';

export interface CredentialsInlineListEntry {
  icon: LucideIcon;
  label: string;
}

export interface CredentialsWarning {
  icon: LucideIcon;
  text: string;
}

export interface CredentialsItem {
  number: string;
  icon: LucideIcon;
  title: string;
  intro: string;
  bullets?: readonly string[];
  inlineList?: readonly CredentialsInlineListEntry[];
  body?: string;
  warning?: CredentialsWarning;
}

interface CredentialsSectionProps {
  titleLine1: string;
  titleLine2: string;
  introIcon: LucideIcon;
  introBody: string;
  items: readonly CredentialsItem[];
  footerIcon: LucideIcon;
  footerLine1: string;
  footerLine2: string;
}

export default function CredentialsSection({
  titleLine1,
  titleLine2,
  introIcon: IntroIcon,
  introBody,
  items,
  footerIcon: FooterIcon,
  footerLine1,
  footerLine2,
}: CredentialsSectionProps) {
  return (
    <section className="my-12 md:my-16 relative overflow-hidden not-prose">
      {/* Decorative motifs */}
      <Flower2
        className="absolute top-0 left-0 w-32 h-32 text-blog-gold/10 pointer-events-none"
        aria-hidden="true"
      />
      <Flower2
        className="absolute top-4 right-4 w-32 h-32 text-blog-gold/10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Title block */}
      <div className="text-center mb-10 relative z-10">
        <Sparkles className="w-4 h-4 mx-auto text-blog-gold mb-3" aria-hidden="true" />
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
      <div className="bg-blog-cream-soft border border-blog-gold/30 rounded-2xl p-5 md:p-6 mb-8 flex items-start gap-4 relative overflow-hidden">
        <Flower2
          className="absolute right-4 top-4 w-12 h-12 text-blog-gold/15 pointer-events-none"
          aria-hidden="true"
        />
        <div className="w-14 h-14 flex-shrink-0 bg-blog-gold/15 rounded-full flex items-center justify-center relative z-10">
          <IntroIcon className="w-7 h-7 text-blog-gold" aria-hidden="true" />
        </div>
        <p className="flex-1 font-poppins text-blog-ink/85 text-base md:text-lg leading-relaxed relative z-10">
          {introBody}
        </p>
      </div>

      {/* Numbered cards */}
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

              {/* Right: number badge, title, intro, optional bullets/inlineList/body/warning */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-9 h-9 rounded-full bg-blog-cream border-2 border-blog-gold flex items-center justify-center">
                    <span className="font-poppins font-bold text-blog-gold text-sm">
                      {item.number}
                    </span>
                  </div>
                </div>
                <h3 className="font-poppins font-bold text-blog-ink text-xl md:text-2xl">
                  {item.title}
                </h3>
                <p className="font-poppins text-blog-ink/85 text-sm md:text-base leading-relaxed">
                  {item.intro}
                </p>

                {item.bullets && item.bullets.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 ml-1 marker:text-blog-gold mt-1">
                    {item.bullets.map((b) => (
                      <li
                        key={b}
                        className="font-poppins text-blog-ink/80 text-sm md:text-base"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                {item.inlineList && item.inlineList.length > 0 && (
                  <div className="flex flex-wrap gap-x-5 gap-y-2 mt-2">
                    {item.inlineList.map((entry) => {
                      const EntryIcon = entry.icon;
                      return (
                        <div key={entry.label} className="flex items-center gap-2">
                          <EntryIcon
                            className="w-5 h-5 text-blog-gold"
                            aria-hidden="true"
                          />
                          <span className="font-poppins text-blog-ink text-sm md:text-base font-medium">
                            {entry.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {item.body && (
                  <p className="font-poppins text-blog-ink/75 text-sm md:text-base leading-relaxed mt-2">
                    {item.body}
                  </p>
                )}

                {item.warning && (() => {
                  const WIcon = item.warning.icon;
                  return (
                    <div className="bg-blog-gold/10 border border-blog-gold/30 rounded-lg px-3 py-2 mt-3 flex items-start gap-2">
                      <WIcon
                        className="w-4 h-4 text-blog-gold flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <p className="font-poppins italic text-blog-ink/80 text-sm">
                        {item.warning.text}
                      </p>
                    </div>
                  );
                })()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer banner */}
      <div className="mt-10 bg-blog-navy rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 right-0 w-32 h-32 opacity-15 pointer-events-none"
          aria-hidden="true"
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="0.5"
          />
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
        <Sparkles
          className="absolute bottom-4 right-6 w-5 h-5 text-blog-gold/40 pointer-events-none"
          aria-hidden="true"
        />

        <div className="flex items-start gap-4 relative z-10">
          <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 bg-blog-gold/20 rounded-full flex items-center justify-center">
            <FooterIcon
              className="w-6 h-6 md:w-7 md:h-7 text-blog-gold"
              aria-hidden="true"
            />
          </div>
          <div className="flex-1">
            <p className="font-poppins text-blog-cream/90 text-base md:text-lg leading-relaxed">
              {footerLine1}
            </p>
            <p className="font-poppins text-blog-gold font-semibold text-base md:text-lg leading-relaxed mt-1">
              {footerLine2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
