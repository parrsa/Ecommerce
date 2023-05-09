import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Form, ListGroup, Image, Card } from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";
import { getOrderDetails, deliverOrder } from "../actions/orderAction";
import Message from "../Components/Message";
import Loader from '../Components/Loader'
import { ORDER_DELIVER_RESET } from "../constants/orderConstants";

export const OrderScreen = () => {
    const params = useParams();

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails;

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }


    useEffect(() => {

        if (!userInfo) {
            navigate('/login')
        }


        if (!order || order._id !== Number(params.id) || successDeliver) {
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(params.id))
        }
    }, [order, params, dispatch, successDeliver])

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }
    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div >
            <h1>Order : {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name : </strong> {order.user.name}</p>
                            <p><strong>Email : </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Shipping :</strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                {'  '}
                                {cart.shippingAddress.postalCode},
                                {'  '}
                                {cart.shippingAddress.country},
                            </p>

                            {order.isDelivered ? (
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Delivered</Message>
                            )}
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method :</strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Paid</Message>
                            )}
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>Order Items</h2>

                            {order.orderItems.length === 0 ?
                                <Message variant='info'>Order is empty</Message>
                                : (
                                    <ListGroup variant="flush">
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
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
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>



                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>



                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                        </ListGroup>

                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn btn-block'
                                    onClick={deliverHandler}
                                >
                                    Mark As Delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
