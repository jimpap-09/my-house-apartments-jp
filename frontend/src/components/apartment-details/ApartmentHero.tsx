import { ArrowDown, MapPin, Star } from 'lucide-react'
import type { ApartmentSectionProps } from '@/data/apartment-details'
import type { Dictionary } from '@/i18n/dictionaries'

type ApartmentHeroProps = ApartmentSectionProps & {
  labels: Dictionary['app']
}

export function ApartmentHero({ apartment, language, labels }: ApartmentHeroProps) {
  return (
    <section className="apartment-hero" id="overview">
      <div className="apartment-hero-media">
        <img src={apartment.image} alt={apartment.name} />
        <div className="apartment-hero-overlay" />
      </div>

      <div className="apartment-hero-content">
        <div className="apartment-location-chip">
          <MapPin size={15} />
          {apartment.area[language]}
        </div>
        <h1>{apartment.name}</h1>
        <p className="apartment-hero-tagline">{apartment.shortDescription[language]}</p>
        <div className="apartment-hero-rating">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={16} />
          ))}
          <span>{apartment.rating}</span>
        </div>
        <a className="apartment-hero-cta" href="#booking">
          {labels.bookingCta}
        </a>
      </div>

      <a className="apartment-scroll-cue" href="#about" aria-label={labels.scrollDown}>
        <span>{labels.scrollDown}</span>
        <ArrowDown size={16} />
      </a>
    </section>
  )
}
