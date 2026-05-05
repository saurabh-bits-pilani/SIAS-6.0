import { type LucideIcon } from 'lucide-react';

interface InsightCalloutProps {
  icon: LucideIcon;
  text: string;
}

export default function InsightCallout({ icon: Icon, text }: InsightCalloutProps) {
  return (
    <div className="bg-blog-cream-soft border-l-4 border-blog-gold rounded-r-2xl p-5 my-6 flex items-start gap-4 not-prose">
      <Icon className="w-10 h-10 flex-shrink-0 text-blog-red-warm" aria-hidden="true" />
      <p className="font-poppins text-blog-ink leading-relaxed">{text}</p>
    </div>
  );
}
