import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Updates = () => {
  return (
    <>
        <section className="w-100 py-5 bg-light my-5">
            <Container>
                <h2 className="mb-4">Research Paper's</h2>
                <Row className="g-4">
                    <Col className="col-12"  >
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title className="d-flex align-items-center gap-2 m-0">
                                New AI Research Lab Inaugurated
                                </Card.Title>
                                <Card.Text style={{fontSize:"14px", color:"#838383  "}}>
                                March 12, 2025
                                </Card.Text>
                                <Card.Text className="fs-6" style={{textAlign:"justify"}}>
                                The department is proud to announce the inauguration of our new Artificial Intelligence Research Laboratory, equipped with the latest hardware and software tools.
                                </Card.Text>
                                <button className="btn btn-outline-dark py-1">Read More</button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-12"  >
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title className="d-flex align-items-center gap-2 m-0">
                                New AI Research Lab Inaugurated
                                </Card.Title>
                                <Card.Text style={{fontSize:"14px", color:"#838383  "}}>
                                March 12, 2025
                                </Card.Text>
                                <Card.Text className="fs-6" style={{textAlign:"justify"}}>
                                The department is proud to announce the inauguration of our new Artificial Intelligence Research Laboratory, equipped with the latest hardware and software tools.
                                </Card.Text>
                                <button className="btn btn-outline-dark py-1">Read More</button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-12"  >
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title className="d-flex align-items-center gap-2 m-0">
                                New AI Research Lab Inaugurated
                                </Card.Title>
                                <Card.Text style={{fontSize:"14px", color:"#838383  "}}>
                                March 12, 2025
                                </Card.Text>
                                <Card.Text className="fs-6" style={{textAlign:"justify"}}>
                                The department is proud to announce the inauguration of our new Artificial Intelligence Research Laboratory, equipped with the latest hardware and software tools.
                                </Card.Text>
                                <button className="btn btn-outline-dark py-1">Read More</button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}
