"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./MobileMenu.css"

function MobileMenu({ isOpen, onClose }) {
  const navigate = useNavigate()
  const [activeSubmenu, setActiveSubmenu] = useState(null)

  const menuItems = [
    {
      title: "Inicio",
      icon: "home",
      action: () => {
        navigate("/")
        onClose()
      },
    },
    {
      title: "Servicios",
      icon: "room_service",
      submenu: [
        { title: "Barbería", category: "Barbería" },
        { title: "Belleza", category: "Belleza" },
        { title: "Estilismo", category: "Estilismo" },
        { title: "Uñas", category: "Uñas" },
      ],
    },
    {
      title: "Reservar",
      icon: "event_note",
      action: () => {
        // Scroll to services section
        onClose()
        setTimeout(() => {
          const servicesSection = document.querySelector(".service-grid-container")
          if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: "smooth" })
          }
        }, 100)
      },
    },
    {
      title: "Contacto",
      icon: "contact_phone",
      action: () => {
        onClose()
        setTimeout(() => {
          const footer = document.querySelector(".main-footer")
          if (footer) {
            footer.scrollIntoView({ behavior: "smooth" })
          }
        }, 100)
      },
    },
    {
      title: "Administración",
      icon: "admin_panel_settings",
      action: () => {
        navigate("/dashboard")
        onClose()
      },
    },
  ]

  const handleSubmenuToggle = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index)
  }

  const handleCategorySelect = (category) => {
    // Trigger category filter
    onClose()
    setTimeout(() => {
      // Dispatch custom event to update category filter
      window.dispatchEvent(new CustomEvent("categorySelect", { detail: category }))
      const servicesSection = document.querySelector(".service-grid-container")
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  if (!isOpen) return null

  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-menu-header">
          <div className="menu-logo">
            <i className="material-icons">local_fire_department</i>
            <span>Sistema de Turnos</span>
          </div>
          <button className="close-menu-btn" onClick={onClose}>
            <i className="material-icons">close</i>
          </button>
        </div>

        <div className="mobile-menu-content">
          {menuItems.map((item, index) => (
            <div key={index} className="menu-item">
              <button className="menu-item-btn" onClick={item.submenu ? () => handleSubmenuToggle(index) : item.action}>
                <i className="material-icons">{item.icon}</i>
                <span>{item.title}</span>
                {item.submenu && (
                  <i className={`material-icons submenu-arrow ${activeSubmenu === index ? "open" : ""}`}>
                    keyboard_arrow_down
                  </i>
                )}
              </button>

              {item.submenu && (
                <div className={`submenu ${activeSubmenu === index ? "open" : ""}`}>
                  {item.submenu.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      className="submenu-item"
                      onClick={() => handleCategorySelect(subItem.category)}
                    >
                      {subItem.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mobile-menu-footer">
          <div className="contact-info">
            <p>Salta, Argentina</p>
            <p>sistema@gmail.com</p>
          </div>
          <div className="social-links">
            <i className="material-icons">camera_alt</i>
            <i className="material-icons">chat</i>
            <i className="material-icons">facebook</i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
