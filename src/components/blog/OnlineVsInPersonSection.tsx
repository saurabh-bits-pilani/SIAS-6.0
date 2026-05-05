import { Sparkles, Sun, Flower2, Quote, type LucideIcon } from 'lucide-react';

export interface ColumnItem {
  icon: LucideIcon;
  body: string;
}

export interface MattersItem {
  icon: LucideIcon;
  title: string;
  body: string;
}

interface OnlineVsInPersonSectionProps {
  titleLine1: string;
  titleLine2: string;
  highlightIntro: string;
  highlightBody: string;
  inPersonIcon: LucideIcon;
  inPersonTitle: string;
  inPersonTagline: string;
  inPersonItems: readonly ColumnItem[];
  onlineIcon: LucideIcon;
  onlineTitle: string;
  onlineTagline: string;
  onlineItems: readonly ColumnItem[];
  mattersTitle: string;
  mattersItems: readonly MattersItem[];
  footerIcon: LucideIcon;
  footerText: string;
}

/**
 * Splits the footer text on the first occurrence of ", and " so the second
 * clause can be styled with the gold/semibold accent. If the split point is
 * not present, the whole text renders in the base style.
 */
function splitFooterText(text: string): { base: string; accent: string | null } {
  const idx = text.indexOf(', and ');
  if (idx < 0) return { base: text, accent: null };
  return { base: text.slice(0, idx + 2), accent: text.slice(idx + 2) };
}

