import type { Dictionary } from '@/i18n/dictionaries'
import type { ApartmentSectionProps } from '@/data/apartment-details'

type ApartmentAmenitiesProps = ApartmentSectionProps & {
  labels: Dictionary['app']
}

export function ApartmentAmenities({ apartment, language, labels }: ApartmentAmenitiesProps) {
  return (
    <section className="apartment-section apartment-amenities-section" id="amenities">
      <div className="apartment-section-heading">
        <p className="apartment-section-kicker">{labels.amenities}</p>
        <h2>{labels.whatsIncluded}</h2>
      </div>
      <div className="apartment-amenities-grid">
        {apartment.amenities.map((amenity) => (
          <div key={amenity.en}>{amenity[language]}</div>
        ))}
      </div>
    </section>
  )
}

