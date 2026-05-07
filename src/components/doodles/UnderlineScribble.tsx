import type { ReactNode } from 'react';
import { RoughNotation } from 'react-rough-notation';

type UnderlineScribbleProps = {
  children: ReactNode;
  color?: string;
  show?: boolean;
};

export default function UnderlineScribble({
  children,
  color = '#C9A84C',
  show = true,
}: UnderlineScribbleProps) {
  return (
    <RoughNotation
      type="underline"
      color={color}
      show={show}
      strokeWidth={2}
      animationDelay={400}
    >
      {children}
    </RoughNotation>
  );
}
