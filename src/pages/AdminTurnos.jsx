"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import "./AdminTurnos.css"

function AdminTurnos() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState("lista")
  const [scanning, setScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)
  const [manualCode, setManualCode] = useState("")
  const [turnos, setTurnos] = useState([
    {
      id: "622",
      service: "Barbería-diseño-de-barba",
      date: "domingo, 8 de junio de 2025",
      time: "09:00 - 09:30",
      client: {
        name: "Carlos Rodríguez",
        dni: "34567890",
        phone: "123456789",
        email: "carlos@example.com",
      },
      paymentMethod: "Efectivo",
      status: "pendiente",
    },
    {
      id: "623",
      service: "Corte-fade-moderno",
      date: "lunes, 9 de junio de 2025",
      time: "10:00 - 10:30",
      client: {
        name: "Juan Pérez",
        dni: "23456789",
        phone: "987654321",
        email: "juan@example.com",
      },
      paymentMethod: "Tarjeta",
      status: "completado",
    },
    {
      id: "624",
      service: "Corte-infantil",
      date: "lunes, 9 de junio de 2025",
      time: "11:00 - 11:30",
      client: {
        name: "María López",
        dni: "12345678",
        phone: "456789123",
        email: "maria@example.com",
      },
      paymentMethod: "Transferencia",
      status: "cancelado",
    },
  ])

  const [selectedTurno, setSelectedTurno] = useState(null)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  const handleManualCodeSubmit = () => {
    if (!manualCode.trim()) return

    try {
      const parsedData = JSON.parse(manualCode)
      setScanResult(parsedData)
      setScanning(false)

      // Buscar el turno en la lista
      const turno = turnos.find((t) => t.id === parsedData.booking)
      if (turno) {
        setSelectedTurno(turno)
      }
    } catch (error) {
      console.error("Error al procesar el código:", error)
      setScanResult({
        error: "Código inválido",
      })
    }
  }

  const handleTurnoClick = (turno) => {
    setSelectedTurno(turno)
  }

  const handleStatusChange = (id, newStatus) => {
    setTurnos(turnos.map((turno) => (turno.id === id ? { ...turno, status: newStatus } : turno)))

    if (selectedTurno && selectedTurno.id === id) {
      setSelectedTurno({ ...selectedTurno, status: newStatus })
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "pendiente":
        return "status-pending"
      case "completado":
        return "status-completed"
      case "cancelado":
        return "status-cancelled"
      default:
        return ""
    }
  }

  return (
    <div className="admin-turnos-page">
      <Sidebar activeSection="Turnos" />

      <div className="admin-turnos-content">
        <div className="admin-header">
          <h1>Gestión de Turnos</h1>
          <div className="admin-tabs">
            <button
              className={`admin-tab ${activeTab === "lista" ? "active" : ""}`}
              onClick={() => setActiveTab("lista")}
            >
              <i className="material-icons">list</i>
              Lista de Turnos
            </button>
            <button
              className={`admin-tab ${activeTab === "scanner" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("scanner")
                setScanning(true)
                setScanResult(null)
              }}
            >
              <i className="material-icons">qr_code_scanner</i>
              Verificar Código
            </button>
          </div>
        </div>

        <div className="admin-content">
          {activeTab === "lista" ? (
            <div className="turnos-list-container">
              <div className="turnos-list">
                <div className="turnos-list-header">
                  <div className="turno-id">ID</div>
                  <div className="turno-service">Servicio</div>
                  <div className="turno-date">Fecha</div>
                  <div className="turno-client">Cliente</div>
                  <div className="turno-status">Estado</div>
                </div>

                {turnos.map((turno) => (
                  <div
                    key={turno.id}
                    className={`turno-item ${selectedTurno?.id === turno.id ? "selected" : ""}`}
                    onClick={() => handleTurnoClick(turno)}
                  >
                    <div className="turno-id">{turno.id}</div>
                    <div className="turno-service">{turno.service.replace(/-/g, " ")}</div>
                    <div className="turno-date">{turno.date}</div>
                    <div className="turno-client">{turno.client.name}</div>
                    <div className={`turno-status ${getStatusClass(turno.status)}`}>{turno.status}</div>
                  </div>
                ))}
              </div>

              {selectedTurno && (
                <div className="turno-details">
                  <h2>Detalles del Turno</h2>

                  <div className="detail-section">
                    <h3>Información del Turno</h3>
                    <div className="detail-row">
                      <span className="detail-label">ID:</span>
                      <span className="detail-value">{selectedTurno.id}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Servicio:</span>
                      <span className="detail-value">{selectedTurno.service.replace(/-/g, " ")}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Fecha:</span>
                      <span className="detail-value">{selectedTurno.date}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Hora:</span>
                      <span className="detail-value">{selectedTurno.time}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Estado:</span>
                      <span className={`detail-value status-value ${getStatusClass(selectedTurno.status)}`}>
                        {selectedTurno.status}
                      </span>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>Información del Cliente</h3>
                    <div className="detail-row">
                      <span className="detail-label">Nombre:</span>
                      <span className="detail-value">{selectedTurno.client.name}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">DNI:</span>
                      <span className="detail-value">{selectedTurno.client.dni}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Teléfono:</span>
                      <span className="detail-value">{selectedTurno.client.phone}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">{selectedTurno.client.email}</span>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>Información de Pago</h3>
                    <div className="detail-row">
                      <span className="detail-label">Método:</span>
                      <span className="detail-value">{selectedTurno.paymentMethod}</span>
                    </div>
                  </div>

                  <div className="turno-actions">
                    <button
                      className={`action-btn complete-btn ${selectedTurno.status === "completado" ? "active" : ""}`}
                      onClick={() => handleStatusChange(selectedTurno.id, "completado")}
                    >
                      <i className="material-icons">check_circle</i>
                      Completar
                    </button>
                    <button
                      className={`action-btn cancel-btn ${selectedTurno.status === "cancelado" ? "active" : ""}`}
                      onClick={() => handleStatusChange(selectedTurno.id, "cancelado")}
                    >
                      <i className="material-icons">cancel</i>
                      Cancelar
                    </button>
                    <button
                      className={`action-btn pending-btn ${selectedTurno.status === "pendiente" ? "active" : ""}`}
                      onClick={() => handleStatusChange(selectedTurno.id, "pendiente")}
                    >
                      <i className="material-icons">schedule</i>
                      Pendiente
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="scanner-container">
              {scanning ? (
                <div className="manual-scanner">
                  <h2>Verificar Código de Turno</h2>
                  <div className="scanner-wrapper">
                    <div className="manual-input-container">
                      <label htmlFor="manual-code">Ingresa el código del turno:</label>
                      <textarea
                        id="manual-code"
                        value={manualCode}
                        onChange={(e) => setManualCode(e.target.value)}
                        placeholder='Pega aquí el código JSON del turno, por ejemplo:
{"booking":"622","service":"Barbería-diseño-de-barba","date":"domingo, 8 de junio de 2025","time":"09:00 - 09:30","client":{"name":"Carlos Rodríguez","dni":"34567890","phone":"123456789","email":"carlos@example.com"}}'
                        rows={6}
                        className="manual-code-input"
                      />
                      <button className="verify-btn" onClick={handleManualCodeSubmit}>
                        <i className="material-icons">check</i>
                        Verificar Código
                      </button>
                    </div>
                  </div>
                  <button
                    className="cancel-scan-btn"
                    onClick={() => {
                      setScanning(false)
                      setScanResult(null)
                      setManualCode("")
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className="scan-result">
                  {scanResult ? (
                    scanResult.error ? (
                      <div className="scan-error">
                        <i className="material-icons error-icon">error</i>
                        <h3>Error al verificar</h3>
                        <p>{scanResult.error}</p>
                        <button
                          className="retry-btn"
                          onClick={() => {
                            setScanning(true)
                            setScanResult(null)
                            setManualCode("")
                          }}
                        >
                          Intentar de nuevo
                        </button>
                      </div>
                    ) : (
                      <div className="scan-success">
                        <i className="material-icons success-icon">check_circle</i>
                        <h3>Código verificado correctamente</h3>

                        {selectedTurno ? (
                          <div className="scanned-turno">
                            <div className="detail-row">
                              <span className="detail-label">ID:</span>
                              <span className="detail-value">{scanResult.booking}</span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label">Servicio:</span>
                              <span className="detail-value">{scanResult.service}</span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label">Cliente:</span>
                              <span className="detail-value">{scanResult.client.name}</span>
                            </div>
                            <div className="detail-row">
                              <span className="detail-label">Estado:</span>
                              <span className={`detail-value status-value ${getStatusClass(selectedTurno.status)}`}>
                                {selectedTurno.status}
                              </span>
                            </div>

                            <div className="turno-actions">
                              <button
                                className={`action-btn complete-btn ${selectedTurno.status === "completado" ? "active" : ""}`}
                                onClick={() => handleStatusChange(selectedTurno.id, "completado")}
                              >
                                <i className="material-icons">check_circle</i>
                                Completar
                              </button>
                              <button
                                className={`action-btn cancel-btn ${selectedTurno.status === "cancelado" ? "active" : ""}`}
                                onClick={() => handleStatusChange(selectedTurno.id, "cancelado")}
                              >
                                <i className="material-icons">cancel</i>
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="turno-not-found">
                            <i className="material-icons warning-icon">warning</i>
                            <p>No se encontró el turno en el sistema</p>
                          </div>
                        )}

                        <button
                          className="scan-again-btn"
                          onClick={() => {
                            setScanning(true)
                            setScanResult(null)
                            setManualCode("")
                          }}
                        >
                          Verificar otro código
                        </button>
                      </div>
                    )
                  ) : (
                    <div className="start-scan">
                      <i className="material-icons scan-icon">qr_code_scanner</i>
                      <h3>Verificar código de turno</h3>
                      <p>Haz clic en el botón para comenzar a verificar un código de turno</p>
                      <button className="start-scan-btn" onClick={() => setScanning(true)}>
                        Iniciar verificación
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminTurnos
