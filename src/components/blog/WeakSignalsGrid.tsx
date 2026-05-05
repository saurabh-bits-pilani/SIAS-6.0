import { type LucideIcon } from 'lucide-react';

export interface WeakSignalItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface WeakSignalsGridProps {
  title: string;
  items: readonly WeakSignalItem[];
}

export default function WeakSignalsGrid({ title, items }: WeakSignalsGridProps) {
  return (
    <div className="my-8 not-prose">
      <h3 className="font-caveat font-bold text-2xl text-blog-ink mb-6 text-center">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-blog-cream rounded-2xl border border-blog-gold/30 p-5 text-center"
            >
              <div className="w-12 h-12 mx-auto bg-blog-gold/20 rounded-full flex items-center justify-center mb-3">
                <Icon className="w-6 h-6 text-blog-red-warm" aria-hidden="true" />
              </div>
              <p className="font-poppins font-semibold text-blog-ink text-base mb-2">
                {item.title}
              </p>
              <p className="font-poppins text-sm text-blog-ink/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
