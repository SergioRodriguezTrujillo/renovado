"use client"

import { useState } from "react"
import "./ContactManager.css"

function ContactManager() {
  const [contactInfo, setContactInfo] = useState({
    address: "Calle Moncada #224 % Callamo & Cisnero",
    phone: "+53 54959570",
    email: "sistema@gmail.com",
    whatsapp: "54959570",
    schedule: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "09:00", close: "17:00", closed: false },
      sunday: { open: "09:00", close: "17:00", closed: true },
    },
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
    },
  })

  const [isEditing, setIsEditing] = useState(false)

  const dayNames = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
  }

  const handleInputChange = (field, value) => {
    setContactInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleScheduleChange = (day, field, value) => {
    setContactInfo((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: {
          ...prev.schedule[day],
          [field]: value,
        },
      },
    }))
  }

  const handleSocialMediaChange = (platform, value) => {
    setContactInfo((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value,
      },
    }))
  }

  const handleSave = () => {
    // Aquí se guardarían los cambios en la base de datos
    setIsEditing(false)
    alert("Información de contacto actualizada correctamente")
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Aquí se restaurarían los valores originales
  }

  return (
    <div className="contact-manager">
      <div className="manager-header">
        <h2>Información de Contacto</h2>
        <div className="header-actions">
          {!isEditing ? (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              <i className="material-icons">edit</i>
              Editar
            </button>
          ) : (
            <div className="edit-actions">
              <button className="cancel-btn" onClick={handleCancel}>
                <i className="material-icons">close</i>
                Cancelar
              </button>
              <button className="save-btn" onClick={handleSave}>
                <i className="material-icons">save</i>
                Guardar
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="contact-sections">
        {/* Información básica */}
        <div className="contact-section">
          <h3>
            <i className="material-icons">info</i>
            Información Básica
          </h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Dirección</label>
              {isEditing ? (
                <input
                  type="text"
                  value={contactInfo.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              ) : (
                <p>{contactInfo.address}</p>
              )}
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              {isEditing ? (
                <input
                  type="text"
                  value={contactInfo.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              ) : (
                <p>{contactInfo.phone}</p>
              )}
            </div>
            <div className="form-group">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              ) : (
                <p>{contactInfo.email}</p>
              )}
            </div>
            <div className="form-group">
              <label>WhatsApp</label>
              {isEditing ? (
                <input
                  type="text"
                  value={contactInfo.whatsapp}
                  onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                />
              ) : (
                <p>{contactInfo.whatsapp}</p>
              )}
            </div>
          </div>
        </div>

        {/* Horarios */}
        <div className="contact-section">
          <h3>
            <i className="material-icons">schedule</i>
            Horarios de Atención
          </h3>
          <div className="schedule-grid">
            {Object.entries(contactInfo.schedule).map(([day, schedule]) => (
              <div key={day} className="schedule-item">
                <div className="day-name">{dayNames[day]}</div>
                {isEditing ? (
                  <div className="schedule-controls">
                    <label className="closed-checkbox">
                      <input
                        type="checkbox"
                        checked={schedule.closed}
                        onChange={(e) => handleScheduleChange(day, "closed", e.target.checked)}
                      />
                      Cerrado
                    </label>
                    {!schedule.closed && (
                      <div className="time-inputs">
                        <input
                          type="time"
                          value={schedule.open}
                          onChange={(e) => handleScheduleChange(day, "open", e.target.value)}
                        />
                        <span>-</span>
                        <input
                          type="time"
                          value={schedule.close}
                          onChange={(e) => handleScheduleChange(day, "close", e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="schedule-display">
                    {schedule.closed ? (
                      <span className="closed">Cerrado</span>
                    ) : (
                      <span>
                        {schedule.open} - {schedule.close}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Redes sociales */}
        <div className="contact-section">
          <h3>
            <i className="material-icons">share</i>
            Redes Sociales
          </h3>
          <div className="form-grid">
            <div className="form-group">
              <label>
                <i className="material-icons">facebook</i>
                Facebook
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={contactInfo.socialMedia.facebook}
                  onChange={(e) => handleSocialMediaChange("facebook", e.target.value)}
                  placeholder="https://facebook.com/tu-pagina"
                />
              ) : (
                <p>{contactInfo.socialMedia.facebook || "No configurado"}</p>
              )}
            </div>
            <div className="form-group">
              <label>
                <i className="material-icons">camera_alt</i>
                Instagram
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={contactInfo.socialMedia.instagram}
                  onChange={(e) => handleSocialMediaChange("instagram", e.target.value)}
                  placeholder="https://instagram.com/tu-perfil"
                />
              ) : (
                <p>{contactInfo.socialMedia.instagram || "No configurado"}</p>
              )}
            </div>
            <div className="form-group">
              <label>
                <i className="material-icons">alternate_email</i>
                Twitter
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={contactInfo.socialMedia.twitter}
                  onChange={(e) => handleSocialMediaChange("twitter", e.target.value)}
                  placeholder="https://twitter.com/tu-perfil"
                />
              ) : (
                <p>{contactInfo.socialMedia.twitter || "No configurado"}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactManager
