import { ArrowLeft, Home, MapPin, Tag, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'

import { getApartmentById, getApartmentImages } from '../api/services/apartmentService'
import type { Apartment } from '../api/types/Apartment'
import type { ApartmentImage } from '../api/types/ApartmentImage'

export function ApartmentPage() {
    const { apartmentId } = useParams()
    const location = useLocation()
    const apartmentFromState = location.state?.apartment as Apartment | undefined

    const [apartment, setApartment] = useState<Apartment | null>(apartmentFromState ?? null)
    const [images, setImages] = useState<ApartmentImage[]>([])
    const [loading, setLoading] = useState(!apartmentFromState)
    const [error, setError] = useState<string | null>(null)
    const [isGalleryOpen, setIsGalleryOpen] = useState(false)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    useEffect(() => {
        if (!apartmentId || apartmentFromState) {
            setLoading(false)
            return
        }

        let isMounted = true

        const fetchApartment = async () => {
            setLoading(true)
            setError(null)

            try {
                const data = await getApartmentById(apartmentId)
                if (isMounted) {
                    setApartment(data)
                }
            } catch (err) {
                console.error(err)
                if (isMounted) {
                    setError('Δεν βρέθηκε το apartment.')
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        fetchApartment()

        return () => {
            isMounted = false
        }
    }, [apartmentId, apartmentFromState])

    useEffect(() => {
        if (!apartment?.id) {
            setImages([])
            return
        }

        const fetchImages = async () => {
            try {
                const data = await getApartmentImages(apartment.id)
                setImages(data)
            } catch (err) {
                console.error(err)
                setImages([])
            }
        }

        fetchImages()
    }, [apartment?.id])

    const galleryImages = images.length > 0 ? images : apartment?.urlCover ? [{ id: 0, apartmentId: apartment.id, url: apartment.urlCover, alt: apartment.title, sortOrder: 0, isCover: true, createdAt: '', updatedAt: '' }] : []

    const openGallery = (index: number) => {
        setSelectedImageIndex(index)
        setIsGalleryOpen(true)
    }

    const closeGallery = () => setIsGalleryOpen(false)

    const showPreviousImage = () => {
        setSelectedImageIndex((current) => (current === 0 ? galleryImages.length - 1 : current - 1))
    }

    const showNextImage = () => {
        setSelectedImageIndex((current) => (current === galleryImages.length - 1 ? 0 : current + 1))
    }

    if (loading) {
        return (
            <section className="px-6 py-20">
                <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
                    <p className="text-lg font-medium text-foreground">Φόρτωση apartment...</p>
                </div>
            </section>
        )
    }

    if (error || !apartment) {
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
                    Πίσω στη λίστα
                </Link>

                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                    {apartment.urlCover ? (
                        <div className="relative">
                            <img
                                src={apartment.urlCover}
                                alt={apartment.title}
                                className="h-72 w-full object-cover sm:h-96"
                            />
                            <button
                                type="button"
                                onClick={() => openGallery(0)}
                                className="absolute bottom-4 right-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-charcoal shadow-md transition hover:bg-white"
                            >
                                View all photos
                            </button>
                        </div>
                    ) : (
                        <div className="flex h-72 items-center justify-center bg-muted text-muted-foreground sm:h-96">
                            <Home size={40} />
                        </div>
                    )}

                    <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.3fr_0.7fr]">
                        <div className="grid gap-5">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                                    Apartment #{apartment.id}
                                </span>
                                <span className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">
                                    Temporary preview page
                                </span>
                            </div>

                            <div className="grid gap-3">
                                <h1 className="text-3xl font-serif text-charcoal sm:text-4xl">{apartment.title}</h1>
                                <p className="text-base leading-7 text-muted-foreground">
                                    {apartment.description ?? 'Δεν υπάρχει περιγραφή για αυτό το apartment ακόμα.'}
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-3">
                                <div className="rounded-2xl border border-border bg-background p-4">
                                    <p className="text-sm text-muted-foreground">Τιμή</p>
                                    <p className="mt-1 text-xl font-semibold text-charcoal">€{apartment.pricePerNight}</p>
                                </div>
                                <div className="rounded-2xl border border-border bg-background p-4">
                                    <p className="text-sm text-muted-foreground">Τοποθεσία</p>
                                    <p className="mt-1 text-lg font-semibold text-charcoal">{apartment.location}</p>
                                </div>
                                <div className="rounded-2xl border border-border bg-background p-4">
                                    <p className="text-sm text-muted-foreground">Κατάσταση</p>
                                    <p className="mt-1 text-lg font-semibold text-charcoal">Ετοιμο για preview</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-border bg-background p-5">
                            <h2 className="text-lg font-semibold text-charcoal">Apartment fields</h2>
                            <dl className="mt-4 grid gap-3 text-sm">
                                <div className="flex items-center justify-between gap-3 border-b border-border pb-2">
                                    <dt className="flex items-center gap-2 text-muted-foreground">
                                        <Tag size={14} /> ID
                                    </dt>
                                    <dd className="font-medium text-charcoal">{apartment.id}</dd>
                                </div>
                                <div className="flex items-center justify-between gap-3 border-b border-border pb-2">
                                    <dt className="flex items-center gap-2 text-muted-foreground">
                                        <Home size={14} /> Title
                                    </dt>
                                    <dd className="font-medium text-charcoal">{apartment.title}</dd>
                                </div>
                                <div className="flex items-center justify-between gap-3 border-b border-border pb-2">
                                    <dt className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin size={14} /> Location
                                    </dt>
                                    <dd className="font-medium text-charcoal">{apartment.location}</dd>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <dt className="text-muted-foreground">Price per night</dt>
                                    <dd className="font-medium text-charcoal">€{apartment.pricePerNight}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                {galleryImages.length > 1 && (
                    <div className="grid gap-3 sm:grid-cols-3">
                        {galleryImages.slice(0, 3).map((image, index) => (
                            <button
                                key={image.id ?? `${image.url}-${index}`}
                                type="button"
                                onClick={() => openGallery(index)}
                                className="overflow-hidden rounded-2xl border border-border bg-background text-left shadow-soft"
                            >
                                <img src={image.url} alt={image.alt || apartment.title} className="h-36 w-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {isGalleryOpen && galleryImages.length > 0 && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 py-6">
                    <div className="relative w-full max-w-5xl rounded-3xl bg-white p-3 shadow-2xl">
                        <button
                            type="button"
                            onClick={closeGallery}
                            className="absolute right-3 top-3 z-10 rounded-full bg-black/70 p-2 text-white transition hover:bg-black"
                            aria-label="Close gallery"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center justify-center rounded-2xl bg-[#111] p-3">
                            <div className="flex aspect-[4/3] w-full max-w-4xl items-center justify-center overflow-hidden rounded-xl bg-black">
                                <img
                                    src={galleryImages[selectedImageIndex]?.url}
                                    alt={galleryImages[selectedImageIndex]?.alt || apartment.title}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        </div>

                        {galleryImages.length > 1 && (
                            <div className="mt-3 flex items-center justify-between gap-3">
                                <button
                                    type="button"
                                    onClick={showPreviousImage}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-xl font-semibold text-charcoal transition hover:bg-muted"
                                    aria-label="Previous photo"
                                >
                                    ←
                                </button>
                                <p className="text-sm font-medium text-charcoal">
                                    {selectedImageIndex + 1} / {galleryImages.length}
                                </p>
                                <button
                                    type="button"
                                    onClick={showNextImage}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-xl font-semibold text-charcoal transition hover:bg-muted"
                                    aria-label="Next photo"
                                >
                                    →
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    )
}
