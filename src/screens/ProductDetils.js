import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../Components/Rating'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions';

const ProductScrenn = () => {
  const [qty, setQty] = useState(1);
  const navigate = useNavigate()
  let params = useParams();

  const productDetails = useSelector(state => state.productDetails);

  const { loading, error, product } = productDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductDetails(params._id))
  }, [dispatch, params])

  const addToCartHandler = () => {
    navigate(`/cart/${params._id}?qty${qty}`, { state: { qty } })
  }
  
  return (
    <div>
      <Link to='/' className='btn btn-light my-3 rounded'>Go Back</Link>

      {loading ? <Loader />
        : error ? <Message variant="danger" > {error}</Message>
          : (
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
                        <ListGroup.Item>
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
          )
      }


    </div>
  )
}

export default ProductScrenn