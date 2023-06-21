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
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
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


    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div >
            <h1>شماره سفارش : {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>آدرس</h2>
                            <p><strong>نام : </strong> {order.user.name}</p>
                            <p><strong>ایمیل : </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>آدرس :</strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                {'  '}
                                {cart.shippingAddress.postalCode},
                                {'  '}
                                {cart.shippingAddress.country},
                            </p>

                            {order.isDelivered ? (
                                <Message variant='success'>تحویل داده شد <span>{order.deliveredAt}</span></Message>
                            ) : (
                                <Message variant='warning'>تحویل داده نشده</Message>
                            )}
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>روش پرداخت</h2>
                            <p>
                                <strong>روش :</strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>پرداخت شده {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning'>پرداخت نشده</Message>
                            )}
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>سفارش محصولات</h2>

                            {order.orderItems.length === 0 ?
                                <Message variant='info'>Order is empty</Message>
                                : (
                                    <ListGroup variant="flush">
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={2}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>

                                                    <Col className="margin-top">
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>

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
                                    {` ${separated(order.itemsPrice)} تومان`}

                                    </Col>
                                </Row>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <Row>
                                    <Col>هزینه پست:</Col>
                                    <Col>
                                    {` ${separated(order.shippingPrice)} تومان`}
                                    </Col>
                                </Row>
                            </ListGroup.Item>



                            <ListGroup.Item>
                                <Row>
                                    <Col>مالیات:</Col>
                                    <Col>
                                    {` ${separated(order.taxPrice)} تومان`}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>جمع کل:</Col>
                                    <Col>
                                    {` ${separated(order.totalPrice)} تومان`}
                                    </Col>
                                </Row>
                            </ListGroup.Item>



                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                        </ListGroup>

                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item className="submit-delivered">
                                <div>
                                    <Button
                                        type='button'
                                        className='btn btn-block'
                                        onClick={deliverHandler}
                                    >
                                        تایید ارسال شده
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
