import { useState, useRef, useEffect } from "react"
import { Card, Row, Col, Button, Form, Image } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import {
  FaUser,
  FaUniversity,
  FaUserTie,
  FaUsers,
  FaIdCard,
  FaEnvelope,
  FaPhone,
  FaGithub,
  FaCode,
  FaHackerrank,
  FaCamera,
  FaLinkedin,
} from "react-icons/fa"
import { StudentSideBar } from "../../components/StudentProfileComponent/StudentSideBar"
import axios from "axios"

export const StudentEditProfile = ({profileSubmit}) => {
  const navigate = useNavigate()
  const [profileSubmitted, setProfileSubmitted] = useState(null)
  const fileInputRef = useRef(null)

  const Sections = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
  ]

  const batches = [
    { id: 1, name: "Batch 1" },
    { id: 2, name: "Batch 2" },
    { id: 3, name: "Batch 3" },
  ]





  const [formData, setFormData] = useState({
    Name: "",
    department: "Information Technology",
    Section: "",
    collegeName: "Dr. Mahalingam College of Engineering and Technology",
    CC: "",
    Mentor: "",
    batch: "",
    RollNum: "",
    email: "",
    phoneNum: "",
    bio: "",
    Github: "",
    Leetcode: "",
    HackerRank: "",
    Linkedin: "",
    cgpa: "",
    profilePic: "", // Stores the existing image URL
  });

  const [mentor1, setMentor1] = useState("")
  const [mentor2, setMentor2] = useState("")
  const [mentor3, setMentor3] = useState("")

  const mentors = [
    { id: 1, name: mentor1 },
    { id: 2, name: mentor2 },
    { id: 3, name: mentor3 },
  ]
  
  const [profilePic, setProfilePic] = useState(null); // Stores the new image file
  
  // Fetch existing profile data
  useEffect(() => {
    const profileInfo = async () => {
      try {
        const response = await axios.get("https://test.mcetit.drmcetit.com/api/profile/edit/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
  
        console.log("hi",response.data);
        setFormData({
          ...response.data,
          profilePic: response.data.profilePic
            ? `https://test.mcetit.drmcetit.com/${response.data.profilePic}`
            : "/placeholder.svg",
        });
        setMentor1(response.data.mentor1)
        setMentor2(response.data.mentor2)
        setMentor3(response.data.mentor3)
      } catch (error) {
        console.error("Error fetching profile data:", error.response?.data || error);
      }
    };
  
    profileInfo();
  }, []);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  // Open file input
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  
  // Handle profile picture selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setProfilePic(file); // Store new file for submission
  
    // Preview the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        profilePic: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };
  
  
  async function fetchCSRFToken() {
    try {
        const response = await fetch("https://test.mcetit.drmcetit.com/api/get-csrf-token/", {
            credentials: "include",  // Ensure cookies are sent
        });
        const data = await response.json();
        console.log("Fetched CSRF Token:", data.csrfToken);
        return data.csrfToken;
    } catch (error) {
        console.error("Failed to fetch CSRF token", error);
        return null;
    }
}

  // Submit the form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const csrfToken = await fetchCSRFToken();
  
    const formDataToSend = new FormData();
      formDataToSend.append("Name", formData.Name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("Section",formData.Section);
      formDataToSend.append("CC",formData.CC);
      formDataToSend.append("Mentor", formData.Mentor);
      formDataToSend.append("batch", formData.batch);
      formDataToSend.append("phoneNum", formData.phoneNum);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("Github", formData.Github);
      formDataToSend.append("Linkedin", formData.Linkedin);
      formDataToSend.append("Leetcode", formData.Leetcode);
      formDataToSend.append("HackerRank", formData.HackerRank);
  
    // If a new profile picture is selected, append it
    if (profilePic) {
      formDataToSend.append("profilePic", profilePic);
    } else {
      // If no new image is selected, retain the existing image URL
      formDataToSend.append("profilePic", formData.profilePic);
    }
  
    try {
      const response = await fetch("https://test.mcetit.drmcetit.com/api/profile/edit/", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "X-CSRFToken": csrfToken,
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: formDataToSend, // Don't set Content-Type manually for FormData
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update profile. Status: ${response.status}`);
      }
  
      //alert("Profile updated successfully!");
      setProfileSubmitted(profileSubmit);
      navigate("/student-profile/info/");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to update profile.");
    }
  };
  
  // Handle cancel button
  const handleCancel = () => {
    navigate("/student-profile/info/");
  };


  // delete profile
  const deleteProfile = () => {
    // const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
    // if (confirmDelete) {
    //   try {
    //     const response = await fetch("https://test.mcetit.drmcetit.com/api"
    //       + "/profile/delete/", {
    //         method: "DELETE",
    //         credentials: "include",
    //         headers: {
    //           "X-CSRFToken": csrfToken,
    //           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    //           },
    //           }
    //           );
    //           if (!response.ok) {
    //             throw new Error(`Failed to delete profile. Status: ${response.status}`);
    //             }
    //             //alert("Profile deleted successfully!");
    //             setProfileSubmitted(profileSubmit);
    //             navigate("/student-profile/info/");
    //             } catch (error) {
    //               console.error("Error deleting profile:", error);
    //               alert("Failed to delete profile.");
    //               }
    //               }
    //               // delete profile end

    setProfilePic("/Profile_dup.png")
                  
  }


  
  




  return (
    <div className="d-flex">
      <StudentSideBar />
      <div className="flex-grow-1 p-4">
        <div className="mb-4">
          <h1 className="h3 fw-bold">Edit Profile</h1>
          <p className="text-muted">Update your personal information</p>
        </div>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={4} className="mb-4">
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center">

                  <div className="position-relative mb-4 d-inline-block">
                        <input
                          type="image"
                          src={
                            profilePic instanceof File
                              ? URL.createObjectURL(profilePic)
                              : formData.profilePic || "/placeholder.svg"
                          }
                          width={150}
                          height={150}
                          className="border p-1 bg-light rounded-circle"
                          style={{ objectFit: "cover" }}
                          alt="Profile"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent form submission
                            fileInputRef.current.click();
                          }}
                        />
                        <div
                          className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-2"
                          style={{ cursor: "pointer" }}
                          onClick={() => fileInputRef.current.click()}
                        >
                          <FaCamera color="white" />
                        </div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="d-none"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files.length > 0) {
                              setProfilePic(e.target.files[0]);
                            }
                          }}
                        />
                      </div>


                  <p className="text-muted small">
                    Click on the camera icon to upload a new profile picture.
                  </p>
                  {/* <button className="btn btn-danger" onClick={deleteProfile}>Delete Profile</button> */}
                </Card.Body>
              </Card>

              <Card className="mt-4 border-0 shadow-sm">
                <Card.Header className="bg-white border-bottom-0 pt-4">
                  <Card.Title className="h6 mb-0">Social Profiles</Card.Title>
                </Card.Header>
                <Card.Body className="pt-0">
                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex align-items-center">
                      <FaGithub className="me-2" /> GitHub Profile
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="Github"
                      value={formData.Github}
                      onChange={handleChange}
                      placeholder="github.com/username"
                      required
                    />
                    <Form.Text className="text-muted">Enter your GitHub username or profile URL</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex align-items-center">
                      <FaLinkedin className="me-2" /> LinkedIn Profile
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="Linkedin"
                      value={formData.Linkedin}
                      onChange={handleChange}
                      placeholder="linkedin.com/in/username"
                      required
                    />
                    <Form.Text className="text-muted">Enter your LinkedIn username or profile URL</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex align-items-center">
                      <FaCode className="me-2" /> LeetCode Profile
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="Leetcode"
                      value={formData.Leetcode}
                      onChange={handleChange}
                      placeholder="leetcode.com/username"
                      required
                    />
                    <Form.Text className="text-muted">Enter your LeetCode username or profile URL</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex align-items-center">
                      <FaHackerrank className="me-2" /> HackerRank Profile
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="HackerRank"
                      value={formData.HackerRank}
                      onChange={handleChange}
                      placeholder="hackerrank.com/username"
                      required
                    />
                    <Form.Text className="text-muted">Enter your HackerRank username or profile URL</Form.Text>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={8}>
              <Card className="mb-4 border-0 shadow-sm">
                <Card.Header className="bg-white border-bottom-0 pt-4">
                  <Card.Title className="h5 mb-0">About Me</Card.Title>
                </Card.Header>
                <Card.Body className="pt-2">
                  <Form.Group className="mb-3">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself, your skills, interests, and goals..."
                    />
                  </Form.Group>
                </Card.Body>
              </Card>

              <Card className="mb-4 border-0 shadow-sm">
                <Card.Header className="bg-white border-bottom-0 pt-4">
                  <Card.Title className="h5 mb-0">Personal Information</Card.Title>
                </Card.Header>
                <Card.Body className="pt-2">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaUser className="me-2" /> Full Name
                        </Form.Label>
                        <Form.Control type="text" name="Name" value={formData.Name} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaIdCard className="me-2" /> Roll Number
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="RollNum"
                          value={formData.RollNum}
                          onChange={handleChange}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaUniversity className="me-2" /> Department
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaUsers className="me-2" /> Section
                        </Form.Label>
                        <Form.Select name="Section" value={formData.Section} onChange={handleChange} required>
                          <option value="">Select Section</option>
                          {Sections.map((Section) => (
                            <option key={Section.id} value={Section.name}>
                              {Section.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaUsers className="me-2" /> Batch
                        </Form.Label>
                        <Form.Select name="batch" value={formData.batch} onChange={handleChange} required>
                          <option value="">Select Batch</option>
                          {batches.map((batch) => (
                            <option key={batch.id} value={batch.name.replace("Batch ", "")}>
                              {batch.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaUniversity className="me-2" /> College Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="collegeName"
                          value={formData.collegeName}
                          onChange={handleChange}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaUserTie className="me-2" /> Class Coordinator
                        </Form.Label>
                        <Form.Select name="CC" value={formData.CC} onChange={handleChange} readOnly>
                          <option value="">{formData.CC}</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaUserTie className="me-2" /> Mentor
                        </Form.Label>
                        <Form.Select name="Mentor" value={formData.Mentor} onChange={handleChange} required>
                          <option value="">Select Mentor</option>
                          {mentors.map((mentor) => (
                            <option key={mentor.id} value={mentor.name}>
                              {mentor.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaUser className="me-2" /> CGPA
                        </Form.Label>
                        <Form.Control type="text" name="cgpa" value={formData.cgpa} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Card className="mb-4 border-0 shadow-sm">
                <Card.Header className="bg-white border-bottom-0 pt-4">
                  <Card.Title className="h5 mb-0">Contact Information</Card.Title>
                </Card.Header>
                <Card.Body className="pt-2">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaEnvelope className="me-2" /> College Email
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="d-flex align-items-center">
                          <FaPhone className="me-2" /> phone Number
                        </Form.Label>
                        <Form.Control type="tel" name="phoneNum" value={formData.phoneNum} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <div className="d-flex justify-content-end mt-4">
                <Button variant="outline-secondary" onClick={handleCancel} className="me-2">
                    Cancel
                </Button>
                <Button variant="primary" type="submit" onClick={profileSubmitted}>
                  Save Changes
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}