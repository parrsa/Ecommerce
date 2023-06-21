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

  const separated = (Number) => {

    if (Number !== undefined) {
      // return Number_sring;
      const Number_sring = Number.toString();
      let fraction = ''
      if (Number_sring.split('.').length > 1) {
        fraction = "/" + Number_sring.split('.')[1]
      } else {
      }
      Number = Number_sring.split('.')[0]
      const n = Number_sring.length;
      let output = ''
      Number = Number_sring.split('').reverse().join('')
      for (let index = 1; index < n + 1; index++) {
        let temp = Number.charAt(index - 1)
        if (index % 3 === 0 && index !== n) {
          output = output + temp + ','
        } else {
          output = output + temp
        }
      }
      return output.split('').reverse().join('') + fraction;

    } else {
      return Number;
    }
  }

  return (
    <div>
      <Link to='/' className='btn btn-light my-3 rounded'>برگشت</Link>
      {/* <Link to='/' className='btn btn-light my-3 rounded'>Go Back</Link> */}
      {loading ? <Loader />
        : error ? <Message variant="danger" > {error}</Message>
          : (
            <div>
              <Row>
                <Col md={5}>
                  <Image src={product.image} className='rounded' fluid alt={product.name} />
                </Col>


                <Col md={3} className='product-details-div-price-and-name'>
                  <ListGroup variant='flush'>

                    <ListGroup.Item >
                      <h3 className='h3 text-bold text-break  text-wrap'>{product.name}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item >
                      {/* <Rating value={product.rating.rate  } text={`${product.rating.count} rating`} color={"#f8e825"} />  */}
                      <Rating value={product.rating} text={`${product.numReviews} امتیاز`} color={"#f8e825"} />
                    </ListGroup.Item>


                    <ListGroup.Item>
                      قیمت : {` ${separated(product.price)} تومان`}
                    </ListGroup.Item>


                  </ListGroup>
                </Col>


                <Col md={4}>
                  <Card className='card-price-in-product-detils  rounded p-3'>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <Row>
                          <Col>قیمت:</Col>
                          <Col>
                            <strong>{` ${separated(product.price)} تومان`}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>موجودی:</Col>
                          <Col>
                            {product.countInStock > 0 ? `${product.countInStock}` : "موجود نیست"}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {
                        product.countInStock > 0 && (
                          <ListGroup.Item>
                            <Row>
                              <Col>تعداد</Col>
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

                      <ListGroup.Item className='submit-add-to-cart '>
                        <div>
                          <Button onClick={addToCartHandler} className='btn-block rounded' disabled={product.countInStock == 0} type='button'>اضافه کردن به سبد خرید</Button>
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>

                <Col md={6} className='box-description' id="box-description">
                  <ListGroup variant='flush'>

                    <ListGroup.Item className='overflow-hidden custom-text-justify' id='custom-text-justify' >
                      معرفی : <br />
                      {product.description}
                    </ListGroup.Item>

                  </ListGroup>
                </Col>

              </Row>

              <Row>
                <Col md={5} className='box-review ' id="box-review">
                  <h4 style={{ marginRight: "15px" }}>نظرات</h4>
                  {/* <h4>Reviews</h4> */}

                  {(product.review === undefined) ? (<Message variant='info'>نظرات موجود نیست</Message>) : (product.review.length === 0 && <Message variant='info'>نظراتی درمورد این محصول وارد نشده است</Message>)}
                  {/* {Object.keys(product.review).length === 0 && <Message variant='info'>No Reviews</Message>} */}

                  <ListGroup variant='flush'>
                    {(product.review === undefined) ? (<Message variant='info'>نظرات موجود نیست</Message>) : (product.review.map((review) => (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} color='#f8e825' />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    )))}


                    <ListGroup.Item>
                      <h4>نظر خود را وارد کنید</h4>
                      {/* <h4>Write a review</h4> */}

                      {loadingProductReview && <Loader />}
                      {successProductReview && <Message variant='success'>نظر با موفقیت ثبت شد</Message>}
                      {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                      {userInfo ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId='rating'>
                            <Form.Label>امتیاز دهی کنید</Form.Label>
                            <Form.Control
                              className='rounded'
                              as='select'
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value=''>انتخاب ...</option>
                              <option value='1'>1 - ضعیف</option>
                              <option value='2'>2 - منصفانه</option>
                              <option value='3'>3 - خوب</option>
                              <option value='4'>4 - خیلی خوب</option>
                              <option value='5'>5 - عالی</option>
                            </Form.Control>
                          </Form.Group>

                          <Form.Group controlId='comment'>
                            <Form.Label>نظرات خود را وارد کنید</Form.Label>
                            <Form.Control
                              as='textarea'
                              row='5'
                              value={comment}
                              className='rounded'
                              onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                          </Form.Group>

                          <Button
                            disabled={loadingProductReview}
                            type='submit'
                            variant='primary'
                            className='rounded submit-rating'
                          >
                            تایید
                          </Button>

                        </Form>
                      ) : (
                        <Message variant='info'>لطفا <Link to='/login'>ورود کنید </Link> برای نظر ثبت کردن</Message>
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