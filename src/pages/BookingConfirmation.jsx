"use client"

import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./BookingConfirmation.css"

function BookingConfirmation() {
  const location = useLocation()
  const navigate = useNavigate()
  const confirmationRef = useRef(null)
  const [bookingNumber, setBookingNumber] = useState("")

  const { service, date, time, client } = location.state || {}

  useEffect(() => {
    if (!service || !date || !time || !client) {
      navigate("/")
      return
    }

    // Generar número de reserva aleatorio
    const randomNumber = Math.floor(100 + Math.random() * 900)
    setBookingNumber(randomNumber.toString())
  }, [service, date, time, client, navigate])

  const generateQRData = () => {
    if (!service || !date || !time || !client) return ""

    return JSON.stringify({
      booking: bookingNumber,
      service: service.name,
      date: date.formattedDate,
      time: time.label,
      client: {
        name: client.name,
        dni: client.dni,
        phone: client.phone,
        email: client.email,
      },
    })
  }

  const downloadAsImage = () => {
    // Crear un canvas para generar la imagen
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    canvas.width = 800
    canvas.height = 1000

    // Fondo blanco
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Configurar texto
    ctx.fillStyle = "#1e2e5c"
    ctx.font = "bold 32px Arial"
    ctx.textAlign = "center"

    // Título
    ctx.fillText("¡Reserva Confirmada!", canvas.width / 2, 80)

    // Información del turno
    ctx.font = "24px Arial"
    ctx.fillText(`Turno N°: ${bookingNumber}`, canvas.width / 2, 150)
    ctx.fillText(`Servicio: ${service.name}`, canvas.width / 2, 200)
    ctx.fillText(`Fecha: ${date.formattedDate}`, canvas.width / 2, 250)
    ctx.fillText(`Horario: ${time.label}`, canvas.width / 2, 300)

    // Información del cliente
    ctx.font = "20px Arial"
    ctx.fillText(`Cliente: ${client.name}`, canvas.width / 2, 400)
    ctx.fillText(`DNI: ${client.dni}`, canvas.width / 2, 440)
    ctx.fillText(`Teléfono: ${client.phone}`, canvas.width / 2, 480)
    ctx.fillText(`Email: ${client.email}`, canvas.width / 2, 520)

    // Generar QR simple (representación textual)
    ctx.font = "16px monospace"
    ctx.fillText("Código QR:", canvas.width / 2, 600)
    const qrData = generateQRData()
    const lines = qrData.match(/.{1,50}/g) || []
    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, 640 + index * 20)
    })

    // Descargar imagen
    const dataUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = dataUrl
    link.download = `Turno-${bookingNumber}.png`
    link.click()
  }

  if (!service || !date || !time || !client) {
    return <div className="loading">Redirigiendo...</div>
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <i className="material-icons success-icon">check_circle</i>
          <h1>¡Reserva Confirmada!</h1>
          <p>Tu turno ha sido agendado correctamente</p>
        </div>

        <div className="confirmation-card" ref={confirmationRef}>
          <div className="confirmation-logo">
            <i className="material-icons">local_fire_department</i>
            <h2>Sistema de Turnos</h2>
          </div>

          <div className="confirmation-details">
            <h3>Detalles del Turno</h3>
            <div className="detail-item">
              <span className="detail-label">Turno N°:</span>
              <span className="detail-value">{bookingNumber}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Servicio:</span>
              <span className="detail-value">{service.name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Día:</span>
              <span className="detail-value">{date.dayName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Fecha:</span>
              <span className="detail-value">{date.formattedDate}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Horario:</span>
              <span className="detail-value">{time.label}</span>
            </div>
          </div>

          <div className="confirmation-client">
            <h3>Datos del Cliente</h3>
            <div className="detail-item">
              <span className="detail-label">Nombre:</span>
              <span className="detail-value">{client.name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">DNI:</span>
              <span className="detail-value">{client.dni}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Teléfono:</span>
              <span className="detail-value">{client.phone}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{client.email}</span>
            </div>
          </div>

          <div className="confirmation-payment">
            <h3>Detalles del Pago</h3>
            <div className="detail-item">
              <span className="detail-label">Método de Pago:</span>
              <span className="detail-value">{client.paymentMethod}</span>
            </div>
          </div>

          <div className="confirmation-qr">
            <div className="qr-placeholder">
              <i className="material-icons">qr_code</i>
              <p>Código QR</p>
              <small>ID: {bookingNumber}</small>
            </div>
          </div>

          <div className="confirmation-footer">
            <p>Gracias por confiar en nosotros.</p>
            <p>Para cualquier consulta, contáctanos al 123-456-789.</p>
          </div>
        </div>

        <div className="confirmation-actions">
          <button className="download-btn" onClick={downloadAsImage}>
            <i className="material-icons">image</i>
            Descargar como Imagen
          </button>
          <button className="home-btn" onClick={() => navigate("/")}>
            <i className="material-icons">home</i>
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmation
