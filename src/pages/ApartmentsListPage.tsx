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
                  <h2>{apartment.name}</h2>
                  <p>{apartment.location[language]}</p>
                </div>
                <strong className="rating">{apartment.rating}</strong>
              </div>
              <p>{apartment.shortDescription[language]}</p>
              <div className="highlight-list">
                {apartment.highlights.map((highlight) => (
                  <span key={highlight.en}>{highlight[language]}</span>
                ))}
              </div>
              <div className="card-actions">
                <strong>{apartment.price[language]}</strong>
                <span className="primary-action">{t('viewDetails')}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
