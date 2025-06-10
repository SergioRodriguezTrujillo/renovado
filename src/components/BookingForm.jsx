"use client"

import { useState } from "react"
import "./BookingForm.css"

function BookingForm({ onSubmit, service, selectedDate, selectedTime }) {
  const [formData, setFormData] = useState({
    name: "",
    dni: "",
    phone: "",
    email: "",
    paymentMethod: "Efectivo",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Limpiar error cuando el usuario escribe
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio"
    }

    if (!formData.dni.trim()) {
      newErrors.dni = "El DNI es obligatorio"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(formData)
  }

  return (
    <div className="booking-form-container">
      <h3 className="form-title">Completa tus datos</h3>

      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre completo</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error" : ""}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="dni">DNI</label>
          <input
            type="text"
            id="dni"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            className={errors.dni ? "error" : ""}
          />
          {errors.dni && <span className="error-message">{errors.dni}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? "error" : ""}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="paymentMethod">Método de pago</label>
          <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Transferencia">Transferencia</option>
          </select>
        </div>

        <div className="booking-summary">
          <h4>Resumen de la reserva</h4>
          <div className="summary-item">
            <span>Servicio:</span>
            <span>{service.name}</span>
          </div>
          <div className="summary-item">
            <span>Fecha:</span>
            <span>{selectedDate.formattedDate}</span>
          </div>
          <div className="summary-item">
            <span>Hora:</span>
            <span>{selectedTime.label}</span>
          </div>
          <div className="summary-item">
            <span>Precio:</span>
            <span className="price">$ {service.price}</span>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Confirmar Reserva
        </button>
      </form>
    </div>
  )
}

export default BookingForm
