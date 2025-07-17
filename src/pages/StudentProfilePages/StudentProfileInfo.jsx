"use client"

import { useEffect, useState } from "react"
import { Card, Row, Col, Button, Image, Spinner } from "react-bootstrap"
import { Link } from "react-router-dom"
import {
  FaEdit,
  FaUniversity,
  FaGithub,
  FaHackerrank,
  FaLinkedin,
  FaCode,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaQuoteLeft,
  FaQuoteRight,
  FaIdCard,
  FaUsers,
  FaUserTie,
  FaSchool,
  FaChalkboardTeacher,
  FaChartLine,
} from "react-icons/fa"
import { StudentSideBar } from "../../components/StudentProfileComponent/StudentSideBar"
import axios from "axios"

export const StudentProfileInfo = () => {
  const [loading, setLoading] = useState(true)

  const [name, setName] = useState("")
  const [rollno, setRollno] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [dept, setDept] = useState("Information Technology")
  const [college, setCollege] = useState("Dr. Mahalingam College of Engineering and Technology")
  const [section, setSection] = useState("")
  const [github, setGithub] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [hackerrank, setHackerrank] = useState("")
  const [leetcode, setLeetcode] = useState("")
  const [batch, setBatch] = useState("")
  const [mentor, setMentor] = useState("")
  const [cc, setCc] = useState("")
  const [bio, setBio] = useState("")
  const [profilePic, setProfilePic] = useState("")
  const [cgpa, setCgpa] = useState("") // Added for CGPA

  const studentData = async () => {
    try {
      const response = await axios.get("https://test.mcetit.drmcetit.com/api/profile/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      const data = response.data
      setName(data.Name)
      setRollno(data.RollNum)
      setEmail(data.email)
      setPhone(data.phoneNum)
      setSection(data.Section)
      setBatch(data.batch)
      setGithub(data.Github)
      setLeetcode(data.Leetcode)
      setLinkedin(data.Linkedin)
      setHackerrank(data.HackerRank)
      setCc(data.CC)
      setMentor(data.Mentor)
      setBio(data.bio === "null" ? "" : data.bio)
      setCgpa(data.cgpa || "Not available") // Set CGPA

      const profilePicture = `https://test.mcetit.drmcetit.com/${data.profilePic}`
      setProfilePic(data.profilePic ? profilePicture : "/Profile_dup.png")
    } catch (error) {
      //console.error("Error fetching student data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    studentData()
  }, [])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" role="status" style={{ width: "4rem", height: "4rem" }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <div className="d-flex">
      <StudentSideBar />
      <div className="flex-grow-1 p-4">
        <div className="mb-4 d-flex justify-content-between align-items-center bg-white">
          <div>
            <h1 className="h3 fw-bold">Personal Information</h1>
            <p className="text-muted">View your personal details and academic information</p>
          </div>
          <Link to="/student-profile/info/edit">
            <Button variant="primary">
              <FaEdit />
            </Button>
          </Link>
        </div>

        <Row>
          <Col lg={4} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center">
                <Image
                  src={profilePic || "/placeholder.svg"}
                  roundedCircle
                  width={130}
                  height={130}
                  className="border p-1 bg-light mb-3"
                  style={{ objectFit: "cover" }}
                />
                <h4 className="mb-1">{name}</h4>
                <p className="text-muted mb-2">{rollno}</p>
                <p className="mb-2 badge bg-light text-dark border">
                  <FaUniversity className="me-1" />
                  {dept}
                </p>
                <p>
                  <span className="badge bg-primary me-2">Section {section}</span>
                  <span className="badge bg-secondary">Batch {batch}</span>
                </p>
              </Card.Body>
            </Card>

            {/* Contact Information */}
            <Card className="mt-4 border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom-0 pt-4">
                <Card.Title className="h6 mb-0">Contact Information</Card.Title>
              </Card.Header>
              <Card.Body className="pt-0">
                <div className="d-flex align-items-center mb-3 p-2 bg-light rounded">
                  <FaEnvelope className="me-3 text-primary" />
                  <div>
                    <div className="small text-muted">College Email</div>
                    <div>{email}</div>
                  </div>
                </div>
                <div className="d-flex align-items-center p-2 bg-light rounded">
                  <FaPhone className="me-3 text-primary" />
                  <div>
                    <div className="small text-muted">Phone</div>
                    <div>{phone}</div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Social Profiles */}
            <Card className="mt-4 border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom-0 pt-4">
                <Card.Title className="h6 mb-0">Social Profiles</Card.Title>
              </Card.Header>
              <Card.Body className="pt-0">
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center mb-3 p-2 bg-light rounded text-decoration-none text-dark"
                >
                  <FaGithub className="me-3" /> <div>GitHub</div>
                </a>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center mb-3 p-2 bg-light rounded text-decoration-none text-dark"
                >
                  <FaLinkedin className="me-3 text-primary" /> <div>LinkedIn</div>
                </a>
                <a
                  href={leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center mb-3 p-2 bg-light rounded text-decoration-none text-dark"
                >
                  <FaCode className="me-3 text-warning" /> <div>LeetCode</div>
                </a>
                <a
                  href={hackerrank}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center p-2 bg-light rounded text-decoration-none text-dark"
                >
                  <FaHackerrank className="me-3 text-success" /> <div>HackerRank</div>
                </a>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Section */}
          <Col lg={8}>
            {/* About Me */}
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom-0 pt-4">
                <Card.Title className="h5 mb-0">About Me</Card.Title>
              </Card.Header>
              <Card.Body className="pt-2">
                <div className="position-relative p-4 bg-light rounded">
                  <FaQuoteLeft
                    className="position-absolute text-primary opacity-25"
                    style={{ top: "10px", left: "10px", fontSize: "1.5rem" }}
                  />
                  <p className="mb-0 px-4">{bio || "No bio information available."}</p>
                  <FaQuoteRight
                    className="position-absolute text-primary opacity-25"
                    style={{ bottom: "10px", right: "10px", fontSize: "1.5rem" }}
                  />
                </div>
              </Card.Body>
            </Card>

            {/* Academic Details - Updated to match Contact Information style */}
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom-0 pt-4">
                <Card.Title className="h5 mb-0">Academic Details</Card.Title>
              </Card.Header>
              <Card.Body className="pt-2">
                <Row>
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center p-2 bg-light rounded">
                      <FaIdCard className="me-3 text-primary" />
                      <div>
                        <div className="small text-muted">Roll Number</div>
                        <div>{rollno}</div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center p-2 bg-light rounded">
                      <FaUniversity className="me-3 text-primary" />
                      <div>
                        <div className="small text-muted">Department</div>
                        <div>{dept}</div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center p-2 bg-light rounded">
                      <FaUsers className="me-3 text-primary" />
                      <div>
                        <div className="small text-muted">Section</div>
                        <div>{section}</div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center p-2 bg-light rounded">
                      <FaGraduationCap className="me-3 text-primary" />
                      <div>
                        <div className="small text-muted">Batch</div>
                        <div>{batch}</div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center p-2 bg-light rounded">
                      <FaSchool className="me-3 text-primary" />
                      <div>
                        <div className="small text-muted">College</div>
                        <div>{college}</div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center p-2 bg-light rounded">
                      <FaChartLine className="me-3 text-primary" />
                      <div>
                        <div className="small text-muted">CGPA</div>
                        <div>{cgpa}</div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center p-2 bg-light rounded">
                      <FaUserTie className="me-3 text-primary" />
                      <div>
                        <div className="small text-muted">Class Coordinator</div>
                        <div>{cc}</div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center p-2 bg-light rounded">
                      <FaChalkboardTeacher className="me-3 text-primary" />
                      <div>
                        <div className="small text-muted">Mentor</div>
                        <div>{mentor}</div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}
