"use client"

import { createContext, useContext, useState } from "react"

const ServiceContext = createContext()

export function useService() {
  return useContext(ServiceContext)
}

export function ServiceProvider({ children }) {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "diseño de barba",
      description: "Servicios de barbería y estilismo ofrecen diseño profesional de barba con técnicas modernas",
      price: 15,
      duration: 30,
      image: "/placeholder.svg?height=200&width=300",
      category: "Barbería",
      gender: "Hombre",
      badge: "CORTE",
      active: true,
      featured: true,
    },
    {
      id: 2,
      name: "prueba2",
      description: "barbería para hombres con estilo clásico y moderno",
      price: 150,
      duration: 45,
      image: "/placeholder.svg?height=200&width=300",
      category: "Barbería",
      gender: "Hombre",
      active: true,
      featured: false,
    },
    {
      id: 3,
      name: "Prueba",
      description: "Servicio de prueba para nuevos clientes",
      price: 15000,
      duration: 60,
      image: "/placeholder.svg?height=200&width=300",
      category: "Prueba",
      gender: "Hombre",
      active: true,
      featured: false,
    },
    {
      id: 4,
      name: "Corte de cabello para hombre",
      description: "Nuestros servicios de barbería y estilismo ofrecen cortes modernos y clásicos",
      price: 1500,
      duration: 45,
      image: "/placeholder.svg?height=200&width=300",
      category: "Estilismo",
      gender: "Hombre",
      active: true,
      featured: true,
    },
    {
      id: 5,
      name: "Corte de pelo",
      description: "Nuestros servicios de barbería y estilismo ofrecen cortes personalizados",
      price: 1300,
      duration: 40,
      image: "/placeholder.svg?height=200&width=300",
      category: "Estilismo",
      gender: "Hombre",
      active: true,
      featured: false,
    },
    {
      id: 6,
      name: "Manicure",
      description: "Servicio completo de manicure con esmaltado",
      price: 800,
      duration: 60,
      image: "/placeholder.svg?height=200&width=300",
      category: "Uñas",
      gender: "Mujer",
      active: true,
      featured: true,
    },
    {
      id: 7,
      name: "Pedicure",
      description: "Tratamiento completo de pedicure y relajación",
      price: 1000,
      duration: 75,
      image: "/placeholder.svg?height=200&width=300",
      category: "Uñas",
      gender: "Mujer",
      active: true,
      featured: false,
    },
    {
      id: 8,
      name: "Corte femenino",
      description: "Corte de cabello moderno para mujeres",
      price: 2000,
      duration: 60,
      image: "/placeholder.svg?height=200&width=300",
      category: "Belleza",
      gender: "Mujer",
      active: true,
      featured: true,
    },
  ])

  const [categories] = useState([
    "Todo",
    "Barbería",
    "Belleza",
    "Estilismo",
    "Decoracion",
    "Prueba",
    "Barbería II",
    "Uñas",
    "A",
  ])

  const createService = (serviceData) => {
    const newService = {
      id: Date.now(),
      ...serviceData,
      active: true,
      featured: false,
    }
    setServices((prev) => [...prev, newService])
    return newService
  }

  const updateService = (serviceId, serviceData) => {
    setServices((prev) => prev.map((service) => (service.id === serviceId ? { ...service, ...serviceData } : service)))
  }

  const deleteService = (serviceId) => {
    setServices((prev) => prev.filter((service) => service.id !== serviceId))
  }

  const toggleServiceStatus = (serviceId) => {
    setServices((prev) =>
      prev.map((service) => (service.id === serviceId ? { ...service, active: !service.active } : service)),
    )
  }

  const getServiceById = (serviceId) => {
    return services.find((service) => service.id === Number.parseInt(serviceId))
  }

  const getServicesByCategory = (category) => {
    if (category === "Todo") return services
    return services.filter((service) => service.category === category)
  }

  const getServicesByGender = (gender) => {
    return services.filter((service) => service.gender === gender)
  }

  const getFeaturedServices = () => {
    return services.filter((service) => service.featured && service.active)
  }

  const value = {
    services,
    categories,
    createService,
    updateService,
    deleteService,
    toggleServiceStatus,
    getServiceById,
    getServicesByCategory,
    getServicesByGender,
    getFeaturedServices,
  }

  return <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
}
