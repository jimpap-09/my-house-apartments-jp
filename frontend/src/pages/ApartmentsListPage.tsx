import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star } from 'lucide-react'
import { getAllApartments } from '@/api/services/apartmentService'

export function ApartmentsListPage() {
  const [apartments, setApartments] = useState([])

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const data = await getAllApartments()
        setApartments(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchApartments()
  }, [])

  return (
    <section className="list-page">
      <div className="page-intro home-list-intro">
        <p className="eyebrow">{app.availableStays}</p>
        <h2>{app.introTitle}</h2>
        <p>{app.introText}</p>
      </div>

      <div className="apartment-list">
        {apartments.map((apartment) => (
          <Link className="apartment-card ken-burns" to={`/apartments/${apartment.id}`} key={apartment.id}>
            <div className="apartment-card-content">
              <div className="card-title-row">
                <div>
                  <p className="property-type">Apartment</p>
                  <h2>{apartment.title}</h2>
                  <p>{apartment.location}</p>
                </div>

                <span className="favorite-button" aria-hidden="true">
                  ♡
                </span>
              </div>

              <div className="distance-row">
                <MapPin size={18} />
                <p>{apartment.location}</p>
              </div>

              <div className="card-actions">
                <span className="starting-price">
                  <strong>€{apartment.pricePerNight}</strong>
                </span>

                <div className="listing-rating-row">
                  <Star className="listing-rating-icon" size={18} />
                  <strong>5.0</strong>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}