import reviewsData from '../data/google-reviews.json';

/**
 * Renders the Google Reviews widget on the homepage. Data is read
 * statically from src/data/google-reviews.json at build time (regenerated
 * daily by scripts/fetch-google-reviews.mjs) so reviews are part of the
 * initial prerendered HTML — no client-side API calls, no hydration wait.
 *
 * Display requirements per Google Places API TOS that this component
 * satisfies:
 *   - "Powered by Google" brand mark visible (the coloured G badge).
 *   - Link back to the full review listing on Google (viewAllUrl CTA).
 *   - Reviewer name + review text shown as primary content.
 */

interface Review {
  id: string;
  author: string;
  authorInitial: string;
  authorPhotoUrl: string | null;
  authorProfileUrl: string | null;
  rating: number;
  date: string | null;
  relativeTime: string;
  text: string;
}

type ReviewsData = {
  aggregate: {
    averageRating: number;
    totalCount: number;
    source: string;
    lastFetched: string | null;
    viewAllUrl: string;
  };
  reviews: readonly Review[];
};

const data = reviewsData as ReviewsData;

/** Deterministic avatar colour from author name (stable across SSR and client). */
const AVATAR_PALETTE = [
  '#EA4335', // Google red
  '#4285F4', // Google blue
  '#34A853', // Google green
  '#FBBC05', // Google yellow
  '#9C27B0',
  '#00ACC1',
  '#FF6D00',
  '#1DE9B6',
] as const;

function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length];
}

function GoogleGIcon({ className = 'w-4 h-4' }: { className?: string }) {
  // Official Google G monogram — 4 brand colours.
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

function Stars({ rating, size = 'w-4 h-4' }: { rating: number; size?: string }) {
  // Render 5 stars, filling gold up to `rating`. Half-stars rounded for a
  // clean visual — matches how Google's own widget displays ratings.
  const rounded = Math.round(rating);
  return (
    <span
      className="inline-flex items-center"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`${size} ${i <= rounded ? 'text-[#FBBC05]' : 'text-gray-300'}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.955c.3.922-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.367 2.446c-.784.57-1.838-.196-1.539-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.066 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.283-3.955z" />
        </svg>
      ))}
    </span>
  );
}

interface AvatarProps {
  name: string;
  initial: string;
  photoUrl: string | null;
}

function Avatar({ name, initial, photoUrl }: AvatarProps) {
  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt=""
        aria-hidden="true"
        width="40"
        height="40"
        loading="lazy"
        referrerPolicy="no-referrer"
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
      style={{ backgroundColor: avatarColor(name) }}
    >
      {initial}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-shadow duration-300 flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        <Avatar
          name={review.author}
          initial={review.authorInitial}
          photoUrl={review.authorPhotoUrl}
        />
        <div className="min-w-0 flex-1">
          <p className="font-medium text-gray-900 truncate">{review.author}</p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <span
              className="inline-flex items-center gap-1 text-[#1a73e8]"
              title="Verified Google Review"
            >
              <GoogleGIcon className="w-3 h-3" />
              Verified Google Review
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <Stars rating={review.rating} />
        {review.relativeTime && (
          <span className="text-xs text-gray-500">{review.relativeTime}</span>
        )}
      </div>

      <blockquote className="text-sm text-gray-700 leading-relaxed line-clamp-6">
        {review.text}
      </blockquote>

      <GoogleGIcon className="absolute bottom-3 right-3 w-4 h-4 opacity-60" />
    </article>
  );
}

function FallbackCta({ viewAllUrl, totalCount }: { viewAllUrl: string; totalCount: number }) {
  return (
    <div className="max-w-xl mx-auto text-center bg-white rounded-2xl p-8 shadow-soft">
      <GoogleGIcon className="w-10 h-10 mx-auto mb-4" />
      <p className="text-lg text-gray-700 mb-6">
        Read our {totalCount}+ five-star reviews on Google.
      </p>
      <a
        href={viewAllUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:shadow-md transition-shadow"
      >
        <GoogleGIcon className="w-4 h-4" />
        See all reviews on Google
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

export default function GoogleReviewsWidget() {
  const { aggregate, reviews } = data;
  // Cap to 6 cards; the widget is visual reassurance, not exhaustive.
  const visible = reviews.slice(0, 6);

  return (
    <section
      role="region"
      aria-label="Google Reviews"
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white rounded-2xl p-6 shadow-soft">
        <div className="flex items-center gap-3">
          <GoogleGIcon className="w-8 h-8" />
          <div>
            <p className="font-heading font-semibold text-gray-900">Google Reviews</p>
            <p className="text-xs text-gray-500">
              Powered by Google Business Profile
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Stars rating={aggregate.averageRating} size="w-5 h-5" />
          <span className="font-heading font-bold text-2xl text-gray-900">
            {aggregate.averageRating.toFixed(1)}
          </span>
          <span className="text-sm text-gray-500">
            ({aggregate.totalCount} review{aggregate.totalCount === 1 ? '' : 's'})
          </span>
        </div>
      </div>

      {visible.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href={aggregate.viewAllUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:shadow-md transition-shadow"
            >
              <GoogleGIcon className="w-4 h-4" />
              See all {aggregate.totalCount} reviews on Google
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </>
      ) : (
        <FallbackCta viewAllUrl={aggregate.viewAllUrl} totalCount={aggregate.totalCount} />
      )}
    </section>
  );
}
