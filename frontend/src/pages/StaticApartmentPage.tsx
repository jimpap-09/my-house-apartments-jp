import { ArrowLeft, Images, MapPin, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { apartments } from '../data/apartments'
import { apartmentImages } from '../data/apartmentImages'
import { useI18n } from '../i18n/LanguageContext'

export function StaticApartmentPage() {
  const { t } = useI18n()
  const { apartmentId } = useParams()

  const [galleryOpen, setGalleryOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const id = Number(apartmentId)

  const apartment = apartments.find(
    (apartment) => apartment.id === id
  )

  const images = apartmentImages
    .filter((image) => image.apartmentId === id)
    .sort((a, b) => a.sortOrder - b.sortOrder)

  const openGallery = (index: number) => {
    setCurrentImageIndex(index)
    setGalleryOpen(true)
  }

  const closeGallery = () => {
    setGalleryOpen(false)
  }

  const previousImage = () => {
    setCurrentImageIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    )
  }

  useEffect(() => {
    if (!galleryOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeGallery()
      }

      if (event.key === 'ArrowLeft') {
        previousImage()
      }

      if (event.key === 'ArrowRight') {
        nextImage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [galleryOpen, images.length])

  if (!apartment) {
    return <Navigate to="/not-found" replace />
  }

  return (
    <section className="px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">

        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-primary transition hover:opacity-80"
        >
          <ArrowLeft size={16} />
          {t.app.backToList}
        </Link>

        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">

          {images.length > 0 && (
            <div className="apartment-page-gallery-grid">

              {images.slice(0, 5).map((image, index) => (
                <button
                  key={`${image.url}-${index}`}
                  type="button"
                  onClick={() => openGallery(index)}
                  className={index === 0 ? 'featured' : undefined}
                >
                  <img
                    src={image.url}
                    alt={image.alt || apartment.title}
                  />
                </button>
              ))}

              <button
                type="button"
                onClick={() => openGallery(0)}
                className="apartment-page-gallery-open"
              >
                <Images size={18} />
                <span>Εμφάνιση όλων των φωτογραφιών</span>
              </button>

            </div>
          )}

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.3fr_0.7fr]">

            <div className="grid gap-5">

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  Apartment #{apartment.id}
                </span>
              </div>

              <div className="grid gap-3">
                <h1 className="text-3xl font-serif text-charcoal sm:text-4xl">
                  {apartment.title}
                </h1>

                <p className="text-base leading-7 text-muted-foreground">
                  {apartment.description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">

                <div className="rounded-2xl border border-border bg-background p-4">
                  <p className="text-sm text-muted-foreground">
                    Τιμή
                  </p>

                  <p className="mt-1 text-xl font-semibold text-charcoal">
                    €{apartment.pricePerNight}
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-background p-4">
                  <p className="text-sm text-muted-foreground">
                    Τοποθεσία
                  </p>

                  <p className="mt-1 text-lg font-semibold text-charcoal">
                    {apartment.location}
                  </p>
                </div>

              </div>

            </div>

            <div className="rounded-2xl border border-border bg-background p-5">
              <h2 className="text-lg font-semibold text-charcoal">
                Apartment
              </h2>

              <div className="mt-4 grid gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={16} />
                  <span>{apartment.location}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {galleryOpen && images.length > 0 && (
        <div
          className="apartment-page-gallery-modal"
          role="dialog"
          aria-modal="true"
        >

          <button
            type="button"
            onClick={closeGallery}
            className="apartment-page-gallery-close"
            aria-label="Close gallery"
          >
            <X size={22} />
            <span>Κλείσιμο</span>
          </button>

          <span className="apartment-page-gallery-counter">
            {currentImageIndex + 1} / {images.length}
          </span>

          {images.length > 1 && (
            <button
              type="button"
              onClick={previousImage}
              className="apartment-page-gallery-nav apartment-page-gallery-nav-previous"
              aria-label="Previous photo"
            >
              ‹
            </button>
          )}

          <figure className="apartment-page-gallery-viewer">
            <img
              src={images[currentImageIndex]?.url}
              alt={
                images[currentImageIndex]?.alt ||
                apartment.title
              }
            />
          </figure>

          {images.length > 1 && (
            <button
              type="button"
              onClick={nextImage}
              className="apartment-page-gallery-nav apartment-page-gallery-nav-next"
              aria-label="Next photo"
            >
              ›
            </button>
          )}

        </div>
      )}
    </section>
  )
}