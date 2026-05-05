import { Link } from 'react-router-dom';
import { Star, Calendar, Clock, ArrowRight } from 'lucide-react';

interface FeaturedPost {
  slug: string;
  title: string;
  excerpt?: string;
  heroImage?: string;
  heroImageAlt?: string;
  category?: string;
  publishedAt?: string;
  readTime?: string;
}

interface BlogFeaturedPostProps {
  post: FeaturedPost;
}

function formatDate(value?: string): string {
  if (!value) return '';
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[d.getUTCMonth()];
  const day = String(d.getUTCDate()).padStart(2, '0');
  const year = d.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}

export default function BlogFeaturedPost({ post }: BlogFeaturedPostProps) {
  const category = post.category || 'Vedic Astrology';
  const readTime = post.readTime || '8 min read';
  const publishedAt = formatDate(post.publishedAt);

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="block group relative bg-blog-cream-soft rounded-2xl overflow-hidden border border-blog-gold/20 hover:border-blog-gold/50 transition-colors"
    >
      <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 bg-blog-gold/95 backdrop-blur-sm rounded-full px-3 py-1">
        <Star className="w-3.5 h-3.5 text-blog-navy" aria-hidden="true" />
        <span className="font-poppins text-blog-navy text-xs font-bold uppercase tracking-wide">
          Featured
        </span>
      </div>
      <div className="aspect-[16/10] w-full overflow-hidden bg-blog-navy">
        {post.heroImage && (
          <img
            src={post.heroImage}
            alt={post.heroImageAlt || post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
      </div>
      <div className="p-6 md:p-7">
        <span className="inline-flex items-center bg-blog-cream border border-blog-gold/40 rounded-full px-3 py-1 mb-3 font-poppins text-blog-gold text-xs font-semibold">
          {category}
        </span>
        <h2 className="font-poppins font-bold text-blog-ink text-xl md:text-2xl leading-tight mb-3 group-hover:text-blog-navy transition-colors">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="font-poppins text-blog-ink/70 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center gap-4 text-blog-ink/60 text-xs mb-5">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{publishedAt}</span>
          </span>
          <span className="text-blog-ink/40" aria-hidden="true">•</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{readTime}</span>
          </span>
        </div>
        <span className="inline-flex items-center gap-2 bg-blog-gold hover:bg-blog-gold-bright text-blog-navy px-5 py-2.5 rounded-full font-semibold font-poppins text-sm transition-colors">
          Read Full Article
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
