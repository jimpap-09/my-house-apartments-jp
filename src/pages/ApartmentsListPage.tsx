import { Link } from 'react-router-dom'
import { apartments } from '../data/apartments'
import { useI18n } from '../i18n'

export function ApartmentsListPage() {
  const { language, t } = useI18n()

  return (
    <section className="list-page">
      <div className="page-intro">
        <p className="eyebrow">{t('availableStays')}</p>
        <h1>{t('introTitle')}</h1>
        <p>{t('introText')}</p>
      </div>

      <div className="apartment-list">
        {apartments.map((apartment) => (
          <Link className="apartment-card" to={`/apartments/${apartment.id}`} key={apartment.id}>
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

              <div className="listing-rating-row">
                <strong className="rating">{apartment.rating}</strong>
                <div>
                  <span>{apartment.ratingText[language]}</span>
                  <small>{apartment.reviews[language]}</small>
                </div>
              </div>

              <div className="distance-row">
                <span aria-hidden="true">⌖</span>
                <p>{apartment.distanceFromCenter[language]}</p>
              </div>

              <div className="card-actions">
                <span className="starting-price">
                  <small>{t('startingFrom')}</small>
                  {apartment.originalPrice && <del>{apartment.originalPrice[language]}</del>}
                  <strong>{apartment.price[language]}</strong>
                </span>
                <span className="primary-action">{t('viewDetails')}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
