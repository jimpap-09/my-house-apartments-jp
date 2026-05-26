import { ArrowDown, MapPin } from 'lucide-react'
import type { Apartment } from '@/api/types/apartment'
import type { Dictionary } from '@/i18n/dictionaries'

type ApartmentHeroProps = {
  apartment: Apartment
  imageUrl?: string
  labels: Dictionary['app']
}

export function ApartmentHero({ apartment, imageUrl, labels }: ApartmentHeroProps) {
  const rating = 4.9
  const reviewCount = 28

  return (
    <section className="relative overflow-hidden rounded-[28px] bg-slate-950 text-white">
      <div className="absolute inset-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={apartment.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-slate-900" />
        )}
        <div className="absolute inset-0 bg-slate-950/70" />
      </div>

      <div className="relative container-luxe grid gap-6 py-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90">
          <MapPin size={14} />
          <span>{apartment.location}</span>
        </div>

        <div className="grid gap-4 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-primary-100">{labels.overview}</p>
          <h1 className="text-4xl font-serif font-semibold sm:text-5xl">{apartment.title}</h1>
          <p className="max-w-2xl text-base leading-7 text-white/80">{apartment.description}</p>

          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-3 text-sm">
              <span className="font-semibold">{rating.toFixed(1)}</span>
              <span className="text-white/70">{reviewCount} reviews</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-3 text-sm">
              <span className="font-semibold">€{apartment.pricePerNight}</span>
              <span className="text-white/70">per night</span>
            </div>
          </div>

          <a
            href="#booking"
            className="inline-flex w-fit items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            {labels.bookingCta}
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="relative mx-auto mt-10 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/80"
      >
        <span>{labels.scrollDown}</span>
        <ArrowDown size={14} />
      </a>
    </section>
  )
}
