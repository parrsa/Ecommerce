import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../Components/Rating'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScrenn = () => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState('');



  const navigate = useNavigate()
  let params = useParams();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;


  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate

  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (userInfo !== null) {
  //     setName(userInfo.name)
  //   }
  //   dispatch(listProductDetails(params._id))
  // }, [dispatch, params._id, qty, navigate])

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }

    if (userInfo !== null) {
      setName(userInfo.name)
    }

    dispatch(listProductDetails(params._id))

  }, [dispatch, params._id, successProductReview])


  const addToCartHandler = () => {
    navigate(`/cart/${params._id}?qty${qty}`, { state: { qty } })
  }


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(params._id, { name, rating, comment }));
  };


  return (
    <div>
      <Link to='/' className='btn btn-light my-3 rounded'>Go Back</Link>
      {loading ? <Loader />
        : error ? <Message variant="danger" > {error}</Message>
          : (
            <div>
              <Row>

                <Col md={6}>
                  <Image src={product.image} className='' fluid alt={product.name} />
                </Col>

                <Col md={3}>
                  <ListGroup variant='flush'>

                    <ListGroup.Item >
                      <h3>{product.name}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item >
                      {/* <Rating value={product.rating.rate  } text={`${product.rating.count} rating`} color={"#f8e825"} />  */}
                      <Rating value={product.rating} text={`${product.numReviews} rating`} color={"#f8e825"} />
                    </ListGroup.Item>


                    <ListGroup.Item>
                      price : ${product.price}
                    </ListGroup.Item>

                    <ListGroup.Item className='overflow-hidden'>
                      Description : {product.description}
                    </ListGroup.Item>

                  </ListGroup>
                </Col>


                <Col md={3}>
                  <Card>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>
                            <strong>${product.price}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            {product.countInStock > 0 ? `In Stock ${product.countInStock}` : "Out of Stock"}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {
                        product.countInStock > 0 && (
                          <ListGroup.Item >
                            <Row>
                              <Col>Qty</Col>
                              <Col xs="auto" className='my-1'>
                                <Form.Control
                                  as="select" value={qty} onChange={(e) => setQty(e.target.value)}
                                >

                                  {

                                    [...Array(product.countInStock).keys()].map((x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    ))
                                  }

                                </Form.Control>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )
                      }
                     
                        <ListGroup.Item>
                        <Button onClick={addToCartHandler} className='btn-block' disabled={product.countInStock == 0} type='button'>Add To Cart</Button>
                      </ListGroup.Item>
                   

                    </ListGroup>
                  </Card>
                </Col>

              </Row>

              <Row>
                <Col md={6}>
                  <h4>Reviews</h4>

                  {(product.review === undefined) ? (<Message variant='info'>Reviews not available</Message>) : (product.review.length === 0 && <Message variant='info'>No Reviews</Message>)}
                  {/* {Object.keys(product.review).length === 0 && <Message variant='info'>No Reviews</Message>} */}

                  <ListGroup variant='flush'>
                    {(product.review === undefined) ? (<Message variant='info'>Reviews not available</Message>) : (product.review.map((review) => (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} color='#f8e825' />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    )))}


                    <ListGroup.Item>
                      <h4>Write a review</h4>

                      {loadingProductReview && <Loader />}
                      {successProductReview && <Message variant='success'>Review Submitted</Message>}
                      {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                      {userInfo ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId='rating'>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                              as='select'
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value=''>Select...</option>
                              <option value='1'>1 - Poor</option>
                              <option value='2'>2 - Fair</option>
                              <option value='3'>3 - Good</option>
                              <option value='4'>4 - Very Good</option>
                              <option value='5'>5 - Excellent</option>
                            </Form.Control>
                          </Form.Group>

                          <Form.Group controlId='comment'>
                            <Form.Label>Review</Form.Label>
                            <Form.Control
                              as='textarea'
                              row='5'
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                          </Form.Group>

                          <Button
                            disabled={loadingProductReview}
                            type='submit'
                            variant='primary'
                          >
                            Submit
                          </Button>

                        </Form>
                      ) : (
                        <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>



            </div>
          )
      }


    </div>
  )
}

export default ProductScrenn