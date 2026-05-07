export default function CornerSpark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 2 L17.5 14 L28 8 L18.5 16 L28 24 L17.5 18 L16 30 L14.5 18 L4 24 L13.5 16 L4 8 L14.5 14 Z"
        fill="#C9A84C"
        opacity="0.8"
      />
    </svg>
  )
}
