import { RoughNotation } from 'react-rough-notation'

interface Props {
  children: React.ReactNode
  color?: string
  show?: boolean
}

export default function UnderlineScribble({
  children,
  color = '#C9A84C',
  show = true,
}: Props) {
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
  )
}
