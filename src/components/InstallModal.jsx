"use client"

import { useState, useEffect } from "react"
import "./InstallModal.css"

function InstallModal({ onClose, type = "main" }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [canInstall, setCanInstall] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setCanInstall(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // Fallback para navegadores que no soportan PWA
      alert(
        "Para instalar esta aplicación:\n\n1. En Chrome: Menú → Más herramientas → Crear acceso directo\n2. En Safari: Compartir → Añadir a pantalla de inicio\n3. En Firefox: Menú → Instalar",
      )
      onClose()
      return
    }

    try {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === "accepted") {
        console.log("Usuario aceptó la instalación")
      } else {
        console.log("Usuario rechazó la instalación")
      }

      setDeferredPrompt(null)
      setCanInstall(false)
      onClose()
    } catch (error) {
      console.error("Error durante la instalación:", error)
      onClose()
    }
  }

  const getModalContent = () => {
    if (type === "admin") {
      return {
        title: "🔧 Instalar Panel de Administración",
        description: "Instala el panel de administración como una aplicación independiente en tu dispositivo.",
        features: [
          "Acceso rápido al panel de administración",
          "Funciona sin conexión a internet",
          "Notificaciones de nuevas reservas",
          "Interfaz optimizada para administradores",
        ],
        icon: "admin_panel_settings",
      }
    } else {
      return {
        title: "📱 Instalar Barbería Renovados",
        description: "Instala nuestra aplicación en tu dispositivo para una experiencia más rápida y cómoda.",
        features: [
          "Acceso rápido desde tu pantalla de inicio",
          "Funciona sin conexión a internet",
          "Reserva turnos más fácilmente",
          "Recibe notificaciones de confirmación",
        ],
        icon: "local_fire_department",
      }
    }
  }

  const content = getModalContent()

  return (
    <div className="install-modal-overlay" onClick={onClose}>
      <div className="install-modal" onClick={(e) => e.stopPropagation()}>
        <div className="install-modal-header">
          <div className="install-icon">
            <i className="material-icons">{content.icon}</i>
          </div>
          <h2>{content.title}</h2>
          <button className="close-install-modal" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="install-modal-content">
          <p className="install-description">{content.description}</p>

          <div className="install-features">
            <h3>Beneficios de la instalación:</h3>
            <ul>
              {content.features.map((feature, index) => (
                <li key={index}>
                  <i className="material-icons">check_circle</i>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="install-preview">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="app-icon">
                  <i className="material-icons">{content.icon}</i>
                </div>
                <div className="app-name">{type === "admin" ? "Admin Panel" : "Renovados"}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="install-modal-actions">
          <button className="cancel-install" onClick={onClose}>
            Cancelar
          </button>
          <button className="confirm-install" onClick={handleInstall}>
            <i className="material-icons">download</i>
            Instalar Aplicación
          </button>
        </div>

        {!canInstall && (
          <div className="install-note">
            <i className="material-icons">info</i>
            <span>
              La instalación automática no está disponible en este navegador. Se mostrarán instrucciones manuales.
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default InstallModal
