import { Link } from 'react-router-dom';
import { ArrowRight, Flower2, User } from 'lucide-react';

interface BlogTrustCTAProps {
  title: string;
  body: string;
  buttonText: string;
  buttonHref: string;
  trustText: string;
}

export default function BlogTrustCTA({
  title,
  body,
  buttonText,
  buttonHref,
  trustText,
}: BlogTrustCTAProps) {
  return (
    <div className="not-prose relative my-12 flex flex-col items-start gap-6 overflow-hidden rounded-2xl bg-blog-navy p-6 md:my-16 md:flex-row md:items-center md:p-8">
      <Flower2
        className="absolute top-3 right-3 h-12 w-12 text-blog-gold/10 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10 flex-1">
        <h3 className="mb-3 font-caveat text-3xl font-bold text-blog-gold md:text-4xl">
          {title}
        </h3>
        <p className="mb-5 max-w-3xl font-poppins text-sm leading-relaxed text-white/80 md:text-base">
          {body}
        </p>
        <Link
          to={buttonHref}
          className="inline-flex items-center gap-2 rounded-full bg-blog-gold px-6 py-3 font-poppins text-sm font-semibold text-blog-navy transition-colors hover:bg-blog-gold-bright"
        >
          {buttonText}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      {trustText && (
        <div className="relative z-10 w-full rounded-2xl border border-blog-gold/20 bg-white/5 p-4 md:w-auto md:min-w-[220px]">
          <div className="mb-3 flex -space-x-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-blog-navy bg-blog-gold/25">
              <User className="h-4 w-4 text-blog-gold" aria-hidden="true" />
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-blog-navy bg-blog-gold/25">
              <User className="h-4 w-4 text-blog-gold" aria-hidden="true" />
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-blog-navy bg-blog-gold/25">
              <User className="h-4 w-4 text-blog-gold" aria-hidden="true" />
            </div>
          </div>
          <p className="font-poppins text-xs font-semibold uppercase tracking-wider text-blog-gold/80">
            {trustText}
          </p>
        </div>
      )}
    </div>
  );
}
