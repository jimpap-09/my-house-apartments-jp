import type { ApartmentSectionProps } from '@/data/apartment-details'
import type { Dictionary } from '@/i18n/dictionaries'

type ApartmentOverviewProps = ApartmentSectionProps & {
  labels: Dictionary['app']
}

export function ApartmentOverview({ apartment, language, labels }: ApartmentOverviewProps) {
  return (
    <section className="apartment-overview">
      <div>
        <p>{apartment.propertyType[language]}</p>
        <h1>{apartment.name}</h1>
        <span>{apartment.location[language]}</span>
      </div>

      <div className="apartment-overview-cards">
        <a href="#reviews">
          <strong>{apartment.rating}</strong>
          <span>{apartment.ratingText[language]}</span>
          <small>{labels.reviewPreview}</small>
        </a>
        <a href="#about">
          <i aria-hidden="true">{apartment.host.name.charAt(0)}</i>
          <strong>{apartment.host.role[language]}</strong>
          <small>{labels.hostedBy}</small>
        </a>
      </div>

      <div className="apartment-overview-highlights">
        {apartment.amenities.slice(0, 4).map((amenity) => (
          <span key={amenity.en}>{amenity[language]}</span>
        ))}
      </div>
    </section>
  )
}
