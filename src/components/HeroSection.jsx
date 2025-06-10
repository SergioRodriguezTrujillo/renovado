"use client"

import { useState, useEffect } from "react"
import "./HeroSection.css"

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/imagenes/062.jpg",
      title: "Corte de pelo",
      description: "Nuestros servicios de barbería y estilismo ofrecen...",
      price: 1300,
    },
    {
      image: "/imagenes/067.jpg",
      title: "Cortes para niños",
      description: "Nuestros servicios de barbería y estilismo ofrecen...",
      price: 800,
    },
    {
      image: "/imagenes/001.jpg",
      title: "Diseño de barba",
      description: "Nuestros servicios de barbería y estilismo ofrecen...",
      price: 1400,
    },
    {
      image: "/imagenes/014.jpg",
      title: "Diseños creativos",
      description: "Nuestros servicios de barbería y estilismo ofrecen...",
      price: 1500,
    },
    {
      image: "/imagenes/072.jpg",
      title: "Estilos modernos",
      description: "Nuestros servicios de barbería y estilismo ofrecen...",
      price: 1200,
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="hero-section">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div key={index} className={`hero-slide ${index === currentSlide ? "active" : ""}`}>
            <div className="hero-image">
              <img src={slide.image || "/placeholder.svg"} alt={slide.title} />
            </div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <div className="price-tag">$ {slide.price}</div>
              <button className="hero-btn">Ver más</button>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSection
