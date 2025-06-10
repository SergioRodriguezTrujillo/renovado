"use client"

import { useState } from "react"
import "./Calendar.css"

function Calendar({ onDateSelect, selectedDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const today = new Date()
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

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

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  const formatDate = (day) => {
    const date = new Date(year, month, day)
    return date.toISOString().split("T")[0]
  }

  const isDateDisabled = (day) => {
    const date = new Date(year, month, day)
    return date < today
  }

  const isDateSelected = (day) => {
    return selectedDate === formatDate(day)
  }

  const handleDateClick = (day) => {
    if (!isDateDisabled(day)) {
      onDateSelect(formatDate(day))
    }
  }

  const renderCalendarDays = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isDisabled = isDateDisabled(day)
      const isSelected = isDateSelected(day)

      days.push(
        <div
          key={day}
          className={`calendar-day ${isDisabled ? "disabled" : ""} ${isSelected ? "selected" : ""}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>,
      )
    }

    return days
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="nav-btn" onClick={goToPreviousMonth}>
          <i className="material-icons">chevron_left</i>
        </button>
        <h3>
          {monthNames[month]} {year}
        </h3>
        <button className="nav-btn" onClick={goToNextMonth}>
          <i className="material-icons">chevron_right</i>
        </button>
      </div>

      <div className="calendar-grid">
        <div className="day-names">
          {dayNames.map((day) => (
            <div key={day} className="day-name">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-days">{renderCalendarDays()}</div>
      </div>
    </div>
  )
}

export default Calendar
