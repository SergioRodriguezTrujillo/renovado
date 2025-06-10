"use client"

import { useState, useEffect } from "react"
import InstallModal from "../components/InstallModal"
import "./InstalarPage.css"

function InstalarPage() {
  const [showInstallModal, setShowInstallModal] = useState(false)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Verificar si la app ya está instalada
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }

    // Verificar si la app es instalable
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setIsInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  return (
    <div className="instalar-page">
      <div className="container">
        <div className="instalar-hero">
          <h1>📱 Instalar Aplicación</h1>
          <p>Lleva Renovados siempre contigo en tu dispositivo</p>
        </div>

        <div className="install-options">
          <div className="install-card main-app">
            <div className="install-icon">📱</div>
            <h3>Aplicación Principal</h3>
            <p>
              Instala la aplicación completa de Renovados en tu dispositivo. Accede a todas las funciones sin conexión a
              internet.
            </p>

            <div className="features-list">
              <div className="feature">
                <i className="material-icons">check_circle</i>
                <span>Reservas de turnos</span>
              </div>
              <div className="feature">
                <i className="material-icons">check_circle</i>
                <span>Galería de trabajos</span>
              </div>
              <div className="feature">
                <i className="material-icons">check_circle</i>
                <span>Juegos y promociones</span>
              </div>
              <div className="feature">
                <i className="material-icons">check_circle</i>
                <span>Funciona sin internet</span>
              </div>
            </div>

            {isInstalled ? (
              <div className="installed-status">
                <i className="material-icons">check_circle</i>
                <span>¡Ya está instalada!</span>
              </div>
            ) : (
              <button className="install-button" onClick={() => setShowInstallModal(true)} disabled={!isInstallable}>
                <i className="material-icons">download</i>
                {isInstallable ? "Instalar Ahora" : "No Disponible"}
              </button>
            )}
          </div>

          <div className="install-card admin-app">
            <div className="install-icon">🔧</div>
            <h3>Panel de Administración</h3>
            <p>Versión especial para administradores. Gestiona tu barbería desde cualquier lugar.</p>

            <div className="features-list">
              <div className="feature">
                <i className="material-icons">check_circle</i>
                <span>Gestión de turnos</span>
              </div>
              <div className="feature">
                <i className="material-icons">check_circle</i>
                <span>Control de usuarios</span>
              </div>
              <div className="feature">
                <i className="material-icons">check_circle</i>
                <span>Estadísticas y reportes</span>
              </div>
              <div className="feature">
                <i className="material-icons">check_circle</i>
                <span>Configuración avanzada</span>
              </div>
            </div>

            <button className="install-button admin" onClick={() => setShowInstallModal(true)}>
              <i className="material-icons">admin_panel_settings</i>
              Instalar Panel Admin
            </button>
          </div>
        </div>

        <div className="install-benefits">
          <h2>🌟 Beneficios de Instalar</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">⚡</div>
              <h4>Acceso Rápido</h4>
              <p>Abre la app directamente desde tu pantalla de inicio</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📶</div>
              <h4>Sin Internet</h4>
              <p>Funciona incluso cuando no tienes conexión</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🔔</div>
              <h4>Notificaciones</h4>
              <p>Recibe alertas sobre tus reservas y promociones</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💾</div>
              <h4>Menos Espacio</h4>
              <p>Ocupa menos espacio que una app tradicional</p>
            </div>
          </div>
        </div>

        <div className="install-instructions">
          <h3>📋 Instrucciones de Instalación</h3>
          <div className="instructions-grid">
            <div className="instruction-card">
              <h4>📱 En Móvil</h4>
              <ol>
                <li>Haz clic en "Instalar Ahora"</li>
                <li>Confirma la instalación</li>
                <li>Busca el ícono en tu pantalla de inicio</li>
              </ol>
            </div>
            <div className="instruction-card">
              <h4>💻 En Escritorio</h4>
              <ol>
                <li>Busca el ícono de instalación en la barra de direcciones</li>
                <li>Haz clic en "Instalar"</li>
                <li>La app aparecerá en tu escritorio</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {showInstallModal && <InstallModal onClose={() => setShowInstallModal(false)} type="main" />}
    </div>
  )
}

export default InstalarPage
