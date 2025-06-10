"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useService } from "../contexts/ServiceContext"
import { useBooking } from "../contexts/BookingContext"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Calendar from "../components/Calendar"
import TimeSlots from "../components/TimeSlots"
import BookingForm from "../components/BookingForm"
import "./BookingPage.css"

function BookingPage() {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const { getServiceById } = useService()
  const { createBooking, getAvailableSlots } = useBooking()

  const [service, setService] = useState(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [availableSlots, setAvailableSlots] = useState([])
  const [step, setStep] = useState(1) // 1: Date, 2: Time, 3: Form
  const [bookingData, setBookingData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    notes: "",
  })

  useEffect(() => {
    const foundService = getServiceById(serviceId)
    if (foundService) {
      setService(foundService)
    } else {
      navigate("/")
    }
  }, [serviceId, getServiceById, navigate])

  useEffect(() => {
    if (selectedDate) {
      const slots = getAvailableSlots(selectedDate)
      setAvailableSlots(slots)
    }
  }, [selectedDate, getAvailableSlots])

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setSelectedTime("")
    setStep(2)
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    setStep(3)
  }

  const handleBookingSubmit = (formData) => {
    const booking = {
      serviceId: service.id,
      serviceName: service.name,
      date: selectedDate,
      time: selectedTime,
      price: service.price,
      ...formData,
    }

    createBooking(booking)

    // Show success message and redirect
    alert("¡Reserva creada exitosamente!")
    navigate("/")
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      navigate("/")
    }
  }

  if (!service) {
    return <div className="loading">Cargando...</div>
  }

  return (
    <div className="booking-page">
      <Header />

      <div className="booking-container">
        <div className="booking-header">
          <button className="back-btn" onClick={handleBack}>
            <i className="material-icons">arrow_back</i>
            Volver
          </button>
          <h1>Reservar Servicio</h1>
        </div>

        <div className="booking-content">
          <div className="service-info">
            <img src={service.image || "/placeholder.svg"} alt={service.name} />
            <div className="service-details">
              <h2>{service.name}</h2>
              <p>{service.description}</p>
              <div className="service-meta">
                <span className="price">${service.price}</span>
                <span className="duration">{service.duration} min</span>
              </div>
            </div>
          </div>

          <div className="booking-steps">
            <div className="step-indicator">
              <div className={`step ${step >= 1 ? "active" : ""}`}>
                <span>1</span>
                <label>Fecha</label>
              </div>
              <div className={`step ${step >= 2 ? "active" : ""}`}>
                <span>2</span>
                <label>Hora</label>
              </div>
              <div className={`step ${step >= 3 ? "active" : ""}`}>
                <span>3</span>
                <label>Datos</label>
              </div>
            </div>

            <div className="step-content">
              {step === 1 && <Calendar onDateSelect={handleDateSelect} selectedDate={selectedDate} />}

              {step === 2 && (
                <TimeSlots
                  availableSlots={availableSlots}
                  selectedTime={selectedTime}
                  onTimeSelect={handleTimeSelect}
                  selectedDate={selectedDate}
                />
              )}

              {step === 3 && (
                <BookingForm
                  service={service}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onSubmit={handleBookingSubmit}
                  bookingData={bookingData}
                  setBookingData={setBookingData}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default BookingPage
