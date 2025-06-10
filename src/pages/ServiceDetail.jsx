"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import BookingForm from "../components/BookingForm"
import "./ServiceDetail.css"

function ServiceDetail() {
  const { id, name } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [showBookingForm, setShowBookingForm] = useState(false)

  // Servicios de ejemplo
  const services = [
    {
      id: 1,
      name: "Diseño de barba",
      description:
        "Nuestros servicios de barbería y estilismo ofrecen cortes de cabello modernos y clásicos, afeitados profesionales, arreglos de barba y tratamientos capilares diseñados para resaltar tu estilo y cuidar tu imagen. Contamos con técnicas avanzadas y productos de alta calidad para garantizar un acabado impecable y personalizado. Ya sea que busques un cambio de look, un corte preciso o un mantenimiento regular, nuestro equipo de expertos está listo para brindarte una experiencia única en cada visita.",
      price: "1.400",
      image: "/images/001.jpg",
      category: "Barbería",
      gender: "Hombre",
      professional: "Juan Emanuel",
      duration: 30, // minutos
    },
    {
      id: 2,
      name: "Corte fade moderno",
      description: "Corte degradado profesional con acabado perfecto y estilo contemporáneo",
      price: "1.300",
      image: "/images/062.jpg",
      category: "Barbería",
      gender: "Hombre",
      professional: "Carlos Rodríguez",
      duration: 45,
    },
    // Más servicios...
  ]

  useEffect(() => {
    // Simulando la carga del servicio desde una API
    const foundService = services.find((s) => s.id === Number.parseInt(id))
    if (foundService) {
      setService(foundService)
    } else {
      navigate("/")
    }
  }, [id, navigate])

  const generateTimeSlots = () => {
    const slots = []
    const startHour = 9
    const endHour = 17

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === endHour && minute > 0) continue

        const startTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        const endMinute = (minute + 30) % 60
        const endHourValue = hour + Math.floor((minute + 30) / 60)
        const endHour = endHourValue.toString().padStart(2, "0")
        const endTime = `${endHour}:${endMinute.toString().padStart(2, "0")}`

        slots.push({
          id: `${startTime}-${endTime}`,
          label: `${startTime} - ${endTime}`,
        })
      }
    }

    return slots
  }

  const timeSlots = generateTimeSlots()

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    setShowBookingForm(true)
  }

  const handleBookingSubmit = (formData) => {
    // Aquí se procesaría la reserva
    console.log("Reserva realizada:", {
      service,
      date: selectedDate,
      time: selectedTime,
      client: formData,
    })

    // Navegar a la página de confirmación
    navigate(`/confirmacion/${id}`, {
      state: {
        service,
        date: selectedDate,
        time: selectedTime,
        client: formData,
      },
    })
  }

  if (!service) {
    return <div className="loading">Cargando...</div>
  }

  // Generar fechas para la próxima semana
  const generateDates = () => {
    const dates = []
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      const dayNames = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]
      const monthNames = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ]

      dates.push({
        date,
        dayName: dayNames[date.getDay()],
        dayNumber: date.getDate(),
        month: monthNames[date.getMonth()],
        year: date.getFullYear(),
        formattedDate: `${dayNames[date.getDay()]}, ${date.getDate()} de ${monthNames[date.getMonth()]} de ${date.getFullYear()}`,
      })
    }

    return dates
  }

  const dates = generateDates()

  return (
    <div className="service-detail-page">
      <Header />

      <div className="service-hero">
        <img src={service.image || "/placeholder.svg"} alt={service.name} className="service-hero-image" />
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="material-icons">arrow_back</i>
        </button>
        <button className="favorite-button">
          <i className="material-icons">favorite_border</i>
        </button>
        <button className="share-button">
          <i className="material-icons">share</i>
        </button>
      </div>

      <div className="service-detail-container">
        <div className="service-breadcrumb">
          <span className="breadcrumb-item">
            <i className="material-icons">star</i> {service.gender}
          </span>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-item">{service.category}</span>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-item">$ {service.price}</span>
        </div>

        <h1 className="service-title">{service.name}</h1>

        <div className="service-professional">
          <div className="professional-avatar">
            <i className="material-icons">person</i>
          </div>
          <div className="professional-info">
            <h3>Profesional</h3>
            <p>{service.professional}</p>
          </div>
        </div>

        <div className="service-description">
          <p>{service.description}</p>
        </div>

        <div className="booking-section">
          <h2 className="booking-title">Reservar turno</h2>

          <div className="date-selector">
            <h3 className="date-title">{selectedDate ? selectedDate.formattedDate : "Selecciona una fecha"}</h3>

            <div className="date-grid">
              {dates.map((date) => (
                <button
                  key={date.formattedDate}
                  className={`date-button ${selectedDate?.formattedDate === date.formattedDate ? "active" : ""}`}
                  onClick={() => handleDateSelect(date)}
                >
                  <div className="date-day">{date.dayName}</div>
                  <div className="date-number">{date.dayNumber}</div>
                  <div className="date-month">{date.month}</div>
                  <div className="date-indicator"></div>
                </button>
              ))}
            </div>
          </div>

          {selectedDate && (
            <div className="time-selector">
              <h3 className="time-title">Horarios disponibles</h3>

              <div className="time-grid">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    className={`time-button ${selectedTime?.id === slot.id ? "active" : ""}`}
                    onClick={() => handleTimeSelect(slot)}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {showBookingForm && (
            <BookingForm
              onSubmit={handleBookingSubmit}
              service={service}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ServiceDetail
