import { useEffect, useState } from 'react';
import { Button, Card, Container, Figure, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { createCafeReview, deleteCafeReview, listCafeDetails } from '../actions/cafeActions';
import CafeCard from '../components/CafeCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { CAFE_CREATE_REVIEW_RESET, CAFE_DELETE_RESET, CAFE_DELETE_REVIEW_RESET } from '../constants/cafeConstants';


const CafeScreen = () => {

  const [reviewTitle, setReviewTitle] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [reviewValue, setReviewValue] = useState(0)

  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const cafeDetails = useSelector(state => state.cafeDetails)
  const { error, loading: loadingCafe, cafe } = cafeDetails

  const cafeDelete = useSelector(state => state.cafeDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = cafeDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const cafeReviewCreate = useSelector(state => state.cafeCreateReview)
  const { error: errorCafeReview, loading: loadingCafeReview, success: successCafeReview } = cafeReviewCreate

  const cafeDeleteReview = useSelector(state => state.cafeDeleteReview)
  const { error: errorReviewDelete, success: successReviewDelete } = cafeDeleteReview


  const submitHandler = (e) => {
    e.preventDefault()
    // console.log(`title: reviewTitle`)
    dispatch(createCafeReview(
      params.id,
      {
        title: reviewTitle,
        comment: reviewText,
        rating: reviewValue,
      }))
  }

  const deleteReviewHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      dispatch(deleteCafeReview(id))
    }
  }

  useEffect(() => {
    if (successDelete) {
      navigate('/')
      dispatch({ type: CAFE_DELETE_RESET })
    }
    if (errorDelete) {
      window.alert(`Failed to delete cafe. ${errorDelete}`)
      dispatch({ type: CAFE_DELETE_RESET })
    }
    if (successCafeReview) {
      setReviewValue(0)
      setReviewTitle('')
      setReviewText('')
      dispatch({ type: CAFE_CREATE_REVIEW_RESET })
    }
    if (successReviewDelete) {
      dispatch({ type: CAFE_DELETE_REVIEW_RESET })
    }

    dispatch(listCafeDetails(params.id))
  }, [params, dispatch, errorDelete, successDelete, navigate, successCafeReview, successReviewDelete])

  return (
    <>
      <Link to='/' className='btn btn-light my-1'>Go back</Link>
      {loadingDelete && <Loader />}
      {
        loadingCafe
          ? <Loader />
          : error
            ? <Message variant='danger' >{error}</Message>
            : <CafeCard cafe={cafe} displayData='full' />
      }

      <h4>Leave a review</h4>
      {loadingCafeReview && <Loader />}
      {errorCafeReview && <Message variant='danger' >{errorCafeReview}, you can delete your previous review to submit a new one.</Message>}
      {
        userInfo
          ?
          <Card>
            <Card.Body>
              <Container>
                <Form onSubmit={submitHandler} >
                  <Form.Group controlId='reviewTitle' className='mb-2'>
                    <Form.Label className='mb-0 text-muted'>
                      <strong>Title:</strong>
                    </Form.Label>
                    <Form.Control
                      required
                      type='text'
                      placeholder='Give a short title for your review'
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId='reviewText' className='mb-2'>
                    <Form.Label className='mb-0 text-muted'>
                      <strong>Description:</strong>
                    </Form.Label>
                    <Form.Control
                      required
                      as='textarea'
                      type='text'
                      placeholder='Your thoughts on the place '
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId='reviewValue' className='mb-2'>
                    <Form.Label className='mb-0 text-muted'>
                      <strong>Rate:</strong>
                    </Form.Label>
                    <Form.Control
                      required
                      as='select'
                      value={reviewValue}
                      onChange={(e) => setReviewValue(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                    <div className="d-grid gap-2 mt-3">
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </div>
                  </Form.Group>
                </Form>
              </Container>
            </Card.Body>
          </Card>
          :
          <Card>
            <Card.Body>
              You can&nbsp;
              <Link to={'/login?redirect=' + location.pathname}><Button className='btn-sm'>Login 🙋🏻‍♂️</Button></Link> or <Link to={'/register?redirect=' + location.pathname}><Button className='btn-sm'>Register✍🏻</Button></Link> to leave a review.
            </Card.Body>
          </Card>
      }
      <h4>Reviews</h4>
      {
        loadingCafe
          ? <Loader />
          : cafe.reviews &&
            Object.values(cafe.reviews).length === 0
            ?
            <Card>
              <Card.Body>There are no reviews yet.</Card.Body>
            </Card>
            :
            <div id="reviews">
              {
                cafe.reviews &&
                cafe.reviews.map((review) => (
                  <Card className='mb-3' key={review.id}>
                    <Card.Body>
                      <Row>
                        <Col md={2}>
                          <Card.Text className='text-muted text-wrap'>
                            <span className='fs-1 fw-bold'>{Number(review.rating).toFixed(1)}</span> out of 5.0
                          </Card.Text>
                        </Col>
                        <Col md={10}>
                          <Card.Title>
                            {review.title}
                            {
                              userInfo && userInfo.user_id && (userInfo.user_id === review.user || userInfo.is_admin) &&
                              <Button
                                variant='link'
                                className='fs-6 btn-sm'
                                onClick={() => deleteReviewHandler(review.id)}
                              >(✘ Delete review)</Button>
                            }
                          </Card.Title>
                          {review.comment}
                          <Figure.Caption>-by {review.name} on {(new Date(review.date_edited)).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Figure.Caption>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
            </div>
      }

    </>
  )
};

export default CafeScreen;
