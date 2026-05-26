import { apartmentSectionIds, type ApartmentSectionId } from '@/data/apartment-details'


type ApartmentSubnavProps = {
  activeSection: ApartmentSectionId
  labels: { [key in ApartmentSectionId]: string }
  onSectionSelect: (sectionId: ApartmentSectionId) => void
  reservationSummary?: string
}

export function ApartmentSubnav({
  activeSection,
  labels,
  onSectionSelect,
  reservationSummary,
}: ApartmentSubnavProps) {
  return (
    <nav
      className="sticky top-[108px] z-20 flex w-full items-center justify-between gap-6 overflow-x-auto min-h-[58px] px-6 bg-white/95 border-b border-border backdrop-blur-xl"
      aria-label="Apartment sections"
    >
      <div className="flex gap-8">
        {apartmentSectionIds.map((id) => {
          const isActive = activeSection === id

          return (
            <a
              className={`inline-flex items-center whitespace-nowrap border-b-2 px-1 pb-1 text-sm font-semibold transition-colors duration-200 ${isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-foreground hover:text-primary'
                }`}
              href={`#${id}`}
              key={id}
              onClick={(event) => {
                event.preventDefault()
                onSectionSelect(id)
              }}
            >
              {labels[id]}
            </a>
          )
        })}
      </div>

      {reservationSummary && (
        <a
          className="inline-flex min-h-[40px] items-center rounded-full bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary/90"
          href="#booking"
          onClick={(event) => {
            event.preventDefault()
            onSectionSelect('booking')
          }}
        >
          {reservationSummary}
        </a>
      )}
    </nav>
  )
}
