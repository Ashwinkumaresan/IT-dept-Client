import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const AssociationGallery = () => {
  const [fetchGallery, setFetchGallery] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);

  const baseURL = "https://test.mcetit.drmcetit.com";

  // Open modal with full image URL
  const handleImageClick = (imagePath) => {
    setSelectedImage(`${baseURL}${imagePath}`);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchAssociationGallery = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/association/gallery/`);
        console.log(response.data);
        setFetchGallery(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssociationGallery();
  }, []);

  return (
    <div className="container my-5 pt-5">
      <h2 className="display-6 fw-bold text-center">Association Gallery</h2>
      <p className="fs-14 text-center m-0 p-0">
        Explore the vibrant moments of InfoBee, capturing the essence of our events, competitions, and creative collaborations!
      </p>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row py-5">
          {fetchGallery.map((item, index) => (
            <div className="col-12 col-md-3" key={index}>
              <div
                className="card m-2 border rounded p-2"
                style={{ cursor: 'pointer' }}
                onClick={() => handleImageClick(item.image)}
              >
                <img
                  src={`${baseURL}${item.image}`}
                  alt={`Gallery Image ${index + 1}`}
                  className="img-fluid img-scale"
                  style={{
                    objectFit: 'fill',
                    width: '100%',
                    height: '150px',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div
          className="modal"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={closeModal}
        >
          <div
            className="modal-content"
            style={{
              position: 'relative',
              backgroundColor: 'white',
              padding: '20px',
              maxWidth: '90%',
              maxHeight: '90vh',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
              onClick={closeModal}
            >
              &times;
            </span>
            <img
              src={selectedImage}
              alt="Full View"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '80vh',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
