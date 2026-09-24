export function RatingStars({ rating }: { rating: number }) {
  return <span className="rating" aria-label={`${rating} out of 5 stars`}>{'★'.repeat(Math.round(rating))}<span className="rating-dim">{'★'.repeat(5 - Math.round(rating))}</span><b>{rating.toFixed(1)}</b></span>;
}
