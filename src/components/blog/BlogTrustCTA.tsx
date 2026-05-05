import { Link } from 'react-router-dom';
import { Flower2, ArrowRight, User } from 'lucide-react';

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
    <div className="bg-blog-cream-soft border border-blog-gold/30 rounded-2xl p-5 md:p-6 my-12 md:my-16 flex flex-col md:flex-row items-center gap-5 md:gap-8 relative overflow-hidden">
      <Flower2
        className="absolute top-3 right-3 w-12 h-12 text-blog-gold/10 pointer-events-none"
        aria-hidden="true"
      />
      <div className="flex items-start gap-4 flex-1">
        <div className="w-14 h-14 flex-shrink-0 bg-blog-gold rounded-full flex items-center justify-center">
          <Flower2 className="w-7 h-7 text-white" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-poppins font-bold text-blog-ink text-lg md:text-xl mb-1">{title}</h3>
          <p className="font-poppins text-blog-ink/75 text-sm md:text-base leading-relaxed">
            {body}
          </p>
        </div>
      </div>
      <Link
        to={buttonHref}
        className="inline-flex items-center gap-2 bg-blog-gold hover:bg-blog-gold-bright text-blog-navy px-6 py-3 rounded-full font-semibold font-poppins text-sm md:text-base transition-colors flex-shrink-0"
      >
        {buttonText}
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-blog-gold/30 border-2 border-blog-cream-soft flex items-center justify-center">
            <User className="w-4 h-4 text-blog-gold" aria-hidden="true" />
          </div>
          <div className="w-8 h-8 rounded-full bg-blog-gold/30 border-2 border-blog-cream-soft flex items-center justify-center">
            <User className="w-4 h-4 text-blog-gold" aria-hidden="true" />
          </div>
          <div className="w-8 h-8 rounded-full bg-blog-gold/30 border-2 border-blog-cream-soft flex items-center justify-center">
            <User className="w-4 h-4 text-blog-gold" aria-hidden="true" />
          </div>
        </div>
        <span className="font-poppins text-blog-ink/70 text-xs md:text-sm">{trustText}</span>
      </div>
    </div>
  );
}
