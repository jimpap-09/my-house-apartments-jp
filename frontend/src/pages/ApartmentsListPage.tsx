import { Link } from 'react-router-dom'
import { MapPin, Star } from 'lucide-react'
import { apartments } from '../data/apartments'
import { useI18n } from '../i18n/LanguageContext'

export function ApartmentsListPage() {
  const { language, t } = useI18n()

  return (
    <section className="list-page">
      <div className="page-intro home-list-intro">
        <p className="eyebrow">{t.app.availableStays}</p>
        <h2>{t.app.introTitle}</h2>
        <p>{t.app.introText}</p>
      </div>

      <div className="apartment-list">
        {apartments.map((apartment) => (
          <Link className="apartment-card ken-burns" to={`/apartments/${apartment.id}`} key={apartment.id}>
            <img src={apartment.image} alt={apartment.name} />
            <div className="apartment-card-content">
              <div className="card-title-row">
                <div>
                  <p className="property-type">{apartment.propertyType[language]}</p>
                  <h2>{apartment.name}</h2>
                  <p>{apartment.area[language]}</p>
                </div>
                <span className="favorite-button" aria-hidden="true">
                  ♡
                </span>
              </div>

              <div className="distance-row">
                <MapPin size={18} />
                <p>{apartment.distanceFromCenter[language]}</p>
              </div>

              <div className="highlight-list">
                {apartment.highlights.map((highlight, index) => (
                  <span key={highlight.en}>
                    <i aria-hidden="true">{index === 0 ? '⌂' : index === 1 ? '✦' : '✓'}</i>
                    {highlight[language]}
                  </span>
                ))}
              </div>

              <div className="card-actions">
                <span className="starting-price">
                  {apartment.originalPrice && <del>{apartment.originalPrice[language]}</del>}
                  <strong>{apartment.price[language]}</strong>
                </span>
                <div className="listing-rating-row">
                  <Star className="listing-rating-icon" size={18} />
                  <strong>{apartment.rating}</strong>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
