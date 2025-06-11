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
  const [selectedHaircut, setSelectedHaircut] = useState(location.state?.selectedImage || null)
  const [showGalleryModal, setShowGalleryModal] = useState(false)

  // Gallery images data
  const galleryImages = [
    // Niños
    { id: 1, name: "Corte Básico", price: "100.00", image: "./images/niños/004.jpg", category: "Niños" },
    { id: 2, name: "Cresta", price: "100.00", image: "./images/niños/007.jpg", category: "Niños" },
    { id: 3, name: "Con Diseño", price: "120.00", image: "./images/niños/014.jpg", category: "Niños" },
    { id: 4, name: "Degradado Medio", price: "100.00", image: "./images/niños/016.jpg", category: "Niños" },
    { id: 5, name: "Pelo Largo", price: "100.00", image: "./images/niños/020.jpg", category: "Niños" },
    { id: 6, name: "Corte Pompadour", price: "100.00", image: "./images/niños/021.jpg", category: "Niños" },
    { id: 7, name: "Degradado Alto", price: "100.00", image: "./images/niños/027.jpg", category: "Niños" },
    { id: 8, name: "Raspado Diseño", price: "100.00", image: "./images/niños/030.jpg", category: "Niños" },

    // Clásicos
    { id: 9, name: "Clásico Moderno", price: "150.00", image: "./images/clasicos/200.jpg", category: "Clásicos" },
    { id: 10, name: "Clásico con Barba", price: "150.00", image: "./images/clasicos/201.jpg", category: "Clásicos" },
    { id: 11, name: "Corte Formal", price: "150.00", image: "./images/clasicos/202.jpg", category: "Clásicos" },
    { id: 12, name: "Corte Pompadour", price: "150.00", image: "./images/clasicos/203.jpg", category: "Clásicos" },
    { id: 13, name: "Corte Elegante", price: "150.00", image: "./images/clasicos/204.jpg", category: "Clásicos" },

    // Degradados
    { id: 14, name: "Mohicano", price: "150.00", image: "./images/degradados/000.jpg", category: "Degradados" },
    { id: 15, name: "Moño con Diseño", price: "180.00", image: "./images/degradados/017.jpg", category: "Degradados" },
    { id: 16, name: "Texturizado", price: "150.00", image: "./images/degradados/018.jpg", category: "Degradados" },
    { id: 17, name: "Fade con Diseño", price: "200.00", image: "./images/degradados/024.jpg", category: "Degradados" },
    { id: 18, name: "Pelo Largo", price: "150.00", image: "./images/degradados/031.jpg", category: "Degradados" },

    // Afro
    { id: 19, name: "Afro Mohicano", price: "200.00", image: "./images/afro/051.jpg", category: "Afro" },
    { id: 20, name: "Afro Rizo", price: "150.00", image: "./images/afro/156.jpg", category: "Afro" },
    { id: 21, name: "Rizo Corto", price: "150.00", image: "./images/afro/157.jpg", category: "Afro" },
    { id: 22, name: "Afro Cuadrado", price: "150.00", image: "./images/afro/158.jpg", category: "Afro" },

    // Diseños
    { id: 23, name: "3 Rayas", price: "100.00", image: "./images/diseño/001.jpg", category: "Diseños" },
    { id: 24, name: "Cola Z", price: "50.00", image: "./images/diseño/003.jpg", category: "Diseños" },
    { id: 25, name: "Estrellas", price: "150.00", image: "./images/diseño/005.jpg", category: "Diseños" },
    { id: 26, name: "Diseño Artístico", price: "150.00", image: "./images/diseño/006.jpg", category: "Diseños" },

    // Barba
    { id: 27, name: "Degradada Corta", price: "50.00", image: "./images/barba/002.jpg", category: "Barba" },
    { id: 28, name: "Degradada Larga", price: "50.00", image: "./images/barba/010.jpg", category: "Barba" },
    { id: 29, name: "Degradada Media", price: "50.00", image: "./images/barba/012.jpg", category: "Barba" },
    { id: 30, name: "Corte Recto", price: "50.00", image: "./images/barba/022.jpg", category: "Barba" },
  ]

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

  const handleSelectHaircut = (haircut) => {
    setSelectedHaircut(haircut)
    setShowGalleryModal(false)
  }

  // Function to convert image to base64 for PDF
  const getImageAsBase64 = (imageSrc) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        const dataURL = canvas.toDataURL("image/jpeg", 0.8)
        resolve(dataURL)
      }
      img.onerror = () => {
        // If image fails to load, return a default man icon
        resolve(getDefaultManIcon())
      }
      img.src = imageSrc
    })
  }

  // Default man icon as base64
  const getDefaultManIcon = () => {
    // Simple man icon SVG converted to base64
    const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="#666">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>`
    return `data:image/svg+xml;base64,${btoa(svgIcon)}`
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
      estilo: selectedHaircut ? selectedHaircut.name : "No especificado",
    })

    // Generar QR
    const qrCodeDataURL = await QRCode.toDataURL(qrData)

    // Get haircut image or default icon
    let haircutImageBase64
    if (selectedHaircut && selectedHaircut.image) {
      try {
        haircutImageBase64 = await getImageAsBase64(selectedHaircut.image)
      } catch (error) {
        haircutImageBase64 = getDefaultManIcon()
      }
    } else {
      haircutImageBase64 = getDefaultManIcon()
    }

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

    // Add haircut style info
    if (selectedHaircut) {
      doc.text(`Estilo: ${selectedHaircut.name}`, 20, 90)
      doc.text(`Precio estilo: $${selectedHaircut.price}`, 20, 100)
    } else {
      doc.text("Estilo: No especificado", 20, 90)
    }

    doc.setFontSize(14)
    doc.text("Datos del Cliente", 20, 120)
    doc.setFontSize(12)
    doc.text(`Nombre: ${formData.nombre}`, 20, 130)
    doc.text(`DNI: ${formData.dni}`, 20, 140)
    doc.text(`Teléfono: ${formData.telefono}`, 20, 150)
    doc.text(`Email: ${formData.email}`, 20, 160)

    doc.setFontSize(14)
    doc.text("Detalles del Pago", 20, 180)
    doc.setFontSize(12)
    doc.text(`Método de Pago: ${formData.metodoPago}`, 20, 190)
    doc.text(`Monto: $${service.price}`, 20, 200)

    // Add haircut image
    doc.addImage(haircutImageBase64, "JPEG", 130, 30, 60, 60)
    doc.setFontSize(10)
    doc.text("Estilo seleccionado", 160, 100, { align: "center" })

    // Agregar QR
    doc.addImage(qrCodeDataURL, "PNG", 130, 120, 60, 60)

    doc.setFontSize(10)
    doc.text("Gracias por confiar en nosotros.", 105, 220, { align: "center" })
    doc.text("Para cualquier consulta, contáctanos al 123-456-789.", 105, 230, { align: "center" })

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
                <img
                  src={selectedHaircut ? selectedHaircut.image : service.image || "/placeholder.svg"}
                  alt={selectedHaircut ? selectedHaircut.name : service.name}
                  className="summary-image"
                />
                <div className="summary-details">
                  <h3>{service.name}</h3>
                  <p className="summary-category">{service.category}</p>
                  <p className="summary-price">$ {service.price}</p>
                  {selectedHaircut && <p className="selected-style">Estilo: {selectedHaircut.name}</p>}
                </div>
                <button className="select-style-btn" onClick={() => setShowGalleryModal(true)}>
                  {selectedHaircut ? "Cambiar Estilo" : "Seleccionar Estilo"}
                </button>
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

      {/* Gallery Modal */}
      {showGalleryModal && (
        <div className="gallery-modal-overlay" onClick={() => setShowGalleryModal(false)}>
          <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
            <div className="gallery-modal-header">
              <h3>Selecciona un estilo</h3>
              <button className="gallery-modal-close" onClick={() => setShowGalleryModal(false)}>
                ×
              </button>
            </div>
            <div className="gallery-modal-content">
              {galleryImages.map((haircut) => (
                <div key={haircut.id} className="gallery-item" onClick={() => handleSelectHaircut(haircut)}>
                  <img src={haircut.image || "/placeholder.svg"} alt={haircut.name} />
                  <div className="gallery-item-info">
                    <h4>{haircut.name}</h4>
                    <p>${haircut.price}</p>
                    <span className="gallery-item-category">{haircut.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default ReservaPage
