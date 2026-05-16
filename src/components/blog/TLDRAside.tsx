import { Sparkles } from 'lucide-react';
import { type ReactNode } from 'react';

interface TLDRAsideProps {
  children: ReactNode;
}

export default function TLDRAside({ children }: TLDRAsideProps) {
  return (
    <aside className="not-prose my-8 rounded-2xl border border-blog-gold/30 bg-blog-cream p-5 md:p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-blog-gold/20">
          <Sparkles className="h-5 w-5 text-blog-gold" aria-hidden="true" />
        </div>
        <div>
          <p className="mb-2 font-poppins text-xs font-semibold uppercase tracking-wider text-blog-gold">
            TL;DR
          </p>
          <div className="font-poppins text-sm leading-relaxed text-blog-ink/80 md:text-base">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
