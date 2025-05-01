import { Award, Heart, Mail, Phone, MapPin, Trophy } from "lucide-react"
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import axios from "axios"

export const Association = () => {
  const [sendNotify, setSendNotify] = useState(false)
  const [associationData, setAssociationData] = useState(null);
  const notify = () => {
    toast.success('Message Sent Successfully...', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  };
  const notifyT = (obj) => {
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
  // This will run client-side after the component mounts
  useEffect(() => {
    // Auto-moving office bearers carousel
    const interval = setInterval(() => {
      const container = document.querySelector(".office-bearers-carousel")
      if (container) {
        const firstCard = container.querySelector(".office-bearer-card")
        if (firstCard) {
          container.appendChild(firstCard)
        }
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "751cab5d-76af-4868-97f4-d4092bfc4d51");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      //alert("Form submitted");
      setSendNotify(notify);
    }
  };

  useEffect(() => {
    const fetchAssociation = async () => {
      try {
        const response = await axios.get("https://test.mcetit.drmcetit.com/api/association/");
        //console.log(response.data);

        setAssociationData(response.data);
      } catch (error) {
        //console.error("Error fetching data:", error.response?.data || error.message);
        notifyT(error.response?.data.detail);
      }
    };

    fetchAssociation();
  }, []);



  return (
    <div className="container py-5">

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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

      {/* Unique Events Carousel */}
      <div className="container mt-5 mb-5">
        <h2 className="display-6 fw-bold text-center mb-4"><span style={{color:"#FF6201"}}>INFOBEE</span> Events Showcase</h2>

        <div className="position-relative unique-carousel">
          {/* Custom Carousel */}
          <div className="row">
            <div className="col-12 ">
              <div id="eventsCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner rounded-4 shadow-lg">
                  {associationData?.eventShowcase?.map((data, index) => (
                    <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                      <div className="position-relative">
                        <img
                          src={`https://test.mcetit.drmcetit.com${data.image}`}
                          className="d-block w-100"
                          style={{
                            height: "70vh",
                            objectFit: "cover",
                            objectPosition: "center",
                            width: "100vw"
                          }}
                          alt={data.title}
                        />
                        <div
                          className="position-absolute bottom-0 start-0 w-100 p-4"
                          style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}
                        >
                          <div>
                            <div>
                              <h3 className="text-white fw-bold mb-1">{data.title}</h3>
                              <p className="text-white mb-2 justify fs-14">{data.description}</p>
                            </div>
                            <span className="badge bg-primary rounded-pill px-3 py-2">
                              {data.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#eventsCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#eventsCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>

              {/* Decorative elements */}
              <div className="position-absolute top-50 start-0 translate-middle-y d-none d-lg-block">
                <div
                  className="bg-primary rounded-circle"
                  style={{ width: "80px", height: "80px", opacity: "0.1" }}
                ></div>
              </div>
              <div className="position-absolute top-0 end-0 d-none d-lg-block">
                <div
                  className="bg-primary rounded-circle"
                  style={{ width: "120px", height: "120px", opacity: "0.1" }}
                ></div>
              </div>
              <div className="position-absolute bottom-0 start-50 translate-middle-x d-none d-lg-block">
                <div
                  className="bg-primary rounded-circle"
                  style={{ width: "100px", height: "100px", opacity: "0.1" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

     

      {/* Event & Gallery */}
      <div className="container card mt-5 mb-5">
        <div className="row px-0 px-md-5">
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center my-5">
            <h2 className="display-6 fw-bold mb-3">Gallery</h2>
            <p className="justify fs-14">Welcome to the InfoBee Gallery, where every snapshot reflects talent, creativity, and teamwork. This space captures the highlights of our vibrant events — from interactive sessions and technical challenges to fun activities and competitions. Whether you're revisiting memories or exploring fresh moments, there’s something here for everyone.</p>
            <Link to="/association-gallery" className="btn btn-primary w-100" > View Gallery </Link>
          </div>
          <div className="col-12 col-lg-6 d-flex flex-column justify-content-center my-5">
            <h2 className="display-6 fw-bold mb-3">Events</h2>
            <p className="justify fs-14">Get ready to witness a vibrant celebration of talent, innovation, and teamwork! Our association is hosting an exciting event packed with interactive sessions, skill-based competitions, team-building games, and creative showcases. Whether you're a tech enthusiast, a creative mind, or someone who loves healthy competition, there’s something for everyone.</p>
            <Link to="/association-events" className="btn btn-primary w-100" > View Events </Link>
          </div>
        </div>
      </div>

      {/* About the Association */}
      <div className="container mt-5 mb-5">
        <div className="row mb-5">
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <h2 className="display-6 fw-bold mb-4">About the Association</h2>
            <p className="justify fs-14">
            Infobee is a student-driven technical association that typically operates under the Information Technology (IT) department . It aims to create a platform for students to explore and expand their knowledge in the field of information technology. The association organizes a variety of events such as technical workshops, seminars, hackathons, coding competitions, and guest lectures from industry professionals. Infobee provides opportunities for students to enhance their practical skills, collaborate on projects, and stay up-to-date with the latest trends in the IT sector. It also serves as a space for students to network, share ideas, and work on innovative solutions to real-world problems. By doing so, Infobee helps students bridge the gap between theoretical knowledge and practical application, preparing them for successful careers in technology.
            </p>
            {/* <ul>
              <li>Conducting the professional activities such as Guest lectures, Seminars, Technical Symposiums etc.</li>
              <li>Encourage a close knit interpersonal relationship among the members.</li>
              <li>Encourage a close knit interpersonal relationship among the members.</li>
            </ul> */}
            <div className="d-flex flex-wrap gap-2 mt-4 mb-4">
              <div className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fs-12">Student-Led</div>
              <div className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fs-12">
                Technical Excellence
              </div>
              <div className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fs-12">
                Leadership Development
              </div>
              <div className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fs-12">
                Community Engagement
              </div>
              <div className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fs-12">Industry Connect</div>
            </div>
          </div>
          <div className="col-lg-6">
            <img
              src="/WhatsApp Image 2025-03-23 at 18.13.26_7f70d8c1.jpg"
              alt="IT Student Association"
              className="img-fluid rounded shadow"
              style={{
              }}
            />
          </div>
        </div>
      </div>

      {/* Programs Conducted Table */}
      <div className="container-fluid bg-light py-5 mb-5">
        <div className="container">
          <h2 className="display-6 fw-bold text-center mb-4">Programs Conducted</h2>
          <p className="text-center text-muted mb-5 fs-14">
            A summary of events and programs organized by our association over the years
          </p>

          <div className="table-responsive">
            <table className="table table-hover border">
              <thead className="table-primary">
                <tr>
                  <th scope="col">Program Type</th>
                  {associationData?.years?.map((year, index) => (
                    <th className="text-center" scope="col" key={index}>{year}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {associationData?.programsType?.map((type, rowIndex) => (
                  <tr key={rowIndex} >
                    <th scope="row">{type}</th>
                    {associationData?.years?.map((year, colIndex) => {
                      const yearKey = year.toString().toLowerCase(); // handle 'Total'
                      const value = associationData?.programCount?.[yearKey]?.[rowIndex];
                      return <td key={colIndex} className="text-center"><strong>{value}</strong></td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          {/* <div className="row mt-4">
            <div className="col-md-4 mb-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                    <Trophy className="text-primary" size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">Most Popular</h5>
                    <p className="mb-0 text-muted">Guest Lectures (63)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                    <Award className="text-primary" size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">Highest Growth</h5>
                    <p className="mb-0 text-muted">Technical Workshops (140%)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                    <Heart className="text-primary" size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">Student Favorite</h5>
                    <p className="mb-0 text-muted">Hackathons (95% satisfaction)</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Office Bearers Section - Auto-moving Cards */}
      <div className="container mt-5 mb-5">
        <h2 className="display-6 fw-bold text-center mb-2">Office Bearers</h2>
        <p className="text-center text-muted mb-5">Meet the student leaders who drive our association forward</p>

        <div className="position-relative">
          <div className="office-bearers-carousel d-flex overflow-hidden">
            {/* These cards will automatically move with JavaScript */}
            {associationData?.officeBearers?.map((bearer, index) => (
              <div className="office-bearer-card px-2" style={{ minWidth: "300px" }} key={index}>
                <div className="card border-0 shadow-sm h-100">
                  <div className="position-relative">
                    <img
                      src={`https://test.mcetit.drmcetit.com${bearer.profilePic}`}
                      className="card-img-top "
                      style={
                        {
                          objectFit: "cover",
                          objectPosition: "center",
                          height: "40vh",
                          width: "100%",
                        }
                      }
                      alt={bearer.name}
                    />
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge bg-primary">{bearer.acadmaicYear}</span>
                    </div>
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold mb-1">{bearer.name}</h5>
                    <p className="card-text text-primary mb-2">{bearer.desigination}</p>
                    <p className="card-text text-muted small">{bearer.year} Year B.Tech</p>
                  </div>
                </div>
              </div>
            ))}

          </div>



          {/* Navigation controls */}
          <div className="position-absolute top-50 start-0 translate-middle-y" >
            <button
              className="btn btn-primary rounded-circle"
              style={{ width: "40px", height: "40px" }}
              onClick={() => {
                const container = document.querySelector(".office-bearers-carousel")
                const lastCard = container.lastElementChild
                if (lastCard) {
                  container.prepend(lastCard)
                }
              }}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
          </div>
          <div className="position-absolute top-50 end-0 translate-middle-y">
            <button
              className="btn btn-primary rounded-circle"
              style={{ width: "40px", height: "40px" }}
              onClick={() => {
                const container = document.querySelector(".office-bearers-carousel")
                const firstCard = container.firstElementChild
                if (firstCard) {
                  container.appendChild(firstCard)
                }
              }}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Faculty Advisors Section */}
      <div className="container-fluid bg-light py-5 mb-5">
        <div className="container">
          <h2 className="display-6 fw-bold text-center mb-2">Faculty Advisors</h2>
          <p className="text-center text-muted mb-5">Meet the professors who guide and mentor our association</p>

          <div className="row row-cols-1 row-cols-md-3 g-4">
            {associationData?.AssossationFaculty?.map((faculty, index) => (
              <div className="col" key={index}>
                <div className="card border-0 shadow h-100">
                  <div className="row g-0">
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title fw-bold">{faculty.name}</h5>
                        <p className="card-text text-muted small mb-2">{faculty.desigination}</p>
                        {/* <p className="card-text small">
                          <Mail className="me-2" size={14} />
                          <span>{faculty.email}</span>
                        </p> */}
                        {/* <p className="card-text small">
                          <Phone className="me-2" size={14} />
                          <span>{faculty.phoneNum}</span>
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h2 className="display-6 fw-bold mb-4">Contact Us</h2>
            <p className="fs-14 mb-4">
              Have questions about our association or interested in joining? Get in touch with us.
            </p>

            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="d-flex">
                  <div
                    className="rounded-circle bg-primary bg-opacity-10 p-3 me-3 d-flex align-items-center justify-content-center"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold">Email Us</h5>
                    <p className="text-muted mb-0 fs-14">
                      General Inquiries: infobeeassociation@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex">
                  <div
                    className="rounded-circle bg-primary bg-opacity-10 p-3 me-3 d-flex align-items-center justify-content-center"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold">Call Us</h5>
                    <p className="text-muted mb-0 fs-14">
                      President: {associationData?.presidentNum}
                      <br />
                      Secretary: {associationData?.SecretaryNum}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h5 className="fw-bold mb-3">Follow Us</h5>
              <div className="d-flex gap-3">
                <a
                  href="#"
                  className="btn btn-outline-primary rounded-circle"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-outline-primary rounded-circle"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">Send Us a Message</h4>
                <form onSubmit={onSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label htmlFor="name" className="form-label">
                        Your Name
                      </label>
                      <input type="text" name="Name" className="form-control" id="name" placeholder="Enter your name" required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">
                        Your Email
                      </label>
                      <input type="email" name="College mail" className="form-control" id="email" placeholder="Enter your email" required />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <input type="text" name="Subject" className="form-control" id="subject" placeholder="Enter subject" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="Message"
                      rows={5}
                      placeholder="Enter your message"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 py-2" onClick={sendNotify} >
                    Send Message
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Bootstrap Icons */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />

      {/* Custom CSS for animations */}
      <style jsx>{`
        /* Unique carousel styling */
        .unique-carousel .carousel-indicators button {
          transition: all 0.3s ease;
        }
        
        .unique-carousel .carousel-indicators button.active {
          transform: scale(1.5);
        }
        
        .unique-carousel .carousel-item {
          transition: transform 0.6s ease-in-out;
        }
        
        /* Office bearers carousel */
        .office-bearers-carousel {
          transition: all 0.5s ease;
        }
        
        .office-bearer-card {
          transition: transform 0.3s ease;
        }
        
        .office-bearer-card:hover {
          transform: translateY(-10px);
        }
      `}</style>
    </div>
  )
}

