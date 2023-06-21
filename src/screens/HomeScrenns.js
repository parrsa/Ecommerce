import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { useLocation } from 'react-router-dom'
import CardProduct from '../Components/CardProduct'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Paginate from '../Components/Paginate'
import ProductCarousel from '../Components/ProductCarousel'

const HomeScrenns = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { error, loading, products, page, pages } = productList;
  let keyword = location.search;

  // let category = productList.products.filter((item) => item.category === "AirPad")

  useEffect(() => {
    dispatch(listProducts(keyword))

  }, [dispatch, keyword])


  return (
    <div className='container'>
      {!keyword && <ProductCarousel />}
      <h1>محصولات</h1>
      {/* <h1>Test</h1> */}
      {loading ? <Loader />
        : error ? <Message variant="danger">{error}</Message>
          : <div>

            <Row>
              {/* {category.map((i) => (
                <Col key={i.id} sm={12} md={6} lg={4} xl={3}>
                  <CardProduct product={i} />
                </Col>
              ))} */}
              {products.map((item) => (
                <Col key={item.id} sm={12} md={6} lg={4} xl={3}>
                  <CardProduct product={item} />
                </Col>
              ))}
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword} />
          </div>
      }


    </div>
  )
}

export default HomeScrenns