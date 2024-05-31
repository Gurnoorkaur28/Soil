import { Row, Col, Container } from "react-bootstrap";

function Home() {
  return (
    // Bootstrap container
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <div className="vh-90">
            <div className="fs-1 fw-bold"> Welcome to </div>
            <div className="fs-2 fw-bolder">SOIL Admin Site</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Home;
