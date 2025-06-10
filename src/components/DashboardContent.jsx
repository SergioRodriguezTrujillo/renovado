"use client"

import { useState } from "react"
import ChartsSection from "./ChartsSection"
import TurnosCalendar from "./TurnosCalendar"
import "./DashboardContent.css"

function DashboardContent() {
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [showTurnosCalendar, setShowTurnosCalendar] = useState(false)
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleAdminSubmit = (e) => {
    e.preventDefault()
    console.log("Nuevo administrador:", newAdmin)
    setShowAdminModal(false)
    setNewAdmin({ name: "", email: "", password: "" })
  }

  const handleTurnosClick = () => {
    setShowTurnosCalendar(true)
  }

  if (showTurnosCalendar) {
    return <TurnosCalendar onClose={() => setShowTurnosCalendar(false)} />
  }

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div className="search-bar">
          <i className="material-icons">search</i>
          <input type="text" placeholder="Buscar..." />
        </div>
        <div className="header-actions">
          <button className="action-btn install-btn">
            <i className="material-icons">get_app</i>
            Instalar PWA
          </button>
          <button className="action-btn qr-btn">
            <i className="material-icons">qr_code</i>
            Generar QR
          </button>
          <button className="action-btn admin-btn" onClick={() => setShowAdminModal(true)}>
            <i className="material-icons">person_add</i>
            Administrador
          </button>
        </div>
      </div>

      <div className="dashboard-main-content">
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="material-icons">people</i>
            </div>
            <div className="stat-info">
              <h3>Usuarios</h3>
              <div className="stat-number">9</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="material-icons">room_service</i>
            </div>
            <div className="stat-info">
              <h3>Servicios</h3>
              <div className="stat-number">14</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="material-icons">category</i>
            </div>
            <div className="stat-info">
              <h3>Categorías</h3>
              <div className="stat-number">8</div>
            </div>
          </div>

          <div className="stat-card" onClick={handleTurnosClick}>
            <div className="stat-icon">
              <i className="material-icons">event_note</i>
            </div>
            <div className="stat-info">
              <h3>Turnos</h3>
              <div className="stat-number">278</div>
            </div>
          </div>
        </div>

        <div className="recent-records">
          <h3>
            Últimos 5 registros
            <a href="#" className="ver-mas-link">
              Ver más
            </a>
          </h3>
          <table className="records-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>new</td>
                <td>new@gmail.com</td>
                <td className="role-admin">admin</td>
              </tr>
              <tr>
                <td>test</td>
                <td>test@gmail.com</td>
                <td className="role-colaborador">colaborador</td>
              </tr>
              <tr>
                <td>tobi</td>
                <td>tobi@gmail.com</td>
                <td className="role-colaborador">colaborador</td>
              </tr>
              <tr>
                <td>Erick</td>
                <td>erick@gmail.com</td>
                <td className="role-colaborador">colaborador</td>
              </tr>
              <tr>
                <td>Juan</td>
                <td>admin2@gmail.com</td>
                <td className="role-admin">admin</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="admin-profile">
          <div className="admin-avatar">a</div>
          <h4>admin</h4>
          <p>admin@gmail.com</p>
          <p className="role-admin">admin</p>
        </div>
      </div>

      <ChartsSection />

      {showAdminModal && (
        <div className="admin-manager-modal">
          <div className="admin-manager-content">
            <div className="admin-manager-header">
              <h2>Agregar Administrador</h2>
              <button className="close-btn" onClick={() => setShowAdminModal(false)}>
                <i className="material-icons">close</i>
              </button>
            </div>

            <form className="admin-form" onSubmit={handleAdminSubmit}>
              <div className="form-group">
                <label htmlFor="admin-name">Nombre completo</label>
                <input
                  type="text"
                  id="admin-name"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="admin-email">Correo electrónico</label>
                <input
                  type="email"
                  id="admin-email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="admin-password">Contraseña</label>
                <input
                  type="password"
                  id="admin-password"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowAdminModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-save">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardContent
