"use client"

import { createContext, useContext, useState } from "react"

const BookingContext = createContext()

export function useBooking() {
  return useContext(BookingContext)
}

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      serviceId: 1,
      serviceName: "diseño de barba",
      clientName: "Juan Pérez",
      clientEmail: "juan@gmail.com",
      clientPhone: "123456789",
      date: "2024-01-15",
      time: "10:00",
      status: "confirmado",
      price: 15,
      createdAt: "2024-01-10T10:00:00Z",
    },
    {
      id: 2,
      serviceId: 4,
      serviceName: "Corte de cabello para hombre",
      clientName: "Carlos López",
      clientEmail: "carlos@gmail.com",
      clientPhone: "987654321",
      date: "2024-01-16",
      time: "14:30",
      status: "pendiente",
      price: 1500,
      createdAt: "2024-01-11T15:30:00Z",
    },
    {
      id: 3,
      serviceId: 2,
      serviceName: "prueba2",
      clientName: "Miguel Torres",
      clientEmail: "miguel@gmail.com",
      clientPhone: "456789123",
      date: "2024-01-17",
      time: "16:00",
      status: "cancelado",
      price: 150,
      createdAt: "2024-01-12T09:15:00Z",
    },
  ])

  const [availableSlots] = useState([
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
  ])

  const createBooking = (bookingData) => {
    const newBooking = {
      id: Date.now(),
      ...bookingData,
      status: "pendiente",
      createdAt: new Date().toISOString(),
    }
    setBookings((prev) => [...prev, newBooking])
    return newBooking
  }

  const updateBookingStatus = (bookingId, status) => {
    setBookings((prev) => prev.map((booking) => (booking.id === bookingId ? { ...booking, status } : booking)))
  }

  const deleteBooking = (bookingId) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== bookingId))
  }

  const getBookingsByDate = (date) => {
    return bookings.filter((booking) => booking.date === date)
  }

  const getAvailableSlots = (date) => {
    const bookedSlots = getBookingsByDate(date)
      .filter((booking) => booking.status !== "cancelado")
      .map((booking) => booking.time)

    return availableSlots.filter((slot) => !bookedSlots.includes(slot))
  }

  const value = {
    bookings,
    availableSlots,
    createBooking,
    updateBookingStatus,
    deleteBooking,
    getBookingsByDate,
    getAvailableSlots,
  }

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}
