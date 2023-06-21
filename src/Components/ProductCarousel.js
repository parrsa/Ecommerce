import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Col, Image, Row, ListGroup, Card, Button } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import { listProducts } from '../actions/productActions'
import { useLocation } from 'react-router-dom'
const ProductCarousel = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { error, loading, products, page, pages } = productList;
    const location = useLocation();
    let keyword = location.search;

    // const productTopRated = useSelector(state => state.productTopRated);
    // const { error, loading, products } = productTopRated;


    // useEffect(() => {
    //     dispatch(listTopProducts())
    // }, [dispatch])

    useEffect(() => {
        dispatch(listProducts(keyword))

    }, [dispatch, keyword])

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
        loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
                : (
                    
                    // <div>
                    //     <Carousel variant='dark' pause="hover" className='rounded carousel'>
                    //         {products.map(product => (
                    //             <Carousel.Item className='rounded' interval={2500} key={product._id}>
                    //                 <Link to={`/product/${product._id}`}>
                    //                     <Image style={{ resize: "none" }} className="d-block w-100   rounded" src={product.image} alt={product.name} />
                    //                     <Carousel.Caption className='carousel.caption'>
                    //                         <h4>{product.name} ({` ${separated(product.price)} تومان`})</h4>
                    //                     </Carousel.Caption>
                    //                 </Link>
                    //             </Carousel.Item>
                    //         ))}
                    //     </Carousel>
                    //     <Col md={6} className="margin-top">
                    //       <h1>p</h1>
                    //     </Col>
                    // </div>

                    <Row>
                        <Col md={8} className='carousel-box'>
                            <Carousel variant='light' pause="hover" className='bg-dark rounded carousel'>
                                {products.map(product => (
                                    <Carousel.Item className='rounded' interval={2500} key={product._id}>
                                        <Link to={`/product/${product._id}`}>
                                            <Image style={{ resize: "none" }} className="d-block w-100 rounded" src={product.image} alt={product.name} />
                                            <Carousel.Caption className='carousel.caption'>
                                                <h4>{product.name} ({` ${separated(product.price)} تومان`})</h4>
                                            </Carousel.Caption>
                                        </Link>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Col>


                        <Col md={4} className=' rounded'>
                            <Col className=''>
                                {/* <Card  className='border w-75  div-box-sub1'>
                                    <Link>
                                        <Image className='w-100 rounded' src='https://biz-cdn.varzesh3.com/banners/2022/02/19/e796b4af-f287-456e-96c2-ce77febac14a.gif' />
                                    </Link>
                                </Card>
                                <Card  className='border w-75 div-box-sub'>
                                    <Link>
                                        <Image className='w-100 rounded' src='https://biz-cdn.varzesh3.com/banners/2022/02/19/e796b4af-f287-456e-96c2-ce77febac14a.gif' />
                                    </Link>
                                </Card> */}

                                <Card className='my-3  rounded'>
                                    <Link to={'/'}>
                                        <Card.Img className='rounded' src='https://biz-cdn.varzesh3.com/banners/2022/02/19/e796b4af-f287-456e-96c2-ce77febac14a.gif' />
                                    </Link>
                                </Card>

                                <Card className='my-3  rounded'>
                                    <Link to={'/'}>
                                        <Card.Img className='rounded' src='https://biz-cdn.varzesh3.com/banners/2022/02/19/e796b4af-f287-456e-96c2-ce77febac14a.gif' />
                                    </Link>
                                </Card>
                            </Col>
                        </Col>
                    </Row>
                )
    )
}
export default ProductCarousel