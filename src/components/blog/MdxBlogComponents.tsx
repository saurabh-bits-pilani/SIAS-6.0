/**
 * Custom JSX components made available to blog MDX files via MDXProvider.
 *
 * Usage in MDX:
 *   <WeakSignalsGrid title="..." items={[{icon: MapPin, title: "...", description: "..."}]} />
 *
 * Lucide icons are imported INSIDE the MDX file (e.g.
 *   `import { MapPin } from 'lucide-react'` at the top of the .mdx) so each
 *   post chooses its own icon vocabulary. Components stay icon-agnostic.
 */

import WeakSignalsGrid from './WeakSignalsGrid';
import AuthorCallout from './AuthorCallout';
import SanskritVerseCard from './SanskritVerseCard';
import InsightCallout from './InsightCallout';
import WhatFollowsCards from './WhatFollowsCards';
import QuestionsToAsk from './QuestionsToAsk';
import ClosingSection from './ClosingSection';
import CredentialsSection from './CredentialsSection';
import RedFlagsSection from './RedFlagsSection';

export const mdxBlogComponents = {
  WeakSignalsGrid,
  AuthorCallout,
  SanskritVerseCard,
  InsightCallout,
  WhatFollowsCards,
  QuestionsToAsk,
  ClosingSection,
  CredentialsSection,
  RedFlagsSection,
};
