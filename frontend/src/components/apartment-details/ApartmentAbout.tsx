import type { Dictionary } from '@/i18n/dictionaries'
import type { ApartmentSectionProps } from '@/data/apartment-details'

type ApartmentAboutProps = ApartmentSectionProps & {
  photos: string[]
  labels: Dictionary['app']
}

export function ApartmentAbout({ apartment, language, photos, labels }: ApartmentAboutProps) {
  return (
    <section className="apartment-section apartment-about" id="about">
      <div className="apartment-section-media">
        <img src={photos[apartment.presentation.aboutPhotoIndex] ?? apartment.image} alt={apartment.name} />
      </div>
      <div className="apartment-section-content">
        <p className="apartment-section-kicker">{labels.about}</p>
        <h2>{labels.theApartment}</h2>
        <p>{apartment.description[language]}</p>
        <dl className="apartment-facts">
          <div>
            <dt>{labels.guests}</dt>
            <dd>{apartment.details.guests[language]}</dd>
          </div>
          <div>
            <dt>{labels.bedrooms}</dt>
            <dd>{apartment.details.bedrooms[language]}</dd>
          </div>
          <div>
            <dt>{labels.beds}</dt>
            <dd>{apartment.details.beds[language]}</dd>
          </div>
          <div>
            <dt>{labels.size}</dt>
            <dd>{apartment.details.size}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

