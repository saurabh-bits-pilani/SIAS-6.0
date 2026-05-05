import { type ReactNode } from 'react';
import { Sparkles, Sun } from 'lucide-react';
import FAQItem from './FAQItem';

export interface FAQEntry {
  question: string;
  answer: string;
  icon: ReactNode;
}

interface FAQSectionProps {
  title?: string;
  items: readonly FAQEntry[];
}

export default function FAQSection({
  title = 'Frequently Asked Questions',
  items,
}: FAQSectionProps) {
  return (
    <div className="mt-12 not-prose">
      <div className="text-center">
        <Sparkles className="w-4 h-4 mx-auto text-blog-gold mb-2" aria-hidden="true" />
        <div className="flex items-center justify-center gap-3 mb-1">
          <Sparkles className="w-5 h-5 text-blog-gold" aria-hidden="true" />
          <h2 className="font-poppins font-bold text-3xl md:text-5xl text-blog-ink text-center">
            {title}
          </h2>
          <Sparkles className="w-5 h-5 text-blog-gold" aria-hidden="true" />
        </div>
        <div className="flex items-center justify-center gap-4 mt-3 mb-6">
          <span className="h-px w-16 bg-blog-gold/40" aria-hidden="true" />
          <Sun className="w-4 h-4 text-blog-gold" aria-hidden="true" />
          <span className="h-px w-16 bg-blog-gold/40" aria-hidden="true" />
        </div>
      </div>
      <div className="border border-blog-gold/30 rounded-2xl overflow-hidden bg-blog-cream-soft">
        {items.map((item) => (
          <FAQItem
            key={item.question}
            question={item.question}
            answer={item.answer}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
}
