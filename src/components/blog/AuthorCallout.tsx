import { Landmark } from 'lucide-react';

interface AuthorCalloutProps {
  title: string;
  /** Body text. Use the literal token `{LINK}` to mark the position where
   *  the link anchor should be inserted. The token is split out and replaced
   *  with an inline anchor at render time. */
  body: string;
  linkText: string;
  linkUrl: string;
}

const LINK_TOKEN = '{LINK}';

export default function AuthorCallout({
  title,
  body,
  linkText,
  linkUrl,
}: AuthorCalloutProps) {
  const hasToken = body.includes(LINK_TOKEN);
  const [before, after] = hasToken ? body.split(LINK_TOKEN) : [body, ''];

  return (
    <div className="bg-blog-navy rounded-2xl p-6 md:p-8 my-8 relative overflow-hidden not-prose">
      <Landmark
        className="absolute top-4 left-4 w-32 h-32 text-blog-gold opacity-10 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10">
        <p className="text-blog-gold/80 text-xs uppercase tracking-wider font-semibold mb-2">
          About the Author
        </p>
        <h3 className="font-caveat font-bold text-3xl md:text-4xl text-blog-cream mb-4">
          {title}
        </h3>
        <p className="text-blog-cream/80 font-poppins leading-relaxed text-base">
          {before}
          {hasToken && (
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blog-gold underline underline-offset-2 hover:text-blog-gold-bright"
            >
              {linkText}
            </a>
          )}
          {after}
        </p>
      </div>
    </div>
  );
}
