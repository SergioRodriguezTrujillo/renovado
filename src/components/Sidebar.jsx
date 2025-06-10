"use client"
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import InstallModal from "./InstallModal"
import "./Sidebar.css"

function Sidebar({ activeSection, setActiveSection, onLogout }) {
  const { user } = useAuth()
  const [showInstallModal, setShowInstallModal] = useState(false)

  const menuItems = [
    { name: "Panel", icon: "dashboard" },
    { name: "Contacto", icon: "people" },
    { name: "Categorías", icon: "category" },
    { name: "Servicios", icon: "room_service" },
    { name: "Turnos", icon: "event_note" },
    { name: "Banners", icon: "image" },
    { name: "Usuarios", icon: "person" },
    { name: "Galería", icon: "photo_library" },
    { name: "Instalar", icon: "download", action: () => setShowInstallModal(true) },
  ]

  const handleMenuClick = (item) => {
    if (item.action) {
      item.action()
    } else {
      setActiveSection(item.name)
    }
  }

  return (
    <>
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <div className="user-info">
            <div className="user-avatar">
              <i className="material-icons">local_fire_department</i>
            </div>
            <div className="user-details">
              <h3>{user?.name || "admin"}</h3>
              <p>{user?.email || "admin@gmail.com"}</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${activeSection === item.name ? "active" : ""}`}
              onClick={() => handleMenuClick(item)}
            >
              <i className="material-icons">{item.icon}</i>
              <span>{item.name}</span>
            </button>
          ))}

          <button className="nav-item logout-btn" onClick={onLogout}>
            <i className="material-icons">exit_to_app</i>
            <span>Salir</span>
          </button>
        </nav>
      </div>

      {showInstallModal && <InstallModal onClose={() => setShowInstallModal(false)} type="admin" />}
    </>
  )
}

export default Sidebar
