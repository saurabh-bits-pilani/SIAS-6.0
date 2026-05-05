import { Sparkles, Sun, Flower2, type LucideIcon } from 'lucide-react';
import BlogFeaturedPost from './BlogFeaturedPost';

interface FeaturePill {
  icon: LucideIcon;
  label: string;
}

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

interface BlogIndexHeroProps {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  body: string;
  features: readonly FeaturePill[];
  featuredPost: FeaturedPost;
}

export default function BlogIndexHero({
  eyebrow,
  titleLine1,
  titleLine2,
  body,
  features,
  featuredPost,
}: BlogIndexHeroProps) {
  return (
    <section className="bg-blog-navy text-blog-cream py-12 md:py-20 relative overflow-hidden">
      <Sun
        className="w-40 h-40 absolute top-8 right-8 text-blog-gold/10 pointer-events-none"
        aria-hidden="true"
      />
      <Flower2
        className="w-32 h-32 absolute top-12 left-12 text-blog-gold/10 pointer-events-none"
        aria-hidden="true"
      />
      <Sparkles
        className="w-3 h-3 text-blog-gold/40 absolute top-1/4 left-1/3 pointer-events-none"
        aria-hidden="true"
      />
      <Sparkles
        className="w-3 h-3 text-blog-gold/40 absolute top-3/4 right-1/4 pointer-events-none"
        aria-hidden="true"
      />
      <Sparkles
        className="w-3 h-3 text-blog-gold/40 absolute top-1/2 left-1/4 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
        <div>
          <span className="inline-flex items-center gap-2 mb-4 bg-blog-gold/15 border border-blog-gold/30 rounded-full px-4 py-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blog-gold" aria-hidden="true" />
            <span className="font-poppins text-blog-gold text-sm font-medium">{eyebrow}</span>
          </span>
          <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-blog-cream leading-tight">
            {titleLine1}
            <span className="font-caveat italic text-4xl md:text-6xl lg:text-7xl text-blog-gold leading-tight block mt-1">
              {titleLine2}
            </span>
          </h1>
          <p className="font-poppins text-blog-cream/80 text-base md:text-lg leading-relaxed mt-5 max-w-xl">
            {body}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.label} className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 bg-blog-gold/15 border border-blog-gold/30 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blog-gold" aria-hidden="true" />
                  </div>
                  <span className="font-poppins text-blog-cream/85 text-xs md:text-sm leading-tight">
                    {feature.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <BlogFeaturedPost post={featuredPost} />
        </div>
      </div>
    </section>
  );
}
