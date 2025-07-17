import { Container, Row, Col, Spinner } from "react-bootstrap"
import { DomainCard } from "./DomainCard"
import axios from "axios";
import { useEffect, useState } from "react";


export const RoadmapDomains = () => {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await axios.get("https://test.mcetit.drmcetit.com/api/roadmap/topics/");
        //console.log(response.data);
        setDomains(response.data);
      } catch (error) {
        //console.error("Error fetching data:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDomains();
  }, []);

  return (
    <Container className="py-5">
      <section className="text-center my-5">
        <h1 className="display-4 fw-bold mb-3">Learning Roadmaps</h1>
        <p className="text-center fs-5" style={{ color: "#606060" }}>
          Choose a domain to start your learning journey. Each roadmap provides a structured path to mastery.
        </p>
      </section>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="dark" />
          <p className="mt-3 fs-5">Loading roadmaps...</p>
        </div>
      ) : (
        <section>
          <Row xs={1} sm={2} lg={3} className="g-4">
            {domains.map((domain) => (
              <Col key={domain.id}>
                <DomainCard domain={domain} />
              </Col>
            ))}
          </Row>
        </section>
      )}
    </Container>
  )
}
