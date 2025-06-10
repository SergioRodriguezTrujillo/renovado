"use client"

import { useState } from "react"
import { useBooking } from "../contexts/BookingContext"
import "./AdminBookingManager.css"

function AdminBookingManager() {
  const { bookings, updateBookingStatus, deleteBooking } = useBooking()
  const [filterStatus, setFilterStatus] = useState("todos")
  const [filterDate, setFilterDate] = useState("")

  const filteredBookings = bookings.filter((booking) => {
    const statusMatch = filterStatus === "todos" || booking.status === filterStatus
    const dateMatch = !filterDate || booking.date === filterDate
    return statusMatch && dateMatch
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmado":
        return "green"
      case "pendiente":
        return "orange"
      case "cancelado":
        return "red"
      default:
        return "gray"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES")
  }

  const handleStatusChange = (bookingId, newStatus) => {
    updateBookingStatus(bookingId, newStatus)
  }

  const handleDelete = (bookingId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta reserva?")) {
      deleteBooking(bookingId)
    }
  }

  return (
    <div className="admin-booking-manager">
      <div className="manager-header">
        <h2>Gestión de Reservas</h2>
        <div className="filters">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
            <option value="todos">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="confirmado">Confirmado</option>
            <option value="cancelado">Cancelado</option>
          </select>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="filter-date"
          />
        </div>
      </div>

      <div className="bookings-table">
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Servicio</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td>
                  <div className="client-info">
                    <strong>{booking.clientName}</strong>
                    <p>{booking.clientEmail}</p>
                    <p>{booking.clientPhone}</p>
                  </div>
                </td>
                <td>{booking.serviceName}</td>
                <td>{formatDate(booking.date)}</td>
                <td>{booking.time}</td>
                <td>${booking.price}</td>
                <td>
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    className={`status-select ${getStatusColor(booking.status)}`}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="confirmado">Confirmado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="view-btn"
                      onClick={() => alert(`Detalles:\n${booking.notes || "Sin notas adicionales"}`)}
                    >
                      <i className="material-icons">visibility</i>
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(booking.id)}>
                      <i className="material-icons">delete</i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredBookings.length === 0 && (
          <div className="no-bookings">
            <i className="material-icons">event_busy</i>
            <p>No hay reservas que coincidan con los filtros</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminBookingManager
