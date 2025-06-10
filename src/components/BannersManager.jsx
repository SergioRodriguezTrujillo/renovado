"use client"

import { useState } from "react"
import "./BannersManager.css"

function BannersManager() {
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: "Promoción Especial",
      description: "20% de descuento en todos los servicios",
      image: "/placeholder.svg?height=200&width=400",
      active: true,
      position: "hero",
    },
    {
      id: 2,
      title: "Nuevo Servicio",
      description: "Ahora ofrecemos tratamientos capilares",
      image: "/placeholder.svg?height=200&width=400",
      active: false,
      position: "sidebar",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    position: "hero",
  })

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      position: "hero",
    })
    setEditingBanner(null)
  }

  const openModal = (banner = null) => {
    if (banner) {
      setFormData({
        title: banner.title,
        description: banner.description,
        image: banner.image,
        position: banner.position,
      })
      setEditingBanner(banner)
    } else {
      resetForm()
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const bannerData = {
      ...formData,
      active: true,
    }

    if (editingBanner) {
      setBanners((prev) =>
        prev.map((banner) => (banner.id === editingBanner.id ? { ...banner, ...bannerData } : banner)),
      )
    } else {
      const newBanner = {
        id: Date.now(),
        ...bannerData,
      }
      setBanners((prev) => [...prev, newBanner])
    }

    closeModal()
  }

  const handleDelete = (bannerId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este banner?")) {
      setBanners((prev) => prev.filter((banner) => banner.id !== bannerId))
    }
  }

  const toggleBannerStatus = (bannerId) => {
    setBanners((prev) =>
      prev.map((banner) => (banner.id === bannerId ? { ...banner, active: !banner.active } : banner)),
    )
  }

  return (
    <div className="banners-manager">
      <div className="manager-header">
        <h2>Gestión de Banners</h2>
        <button className="add-btn" onClick={() => openModal()}>
          <i className="material-icons">add</i>
          Nuevo Banner
        </button>
      </div>

      <div className="banners-grid">
        {banners.map((banner) => (
          <div key={banner.id} className="banner-card">
            <div className="banner-image">
              <img src={banner.image || "/placeholder.svg"} alt={banner.title} />
              <div className="banner-overlay">
                <div className="banner-actions">
                  <button className="edit-btn" onClick={() => openModal(banner)}>
                    <i className="material-icons">edit</i>
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(banner.id)}>
                    <i className="material-icons">delete</i>
                  </button>
                </div>
              </div>
            </div>
            <div className="banner-info">
              <h3>{banner.title}</h3>
              <p>{banner.description}</p>
              <div className="banner-meta">
                <span className={`position-tag ${banner.position}`}>
                  {banner.position === "hero" ? "Principal" : "Lateral"}
                </span>
                <button
                  className={`status-btn ${banner.active ? "active" : "inactive"}`}
                  onClick={() => toggleBannerStatus(banner.id)}
                >
                  {banner.active ? "Activo" : "Inactivo"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {banners.length === 0 && (
        <div className="empty-state">
          <i className="material-icons">image</i>
          <p>No hay banners creados</p>
          <button className="add-first-btn" onClick={() => openModal()}>
            Crear primer banner
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingBanner ? "Editar Banner" : "Nuevo Banner"}</h3>
              <button className="close-btn" onClick={closeModal}>
                <i className="material-icons">close</i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="banner-form">
              <div className="form-group">
                <label>Título del banner</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label>URL de imagen</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>

              <div className="form-group">
                <label>Posición</label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                >
                  <option value="hero">Principal</option>
                  <option value="sidebar">Lateral</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="save-btn">
                  {editingBanner ? "Actualizar" : "Crear"} Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default BannersManager
