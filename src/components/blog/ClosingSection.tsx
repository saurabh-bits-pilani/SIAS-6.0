import { type ReactNode } from 'react';
import Section from './Section';
import ClosingThought from './ClosingThought';
import FAQSection, { type FAQEntry } from './FAQSection';
import FinalCTA from './FinalCTA';

interface ClosingSectionProps {
  closingTitle: string;
  closingBody: string;
  closingHighlight: string;
  faqTitle: string;
  faqs: readonly FAQEntry[];
  ctaClosingLine: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
  ctaButtonHref: string;
}

export default function ClosingSection({
  closingTitle,
  closingBody,
  closingHighlight,
  faqTitle,
  faqs,
  ctaClosingLine,
  ctaTitle,
  ctaSubtitle,
  ctaButtonText,
  ctaButtonHref,
}: ClosingSectionProps): ReactNode {
  return (
    <Section>
      <div className="space-y-8">
        <ClosingThought
          title={closingTitle}
          body={closingBody}
          highlight={closingHighlight}
        />
        <FAQSection title={faqTitle} items={faqs} />
        <FinalCTA
          title={ctaTitle}
          subtitle={ctaSubtitle}
          buttonText={ctaButtonText}
          buttonHref={ctaButtonHref}
          closingLine={ctaClosingLine}
        />
      </div>
    </Section>
  );
}
