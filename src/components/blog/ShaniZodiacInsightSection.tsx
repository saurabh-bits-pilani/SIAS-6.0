import { Star } from 'lucide-react';

const insights = [
  {
    sign: 'Makara, Capricorn',
    phase: 'Sade Sati, Final Phase',
    body: 'Shani is your own ruler. This phase brings culmination and earned rewards after years of effort.',
  },
  {
    sign: 'Kumbha, Aquarius',
    phase: 'Sade Sati, Middle Phase',
    body: 'The most intense phase. Discipline, patience, and inner restructuring are the themes.',
  },
  {
    sign: 'Mesha, Aries',
    phase: 'Dhaiya, Second Phase',
    body: 'Career and financial decisions need careful thought. Avoid impulsive moves.',
  },
  {
    sign: 'Tula, Libra',
    phase: 'Dhaiya, Second Phase',
    body: 'Relationships and partnerships face scrutiny. Authenticity is rewarded.',
  },
] as const;

export default function ShaniZodiacInsightSection() {
  return (
    <section className="my-12 rounded-3xl bg-blog-navy px-5 py-10 text-blog-cream md:px-8 not-prose">
      <div className="text-center">
        <h2 className="font-caveat text-4xl md:text-6xl font-bold text-blog-gold">
          Who Feels Shani Strongest This Year?
        </h2>
        <p className="mt-2 font-poppins text-sm md:text-base text-blog-cream/70">
          A gentle guide, not a verdict
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {insights.map((item) => (
          <div
            key={item.sign}
            className="rounded-2xl border border-blog-gold/20 bg-blog-navy-light p-5"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blog-gold/20">
              <Star className="h-6 w-6 text-blog-gold" aria-hidden="true" />
            </div>
            <h3 className="font-poppins text-lg font-bold text-blog-cream">
              {item.sign}
            </h3>
            <span className="mt-3 inline-flex rounded-full border border-blog-gold/30 bg-blog-gold/15 px-3 py-1 font-poppins text-xs font-semibold text-blog-gold">
              {item.phase}
            </span>
            <p className="mt-4 font-poppins text-sm leading-relaxed text-blog-cream/75">
              {item.body}
            </p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center font-caveat text-3xl italic text-blog-gold">
        Patience now, peace forever. Shani rewards sincerity, not shortcuts.
      </p>
    </section>
  );
}
