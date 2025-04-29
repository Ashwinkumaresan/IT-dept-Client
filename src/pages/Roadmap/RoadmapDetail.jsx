import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Accordion, Badge, ProgressBar } from "react-bootstrap";
import axios from "axios";

export const RoadmapDetail = ({ domain }) => {
  const [subtopicLinks, setSubtopicLinks] = useState({});
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [finalProjectLink, setFinalProjectLink] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [domainData, setDomainData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("access_token")) setShowInput(true);
  }, []);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await axios.get(
          `https://test.mcetit.drmcetit.com/api/roadmap/detail/${domain}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
        );
        console.log("Fetched domainData:", response.data);

        const data = response.data[domain];
        setDomainData(data);

        // Initialize subtopic links from API values
        const initialSubLinks = {};
        data.subtopics.forEach(sub => {
          initialSubLinks[sub.name] = sub.subProjcetLinks || "";
        });
        setSubtopicLinks(initialSubLinks);

        // Initialize final project link
        setFinalProjectLink(data.projectLink || "");

      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
      }
    };

    fetchDomains();
  }, [domain]);

  const handleSubtopicLinkSubmit = async (subtopicName) => {
    try {
      await axios.post(
        `https://test.mcetit.drmcetit.com/api/roadmap/subtopic/submit`, // Ensure this is the correct API endpoint
        {
          link: subtopicLinks[subtopicName], // Only sending the link
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error submitting subtopic link:", error.response?.data || error.message);
    }
  };

  const handleFinalProjectSubmit = async () => {
    try {
      await axios.post(
        `https://test.mcetit.drmcetit.com/api/roadmap/finalproject/submit`, // Ensure this is the correct API endpoint
        {
          link: finalProjectLink, // Only sending the final project link
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error submitting final project:", error.response?.data || error.message);
    }
  };


  if (!domainData) {
    return <div>Loading...</div>;
  }

  const { title, description, subtopics, projects } = domainData;

  // Calculate progress
  const completedSubtopics = subtopics.filter(subtopic => {
    const value = subtopicLinks[subtopic.name];
    return value && value.trim() !== "";
  }).length;

  const progress = Math.round((completedSubtopics / subtopics.length) * 100);

  // Handle subtopic link submission
  const handleSubtopicLinkChange = (subtopicName, value) => {
    setSubtopicLinks({
      ...subtopicLinks,
      [subtopicName]: value
    });
  };

  // Handle project selection
  const handleProjectSelection = (project) => {
    if (selectedProjects.includes(project)) {
      setSelectedProjects(selectedProjects.filter(p => p !== project));
    } else {
      setSelectedProjects([...selectedProjects, project]);
    }
  };

  return (
    <Container className="py-5">
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
          <Card.Header as="h5">Learning Path</Card.Header>
          <Card.Body className="p-0">
            <Accordion defaultActiveKey="0">
              {subtopics.map((subtopic, index) => {
                const subtopicName = subtopic.name;
                const isCompleted = (subtopicLinks[subtopicName] || "").trim() !== "";

                return (
                  <Accordion.Item eventKey={index.toString()} key={index}>
                    <Accordion.Header>
                      <div className="d-flex align-items-center w-100 justify-content-between">
                        <span className="fs-5">{subtopicName}</span>
                        {showInput && (
                          <div>
                            {isCompleted ? (
                              <Badge bg="success" className="me-3">Completed</Badge>
                            ) : (
                              <Badge bg="secondary" className="me-3">In Progress</Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      {/* Content for each subtopic */}
                      {subtopic.content && (
                        <Card className="mb-4 border-0 shadow-sm">
                          <Card.Header className="bg-light">
                            <h5 className="mb-0">What You'll Learn</h5>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              {subtopic.content.map((item, i) => (
                                <Col md={6} lg={4} key={i} className="mb-3">
                                  <div className="d-flex align-items-center">
                                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: "24px", height: "24px", fontSize: "12px" }}>
                                      {i + 1}
                                    </div>
                                    <span>{item}</span>
                                  </div>
                                </Col>
                              ))}
                            </Row>
                          </Card.Body>
                        </Card>
                      )}

                      {/* GitHub submission for each subtopic */}
                      {showInput && (
                        <div className="border-top pt-4 mt-2">
                          <p className="text-muted mb-3">Submit your GitHub project link for this subtopic:</p>
                          <Row>
                            <Col md={9}>
                              <Form.Control
                                type="text"
                                placeholder="GitHub project link"
                                value={subtopicLinks[subtopicName]}
                                onChange={(e) => handleSubtopicLinkChange(subtopicName, e.target.value)}
                              />
                            </Col>
                            <Col md={3}>
                              <Button
                                variant={isCompleted ? "success" : "outline-primary"}
                                className="w-100"
                                onClick={() => handleSubtopicLinkSubmit(subtopicName)}
                              >
                                {isCompleted ? "Update" : "Submit"}
                              </Button>

                            </Col>
                          </Row>
                        </div>
                      )}
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
                    <Form.Check
                      type="checkbox"
                      id={`project-${index}`}
                      label={project}
                      checked={selectedProjects.includes(project)}
                      onChange={() => handleProjectSelection(project)}
                      className="fs-5"
                    />
                  </Card.Body>
                </Card>
              ))}
            </div>

            {showInput && (
              <div>
                <Form.Group className="mb-3">
                  <Form.Label>Submit your final project GitHub link:</Form.Label>
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
                  disabled={selectedProjects.length === 0 || !finalProjectLink}
                  onClick={handleFinalProjectSubmit}
                >
                  Submit Final Project
                </Button>

              </div>
            )}
          </Card.Body>
        </Card>
      </section>
    </Container>
  );
};
