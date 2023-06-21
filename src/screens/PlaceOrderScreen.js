import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Form, ListGroup, Image, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { CheckoutSteps } from "../Components/CheckoutSteps";
import { addToCart } from "../actions/cartAction";
import { createOrder } from "../actions/orderAction";
import Message from "../Components/Message";
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { CART_DELETE_ITEM } from "../constants/cartConstants";


export const PlaceOrderScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)
    console.log(cart)
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate;

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;


    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(0)

    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 15).toFixed(0)

    cart.taxPrice = Number((0.09) * cart.itemsPrice).toFixed(0);

    let Discount = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice))
    cart.Discount = (Discount / 100 * 7).toFixed(0);

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(0);


    if (!cart.paymentMethod) {
        navigate('/payment')
    }

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
        localStorage.removeItem('cartItems')
        // var win = window.open(`https://fcp.shaparak.ir/_ipgw_/payment/?token=${userInfo.token}&lang=fa`, '_blank');
        // if (win != null) {
        //   win.focus();
        // }

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

    return (
        <div >
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>آدرس</h2>
                            <p>
                                <strong>آدرس :</strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                {'  '}
                                {cart.shippingAddress.postalCode},
                                {'  '}
                                {cart.shippingAddress.country},
                            </p>
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>روش پرداخت</h2>
                            <p>
                                <strong>روش :</strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>سفارش محصولات</h2>

                            {cart.cartItems.length === 0 ?
                                <Message variant='info'>سبد خرید شما خال می باشد!</Message>
                                : (
                                    <ListGroup variant="flush">
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={2}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>

                                                    <Col className="margin-top">
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>

                                                    {/* <Col md={3}>
                                                        <Form>

                                                            <Form.Control
                                                                as="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                                            >
                                                                {

                                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }

                                                            </Form.Control>
                                                        </Form>
                                                    </Col> */}

                                                    <Col md={6} className="margin-top">
                                                        {item.qty} عدد   {` ${separated(item.price)} تومان`} = {` ${separated(item.qty * item.price)} تومان`}

                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}

                        </ListGroup.Item>


                    </ListGroup>
                </Col>



                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">

                            <ListGroup.Item>
                                <h2>صورتحساب سفارشات</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>هزینه محصولات:</Col>
                                    <Col>
                                        {` ${separated(cart.itemsPrice)} تومان`}
                                    </Col>
                                </Row>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <Row>
                                    <Col>هزینه پست:</Col>
                                    <Col>
                                        {` ${separated(cart.shippingPrice)} تومان`}
                                    </Col>
                                </Row>
                            </ListGroup.Item>



                            <ListGroup.Item>
                                <Row>
                                    <Col>مالیات:</Col>
                                    <Col>
                                        {` ${separated(cart.taxPrice)} تومان`}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>تخفیف:</Col>
                                    <Col>{` ${separated(cart.Discount)} تومان`} <h6>تخفیف</h6></Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>جمع کل:</Col>
                                    <Col>
                                        {` ${separated(cart.totalPrice)} تومان`}
                                    </Col>
                                </Row>
                            </ListGroup.Item>



                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>



                            <ListGroup.Item className="submit-place-order">
                                <div>
                                    <Button type="button" className="btn-block rounded" disabled={cart.cartItems === 0} onClick={placeOrder}>
                                        ثبت نهایی
                                    </Button>
                                </div>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
