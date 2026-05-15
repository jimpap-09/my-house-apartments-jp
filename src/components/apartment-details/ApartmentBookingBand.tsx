import type { Dictionary } from '@/i18n/dictionaries'
import type { ApartmentSectionProps } from '@/data/apartment-details'

type ApartmentBookingBandProps = ApartmentSectionProps & {
  labels: Dictionary['app']
}

export function ApartmentBookingBand({ apartment, language, labels }: ApartmentBookingBandProps) {
  return (
    <section className="apartment-booking-band" id="booking">
      <p className="eyebrow">{labels.booking}</p>
      <h2>{labels.readyToPlan}</h2>
      <p>{apartment.shortDescription[language]}</p>
      <a href="mailto:hello@myhouseapartments.example">{labels.bookingCta}</a>
    </section>
  )
}
