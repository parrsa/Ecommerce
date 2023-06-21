import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { listMyOrders } from "../actions/orderAction";
const ProfileScrenn = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;


    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile;


    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;


    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [navigate, dispatch, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            setMessage('Password do not math ')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }
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
        <Row>
            <Col md={3}>
                <h2>پروفایل</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>نام</Form.Label>
                        <Form.Control required type='name' placeholder='نام را وارد کنید' value={name} onChange={(e) => setName(e.target.value)} ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>ایمیل</Form.Label>
                        <Form.Control required type='email' placeholder='ایمیل را وارد کنید' value={email} onChange={(e) => setEmail(e.target.value)} ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>پسورد</Form.Label>
                        <Form.Control type='password' placeholder='پسور را وارد کنید' value={password} onChange={(e) => setPassword(e.target.value)} ></Form.Control>
                    </Form.Group>


                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='تایید رمز عبور' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} ></Form.Control>
                    </Form.Group>


                    <Button className="submit-edit-profile" type='submit' variant='primary'>ویرایش</Button>

                </Form>
            </Col>

            <Col md={9}>
                <h2>لیست سفارشات</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                    <Table striped responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>تاریخ</th>
                                <th>جمع کل</th>
                                <th>پرداخت شده</th>
                                <th>ارسال شده</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => (
                                <tr>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>
                                    {` ${separated(order.totalPrice)} تومان`}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : (<i className="fas fa-times" style={{ color: 'red' }}></i>)}</td>
                                    <td><LinkContainer to={`/order/${order._id}`}>
                                        <Button className="btn-sm rounded">جزئیات</Button>
                                    </LinkContainer></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScrenn