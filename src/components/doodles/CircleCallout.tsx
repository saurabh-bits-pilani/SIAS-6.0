import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { annotate } from 'rough-notation';

type CircleCalloutProps = {
  children: ReactNode;
  color?: string;
  show?: boolean;
};

export default function CircleCallout({
  children,
  color = '#C9A84C',
  show = true,
}: CircleCalloutProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const annotation = annotate(ref.current, {
      type: 'circle',
      color,
      animationDuration: 700,
      padding: 5,
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
