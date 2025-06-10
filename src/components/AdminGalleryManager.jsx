"use client"

import { useState } from "react"
import "./AdminGalleryManager.css"

function AdminGalleryManager() {
  const [galleries, setGalleries] = useState([
    {
      id: 1,
      name: "Cortes para Niños",
      slug: "ninos",
      active: true,
      images: [
        { id: 1, name: "Corte Básico", price: "100.00", image: "/placeholder.svg?height=300&width=300" },
        { id: 2, name: "Cresta", price: "100.00", image: "/placeholder.svg?height=300&width=300" },
      ],
    },
    {
      id: 2,
      name: "Cortes Clásicos",
      slug: "clasicos",
      active: true,
      images: [
        { id: 3, name: "Clásico Moderno", price: "150.00", image: "/placeholder.svg?height=300&width=300" },
        { id: 4, name: "Clásico con Barba", price: "150.00", image: "/placeholder.svg?height=300&width=300" },
      ],
    },
    {
      id: 3,
      name: "Degradados",
      slug: "degradados",
      active: true,
      images: [
        { id: 5, name: "Mohicano", price: "150.00", image: "/placeholder.svg?height=300&width=300" },
        { id: 6, name: "Moño con Diseño", price: "180.00", image: "/placeholder.svg?height=300&width=300" },
      ],
    },
    {
      id: 4,
      name: "Afro",
      slug: "afro",
      active: true,
      images: [
        { id: 7, name: "Afro Mohicano", price: "200.00", image: "/placeholder.svg?height=300&width=300" },
        { id: 8, name: "Afro Rizo", price: "150.00", image: "/placeholder.svg?height=300&width=300" },
      ],
    },
    {
      id: 5,
      name: "Diseños",
      slug: "disenos",
      active: true,
      images: [
        { id: 9, name: "3 Rayas", price: "100.00", image: "/placeholder.svg?height=300&width=300" },
        { id: 10, name: "Cola Z", price: "50.00", image: "/placeholder.svg?height=300&width=300" },
      ],
    },
    {
      id: 6,
      name: "Barba",
      slug: "barba",
      active: true,
      images: [
        { id: 11, name: "Degradada Corta", price: "50.00", image: "/placeholder.svg?height=300&width=300" },
        { id: 12, name: "Degradada Larga", price: "50.00", image: "/placeholder.svg?height=300&width=300" },
      ],
    },
  ])

  const [selectedGallery, setSelectedGallery] = useState(null)
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [editingGallery, setEditingGallery] = useState(null)
  const [editingImage, setEditingImage] = useState(null)

  const [galleryFormData, setGalleryFormData] = useState({
    name: "",
    slug: "",
  })

  const [imageFormData, setImageFormData] = useState({
    name: "",
    price: "",
    image: "",
  })

  const resetGalleryForm = () => {
    setGalleryFormData({
      name: "",
      slug: "",
    })
    setEditingGallery(null)
  }

  const resetImageForm = () => {
    setImageFormData({
      name: "",
      price: "",
      image: "",
    })
    setEditingImage(null)
  }

  const openGalleryModal = (gallery = null) => {
    if (gallery) {
      setGalleryFormData({
        name: gallery.name,
        slug: gallery.slug,
      })
      setEditingGallery(gallery)
    } else {
      resetGalleryForm()
    }
    setIsGalleryModalOpen(true)
  }

  const closeGalleryModal = () => {
    setIsGalleryModalOpen(false)
    resetGalleryForm()
  }

  const openImageModal = (image = null) => {
    if (image) {
      setImageFormData({
        name: image.name,
        price: image.price,
        image: image.image,
      })
      setEditingImage(image)
    } else {
      resetImageForm()
    }
    setIsImageModalOpen(true)
  }

  const closeImageModal = () => {
    setIsImageModalOpen(false)
    resetImageForm()
  }

  const handleGallerySubmit = (e) => {
    e.preventDefault()

    const galleryData = {
      ...galleryFormData,
      slug: galleryFormData.slug || galleryFormData.name.toLowerCase().replace(/\s+/g, "-"),
    }

    if (editingGallery) {
      setGalleries(
        galleries.map((gallery) => (gallery.id === editingGallery.id ? { ...gallery, ...galleryData } : gallery)),
      )
    } else {
      const newGallery = {
        id: Date.now(),
        ...galleryData,
        active: true,
        images: [],
      }
      setGalleries([...galleries, newGallery])
    }

    closeGalleryModal()
  }

  const handleImageSubmit = (e) => {
    e.preventDefault()

    if (!selectedGallery) return

    const imageData = {
      ...imageFormData,
      price: Number.parseFloat(imageFormData.price).toFixed(2),
    }

    if (editingImage) {
      setGalleries(
        galleries.map((gallery) =>
          gallery.id === selectedGallery.id
            ? {
                ...gallery,
                images: gallery.images.map((image) =>
                  image.id === editingImage.id ? { ...image, ...imageData } : image,
                ),
              }
            : gallery,
        ),
      )
    } else {
      const newImage = {
        id: Date.now(),
        ...imageData,
      }
      setGalleries(
        galleries.map((gallery) =>
          gallery.id === selectedGallery.id ? { ...gallery, images: [...gallery.images, newImage] } : gallery,
        ),
      )
    }

    closeImageModal()
  }

  const handleDeleteGallery = (galleryId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta galería?")) {
      setGalleries(galleries.filter((gallery) => gallery.id !== galleryId))
      if (selectedGallery && selectedGallery.id === galleryId) {
        setSelectedGallery(null)
      }
    }
  }

  const handleDeleteImage = (imageId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta imagen?")) {
      setGalleries(
        galleries.map((gallery) =>
          gallery.id === selectedGallery.id
            ? { ...gallery, images: gallery.images.filter((image) => image.id !== imageId) }
            : gallery,
        ),
      )
    }
  }

  const toggleGalleryStatus = (galleryId) => {
    setGalleries(
      galleries.map((gallery) => (gallery.id === galleryId ? { ...gallery, active: !gallery.active } : gallery)),
    )
  }

  return (
    <div className="admin-gallery-manager">
      <div className="manager-header">
        <h2>Gestión de Galería</h2>
        <button className="add-btn" onClick={() => openGalleryModal()}>
          <i className="material-icons">add</i>
          Nueva Sección
        </button>
      </div>

      <div className="gallery-layout">
        <div className="galleries-list">
          <h3>Secciones de Galería</h3>
          <div className="galleries-grid">
            {galleries.map((gallery) => (
              <div
                key={gallery.id}
                className={`gallery-card ${selectedGallery?.id === gallery.id ? "selected" : ""}`}
                onClick={() => setSelectedGallery(gallery)}
              >
                <div className="gallery-info">
                  <h4>{gallery.name}</h4>
                  <p>{gallery.images.length} imágenes</p>
                  <span className={`status-badge ${gallery.active ? "active" : "inactive"}`}>
                    {gallery.active ? "Activa" : "Inactiva"}
                  </span>
                </div>
                <div className="gallery-actions">
                  <button
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      openGalleryModal(gallery)
                    }}
                  >
                    <i className="material-icons">edit</i>
                  </button>
                  <button
                    className="toggle-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleGalleryStatus(gallery.id)
                    }}
                  >
                    <i className="material-icons">{gallery.active ? "visibility_off" : "visibility"}</i>
                  </button>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteGallery(gallery.id)
                    }}
                  >
                    <i className="material-icons">delete</i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="images-section">
          {selectedGallery ? (
            <>
              <div className="images-header">
                <h3>{selectedGallery.name}</h3>
                <button className="add-btn" onClick={() => openImageModal()}>
                  <i className="material-icons">add_photo_alternate</i>
                  Agregar Imagen
                </button>
              </div>

              <div className="images-grid">
                {selectedGallery.images.map((image) => (
                  <div key={image.id} className="image-card">
                    <div className="image-preview">
                      <img src={image.image || "/placeholder.svg"} alt={image.name} />
                    </div>
                    <div className="image-info">
                      <h4>{image.name}</h4>
                      <p className="image-price">${image.price}</p>
                    </div>
                    <div className="image-actions">
                      <button className="edit-btn" onClick={() => openImageModal(image)}>
                        <i className="material-icons">edit</i>
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteImage(image.id)}>
                        <i className="material-icons">delete</i>
                      </button>
                    </div>
                  </div>
                ))}

                {selectedGallery.images.length === 0 && (
                  <div className="no-images">
                    <i className="material-icons">photo_library</i>
                    <p>No hay imágenes en esta sección</p>
                    <button className="add-btn" onClick={() => openImageModal()}>
                      Agregar primera imagen
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="no-selection">
              <i className="material-icons">photo_library</i>
              <p>Selecciona una sección para ver sus imágenes</p>
            </div>
          )}
        </div>
      </div>

      {/* Gallery Modal */}
      {isGalleryModalOpen && (
        <div className="modal-overlay" onClick={closeGalleryModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingGallery ? "Editar Sección" : "Nueva Sección"}</h3>
              <button className="close-btn" onClick={closeGalleryModal}>
                <i className="material-icons">close</i>
              </button>
            </div>

            <form onSubmit={handleGallerySubmit} className="gallery-form">
              <div className="form-group">
                <label>Nombre de la sección</label>
                <input
                  type="text"
                  value={galleryFormData.name}
                  onChange={(e) => setGalleryFormData({ ...galleryFormData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Slug (URL amigable)</label>
                <input
                  type="text"
                  value={galleryFormData.slug}
                  onChange={(e) => setGalleryFormData({ ...galleryFormData, slug: e.target.value })}
                  placeholder="Se genera automáticamente si se deja vacío"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={closeGalleryModal}>
                  Cancelar
                </button>
                <button type="submit" className="save-btn">
                  {editingGallery ? "Actualizar" : "Crear"} Sección
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="modal-overlay" onClick={closeImageModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingImage ? "Editar Imagen" : "Nueva Imagen"}</h3>
              <button className="close-btn" onClick={closeImageModal}>
                <i className="material-icons">close</i>
              </button>
            </div>

            <form onSubmit={handleImageSubmit} className="image-form">
              <div className="form-group">
                <label>Nombre del estilo</label>
                <input
                  type="text"
                  value={imageFormData.name}
                  onChange={(e) => setImageFormData({ ...imageFormData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Precio ($)</label>
                <input
                  type="number"
                  value={imageFormData.price}
                  onChange={(e) => setImageFormData({ ...imageFormData, price: e.target.value })}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>URL de imagen</label>
                <input
                  type="url"
                  value={imageFormData.image}
                  onChange={(e) => setImageFormData({ ...imageFormData, image: e.target.value })}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>

              {imageFormData.image && (
                <div className="image-preview-container">
                  <label>Vista previa</label>
                  <img
                    src={imageFormData.image || "/placeholder.svg"}
                    alt="Vista previa"
                    className="form-image-preview"
                  />
                </div>
              )}

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={closeImageModal}>
                  Cancelar
                </button>
                <button type="submit" className="save-btn">
                  {editingImage ? "Actualizar" : "Agregar"} Imagen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminGalleryManager
