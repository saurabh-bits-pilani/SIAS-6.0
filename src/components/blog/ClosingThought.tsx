import { Sparkles, Flower2, Flame } from 'lucide-react';

interface ClosingThoughtProps {
  title?: string;
  body: string;
  highlight: string;
}

export default function ClosingThought({
  title = 'A Closing Thought',
  body,
  highlight,
}: ClosingThoughtProps) {
  return (
    <div className="bg-blog-cream-soft border border-blog-gold/40 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden not-prose">
      <Flower2
        className="absolute right-6 bottom-6 w-24 h-24 text-blog-gold/15 pointer-events-none"
        aria-hidden="true"
      />
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <Sparkles className="w-5 h-5 text-blog-gold" aria-hidden="true" />
        <h2 className="font-kalam font-bold text-2xl md:text-3xl text-blog-ink">{title}</h2>
      </div>
      <div className="flex items-start gap-5 md:gap-8 relative z-10">
        <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-blog-gold/15 rounded-full flex items-center justify-center">
          <Flame className="w-10 h-10 text-blog-gold" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <p className="font-poppins text-blog-ink/85 leading-relaxed text-base md:text-lg">{body}</p>
          <p className="mt-4 font-poppins text-blog-gold font-semibold leading-relaxed text-base md:text-lg">
            {highlight}
          </p>
        </div>
      </div>
    </div>
  );
}
