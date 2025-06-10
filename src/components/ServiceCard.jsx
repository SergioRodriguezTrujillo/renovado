"use client"

import { useNavigate } from "react-router-dom"
import "./ServiceCard.css"

function ServiceCard({ service }) {
  const navigate = useNavigate()

  const handleBooking = () => {
    navigate(`/reserva/${service.id}`, { state: { service } })
  }

  return (
    <div className="service-card">
      <div className="service-image-container">
        <img src={service.image || "/placeholder.svg"} alt={service.name} className="service-image" />
        {service.badge && <div className="service-badge">{service.badge}</div>}
      </div>
      <div className="service-content">
        <h3 className="service-name">{service.name}</h3>
        <p className="service-description">{service.description}</p>
        <div className="service-price-row">
          <span className="price-amount">$ {service.price}</span>
          <button className="booking-btn" onClick={handleBooking}>
            <i className="material-icons">keyboard_arrow_right</i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
