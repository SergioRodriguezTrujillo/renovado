"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import RouletteGame from "./RouletteGame"
import InstallModal from "./InstallModal"
import "./Header.css"

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showRoulette, setShowRoulette] = useState(false)
  const [showInstallModal, setShowInstallModal] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    document.body.style.overflow = menuOpen ? "" : "hidden"
  }

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ""
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const handleAdminClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard")
    } else {
      navigate("/login")
    }
    closeMenu()
  }

  const handleJugarClick = () => {
    setShowRoulette(true)
    closeMenu()
  }

  const handleInstalarClick = () => {
    setShowInstallModal(true)
    closeMenu()
  }

  const menuItems = [
    { path: "/", label: "Inicio", icon: "home" },
    { path: "/galeria", label: "Galería", icon: "photo_library" },
    { path: "/reserva", label: "Reservar Turno", icon: "event_note" },
    { path: "/jugar", label: "Jugar", icon: "casino" },
    { path: "/instalar", label: "Instalar", icon: "download" },
    { path: "/admin", label: "Administración", icon: "admin_panel_settings" },
  ]

  return (
    <>
      <header className="main-header">
        <div className="container header-container">
          <div className="logo-container">
            <img src="./images/logo 1.jpg" alt="Logo Renovado" className="logo-img" />
            <h1 className="header-title">Renovados</h1>
          </div>
          <button className="menu-toggle" aria-label="Abrir menú" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </header>

      <nav className={`menu ${menuOpen ? "active" : ""}`}>
        <div className="menu-header">
          <h2>Menú Principal</h2>
          <button className="menu-close" aria-label="Cerrar menú" onClick={closeMenu}>
            ✕
          </button>
        </div>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`menu-link ${location.pathname === item.path ? "active" : ""}`}
                onClick={(e) => {
                  if (item.path === "/jugar") {
                    e.preventDefault()
                    handleJugarClick()
                  } else if (item.path === "/instalar") {
                    e.preventDefault()
                    handleInstalarClick()
                  } else if (item.path === "/admin") {
                    e.preventDefault()
                    handleAdminClick()
                  } else {
                    closeMenu()
                  }
                }}
              >
                <i className="material-icons">{item.icon}</i>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {menuOpen && <div className="overlay active" onClick={closeMenu}></div>}

      {showRoulette && (
        <RouletteGame
          onClose={() => setShowRoulette(false)}
          onWin={() => {
            setShowRoulette(false)
            // Aquí puedes añadir lógica adicional para manejar el premio
          }}
        />
      )}

      {showInstallModal && <InstallModal onClose={() => setShowInstallModal(false)} type="main" />}
    </>
  )
}

export default Header
