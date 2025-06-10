"use client"

import { useState } from "react"
import { useService } from "../contexts/ServiceContext"
import "./AdminServiceManager.css"

function AdminServiceManager() {
  const { services, categories, createService, updateService, deleteService, toggleServiceStatus } = useService()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "Barbería",
    gender: "Hombre",
    image: "",
  })

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      duration: "",
      category: "Barbería",
      gender: "Hombre",
      image: "",
    })
    setEditingService(null)
  }

  const openModal = (service = null) => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
        price: service.price.toString(),
        duration: service.duration.toString(),
        category: service.category,
        gender: service.gender,
        image: service.image,
      })
      setEditingService(service)
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

    const serviceData = {
      ...formData,
      price: Number.parseFloat(formData.price),
      duration: Number.parseInt(formData.duration),
    }

    if (editingService) {
      updateService(editingService.id, serviceData)
    } else {
      createService(serviceData)
    }

    closeModal()
  }

  const handleDelete = (serviceId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este servicio?")) {
      deleteService(serviceId)
    }
  }

  return (
    <div className="admin-service-manager">
      <div className="manager-header">
        <h2>Gestión de Servicios</h2>
        <button className="add-btn" onClick={() => openModal()}>
          <i className="material-icons">add</i>
          Nuevo Servicio
        </button>
      </div>

      <div className="services-table">
        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Duración</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>
                  <img src={service.image || "/placeholder.svg"} alt={service.name} className="service-thumb" />
                </td>
                <td>
                  <div className="service-info">
                    <strong>{service.name}</strong>
                    <p>{service.description.substring(0, 50)}...</p>
                  </div>
                </td>
                <td>
                  <span className="category-tag">{service.category}</span>
                </td>
                <td>${service.price}</td>
                <td>{service.duration} min</td>
                <td>
                  <button
                    className={`status-btn ${service.active ? "active" : "inactive"}`}
                    onClick={() => toggleServiceStatus(service.id)}
                  >
                    {service.active ? "Activo" : "Inactivo"}
                  </button>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn" onClick={() => openModal(service)}>
                      <i className="material-icons">edit</i>
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(service.id)}>
                      <i className="material-icons">delete</i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingService ? "Editar Servicio" : "Nuevo Servicio"}</h3>
              <button className="close-btn" onClick={closeModal}>
                <i className="material-icons">close</i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="service-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre del servicio</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Categoría</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories
                      .filter((cat) => cat !== "Todo")
                      .map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </div>
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

              <div className="form-row">
                <div className="form-group">
                  <label>Precio ($)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Duración (minutos)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Género</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <option value="Hombre">Hombre</option>
                    <option value="Mujer">Mujer</option>
                  </select>
                </div>
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

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="save-btn">
                  {editingService ? "Actualizar" : "Crear"} Servicio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminServiceManager
