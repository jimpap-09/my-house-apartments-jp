import type { Dictionary } from '@/i18n/dictionaries'
import { apartmentSectionIds, type ApartmentSectionId } from '@/data/apartment-details'

type ApartmentSubnavProps = {
  activeSection: ApartmentSectionId
  labels: Dictionary['app']
}

export function ApartmentSubnav({ activeSection, labels }: ApartmentSubnavProps) {
  return (
    <nav className="apartment-subnav" aria-label="Apartment sections">
      {apartmentSectionIds.map((id) => (
        <a className={activeSection === id ? 'active' : ''} href={`#${id}`} key={id}>
          {labels[id]}
        </a>
      ))}
    </nav>
  )
}
