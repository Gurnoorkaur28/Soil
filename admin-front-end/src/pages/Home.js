import { Container, Row, Col } from "react-bootstrap";

function Home() {
  return (
    // Bootstrap container
    <Container
      fluid
      className="homeContainer d-flex justify-content-center align-items-center"
    >
      <Row>
        <Col>
          <div class="fs-1 fw-bold"> Welcome to </div>
          <div class="fs-2 fw-bolder">SOIL Admin Site</div>
        </Col>
      </Row>
    </Container>
  );
}
export default Home;
