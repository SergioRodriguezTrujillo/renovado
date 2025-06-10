"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./Gallery.css"

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    // Scroll to section if hash is present
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }
    }
  }, [])

  const openModal = (image) => {
    setSelectedImage(image)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = ""
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && selectedImage) {
        closeModal()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [selectedImage])

  const galleryData = {
    ninos: [
      { id: 1, name: "Corte Básico", price: "$100.00", image: "/public/images/niños/004.jpg" },
      { id: 2, name: "Cresta", price: "$100.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 3, name: "Con Diseño", price: "$120.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 4, name: "Degradado Medio", price: "$100.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 5, name: "Pelo Largo", price: "$100.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 6, name: "Corte Pompadour", price: "$100.00", image: "/placeholder.svg?height=300&width=300" },
    ],
    clasicos: [
      { id: 1, name: "Clásico Moderno", price: "$150.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 2, name: "Clásico con Barba", price: "$150.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 3, name: "Corte Formal", price: "$150.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 4, name: "Corte Pompadour", price: "$150.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 5, name: "Corte Elegante", price: "$150.00", image: "/placeholder.svg?height=300&width=300" },
    ],
    degradados: [
      { id: 1, name: "Mohicano", price: "$150.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 2, name: "Moño con Diseño", price: "$180.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 3, name: "Texturizado", price: "$150.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 4, name: "Fade con Diseño", price: "$200.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 5, name: "Pelo Largo", price: "$150.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 6, name: "Cresta Rizo", price: "$150.00", image: "/placeholder.svg?height=300&width=300" },
    ],
    afro: [
      { id: 1, name: "Afro Mohicano", price: "$200.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 2, name: "Afro Rizo", price: "$150.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 3, name: "Rizo Corto", price: "$150.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 4, name: "Afro Cuadrado", price: "$150.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 5, name: "Un Solo Número", price: "$150.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 6, name: "Afro Medio", price: "$150.00", image: "/placeholder.svg?height=300&width=300" },
    ],
    disenos: [
      { id: 1, name: "3 Rayas", price: "$100.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 2, name: "Cola Z", price: "$50.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 3, name: "Estrellas", price: "$150.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 4, name: "Diseño Artístico", price: "$150.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 5, name: "Diseño Simple", price: "$20.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 6, name: "3 Flechas", price: "$50.00", image: "/placeholder.svg?height=300&width=300" },
    ],
    barba: [
      { id: 1, name: "Degradada Corta", price: "$50.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 2, name: "Degradada Larga", price: "$50.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 3, name: "Degradada Media", price: "$50.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 4, name: "Corte Recto", price: "$50.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 5, name: "Barba Perfilada", price: "$50.00", image: "/placeholder.svg?height=300&width=300" },
      { id: 6, name: "Barba Completa", price: "$50.00", image: "/placeholder.svg?height=300&width=300" },
    ],
  }

  return (
    <div className="gallery-page">
      <Header />

      <main>
        <section className="gallery-header section-light">
          <div className="container">
            <h1 className="page-title">Galería</h1>
            <p className="bible-verse">
              "Porque somos hechura suya, creados en Cristo Jesús para buenas obras" - Efesios 2:10
            </p>
            <p className="gallery-intro">
              Explora nuestra colección de estilos que reflejan la excelencia y el cuidado con el que servimos a cada
              cliente. Cada corte es una oportunidad para renovar tu imagen y elevar tu confianza.
            </p>
          </div>
        </section>

        <section id="ninos" className="gallery-section section-white">
          <div className="container">
            <h2>Cortes para Niños</h2>
            <p className="section-verse">"Dejad a los niños venir a mí" - Marcos 10:14</p>
            <div className="gallery">
              {galleryData.ninos.map((item) => (
                <div key={item.id} className="gallery-item" onClick={() => openModal(item)}>
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                  <div className="image-info">
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="clasicos" className="gallery-section section-light">
          <div className="container">
            <h2>Cortes Clásicos</h2>
            <p className="section-verse">"Todo lo hizo hermoso en su tiempo" - Eclesiastés 3:11</p>
            <div className="gallery">
              {galleryData.clasicos.map((item) => (
                <div key={item.id} className="gallery-item" onClick={() => openModal(item)}>
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                  <div className="image-info">
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="degradados" className="gallery-section section-white">
          <div className="container">
            <h2>Degradados</h2>
            <p className="section-verse">"De gloria en gloria" - 2 Corintios 3:18</p>
            <div className="gallery">
              {galleryData.degradados.map((item) => (
                <div key={item.id} className="gallery-item" onClick={() => openModal(item)}>
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                  <div className="image-info">
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="afro" className="gallery-section section-light">
          <div className="container">
            <h2>Afro</h2>
            <p className="section-verse">"La diversidad es parte de la creación divina" - 1 Corintios 12:4-6</p>
            <div className="gallery">
              {galleryData.afro.map((item) => (
                <div key={item.id} className="gallery-item" onClick={() => openModal(item)}>
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                  <div className="image-info">
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="disenos" className="gallery-section section-white">
          <div className="container">
            <h2>Diseños</h2>
            <p className="section-verse">"Dotados de toda habilidad artística" - Éxodo 35:35</p>
            <div className="gallery">
              {galleryData.disenos.map((item) => (
                <div key={item.id} className="gallery-item" onClick={() => openModal(item)}>
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                  <div className="image-info">
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="barba" className="gallery-section section-light">
          <div className="container">
            <h2>Barba</h2>
            <p className="section-verse">"La gloria del hombre es su barba" - Proverbios</p>
            <div className="gallery">
              {galleryData.barba.map((item) => (
                <div key={item.id} className="gallery-item" onClick={() => openModal(item)}>
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                  <div className="image-info">
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal para ver imágenes ampliadas */}
      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <span className="modal-close" onClick={closeModal}>
            &times;
          </span>
          <img
            className="modal-content"
            src={selectedImage.image || "/placeholder.svg"}
            alt={selectedImage.name}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="modal-caption">{selectedImage.name}</div>
          <div className="modal-price">{selectedImage.price}</div>
        </div>
      )}
    </div>
  )
}

export default Gallery
