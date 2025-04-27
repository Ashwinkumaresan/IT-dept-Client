import { useState, useEffect, useRef } from "react"
import { Navbar, Nav, Container, Button } from "react-bootstrap"
import { Link } from 'react-router-dom';
import "./Navbar.css"

const ModernNavbar = () => {
  const [expanded, setExpanded] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [state, setState] = useState(true)
  const [profile, setProfile] = useState(false)
  const [profileSvg, setProfileSvg] = useState(false)
  const [staffProfile, setStaffProfile] = useState(false)
  const navbarRef = useRef(null)
  const [openPopup, setOpenPopup] = useState(false)

  // To stop scrolling while popup open index-168
  if (openPopup) {
    document.body.classList.add('active_modal');
  }
  else {
    document.body.classList.remove('active_modal');
  }

  // To scroll to top when order button triggers
  function Scroll() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target) && expanded) {
        setExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [expanded])

  // Close navbar when menu item is clicked in mobile view
  const handleNavItemClick = () => {
    if (window.innerWidth < 992) {
      setExpanded(false)
    }
  }
  useEffect(() => {
    if (localStorage.getItem("access_token") || localStorage.getItem("access_token_staff")) {
      setState(false);
      setProfileSvg(true);
    }
    if (localStorage.getItem("access_token")) {
      setProfile(true);
    }
    if (localStorage.getItem("access_token_staff")) {
      setStaffProfile(true);
    }
  }, [])

  return (
    <>
      {
        openPopup &&
        <div className="popup_login" style={{ zIndex: "999999999999" }}>
          <div>
            <div>
              <div className="container  border rounded ps-5 pb-5 pt-5">
                <button className="X" onClick={() => setOpenPopup(false)}><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z" /></svg></button>
                <div className="row border rounded">
                  <div className="col-12 col-md-6 bg-primary text-white rounded p-5">
                    <p className="m-0">Login</p>
                    <h1 className="mb-4">For Student</h1>
                    <Link to="/student-login">
                      <button className="w-100 btn btn-light">Login</button>
                    </Link>
                    <p className="m-0">Don't have an account? <Link to="/student-signup"><span className="text-white" style={{
                      borderBottom: "1px solid white"
                    }}>Sign up</span></Link></p>
                  </div>
                  <div className="col-12 col-md-6 bg-white text-dark p-5">
                    <p className="m-0">Login</p>
                    <h1 className="mb-4">For Staff's</h1>
                    <Link to="/staff-login">
                      <button className="w-100 btn btn-primary">Login</button>
                    </Link>
                    <p className="m-0">Don't have an account? <Link to="/staff-signup"><span style={{ color: "black" }} >Sign up</span></Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <Navbar
        ref={navbarRef}
        expand="lg"
        expanded={expanded}
        className={`modern-navbar ${scrolled ? "scrolled" : ""} m-0 p-0`}
        fixed="top"
      >
        <Container>
          <Navbar.Brand href="/" className="brand">
            <div className="d-flex align-items-center">
              <img src="mcetlogo.png" alt="" style={{
                width: "55px", height: "55px", objectFit: "contain"
              }} />
              <div>
                <span className="m-0 p-0 d-none d-md-block" style={{ fontSize: "8px" }}>Dr.Mahalingam College of Engineering and Technology</span>
                <p className="m-0 p-0 fw-bold" style={{ fontSize: "15px" }}>Information Technology</p>
              </div>
            </div>
          </Navbar.Brand>

          <div className="d-flex align-items-center">
            <div className="login-button-container d-lg-none">
              {profileSvg && profile &&
                <a href="/#/student-profile" onClick={() => {
                  window.location.reload();
                }}>
                  <Link to="/student-profile">
                    <button className="btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="#000000" d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" /></svg>
                    </button>
                  </Link>
                </a>
              }
              {profileSvg && staffProfile &&
                <a href="/#/staff-profile" onClick={() => {
                  window.location.reload();
                }}>
                  <Link to="/staff-profile">
                    <button className="btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="#000000" d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" /></svg>
                    </button>
                  </Link>
                </a>
              }
              {state && <button className='btn btn-primary text-white ms-lg-3 px-4' style={{ fontSize: "12px" }} onClick={() => [setOpenPopup(true), Scroll()]}>Login</button>}
            </div>

            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={() => setExpanded(!expanded)}
              className="custom-toggler"
            >
              <div className={`hamburger ${expanded ? "active" : ""}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </Navbar.Toggle>
          </div>

          <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
            <Nav className="mx-auto">
              <Link to="/" onClick={handleNavItemClick} className="nav-link" style={{ fontSize: "12px" }}>
                Home
              </Link>
              <Link to="/about" onClick={handleNavItemClick} className="nav-link" style={{ fontSize: "12px" }}>
                About
              </Link>
              <Link to="/placement" onClick={handleNavItemClick} className="nav-link" style={{ fontSize: "12px" }}>
                Placement
              </Link>
              <Link to="/facilities" onClick={handleNavItemClick} className="nav-link" style={{ fontSize: "12px" }}>
                Facilities
              </Link>
              <Link to="/association" onClick={handleNavItemClick} className="nav-link" style={{ fontSize: "12px" }}>
                Association
              </Link>
              <Link to="/gallery" onClick={handleNavItemClick} className="nav-link" style={{ fontSize: "12px" }}>
                PrideWall
              </Link>
            </Nav>

            <div className="d-none d-lg-block">
              {state && <button className='btn btn-primary text-white ms-lg-3 px-4' style={{ fontSize: "12px" }} onClick={() => [setOpenPopup(true), Scroll()]}>Login</button>}
              {profileSvg && profile &&
                <a href="/#/student-profile" onClick={() => {
                  window.location.reload();
                }}>
                  <Link to="/student-profile">
                    <button className="btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="#000000" d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" /></svg>
                    </button>
                  </Link>
                </a>
              }
              {profileSvg && staffProfile &&
                <a href="/#/staff-profile" onClick={() => {
                  window.location.reload();
                }}>
                  <Link to="/staff-profile">
                    <button className="btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="#000000" d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" /></svg>
                    </button>
                  </Link>
                </a>
              }
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default ModernNavbar

