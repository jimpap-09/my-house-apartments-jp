import type { ApartmentSectionProps } from '@/data/apartment-details'

type ApartmentOverviewProps = ApartmentSectionProps

export function ApartmentOverview({ apartment }: ApartmentOverviewProps) {
  const highlights = ['Fast check-in', 'Flexible cancellation', 'Central location', 'Comfortable stay']

  return (
    <section className="grid gap-8 rounded-[28px] bg-white/90 p-8 shadow-soft">
      <div className="grid gap-3">
        <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Overview</p>
        <h2 className="text-3xl font-serif text-charcoal">{apartment.title}</h2>
        <p className="text-sm text-muted-foreground">{apartment.location}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] border border-border bg-slate-50 p-6">
          <p className="text-sm text-muted-foreground">Price per night</p>
          <strong className="mt-2 block text-3xl">€{apartment.pricePerNight}</strong>
        </div>
        <div className="rounded-[24px] border border-border bg-slate-50 p-6">
          <p className="text-sm text-muted-foreground">Location</p>
          <strong className="mt-2 block">{apartment.location}</strong>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {highlights.map((highlight) => (
          <span
            key={highlight}
            className="rounded-full border border-border bg-slate-100 px-4 py-2 text-sm text-charcoal"
          >
            {highlight}
          </span>
        ))}
      </div>
    </section>
  )
}
