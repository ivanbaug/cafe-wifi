import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}
          className="form-cntr">
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
