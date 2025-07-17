import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Accordion, Badge, ProgressBar } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

export const RoadmapDetail = ({ domain }) => {
  const navigate = useNavigate();
  const [subtopicLinks, setSubtopicLinks] = useState({});
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [finalProjectLink, setFinalProjectLink] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [domainData, setDomainData] = useState(null);
  const [input, setInput] = useState(true);

  const token = localStorage.getItem("access_token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const notifyError = (obj) => {
    toast.error(obj, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifySuccess = (obj) => {
    toast.success(obj, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  useEffect(() => {
    if (localStorage.getItem("access_token"))
      setShowInput(true);
  }, []);

  const fetchDomains = async () => {
    try {
      const response = await axios.get(
        `https://test.mcetit.drmcetit.com/api/roadmap/detail/${domain}`,
        { headers }
      );
      //console.log("Fetched domainData:", response.data);

      const data = response.data[domain];
      setDomainData(data);

      // Initialize subtopic links from API values
      const initialSubLinks = {};
      data.subtopics.forEach((sub) => {
        initialSubLinks[sub.name] = sub.subProjcetLinks || "";
      });
      setSubtopicLinks(initialSubLinks);

      // Initialize final project link
      setFinalProjectLink(data.projectLink || "");
    } catch (error) {
      //console.error("Error fetching data:", error.response?.data || error.message);
    }
  };
  useEffect(() => {
    fetchDomains();
  }, [domain]);

  async function fetchCSRFToken() {
    try {
      const response = await fetch("https://test.mcetit.drmcetit.com/api/get-csrf-token/", {
        credentials: "include",  // Ensure cookies are sent
      });
      const data = await response.json();
      //console.log("Fetched CSRF Token:", data.csrfToken);
      return data.csrfToken;
    } catch (error) {
      //console.error("Failed to fetch CSRF token", error);
      return null;
    }
  }

  const handleSubtopicLinkSubmit = async (subtopicName) => {
    const csrfToken = await fetchCSRFToken();
    //console.log("CSRF Token:", csrfToken);

    const link = subtopicLinks[subtopicName];
    if (!localStorage.getItem("access_token")) {
      navigate("/student-login");
      return;
    }

    const headers = {
      "X-CSRFToken": csrfToken,
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    };

    // Prepare the body data as JSON
    const requestBody = {
      domain: domain,
      subtopicName: subtopicName,
      link: link,
    };

    //console.log("Request Body:", requestBody);
    //console.log("Headers being sent:", headers);

    try {
      const response = await fetch("https://test.mcetit.drmcetit.com/api/roadmap/subtopic/form/", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (response.ok) {
        //console.log("Submit res:", responseData);
        //alert("Sent");
        notifySuccess("Subitted");
      } else {
        //console.log("Error:", responseData);
        //alert("Failed to submit");
        //alert(responseData[0])
        notifyError(responseData[0]);

      }

      //console.log("Domain:", domain);
      //console.log("Subtopic:", subtopicName);
      //console.log("Link:", link);

    } catch (error) {
      //console.error("Error submitting subtopic link:", error.message);
    }
  };

  const handleFinalProjectSubmit = async () => {
    const csrfToken = await fetchCSRFToken();
    //console.log("CSRF Token:", csrfToken);
  
    if (!localStorage.getItem("access_token")) {
      navigate("/student-login");
      return;
    }
  
    const headers = {
      "X-CSRFToken": csrfToken,
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    };
  
    const requestBody = {
      domain: domain,
      link: finalProjectLink,
    };
  
    //console.log("Request Body:", requestBody);
    //console.log("Headers being sent:", headers);
  
    try {
      const response = await fetch("https://test.mcetit.drmcetit.com/api/roadmap/domain/form/", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        //console.log("Project Submit res:", responseData);
        notifySuccess("Final Project Submitted");
      } else {
        //console.log("Error:", responseData);
        notifyError(responseData[0]);
      }
  
      //console.log("Domain:", domain);
      //console.log("Project Link:", finalProjectLink);
  
    } catch (error) {
      //console.error("Error submitting final project:", error.message);
    }
  };
  

  if (!domainData) {
    return <div>Loading...</div>;
  }

  const { title, description, subtopics, projects } = domainData;

  // Calculate progress
  const completedSubtopics = subtopics.filter((subtopic) => {
    const value = subtopicLinks[subtopic.name];
    return value && value.trim() !== "";
  }).length;

  const progress = Math.round((completedSubtopics / subtopics.length) * 100);

  // Handle subtopic link submission
  const handleSubtopicLinkChange = (subtopicName, value) => {
    setSubtopicLinks({
      ...subtopicLinks,
      [subtopicName]: value,
    });
  };

  return (
    <Container className="py-5">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      {/* Header Section */}
      <section className="text-center my-5">
        <h1 className="display-4 fw-bold mb-3">{title}</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
          {description}
        </p>

        {/* Progress Bar */}
        {showInput && (
          <div className="mt-4">
            <div className="d-flex justify-content-between">
              <span>Your Progress</span>
              <span>{progress}%</span>
            </div>
            <ProgressBar now={progress} variant="success" className="mt-2" />
          </div>
        )}
      </section>

      {/* Learning Path Section */}
      <section className="mb-5">
        <Card>
          <Card.Header as="h5" >Learning Path</Card.Header>
          <Card.Body className="p-0">
            <Accordion defaultActiveKey="0">
              {subtopics.map((subtopic, index) => {
                const subtopicName = subtopic.name;
                const isCompleted = (subtopicLinks[subtopicName] || "").trim() !== "";

                return (
                  <Accordion.Item eventKey={index.toString()} key={index}>
                    <Accordion.Header>
                      <div className="d-flex align-items-center w-100 justify-content-between">
                        <span className="fs-6">{subtopicName}</span>
                        {isCompleted ? (
                          <Badge bg="success" className="me-3" style={{fontSize:"11px"}}>
                            Completed
                          </Badge>
                        ) : (
                          <Badge bg="secondary" className="me-3" style={{fontSize:"11px"}}>
                            In Progress
                          </Badge>
                        )}
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      {/* Content for each subtopic */}
                      {subtopic.content && (
                        <Card className="mb-4 border-0 shadow-sm">
                          <Card.Header className="bg-light">
                            <h5 className="mb-0 fs-14">What You'll Learn</h5>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              {subtopic.content.map((item, i) => (
                                <Col md={6} lg={4} key={i} className="mb-3">
                                  <div className="d-flex align-items-center">
                                    <div
                                      className=" bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                                      style={{ width: "20px", height: "20px", fontSize: "10px" }}
                                    >
                                      {i + 1}
                                    </div>
                                    <span className="fs-12">{item}</span>
                                  </div>
                                </Col>
                              ))}
                            </Row>
                          </Card.Body>
                        </Card>
                      )}

                      {/* GitHub submission for each subtopic */}
                      {input && <div className="border-top pt-4 mt-2">
                        <p className="text-muted mb-3 fs-14">Submit your GitHub project link for this subtopic (Make sure yor repository is public):</p>
                        <Row>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              placeholder="GitHub project link"
                              value={subtopicLinks[subtopicName]}
                              onChange={(e) => handleSubtopicLinkChange(subtopicName, e.target.value)}
                              required
                            />
                          </Col>
                          <Col md={3}>
                            <Button
                              variant={isCompleted ? "success" : "outline-primary"}
                              className="w-100 my-3 my-md-0"
                              onClick={() => handleSubtopicLinkSubmit(subtopicName)}
                            >
                              {isCompleted ? "Update" : "Submit"}
                            </Button>
                          </Col>
                        </Row>
                      </div>}
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          </Card.Body>
        </Card>
      </section>

      {/* Final Projects Section */}
      <section>
        <Card>
          <Card.Header as="h5">Final Projects</Card.Header>
          <Card.Body>
            <p className="text-muted mb-4">
              Complete at least one of the following projects to demonstrate your mastery:
            </p>

            <div className="mb-4">
              {projects.map((project, index) => (
                <Card key={index} className="mb-3 border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <div
                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{ width: "24px", height: "24px", fontSize: "12px" }}
                      >
                        {index + 1}
                      </div>
                      <span>{project}</span>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>

            <div>
              <Form.Group className="mb-3">
                <Form.Label className="fs-14">Submit your final project GitHub link (Make sure yor repository is public):</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="GitHub project link"
                  value={finalProjectLink}
                  onChange={(e) => setFinalProjectLink(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                className="w-100"
                disabled={!finalProjectLink}
                onClick={handleFinalProjectSubmit}
              >
                Submit Final Project
              </Button>
            </div>
          </Card.Body>
        </Card>
      </section>
    </Container>
  );
};
