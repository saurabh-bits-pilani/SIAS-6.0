import type { ReactNode } from 'react';
import { RoughNotation } from 'react-rough-notation';

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
  return (
    <RoughNotation type="highlight" color={color} show={show} animationDelay={300}>
      {children}
    </RoughNotation>
  );
}
