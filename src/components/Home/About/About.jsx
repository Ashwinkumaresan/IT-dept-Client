import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import { useInView } from "react-intersection-observer"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap,faShapes } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
// import { FaInfoCircle, FaGraduationCap, FaUniversity, FaUsers } from "react-icons/fa";

export const About = () => {
    const [counterState, setCounterState] = useState(false);
    const { ref, inView } = useInView();

  return (
    <>
    <section className="w-100 py-5 bg-light my-5">
      <Container>
        <h2 className="text-center mb-4">Explore Our Department</h2>
        <Row className="g-4">
          <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}  >
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="d-flex align-items-center gap-2">
                <i class="bi bi-info-circle"></i>
                  About
                </Card.Title>
                <Card.Text className="text-muted fs-14">
                  Learn about our history, vision, mission, and faculty members.
                </Card.Text>
                <Link to="/about" className="text-primary" style={{textDecoration:"none"}}>
                  Learn more →
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faGraduationCap} />
                  Placement
                </Card.Title>
                <Card.Text className="text-muted fs-14">
                  Discover our placement records, top recruiters, and success stories.
                </Card.Text>
                <Link to="/placement" className="text-primary" style={{textDecoration:"none"}}>
                  Learn more →
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faShapes} />
                  Facilities
                </Card.Title>
                <Card.Text className="text-muted fs-14">
                  Explore our state-of-the-art labs, library, and research facilities.
                </Card.Text>
                <Link to="/facilities" className="text-primary" style={{textDecoration:"none"}}>
                  Learn more →
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="d-flex align-items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="#000" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5S5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05c1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5"/></svg>
                  Association
                </Card.Title>
                <Card.Text className="text-muted fs-14">
                  Join our student clubs, events, and professional associations.
                </Card.Text>
                <Link to="/association" className="text-primary" style={{textDecoration:"none"}}>
                  Learn more →
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>

    <section className="w-100">
        <Container>
        <h2 className="text-center mb-4">Department Highlights</h2>
            <Row ref={ref}>
                <Col xs={6} sm={6} md={3} lg={3} xl={3} className="text-center my-3">
                    <h2 className="display-6 fw-bold">
                        { inView  && <CountUp
                        start={0}
                        end={5}
                        duration={2.75} >
                        </CountUp>}+
                        </h2>
                    <p>Years of Excellence</p>
                </Col>
                <Col xs={6} sm={6} md={3} lg={3} xl={3} className="text-center my-3">
                    <h2 className="display-6 fw-bold">
                    { inView  && <CountUp
                        start={0}
                        end={90}
                        duration={2.75} >
                        </CountUp>}%</h2>
                    <p>Placement Rate</p>
                </Col>
                <Col xs={6} sm={6} md={3} lg={3} xl={3} className="text-center my-3">
                    <h2 className="display-6 fw-bold">
                    { inView  && <CountUp
                        start={0}
                        end={25}
                        duration={2.75} >
                        </CountUp>}+</h2>
                    <p>Faculty Member</p>
                </Col>
                <Col xs={6} sm={6} md={3} lg={3} xl={3} className="text-center my-3">
                    <h2 className="display-6 fw-bold">
                    { inView  && <CountUp
                        start={0}
                        end={50}
                        duration={2.75} >
                        </CountUp>}+</h2>
                    <p>Research Publications</p>
                </Col>
            </Row>
        </Container>
    </section>
    </>
    
  );
};

