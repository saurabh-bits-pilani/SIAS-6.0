import type { ReactNode } from 'react';
import { RoughNotation } from 'react-rough-notation';

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
  return (
    <RoughNotation
      type="circle"
      color={color}
      show={show}
      strokeWidth={2}
      animationDelay={500}
    >
      {children}
    </RoughNotation>
  );
}
