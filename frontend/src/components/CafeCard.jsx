import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { Card, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { deleteCafe } from '../actions/cafeActions';
import '../cardStyle.css'

const CafeCard = ({ cafe, displayData }) => {

  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this cafe?')) {
      dispatch(deleteCafe(id))
    }
  }

  return (
    <Card className='mt-3'>
      <Row className='g-0'>
        <Col md={4}>
          <Card.Img className='ci-left' src={cafe.img_url} />
        </Col>
        <Col md={8}>
          <Card.Body>
            {
              displayData === 'full'
                ? (
                  <Card.Title>{cafe.name}</Card.Title>
                )
                : (
                  <LinkContainer to={`/cafe/${cafe.id}`}>
                    <Card.Title>{cafe.name}</Card.Title>
                  </LinkContainer>
                )
            }

            <Card.Subtitle className="mb-2 text-muted">{cafe.location} (<Card.Link href={cafe.map_url}>Map</Card.Link>)</Card.Subtitle>
            <Row>
              <Col>
                <strong>Seats:</strong> {cafe.seats}
              </Col>
              <Col>
                <strong>WiFi:</strong> {cafe.has_wifi ? 'Yes' : 'No'}
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Toilets:</strong>  {cafe.has_toilet ? 'Yes' : 'No'}
              </Col>
              <Col>
                <strong>Sockets:</strong> {cafe.has_sockets ? 'Yes' : 'No'}
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Can take calls?</strong> {cafe.can_take_calls ? 'Yes' : 'No'}
              </Col>
              <Col>
                <strong>User Rating:</strong> ###
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Coffee price:</strong> {cafe.coffee_price}
              </Col>
              <Col>
                Reviewed ### times
              </Col>
            </Row>
            {
              displayData === 'full'
                ? (
                  <>
                    <Row>
                      <Card.Text className='py-2'>
                        <strong>Author Description:</strong>
                        <br />
                        {cafe.description}
                      </Card.Text>

                    </Row>

                    <Row className='py-2 px-2'>
                      <Link className='d-grid gap-2 px-0' to={`/cafe/${cafe.id}`}>
                        <Button variant="primary">Leave a review 📝</Button>
                      </Link>
                    </Row>
                  </>
                )
                : (
                  <Row className='py-2 px-2'>
                    <Link className='d-grid gap-2 px-0' to={`/cafe/${cafe.id}`} >
                      <Button variant="primary">☕ More info / Review 📶</Button>
                    </Link>
                  </Row>
                )
            }
            {
              (userInfo && (userInfo.id === cafe.user)) &&
              <Row>
                <ButtonGroup className='px-2' aria-label="Author options">
                  <LinkContainer to={`/cafe/${cafe.id}/edit`}>
                    <Button variant="info">Edit</Button>
                  </LinkContainer>
                  <Button
                    variant="secondary"
                    onClick={() => deleteHandler(cafe.id)} >
                    Delete
                  </Button>
                </ButtonGroup>
              </Row>
            }


          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
};

CafeCard.defaultProps = {
  cafe: {
    id: 0,
    name: '',
    map_url: '',
    img_url: '',
    location: '',
    seats: '',
    has_toilet: false,
    has_wifi: false,
    has_sockets: false,
    can_take_calls: false,
    coffee_price: '',
    description: '',
  },
  displayData: ''
}

export default CafeCard;
