"use client"

import { useState, useEffect } from "react"
import "./GalleryManager.css"

function GalleryManager() {
  const [sections, setSections] = useState([
    { id: 1, name: "Cortes para Niños", slug: "ninos", items: [] },
    { id: 2, name: "Cortes Clásicos", slug: "clasicos", items: [] },
    { id: 3, name: "Degradados", slug: "degradados", items: [] },
    { id: 4, name: "Afro", slug: "afro", items: [] },
    { id: 5, name: "Diseños", slug: "disenos", items: [] },
    { id: 6, name: "Barba", slug: "barba", items: [] },
  ])

  const [activeSection, setActiveSection] = useState(null)
  const [isAddingSectionModal, setIsAddingSectionModal] = useState(false)
  const [isAddingItemModal, setIsAddingItemModal] = useState(false)
  const [isEditingSectionModal, setIsEditingSectionModal] = useState(false)
  const [newSectionName, setNewSectionName] = useState("")
  const [newItemData, setNewItemData] = useState({
    name: "",
    price: "",
    image: null,
  })
  const [dragOver, setDragOver] = useState(false)

  useEffect(() => {
    if (sections.length > 0 && !activeSection) {
      setActiveSection(sections[0])
    }
  }, [sections, activeSection])

  const handleAddSection = () => {
    if (newSectionName.trim() === "") return

    const newSection = {
      id: Date.now(),
      name: newSectionName,
      slug: newSectionName.toLowerCase().replace(/\s+/g, "-"),
      items: [],
    }

    setSections([...sections, newSection])
    setNewSectionName("")
    setIsAddingSectionModal(false)
  }

  const handleEditSection = () => {
    if (newSectionName.trim() === "" || !activeSection) return

    const updatedSections = sections.map((section) =>
      section.id === activeSection.id
        ? { ...section, name: newSectionName, slug: newSectionName.toLowerCase().replace(/\s+/g, "-") }
        : section,
    )

    setSections(updatedSections)
    setActiveSection({ ...activeSection, name: newSectionName })
    setNewSectionName("")
    setIsEditingSectionModal(false)
  }

  const handleDeleteSection = (sectionId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta sección?")) {
      const updatedSections = sections.filter((section) => section.id !== sectionId)
      setSections(updatedSections)

      if (activeSection && activeSection.id === sectionId) {
        setActiveSection(updatedSections.length > 0 ? updatedSections[0] : null)
      }
    }
  }

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setNewItemData({ ...newItemData, image: e.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleAddItem = () => {
    if (!activeSection || newItemData.name.trim() === "" || newItemData.price.trim() === "") return

    const newItem = {
      id: Date.now(),
      name: newItemData.name,
      price: newItemData.price,
      image: newItemData.image || "/placeholder.svg?height=300&width=300",
    }

    const updatedSections = sections.map((section) =>
      section.id === activeSection.id ? { ...section, items: [...section.items, newItem] } : section,
    )

    setSections(updatedSections)
    setActiveSection({ ...activeSection, items: [...activeSection.items, newItem] })
    setNewItemData({ name: "", price: "", image: null })
    setIsAddingItemModal(false)
  }

  const handleDeleteItem = (itemId) => {
    if (!activeSection) return

    if (window.confirm("¿Estás seguro de que quieres eliminar este elemento?")) {
      const updatedItems = activeSection.items.filter((item) => item.id !== itemId)
      const updatedSections = sections.map((section) =>
        section.id === activeSection.id ? { ...section, items: updatedItems } : section,
      )

      setSections(updatedSections)
      setActiveSection({ ...activeSection, items: updatedItems })
    }
  }

  const handleSaveChanges = () => {
    // Aquí se implementaría la lógica para guardar los cambios en el servidor
    alert("Cambios guardados exitosamente")
  }

  return (
    <div className="gallery-manager">
      <div className="manager-header">
        <h2>Gestión de Galería</h2>
        <div className="header-actions">
          <button className="add-btn" onClick={() => setIsAddingSectionModal(true)}>
            <i className="material-icons">add</i>
            Nueva Sección
          </button>
          <button className="save-btn" onClick={handleSaveChanges}>
            <i className="material-icons">save</i>
            Guardar Cambios
          </button>
        </div>
      </div>

      <div className="gallery-content">
        <div className="sections-sidebar">
          <h3>Secciones</h3>
          <div className="sections-list">
            {sections.map((section) => (
              <div
                key={section.id}
                className={`section-item ${activeSection?.id === section.id ? "active" : ""}`}
                onClick={() => setActiveSection(section)}
              >
                <span>{section.name}</span>
                <div className="section-actions">
                  <button
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      setNewSectionName(section.name)
                      setIsEditingSectionModal(true)
                    }}
                  >
                    <i className="material-icons">edit</i>
                  </button>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteSection(section.id)
                    }}
                  >
                    <i className="material-icons">delete</i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gallery-items">
          {activeSection ? (
            <>
              <div className="items-header">
                <h3>{activeSection.name}</h3>
                <span className="items-count">{activeSection.items.length} elementos</span>
              </div>

              <div className="items-grid">
                {activeSection.items.map((item) => (
                  <div key={item.id} className="gallery-item-card">
                    <div className="item-image">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} />
                      <div className="item-overlay">
                        <button className="delete-item-btn" onClick={() => handleDeleteItem(item.id)}>
                          <i className="material-icons">delete</i>
                        </button>
                      </div>
                    </div>
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p className="item-price">{item.price}</p>
                    </div>
                  </div>
                ))}

                <div className="gallery-item-card add-item-card" onClick={() => setIsAddingItemModal(true)}>
                  <div className="add-item-content">
                    <i className="material-icons">add_photo_alternate</i>
                    <p>Agregar Imagen</p>
                  </div>
                </div>

                {activeSection.items.length === 0 && (
                  <div className="empty-state">
                    <i className="material-icons">photo_library</i>
                    <p>No hay elementos en esta sección</p>
                    <button className="add-first-btn" onClick={() => setIsAddingItemModal(true)}>
                      Agregar primer elemento
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="no-section-selected">
              <i className="material-icons">photo_library</i>
              <p>Selecciona una sección para ver sus elementos</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal para agregar sección */}
      {isAddingSectionModal && (
        <div className="modal-overlay" onClick={() => setIsAddingSectionModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Nueva Sección</h3>
              <button className="close-btn" onClick={() => setIsAddingSectionModal(false)}>
                <i className="material-icons">close</i>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nombre de la sección</label>
                <input
                  type="text"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  placeholder="Ej: Cortes Modernos"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setIsAddingSectionModal(false)}>
                Cancelar
              </button>
              <button className="save-btn" onClick={handleAddSection}>
                Crear Sección
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar sección */}
      {isEditingSectionModal && (
        <div className="modal-overlay" onClick={() => setIsEditingSectionModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Editar Sección</h3>
              <button className="close-btn" onClick={() => setIsEditingSectionModal(false)}>
                <i className="material-icons">close</i>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nombre de la sección</label>
                <input
                  type="text"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  placeholder="Ej: Cortes Modernos"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setIsEditingSectionModal(false)}>
                Cancelar
              </button>
              <button className="save-btn" onClick={handleEditSection}>
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para agregar elemento */}
      {isAddingItemModal && (
        <div className="modal-overlay" onClick={() => setIsAddingItemModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Agregar Elemento</h3>
              <button className="close-btn" onClick={() => setIsAddingItemModal(false)}>
                <i className="material-icons">close</i>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  value={newItemData.name}
                  onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
                  placeholder="Ej: Corte Fade"
                />
              </div>
              <div className="form-group">
                <label>Precio</label>
                <input
                  type="text"
                  value={newItemData.price}
                  onChange={(e) => setNewItemData({ ...newItemData, price: e.target.value })}
                  placeholder="Ej: $150.00"
                />
              </div>
              <div className="form-group">
                <label>Imagen</label>
                <div
                  className={`image-upload-area ${dragOver ? "dragover" : ""}`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => document.getElementById("file-input").click()}
                >
                  {newItemData.image ? (
                    <img
                      src={newItemData.image || "/placeholder.svg"}
                      alt="Preview"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  ) : (
                    <>
                      <i className="material-icons upload-icon">cloud_upload</i>
                      <p className="upload-text">Haz clic para seleccionar o arrastra una imagen aquí</p>
                      <p className="upload-subtext">PNG, JPG, GIF hasta 10MB</p>
                    </>
                  )}
                </div>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="file-input"
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setIsAddingItemModal(false)}>
                Cancelar
              </button>
              <button className="save-btn" onClick={handleAddItem}>
                Agregar Elemento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryManager
