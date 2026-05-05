import BlogCard from './BlogCard';

interface BlogGridPost {
  slug: string;
  title: string;
  excerpt?: string;
  heroImage?: string;
  heroImageAlt?: string;
  category?: string;
  publishedAt?: string;
  readTime?: string;
}

interface BlogGridProps {
  posts: readonly BlogGridPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
        <div className="col-span-full text-center py-12 font-poppins text-blog-ink/60">
          No articles in this category yet. Check back soon.
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
