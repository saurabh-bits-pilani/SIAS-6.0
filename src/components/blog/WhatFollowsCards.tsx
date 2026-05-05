import { type LucideIcon } from 'lucide-react';

export interface WhatFollowsItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface WhatFollowsCardsProps {
  title: string;
  items: readonly WhatFollowsItem[];
}

export default function WhatFollowsCards({ title, items }: WhatFollowsCardsProps) {
  return (
    <div className="my-10 not-prose">
      <h3 className="font-caveat font-bold text-3xl text-blog-ink mb-6 text-center">
        <span className="inline-block border-b-2 border-blog-gold pb-1">{title}</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-blog-navy rounded-2xl p-5 text-center"
            >
              <div className="w-14 h-14 mx-auto bg-blog-gold/20 rounded-full flex items-center justify-center mb-3">
                <Icon className="w-7 h-7 text-blog-gold" aria-hidden="true" />
              </div>
              <p className="font-poppins font-semibold text-blog-cream text-sm mb-2">
                {item.title}
              </p>
              <p className="font-poppins text-xs text-blog-cream/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
