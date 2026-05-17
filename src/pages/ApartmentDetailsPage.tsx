import { ApartmentAbout } from '@/components/apartment-details/ApartmentAbout'
import { ApartmentAmenities } from '@/components/apartment-details/ApartmentAmenities'
import { ApartmentBookingSection } from '@/components/apartment-details/ApartmentBookingSection'
import { ApartmentGallery } from '@/components/apartment-details/ApartmentGallery'
import { ApartmentHero } from '@/components/apartment-details/ApartmentHero'
import { ApartmentLocation } from '@/components/apartment-details/ApartmentLocation'
import { ApartmentReviews } from '@/components/apartment-details/ApartmentReviews'
import { ApartmentSubnav } from '@/components/apartment-details/ApartmentSubnav'
import { ApartmentTrustStrip } from '@/components/apartment-details/ApartmentTrustStrip'
import { apartmentSectionIds, type ApartmentSectionId } from '@/data/apartment-details'
import { apartments } from '@/data/apartments'
import { useI18n } from '@/i18n/LanguageContext'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

export function ApartmentDetailsPage() {
  const { apartmentId } = useParams()
  const { language, t } = useI18n()
  const apartment = apartments.find((item) => item.id === apartmentId)
  const [activeSection, setActiveSection] = useState<ApartmentSectionId>('overview')
  const isProgrammaticScroll = useRef(false)
  const [activePhoto, setActivePhoto] = useState<number | null>(null)
  const activeThumbnailRef = useRef<HTMLButtonElement | null>(null)

  const photos = useMemo(() => (apartment ? [apartment.image, ...apartment.gallery] : []), [apartment])
  const previewPhotos = apartment
    ? apartment.presentation.galleryPreviewIndexes
      .map((index) => ({ index, src: photos[index] }))
      .filter((photo): photo is { index: number; src: string } => Boolean(photo.src))
    : []

  useEffect(() => {
    setActiveSection('overview')
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [apartmentId])

  useEffect(() => {
    const getCurrentSection = () => {
      const sections = apartmentSectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section))

      const scrollCheckpoint = window.scrollY + 190
      const isAtPageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      const currentSection =
        isAtPageBottom
          ? sections.at(-1)
          : [...sections]
            .reverse()
            .find((section) => section.offsetTop <= scrollCheckpoint) ?? sections[0]

      if (currentSection && !isProgrammaticScroll.current) {
        setActiveSection(currentSection.id as ApartmentSectionId)
      }
    }

    let frame = 0
    const onScroll = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(getCurrentSection)
    }

    getCurrentSection()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [apartmentId, language])

  const handleSectionSelect = (sectionId: ApartmentSectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

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

  useEffect(() => {
    if (activePhoto === null) return

    activeThumbnailRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    })
  }, [activePhoto])

  if (!apartment) {
    return <Navigate to="/not-found" replace />
  }

  return (
    <article className="apartment-landing">
      <ApartmentSubnav
        activeSection={activeSection}
        labels={t.app}
        onSectionSelect={handleSectionSelect}
      />
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
      <ApartmentBookingSection apartment={apartment} language={language} labels={t.app} />

      {activePhoto !== null && (
        <div
          className="apartment-gallery-modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setActivePhoto(null)}
        >
          <button
            className="apartment-gallery-close"
            type="button"
            onClick={() => setActivePhoto(null)}
          >
            {t.app.closeGallery}
          </button>
          <div className="apartment-gallery-viewer" onClick={(event) => event.stopPropagation()}>
            <div className="apartment-gallery-stage">
              <img src={photos[activePhoto]} alt={`${apartment.name} gallery ${activePhoto + 1}`} />
            </div>

            <div className="apartment-gallery-thumbnails" aria-label={t.app.gallery}>
              {photos.map((photo, index) => (
                <button
                  className={index === activePhoto ? 'active' : ''}
                  type="button"
                  onClick={() => setActivePhoto(index)}
                  aria-label={`${t.app.gallery} ${index + 1}`}
                  aria-current={index === activePhoto ? 'true' : undefined}
                  ref={index === activePhoto ? activeThumbnailRef : null}
                  key={photo}
                >
                  <img src={photo} alt="" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
