import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../Components/Message'
import { addToCart, removeFromCart } from '../actions/cartAction'
const CartScreen = () => {
    const navigate = useNavigate()
    const { state } = useLocation();
    const params = useParams();
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    let items = cartItems.map((i) => i.countInStock)


    useEffect(() => {
        // // console.log(state.qty)
        // if (state.qty === null || state.qty <= items) {
        //     // state.qty = 5
        // }

        if (params.id) {
            dispatch(addToCart(params.id, state.qty))
        }
    }, [dispatch, params.id,])


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    }

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

    let Sum = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(0);


    return (
        <Row className='d-flex justify-content-center' >
            <Col md={8}>
                <h1>سبد خرید</h1>
                <Card className="card-shop rounded ">
                    {(cartItems == undefined || state == null || state == undefined) ? (<h1>سبد خرید خال می باشد</h1>) :
                        (cartItems.length === 0) ? (
                            <Message variant='info'>سبد خرید خالی می باشد؟ <Link to='/'>برگشت</Link>  </Message>
                        ) : (
                            <ListGroup variant='flush'>
                                {
                                    cartItems.map(item => (
                                        <ListGroup.Item key={item.product}>
                                            <Row className='' >
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col md={3} className='margin-top'>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={3} className='margin-top'>
                                                    {` ${separated(item.price)} تومان`}
                                                </Col>
                                                <Col md={3} className='margin-top'>
                                                    <Form.Control
                                                        as="select" value={item.qty} className='rounded' onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                                    >
                                                        {item.countInStock && [...Array(item.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                                <Col md={1} className='margin-top'>
                                                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}><i className='fas fa-trash'></i></Button>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                }ّ
                            </ListGroup>
                        )
                    }
                </Card>
            </Col>


            <Col md={4}>
                <Card className='card-shop-total rounded'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item dir='ltr'>
                            <h2>تعداد ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) محصول</h2>
                            <h2 dir='ltr'>قیمت کل : تومان {` ${separated(Sum)} تومان`}</h2>
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item className='check-submit' >
                        <div>
                            <Button type='button' disabled={cartItems.length === 0} className='rounded' onClick={checkoutHandler} >ثبت سفارش </Button>
                        </div>
                    </ListGroup.Item>

                </Card>
            </Col>


        </Row>
    )
}

export default CartScreen

