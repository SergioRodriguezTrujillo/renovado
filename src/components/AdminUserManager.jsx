"use client"

import { useState } from "react"
import { useUser } from "../contexts/UserContext"
import "./AdminUserManager.css"

function AdminUserManager() {
  const { users, createUser, updateUser, deleteUser, toggleUserStatus } = useUser()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "cliente",
  })

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "cliente",
    })
    setEditingUser(null)
  }

  const openModal = (user = null) => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
      })
      setEditingUser(user)
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

    if (editingUser) {
      updateUser(editingUser.id, formData)
    } else {
      createUser(formData)
    }

    closeModal()
  }

  const handleDelete = (userId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      deleteUser(userId)
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case "administración":
        return "red"
      case "colaborador":
        return "orange"
      case "cliente":
        return "blue"
      default:
        return "gray"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES")
  }

  return (
    <div className="admin-user-manager">
      <div className="manager-header">
        <h2>Gestión de Usuarios</h2>
        <button className="add-btn" onClick={() => openModal()}>
          <i className="material-icons">person_add</i>
          Nuevo Usuario
        </button>
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Fecha de registro</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-avatar">{user.avatar}</div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${getRoleColor(user.role)}`}>{user.role}</span>
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td>
                  <button
                    className={`status-btn ${user.active ? "active" : "inactive"}`}
                    onClick={() => toggleUserStatus(user.id)}
                  >
                    {user.active ? "Activo" : "Inactivo"}
                  </button>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn" onClick={() => openModal(user)}>
                      <i className="material-icons">edit</i>
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(user.id)}>
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
              <h3>{editingUser ? "Editar Usuario" : "Nuevo Usuario"}</h3>
              <button className="close-btn" onClick={closeModal}>
                <i className="material-icons">close</i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="user-form">
              <div className="form-group">
                <label>Nombre completo</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Rol</label>
                <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                  <option value="cliente">Cliente</option>
                  <option value="colaborador">Colaborador</option>
                  <option value="administración">Administración</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="save-btn">
                  {editingUser ? "Actualizar" : "Crear"} Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUserManager
