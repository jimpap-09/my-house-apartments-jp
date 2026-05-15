import type { Dictionary } from '@/i18n/dictionaries'
import type { ApartmentSectionProps } from '@/data/apartment-details'

type ApartmentReviewsProps = ApartmentSectionProps & {
  labels: Dictionary['app']
}

export function ApartmentReviews({ apartment, language, labels }: ApartmentReviewsProps) {
  return (
    <section className="apartment-section apartment-reviews-section" id="reviews">
      <div className="apartment-section-heading">
        <p className="eyebrow">{labels.reviews}</p>
        <h2>{labels.whatGuestsSay}</h2>
      </div>
      <div className="apartment-review-card">
        <div>
          <strong>{apartment.rating}</strong>
          <span>{apartment.ratingText[language]}</span>
        </div>
        <p>{apartment.reviewHighlight[language]}</p>
        <small>{apartment.reviewer}</small>
      </div>
    </section>
  )
}
