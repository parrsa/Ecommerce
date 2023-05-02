import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Form, ListGroup, Image, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { CheckoutSteps } from "../Components/CheckoutSteps";
import Message from "../Components/Message";
import { addToCart } from "../actions/cartAction";
export const PlaceOrderScreen = () => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)
    console.log(cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)

    cart.shippingPrice = (cart.itemsPrice > 1000 ? 0 : 15).toFixed(2)

    cart.taxPrice = Number((0.09) * cart.itemsPrice).toFixed(2);

    let Discount = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice))
    cart.Discount = (Discount / 100 * 7).toFixed(2);

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice) - Number(cart.Discount)).toFixed(2);


    const placeOrder = () => {
        var win = window.open(`https://fcp.shaparak.ir/_ipgw_/payment/?token=${userInfo.token}&lang=fa`, '_blank');
        if (win != null) {
          win.focus();
        }
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping :</strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                {'  '}
                                {cart.shippingAddress.postalCode},
                                {'  '}
                                {cart.shippingAddress.country},
                            </p>
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method :</strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>Order Items</h2>

                            {cart.cartItems.length === 0 ?
                                <Message variant='info'>Your cart is empty</Message>
                                : (
                                    <ListGroup variant="flush">
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>

                                                    <Col md={3}>
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
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
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
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Item:</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>



                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>DisCount:</Col>
                                    <Col>${cart.Discount} <h6>DisCount</h6></Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button type="button" className="btn-block" disabled={cart.cartItems === 0} onClick={placeOrder}>
                                    Place Order
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
