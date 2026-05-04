import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { apartments } from '../data/apartments'
import type { Language } from '../data/apartments'
import { useI18n } from '../i18n'

const featureIconPaths = [
  'M3 18v3.75A2.25 2.25 0 0 0 5.25 24h4.5a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v6c0 .414.336.75.75.75h4.5A2.25 2.25 0 0 0 21 21.75V18a.75.75 0 0 0-1.5 0v3.75a.75.75 0 0 1-.75.75h-4.5l.75.75v-6A2.25 2.25 0 0 0 12.75 15h-1.5A2.25 2.25 0 0 0 9 17.25v6l.75-.75h-4.5a.75.75 0 0 1-.75-.75V18A.75.75 0 0 0 3 18m-1.72-.97L11.47 6.841a.75.75 0 0 1 1.06 0l10.19 10.19a.75.75 0 1 0 1.06-1.061L13.591 5.78a2.25 2.25 0 0 0-3.182 0L.219 15.97a.75.75 0 1 0 1.061 1.06m15.97-7.28v-1.5L16.5 9h3.75l-.75-.75v5.25a.75.75 0 0 0 1.5 0V8.25a.75.75 0 0 0-.75-.75H16.5a.75.75 0 0 0-.75.75v1.5a.75.75 0 0 0 1.5 0M16.522.3l-.407.543a1.793 1.793 0 0 0 .279 2.461c.12.102.14.28.045.406l-.411.548a.75.75 0 1 0 1.2.9l.407-.543a1.793 1.793 0 0 0-.279-2.461.295.295 0 0 1-.045-.406l.411-.548a.75.75 0 1 0-1.2-.9m3.75 0-.407.543a1.793 1.793 0 0 0 .279 2.461c.12.102.14.28.045.406l-.411.548a.75.75 0 1 0 1.2.9l.407-.543a1.793 1.793 0 0 0-.279-2.461.295.295 0 0 1-.045-.406l.411-.548a.75.75 0 1 0-1.2-.9',
  'M4.5 10.5v9A1.5 1.5 0 0 0 6 21h12a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 18 9H6a1.5 1.5 0 0 0-1.5 1.5m1.5 0h12v9H6zm3-6h6a3 3 0 0 1 3 3V9H6V7.5a3 3 0 0 1 3-3m0 1.5a1.5 1.5 0 0 0-1.5 1.5V9h9V7.5A1.5 1.5 0 0 0 15 6z',
  'M6.75 12a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5m0-1.5a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5m10.5 1.5a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5m0-1.5a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5M3 20.25a5.25 5.25 0 0 1 10.5 0 .75.75 0 0 0 1.5 0 6.75 6.75 0 0 0-13.5 0 .75.75 0 0 0 1.5 0m10.5-3.75a5.25 5.25 0 0 1 7.5 4.75.75.75 0 0 0 1.5 0 6.75 6.75 0 0 0-9.64-6.1.75.75 0 1 0 .64 1.35',
  'M12 18.75a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-5.3-5.05a7.5 7.5 0 0 1 10.6 0 .75.75 0 0 0 1.06-1.06 9 9 0 0 0-12.72 0 .75.75 0 1 0 1.06 1.06m-3.18-3.18a12 12 0 0 1 16.96 0 .75.75 0 1 0 1.06-1.06 13.5 13.5 0 0 0-19.08 0 .75.75 0 1 0 1.06 1.06M.34 7.34a16.5 16.5 0 0 1 23.32 0 .75.75 0 0 0 1.06-1.06 18 18 0 0 0-25.44 0 .75.75 0 0 0 1.06 1.06',
  'M11.25 3v18a.75.75 0 0 0 1.5 0V3a.75.75 0 0 0-1.5 0M3.75 10.5h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5m0 6h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5M6.22 4.72l12 12a.75.75 0 1 0 1.06-1.06l-12-12a.75.75 0 1 0-1.06 1.06m0 14.56 12-12a.75.75 0 0 0-1.06-1.06l-12 12a.75.75 0 1 0 1.06 1.06',
  'M21 12v9.75a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75V2.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 .75.75zm1.5 0V2.25A2.25 2.25 0 0 0 20.25 0H3.75A2.25 2.25 0 0 0 1.5 2.25v19.5A2.25 2.25 0 0 0 3.75 24h16.5a2.25 2.25 0 0 0 2.25-2.25zM5.25 4.5h3a.75.75 0 0 0 0-1.5h-3a.75.75 0 0 0 0 1.5m-3 3h19.5a.75.75 0 0 0 0-1.5H2.25a.75.75 0 0 0 0 1.5M16.5 15a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0m1.5 0a6 6 0 1 0-12 0 6 6 0 0 0 12 0m0-10.875a.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5 1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5m-4.5 0a.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5 1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5M10.5 15a1.5 1.5 0 0 1 1.5-1.5.75.75 0 0 0 0-1.5 3 3 0 0 0-3 3 .75.75 0 0 0 1.5 0',
]

