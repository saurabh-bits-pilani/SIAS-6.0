import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogCardPost {
  slug: string;
  href?: string;
  title: string;
  excerpt?: string;
  heroImage?: string;
  heroImageAlt?: string;
  category?: string;
  publishedAt?: string;
  readTime?: string;
  imagePosition?: string;
}

interface BlogCardProps {
  post: BlogCardPost;
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

export default function BlogCard({ post }: BlogCardProps) {
  const category = post.category || 'Vedic Astrology';
  const readTime = post.readTime || '8 min read';
  const publishedAt = formatDate(post.publishedAt);
  const href = post.href || `/blog/${post.slug}`;

  return (
    <Link
      to={href}
      className="group block bg-blog-cream-soft rounded-2xl overflow-hidden border border-blog-gold/20 hover:border-blog-gold/50 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="h-[180px] sm:h-[200px] md:h-[220px] w-full overflow-hidden bg-blog-navy relative">
        {post.heroImage && (
          <img
            src={post.heroImage}
            alt={post.heroImageAlt || post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: post.imagePosition || 'center center' }}
            loading="lazy"
          />
        )}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: '40%', background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}
          aria-hidden="true"
        />
        <span
          className="absolute top-3 left-3 z-10 inline-flex items-center backdrop-blur-sm rounded-full font-poppins text-white text-[11px] font-semibold"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)', border: '1px solid rgba(255,255,255,0.2)', padding: '4px 12px' }}
        >
          {category}
        </span>
      </div>
      <div className="p-4 md:p-5">
        <div className="flex items-center gap-2 text-blog-ink/60 text-xs mb-2">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3 h-3" aria-hidden="true" />
            <span>{publishedAt}</span>
          </span>
          <span className="text-blog-ink/40" aria-hidden="true">•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3" aria-hidden="true" />
            <span>{readTime}</span>
          </span>
        </div>
        <h3 className="font-poppins font-bold text-blog-ink text-[clamp(15px,2vw,18px)] leading-[1.4] mb-2 group-hover:text-blog-navy transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="font-poppins text-blog-ink/70 text-sm md:text-[15px] leading-[1.6] mb-3 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <span className="inline-flex items-center gap-1 text-blog-gold font-semibold text-sm font-poppins">
          Read More
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
