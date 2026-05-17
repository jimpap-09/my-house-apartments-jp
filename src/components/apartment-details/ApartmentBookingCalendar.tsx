import type { ApartmentSectionProps } from '@/data/apartment-details'
import type { Dictionary } from '@/i18n/dictionaries'

type ApartmentBookingCalendarProps = ApartmentSectionProps & {
  labels: Dictionary['app']
  checkIn: Date | null
  checkOut: Date | null
  onSelectDate: (date: Date) => void
  onClearDates: () => void
}

const today = new Date()

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function buildMonth(offset: number) {
  const firstDay = new Date(today.getFullYear(), today.getMonth() + offset, 1)
  const leadingDays = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, index) => new Date(firstDay.getFullYear(), firstDay.getMonth(), index + 1))
  return { firstDay, leadingDays, days }
}

export function ApartmentBookingCalendar({
  apartment,
  labels,
  checkIn,
  checkOut,
  onSelectDate,
  onClearDates,
}: ApartmentBookingCalendarProps) {
  const blockedDates = new Set(apartment.booking.blockedDates)
  const months = [buildMonth(0), buildMonth(1)]

  return (
    <section className="apartment-section apartment-booking-calendar" id="booking">
      <div className="apartment-booking-heading">
        <p className="apartment-section-kicker">{labels.booking}</p>
      </div>
      <div className="booking-calendar-months">
        {months.map(({ firstDay, leadingDays, days }) => (
          <div className="booking-calendar-month" key={firstDay.toISOString()}>
            <h3>{new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' }).format(firstDay)}</h3>
            <div className="booking-calendar-weekdays">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                <span key={`${day}-${index}`}>{day}</span>
              ))}
            </div>
            <div className="booking-calendar-days">
              {Array.from({ length: leadingDays }).map((_, index) => (
                <span key={`empty-${index}`} />
              ))}
              {days.map((day) => {
                const normalized = startOfDay(day)
                const disabled = normalized < startOfDay(today) || blockedDates.has(dateKey(normalized))
                const selected =
                  (checkIn && dateKey(checkIn) === dateKey(normalized)) ||
                  (checkOut && dateKey(checkOut) === dateKey(normalized))
                const inRange = Boolean(checkIn && checkOut && normalized > checkIn && normalized < checkOut)

                return (
                  <button
                    className={`${selected ? 'selected' : ''} ${inRange ? 'in-range' : ''}`}
                    type="button"
                    disabled={disabled}
                    onClick={() => onSelectDate(normalized)}
                    key={dateKey(normalized)}
                  >
                    {day.getDate()}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <button className="booking-calendar-clear" type="button" onClick={onClearDates}>
        {labels.clearDates}
      </button>
    </section>
  )
}
