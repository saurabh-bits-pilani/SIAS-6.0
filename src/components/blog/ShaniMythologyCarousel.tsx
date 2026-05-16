import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Sun } from 'lucide-react';

const stories = [
  {
    number: '01',
    title: 'Birth and Blessing',
    quote: 'Born to Surya, Sun, and Chhaya, Shadow, blessed with intense tapasya',
    body: 'Shani emerged as a being of extreme austerity. Even at birth, his gaze was downcast, a symbol of introspection.',
  },
  {
    number: '02',
    title: 'The Gaze of Truth',
    quote: 'His gaze reflects karma, direct and unsparing',
    body: 'Shani does not punish arbitrarily. He reflects back precisely what our actions have created. His gaze is not cruel, it is honest.',
  },
  {
    number: '03',
    title: 'The Crow, Vehicle of Humility',
    quote: 'Vehicle: Crow, Kak, symbol of cunning, memory, and humility',
    body: 'The crow remembers everything. So does Shani. No deed, good or bad, escapes the ledger of karma.',
  },
  {
    number: '04',
    title: 'The Cosmic Judge',
    quote: 'He ensures justice, balance, and accountability across lifetimes',
    body: "Shani's justice is not bound by a single life. He tracks the arc of the soul across births, rewarding virtue and demanding growth where needed.",
  },
  {
    number: '05',
    title: 'Slow but Certain',
    quote: 'Slow but certain, he never forgets karma',
    body: 'Saturn moves through a zodiac sign for 2.5 years. His lessons unfold over years, not weeks. That slowness is a mercy, not a punishment. It gives us time to learn.',
  },
] as const;

export default function ShaniMythologyCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 'left' | 'right') => {
    const node = scrollerRef.current;
    if (!node) return;
    const amount = direction === 'left' ? -320 : 320;
    node.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="my-12 rounded-3xl bg-blog-cream px-5 py-10 md:px-8 not-prose">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Sparkles className="mb-2 h-5 w-5 text-blog-gold" aria-hidden="true" />
          <h2 className="font-kalam text-3xl md:text-5xl font-bold text-blog-ink">
            The Story of Lord Shani
          </h2>
          <p className="mt-2 font-poppins text-sm md:text-base text-blog-ink/70">
            Lessons of justice, karma and compassion
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByCard('left')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-blog-gold/30 bg-blog-cream-soft text-blog-gold transition-colors hover:bg-blog-gold hover:text-blog-navy"
            aria-label="Scroll mythology cards left"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard('right')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-blog-gold/30 bg-blog-cream-soft text-blog-gold transition-colors hover:bg-blog-gold hover:text-blog-navy"
            aria-label="Scroll mythology cards right"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x gap-4 overflow-x-auto pb-3"
      >
        {stories.map((story) => (
          <article
            key={story.number}
            className="min-w-[280px] max-w-[320px] snap-start rounded-2xl border border-blog-gold/20 bg-blog-cream-soft p-6"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blog-gold text-blog-navy">
              <span className="font-poppins text-sm font-bold">{story.number}</span>
            </div>
            <h3 className="font-poppins text-lg font-bold text-blog-ink">
              {story.title}
            </h3>
            <p className="mt-3 font-poppins text-sm font-semibold leading-relaxed text-blog-red-warm">
              {story.quote}
            </p>
            <p className="mt-3 font-poppins text-sm leading-relaxed text-blog-ink/75">
              {story.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <span className="h-px w-16 bg-blog-gold/40" aria-hidden="true" />
        <Sun className="h-4 w-4 text-blog-gold" aria-hidden="true" />
        <span className="h-px w-16 bg-blog-gold/40" aria-hidden="true" />
      </div>
    </section>
  );
}
