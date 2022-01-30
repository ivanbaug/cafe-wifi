import React from 'react';
import { Card, Row, Col, Button, ButtonGroup } from 'react-bootstrap';

const CafeCard = () => {
  return (
    <>

      <style type='text/css'>
        {`
      .card {
        position: relative;
        margin-bottom: 30px;
        border-radius: 6px;
        color: rgba(0, 0, 0, 0.87);
        background: #fff;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      }

      .res-card {
        width: 75%;
      }
      @media (max-width: 720px) {
        .res-card {
          width: 95%;
        }
      }

      .card .card-img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        margin-top: -10px;
        margin-bottom: 10px;
        border-radius: 6px;
        box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
      }

      .ci-left{
        margin-left: -15px;
        margin-right: 15px;
      }
      @media (max-width: 770px) {
        .ci-left{
          max-width: 94%;
          margin-left: 10px;
          margin-right: 10px;
        }
      }

        `}
      </style>
      <Card className='mx-auto mt-3 res-card'>
        <Row className='g-0'>
          <Col md={4}>
            <Card.Img className='ci-left' src="/images/00tostao.jpeg" />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title>Tostao Cafe y Pan</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Fake st. 123 (<Card.Link href="#">Map</Card.Link>)</Card.Subtitle>
              <Row>
                <Col>
                  Seats: 20+
                </Col>
                <Col>
                  WiFi: Yes
                </Col>
              </Row>
              <Row>
                <Col>
                  Toilets: Yes
                </Col>
                <Col>
                  Sockets: No
                </Col>
              </Row>
              <Row>
                <Col>Can take calls? : Yes
                </Col>
              </Row>
              <Row>
                <Col>Coffe price: $3
                </Col>
              </Row>
              <Row className='py-2 px-2'>
                <Button variant="primary">Rate this cafe</Button>
              </Row>
              <Row>
                <ButtonGroup className='px-2' aria-label="Author options">
                  <Button variant="info">Edit</Button>
                  <Button variant="secondary">Delete</Button>
                </ButtonGroup>
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  )
};

export default CafeCard;