function ColumnCard({
  icon: Icon,
  title,
  tagline,
  items,
}: {
  icon: LucideIcon;
  title: string;
  tagline: string;
  items: readonly ColumnItem[];
}) {
  return (
    <div className="bg-white border border-blog-gold/30 rounded-2xl p-5 md:p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-11 h-11 bg-blog-gold/15 rounded-full flex items-center justify-center">
          <Icon className="w-5 h-5 text-blog-gold" aria-hidden="true" />
        </div>
        <h3 className="font-poppins font-bold text-blog-ink text-lg">{title}</h3>
      </div>
      <p className="font-poppins font-semibold text-blog-gold text-sm mb-4">{tagline}</p>
      <div className="h-px bg-blog-gold/20 mb-4" aria-hidden="true" />
      <ul className="space-y-4">
        {items.map((item, i) => {
          const ItemIcon = item.icon;
          return (
            <li key={i} className="flex items-start gap-3">
              <div className="w-9 h-9 flex-shrink-0 bg-blog-gold/10 rounded-full flex items-center justify-center">
                <ItemIcon className="w-4 h-4 text-blog-gold" aria-hidden="true" />
              </div>
              <p className="font-poppins text-blog-ink/80 text-sm md:text-base leading-relaxed flex-1">
                {item.body}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function OnlineVsInPersonSection({
  titleLine1,
  titleLine2,
  highlightIntro,
  highlightBody,
  inPersonIcon,
  inPersonTitle,
  inPersonTagline,
  inPersonItems,
  onlineIcon,
  onlineTitle,
  onlineTagline,
  onlineItems,
  mattersTitle,
  mattersItems,
  footerIcon: FooterIcon,
  footerText,
}: OnlineVsInPersonSectionProps) {
  const footer = splitFooterText(footerText);

  return (
    <section className="my-12 md:my-16 relative overflow-hidden bg-blog-cream-soft rounded-3xl px-4 py-8 md:px-8 md:py-12 not-prose">
      {/* Decorative motifs */}
      <Flower2
        className="absolute top-4 left-4 w-24 h-24 text-blog-gold/10 pointer-events-none"
        aria-hidden="true"
      />
      <Flower2
        className="absolute top-4 right-4 w-24 h-24 text-blog-gold/10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Title block */}
      <div className="text-center mb-8 relative z-10">
        <p className="font-caveat italic text-3xl md:text-5xl text-blog-ink text-center">
          {titleLine1}
        </p>
        <div className="flex items-center justify-center gap-3 mt-1">
          <Sparkles className="w-5 h-5 text-blog-gold" aria-hidden="true" />
          <p className="font-caveat italic text-3xl md:text-5xl text-blog-gold text-center">
            {titleLine2}
          </p>
          <Sparkles className="w-5 h-5 text-blog-gold" aria-hidden="true" />
        </div>
        <div className="flex items-center justify-center gap-4 mt-3">
          <span className="h-px w-16 bg-blog-gold/40" aria-hidden="true" />
          <Sun className="w-4 h-4 text-blog-gold" aria-hidden="true" />
          <span className="h-px w-16 bg-blog-gold/40" aria-hidden="true" />
        </div>
      </div>

      {/* Highlight callout */}
      <div className="bg-white border border-blog-gold/30 rounded-2xl p-5 md:p-6 mb-8 flex items-start gap-4 relative z-10">
        <div className="w-12 h-12 flex-shrink-0 bg-blog-gold rounded-full flex items-center justify-center">
          <Quote className="w-6 h-6 text-white" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <p className="font-poppins text-blog-ink text-base md:text-lg leading-relaxed">
            {highlightIntro}
          </p>
          <p className="font-poppins font-semibold text-blog-gold text-base md:text-lg leading-relaxed mt-1">
            {highlightBody}
          </p>
        </div>
      </div>

      {/* Two-column comparison with VS divider */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 relative mb-10 z-10">
        <ColumnCard
          icon={inPersonIcon}
          title={inPersonTitle}
          tagline={inPersonTagline}
          items={inPersonItems}
        />
        <ColumnCard
          icon={onlineIcon}
          title={onlineTitle}
          tagline={onlineTagline}
          items={onlineItems}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blog-gold rounded-full items-center justify-center font-poppins font-bold text-white text-sm hidden md:flex z-10"
          aria-hidden="true"
        >
          VS
        </div>
      </div>

      {/* "What actually matters" pill heading */}
      <div className="mt-10 mb-6 flex items-center justify-center relative z-10">
        <span
          className="w-12 h-px border-t border-dashed border-blog-gold/40 mx-2"
          aria-hidden="true"
        />
        <div className="bg-blog-gold rounded-full px-5 py-2">
          <span className="font-poppins font-semibold text-white text-sm md:text-base">
            {mattersTitle}
          </span>
        </div>
        <span
          className="w-12 h-px border-t border-dashed border-blog-gold/40 mx-2"
          aria-hidden="true"
        />
      </div>

      {/* What matters cards (3 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 relative z-10">
        {mattersItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-white border border-blog-gold/30 rounded-2xl p-5 text-center"
            >
              <div className="w-12 h-12 mx-auto bg-blog-gold/15 rounded-full flex items-center justify-center mb-3">
                <Icon className="w-6 h-6 text-blog-gold" aria-hidden="true" />
              </div>
              <h4 className="font-poppins font-bold text-blog-ink text-base md:text-lg mb-1">
                {item.title}
              </h4>
              <p className="font-poppins text-blog-ink/70 text-sm leading-relaxed">{item.body}</p>
            </div>
          );
        })}
      </div>

      {/* Footer banner */}
      <div className="bg-blog-navy rounded-2xl p-5 md:p-6 flex items-center gap-4 relative overflow-hidden z-10">
        <Sparkles
          className="absolute bottom-3 right-4 w-5 h-5 text-blog-gold/40 pointer-events-none"
          aria-hidden="true"
        />
        <div className="w-12 h-12 flex-shrink-0 bg-blog-gold/20 rounded-full flex items-center justify-center">
          <FooterIcon className="w-6 h-6 text-blog-gold" aria-hidden="true" />
        </div>
        <p className="flex-1 font-poppins text-blog-cream/90 text-base md:text-lg leading-relaxed">
          {footer.base}
          {footer.accent && (
            <span className="text-blog-gold font-semibold">{footer.accent}</span>
          )}
        </p>
      </div>
    </section>
  );
}
