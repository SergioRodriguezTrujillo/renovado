"use client"

import "./TimeSlots.css"

function TimeSlots({ availableSlots, selectedTime, onTimeSelect, selectedDate }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="time-slots-container">
      <div className="selected-date">
        <h3>Horarios disponibles para:</h3>
        <p>{formatDate(selectedDate)}</p>
      </div>

      {availableSlots.length === 0 ? (
        <div className="no-slots">
          <i className="material-icons">event_busy</i>
          <p>No hay horarios disponibles para esta fecha</p>
          <p>Por favor selecciona otra fecha</p>
        </div>
      ) : (
        <div className="time-grid">
          {availableSlots.map((time) => (
            <button
              key={time}
              className={`time-slot ${selectedTime === time ? "selected" : ""}`}
              onClick={() => onTimeSelect(time)}
            >
              {time}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default TimeSlots
