import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUpload } from 'react-icons/fa';
import { StudentSideBar } from '../../components/StudentProfileComponent/StudentSideBar';
import axios from 'axios';

export const StudentProfileSubmitActivity = ({ activitySubmit }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validated, setValidated] = useState(false);
  const [fileName, setFileName] = useState('');
  const [empty, setEmpty] = useState(false)
  const [emptyYear, setEmptyYear] = useState(false)
  const [emptyLevel, setEmptyLevel] = useState(false)
  const [emptyEvent, setEmptyEvent] = useState(false)
  const [emptyType, setEmptyType] = useState(false)
  const [emptyMode, setEmptyMode] = useState(false)
  const [emptyCategory, setEmptyCategory] = useState(false)
  const [emptyPlace, setEmptyPlace] = useState(false)
  const [emptyDate, setEmptyDate] = useState(false)
  const [emptyOrganizer, setEmptyOrganizer] = useState(false)
  const [emptyTeam, setEmptyTeam] = useState(false)
  const [emptyDes, setEmptyDes] = useState(false)
  const [activityToast, setActivityToast] = useState(null);


  const [formData, setFormData] = useState({
    department: 'IT',
    year: '',
    student: '',
    rollNo: '',
    level: '',
    event: '',
    type: '',
    mode: '',
    category: '',
    place: '',
    date: '',
    organizer: '',
    club: '',
    // award: '',
    teamInd: '',
    description: '',
    proofAttachment: ''
  });

  // Show award field only if place is "Award"
  //   const showAwardField = formData.place === 'Award';

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value, // Ensure value is updated correctly
    });
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setFileName(file.name);
      setFormData((prevData) => ({
        ...prevData,
        proofAttachment: file,  // Store the actual file object
      }));
    }
  };


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const form = e.currentTarget;

  //   if (form.checkValidity() === false) {
  //     e.stopPropagation();
  //     setValidated(true);
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   // Simulate API call
  //   setTimeout(() => {
  //     console.log(formData);
  //     setIsSubmitting(false);
  //     alert('Activity submitted successfully!');
  //     navigate('/profile/co-curricular/view');
  //   }, 1500);
  // };

  const home = async () => {
    try {
      const responseGet = await axios.get(
        "https://test.mcetit.drmcetit.com/api/event/certificate/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      console.log(responseGet.data);
      console.log(responseGet.data.student)
      setFormData((prevData) => ({
        ...prevData,
        student: responseGet.data.student, // Replace with actual data
      }));
      setFormData((prevData) => ({
        ...prevData,
        rollNo: responseGet.data.rollNo, // Replace with actual data
      }));

    } catch (error) {
      console.log("Error");
      console.error("Error fetching data:", error.response?.data);
    }
  };
  useEffect(() => {
    home()
  }, [])
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
  const handleSubmit = async (event) => {
    event.preventDefault();

    const csrfToken = await fetchCSRFToken();

    const formDataToSend = new FormData();
    formDataToSend.append("year", formData.year);
    formDataToSend.append("student", formData.student);
    formDataToSend.append("rollNo", formData.rollNo);
    formDataToSend.append("level", formData.level);
    formDataToSend.append("event", formData.event);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("mode", formData.mode);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("place", formData.place);
    formDataToSend.append("organizer", formData.organizer);
    formDataToSend.append("club", formData.club);
    formDataToSend.append("teamInd", formData.teamInd);
    formDataToSend.append("description", formData.description);

    // Check if proofAttachment is provided before appending
    if (formData.proofAttachment) {
      formDataToSend.append("proofAttachment", formData.proofAttachment);
    }

    try {
      const response = await fetch("https://test.mcetit.drmcetit.com/api/event/certificate/", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        let errorData;

        // Try parsing JSON response if possible
        try {
          errorData = await response.json();
        } catch (jsonError) {
          throw new Error(`https error! Status: ${response.status} - Unable to parse error response`);
        }

        if (response.status === 400 && typeof errorData === "object") {
          let missingFields = Object.keys(errorData);
          // alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
          // alert(`Please fill in all required fields: ${missingFields.date}`);
          setEmpty(true);
          console.error("Validation errors:", errorData);
          console.error("Validation errors:", errorData.type);

          if (errorData.year[0])
            setEmptyYear(true);
          else
            setEmptyYear(false);

          if (errorData.event[0])
            setEmptyEvent(true);
          else
            setEmptyEvent(false);

          if (errorData.level[0])
            setEmptyLevel(true);
          else
            setEmptyLevel(false);

          if (errorData.type[0])
            setEmptyType(true);
          else
            setEmptyType(false);

          if (errorData.mode[0])
            setEmptyMode(true);
          else
            setEmptyMode(false);

          if (errorData.category[0])
            setEmptyCategory(true);
          else
            setEmptyCategory(false);

          if (errorData.place[0])
            setEmptyPlace(true);
          else
            setEmptyPlace(false);

          if (errorData.organizer[0])
            setEmptyOrganizer(true);
          else
            setEmptyOrganizer(false);

          if (errorData.date[0])
            setEmptyDate(true);
          else
            setEmptyDate(false);

          if (errorData.type[0])
            setEmptyTeam(true);
          else
            setEmptyTeam(false);

          if (errorData.description[0])
            setEmptyDes(true);
          else
            setEmptyDes(false);

          return;
        }

        throw new Error(`https error! Status: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const result = await response.json();
      console.log("Form submission successful:", result);
      setActivityToast(activitySubmit);
      navigate("/student-profile/view/participated");

    } catch (error) {
      console.error("Error submitting form:", error);
      //alert("Error submitting form. Please try again.");
    }

  };




  return (
    <div className="d-flex">
      <StudentSideBar />
      <div className="flex-grow-1 p-4">
        <div className="mb-4 bg-white" style={{
          backgroundColor: "ffffff",
          position: "sticky",
          top: "0",
          zIndex: "9"
        }}>
          <h1 className="h3 fw-bold">Submit Your Activity</h1>
          <p className="text-muted">
            Add details about your co-curricular and extra curricular activities and achievements
          </p>
        </div>

        <div className="form-container">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="department">
                  <Form.Label>Department</Form.Label>
                  <Form.Select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    readOnly
                  >
                    <option value="IT">Information Technology (IT)</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select your department.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="year">
                  <Form.Label>Event's Academic Year</Form.Label>
                  <Form.Select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="2023-2024">2023-2024</option>
                    <option value="2022-2023">2022-2023</option>
                    <option value="2021-2022">2021-2022</option>
                    <option value="2020-2021">2020-2021</option>
                    <option value="2019-2020">2019-2020</option>
                  </Form.Select>
                  {
                    emptyYear &&
                    <div className=" text-danger" role="alert">
                      Please select the year of the year
                    </div>
                  }
                  <Form.Control.Feedback type="invalid">
                    Please select the academic year.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="student">
                  <Form.Label>Student Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="student"
                    placeholder="Enter your full name"
                    value={formData.student}
                    onChange={handleChange}
                    readOnly
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="rollNo">
                  <Form.Label>Roll Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="rollNo"
                    placeholder="Enter your roll number"
                    value={formData.rollNo}
                    onChange={handleChange}
                    readOnly
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your roll number.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="event">
                  <Form.Label>Event Name (Ex: Technical quize, Among Us)</Form.Label>
                  <Form.Control
                    type="text"
                    name="event"
                    placeholder="Enter the name of the event "
                    value={formData.event}
                    onChange={handleChange}
                    required
                  />
                  {
                    emptyEvent &&
                    <div className=" text-danger" role="alert">
                      Please select the year of the event
                    </div>
                  }
                  <Form.Control.Feedback type="invalid">
                    Please provide an event name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="level">
                  <Form.Label>Competition Level</Form.Label>
                  <Form.Select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="Zonal">Zonal</option>
                    <option value="State">State</option>
                    <option value="District">District</option>
                    <option value="National">National</option>
                    <option value="Inter-college">Inter-college</option>
                    <option value="Intra-college">Intra-college</option>
                    <option value="Other-college">Other-college</option>
                  </Form.Select>
                  {
                    emptyLevel &&
                    <div className=" text-danger" role="alert">
                      Please select the year of the level
                    </div>
                  }
                  <Form.Control.Feedback type="invalid">
                    Please select the competition level.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group className="mb-3" controlId="type">
                  <Form.Label>Activity Type</Form.Label>
                  <Form.Select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Co-curricular">Co-curricular</option>
                    <option value="Extra-curricular">Extra-curricular</option>
                  </Form.Select>
                  {
                    emptyType &&
                    <div className=" text-danger" role="alert">
                      Please select the year of the type
                    </div>
                  }
                  <Form.Control.Feedback type="invalid">
                    Please select the activity type.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3" controlId="mode">
                  <Form.Label>Mode</Form.Label>
                  <Form.Select
                    name="mode"
                    value={formData.mode}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Mode</option>
                    <option value="Internal">Internal (within institution)</option>
                    <option value="External">External (outside institution)</option>
                  </Form.Select>
                  {
                    emptyMode &&
                    <div className=" text-danger" role="alert">
                      Please select the year of the mode
                    </div>
                  }
                  <Form.Control.Feedback type="invalid">
                    Please select the mode.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Training">Training</option>
                    <option value="Sports">Sports</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Technical">Technical</option>
                    <option value="Competition">Competition</option>
                    <option value="Conference">Conference</option>
                  </Form.Select>
                  {
                    emptyCategory &&
                    <div className=" text-danger" role="alert">
                      Please select the year of the category
                    </div>
                  }
                  <Form.Control.Feedback type="invalid">
                    Please select a category.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group className="mb-3" controlId="place">
                  <Form.Label>place</Form.Label>
                  <Form.Select
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select place</option>
                    <option value="First">First</option>
                    <option value="Second">Second</option>
                    <option value="Third">Third</option>
                    <option value="Participation">Participated</option>
                  </Form.Select>
                  {
                    emptyPlace &&
                    <div className=" text-danger" role="alert">
                      Please select the year of the place
                    </div>
                  }
                  <Form.Control.Feedback type="invalid">
                    Please select your place.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3" controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    onInvalid={(e) => {
                      e.preventDefault(); // Prevent default browser tooltip
                      alert("Please select a valid date.");
                    }}

                  />
                  <Form.Text className="text-muted">
                    Format: DD-MM-YYYY
                  </Form.Text>
                  {
                    emptyDate &&
                    <div className=" text-danger" role="alert">
                      Please select the year of the date
                    </div>
                  }
                  <Form.Control.Feedback type="invalid">
                    Please select a date.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3" controlId="teamInd">
                  <Form.Label>Participation Type</Form.Label>
                  <Form.Select
                    name="teamInd"
                    value={formData.teamInd}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Individual">Individual</option>
                    <option value="Team">Team</option>
                  </Form.Select>
                  {
                    emptyTeam &&
                    <div className=" text-danger" role="alert">
                      Please select the year of the team
                    </div>
                  }
                  <Form.Control.Feedback type="invalid">
                    Please select participation type.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="organizer">
                  <Form.Label>Organizer</Form.Label>
                  <Form.Control
                    type="text"
                    name="organizer"
                    placeholder="Name of the organizing institution"
                    value={formData.organizer}
                    onChange={handleChange}
                    required
                  />
                  {
                    emptyOrganizer &&
                    <div className=" text-danger" role="alert">
                      Please select the year of the organizer
                    </div>
                  }
                  <Form.Control.Feedback type="invalid">
                    Please provide the organizer name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="club">
                  <Form.Label>Club/Assosiation (if applicable)</Form.Label>
                  <Form.Control
                    type="text"
                    name="club"
                    placeholder="Name of the club or cell"
                    value={formData.club}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    Leave blank if not applicable
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            {/* {showAwardField && (
              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="award">
                    <Form.Label>Award/Achievement</Form.Label>
                    <Form.Control
                      type="text"
                      name="award"
                      placeholder="Name of the award or medal received"
                      value={formData.award}
                      onChange={handleChange}
                      required={showAwardField}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide the award details.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            )} */}

            <Form.Group className="mb-4" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={4}
                placeholder="Describe your role, achievements, and experience"
                value={formData.description}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={500}
              />
              <Form.Text className="text-muted">
                Provide details about your participation, role, and what you learned (10-500 characters).
              </Form.Text>
              {
                emptyDes &&
                <div className=" text-danger" role="alert">
                  Please select the year of the descriptions
                </div>
              }
              <Form.Control.Feedback type="invalid">
                Please provide a description (10-500 characters).
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label htmlFor="file-upload">Proof of Participation (if certificate available or pictures)</Form.Label>
              <div className="d-flex align-items-center gap-3">
                <Button
                  variant="outline-secondary"
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  <FaUpload className="me-2" /> Upload File
                </Button>

                <Form.Control
                  type="file"
                  id="file-upload"
                  className="d-none"
                  accept=".jpg,.jpeg,.png,.pdf"  // Restrict to common file types
                  onChange={handleFileChange}
                />

                <span className="text-muted small">
                  {fileName ? fileName : 'No file selected'}
                </span>
              </div>

              <Form.Text className="text-muted">
                Upload certificates, photos, or any proof of your participation.
              </Form.Text>

              <Form.Control.Feedback type="invalid">
                Please upload proof of participation.
              </Form.Control.Feedback>
            </Form.Group>


            <div className="d-flex justify-content-end gap-2 mt-5">
              <Button
                variant="outline-secondary"
                onClick={() => navigate('/profile')}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                onClick={activityToast}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Activity'}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

