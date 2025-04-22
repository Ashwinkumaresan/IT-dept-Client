"use client"

import { useState } from "react"

// Sample gallery data
const galleryEvents = [
  {
    id: 1,
    title: "Annual Tech Fest 2023",
    description: "Students showcasing innovative projects at our annual technology festival",
    images: [
      { id: 1, src: "https://via.placeholder.com/400x300", alt: "Tech Fest Project 1" },
      { id: 2, src: "https://via.placeholder.com/400x300", alt: "Tech Fest Project 2" },
      { id: 3, src: "https://via.placeholder.com/400x300", alt: "Tech Fest Project 3" },
    ],
  },
  {
    id: 2,
    title: "National Coding Competition",
    description: "Our students won first place in the national coding championship",
    images: [
      { id: 4, src: "https://via.placeholder.com/400x300", alt: "Coding Team" },
      { id: 5, src: "https://via.placeholder.com/400x300", alt: "Award Ceremony" },
      { id: 6, src: "https://via.placeholder.com/400x300", alt: "Winners with Trophy" },
    ],
  },
  {
    id: 3,
    title: "Cultural Festival",
    description: "Annual cultural celebration showcasing diverse talents of our students",
    images: [
      { id: 7, src: "https://via.placeholder.com/400x300", alt: "Dance Performance" },
      { id: 8, src: "https://via.placeholder.com/400x300", alt: "Music Band" },
      { id: 9, src: "https://via.placeholder.com/400x300", alt: "Art Exhibition" },
    ],
  },
  {
    id: 4,
    title: "Sports Championship",
    description: "Our college team winning the inter-college basketball tournament",
    images: [
      { id: 10, src: "https://via.placeholder.com/400x300", alt: "Basketball Match" },
      { id: 11, src: "https://via.placeholder.com/400x300", alt: "Team Photo" },
      { id: 12, src: "https://via.placeholder.com/400x300", alt: "Award Ceremony" },
    ],
  },
]

export const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  // Open image in modal
  const openModal = (image) => {
    setSelectedImage(image)
  }

  // Close modal
  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h1 className="display-5 fw-bold">Student Achievement Gallery</h1>
          <p className="lead">Celebrating our students' accomplishments and memorable events</p>
        </div>
      </div>

      {galleryEvents.map((event) => (
        <div key={event.id} className="mb-5">
          <div className="row mb-3">
            <div className="col">
              <h2 className="border-bottom pb-2">{event.title}</h2>
              <p className="text-muted">{event.description}</p>
            </div>
          </div>

          <div className="row g-4">
            {event.images.map((image) => (
              <div key={image.id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm hover-card">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover", cursor: "pointer" }}
                    onClick={() => openModal(image)}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{image.alt}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Image Modal */}
      {selectedImage && (
        <div className="modal show d-block" tabIndex="-1" onClick={closeModal}>
          <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedImage.alt}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body text-center p-0">
                <img src={selectedImage.src || "/placeholder.svg"} alt={selectedImage.alt} className="img-fluid" />
              </div>
            </div>
          </div>
          <div className="modal-backdrop show"></div>
        </div>
      )}
    </div>
  )
}
