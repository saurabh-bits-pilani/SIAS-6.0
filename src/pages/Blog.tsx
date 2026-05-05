import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Star, Sparkles, Users, Sun } from 'lucide-react';
import blogManifest from '../data/blog-manifest.json';
import BlogIndexHero from '../components/blog/BlogIndexHero';
import BlogCategoryFilter from '../components/blog/BlogCategoryFilter';
import BlogGrid from '../components/blog/BlogGrid';
import BlogTrustCTA from '../components/blog/BlogTrustCTA';

const FEATURE_PILLS = [
  { icon: BookOpen, label: 'Authentic Knowledge' },
  { icon: Star, label: 'Practical Guidance' },
  { icon: Sparkles, label: 'Spiritual Growth' },
  { icon: Users, label: 'Community Wisdom' }
];

const CATEGORIES = [
  'All Articles',
  'Vedic Astrology',
  'Spirituality',
  'Panchang & Muhurat',
  'Remedies',
  'Lifestyle'
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All Articles');

  const sortedPosts = useMemo(() => {
    const posts = (blogManifest as any).posts || [];
    return [...posts].sort((a: any, b: any) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, []);

  const featuredPost = sortedPosts[0];

  const remainingPosts = sortedPosts.length === 1
    ? sortedPosts
    : sortedPosts.slice(1);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All Articles') return remainingPosts;
    return remainingPosts.filter((p: any) => p.category === activeCategory);
  }, [activeCategory, remainingPosts]);

  if (!featuredPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-poppins">
        <h1 className="text-3xl font-bold text-blog-ink mb-3">Blog</h1>
        <p className="text-blog-ink/70">No posts published yet. Check back soon.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog | Soul Infinity</title>
        <meta name="description" content="Practical guides, timeless knowledge, and spiritual insights from Soul Infinity. Learn about Vedic astrology, spirituality, panchang, and remedies." />
        <link rel="canonical" href="https://www.soulinfinity.space/blog" />
        <meta property="og:title" content="Blog | Soul Infinity" />
        <meta property="og:description" content="Vedic Wisdom for Modern Seekers." />
        <meta property="og:image" content={featuredPost.heroImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.soulinfinity.space/blog" />
      </Helmet>

      <BlogIndexHero
        eyebrow="Insights. Wisdom. Guidance."
        titleLine1="Vedic Wisdom for"
        titleLine2="Modern Seekers"
        body="Practical guides, timeless knowledge, and spiritual insights to help you navigate life with clarity and purpose."
        features={FEATURE_PILLS}
        featuredPost={featuredPost}
      />

      <section className="max-w-7xl mx-auto px-4 mt-12 md:mt-16">
        <div className="text-center mb-2">
          <Sparkles className="w-4 h-4 mx-auto text-blog-gold mb-2" />
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-5 h-5 text-blog-gold" />
            <h2 className="font-caveat italic text-3xl md:text-5xl text-blog-gold">
              Latest Articles
            </h2>
            <Sparkles className="w-5 h-5 text-blog-gold" />
          </div>
          <p className="font-poppins text-blog-ink/70 text-sm md:text-base mt-2">
            Dive deeper into the world of spiritual wisdom and cosmic insights
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16 bg-blog-gold/40" />
            <Sun className="w-4 h-4 text-blog-gold" />
            <div className="h-px w-16 bg-blog-gold/40" />
          </div>
        </div>

        <BlogCategoryFilter
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        <BlogGrid posts={filteredPosts} />

        <BlogTrustCTA
          title="Looking for personalized guidance?"
          body="Book a consultation with Saurabh Jain and get clarity on your life's journey."
          buttonText="Book Your Consultation"
          buttonHref="/services/vedic-astrology"
          trustText="Trusted by 500+ seekers"
        />
      </section>
    </>
  );
}
