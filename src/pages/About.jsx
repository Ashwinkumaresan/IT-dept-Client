import React, { useEffect, useState } from 'react'
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';


export const About = () => {
  const [outcomes, setOutcomes] = useState({
    PEO: [],
    PO: [],
    PSO: [],
  });

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

  useEffect(() => {
    fetch("https://test.mcetit.drmcetit.com/api/about/programOutcome/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        const safeData = {
          PEO: Array.isArray(data?.PEO) ? data.PEO : [],
          PO: Array.isArray(data?.PO) ? data.PO : [],
          PSO: Array.isArray(data?.PSO) ? data.PSO : [],
        };
        setOutcomes(safeData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        notify(error.response?.data.detail);
      });
  }, []);

  return (
    <Container style={{ marginTop: "15vh" }}>
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
      <h1 className="text-center fw-bold">About Our Department</h1>
      <p className="text-center fs-5" style={{ color: "#606060" }}>Pioneering excellence in IT education and research since 2000</p>

      <div className='my-4 border rounded-1 shadow-sm p-3' style={{
        backgroundImage: `url("about_bg.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: "8px",
      }}>
        <h4>Program Educational Outcome's</h4>
        <p>Our outcomes and the program specific objectives.</p>
        <button className='btn btn-primary'>
          Learn more →
        </button>
      </div>
      <div className='my-4 border rounded-1 shadow-sm p-3' style={{
        backgroundImage: `url("about_bg.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: "8px",
      }}>
        <h4>Vission and Mission</h4>
        <p>Our outcomes and the program specific objectives.</p>
        <button className='btn btn-primary'>
          Learn more →
        </button>
      </div>
      <div className='my-4 border rounded-1 shadow-sm p-3' style={{
        backgroundImage: `url("about_bg.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: "8px",
      }}>
        <h4>Faculty Notable Achievement</h4>
        <p>Our outcomes and the program specific objectives.</p>
        <button className='btn btn-primary'>
          Learn more →
        </button>
      </div>

      {/* <img src="About_IT.png" alt="About IT" className='img-thumbnail my-5 border rounded-1' /> */}
      <div>
        <h4>About Department</h4>
        <p className='fs-6' style={{ textAlign: "justify" }} >The department of Information Technology was established in 1999. The department offers B.Tech. (IT) programme, which combines faculties with expertise in various fields and good laboratory facilities for imparting knowledge to the students. This enables students to face the challenging needs of the industries and research institutions. The department is affiliated to Anna University & B.Tech. Information Technology Programme is accredited by the National Board of Accreditation (NBA), AICTE, New Delhi.
        </p>
        <p className='fs-6' style={{ textAlign: "justify" }} >The department conducted several national level workshops, Seminars, FDP, SDP, Conferences, etc. Our Department faculty members have published their research work in Reputed national/international Journals namely IEEE Transaction on Image Processing, IEEE Communications, ACM, Springer, etc. Our faculty members are involved in various research works, such as in the fields of Signal Processing, Image Processing, Networking, Data Mining, Soft Computing, etc.,</p>
      </div>



      <div className="border rounded-1 p-3">

        {/* Program Educational Objectives (PEO's) */}
        <div className="peo">
          <h4>Program Educational Objectives (PEO's)</h4>
          {outcomes.PEO?.map((item, index) => (
            <div className="my-4" key={item.POId}>
              <p className='fs-6 m-0 p-0' style={{ textAlign: "justify" }}>
                <span className="fw-bold">{item.POId}: </span>
                {item.title && <span className="fw-semibold">{item.title}: </span>}
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Program Outcomes (POs) */}
        <div className="peo">
          <h4>Program Outcomes</h4>
          {outcomes.PO?.map((item, index) => (
            <div className="my-4" key={item.POId}>
              <p className='fs-6 m-0 p-0' style={{ textAlign: "justify" }}>
                <span className="fw-bold">{item.POId}: </span>
                {item.title && <span className="fw-semibold">{item.title}: </span>}
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Program Specific Outcomes (PSOs) */}
        <div className="peo">
          <h4>Program Specific Outcomes (PSOs)</h4>
          {outcomes.PSO?.map((item, index) => (
            <div className="my-4" key={item.POId}>
              <p className='fs-6 m-0 p-0' style={{ textAlign: "justify" }}>
                <span className="fw-bold">{item.POId}: </span>
                {item.title && <span className="fw-semibold">{item.title}: </span>}
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>




      <div className='my-5'>
        <div>
          <h4 className="text-center">Vission and Mission</h4>
          <div className='peo my-4 border rounded-1 p-3'>
            <h4 className="">Our Visson</h4>
            <div className='my-4'>
              <p style={{ textAlign: "justify" }} className='m-0' >To be a globally recognized center of excellence in Information Technology education and research, producing innovative professionals who contribute significantly to technological advancement and societal development.</p>
            </div>
          </div>
          <div className='peo my-4 border rounded-1 p-3'>
            <h4 className="">Our Misson</h4>
            <div className='my-4'>
              <ul>
                <li>Provide quality education with a focus on practical skills and theoretical knowledge</li>
                <li>Foster a culture of innovation and research</li>
                <li>Develop industry-ready professionals with strong ethical values</li>
                <li>Establish strong collaborations with industry and academic institutions</li>
                <li>Contribute to technological advancements through research and development</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-center">Faculty Notable Achievement</h4>
        <div className='my-4'>
          <div className='my-2'>
            <p className='fs-4 fw-bold'>Dr. S. Ramakrishnan</p>
            <ul>
              <li>Associate Editor in IEEE Access.</li>
              <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
              <li>Associate Editor in IEEE Access.</li>
              <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
            </ul>
          </div>
          <div className='my-2'>
            <p className='fs-4 fw-bold'>Dr. S. Ramakrishnan</p>
            <ul>
              <li>Associate Editor in IEEE Access.</li>
              <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
              <li>Associate Editor in IEEE Access.</li>
              <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
            </ul>
          </div>
          <div className='my-2'>
            <p className='fs-4 fw-bold'>Dr. S. Ramakrishnan</p>
            <ul>
              <li>Associate Editor in IEEE Access.</li>
              <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
              <li>Associate Editor in IEEE Access.</li>
              <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
            </ul>
          </div>
          <div className='my-2'>
            <p className='fs-4 fw-bold'>Dr. S. Ramakrishnan</p>
            <ul>
              <li>Associate Editor in IEEE Access.</li>
              <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
              <li>Associate Editor in IEEE Access.</li>
              <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
            </ul>
          </div>
          <div className='my-2'>
            <p className='fs-4 fw-bold'>Dr. S. Ramakrishnan</p>
            <ul>
              <li>Associate Editor in IEEE Access.</li>
              <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
              <li>Associate Editor in IEEE Access.</li>
              <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
            </ul>
          </div>
          <div className='my-2'>
            <p className='fs-4 fw-bold'>Dr. S. Ramakrishnan</p>
            <ul>
              <li>Associate Editor in IEEE Access.</li>
              <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
              <li>Associate Editor in IEEE Access.</li>
              <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
            </ul>
          </div>
          <div className='my-2'>
            <p className='fs-4 fw-bold'>Dr. S. Ramakrishnan</p>
            <ul>
              <li>Associate Editor in IEEE Access.</li>
              <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
              <li>Associate Editor in IEEE Access.</li>
              <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
            </ul>
          </div>
          <div className='my-2'>
            <p className='fs-4 fw-bold'>Dr. S. Ramakrishnan</p>
            <ul>
              <li>Associate Editor in IEEE Access.</li>
              <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
              <li>Associate Editor in IEEE Access.</li>
              <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
            </ul>
          </div>
          <div className='my-2'>
            <p className='fs-4 fw-bold'>Dr. S. Ramakrishnan</p>
            <ul>
              <li>Associate Editor in IEEE Access.</li>
              <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
              <li>Associate Editor in IEEE Access.</li>
              <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
            </ul>
          </div>
          <div className='my-2'>
            <p className='fs-4 fw-bold'>Dr. S. Ramakrishnan</p>
            <ul>
              <li>Associate Editor in IEEE Access.</li>
              <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
              <li>Associate Editor in IEEE Access.</li>
              <li>Recognized as a Featured Reviwer for ACM Coumputing Reviews during MAy 2022.</li>
            </ul>
          </div>
        </div>
      </div>
    </Container >
  )
}
