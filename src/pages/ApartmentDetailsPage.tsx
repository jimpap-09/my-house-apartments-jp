import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { apartments } from '../data/apartments'
import { useI18n } from '../i18n'

export function ApartmentDetailsPage() {
  const { apartmentId } = useParams()
  const { language, t } = useI18n()
  const apartment = apartments.find((item) => item.id === apartmentId)
  const photos = apartment ? [apartment.image, ...apartment.gallery] : []
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(photos[0])
  const detailLabels = {
    guests: language === 'el' ? 'επισκέπτες' : 'guests',
    bedrooms: language === 'el' ? 'υπνοδωμάτια' : 'bedrooms',
    beds: language === 'el' ? 'κρεβάτια' : 'beds',
    bathrooms: language === 'el' ? 'μπάνια' : 'bathrooms',
    size: language === 'el' ? 'μέγεθος' : 'size',
  }

  if (!apartment) {
    return <Navigate to="/not-found" replace />
  }

  return (
    <article className="detail-page">
      <Link className="back-link" to="/">
        {t('backToApartments')}
      </Link>

      <section className="detail-hero">
        <div>
          <p className="eyebrow">{apartment.location[language]}</p>
          <h1>{apartment.name}</h1>
          <p>{apartment.description[language]}</p>
        </div>
        <aside className="booking-panel">
          <div>
            <span>{t('guestRating')}</span>
            <strong>{apartment.rating}</strong>
          </div>
          <p>{apartment.price[language]}</p>
          <a className="primary-action" href="mailto:hello@myhouseapartments.example">
            {t('bookingCta')}
          </a>
        </aside>
      </section>

      <section className="photo-preview-section" aria-label={`${apartment.name} photos`}>
        <button
          className="photo-preview"
          type="button"
          onClick={() => {
            setSelectedPhoto(apartment.image)
            setIsGalleryOpen(true)
          }}
        >
          <img src={apartment.image} alt={`${apartment.name} living area`} />
          <span>{t('viewPhotos')}</span>
        </button>
      </section>

      {isGalleryOpen && (
        <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={`${apartment.name} gallery`}>
          <div className="gallery-dialog">
            <div className="gallery-toolbar">
              <strong>{apartment.name}</strong>
              <button type="button" onClick={() => setIsGalleryOpen(false)}>
                {t('closeGallery')}
              </button>
            </div>
            <div className="gallery-frame">
              <img src={selectedPhoto} alt={`${apartment.name} selected view`} />
            </div>
            <div className="gallery-thumbnails">
              {photos.map((photo, index) => (
                <button
                  className={photo === selectedPhoto ? 'active' : ''}
                  type="button"
                  onClick={() => setSelectedPhoto(photo)}
                  key={photo}
                >
                  <img src={photo} alt={`${apartment.name} thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <section className="detail-grid">
        <div className="content-section">
          <h2>{t('detailsTitle')}</h2>
          <dl className="facts-grid">
            {Object.entries(apartment.details).map(([label, value]) => (
              <div key={label}>
                <dt>{detailLabels[label as keyof typeof detailLabels]}</dt>
                <dd>{typeof value === 'string' ? value : value[language]}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="content-section">
          <h2>{t('popularFacilities')}</h2>
          <ul className="amenities-list">
            {apartment.amenities.map((amenity) => (
              <li key={amenity.en}>{amenity[language]}</li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  )
}
