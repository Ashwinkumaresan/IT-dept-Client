import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const AssociationGallery = () => {
  const [fetchGallery, setFetchGallery] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);  // State for loading indicator

  // Function to open the modal with the selected image
  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Fetch gallery images
  useEffect(() => {
    const fetchAssociationGallery = async () => {
      try {
        const response = await axios.get("http://test.mcetit.drmcetit.com/api/association/gallery/");
        console.log(response.data);
        setFetchGallery(response.data);
        setLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
        setLoading(false);  // Ensure loading is set to false even in case of error
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

      {/* Loading Indicator */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        // Card containing the images fetched from the API
        <div className="row py-5">
          {fetchGallery.map((item, index) => (
            <div className="col-12 col-md-3" key={index}>
              <div
                className="card m-2 border rounded p-2"
                style={{ cursor: 'pointer' }}
                onClick={() => handleImageClick(item.image)} // Clicking the image sets the selected image
              >
                <img
                  src={item.image}
                  alt={`Gallery Image ${index + 1}`}
                  className="img-fluid img-scale"
                  style={{
                    objectFit: 'fit',
                    transition: 'transform 0.3s ease', // Adding transition for smooth scale
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal to display the full image */}
      {isModalOpen && (
        <div
          className="modal"
          style={{
            display: 'block',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)',
            zIndex: 1000,
            overflow: 'auto',
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
                maxHeight: '80vh', // Ensure the image doesn't overflow vertically
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