function FeatureIcon({ index }: { index: number }) {
  return (
    <svg className="feature-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={featureIconPaths[index % featureIconPaths.length]} />
    </svg>
  )
}

function getPhotoComment(index: number, language: Language) {
  const comments = {
    en: [
      'Main view of the apartment, showing the overall style and layout.',
      'Comfortable living area for relaxing after a day in the city.',
      'Bedroom area prepared for a quiet and practical stay.',
      'Kitchen and dining space with the essentials for self-catering.',
      'Private bathroom with modern finishes.',
      'Additional angle of the apartment interior.',
      'Useful details and amenities available during the stay.',
    ],
    el: [
      'Κεντρική εικόνα του διαμερίσματος, με τη γενική αισθητική και διάταξη.',
      'Άνετος χώρος καθιστικού για χαλάρωση μετά τη βόλτα στην πόλη.',
      'Χώρος υπνοδωματίου για ήσυχη και πρακτική διαμονή.',
      'Κουζίνα και τραπεζαρία με τα βασικά για αυτόνομη διαμονή.',
      'Ιδιωτικό μπάνιο με μοντέρνες λεπτομέρειες.',
      'Επιπλέον οπτική του εσωτερικού χώρου.',
      'Χρήσιμες λεπτομέρειες και παροχές για τη διαμονή.',
    ],
  }

  return comments[language][index % comments[language].length]
}

