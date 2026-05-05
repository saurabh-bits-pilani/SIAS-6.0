import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogCardPost {
  slug: string;
  title: string;
  excerpt?: string;
  heroImage?: string;
  heroImageAlt?: string;
  category?: string;
  publishedAt?: string;
  readTime?: string;
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

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block bg-blog-cream-soft rounded-2xl overflow-hidden border border-blog-gold/20 hover:border-blog-gold/50 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="aspect-[16/10] w-full overflow-hidden bg-blog-navy relative">
        {post.heroImage && (
          <img
            src={post.heroImage}
            alt={post.heroImageAlt || post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
        <span className="absolute top-3 left-3 inline-flex items-center bg-blog-cream/95 backdrop-blur-sm rounded-full px-3 py-1 font-poppins text-blog-gold text-xs font-semibold">
          {category}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-blog-ink/60 text-xs mb-3">
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
        <h3 className="font-poppins font-bold text-blog-ink text-base md:text-lg leading-snug mb-2 group-hover:text-blog-navy transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="font-poppins text-blog-ink/70 text-sm leading-relaxed mb-4 line-clamp-3">
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
