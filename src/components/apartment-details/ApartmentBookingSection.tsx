import type { Dictionary } from '@/i18n/dictionaries'
import type { ApartmentSectionProps } from '@/data/apartment-details'

type ApartmentBookingSectionProps = ApartmentSectionProps & {
  labels: Dictionary['app']
}

export function ApartmentBookingSection({
  apartment,
  language,
  labels,
}: ApartmentBookingSectionProps) {
  return (
    <section className="apartment-section apartment-booking-section" id="booking">
      <p className="apartment-section-kicker">{labels.booking}</p>
      <h2>{labels.readyToPlan}</h2>
      <p>{apartment.shortDescription[language]}</p>
      <a href="mailto:johnpap26@gmail.com">{labels.bookingCta}</a>
    </section>
  )
}
