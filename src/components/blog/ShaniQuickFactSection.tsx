import { Gift, Sparkles, Sun } from 'lucide-react';

interface ShaniQuickFactSectionProps {
  heroImageUrl: string;
  quickFactImageUrl: string;
}

const cards = [
  {
    title: 'What To Do',
    border: 'border-l-green-600',
    items: [
      'Offer sesame oil, til ka tel, to Shani Dev',
      'Donate black items: sesame seeds, urad dal, black cloth',
      'Help the needy and those in hardship',
      'Chant Shani mantra 108 times on a sphatik or iron mala',
      'Visit a Shani temple or light a diya under a Peepal tree',
    ],
  },
  {
    title: 'What Not To Do',
    border: 'border-l-red-600',
    items: [
      'Avoid alcohol and non-vegetarian food',
      'Do not lie, speak harshly, or deceive anyone',
      'Avoid cutting nails or hair',
      'Do not start new loans or financial risks',
      'Avoid unnecessary arguments',
    ],
  },
  {
    title: 'Donation Guide',
    border: 'border-l-blog-gold',
    icon: Gift,
    items: [
      'Black sesame seeds, til',
      'Urad dal, black lentils',
      'Black cloth or iron items',
      'Footwear for the needy',
      'Mustard oil, til ka tel',
    ],
  },
] as const;

export default function ShaniQuickFactSection({
  heroImageUrl,
  quickFactImageUrl,
}: ShaniQuickFactSectionProps) {
  return (
    <section className="my-10 rounded-3xl bg-blog-cream p-5 md:p-8 not-prose">
      <div className="text-center mb-6">
        <Sparkles className="w-5 h-5 mx-auto text-blog-gold mb-2" aria-hidden="true" />
        <h2 className="font-kalam text-3xl md:text-5xl font-bold text-blog-ink">
          Shani Jayanti Quick Facts
        </h2>
        <div className="flex items-center justify-center gap-4 mt-4">
          <span className="h-px w-16 bg-blog-gold/40" aria-hidden="true" />
          <Sun className="w-4 h-4 text-blog-gold" aria-hidden="true" />
          <span className="h-px w-16 bg-blog-gold/40" aria-hidden="true" />
        </div>
      </div>

      <img
        src={quickFactImageUrl}
        alt="Shani Jayanti quick fact infographic showing rituals, donations, and mantra guidance"
        className="mx-auto block w-full max-w-4xl h-auto rounded-2xl border border-blog-gold/25 shadow-sm"
        loading="lazy"
      />

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`rounded-2xl border border-blog-gold/25 bg-blog-cream-soft p-5 border-l-4 ${card.border}`}
            >
              <div className="mb-3 flex items-center gap-2">
                {Icon ? <Icon className="h-4 w-4 text-blog-gold" aria-hidden="true" /> : null}
                <h3 className="font-poppins text-base font-bold text-blog-ink">
                  {card.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {card.items.map((item) => (
                  <li key={item} className="font-poppins text-sm leading-relaxed text-blog-ink/75">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <div className="rounded-2xl border border-blog-gold/25 bg-blog-navy p-5 text-blog-cream">
          <h3 className="mb-3 font-poppins text-base font-bold text-blog-gold">
            Mantra
          </h3>
          <p className="font-devanagari text-xl leading-relaxed">ॐ शं शनैश्चराय नमः</p>
          <p className="mt-2 font-poppins text-sm italic text-blog-cream/80">
            Om Sham Shanaischaraya Namah
          </p>
          <p className="mt-3 font-poppins text-sm leading-relaxed text-blog-cream/75">
            Chant 108 times, Saturday morning.
          </p>
        </div>
      </div>

      <img src={heroImageUrl} alt="" aria-hidden="true" className="hidden" loading="lazy" />
    </section>
  );
}
