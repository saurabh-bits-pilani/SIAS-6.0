interface BlogCategoryFilterProps {
  categories: readonly string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export default function BlogCategoryFilter({
  categories,
  activeCategory,
  onSelect,
}: BlogCategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 my-8">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        const className = isActive
          ? 'px-5 py-2 rounded-full font-poppins text-sm font-semibold transition-colors bg-blog-navy text-blog-cream'
          : 'px-5 py-2 rounded-full font-poppins text-sm font-semibold transition-colors bg-blog-cream-soft border border-blog-gold/30 text-blog-ink hover:border-blog-gold/60';
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            className={className}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
