import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';


export const About = () => {
  const [fna, setFNA] = useState([]);
  const staffData = [
    { sno: 1, name: "Dr.S.Ramakrishnan", qualification: "M.E., Ph.D.", designation: "Dean - Research & Innovation and Senior Professor" },
    { sno: 2, name: "Dr.L.Meenachi", qualification: "M.E., Ph.D.", designation: "Associate Professor & HoD i/c" },
    { sno: 3, name: "Dr.A.P.Janani", qualification: "MCA., M.E., Ph.D.", designation: "Associate Professor" },
    { sno: 4, name: "Dr.S.Ponni Sathya", qualification: "M.E., Ph.D.", designation: "Associate Professor" },
    { sno: 5, name: "Dr.J.Ramprasath", qualification: "M.E., Ph.D.", designation: "Associate Professor" },
    { sno: 6, name: "Dr.A.G.Priya Varshini", qualification: "M.E., Ph.D.", designation: "Assistant Professor(SS)" },
    { sno: 7, name: "Ms.D.Janani", qualification: "M.E.,", designation: "Assistant Professor(SS)" },
    { sno: 8, name: "Ms.S.Soundariya", qualification: "M.E.,", designation: "Assistant Professor(SS)" },
    { sno: 9, name: "Dr.J.Thimmia Raja", qualification: "M.Sc.,M.Tech.,Ph.D.", designation: "Assistant Professor(SS)" },
    { sno: 10, name: "Ms.T.Sumathi", qualification: "M.Tech.", designation: "Assistant Professor(SS)" },
    { sno: 11, name: "Mr.N.Praveen Sundra Kumar", qualification: "M.E.,", designation: "Assistant Professor(SS)" },
    { sno: 12, name: "Dr.C.Jeevanantham", qualification: "M.E.,Ph.D.,", designation: "Assistant Professor(SS)" },
    { sno: 13, name: "Mr.J.Dhanyeswaran", qualification: "M.Tech.", designation: "Assistant Professor(SS)" },
    { sno: 14, name: "Mr.R.Prabhu", qualification: "M.E.,", designation: "Assistant Professor(SS)" },
    { sno: 15, name: "Ms.G.Saranya", qualification: "M.E.,", designation: "Assistant Professor" },
    { sno: 16, name: "Ms.K.Saranya", qualification: "M.E.,", designation: "Assistant Professor" },
    { sno: 17, name: "Ms.P.Rajeswari", qualification: "M.E.,", designation: "Assistant Professor" },
    { sno: 18, name: "Ms.K.S.Sudhishna", qualification: "M.E.,", designation: "Assistant Professor" },
    { sno: 19, name: "Ms.P.Kalaivani", qualification: "M.E.,", designation: "Assistant Professor" },
    { sno: 20, name: "Mr.R.Govindaraj", qualification: "M.E.,", designation: "Assistant Professor" },
    { sno: 21, name: "Mr.M.Sivakumar", qualification: "M.E.,", designation: "Assistant Professor" },
    { sno: 22, name: "Ms.G.Keerthika", qualification: "M.E.,", designation: "Assistant Professor" },
    { sno: 23, name: "Ms.S.Selvanayaki", qualification: "M.E.,", designation: "Assistant Professor" },
    { sno: 24, name: "Ms.S.Deepa", qualification: "M.E.,", designation: "Assistant Professor" },
    { sno: 25, name: "Ms.P.Ponni", qualification: "M.E.", designation: "Assistant Professor" },
  ];

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
        //console.log("API Response:", data);
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

  useEffect(() => {
    const fetchFNA = async () => {
      try {
        const response = await axios.get("https://test.mcetit.drmcetit.com/api/facultyNotableAchievements/");
        console.log(response.data);
        setFNA(response.data);

        setAssociationData(response.data);
      } catch (error) {
        //console.error("Error fetching data:", error.response?.data || error.message);
      }
    };

    fetchFNA();
  }, []);

  return (
    <Container className='pt-5'>
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
      <h1 className="text-center fw-bold mt-5">About Our Department</h1>
      <p className="text-center fs-5" style={{ color: "#606060" }}>Pioneering excellence in IT education and research since 2000</p>

      {/* <div className='my-4 border rounded-1 shadow-sm p-3' style={{
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
      </div> */}

      {/* <img src="About_IT.png" alt="About IT" className='img-thumbnail my-5 border rounded-1' /> */}
      <div className='my-4'>
        {/* <h4>About Department</h4> */}
        <p className='fs-14 justify'  >The department of Information Technology was established in 1999. The department offers B.Tech. (IT) programme, which combines faculties with expertise in various fields and good laboratory facilities for imparting knowledge to the students. This enables students to face the challenging needs of the industries and research institutions. The department is affiliated to Anna University & B.Tech. Information Technology Programme is accredited by the National Board of Accreditation (NBA), AICTE, New Delhi.
        </p>
        <p className='fs-14 justify'  >The department conducted several national level workshops, Seminars, FDP, SDP, Conferences, etc. Our Department faculty members have published their research work in Reputed national/international Journals namely IEEE Transaction on Image Processing, IEEE Communications, ACM, Springer, etc. Our faculty members are involved in various research works, such as in the fields of Signal Processing, Image Processing, Networking, Data Mining, Soft Computing, etc.,</p>
      </div>

      <div className='my-4'>
        <div>
          <h2 className="display-6 fw-bold mb-3">Vission and Mission</h2>
          <div className='peo my-4 border rounded-1 p-3'>
            <h4 className="">Our Visson</h4>
            <div className='my-2'>
              <p className='m-0 fs-14' >To become a Centre of Excellence in education and research in the field of Information Technology, to meet global challenges in computing industries.</p>
            </div>
          </div>
          <div className='peo my-4 border rounded-1 p-3'>
            <h4 className="">Our Misson</h4>
            <div className='my-2'>
              <ul>
                <li className='fs-14 justify'>To impart world-class knowledge in the field of Information Technology.</li>
                <li className='fs-14 justify'>To promote industry-institute interactions to empower the faculty members and students.</li>
                <li className='fs-14 justify'>To support and facilitate research and development activities.</li>
                <li className='fs-14 justify'>To develop all round personality by inculcating the values and skills needed for students to upgrade themselves as IT professionals.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <h2 className="display-6 fw-bold mb-3">Faculties</h2>
        <table className="table table-bordered table-striped text-center">
          <thead>
            <tr className="text-white" style={{ backgroundColor: "#0d6efd" }}>
              <th className='fs-14'>S.No.</th>
              <th className='fs-14'>Staff Name</th>
              <th className='fs-14'>Qualification</th>
              <th className='fs-14'>Designation</th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((staff) => (
              <tr key={staff.sno}>
                <td className='fs-14'>{staff.sno}</td>
                <td className='fs-14'>{staff.name}</td>
                <td className='fs-14'>{staff.qualification}</td>
                <td className='fs-14'>{staff.designation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className=" p-3 mt-4">
        <h2 className="display-6 fw-bold mb-3">Program Objective</h2>

        {/* Program Educational Objectives (PEO's) */}
        <div className="peo">
          <h4>Program Educational Objectives (PEO's)</h4>
          {outcomes.PEO?.map((item, index) => (
            <div className="my-4" key={item.POId}>
              <p className='fs-14 m-0 p-0 justify'>
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
              <p className='fs-14 m-0 p-0 justify'>
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
              <p className='fs-14 m-0 p-0 justify'>
                <span className="fw-bold">{item.POId}: </span>
                {item.title && <span className="fw-semibold">{item.title}: </span>}
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>

      <div>
        <h2 className="display-6 fw-bold mb-3">Faculty Notable Achievement</h2>
        <div className='my-4'>
          <div className="my-2">
            {fna.map((faculty, index) => (
              <div key={index} className="my-2">
                <p className="fs-4 fw-bold">{faculty.name}</p>
                <ul>
                  {faculty.achievements.map((achievement, aIndex) => (
                    <li key={aIndex} className="fs-14 justify">{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container >
  )
}
