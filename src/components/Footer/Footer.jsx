import React from "react";
import {Link} from "react-router-dom";
import { Envelope, Telephone, GeoAlt, Github, Linkedin, Twitter, Instagram } from "react-bootstrap-icons";

export const Footer = () => {
  return (
    <footer className="position-relative w-100 ">
      {/* Background Image with Overlay */}
      <div className="position-absolute top-0 start-0 end-0 bottom-0 bg-dark opacity-75">
        <div
          className="position-absolute top-0 start-0 end-0 bottom-0 opacity-30"
          style={{
            backgroundImage: "url('/Campus.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "screen",
            opacity:"0.3"
          }}
        />
      </div>

      {/* Footer Content */}
      <div className="position-relative container py-5 text-white">
        <div className="row gy-4">
          {/* Navigation Links */}
          <div className="col-md-4">
            <h3 className="fs-4 fw-bold border-bottom border-white border-opacity-25 pb-2 mb-3">Navigation</h3>
            <nav className="d-flex flex-column gap-2">
              <Link to="/" className="text-white text-decoration-none hover-opacity">
                Home
              </Link>
              <Link to="/about" className="text-white text-decoration-none hover-opacity">
                About
              </Link>
              <Link to="/placement" className="text-white text-decoration-none hover-opacity">
                Placement
              </Link>
              <Link to="/facilities" className="text-white text-decoration-none hover-opacity">
                Facilities
              </Link>
              <Link to="/association" className="text-white text-decoration-none hover-opacity">
                Association
              </Link>
              <Link to="/gallery" className="text-white text-decoration-none hover-opacity">
                PrideWall
              </Link>
              <Link to="/roadmap-domains" className="text-white text-decoration-none hover-opacity">
                Roadmap
              </Link>
            </nav>
          </div>

          {/* Technical Support */}
          <div className="col-md-4">
            <h3 className="fs-4 fw-bold border-bottom border-white border-opacity-25 pb-2 mb-3">Technical Support</h3>
            <div className="mb-3">
              <p className="text-white">
                Our dedicated team provides technical support for the department and assists with resolving any
                technical issues.
              </p>
              <div className="mt-3">
                <h4 className="fw-medium">Team Members:</h4>
                <ul className="list-unstyled small">
                  <li className="mb-1">Akash K - Backend Developer (2nd year IT-A)</li>
                  <li className="mb-1">Ashwin K - Frontend Designer & Developer (2nd year IT-A)</li>
                  <li className="mb-1">Pranesh S - Frontend Developer (2nd year IT-B)</li>
                  <li className="mb-1">Ravi visvesh S - Cloud Maintanence (2nd year IT-B)</li>
                  <li className="mb-1">Karthick M - Tester (2nd year IT-A)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="col-md-4">
            <h3 className="fs-4 fw-bold border-bottom border-white border-opacity-25 pb-2 mb-3">Contact Us</h3>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center">
                <GeoAlt className="me-2 text-white-50" size={16} />
                <span className="small">IT Department, MCET A-Block</span>
              </div>
              <div className="d-flex align-items-center">
                <Telephone className="me-2 text-white-50" size={16} />
                <span className="small">04259 - 236030/40/50 Ext: 395</span>
              </div>
              <div className="d-flex align-items-center">
                <Envelope className="me-2 text-white-50" size={16} />
                <span className="small">hod_it@drmcet.ac.in</span>
              </div>

              <div className="mt-3">
                <div className="d-flex gap-3 mt-2">
                  <Link to="https://www.instagram.com/mcet_it_department?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" className="text-white hover-opacity">
                    <Instagram size={20}/>
                    <span className="ms-2">Instagram</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-top border-white border-opacity-10 text-center small text-white">
          <p>© {new Date().getFullYear()} IT Department. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
