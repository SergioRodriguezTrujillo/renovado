"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Sidebar from "../components/Sidebar"
import DashboardContent from "../components/DashboardContent"
import "./Dashboard.css"

function Dashboard() {
  const [activeSection, setActiveSection] = useState("Dashboard")
  const { logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Siempre redirigir al login si no está autenticado
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, navigate])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  // Mostrar pantalla de carga mientras verifica autenticación
  if (!isAuthenticated) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#f5f5f5",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "3px solid #1abcc4",
              borderTop: "3px solid transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }}
          ></div>
          <p style={{ color: "#666", fontSize: "16px" }}>Verificando acceso...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <Header />
      <div className="dashboard-wrapper">
        <div className="dashboard-sidebar">
          <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} onLogout={handleLogout} />
        </div>
        <div className="dashboard-content-area">
          <DashboardContent activeSection={activeSection} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard
