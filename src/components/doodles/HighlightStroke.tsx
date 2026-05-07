import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { annotate } from 'rough-notation';

type HighlightStrokeProps = {
  children: ReactNode;
  color?: string;
  show?: boolean;
};

export default function HighlightStroke({
  children,
  color = '#C9A84C',
  show = true,
}: HighlightStrokeProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const annotation = annotate(ref.current, {
      type: 'highlight',
      color,
      animationDuration: 650,
      padding: 2,
      multiline: true,
    });

    if (show) {
      annotation.show();
    }

    return () => annotation.remove();
  }, [color, show]);

  return (
    <span ref={ref} className="inline-block">
      {children}
    </span>
  );
}
