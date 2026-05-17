import type { Apartment } from '@/data/apartments'
import type { Dictionary } from '@/i18n/dictionaries'

type ReservationCardProps = {
  apartment: Apartment
  labels: Dictionary['app']
  checkIn: Date | null
  checkOut: Date | null
  guests: number
  nights: number
  total: number
  onGuestsChange: (guests: number) => void
}

function formatDate(date: Date | null) {
  return date
    ? new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
    : '—'
}

export function ReservationCard(props: ReservationCardProps) {
  const { apartment, labels, checkIn, checkOut, guests, nights, total, onGuestsChange } = props

  return (
    <aside className="reservation-card">
      <h2>
        €{apartment.booking.nightlyRate} <span>/ night</span>
      </h2>
      <div className="reservation-fields">
        <a href="#booking">
          <span>{labels.checkIn}</span>
          <strong>{formatDate(checkIn)}</strong>
        </a>
        <a href="#booking">
          <span>{labels.checkOut}</span>
          <strong>{formatDate(checkOut)}</strong>
        </a>
        <label>
          <span>{labels.guestsLabel}</span>
          <select value={guests} onChange={(event) => onGuestsChange(Number(event.target.value))}>
            {Array.from({ length: apartment.booking.maxGuests }, (_, index) => index + 1).map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button type="button" disabled={!checkIn || !checkOut}>
        {labels.reserve}
      </button>
      <p>{labels.noChargeYet}</p>
      {nights > 0 && (
        <dl>
          <div>
            <dt>
              €{apartment.booking.nightlyRate} × {nights} {labels.nights}
            </dt>
            <dd>€{apartment.booking.nightlyRate * nights}</dd>
          </div>
          <div>
            <dt>{labels.cleaningFee}</dt>
            <dd>€{apartment.booking.cleaningFee}</dd>
          </div>
          <div>
            <dt>{labels.serviceFee}</dt>
            <dd>€{apartment.booking.serviceFee}</dd>
          </div>
          <div>
            <dt>{labels.total}</dt>
            <dd>€{total}</dd>
          </div>
        </dl>
      )}
    </aside>
  )
}
