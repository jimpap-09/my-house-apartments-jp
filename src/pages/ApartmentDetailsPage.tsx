import { useEffect, useMemo, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { ApartmentAbout } from '@/components/apartment-details/ApartmentAbout'
import { ApartmentAmenities } from '@/components/apartment-details/ApartmentAmenities'
import { ApartmentBookingBand } from '@/components/apartment-details/ApartmentBookingBand'
import { ApartmentGallery } from '@/components/apartment-details/ApartmentGallery'
import { ApartmentHero } from '@/components/apartment-details/ApartmentHero'
import { ApartmentLocation } from '@/components/apartment-details/ApartmentLocation'
import { ApartmentReviews } from '@/components/apartment-details/ApartmentReviews'
import { ApartmentSubnav } from '@/components/apartment-details/ApartmentSubnav'
import { ApartmentTrustStrip } from '@/components/apartment-details/ApartmentTrustStrip'
import { apartmentSectionIds, type ApartmentSectionId } from '@/data/apartment-details'
import { apartments } from '@/data/apartments'
import { useI18n } from '@/i18n/LanguageContext'

export function ApartmentDetailsPage() {
  const { apartmentId } = useParams()
  const { language, t } = useI18n()
  const apartment = apartments.find((item) => item.id === apartmentId)
  const [activeSection, setActiveSection] = useState<ApartmentSectionId>('overview')
  const [activePhoto, setActivePhoto] = useState<number | null>(null)

  const photos = useMemo(() => (apartment ? [apartment.image, ...apartment.gallery] : []), [apartment])
  const previewPhotos = apartment
    ? apartment.presentation.galleryPreviewIndexes
        .map((index) => ({ index, src: photos[index] }))
        .filter((photo): photo is { index: number; src: string } => Boolean(photo.src))
    : []

  useEffect(() => {
    const sections = apartmentSectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id as ApartmentSectionId)
        }
      },
      { rootMargin: '-170px 0px -55% 0px', threshold: [0.1, 0.35, 0.6] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [apartmentId, language])

  useEffect(() => {
    if (activePhoto === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActivePhoto(null)
      if (event.key === 'ArrowRight') {
        setActivePhoto((current) => (current === null ? current : (current + 1) % photos.length))
      }
      if (event.key === 'ArrowLeft') {
        setActivePhoto((current) => (current === null ? current : (current - 1 + photos.length) % photos.length))
      }
    }

    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [activePhoto, photos.length])

  if (!apartment) {
    return <Navigate to="/not-found" replace />
  }

  return (
    <article className="apartment-landing">
      <ApartmentSubnav activeSection={activeSection} labels={t.app} />
      <ApartmentHero apartment={apartment} language={language} labels={t.app} />
      <ApartmentTrustStrip apartment={apartment} language={language} />
      <ApartmentAbout apartment={apartment} language={language} photos={photos} labels={t.app} />
      <ApartmentGallery
        photos={photos}
        previewPhotos={previewPhotos}
        labels={t.app}
        onOpenPhoto={setActivePhoto}
      />
      <ApartmentAmenities apartment={apartment} language={language} labels={t.app} />
      <ApartmentReviews apartment={apartment} language={language} labels={t.app} />
      <ApartmentLocation apartment={apartment} language={language} labels={t.app} />
      <ApartmentBookingBand apartment={apartment} language={language} labels={t.app} />

      {activePhoto !== null && (
        <div className="apartment-gallery-modal" role="dialog" aria-modal="true">
          <button type="button" onClick={() => setActivePhoto(null)}>
            {t.app.closeGallery}
          </button>
          <img src={photos[activePhoto]} alt={`${apartment.name} gallery ${activePhoto + 1}`} />
        </div>
      )}
    </article>
  )
}
