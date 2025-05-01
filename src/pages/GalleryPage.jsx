import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryEvents, setGalleryEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);

  const notify = (obj) => {
    toast.error(obj, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const fetchGalleryEvents = async () => {
    try {
      const response = await axios.get("https://test.mcetit.drmcetit.com/api/gallery/");
      setGalleryEvents(response.data);
      setLoading(false);
    } catch (error) {
      notify(error.response?.data.detail || "Failed to fetch gallery");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryEvents();
  }, []);

  const handleView = (gallery) => {
    setSelectedGallery(gallery);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedGallery(null);
  };

  return (
    <div className="container py-5">
      <ToastContainer />

      <div className="div my-5 prideWall border rounded">
        <div className="row">
          <div className="col-12 col-lg-6 d-flex flex-column justify-content-center">
            <h1 className="ls-6 fs-6 lead fw-medium ps-5 pt-5 pt-lg-0">Pride Wall </h1>
            <p className="display-4 mb-4 fw-bold ps-5">
              Where student stories of success are forever framed.
            </p>
          </div>
          <div className="col-12 col-lg-6">
            <img
              src="/75a785f2-b901-48cc-8af5-afccdd1098de-converted.png"
              alt="Pride Wall"
              className="img-fluid"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row my-5">
          {Array.isArray(galleryEvents) &&
            galleryEvents.map((gallery) => (
              <div key={gallery._id} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm border-0 rounded-4">
                  <img
                    src={`https://test.mcetit.drmcetit.com${gallery.img}`}
                    alt="event"
                    className="card-img-top rounded-top-4"
                    style={{
                      objectFit: 'contain',
                      height: '200px',
                    }}
                  />
                  <div className="card-body">
                    <h3 className="card-title fw-bold ">{gallery.eventName}</h3>
                    <p className="card-subtitle mb-2 text-muted fs-12">
                      {gallery.date} | {gallery.year}
                    </p>
                    <hr />
                    <div className="p-3">
                      <div className="mb-3">
                        <h6 className="fw-semibold mb-1">👥 Participants:</h6>
                        {gallery.studentName.map((name, index) => (
                          <p key={index} className="m-0 fs-14">👥 {name}</p>
                        ))}
                      </div>

                      <div className="mb-3">
                        <h6 className="fw-semibold mb-1">🏫 {gallery.collegeName}</h6>
                        <p className="text-muted m-0 fs-14">{gallery.collegeCity}</p>
                      </div>

                      <div>
                        
                        <span className="badge border text-dark rounded fs-6 px-3 py-2 fs-14">
                          🏆 {gallery.prize}
                        </span>
                      </div>
                      <div className="row">
                        <div className="col">
                        <button
                          className="btn btn-dark me-2 w-100 mt-4"
                          onClick={() => handleView(gallery)}
                        >
                          View
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Modal */}
      {showModal && selectedGallery && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedGallery.eventName}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <img
                      src={`https://test.mcetit.drmcetit.com${selectedGallery.img}`}
                      alt="event"
                      className="img-fluid rounded-4"
                    />
                  </div>
                  <div className="col-lg-6">
                    <p><strong>Date:</strong> {selectedGallery.date}</p>
                    <p><strong>Year:</strong> {selectedGallery.year}</p>
                    <p><strong>College:</strong> {selectedGallery.collegeName}, {selectedGallery.collegeCity}</p>
                    <p><strong>Prize:</strong> 🏆 {selectedGallery.prize}</p>
                    <h6 className="mt-3">👥 Participants:</h6>
                    <ul>
                      {selectedGallery.studentName.map((name, index) => (
                        <li key={index}>{name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
