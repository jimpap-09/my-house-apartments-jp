import type { ApartmentSectionProps } from '@/data/apartment-details'

export function ApartmentTrustStrip({ apartment, language }: ApartmentSectionProps) {
  return (
    <section className="apartment-trust-strip">
      {[...apartment.highlights, ...apartment.amenities.slice(0, 3)].map((item, index) => (
        <span key={`${item.en}-${index}`}>{item[language]}</span>
      ))}
    </section>
  )
}
