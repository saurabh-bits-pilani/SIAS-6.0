interface SanskritVerseCardProps {
  /** Devanagari shloka text. Multi-line allowed via `\n`; rendered as
   *  separate centered <div>s so each line wraps independently. */
  sanskrit: string;
  /** IAST transliteration. */
  iast: string;
  /** English translation. */
  translation: string;
}

export default function SanskritVerseCard({
  sanskrit,
  iast,
  translation,
}: SanskritVerseCardProps) {
  const lines = sanskrit.split('\n');

  return (
    <div className="bg-blog-cream-soft border border-blog-gold/40 rounded-2xl p-6 md:p-8 my-6 relative not-prose">
      {/* Decorative Om symbol, top-right, low opacity. */}
      <div
        className="absolute top-4 right-5 font-devanagari text-6xl text-blog-gold opacity-15 pointer-events-none select-none leading-none"
        aria-hidden="true"
      >
        ॐ
      </div>
      <div className="relative z-10">
        <div className="font-devanagari text-blog-ink text-xl md:text-2xl leading-relaxed mb-4 text-center">
          {lines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
        <p className="font-poppins italic text-blog-ink/70 text-sm md:text-base text-center mb-3">
          {iast}
        </p>
        <p className="font-poppins text-blog-ink/80 text-sm md:text-base text-center leading-relaxed">
          {translation}
        </p>
      </div>
    </div>
  );
}
