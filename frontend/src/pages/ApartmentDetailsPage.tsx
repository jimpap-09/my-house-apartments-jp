import { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'

import { ApartmentAbout } from '@/components/apartment-details/ApartmentAbout'
import { ApartmentAmenities } from '@/components/apartment-details/ApartmentAmenities'
import { ApartmentBookingCalendar } from '@/components/apartment-details/ApartmentBookingCalendar'
import { ApartmentGallery } from '@/components/apartment-details/ApartmentGallery'
import { ApartmentHero } from '@/components/apartment-details/ApartmentHero'
import { ApartmentLocation } from '@/components/apartment-details/ApartmentLocation'
import { ApartmentOverview } from '@/components/apartment-details/ApartmentOverview'
import { ApartmentReviews } from '@/components/apartment-details/ApartmentReviews'
import { ApartmentSubnav } from '@/components/apartment-details/ApartmentSubnav'
import { ReservationCard } from '@/components/apartment-details/ReservationCard'

import { getAllApartmentImages } from '@/api/services/apartmentImageService'
import { getApartmentById } from '@/api/services/apartmentService'

import type { Apartment } from '@/api/types/Apartment'
import type { ApartmentImage } from '@/api/types/ApartmentImage'

import type { ApartmentSectionId } from '@/data/apartment-details'
import { apartmentSectionIds } from '@/data/apartment-details'

export function ApartmentDetailsPage() {

  const { apartmentId } = useParams()

  const location = useLocation()
  const apartmentFromState = location.state?.apartment as Apartment | undefined

  const [apartment, setApartment] = useState<Apartment | null>(apartmentFromState ?? null)
  const [photos, setPhotos] = useState<string[]>([])
  const [loading, setLoading] = useState(!apartmentFromState)

  const [activeSection, setActiveSection] = useState<ApartmentSectionId>('overview')
  const [activePhoto, setActivePhoto] = useState<number | null>(null)
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const [guests, setGuests] = useState(1)

  const isProgrammaticScroll = useRef(false)
  const activeThumbnailRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (apartmentFromState || !apartmentId) {
      setLoading(false)
      return
    }

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

  useEffect(() => {
    const loadImages = async () => {
      if (!apartment) {
        setPhotos([])
        return
      }

      try {
        const images = await getAllApartmentImages()
        setPhotos(images.map((image: ApartmentImage) => image.url))
      } catch (err) {
        console.error('Unable to load apartment gallery', err)
        setPhotos([])
      }
    }

    loadImages()
  }, [apartment])

  const previewPhotos = useMemo(
    () => photos.slice(0, 5).map((src, index) => ({ index, src })),
    [photos],
  )

  useEffect(() => {
    setActiveSection('overview')

    window.scrollTo({
      top: 0,
      behavior: 'auto',
    })
  }, [apartmentId])

  useEffect(() => {
    const getCurrentSection = () => {
      const sections = apartmentSectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section))

      const scrollCheckpoint = window.scrollY + 190
      const isAtPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2

      const currentSection = isAtPageBottom
        ? sections.at(-1)
        : [...sections].reverse().find((section) => section.offsetTop <= scrollCheckpoint) ??
        sections[0]

      if (currentSection && !isProgrammaticScroll.current) setActiveSection(currentSection.id as ApartmentSectionId)
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
  }, [apartmentId])

  useEffect(() => {
    if (activePhoto === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        setActivePhoto((current) =>
          current === null ? current : (current + 1) % photos.length,
        )
      }

      if (event.key === 'ArrowLeft') {
        setActivePhoto((current) =>
          current === null
            ? current
            : (current - 1 + photos.length) % photos.length,
        )
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
    checkIn && checkOut
      ? Math.round((checkOut.getTime() - checkIn.getTime()) / 86_400_000)
      : 0

  const nightlyRate = apartment?.pricePerNight ?? 0
  const cleaningFee = 25
  const serviceFee = 18

  const total = nights > 0 ? nightlyRate * nights + cleaningFee + serviceFee : 0

  const reservationSummary =
    checkIn && checkOut && nights > 0
      ? `${nights} nights · ${guests} guests · €${total}`
      : undefined

  const showPreviousPhoto = () => {
    setActivePhoto((current) =>
      current === null ? current : (current - 1 + photos.length) % photos.length,
    )
  }

  const showNextPhoto = () => {
    setActivePhoto((current) =>
      current === null ? current : (current + 1) % photos.length,
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background px-6 py-20 text-center text-foreground">
        <p className="text-lg font-medium">Loading apartment details…</p>
      </div>
    )
  }

  if (!apartment) return <Navigate to="/not-found" replace />

  return (
    <article className="grid gap-10 bg-background text-foreground">
      <ApartmentSubnav
        activeSection={activeSection}
        onSectionSelect={handleSectionSelect}
        reservationSummary={reservationSummary}
      />

      <ApartmentHero apartment={apartment} imageUrl={photos[0]} labels={t.app} scrollDownText={t.app.scrollDown} />

      <ApartmentGallery
        photos={photos}
        previewPhotos={previewPhotos}
        onOpenPhoto={setActivePhoto}
      />

      <div className="container-luxe grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-8">
          <ApartmentOverview apartment={apartment} labels={t.app} />

          <ApartmentAbout apartment={apartment} photos={photos} labels={t.app} />

          <ApartmentAmenities apartment={apartment} labels={t.app} />

          <ApartmentBookingCalendar
            apartment={apartment}
            checkIn={checkIn}
            checkOut={checkOut}
            onSelectDate={handleSelectDate}
            onClearDates={clearDates}
            maxGuests={4}
            blockedDates={[]}
          />
        </div>

        <div className="sticky top-[132px] self-start">
          <ReservationCard
            apartment={apartment}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            nights={nights}
            total={total}
            onGuestsChange={setGuests}
          />
        </div>
      </div>

      <div className="container-luxe grid gap-8">
        <ApartmentReviews apartment={apartment} />
        <ApartmentLocation apartment={apartment} />
      </div>

      {activePhoto !== null && (
        <div
          className="fixed inset-0 z-40 grid place-items-center bg-black/80 p-6"
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute left-6 top-6 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
            type="button"
            onClick={() => setActivePhoto(null)}
          >
            { }
          </button>

          <div className="grid gap-4 rounded-[28px] bg-slate-950 p-4 shadow-soft max-w-[1240px] w-full">
            <div className="flex items-center justify-between gap-4 px-4">
              <span className="text-sm text-white/80">
                {activePhoto + 1} / {photos.length}
              </span>
              <div className="flex gap-3">
                <button
                  className="rounded-full border border-white/30 bg-white/10 px-3 py-2 text-white transition hover:bg-white/20"
                  type="button"
                  onClick={showPreviousPhoto}
                  aria-label="Previous photo"
                >
                  ‹
                </button>
                <button
                  className="rounded-full border border-white/30 bg-white/10 px-3 py-2 text-white transition hover:bg-white/20"
                  type="button"
                  onClick={showNextPhoto}
                  aria-label="Next photo"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_140px]">
              <div className="overflow-hidden rounded-[24px] bg-black">
                <img
                  src={photos[activePhoto]}
                  alt={`${apartment.title} gallery ${activePhoto + 1}`}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="grid gap-3 overflow-y-auto rounded-[24px] bg-slate-900 p-3">
                {photos.map((photo, index) => (
                  <button
                    className={`overflow-hidden rounded-2xl border p-0 transition ${index === activePhoto
                      ? 'border-primary'
                      : 'border-transparent hover:border-white/30'
                      }`}
                    type="button"
                    onClick={() => setActivePhoto(index)}
                    aria-label={`Gallery ${index + 1}`}
                    aria-current={index === activePhoto ? 'true' : undefined}
                    ref={index === activePhoto ? activeThumbnailRef : null}
                    key={`${photo}-${index}`}
                  >
                    <img src={photo} alt="" className="h-24 w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
