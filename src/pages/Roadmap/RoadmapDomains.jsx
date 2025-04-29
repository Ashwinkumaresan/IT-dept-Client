import { Container, Row, Col } from "react-bootstrap"
import { DomainCard } from "./DomainCard"
import axios from "axios";
import { useEffect, useState } from "react";


export const RoadmapDomains = () => {
  const [domains, setDomains] = useState([]);
  const [domainData, setDomainData] = useState([]);
  // Mock data for domains directly in the RoadmapDomains component
  // const domains = [
  //   {
  //     id: "frontend",
  //     title: "Frontend Development",
  //   },
  //   {
  //     id: "backend",
  //     title: "Backend Development",
  //   },
  //   {
  //     id: "uiux",
  //     title: "UI/UX Design",
  //   },
  //   {
  //     id: "cybersecurity",
  //     title: "Cybersecurity",    },
  //   {
  //     id: "mobile",
  //     title: "Mobile Development",
  //   },
  //   {
  //     id: "datascience",
  //     title: "Data Science",
  //   },
  //   {
  //     id: "devops",
  //     title: "DevOps",
  //   },
  //   {
  //     id: "blockchain",
  //     title: "Blockchain Development",
  //   },
  // ]

  
  useEffect(() => {
    const fetchDomains = async () => {
        try {
            const response = await axios.get("https://test.mcetit.drmcetit.com/api/roadmap/topics/");
            console.log(response.data);

            setDomains(response.data);
        } catch (error) {
            console.error("Error fetching data:", error.response?.data || error.message);

        }
    };

    fetchDomains();
}, []);
  return (
    <Container className="py-5">
      <section className="text-center my-5">
        <h1 className="display-4 fw-bold mb-3">Learning Roadmaps</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
          Choose a domain to start your learning journey. Each roadmap provides a structured path to mastery.
        </p>
      </section>

      <section>
        <Row xs={1} sm={2} lg={3} className="g-4">
          {domains.map((domain) => (
            <Col key={domain.id}>
              <DomainCard domain={domain} />
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  )
}
