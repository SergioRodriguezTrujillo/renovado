"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import "./Login.css"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (login(email, password)) {
      navigate("/dashboard")
    } else {
      setError("Credenciales incorrectas")
    }
  }

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="login-container">
          <div className="login-card">
            <div className="login-avatar">
              <i className="material-icons">admin_panel_settings</i>
            </div>
            <h2 className="login-title">Panel de Administración</h2>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group password-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  <i className="material-icons">{showPassword ? "visibility_off" : "visibility"}</i>
                </button>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="login-button">
                <span>Iniciar Sesión</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
