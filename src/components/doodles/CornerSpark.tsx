type CornerSparkProps = {
  className?: string;
};

export default function CornerSpark({ className = '' }: CornerSparkProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      fill="none"
    >
      <path
        d="M20 4v9M20 27v9M4 20h9M27 20h9M9 9l6.5 6.5M24.5 24.5 31 31M31 9l-6.5 6.5M15.5 24.5 9 31"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.92"
      />
      <circle cx="20" cy="20" r="3.2" fill="currentColor" opacity="0.88" />
    </svg>
  );
}
