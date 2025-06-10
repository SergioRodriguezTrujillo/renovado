"use client"

import { useState } from "react"
import "./DashboardContent.css"

function TurnosCalendar({ onClose }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  // Datos de ejemplo de turnos
  const appointments = {
    "2024-12-15": [
      {
        id: 1,
        time: "09:00",
        service: "Corte de cabello",
        client: "Juan Pérez",
        status: "confirmed",
      },
      {
        id: 2,
        time: "10:30",
        service: "Barbería completa",
        client: "Carlos López",
        status: "pending",
      },
      {
        id: 3,
        time: "14:00",
        service: "Diseño de barba",
        client: "Miguel Torres",
        status: "confirmed",
      },
    ],
    "2024-12-16": [
      {
        id: 4,
        time: "11:00",
        service: "Corte fade",
        client: "Roberto Silva",
        status: "confirmed",
      },
      {
        id: 5,
        time: "15:30",
        service: "Alisado",
        client: "David Martín",
        status: "cancelled",
      },
    ],
    "2024-12-18": [
      {
        id: 6,
        time: "10:00",
        service: "Corte infantil",
        client: "Ana García",
        status: "confirmed",
      },
    ],
  }

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const weekdays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Días del mes anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i)
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        hasAppointments: false,
      })
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const dateString = date.toISOString().split("T")[0]
      days.push({
        date,
        isCurrentMonth: true,
        hasAppointments: !!appointments[dateString],
      })
    }

    // Días del mes siguiente para completar la grilla
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day)
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        hasAppointments: false,
      })
    }

    return days
  }

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
    setSelectedDate(null)
  }

  const handleDayClick = (day) => {
    if (day.isCurrentMonth) {
      setSelectedDate(day.date)
    }
  }

  const formatDate = (date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "confirmed":
        return "status-confirmed"
      case "pending":
        return "status-pending"
      case "cancelled":
        return "status-cancelled"
      default:
        return ""
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Confirmado"
      case "pending":
        return "Pendiente"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  const days = getDaysInMonth(currentDate)
  const today = new Date()
  const selectedDateString = selectedDate?.toISOString().split("T")[0]
  const dayAppointments = selectedDate ? appointments[selectedDateString] || [] : []

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button className="nav-btn" onClick={() => navigateMonth(-1)}>
            <i className="material-icons">chevron_left</i>
          </button>
          <h2 className="calendar-title">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button className="nav-btn" onClick={() => navigateMonth(1)}>
            <i className="material-icons">chevron_right</i>
          </button>
        </div>
        <button className="nav-btn" onClick={onClose}>
          <i className="material-icons">close</i>
        </button>
      </div>

      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {weekdays.map((day) => (
            <div key={day} className="weekday">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-days">
          {days.map((day, index) => {
            const isToday = day.date.toDateString() === today.toDateString()
            const isSelected = selectedDate && day.date.toDateString() === selectedDate.toDateString()

            return (
              <button
                key={index}
                className={`calendar-day ${!day.isCurrentMonth ? "other-month" : ""} ${isToday ? "today" : ""} ${
                  day.hasAppointments ? "has-appointments" : ""
                } ${isSelected ? "selected" : ""}`}
                onClick={() => handleDayClick(day)}
              >
                {day.date.getDate()}
              </button>
            )
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="day-appointments">
          <div className="day-appointments-header">
            <h3 className="day-appointments-title">Turnos para {formatDate(selectedDate)}</h3>
            <button className="close-day-btn" onClick={() => setSelectedDate(null)}>
              <i className="material-icons">close</i>
            </button>
          </div>

          <div className="appointments-list">
            {dayAppointments.length > 0 ? (
              dayAppointments.map((appointment) => (
                <div key={appointment.id} className="appointment-item">
                  <div className="appointment-time">{appointment.time}</div>
                  <div className="appointment-details">
                    <div className="appointment-service">{appointment.service}</div>
                    <div className="appointment-client">{appointment.client}</div>
                  </div>
                  <div className={`appointment-status ${getStatusClass(appointment.status)}`}>
                    {getStatusText(appointment.status)}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-appointments">
                <i className="material-icons">event_busy</i>
                <p>No hay turnos programados para este día</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default TurnosCalendar
