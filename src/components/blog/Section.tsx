import { type ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
}

export default function Section({ children }: SectionProps) {
  return <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">{children}</section>;
}
