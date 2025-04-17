import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Image, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaEdit, FaUser, FaUniversity, FaUserTie, FaUsers, FaIdCard, 
  FaEnvelope, FaPhone, FaGithub, FaCode, FaHackerrank, FaLinkedin,
  FaQuoteLeft, FaQuoteRight, FaGraduationCap
} from 'react-icons/fa';
import { StudentSideBar } from "../../components/StudentProfileComponent/StudentSideBar"
import axios from 'axios';

export const StudentProfileInfo = () => {
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dept, setDept] = useState("Information Technology");
  const [college, setCollege] = useState("Dr. Mahalingam College og Engineering and Technology");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [hackerrank, setHackerrank] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [batch, setBatch] =  useState("");
  const [mentor, setMentor] = useState("");
  const [cc, setCc] = useState("");
  const [bio, setBio] = useState("")
  const [profilePic, setProfilePic] = useState("");

  const studentData = async () =>{
    const response = await axios.get("https://test.mcetit.drmcetit.com/api/profile/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    console.log("server response:", response.data);
    setName(response.data.Name);
    setRollno(response.data.RollNum);
    setEmail(response.data.email);
    setPhone(response.data.phoneNum);
    setSection(response.data.Section);
    setBatch(response.data.batch);
    setGithub(response.data.Github);
    setLeetcode(response.data.Leetcode);
    setLinkedin(response.data.Linkedin);
    setHackerrank(response.data.HackerRank);
    setCc(response.data.CC);
    setMentor(response.data.Mentor);
    setBio(response.data.bio);
    if(response.data.bio == "null"){
      setBio("")
    }

    const profilePicture = `https://test.mcetit.drmcetit.com/${response.data.profilePic}`;
    if(response.data.profilePic == null){
      setProfilePic("/Profile_dup.png");
      console.log(null);
    }
    else{
      console.log("response pic")
      setProfilePic(profilePicture);
    }
    
  }
  useEffect(()=>{
    studentData();
  },[])

  // Render information field (label and value)
  const InfoField = ({ icon, label, value, link = false }) => (
    <Row className="mb-3 align-items-center">
      <Col sm={4} className="text-muted">
        {icon} {label}
      </Col>
      <Col sm={8} className="fw-medium">
        {link && value ? (
          <a href={`httpss://${value}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
            {value}
          </a>
        ) : (
          value || "Not specified"
        )}
      </Col>
    </Row>
  );

  return (
    <div className="d-flex">
      <StudentSideBar />
      <div className="flex-grow-1 p-4">
        <div className="mb-4 d-flex justify-content-between align-items-center bg-white" style={{
          backgroundColor:"ffffff",
          position:"sticky",
          top:"0",
          zIndex:"9"
        }}>
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
                <div className="mb-3 position-relative">
                  <div className="position-relative d-inline-block">
                    <Image 
                      src={profilePic || "/Profile_dup.png"} 
                      roundedCircle 
                      width={130} 
                      height={130} 
                      className="border p-1 bg-light"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="position-absolute bottom-0 end-0">
                      <FaGraduationCap color="blue" size={16} />
                    </div>
                  </div>
                </div>
                <h4 className="mb-1">{name}</h4>
                <p className="text-muted mb-2">{rollno}</p>
                <p className="mb-2 badge bg-light text-dark border">
                  <FaUniversity className="me-1" />
                  {dept}
                </p>
                <p className="mb-3">
                  <span className="badge bg-primary me-2">Section {section}</span>
                  <span className="badge bg-secondary">Batch {batch}</span>
                </p>
              </Card.Body>
            </Card>

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

            <Card className="mt-4 border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom-0 pt-4">
                <Card.Title className="h6 mb-0">Social Profiles</Card.Title>
              </Card.Header>
              <Card.Body className="pt-0">
                <a href={github} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center mb-3 p-2 bg-light rounded text-decoration-none text-dark">
                  <FaGithub className="me-3 text-dark" />
                  <div>
                    <div className="small text-muted">GitHub</div>
                    
                  </div>
                </a>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center mb-3 p-2 bg-light rounded text-decoration-none text-dark">
                  <FaLinkedin className="me-3 text-primary" />
                  <div>
                    <div className="small text-muted">LinkedIn</div>
                    <div>{studentData.linkedinProfile}</div>
                  </div>
                </a>
                <a href={leetcode} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center mb-3 p-2 bg-light rounded text-decoration-none text-dark">
                  <FaCode className="me-3 text-warning" />
                  <div>
                    <div className="small text-muted">LeetCode</div>
                    <div>{studentData.leetcodeProfile}</div>
                  </div>
                </a>
                <a href={hackerrank} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center p-2 bg-light rounded text-decoration-none text-dark">
                  <FaHackerrank className="me-3 text-success" />
                  <div>
                    <div className="small text-muted">HackerRank</div>
                    <div>{studentData.hackerrankProfile}</div>
                  </div>
                </a>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8}>
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom-0 pt-4">
                <Card.Title className="h5 mb-0">About Me</Card.Title>
              </Card.Header>
              <Card.Body className="pt-2">
                <div className="position-relative p-4 bg-light rounded">
                  <FaQuoteLeft className="position-absolute text-primary opacity-25" style={{ top: '10px', left: '10px', fontSize: '1.5rem' }} />
                  <p className="mb-0 px-4">{bio}</p>
                  <FaQuoteRight className="position-absolute text-primary opacity-25" style={{ bottom: '10px', right: '10px', fontSize: '1.5rem' }} />
                </div>
              </Card.Body>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom-0 pt-4">
                <Card.Title className="h5 mb-0">Academic Details</Card.Title>
              </Card.Header>
              <Card.Body className="pt-2">
                <div className="p-3 mb-4 bg-light rounded">
                  <h6 className="border-bottom pb-2 mb-3 d-flex align-items-center">
                    <FaUser className="me-2 text-primary" /> Student Information
                  </h6>
                  <Row className="mb-2">
                    <Col sm={6}>
                      <div className="mb-3">
                        <div className="small text-muted">Full Name</div>
                        <div className="fw-medium">{name}</div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <div className="small text-muted">Roll Number</div>
                        <div className="fw-medium">{rollno}</div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <div className="small text-muted">Department</div>
                        <div className="fw-medium">{dept}</div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <div className="small text-muted">Section & Batch</div>
                        <div className="fw-medium">Section {section}, Batch {batch}</div>
                      </div>
                    </Col>
                  </Row>
                </div>
                
                <div className="p-3 bg-light rounded">
                  <h6 className="border-bottom pb-2 mb-3 d-flex align-items-center">
                    <FaUniversity className="me-2 text-primary" /> Institution Information
                  </h6>
                  <Row>
                    <Col sm={6}>
                      <div className="mb-3">
                        <div className="small text-muted">College Name</div>
                        <div className="fw-medium">{college}</div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <div className="small text-muted">Class Coordinator</div>
                        <div className="fw-medium">{cc}</div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div>
                        <div className="small text-muted">Mentor</div>
                        <div className="fw-medium">{mentor}</div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};