import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from 'react-router-dom'
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { listOrders } from "../actions/orderAction";
const OrderListScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList;

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo])


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
            <h1>سفارشات</h1>
            {loading ? (<Loader />)
                : error ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className="table-sm">

                            <thead>
                                <th>ID</th>
                                <th>کاربر</th>
                                <th>تاریخ</th>
                                <th>جمع کل</th>
                                <th>خریداری شده</th>
                                <th>ارسال شده</th>
                                <th></th>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>
                                            {` ${separated(order.totalPrice)} تومان`}</td>

                                        <td>{order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <i className='fas fa-check' style={{ color: 'red' }}></i>
                                        )}
                                        </td>

                                        <td>{order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <i className='fas fa-check' style={{ color: 'red' }}></i>
                                        )}
                                        </td>

                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant='light' className='btn-sm rounded'>
                                                    جزئیات
                                                </Button>
                                            </LinkContainer>


                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </Table>
                    )}
        </div>
    )
}

export default OrderListScreen