import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import CardProduct from '../Components/CardProduct'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
const HomeScrenns = () => {

  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { error, loading, products } = productList;

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <div>
      <h1>Test</h1>
      {loading ? <Loader />
        : error ? <Message variant="danger">{error}</Message>
          :
          <Row>
            {products.map((item) => (
              <Col key={item.id} sm={12} md={6} lg={4} xl={3}>
                <CardProduct product={item} />
              </Col>
            ))}
          </Row>
      }


    </div>
  )
}

export default HomeScrenns