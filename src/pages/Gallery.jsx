"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./Gallery.css"

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const navigate = useNavigate()

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

  const handleReservation = () => {
    if (selectedImage) {
      navigate("/reserva", {
        state: {
          service: {
            name: selectedImage.name,
            price: selectedImage.price.replace("$", ""),
            image: selectedImage.image,
            category: selectedImage.category || "Corte de cabello",
          },
          selectedImage: selectedImage,
        },
      })
    }
    closeModal()
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

  // Descriptions for each haircut type
  const descriptions = {
    default:
      "Un corte de cabello profesional que realza tu estilo personal y se adapta perfectamente a la forma de tu rostro.",
    ninos: "Corte especial para niños que combina estilo y comodidad, perfecto para los más pequeños.",
    clasicos: "Corte tradicional y elegante que nunca pasa de moda, ideal para un look profesional y refinado.",
    degradados:
      "Técnica de corte que crea una transición gradual entre diferentes longitudes, para un look moderno y estilizado.",
    afro: "Corte especializado para cabello rizado o afro que realza la textura natural y proporciona un estilo único.",
    disenos: "Diseños artísticos y personalizados que añaden un toque único y creativo a tu corte de cabello.",
    barba: "Perfilado y arreglo profesional de barba que complementa tu estilo facial y realza tus rasgos.",
  }

  // Get description based on category and name
  const getDescription = (category, name) => {
    if (category === "ninos") return descriptions.ninos
    if (category === "clasicos") return descriptions.clasicos
    if (category === "degradados") return descriptions.degradados
    if (category === "afro") return descriptions.afro
    if (category === "disenos") return descriptions.disenos
    if (category === "barba") return descriptions.barba

    // Custom descriptions for specific haircuts
    if (name.includes("Mohicano"))
      return "Estilo audaz con los lados cortos y una franja más larga en el centro, perfecto para un look moderno y atrevido."
    if (name.includes("Fade"))
      return "Degradado profesional que crea una transición suave entre diferentes longitudes, para un look limpio y actual."
    if (name.includes("Diseño")) return "Arte capilar personalizado que añade un toque único y creativo a tu estilo."

    return descriptions.default
  }

  const galleryData = {
    ninos: [
      { id: 1, name: "Corte Básico", price: "$100.00", image: "./images/niños/004.jpg", category: "ninos" },
      { id: 2, name: "Cresta", price: "$100.00", image: "./images/niños/007.jpg", category: "ninos" },
      { id: 3, name: "Con Diseño", price: "$120.00", image: "./images/niños/014.jpg", category: "ninos" },
      { id: 4, name: "Degradado Medio", price: "$100.00", image: "./images/niños/016.jpg", category: "ninos" },
      { id: 5, name: "Pelo Largo", price: "$100.00", image: "./images/niños/020.jpg", category: "ninos" },
      { id: 6, name: "Corte Pompadour", price: "$100.00", image: "./images/niños/021.jpg", category: "ninos" },
      { id: 7, name: "Degradado Alto", price: "$100.00", image: "./images/niños/027.jpg", category: "ninos" },
      { id: 8, name: "Raspado Diseño", price: "$100.00", image: "./images/niños/030.jpg", category: "ninos" },
      { id: 9, name: "Raya Natural", price: "$120.00", image: "./images/niños/032.jpg", category: "ninos" },
      { id: 10, name: "Degradado Natural", price: "$100.00", image: "./images/niños/035.jpg", category: "ninos" },
      { id: 11, name: "Bellingham", price: "$120.00", image: "./images/niños/038.jpg", category: "ninos" },
      { id: 12, name: "Con Raya", price: "$120.00", image: "./images/niños/055.jpg", category: "ninos" },
      { id: 13, name: "Degradado Natural", price: "$100.00", image: "./images/niños/058.jpg", category: "ninos" },
      { id: 14, name: "Degradado Expandido", price: "$100.00", image: "./images/niños/061.jpg", category: "ninos" },
      { id: 15, name: "Con Moña", price: "$100.00", image: "./images/niños/067.jpg", category: "ninos" },
      { id: 16, name: "Raya Natural", price: "$120.00", image: "./images/niños/069.jpg", category: "ninos" },
      { id: 17, name: "Raya Arqueada", price: "$130.00", image: "./images/niños/070.jpg", category: "ninos" },
      { id: 18, name: "Texturizado", price: "$120.00", image: "./images/niños/075.jpg", category: "ninos" },
      { id: 19, name: "Peinado Casual", price: "$100.00", image: "./images/niños/080.jpg", category: "ninos" },
      { id: 20, name: "Degradado Medioalto", price: "$100.00", image: "./images/niños/083.jpg", category: "ninos" },
      { id: 21, name: "Peinado para Atras", price: "$100.00", image: "./images/niños/084.jpg", category: "ninos" },
      { id: 22, name: "Texturizado", price: "$120.00", image: "./images/niños/087.jpg", category: "ninos" },
      { id: 23, name: "Peinado Lateral", price: "$100.00", image: "./images/niños/089.jpg", category: "ninos" },
      { id: 24, name: "Texturizado con Rayas", price: "$100.00", image: "./images/niños/097.jpg", category: "ninos" },
      { id: 25, name: "Peinado Lateral", price: "$100.00", image: "./images/niños/103.jpg", category: "ninos" },
      { id: 26, name: "Corte con Diseño", price: "$150.00", image: "./images/niños/111.jpg", category: "ninos" },
      { id: 27, name: "Raya Simple", price: "$120.00", image: "./images/niños/125.jpg", category: "ninos" },
      { id: 28, name: "Degradado Medio", price: "$100.00", image: "./images/niños/126.jpg", category: "ninos" },
      { id: 29, name: "Texturizado", price: "$120.00", image: "./images/niños/128.jpg", category: "ninos" },
      { id: 30, name: "Moderno", price: "$100.00", image: "./images/niños/137.jpg", category: "ninos" },
      { id: 31, name: "Peinado Lateral", price: "$100.00", image: "./images/niños/141.jpg", category: "ninos" },
      { id: 32, name: "Degradado Alto", price: "$100.00", image: "./images/niños/144.jpg", category: "ninos" },
      { id: 33, name: "Degradado Alto", price: "$100.00", image: "./images/niños/146.jpg", category: "ninos" },
      { id: 34, name: "Texturizado", price: "$100.00", image: "./images/niños/148.jpg", category: "ninos" },
      { id: 35, name: "Raya Natural", price: "$100.00", image: "./images/niños/149.jpg", category: "ninos" },
      { id: 36, name: "Afro", price: "$100.00", image: "./images/niños/170.jpg", category: "ninos" },
    ],
    clasicos: [
      { id: 1, name: "Clásico Moderno", price: "$150.00", image: "./images/clasicos/200.jpg", category: "clasicos" },
      { id: 2, name: "Clásico con Barba", price: "$150.00", image: "./images/clasicos/201.jpg", category: "clasicos" },
      { id: 3, name: "Corte Formal", price: "$150.00", image: "./images/clasicos/202.jpg", category: "clasicos" },
      { id: 4, name: "Corte Pompadour", price: "$150.00", image: "./images/clasicos/203.jpg", category: "clasicos" },
      { id: 5, name: "Corte Elegante", price: "$150.00", image: "./images/clasicos/204.jpg", category: "clasicos" },
    ],
    degradados: [
      { id: 1, name: "Mohicano", price: "$150.00", image: "./images/degradados/000.jpg", category: "degradados" },
      {
        id: 2,
        name: "Moño con Diseño",
        price: "$180.00",
        image: "./images/degradados/017.jpg",
        category: "degradados",
      },
      { id: 3, name: "Texturizado", price: "$150.00", image: "./images/degradados/018.jpg", category: "degradados" },
      {
        id: 4,
        name: "Fade con Diseño",
        price: "$200.00",
        image: "./images/degradados/024.jpg",
        category: "degradados",
      },
      { id: 5, name: "Pelo Largo", price: "$150.00", image: "./images/degradados/031.jpg", category: "degradados" },
      { id: 6, name: "Mohicano", price: "$150.00", image: "./images/degradados/042.jpg", category: "degradados" },
      { id: 7, name: "Cresta Rizo", price: "$150.00", image: "./images/degradados/050.jpg", category: "degradados" },
      {
        id: 8,
        name: "Rizo con Diseño",
        price: "$200.00",
        image: "./images/degradados/053.jpg",
        category: "degradados",
      },
      {
        id: 9,
        name: "Texturizado Alto",
        price: "$150.00",
        image: "./images/degradados/054.jpg",
        category: "degradados",
      },
      { id: 10, name: "Pompardour", price: "$150.00", image: "./images/degradados/057.jpg", category: "degradados" },
      {
        id: 11,
        name: "Degradado Medio",
        price: "$150.00",
        image: "./images/degradados/059.jpg",
        category: "degradados",
      },
      {
        id: 12,
        name: "Degradado Expandido",
        price: "$150.00",
        image: "./images/degradados/062.jpg",
        category: "degradados",
      },
      {
        id: 13,
        name: "Degradado Expandido",
        price: "$150.00",
        image: "./images/degradados/064.jpg",
        category: "degradados",
      },
      { id: 14, name: "Cola en V", price: "$150.00", image: "./images/degradados/068.jpg", category: "degradados" },
      {
        id: 15,
        name: "V sin Degradar",
        price: "$150.00",
        image: "./images/degradados/071.jpg",
        category: "degradados",
      },
      {
        id: 16,
        name: "Degradado Natural",
        price: "$150.00",
        image: "./images/degradados/076.jpg",
        category: "degradados",
      },
      {
        id: 17,
        name: "Degradado Natural",
        price: "$150.00",
        image: "./images/degradados/077.jpg",
        category: "degradados",
      },
      {
        id: 18,
        name: "Texturizado Corto",
        price: "$150.00",
        image: "./images/degradados/079.jpg",
        category: "degradados",
      },
      {
        id: 19,
        name: "Fade con Diseño",
        price: "$200.00",
        image: "./images/degradados/082.jpg",
        category: "degradados",
      },
      { id: 20, name: "Buzz Cut", price: "$150.00", image: "./images/degradados/092.jpg", category: "degradados" },
      { id: 21, name: "Moño Simple", price: "$150.00", image: "./images/degradados/094.jpg", category: "degradados" },
      {
        id: 22,
        name: "V sin Degradar",
        price: "$150.00",
        image: "./images/degradados/095.jpg",
        category: "degradados",
      },
      {
        id: 23,
        name: "Degradado Medio",
        price: "$150.00",
        image: "./images/degradados/099.jpg",
        category: "degradados",
      },
      { id: 24, name: "Raya Natural", price: "$200.00", image: "./images/degradados/101.jpg", category: "degradados" },
      { id: 25, name: "Buzz Cut", price: "$150.00", image: "./images/degradados/104.jpg", category: "degradados" },
      { id: 26, name: "Sin Degradar", price: "$150.00", image: "./images/degradados/108.jpg", category: "degradados" },
      {
        id: 27,
        name: "Taper Fade Alto",
        price: "$150.00",
        image: "./images/degradados/109.jpg",
        category: "degradados",
      },
      {
        id: 28,
        name: "Degradado Natural",
        price: "$150.00",
        image: "./images/degradados/110.jpg",
        category: "degradados",
      },
      {
        id: 29,
        name: "Tipos de Colas",
        price: "$150.00",
        image: "./images/degradados/115.jpg",
        category: "degradados",
      },
      {
        id: 30,
        name: "Fade con Diseño",
        price: "$150.00",
        image: "./images/degradados/122.jpg",
        category: "degradados",
      },
      { id: 31, name: "Mohicano", price: "$150.00", image: "./images/degradados/131.jpg", category: "degradados" },
      { id: 32, name: "Cola en V", price: "$150.00", image: "./images/degradados/133.jpg", category: "degradados" },
      { id: 33, name: "Fade con Raya", price: "$150.00", image: "./images/degradados/140.jpg", category: "degradados" },
      {
        id: 34,
        name: "Mohicano Tipo V",
        price: "$200.00",
        image: "./images/degradados/142.jpg",
        category: "degradados",
      },
      { id: 35, name: "Fade Natural", price: "$150.00", image: "./images/degradados/143.jpg", category: "degradados" },
      { id: 36, name: "Afro Rizo", price: "$150.00", image: "./images/degradados/154.jpg", category: "degradados" },
      {
        id: 37,
        name: "Fade con Barba",
        price: "$200.00",
        image: "./images/degradados/155.jpg",
        category: "degradados",
      },
      { id: 38, name: "Fade Natural", price: "$150.00", image: "./images/degradados/161.jpg", category: "degradados" },
      { id: 39, name: "Buzz Cut", price: "$150.00", image: "./images/degradados/163.jpg", category: "degradados" },
      {
        id: 40,
        name: "Mohicano Pompadour",
        price: "$150.00",
        image: "./images/degradados/165.jpg",
        category: "degradados",
      },
      { id: 41, name: "El Cuadrado", price: "$200.00", image: "./images/degradados/168.jpg", category: "degradados" },
      { id: 42, name: "Mohicano", price: "$150.00", image: "./images/degradados/172.jpg", category: "degradados" },
      { id: 43, name: "Pelo Rizo", price: "$150.00", image: "./images/degradados/176.jpg", category: "degradados" },
      { id: 44, name: "Corte Militar", price: "$150.00", image: "./images/degradados/177.jpg", category: "degradados" },
      { id: 45, name: "Burst Fade", price: "$200.00", image: "./images/degradados/178.jpg", category: "degradados" },
      { id: 46, name: "Low Fade", price: "$150.00", image: "./images/degradados/179.jpg", category: "degradados" },
      { id: 47, name: "Mullet", price: "$200.00", image: "./images/degradados/180.jpg", category: "degradados" },
      { id: 48, name: "Buzz Cut", price: "$150.00", image: "./images/degradados/181.jpg", category: "degradados" },
      { id: 49, name: "Side Part", price: "$150.00", image: "./images/degradados/182.jpg", category: "degradados" },
      { id: 50, name: "Quiff", price: "$150.00", image: "./images/degradados/183.jpg", category: "degradados" },
      { id: 51, name: "Taper Fade", price: "$150.00", image: "./images/degradados/184.jpg", category: "degradados" },
      {
        id: 52,
        name: "Fade Comprimido",
        price: "$200.00",
        image: "./images/degradados/185.jpg",
        category: "degradados",
      },
      { id: 53, name: "Hunder Cutt", price: "$150.00", image: "./images/degradados/186.jpg", category: "degradados" },
      { id: 54, name: "Drop Fade", price: "$200.00", image: "./images/degradados/187.jpg", category: "degradados" },
    ],
    afro: [
      { id: 1, name: "Afro Mohicano", price: "$200.00", image: "./images/afro/051.jpg", category: "afro" },
      { id: 2, name: "Afro Rizo", price: "$150.00", image: "./images/afro/156.jpg", category: "afro" },
      { id: 3, name: "Rizo Corto", price: "$150.00", image: "./images/afro/157.jpg", category: "afro" },
      { id: 4, name: "Afro Cuadrado", price: "$150.00", image: "./images/afro/158.jpg", category: "afro" },
      { id: 5, name: "Un Solo Número", price: "$150.00", image: "./images/afro/159.jpg", category: "afro" },
      { id: 6, name: "Afro Medio", price: "$150.00", image: "./images/afro/164.jpg", category: "afro" },
      { id: 7, name: "Taper Fade", price: "$150.00", image: "./images/afro/166.jpg", category: "afro" },
      { id: 8, name: "Taper Alto", price: "$150.00", image: "./images/afro/171.jpg", category: "afro" },
      { id: 9, name: "Afro Razo", price: "$150.00", image: "./images/afro/175.jpg", category: "afro" },
    ],
    disenos: [
      { id: 1, name: "3 Rayas", price: "$100.00", image: "./images/diseño/001.jpg", category: "disenos" },
      { id: 2, name: "Cola Z", price: "$50.00", image: "./images/diseño/003.jpg", category: "disenos" },
      { id: 3, name: "Estrellas", price: "$150.00", image: "./images/diseño/005.jpg", category: "disenos" },
      { id: 4, name: "Diseño Artístico", price: "$150.00", image: "./images/diseño/006.jpg", category: "disenos" },
      { id: 5, name: "Diseño Simple", price: "$20.00", image: "./images/diseño/008.jpg", category: "disenos" },
      { id: 6, name: "3 Flechas", price: "$50.00", image: "./images/diseño/011.jpg", category: "disenos" },
      { id: 7, name: "Rayas Cortándose", price: "$50.00", image: "./images/diseño/013.jpg", category: "disenos" },
      { id: 8, name: "Diseño Personalizado", price: "$150.00", image: "./images/diseño/015.jpg", category: "disenos" },
      { id: 9, name: "3 Rayas Cortas", price: "$50.00", image: "./images/diseño/019.jpg", category: "disenos" },
      { id: 10, name: "Diseño Simple", price: "$50.00", image: "./images/diseño/023.jpg", category: "disenos" },
      { id: 11, name: "Raya Curva", price: "$50.00", image: "./images/diseño/028.jpg", category: "disenos" },
      { id: 12, name: "Diseño En Cola", price: "$50.00", image: "./images/diseño/034.jpg", category: "disenos" },
      { id: 13, name: "Diseño Degradado", price: "$100.00", image: "./images/diseño/036.jpg", category: "disenos" },
      { id: 14, name: "Diseño Clásico", price: "$50.00", image: "./images/diseño/039.jpg", category: "disenos" },
      { id: 15, name: "Diseño Z", price: "$50.00", image: "./images/diseño/040.jpg", category: "disenos" },
      { id: 16, name: "Diseño Personalizado", price: "$100.00", image: "./images/diseño/044.jpg", category: "disenos" },
      { id: 17, name: "Diseño Degradado", price: "$150.00", image: "./images/diseño/045.jpg", category: "disenos" },
      { id: 18, name: "2 Rayas Cortas", price: "$50.00", image: "./images/diseño/049.jpg", category: "disenos" },
      { id: 19, name: "2 Rayas Laterales", price: "$50.00", image: "./images/diseño/056.jpg", category: "disenos" },
      { id: 20, name: "Raya Curva", price: "$50.00", image: "./images/diseño/060.jpg", category: "disenos" },
      { id: 21, name: "Diseño Personalizado", price: "$100.00", image: "./images/diseño/066.jpg", category: "disenos" },
      { id: 22, name: "Diseño Con Barba", price: "$100.00", image: "./images/diseño/072.jpg", category: "disenos" },
      { id: 23, name: "Diseño Clásico", price: "$100.00", image: "./images/diseño/078.jpg", category: "disenos" },
      { id: 24, name: "Diseño V", price: "$50.00", image: "./images/diseño/085.jpg", category: "disenos" },
      { id: 25, name: "2 Raya En Cola", price: "$50.00", image: "./images/diseño/086.jpg", category: "disenos" },
      { id: 26, name: "Raya Partida", price: "$50.00", image: "./images/diseño/088.jpg", category: "disenos" },
      { id: 27, name: "Diseño Simple", price: "$50.00", image: "./images/diseño/090.jpg", category: "disenos" },
      { id: 28, name: "Diseño Simple", price: "$30.00", image: "./images/diseño/091.jpg", category: "disenos" },
      { id: 29, name: "Diseño Curvo", price: "$50.00", image: "./images/diseño/098.jpg", category: "disenos" },
      { id: 30, name: "Diseño V", price: "$50.00", image: "./images/diseño/100.jpg", category: "disenos" },
      { id: 31, name: "Diseño Personalizado", price: "$150.00", image: "./images/diseño/105.jpg", category: "disenos" },
      { id: 32, name: "Corazón Con Alas", price: "$100.00", image: "./images/diseño/106.jpg", category: "disenos" },
      { id: 33, name: "Diseño Clásico", price: "$100.00", image: "./images/diseño/112.jpg", category: "disenos" },
      { id: 34, name: "Simple Con Barba", price: "$50.00", image: "./images/diseño/114.jpg", category: "disenos" },
      { id: 35, name: "Diseño Personalizado", price: "$150.00", image: "./images/diseño/116.jpg", category: "disenos" },
      { id: 36, name: "3 Rayas En Cola", price: "$100.00", image: "./images/diseño/117.jpg", category: "disenos" },
      { id: 37, name: "2 Raya Corta Lateral", price: "$50.00", image: "./images/diseño/118.jpg", category: "disenos" },
      { id: 38, name: "Diseño Personalizado", price: "$150.00", image: "./images/diseño/119.jpg", category: "disenos" },
      { id: 39, name: "2 Rallas Desde Cejas", price: "$150.00", image: "./images/diseño/121.jpg", category: "disenos" },
      { id: 40, name: "Diseño En Cola", price: "$50.00", image: "./images/diseño/123.jpg", category: "disenos" },
      { id: 41, name: "Diseño Simple", price: "$50.00", image: "./images/diseño/124.jpg", category: "disenos" },
      { id: 42, name: "Granada", price: "$150.00", image: "./images/diseño/130.jpg", category: "disenos" },
      { id: 43, name: "Raya Cortada", price: "$100.00", image: "./images/diseño/132.jpg", category: "disenos" },
      { id: 44, name: "Diseño Personalizado", price: "$150.00", image: "./images/diseño/134.jpg", category: "disenos" },
      { id: 45, name: "Curba En Cola", price: "$50.00", image: "./images/diseño/135.jpg", category: "disenos" },
      { id: 46, name: "Diseño Personalizado", price: "$150.00", image: "./images/diseño/136.jpg", category: "disenos" },
      { id: 47, name: "Diseño Clásico", price: "$100.00", image: "./images/diseño/138.jpg", category: "disenos" },
      { id: 48, name: "4 Rayas", price: "$50.00", image: "./images/diseño/139.jpg", category: "disenos" },
      { id: 49, name: "Diseño Simple", price: "$50.00", image: "./images/diseño/145.jpg", category: "disenos" },
      { id: 50, name: "PLuma de Gaviota", price: "$200.00", image: "./images/diseño/147.jpg", category: "disenos" },
      { id: 51, name: "3 Rayas", price: "$100.00", image: "./images/diseño/151.jpg", category: "disenos" },
    ],
    barba: [
      { id: 1, name: "Degradada Corta", price: "$50.00", image: "./images/barba/002.jpg", category: "barba" },
      { id: 2, name: "Degradada Larga", price: "$50.00", image: "./images/barba/010.jpg", category: "barba" },
      { id: 3, name: "Degradada Media", price: "$50.00", image: "./images/barba/012.jpg", category: "barba" },
      { id: 4, name: "Corte Recto", price: "$50.00", image: "./images/barba/022.jpg", category: "barba" },
      { id: 5, name: "Barba Perfilada", price: "$50.00", image: "./images/barba/026.jpg", category: "barba" },
      { id: 6, name: "Barba Completa", price: "$50.00", image: "./images/barba/029.jpg", category: "barba" },
      { id: 7, name: "Barba Degradada", price: "$100.00", image: "./images/barba/043.jpg", category: "barba" },
      { id: 8, name: "Barba Con Diseño", price: "$100.00", image: "./images/barba/048.jpg", category: "barba" },
      { id: 9, name: "Barba Simple", price: "$50.00", image: "./images/barba/052.jpg", category: "barba" },
      { id: 10, name: "Bigote y Chivo", price: "$50.00", image: "./images/barba/065.jpg", category: "barba" },
      { id: 11, name: "Barba Completa", price: "$50.00", image: "./images/barba/073.jpg", category: "barba" },
      { id: 12, name: "Barba Cerrada", price: "$50.00", image: "./images/barba/081.jpg", category: "barba" },
      { id: 13, name: "Barba Degradada", price: "$50.00", image: "./images/barba/096.jpg", category: "barba" },
      { id: 14, name: "Barba Completa", price: "$50.00", image: "./images/barba/102.jpg", category: "barba" },
      { id: 15, name: "Degradada Larga", price: "$50.00", image: "./images/barba/107.jpg", category: "barba" },
      { id: 16, name: "Barba Completa", price: "$50.00", image: "./images/barba/113.jpg", category: "barba" },
      { id: 17, name: "Sombra de Barba", price: "$50.00", image: "./images/barba/150.jpg", category: "barba" },
      { id: 18, name: "Sombra de Barba", price: "$50.00", image: "./images/barba/160.jpg", category: "barba" },
      { id: 19, name: "Candado", price: "$50.00", image: "./images/barba/162.jpg", category: "barba" },
      { id: 20, name: "Bigote y Chivo", price: "$50.00", image: "./images/barba/167.jpg", category: "barba" },
      { id: 21, name: "Patilla Fina", price: "$50.00", image: "./images/barba/169.jpg", category: "barba" },
      { id: 22, name: "Barba Tupida", price: "$50.00", image: "./images/barba/173.jpg", category: "barba" },
      { id: 23, name: "Barba Degradada", price: "$50.00", image: "./images/barba/174.jpg", category: "barba" },
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
        <div className="modal active" onClick={closeModal}>
          <span className="modal-close" onClick={closeModal}>
            &times;
          </span>
          <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
            <div className="modal-image-container">
              <img className="modal-content" src={selectedImage.image || "/placeholder.svg"} alt={selectedImage.name} />
            </div>
            <div className="modal-info">
              <h2 className="modal-title">{selectedImage.name}</h2>
              <p className="modal-price">{selectedImage.price}</p>
              <p className="modal-description">{getDescription(selectedImage.category, selectedImage.name)}</p>
              <button className="modal-reserve-btn" onClick={handleReservation}>
                Reservar Ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery
