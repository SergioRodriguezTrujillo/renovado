"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Footer.css"

function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img
                src="/images/logo 1.jpg"
                alt="Logo Barbería Cristiana Renovados"
                className="footer-logo-img"
              />
              <h2>Renovados</h2>
            </div>
            <p className="footer-description">
              Barbería Cristiana donde renovamos tu imagen y fortalecemos tu espíritu. Ofrecemos servicios de calidad
              con valores cristianos.
            </p>
            <p className="bible-verse">
              "Crea en mí, oh Dios, un corazón limpio, y renueva un espíritu recto dentro de mí." - Salmo 51:10
            </p>
          </div>

          <div className="footer-section">
            <h3>Enlaces Rápidos</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/galeria">Galería</Link>
              </li>
              <li>
                <Link to="/reserva">Reservar Turno</Link>
              </li>
              <li>
                <Link to="/dashboard">Administración</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contacto</h3>
            <div className="contact-info">
              <p>
                <i className="material-icons">location_on</i>
                Calle Moncada #224 % Callamo & Cisnero
              </p>
              <p>
                <i className="material-icons">phone</i>
                +53 54959570
              </p>
              <p>
                <i className="material-icons">email</i>
                sistema@gmail.com
              </p>
            </div>
            <div className="social-links">
              <a href="https://wa.me/54959570" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="material-icons">chat</i>
              </a>
              <a href="#" className="social-link">
                <i className="material-icons">camera_alt</i>
              </a>
              <a href="#" className="social-link">
                <i className="material-icons">facebook</i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Horarios</h3>
            <div className="footer-schedule">
              <div className="schedule-item">
                <span>Lunes - Viernes:</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="schedule-item">
                <span>Sábado:</span>
                <span>9:00 AM - 5:00 PM</span>
              </div>
              <div className="schedule-item">
                <span>Domingo:</span>
                <span>Cerrado</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>"Renueva tu imagen, fortalece tu espíritu"</p>
          <p className="copyright">© {currentYear} Renovados - Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
