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
      {/* <div className="div my-5 d-flex flex-column justify-content-center" style={{
        width:"100%",
        height:"80vh",
         backgroundImage: `url("pridewall.png")`,
         backgroundSize: "cover",
         backgroundPosition: "center",
         backgroundRepeat: "no-repeat",
         borderRadius: "8px",
      }} >
      <h1 className="mt-5 fw-bold text-center display-3">PrideWall</h1>
      <p className="text-center lead mb-5 fw-medium">Where student stories of success are forever framed.</p>
      </div> */}

      <div className="row mt-5">
        {Array.isArray(gallerEvents) && gallerEvents.map((gallery) => (
          <div key={gallery._id} className="col-12 col-md-3 mb-4">
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
                  <span className="badge border rounded fs-6 px-3 py-2" style={{
                    background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                    color: 'white',
                  }}>
                    🏆 {gallery.prize}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>



  )
}
