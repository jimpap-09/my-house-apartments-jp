import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star } from 'lucide-react'

import { getAllApartments } from '../api/services/apartmentService'

import type { Apartment } from '../api/types/Apartment'

export function ApartmentsListPage() {
  const [apartments, setApartments] = useState<Apartment[]>([])


  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const data = await getAllApartments()
        setApartments(data)
        console.log('APARTMENTS', data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchApartments()
  }, [])

console.log('APARTMENTS', apartments)

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const data = await Promise.all(
  //         apartments.map(async (apartment) => {
  //           const gallery = await getApartmentImages(apartment.id)
  //           return { ...apartment, gallery }
  //         })
  //       )
  //       setImages(data.map((apartment) => apartment.gallery).flat())
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   }

  //   fetchImages()
  // }, [apartments, images])

  return (
    <section className="grid gap-10 px-6 py-10">
      <div className="mx-auto grid w-full max-w-[760px] gap-3 text-center">
        <p className="eyebrow">List of My House Apartments</p>

        <h2 className="text-4xl font-serif text-charcoal sm:text-5xl">
          My House Apartments JP
        </h2>

        <p className="text-muted-foreground">
          Choose the best apartment for you.
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-5xl gap-6">
        {apartments.map((apartment) => (
          <Link
            key={apartment.id}
            to={`/apartments/${apartment.id}`}
            state={{ apartment }}
            className="group grid overflow-hidden rounded-2xl border border-border bg-card text-card-foreground no-underline shadow-soft transition duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant md:grid-cols-[280px_1fr]"
          >
            <div className="grid gap-5 p-6 sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <div className="grid gap-2">
                  <p className="eyebrow">Apartment</p>

                  <h2 className="text-2xl font-serif text-charcoal sm:text-3xl">
                    {apartment.title}
                  </h2>

                  <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    {apartment.description}
                  </p>
                </div>

                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-white text-2xl text-charcoal transition group-hover:scale-110 group-hover:border-primary/40"
                  aria-hidden="true"
                >
                  ♡
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-charcoal">
                <MapPin size={18} />
                <p>Ideal Location</p>
              </div>

              <div className="flex items-end justify-between gap-4 border-t border-border pt-5">
                <span className="text-muted-foreground">
                  <strong className="text-xl font-semibold text-charcoal">
                    €{apartment.pricePerNight}
                  </strong>
                </span>

                <div className="flex items-center gap-2 font-semibold text-charcoal">
                  <Star size={18} className="fill-current" />
                  <strong>5.0</strong>
                </div>

              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}