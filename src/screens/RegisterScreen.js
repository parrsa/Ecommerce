import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import FormContainer from "../Components/FormContainer";

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const redirect = new URLSearchParams(location.search).get("redirect") ?? "/";

    const userRegister = useSelector(state => state.userRegister)

    const { error, loading, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            setMessage('Password do not math ')
        } else {
            dispatch(register(name, email, password))
        }

    }


    return (
        <FormContainer>
            <h1>ثبت نام</h1>
            {/* <h1>Sign In</h1> */}
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>نام</Form.Label>
                    {/* <Form.Label>Name</Form.Label> */}
                    <Form.Control type='name' placeholder='نام را وارد کنید' value={name} onChange={(e) => setName(e.target.value)} ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>ایمیل</Form.Label>
                    {/* <Form.Label>Email Address</Form.Label> */}
                    <Form.Control required type='email' placeholder='ایمیل را وارد کنید' value={email} onChange={(e) => setEmail(e.target.value)} ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>رمز عبور</Form.Label>
                    {/* <Form.Label>password</Form.Label> */}
                    <Form.Control required type='password' placeholder='رمز عبور را وارد کنید' value={password} onChange={(e) => setPassword(e.target.value)} ></Form.Control>
                </Form.Group>


                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>تایید رمز عبور</Form.Label>
                    {/* <Form.Label>Confirm Password</Form.Label> */}
                    <Form.Control required type='password' placeholder='تکرار رمز عبور' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} ></Form.Control>
                </Form.Group>
                <Button type='submit' className="button-register" variant='primary'>ثبت نام</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    <Link to={redirect ? `/login?register=${redirect}` : '/login'}>رفتن به صفحه ورود</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen