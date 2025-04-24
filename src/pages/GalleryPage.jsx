import axios from "axios"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';

export const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [gallerEvents, setGalleryEvents] = useState([])

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
    })
  };

  const fetchAssociation = async () => {
    try {
      const response = await axios.get("https://test.mcetit.drmcetit.com/api/gallery/");
      //console.log(response.data);

      setGalleryEvents(response.data);
    } catch (error) {
      //console.error("Error fetching data:", error.response?.data || error.message);
      //console.error("Error fetching data:", error.response?.data.detail);
      notify(error.response?.data.detail);
    }
  };
  useEffect(() => {
    fetchAssociation();
  }, [])


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
      <h1 className="mt-5 fw-bold text-center display-4">PrideWall</h1>
      <p className="text-center lead mb-5">Where student stories of success are forever framed.</p>

      {Array.isArray(gallerEvents) && gallerEvents.map((gallery) => (
        <div key={gallery._id} className="row g-0 border rounded  p-4 mb-5 bg-white">

          <div className="col-12 col-md-6 d-flex flex-column justify-content-center p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="fw-bolder fs-1">{gallery.eventName}</h2>
              <div className="d-flex gap-2">
                <span className="badge text-bg-secondary " style={{ fontSize: "12px" }}>{gallery.date}</span>
                <span className="badge text-bg-info " style={{ fontSize: "12px" }}>{gallery.year}</span>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="fw-semibold mb-2">👥 Participants:</h5>
              <ul className="list-unstyled">
                {gallery.studentName.map((name, index) => (
                  <li key={index} className="fs-6 mb-1">
                    <i className="bi bi-person-fill me-2 text-primary"></i>{name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h5 className="fw-semibold mb-2">🏫 Institution:</h5>
              <p className="m-0 fs-6">{gallery.collegeName}</p>
              <p className="m-0 fs-6 text-muted">{gallery.collegeCity}</p>
            </div>

            <div className="mt-3">
              <span className="badge border rounded fs-6 px-3 py-2" style={{
                background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                color: 'white',
              }}>
                🏆 {gallery.prize}
              </span>
            </div>
          </div>

          <div className="col-12 col-md-6 overflow-hidden rounded-4">
            <img
              src={`https://test.mcetit.drmcetit.com${gallery.img}`}
              className="img-fluid"
              alt="event"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                transition: 'transform 0.5s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </div>

        </div>
      ))}
    </div>



  )
}
