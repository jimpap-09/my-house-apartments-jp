import type { Dictionary } from '@/i18n/dictionaries'
import type { ApartmentSectionProps } from '@/data/apartment-details'

type ApartmentLocationProps = ApartmentSectionProps & {
  labels: Dictionary['app']
}

export function ApartmentLocation({ apartment, labels }: ApartmentLocationProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    apartment.location,
  )}`

  return (
    <section className="grid gap-8 rounded-[28px] bg-white/90 p-8 shadow-soft" id="location">
      <div className="grid gap-4">
        <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">{labels.location}</p>
        <h2 className="text-3xl font-serif text-charcoal">{apartment.location}</h2>
        <p className="text-base leading-7 text-muted-foreground">A calm apartment located in a convenient area of the city.</p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          {labels.openInMaps}
        </a>
      </div>

      <div className="aspect-[16/9] overflow-hidden rounded-[28px] bg-slate-100 p-8 text-center text-sm text-muted-foreground">
        Map preview not available in the demo
      </div>
    </section>
  )
}

