import { apartmentSectionIds, type ApartmentSectionId } from '@/data/apartment-details'
import type { Dictionary } from '@/i18n/dictionaries'

type ApartmentSubnavProps = {
  activeSection: ApartmentSectionId
  labels: Dictionary['app']
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
    <nav className="apartment-subnav" aria-label="Apartment sections">
      <div className="apartment-subnav-links">
        {apartmentSectionIds.map((id) => (
          <a
            className={activeSection === id ? 'active' : ''}
            href={`#${id}`}
            key={id}
            onClick={(event) => {
              event.preventDefault()
              onSectionSelect(id)
            }}
          >
            {labels[id]}
          </a>
        ))}
      </div>

      {reservationSummary && (
        <a
          className="apartment-subnav-booking-summary"
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
