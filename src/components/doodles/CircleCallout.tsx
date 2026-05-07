import { RoughNotation } from 'react-rough-notation'

interface Props {
  children: React.ReactNode
  color?: string
  show?: boolean
}

export default function CircleCallout({
  children,
  color = '#C9A84C',
  show = true,
}: Props) {
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
  )
}
