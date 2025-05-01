import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

export const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [gallerEvents, setGalleryEvents] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state

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

  const fetchAssociation = async () => {
    try {
      const response = await axios.get("https://test.mcetit.drmcetit.com/api/gallery/");
      setGalleryEvents(response.data);
      setLoading(false);  // Set loading to false after data is fetched
    } catch (error) {
      notify(error.response?.data.detail);
      setLoading(false);  // Ensure loading is set to false even if there is an error
    }
  };

  useEffect(() => {
    fetchAssociation();
  }, []);

  return (
    <div className="container py-5">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="div my-5 prideWall border rounded">
        <div className="row">
          <div className="col-12 col-lg-6 d-flex flex-column justify-content-center">
            <h1 className="ls-6 fs-6 text-white ps-5 pt-5 pt-lg-0">Pride Wall </h1>
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

      {/* Loading Indicator */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        // Gallery Content
        <div className="row my-5">
          {Array.isArray(gallerEvents) &&
            gallerEvents.map((gallery) => (
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
                    <h5 className="card-title fw-bold">{gallery.eventName}</h5>
                    <p className="card-subtitle mb-2 text-muted">{gallery.date} | {gallery.year}</p>

                    <div className="mb-3">
                      <h6 className="fw-semibold mb-1">👥 Participants:</h6>
                      {gallery.studentName.map((name, index) => (
                        <p key={index} className="m-0">👥 {name}</p>
                      ))}
                    </div>

                    <div className="mb-3">
                      <h6 className="fw-semibold mb-1">🏫 {gallery.collegeName}</h6>
                      <p className="text-muted m-0">{gallery.collegeCity}</p>
                    </div>

                    <div>
                      <span
                        className="badge border rounded fs-6 px-3 py-2"
                        style={{
                          background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                          color: 'white',
                        }}
                      >
                        🏆 {gallery.prize}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
