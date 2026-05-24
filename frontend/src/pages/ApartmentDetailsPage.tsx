import { ApartmentAbout } from '@/components/apartment-details/ApartmentAbout'
import { ApartmentAmenities } from '@/components/apartment-details/ApartmentAmenities'
import { ApartmentBookingCalendar } from '@/components/apartment-details/ApartmentBookingCalendar'
import { ApartmentGallery } from '@/components/apartment-details/ApartmentGallery'
import { ApartmentHero } from '@/components/apartment-details/ApartmentHero'
import { ApartmentLocation } from '@/components/apartment-details/ApartmentLocation'
import { ApartmentOverview } from '@/components/apartment-details/ApartmentOverview'
import { ApartmentReviews } from '@/components/apartment-details/ApartmentReviews'
import { ApartmentSubnav } from '@/components/apartment-details/ApartmentSubnav'
import { ApartmentTrustStrip } from '@/components/apartment-details/ApartmentTrustStrip'
import { ReservationCard } from '@/components/apartment-details/ReservationCard'
import { apartmentSectionIds, type ApartmentSectionId } from '@/data/apartment-details'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useParams, useLocation } from 'react-router-dom'
import { getApartmentById } from '@/api/services/apartmentService'
import type { Apartment } from '@/api/types/apartment'

export function ApartmentDetailsPage() {
  const { apartmentId } = useParams()
  const location = useLocation()

  const apartmentFromState = location.state?.apartment as Apartment | undefined

  const [apartment, setApartment] = useState<Apartment | null>(
    apartmentFromState ?? null
  )

  const [loading, setLoading] = useState(!apartmentFromState)

  useEffect(() => {
    if (apartmentFromState || !apartmentId) return

    const fetchApartment = async () => {
      try {
        const data = await getApartmentById(apartmentId)
        setApartment(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchApartment()
  }, [apartmentId, apartmentFromState])

  if (loading) {
    return <p>Loading...</p>
  }

  if (!apartment) {
    return <Navigate to="/not-found" replace />
  }
  const [activeSection, setActiveSection] = useState<ApartmentSectionId>('overview')
  const isProgrammaticScroll = useRef(false)
  const [activePhoto, setActivePhoto] = useState<number | null>(null)
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const [guests, setGuests] = useState(1)
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

  const handleSelectDate = (date: Date) => {
    if (!checkIn || checkOut || date <= checkIn) {
      setCheckIn(date)
      setCheckOut(null)
      return
    }

    setCheckOut(date)
  }

  const clearDates = () => {
    setCheckIn(null)
    setCheckOut(null)
  }

  const nights =
    checkIn && checkOut ? Math.round((checkOut.getTime() - checkIn.getTime()) / 86_400_000) : 0
  const total =
    apartment && nights > 0
      ? apartment.booking.nightlyRate * nights + apartment.booking.cleaningFee + apartment.booking.serviceFee
      : 0
  const reservationSummary =
    checkIn && checkOut && nights > 0 && ['reviews', 'location'].includes(activeSection)
      ? `${nights} ${t.app.nights} · ${guests} ${t.app.guestsLabel} · €${total}`
      : undefined

  const showPreviousPhoto = () => {
    setActivePhoto((current) =>
      current === null ? current : (current - 1 + photos.length) % photos.length,
    )
  }

  const showNextPhoto = () => {
    setActivePhoto((current) => (current === null ? current : (current + 1) % photos.length))
  }

  useEffect(() => {
    if (activePhoto === null) return

    const onKeyDown = (event: KeyboardEvent) => {
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
        reservationSummary={reservationSummary}
      />
      <ApartmentHero apartment={apartment} language={language} labels={t.app} />
      <ApartmentTrustStrip apartment={apartment} language={language} />
      <ApartmentGallery
        photos={photos}
        previewPhotos={previewPhotos}
        labels={t.app}
        onOpenPhoto={setActivePhoto}
      />

      <div className="apartment-detail-layout">
        <div className="apartment-detail-main">
          <ApartmentOverview apartment={apartment} language={language} labels={t.app} />
          <ApartmentAbout apartment={apartment} language={language} photos={photos} labels={t.app} />
          <ApartmentAmenities apartment={apartment} language={language} labels={t.app} />
          <ApartmentBookingCalendar
            apartment={apartment}
            language={language}
            labels={t.app}
            checkIn={checkIn}
            checkOut={checkOut}
            onSelectDate={handleSelectDate}
            onClearDates={clearDates}
          />
        </div>

        <div className="apartment-detail-aside">
          <ReservationCard
            apartment={apartment}
            labels={t.app}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            nights={nights}
            total={total}
            onGuestsChange={setGuests}
          />
        </div>
      </div>

      <div className="apartment-detail-lower">
        <ApartmentReviews apartment={apartment} language={language} labels={t.app} />
        <ApartmentLocation apartment={apartment} language={language} labels={t.app} />
      </div>

      {activePhoto !== null && (
        <div
          className="apartment-gallery-modal"
          role="dialog"
          aria-modal="true"
        >
          <button
            className="apartment-gallery-close"
            type="button"
            onClick={() => setActivePhoto(null)}
          >
            {t.app.closeGallery}
          </button>
          <div className="apartment-gallery-counter">
            {activePhoto + 1} / {photos.length}
          </div>
          <button
            className="apartment-gallery-nav apartment-gallery-nav-previous"
            type="button"
            onClick={showPreviousPhoto}
            aria-label="Previous photo"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            className="apartment-gallery-nav apartment-gallery-nav-next"
            type="button"
            onClick={showNextPhoto}
            aria-label="Next photo"
          >
            <span aria-hidden="true">›</span>
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
