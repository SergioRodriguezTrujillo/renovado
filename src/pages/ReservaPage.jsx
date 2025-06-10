"use client"

import { useState, useEffect } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { jsPDF } from "jspdf"
import QRCode from "qrcode"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./ReservaPage.css"

function ReservaPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const service = location.state?.service || {
    name: "Servicio",
    price: 0,
    image: "/placeholder.svg",
    category: "Categoría",
  }

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({
    nombre: "",
    dni: "",
    telefono: "",
    email: "",
    metodoPago: "Efectivo",
  })
  const [weekDays, setWeekDays] = useState([])
  const [availableTimes, setAvailableTimes] = useState([])
  const [step, setStep] = useState(1)
  const [error, setError] = useState("")

  useEffect(() => {
    // Generar días de la semana
    const today = new Date()
    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      days.push(date)
    }
    setWeekDays(days)
    setSelectedDate(days[0])
  }, [])

  useEffect(() => {
    // Generar horarios disponibles
    const times = []
    for (let hour = 9; hour < 18; hour++) {
      times.push(`${hour}:00 - ${hour}:30`)
      times.push(`${hour}:30 - ${hour + 1}:00`)
    }
    setAvailableTimes(times)
  }, [selectedDate])

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setSelectedTime("")
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleNextStep = () => {
    if (step === 1 && !selectedTime) {
      setError("Por favor selecciona un horario")
      return
    }

    if (step === 2) {
      if (!formData.nombre || !formData.dni || !formData.telefono || !formData.email) {
        setError("Por favor completa todos los campos")
        return
      }
      if (!formData.email.includes("@")) {
        setError("Por favor ingresa un email válido")
        return
      }
    }

    setError("")
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  const formatDate = (date) => {
    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" }
    return date.toLocaleDateString("es-ES", options)
  }

  const getDayName = (date) => {
    return date.toLocaleDateString("es-ES", { weekday: "long" })
  }

  const getDayNumber = (date) => {
    return date.getDate()
  }

  const getMonthName = (date) => {
    return date.toLocaleDateString("es-ES", { month: "long" })
  }

  const generatePDF = async () => {
    const doc = new jsPDF()
    const turnoNumber = Math.floor(Math.random() * 1000)

    // Datos para el QR
    const qrData = JSON.stringify({
      turno: turnoNumber,
      servicio: service.name,
      fecha: formatDate(selectedDate),
      hora: selectedTime,
      cliente: formData.nombre,
      dni: formData.dni,
    })

    // Generar QR
    const qrCodeDataURL = await QRCode.toDataURL(qrData)

    // Configurar PDF
    doc.setFillColor(26, 188, 196)
    doc.rect(0, 0, 210, 20, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(16)
    doc.text("Renovados - Comprobante de Reserva", 105, 12, { align: "center" })

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(14)
    doc.text("Detalles del Turno", 20, 30)
    doc.setFontSize(12)
    doc.text(`Turno N°: ${turnoNumber}`, 20, 40)
    doc.text(`Servicio: ${service.name}`, 20, 50)
    doc.text(`Día: ${getDayName(selectedDate)}`, 20, 60)
    doc.text(`Fecha: ${formatDate(selectedDate)}`, 20, 70)
    doc.text(`Horario: ${selectedTime}`, 20, 80)

    doc.setFontSize(14)
    doc.text("Datos del Cliente", 20, 100)
    doc.setFontSize(12)
    doc.text(`Nombre: ${formData.nombre}`, 20, 110)
    doc.text(`DNI: ${formData.dni}`, 20, 120)
    doc.text(`Teléfono: ${formData.telefono}`, 20, 130)
    doc.text(`Email: ${formData.email}`, 20, 140)

    doc.setFontSize(14)
    doc.text("Detalles del Pago", 20, 160)
    doc.setFontSize(12)
    doc.text(`Método de Pago: ${formData.metodoPago}`, 20, 170)
    doc.text(`Monto: $${service.price}`, 20, 180)

    // Agregar QR
    doc.addImage(qrCodeDataURL, "PNG", 130, 100, 60, 60)

    doc.setFontSize(10)
    doc.text("Gracias por confiar en nosotros.", 105, 210, { align: "center" })
    doc.text("Para cualquier consulta, contáctanos al 123-456-789.", 105, 220, { align: "center" })

    // Guardar PDF
    doc.save(`Reserva_${turnoNumber}.pdf`)

    // Redirigir a la página principal
    setTimeout(() => {
      navigate("/")
    }, 1000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    generatePDF()
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="reserva-step">
            <h2>Selecciona una fecha y horario</h2>

            <div className="date-selector">
              <h3>{formatDate(selectedDate)}</h3>
              <div className="week-days">
                {weekDays.map((date, index) => (
                  <button
                    key={index}
                    className={`day-btn ${date.toDateString() === selectedDate.toDateString() ? "active" : ""}`}
                    onClick={() => handleDateSelect(date)}
                  >
                    <div className="day-name">{getDayName(date).substring(0, 3)}</div>
                    <div className="day-number">{getDayNumber(date)}</div>
                    <div className="day-month">{getMonthName(date).substring(0, 3)}</div>
                    <div className="day-indicator"></div>
                  </button>
                ))}
              </div>
            </div>

            <div className="time-selector">
              <h3>Horarios disponibles</h3>
              <div className="time-grid">
                {availableTimes.map((time, index) => (
                  <button
                    key={index}
                    className={`time-btn ${time === selectedTime ? "active" : ""}`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="step-buttons">
              <button className="back-btn" onClick={() => navigate(-1)}>
                Volver
              </button>
              <button className="next-btn" onClick={handleNextStep}>
                Continuar
              </button>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="reserva-step">
            <h2>Ingresa tus datos</h2>

            <div className="form-container">
              <div className="form-group">
                <label htmlFor="nombre">Nombre completo</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dni">DNI</label>
                <input type="text" id="dni" name="dni" value={formData.dni} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="step-buttons">
              <button className="back-btn" onClick={handlePrevStep}>
                Volver
              </button>
              <button className="next-btn" onClick={handleNextStep}>
                Continuar
              </button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="reserva-step">
            <h2>Confirma tu reserva</h2>

            <div className="reserva-summary">
              <div className="summary-service">
                <img src={service.image || "/placeholder.svg"} alt={service.name} className="summary-image" />
                <div className="summary-details">
                  <h3>{service.name}</h3>
                  <p className="summary-category">{service.category}</p>
                  <p className="summary-price">$ {service.price}</p>
                </div>
              </div>

              <div className="summary-info">
                <div className="summary-section">
                  <h4>Fecha y hora</h4>
                  <p>{formatDate(selectedDate)}</p>
                  <p>{selectedTime}</p>
                </div>

                <div className="summary-section">
                  <h4>Datos personales</h4>
                  <p>{formData.nombre}</p>
                  <p>DNI: {formData.dni}</p>
                  <p>Tel: {formData.telefono}</p>
                  <p>Email: {formData.email}</p>
                </div>
              </div>

              <div className="payment-method">
                <h4>Método de pago</h4>
                <select name="metodoPago" value={formData.metodoPago} onChange={handleInputChange}>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Tarjeta">Tarjeta</option>
                  <option value="Transferencia">Transferencia</option>
                </select>
              </div>
            </div>

            <div className="step-buttons">
              <button className="back-btn" onClick={handlePrevStep}>
                Volver
              </button>
              <button className="confirm-btn" onClick={handleSubmit}>
                Confirmar Reserva
              </button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="reserva-page">
      <Header searchTerm="" setSearchTerm={() => {}} />

      <div className="reserva-container">
        <div className="reserva-header">
          <h1>Reserva de turno</h1>
          <div className="step-indicator">
            <div className={`step ${step >= 1 ? "active" : ""}`}>1</div>
            <div className="step-line"></div>
            <div className={`step ${step >= 2 ? "active" : ""}`}>2</div>
            <div className="step-line"></div>
            <div className={`step ${step >= 3 ? "active" : ""}`}>3</div>
          </div>
        </div>

        <div className="reserva-content">{renderStepContent()}</div>
      </div>

      <Footer />
    </div>
  )
}

export default ReservaPage
