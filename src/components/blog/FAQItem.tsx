import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  /** Pre-rendered Lucide icon JSX element (caller supplies sizing/color). */
  icon: ReactNode;
}

export default function FAQItem({ question, answer, icon }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-blog-gold/20 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left transition-colors hover:bg-blog-gold/5"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-blog-gold/15 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <span className="w-px h-7 bg-blog-gold/30 hidden md:block" aria-hidden="true" />
          <span className="font-poppins font-semibold text-blog-ink text-base md:text-lg">
            {question}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-blog-gold transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="px-4 md:px-5 pb-4 md:pb-5 pl-16 md:pl-20">
          <p className="font-poppins text-blog-ink/75 text-sm md:text-base leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
