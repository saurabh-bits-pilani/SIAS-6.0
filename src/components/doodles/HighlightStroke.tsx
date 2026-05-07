import { RoughNotation } from 'react-rough-notation'

interface Props {
  children: React.ReactNode
  color?: string
  show?: boolean
}

export default function HighlightStroke({
  children,
  color = '#C9A84C',
  show = true,
}: Props) {
  return (
    <RoughNotation type="highlight" color={color} show={show} animationDelay={300}>
      {children}
    </RoughNotation>
  )
}
