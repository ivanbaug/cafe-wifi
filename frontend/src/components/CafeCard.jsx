import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { deleteCafe } from '../actions/cafeActions';
import '../cardStyle.css'

const CafeCard = ({ cafe, displayData }) => {

  const dispatch = useDispatch()


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
            <Row>
              <Col md={8}>
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
              </Col>
              <Col md={4} >
                {cafe.rating
                  &&
                  <Card.Text className='text-muted text-wrap'>
                    <span className='fs-1'>{Number(cafe.rating).toFixed(1)}</span> out of 5.0
                  </Card.Text>
                }

              </Col>

            </Row>
            <Row>
              <Col>
                <strong>Seats:</strong> {cafe.seats}
              </Col>
              <Col>
                {
                  cafe.num_reviews > 0
                    ? <span className='text-muted text-wrap'>Reviewed {cafe.num_reviews} times.</span>
                    : <span className='text-muted' > Not rated yet </span>
                }

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
                <strong>User Ratings:</strong>

              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Coffee price:</strong> {cafe.coffee_price}
              </Col>
              <Col>
                <strong>WiFi:</strong> {cafe.has_wifi ? 'Yes' : 'No'}
              </Col>
            </Row>
            {
              displayData === 'full'
                ? (
                  <>
                    <Row>
                      <Card.Text className='py-3'>
                        <strong >📝 Author Description:</strong>
                        <br />
                        <span>{cafe.description}</span>
                      </Card.Text>
                      <Card.Text className='text-center'>
                        ☕🍪💻
                      </Card.Text>
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
              (userInfo && (userInfo.user_id === cafe.user || userInfo.is_admin)) &&
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
