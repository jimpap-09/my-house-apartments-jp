import type { Dictionary } from '@/i18n/dictionaries'
import type { ApartmentSectionProps } from '@/data/apartment-details'

type ApartmentLocationProps = ApartmentSectionProps & {
  labels: Dictionary['app']
}

export function ApartmentLocation({ apartment, language, labels }: ApartmentLocationProps) {
  return (
    <section className="apartment-section apartment-location-section" id="location">
      <div className="apartment-section-copy">
        <p className="eyebrow">{labels.location}</p>
        <h2>{apartment.map.address[language]}</h2>
        <p>{apartment.distanceFromCenter[language]}</p>
        <a href={apartment.map.mapsUrl} target="_blank" rel="noreferrer">
          {labels.openInMaps}
        </a>
      </div>
      <iframe
        src={apartment.map.embedUrl}
        title={`${apartment.name} map`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  )
}
