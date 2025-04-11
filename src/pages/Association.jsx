import { Award, Heart, Mail, Phone, MapPin, Trophy } from "lucide-react"
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react"

export const Association = () => {
  const [sendNotify, setSendNotify] = useState(false)
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

  return (
    <div className="container-fluid p-0 pt-5">
      
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


      {/* Unique Events Carousel */}
      <div className="container mt-5 mb-5">
        <h2 className="display-6 fw-bold text-center mb-4">Our Events Showcase</h2>

        <div className="position-relative unique-carousel">
          {/* Custom Carousel */}
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div id="eventsCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner rounded-4 shadow-lg">
                  <div className="carousel-item active">
                    <div className="position-relative">
                      <img
                        src="/Frame 5348.png"
                        className="d-block w-100"
                        alt="TechFest 2024"
                      />
                      <div
                        className="position-absolute bottom-0 start-0 w-100 p-4"
                        style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}
                      >
                        <div className="d-flex justify-content-between align-items-end">
                          <div>
                            <h3 className="text-white fw-bold mb-1">TechFest 2024</h3>
                            <p className="text-white mb-0">Annual technical symposium with 1000+ participants</p>
                          </div>
                          <span className="badge bg-primary rounded-pill px-3 py-2">March 2024</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <div className="position-relative">
                      <img
                        src="/Frame 5348.png"
                        className="d-block w-100"
                        alt="Hackathon 2024"
                      />
                      <div
                        className="position-absolute bottom-0 start-0 w-100 p-4"
                        style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}
                      >
                        <div className="d-flex justify-content-between align-items-end">
                          <div>
                            <h3 className="text-white fw-bold mb-1">Hackathon 2024</h3>
                            <p className="text-white mb-0">48-hour coding marathon with 50 teams</p>
                          </div>
                          <span className="badge bg-primary rounded-pill px-3 py-2">February 2024</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <div className="position-relative">
                      <img
                        src="/Frame 5348.png"
                        className="d-block w-100"
                        alt="AI Summit"
                      />
                      <div
                        className="position-absolute bottom-0 start-0 w-100 p-4"
                        style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}
                      >
                        <div className="d-flex justify-content-between align-items-end">
                          <div>
                            <h3 className="text-white fw-bold mb-1">AI Summit</h3>
                            <p className="text-white mb-0">
                              Conference on artificial intelligence with industry experts
                            </p>
                          </div>
                          <span className="badge bg-primary rounded-pill px-3 py-2">January 2024</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <div className="position-relative">
                      <img
                        src="/Frame 5348.png"
                        className="d-block w-100"
                        alt="CyberQuest CTF"
                      />
                      <div
                        className="position-absolute bottom-0 start-0 w-100 p-4"
                        style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}
                      >
                        <div className="d-flex justify-content-between align-items-end">
                          <div>
                            <h3 className="text-white fw-bold mb-1">CyberQuest CTF</h3>
                            <p className="text-white mb-0">Capture The Flag cybersecurity competition</p>
                          </div>
                          <span className="badge bg-primary rounded-pill px-3 py-2">December 2023</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <div className="position-relative">
                      <img
                        src="/Frame 5348.png"
                        className="d-block w-100"
                        alt="Tech Talk Series"
                      />
                      <div
                        className="position-absolute bottom-0 start-0 w-100 p-4"
                        style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}
                      >
                        <div className="d-flex justify-content-between align-items-end">
                          <div>
                            <h3 className="text-white fw-bold mb-1">Tech Talk Series</h3>
                            <p className="text-white mb-0">Month-long series of talks by industry professionals</p>
                          </div>
                          <span className="badge bg-primary rounded-pill px-3 py-2">November 2023</span>
                        </div>
                      </div>
                    </div>
                  </div>
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

      {/* About the Association */}
      <div className="container mt-5 mb-5">
        <div className="row mb-5">
          <div className="col-lg-6">
            <h2 className="display-6 fw-bold mb-4">About the Association</h2>
            <p className="lead">
              The IT Association is involved in the planning and integration of student technical activities. It promotes a sense of group responsibility and plays the critical role of student representation for preparing themselves to the IT industry.
            </p>
            <ul>
              <li>Conducting the professional activities such as Guest lectures, Seminars, Technical Symposiums etc.</li>
              <li>Encourage a close knit interpersonal relationship among the members.</li>
              <li>Encourage a close knit interpersonal relationship among the members.</li>
            </ul>
            <div className="d-flex flex-wrap gap-2 mt-4">
              <div className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">Student-Led</div>
              <div className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                Technical Excellence
              </div>
              <div className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                Leadership Development
              </div>
              <div className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                Community Engagement
              </div>
              <div className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">Industry Connect</div>
            </div>
          </div>
          <div className="col-lg-6">
            <img
              src="/Frame 5446.png"
              alt="IT Student Association"
              className="img-fluid rounded-4 shadow"
            />
            {/* <div className="row mt-4">
              <div className="col-6">
                <div className="card border-0 bg-primary bg-opacity-10 h-100">
                  <div className="card-body text-center">
                    <h3 className="display-4 fw-bold text-primary">15+</h3>
                    <p className="mb-0">Events Conducted</p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card border-0 bg-primary bg-opacity-10 h-100">
                  <div className="card-body text-center">
                    <h3 className="display-4 fw-bold text-primary">500+</h3>
                    <p className="mb-0">Active Members</p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Programs Conducted Table */}
      <div className="container-fluid bg-light py-5 mb-5">
        <div className="container">
          <h2 className="display-6 fw-bold text-center mb-4">Programs Conducted</h2>
          <p className="text-center text-muted mb-5">
            A summary of events and programs organized by our association over the years
          </p>

          <div className="table-responsive">
            <table className="table table-hover border">
              <thead className="table-primary">
                <tr>
                  <th scope="col">Program Type</th>
                  <th scope="col">2020</th>
                  <th scope="col">2021</th>
                  <th scope="col">2022</th>
                  <th scope="col">2023</th>
                  <th scope="col">2024</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Technical Workshops</th>
                  <td>5</td>
                  <td>7</td>
                  <td>8</td>
                  <td>10</td>
                  <td>12</td>
                  <td>
                    <strong>42</strong>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Hackathons</th>
                  <td>1</td>
                  <td>1</td>
                  <td>2</td>
                  <td>2</td>
                  <td>3</td>
                  <td>
                    <strong>9</strong>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Guest Lectures</th>
                  <td>8</td>
                  <td>10</td>
                  <td>12</td>
                  <td>15</td>
                  <td>18</td>
                  <td>
                    <strong>63</strong>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Coding Competitions</th>
                  <td>3</td>
                  <td>4</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>
                    <strong>22</strong>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Industry Visits</th>
                  <td>2</td>
                  <td>0</td>
                  <td>1</td>
                  <td>3</td>
                  <td>4</td>
                  <td>
                    <strong>10</strong>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Technical Symposiums</th>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>
                    <strong>5</strong>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Community Outreach</th>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>
                    <strong>20</strong>
                  </td>
                </tr>
                <tr className="table-primary">
                  <th scope="row">Total Events</th>
                  <td>
                    <strong>22</strong>
                  </td>
                  <td>
                    <strong>26</strong>
                  </td>
                  <td>
                    <strong>32</strong>
                  </td>
                  <td>
                    <strong>41</strong>
                  </td>
                  <td>
                    <strong>50</strong>
                  </td>
                  <td>
                    <strong>171</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="row mt-4">
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
          </div>
        </div>
      </div>

      {/* Office Bearers Section - Auto-moving Cards */}
      <div className="container mt-5 mb-5">
        <h2 className="display-6 fw-bold text-center mb-2">Office Bearers</h2>
        <p className="text-center text-muted mb-5">Meet the student leaders who drive our association forward</p>

        <div className="position-relative">
          <div className="office-bearers-carousel d-flex overflow-hidden">
            {/* These cards will automatically move with JavaScript */}
            <div className="office-bearer-card px-2" style={{ minWidth: "300px" }}>
              <div className="card border-0 shadow-sm h-100">
                <div className="position-relative">
                  <img
                    src="Frame 5533.png"
                    className="card-img-top"
                    alt="President"
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-primary">2024-25</span>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold mb-1">Thanushya E</h5>
                  <p className="card-text text-primary mb-2">President</p>
                  <p className="card-text text-muted small">Final Year B.Tech</p>
                </div>
              </div>
            </div>

            <div className="office-bearer-card px-2" style={{ minWidth: "300px" }}>
              <div className="card border-0 shadow-sm h-100">
                <div className="position-relative">
                  <img
                    src="Frame 5533.png"
                    className="card-img-top"
                    alt="Vice President"
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-primary">2024-25</span>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold mb-1">Malar S</h5>
                  <p className="card-text text-primary mb-2">Secretary</p>
                  <p className="card-text text-muted small">Third Year B.Tech</p>
                </div>
              </div>
            </div>

            <div className="office-bearer-card px-2" style={{ minWidth: "300px" }}>
              <div className="card border-0 shadow-sm h-100">
                <div className="position-relative">
                  <img
                    src="Frame 5533.png"
                    className="card-img-top"
                    alt="Secretary"
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-primary">2024-25</span>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold mb-1">Maheswari K</h5>
                  <p className="card-text text-primary mb-2">Treasurer</p>
                  <p className="card-text text-muted small">Final Year B.Tech</p>
                </div>
              </div>
            </div>

            <div className="office-bearer-card px-2" style={{ minWidth: "300px" }}>
              <div className="card border-0 shadow-sm h-100">
                <div className="position-relative">
                  <img
                    src="Frame 5533.png"
                    className="card-img-top"
                    alt="Treasurer"
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-primary">2024-25</span>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold mb-1">Selva Kumar S</h5>
                  <p className="card-text text-primary mb-2">Vice-President</p>
                  <p className="card-text text-muted small">Final Year B.Tech</p>
                </div>
              </div>
            </div>

            <div className="office-bearer-card px-2" style={{ minWidth: "300px" }}>
              <div className="card border-0 shadow-sm h-100">
                <div className="position-relative">
                  <img
                    src="Frame 5533.png"
                    className="card-img-top"
                    alt="Treasurer"
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-primary">2024-25</span>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold mb-1">Sathi Udayaram N</h5>
                  <p className="card-text text-primary mb-2">Vice-President</p>
                  <p className="card-text text-muted small">Third Year B.Tech</p>
                </div>
              </div>
            </div>

            <div className="office-bearer-card px-2" style={{ minWidth: "300px" }}>
              <div className="card border-0 shadow-sm h-100">
                <div className="position-relative">
                  <img
                    src="Frame 5533.png"
                    className="card-img-top"
                    alt="Technical Lead"
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-primary">2024-25</span>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold mb-1">Ohm Prakash R</h5>
                  <p className="card-text text-primary mb-2">Join Secretary</p>
                  <p className="card-text text-muted small">Third Year B.Tech</p>
                </div>
              </div>
            </div>

            <div className="office-bearer-card px-2" style={{ minWidth: "300px" }}>
              <div className="card border-0 shadow-sm h-100">
                <div className="position-relative">
                  <img
                    src="Frame 5533.png"
                    className="card-img-top"
                    alt="Event Coordinator"
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-primary">2024-25</span>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold mb-1">Jawahar D</h5>
                  <p className="card-text text-primary mb-2">Event Coordinator</p>
                  <p className="card-text text-muted small">Third Year B.Tech</p>
                </div>
              </div>
            </div>

            <div className="office-bearer-card px-2" style={{ minWidth: "300px" }}>
              <div className="card border-0 shadow-sm h-100">
                <div className="position-relative">
                  <img
                    src="Frame 5533.png"
                    className="card-img-top"
                    alt="Event Coordinator"
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-primary">2024-25</span>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold mb-1">Ponsuwathini M</h5>
                  <p className="card-text text-primary mb-2">Event Coordinator</p>
                  <p className="card-text text-muted small">Second Year B.Tech</p>
                </div>
              </div>
            </div>

            <div className="office-bearer-card px-2" style={{ minWidth: "300px" }}>
              <div className="card border-0 shadow-sm h-100">
                <div className="position-relative">
                  <img
                    src="Frame 5533.png"
                    className="card-img-top"
                    alt="Event Coordinator"
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-primary">2024-25</span>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold mb-1">Aarthy K</h5>
                  <p className="card-text text-primary mb-2">Co-Curricular Coordinator</p>
                  <p className="card-text text-muted small">Third Year B.Tech</p>
                </div>
              </div>
            </div>

            <div className="office-bearer-card px-2" style={{ minWidth: "300px" }}>
              <div className="card border-0 shadow-sm h-100">
                <div className="position-relative">
                  <img
                    src="Frame 5533.png"
                    className="card-img-top"
                    alt="Event Coordinator"
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-primary">2024-25</span>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold mb-1">Priyadharshini R</h5>
                  <p className="card-text text-primary mb-2">Co-Curricular Coordinator</p>
                  <p className="card-text text-muted small">Second Year B.Tech</p>
                </div>
              </div>
            </div>

            <div className="office-bearer-card px-2" style={{ minWidth: "300px" }}>
              <div className="card border-0 shadow-sm h-100">
                <div className="position-relative">
                  <img
                    src="Frame 5533.png"
                    className="card-img-top"
                    alt="Event Coordinator"
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-primary">2024-25</span>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold mb-1">Geethanjali S</h5>
                  <p className="card-text text-primary mb-2">Co-Curricular Coordinator</p>
                  <p className="card-text text-muted small">Second Year B.Tech</p>
                </div>
              </div>
            </div>

            <div className="office-bearer-card px-2" style={{ minWidth: "300px" }}>
              <div className="card border-0 shadow-sm h-100">
                <div className="position-relative">
                  <img
                    src="Frame 5533.png"
                    className="card-img-top"
                    alt="Event Coordinator"
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-primary">2024-25</span>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold mb-1">Jawahar D</h5>
                  <p className="card-text text-primary mb-2">Magazine Coordinator</p>
                  <p className="card-text text-muted small">Third Year B.Tech</p>
                </div>
              </div>
            </div>

          </div>



          {/* Navigation controls */}
          <div className="position-absolute top-50 start-0 translate-middle-y">
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
            <div className="col">
              <div className="card border-0 shadow h-100">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src="Frame 5533.png"
                      className="img-fluid rounded-start h-100 object-fit-cover"
                      alt="Dr. Sharma"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title fw-bold">Mr.R.Prabhu</h5>
                      <p className="card-text text-muted small mb-2">Associate Professor /IT</p>
                      <p className="card-text small">
                        <Mail className="me-2" size={14} />
                        <span>exapmple@.edu</span>
                      </p>
                      <p className="card-text small">
                        <Phone className="me-2" size={14} />
                        <span>00000 00000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card border-0 shadow h-100">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src="Frame 5533.png"
                      className="img-fluid rounded-start h-100 object-fit-cover"
                      alt="Dr. Patel"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title fw-bold">Ms.K.Saranya</h5>
                      <p className="card-text text-muted small mb-2">Assistant Professor / IT</p>
                      <p className="card-text small">
                        <Mail className="me-2" size={14} />
                        <span>exaple@.edu</span>
                      </p>
                      <p className="card-text small">
                        <Phone className="me-2" size={14} />
                        <span>00000 00000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card border-0 shadow h-100">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src="Frame 5533.png"
                      className="img-fluid rounded-start h-100 object-fit-cover"
                      alt="Dr. Kumar"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title fw-bold">Mr.J.Dhyaneswaran</h5>
                      <p className="card-text text-muted small mb-2">Assistant Professor (SS) / IT</p>
                      <p className="card-text small">
                        <Mail className="me-2" size={14} />
                        <span>exaple@.edu</span>
                      </p>
                      <p className="card-text small">
                        <Phone className="me-2" size={14} />
                        <span>00000 00000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h2 className="display-6 fw-bold mb-4">Contact Us</h2>
            <p className="lead mb-4">
              Have questions about our association or interested in joining? Get in touch with us.
            </p>

            {/* <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="d-flex">
                  <div
                    className="rounded-circle bg-primary bg-opacity-10 p-3 me-3 d-flex align-items-center justify-content-center"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold">Office Location</h5>
                    <p className="text-muted mb-0">
                      Room 301, IT Department Building
                      <br />
                      University Campus, Main Road
                      <br />
                      City, State - 123456
                    </p>
                  </div>
                </div>
              </div>
            </div> */}

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
                    <p className="text-muted mb-0">
                      General Inquiries: itdept@.edu
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
                    <p className="text-muted mb-0">
                      Office:
                      <br />
                      President:
                      <br />
                      Secretary:
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
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-outline-primary rounded-circle"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="bi bi-twitter"></i>
                </a>
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

