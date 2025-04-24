import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

// companies images
const recruitingCompanies = [
  { id: 1, name: "Zoho", logo: "/Zoho.png" },
  { id: 2, name: "Go Frugal ", logo: "/GoFurgal.jpeg" },
  { id: 3, name: "Soliton", logo: "/Soliton.webp" },
  { id: 4, name: "Kaar", logo: "/Kaar.jpeg" },
  { id: 5, name: "Vuram", logo: "/Vuram.jpg" },
  { id: 6, name: "NTT Data", logo: "/NTT Data.webp" },
  { id: 7, name: "VVDN Technologies", logo: "/VVDN Technologies.jpeg" },
  { id: 8, name: "Mphasis", logo: "/Mphasis.jpeg" },
  { id: 9, name: "Capgemini", logo: "/Capgemini.png" },
  { id: 10, name: "Wipro", logo: "/Wipro.jpeg" },
  { id: 11, name: "Tata Consultancy Services (TCS)", logo: "/Tata Consultancy Services (TCS).png" },
  { id: 12, name: "Atos Syntel", logo: "/Atos Syntel.jpeg" },
  { id: 13, name: "DXC Technology", logo: "/DXC Technology.jpeg" },
  { id: 14, name: "Solartis", logo: "/Solartis.jpeg" },
  { id: 15, name: "IONIXX Technologies", logo: "/IONIXX Technologies.jpeg" },
  { id: 16, name: "IBM", logo: "/IBM.jpeg" },
]

export const PlacementPage = () => {
  const [placement, setplacement] = useState([]);
  const [placementCurrent, setplacementCurrent] = useState([]);

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

  const fetchPlacement = async () => {
    try {
      const response = await axios.get("https://test.mcetit.drmcetit.com/api/placement/");
      //console.log(response.data);

      setplacement(response.data.currentTop3);
      setplacementCurrent(response.data.top3);
    } catch (error) {
      //console.error("Error fetching data:", error.response?.data || error.message);
      notify(error.response?.data.detail);

    }
  };
  useEffect(() => {
    fetchPlacement();
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
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h1 className="display-5 fw-bold">Placement Opportunities</h1>
          <p className="lead">Connecting our talented students with industry-leading companies</p>
        </div>
      </div>

      {/* Hero section with top packages */}
      <section className="mb-5">
        <div className="row mb-4">
          <div className="col">
            <h2 className="border-bottom pb-2">Top Placement Packages</h2>
            <p className="text-muted">Our students have received exceptional offers from leading companies</p>
          </div>
        </div>

        <div className="row g-4">
          {placementCurrent.map((pkg) => (
            <div key={pkg.id} className="col-md-4">
              <div className="card h-100 shadow border-primary hover-card">
                <div className="card-header bg-primary text-white">
                  <h3 className="h5 mb-0">{pkg.company}</h3>
                </div>
                <div className="card-body">
                  <h4 className="card-title text-center display-6">{pkg.package}</h4>
                  <h5 className="text-center mb-3">{pkg.name}</h5>
                  <p className="card-text text-center">{pkg.batch}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hero section with top packages in this year */}
      <section className="mb-5">
        <div className="row mb-4">
          <div className="col">
            <h2 className="border-bottom pb-2">Current Year Top Placement Packages</h2>
            <p className="text-muted">Our students have received exceptional offers from leading companies</p>
          </div>
        </div>

        <div className="row g-4">
          {placement.map((pkg) => (
            <div key={pkg.id} className="col-md-4">
              <div className="card h-100 shadow border-primary hover-card">
                <div className="card-header bg-primary text-white">
                  <h3 className="h5 mb-0">{pkg.company}</h3>
                </div>
                <div className="card-body">
                  <h4 className="card-title text-center display-6">{pkg.package}</h4>
                  <h5 className="text-center mb-3">{pkg.name}</h5>
                  <p className="card-text text-center">{pkg.batch}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recruiting companies grid */}
      <section>
        <div className="row mb-4">
          <div className="col">
            <h2 className="border-bottom pb-2">Recruiting Companies</h2>
            <p className="text-muted">These industry leaders regularly recruit from our college</p>
          </div>
        </div>

        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
          {recruitingCompanies.map((company) => (
            <div key={company.id} className="col">
              <div className="card h-100 border-0 shadow-sm hover-card">
                <div className="d-flex justify-content-center align-items-center p-3" style={{ height: "150px" }}>
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={`${company.name} logo`}
                    className="img-fluid"
                    style={{ maxHeight: "170px", maxWidth: "170px" }}
                  />
                </div>
                <div className="card-body text-center pt-0">
                  <h5 className="card-title">{company.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