export function ApartmentDetailsPage() {
  const { apartmentId } = useParams()
  const { language, t } = useI18n()
  const apartment = apartments.find((item) => item.id === apartmentId)
  const photos = apartment ? [apartment.image, ...apartment.gallery] : []
  const preferredPreviewIndexes = apartment?.id === 'jp2' ? [0, 8, 6, 5, 2] : [0, 10, 2, 3, 8]
  const previewPhotos = preferredPreviewIndexes
    .map((index) => photos[index])
    .filter((photo): photo is string => Boolean(photo))
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(photos[0])
  const [activeSection, setActiveSection] = useState('overview')
  const selectedPhotoIndex = Math.max(photos.indexOf(selectedPhoto), 0)

  const detailTabs = [
    { id: 'overview', label: t('apartmentDetails'), icon: 'overview' },
    { id: 'prices', label: t('prices'), icon: 'prices' },
    { id: 'facilities', label: t('popularFacilities'), icon: 'facilities' },
    { id: 'rules', label: t('propertyRules'), icon: 'rules' },
    { id: 'important-info', label: t('importantInfo'), icon: 'info' },
    { id: 'reviews', label: t('reviewsTab'), icon: 'reviews' },
  ]

  useEffect(() => {
    const sections = detailTabs
      .map((tab) => document.getElementById(tab.id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      { rootMargin: '-145px 0px -55% 0px', threshold: [0.1, 0.35, 0.6] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [apartmentId, language])

  if (!apartment) {
    return <Navigate to="/not-found" replace />
  }

  const encodedMapQuery = encodeURIComponent(apartment.map.query)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedMapQuery}`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedMapQuery}`
  const embedUrl = `https://www.google.com/maps?q=${encodedMapQuery}&z=16&output=embed`
  const featureItems = [
    apartment.highlights[0]?.[language],
    apartment.details.size,
    apartment.highlights[1]?.[language],
    apartment.amenities[0]?.[language],
    apartment.amenities[1]?.[language],
    apartment.amenities[2]?.[language],
    apartment.amenities[3]?.[language],
    apartment.amenities[4]?.[language],
  ].filter(Boolean)

  return (
    <article className="detail-page">
      <nav className="detail-section-nav" aria-label="Apartment sections">
        {detailTabs.map((tab) => (
          <a className={activeSection === tab.id ? 'active' : ''} href={`#${tab.id}`} key={tab.id}>
            <span className={`section-nav-icon section-nav-icon-${tab.icon}`} aria-hidden="true"></span>
            {tab.label}
          </a>
        ))}
      </nav>

      <section className="detail-hero" id="overview">
        <div>
          <h1>{apartment.name}</h1>
          <p className="map-location-line">
            <button className="map-pin-link" type="button" onClick={() => setIsMapOpen(true)} aria-label={t('showInMaps')}>
              <span aria-hidden="true"></span>
            </button>
            {apartment.map.address[language]} -
            <button className="inline-map-link" type="button" onClick={() => setIsMapOpen(true)}>
              {t('showInMaps')}
            </button>
          </p>
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

      <section className="booking-detail-layout" id="reviews">
        <div className="booking-main-column">
          <div className="booking-photo-mosaic" aria-label={`${apartment.name} photos`}>
            {previewPhotos.map((photo, index) => (
              <button
                className={index === 0 ? 'mosaic-photo featured' : 'mosaic-photo'}
                type="button"
                onClick={() => {
                  setSelectedPhoto(photo)
                  setIsGalleryOpen(true)
                }}
                key={photo}
              >
                <img src={photo} alt={`${apartment.name} preview ${index + 1}`} />
              </button>
            ))}
            <button
              className="show-all-photos"
              type="button"
              onClick={() => {
                setSelectedPhoto(apartment.image)
                setIsGalleryOpen(true)
              }}
            >
              {t('showAllPhotos')}
            </button>
          </div>

          <div className="feature-card-grid" id="facilities">
            {featureItems.map((feature, index) => (
              <div className="feature-card" key={`${feature}-${index}`}>
                <FeatureIcon index={index} />
                <strong>{feature}</strong>
              </div>
            ))}
          </div>
        </div>

        <aside className="booking-side-column">
          <div className="side-review-card">
            <div className="side-rating-row">
              <div>
                <strong>{apartment.ratingText[language]}</strong>
                <span>{apartment.reviews[language]}</span>
              </div>
              <strong className="rating">{apartment.rating}</strong>
            </div>
            <h2>{t('reviewHighlights')}</h2>
            <p>{apartment.reviewHighlight[language]}</p>
            <div className="reviewer-line">
              <span>{apartment.reviewer.charAt(0)}</span>
              <strong>{apartment.reviewer}</strong>
            </div>
            <div className="staff-rating-row">
              <strong>Staff</strong>
              <span>{apartment.staffRating}</span>
            </div>
          </div>

          <div className="side-map-card">
            <iframe
              src={embedUrl}
              title={`${apartment.name} mini Google Map`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <button type="button" onClick={() => setIsMapOpen(true)}>
              {t('showInMaps')}
            </button>
          </div>
        </aside>
      </section>

      <section className="detail-info-grid">
        <div className="content-section" id="prices">
          <h2>{t('prices')}</h2>
          <p className="section-copy">
            {t('startingFrom')} <strong>{apartment.price[language]}</strong>
          </p>
        </div>
        <div className="content-section" id="rules">
          <h2>{t('propertyRules')}</h2>
          <ul className="amenities-list">
            <li>{apartment.highlights[0][language]}</li>
            <li>{apartment.details.guests[language]}</li>
            <li>{apartment.details.bedrooms[language]}</li>
          </ul>
        </div>
        <div className="content-section" id="important-info">
          <h2>{t('importantInfo')}</h2>
          <p className="section-copy">{apartment.shortDescription[language]}</p>
        </div>
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

            <div className="gallery-browser">
              <div className="gallery-photo-list">
                {photos.map((photo, index) => (
                  <button
                    className={photo === selectedPhoto ? 'active' : ''}
                    type="button"
                    onClick={() => setSelectedPhoto(photo)}
                    key={photo}
                  >
                    <img src={photo} alt={`${apartment.name} gallery ${index + 1}`} />
                  </button>
                ))}
              </div>

              <aside className="gallery-inspector">
                <div className="gallery-frame">
                  <img src={selectedPhoto} alt={`${apartment.name} selected view`} />
                </div>
                <div className="photo-comment">
                  <span>
                    {selectedPhotoIndex + 1} / {photos.length}
                  </span>
                  <p>{getPhotoComment(selectedPhotoIndex, language)}</p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}

      {isMapOpen && (
        <div className="map-modal" role="dialog" aria-modal="true" aria-label={t('locationTitle')}>
          <div className="map-dialog">
            <div className="gallery-toolbar">
              <strong>{apartment.map.address[language]}</strong>
              <button type="button" onClick={() => setIsMapOpen(false)}>
                {t('closeGallery')}
              </button>
            </div>
            <iframe
              className="modal-map-frame"
              src={embedUrl}
              title={`${apartment.name} Google Map`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-actions">
              <a className="primary-action" href={mapsUrl} target="_blank" rel="noreferrer">
                {t('openInMaps')}
              </a>
              <a className="secondary-action" href={directionsUrl} target="_blank" rel="noreferrer">
                {t('getDirections')}
              </a>
            </div>
          </div>
        </div>
      )}

    </article>
  )
}
