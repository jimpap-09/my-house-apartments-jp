import type { Dictionary } from '@/i18n/dictionaries'
import type { ApartmentSectionProps } from '@/data/apartment-details'

type ApartmentAboutProps = ApartmentSectionProps & {
  photos: string[]
  labels: Dictionary['app']
}

export function ApartmentAbout({ apartment, photos, labels }: ApartmentAboutProps) {
  return (
    <section className="grid gap-8 rounded-[28px] bg-white/90 p-8 shadow-soft" id="about">
      <div className="grid gap-3">
        <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">{labels.about}</p>
        <h2 className="text-3xl font-serif text-charcoal">{labels.theApartment}</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <div className="overflow-hidden rounded-[28px] bg-slate-100">
          {photos[0] ? (
            <img
              src={photos[0]}
              alt={apartment.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[320px] items-center justify-center bg-slate-200 text-sm text-muted-foreground">
              No image available
            </div>
          )}
        </div>

        <div className="grid gap-5">
          <p className="text-base leading-7 text-muted-foreground">{apartment.description}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-border bg-slate-50 p-5">
              <dt className="text-sm text-muted-foreground">{labels.guests}</dt>
              <dd className="mt-2 text-lg font-semibold">Up to 4 guests</dd>
            </div>
            <div className="rounded-[24px] border border-border bg-slate-50 p-5">
              <dt className="text-sm text-muted-foreground">{labels.bedrooms}</dt>
              <dd className="mt-2 text-lg font-semibold">2 bedrooms</dd>
            </div>
            <div className="rounded-[24px] border border-border bg-slate-50 p-5">
              <dt className="text-sm text-muted-foreground">{labels.beds}</dt>
              <dd className="mt-2 text-lg font-semibold">3 beds</dd>
            </div>
            <div className="rounded-[24px] border border-border bg-slate-50 p-5">
              <dt className="text-sm text-muted-foreground">{labels.size}</dt>
              <dd className="mt-2 text-lg font-semibold">80 m²</dd>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

