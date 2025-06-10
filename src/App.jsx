import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { BookingProvider } from "./contexts/BookingContext"
import { ServiceProvider } from "./contexts/ServiceContext"
import { UserProvider } from "./contexts/UserContext"
import Home from "./pages/Home"
import Gallery from "./pages/Gallery"
import BookingPage from "./pages/BookingPage"
import ReservaPage from "./pages/ReservaPage"
import ServiceDetail from "./pages/ServiceDetail"
import BookingConfirmation from "./pages/BookingConfirmation"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import AdminTurnos from "./pages/AdminTurnos"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ServiceProvider>
          <BookingProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/galeria" element={<Gallery />} />
                  <Route path="/booking" element={<BookingPage />} />
                  <Route path="/reserva" element={<ReservaPage />} />
                  <Route path="/service/:id" element={<ServiceDetail />} />
                  <Route path="/confirmation" element={<BookingConfirmation />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/admin/turnos" element={<AdminTurnos />} />
                </Routes>
              </div>
            </Router>
          </BookingProvider>
        </ServiceProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default App
