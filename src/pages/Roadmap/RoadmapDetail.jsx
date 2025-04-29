import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Accordion, Badge, ProgressBar } from "react-bootstrap";

export const RoadmapDetail = () => {
  const { domain } = useParams();
  const [subtopicLinks, setSubtopicLinks] = useState({});
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [finalProjectLink, setFinalProjectLink] = useState("");

  // Enhanced domain data with detailed content for each subtopic
  const domainData = {
    frontend: {
      title: "Frontend Development Roadmap",
      description: "Master the art of creating beautiful and functional user interfaces for the web.",
      subtopics: [
        {
          name: "HTML Basics",
          content: [
            "HTML Document Structure",
            "Semantic HTML Elements",
            "Forms and Input Elements",
            "Tables and Lists",
            "Media Elements"
          ],
          subtopicLinks: "hi",
        },
        {
          name: "CSS Basics",
          content: [
            "Selectors and Properties",
            "Box Model",
            "Flexbox Layout",
            "Grid Layout",
            "Transitions and Animations"
          ]
        },
        {
          name: "JavaScript Basics",
          content: [
            "Variables and Data Types",
            "Functions and Scope",
            "DOM Manipulation",
            "Events and Event Handling",
            "Asynchronous JavaScript"
          ]
        },
        {
          name: "Responsive Design",
          content: [
            "Media Queries",
            "Viewport Units",
            "Mobile-First Approach",
            "Responsive Images",
            "Responsive Typography"
          ]
        },
        {
          name: "Bootstrap",
          content: [
            "Grid System",
            "Components",
            "Utilities",
            "Customization",
            "Responsive Breakpoints"
          ]
        },
        {
          name: "Tailwind CSS",
          content: [
            "Utility-First Approach",
            "Responsive Design",
            "Component Extraction",
            "Configuration",
            "Dark Mode"
          ]
        }
      ],
      projects: ["Landing Page", "Portfolio Website", "Product Showcase Page"],
    },


  };

  // Check if domain exists
  if (!domainData[domain]) {
    return <Navigate to="/roadmap-domains" />;
  }

  const { title, description, subtopics, projects } = domainData[domain];

  // Calculate progress
  const completedSubtopics = Object.keys(subtopicLinks).filter(key => subtopicLinks[key]).length;
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
        <div className="mt-4">
          <div className="d-flex justify-content-between">
            <span>Your Progress</span>
            <span>{progress}%</span>
          </div>
          <ProgressBar now={progress} variant="success" className="mt-2" />
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="mb-5">
        <Card>
          <Card.Header as="h5">Learning Path</Card.Header>
          <Card.Body className="p-0">
            <Accordion defaultActiveKey="0">
              {subtopics.map((subtopic, index) => {
                const subtopicName = typeof subtopic === 'string' ? subtopic : subtopic.name;
                const isCompleted = subtopicLinks[subtopicName] && subtopicLinks[subtopicName].trim() !== "";
                
                return (
                  <Accordion.Item eventKey={index.toString()} key={index}>
                    <Accordion.Header>
                      <div className="d-flex align-items-center w-100 justify-content-between">
                        <span className="fs-5">{subtopicName}</span>
                        {isCompleted ? (
                          <Badge bg="success" className="me-3">Completed</Badge>
                        ) : (
                          <Badge bg="secondary" className="me-3">In Progress</Badge>
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
                      <div className="border-top pt-4 mt-2">
                        <p className="text-muted mb-3">Submit your GitHub project link for this subtopic:</p>
                        <Row>
                          <Col md={9}>
                            <Form.Control 
                              type="text" 
                              placeholder="GitHub project link" 
                              value={subtopicLinks[subtopicName] || ""}
                              onChange={(e) => handleSubtopicLinkChange(subtopicName, e.target.value)}
                            />
                          </Col>
                          <Col md={3}>
                            <Button 
                              variant={isCompleted ? "success" : "outline-primary"} 
                              className="w-100"
                            >
                              {isCompleted ? "Update" : "Submit"}
                            </Button>
                          </Col>
                        </Row>
                      </div>
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
            >
              Submit Final Project
            </Button>
          </Card.Body>
        </Card>
      </section>
    </Container>
  );
};