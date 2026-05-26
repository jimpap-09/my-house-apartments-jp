import type { Dictionary } from '@/i18n/dictionaries'
import type { ApartmentSectionProps } from '@/data/apartment-details'

type ApartmentReviewsProps = ApartmentSectionProps & {
  labels: Dictionary['app']
}

export function ApartmentReviews({ apartment, labels }: ApartmentReviewsProps) {
  const rating = 4.9
  const reviewsCount = 34
  const highlight = 'Excellent stay with a welcoming host and perfect location.'

  return (
    <section className="grid gap-6 rounded-[28px] bg-white/90 p-8 shadow-soft" id="reviews">
      <div className="grid gap-3 text-center">
        <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">{labels.reviews}</p>
        <h2 className="text-3xl font-serif text-charcoal">{labels.whatGuestsSay}</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="rounded-[28px] border border-border bg-slate-50 p-8 text-center">
          <strong className="block text-5xl font-serif text-charcoal">{rating.toFixed(1)}</strong>
          <span className="mt-2 block text-sm uppercase tracking-[0.24em] text-muted-foreground">
            {reviewsCount} reviews
          </span>
        </div>

        <div className="grid gap-4 rounded-[28px] border border-border bg-slate-50 p-8">
          <p className="text-base leading-7 text-charcoal">{highlight}</p>
          <small className="text-sm text-muted-foreground">Verified guest review</small>
        </div>
      </div>
    </section>
  )
}

