import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import FormContainer from "../Components/FormContainer";

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const redirect = new URLSearchParams(location.search).get("redirect") ?? "/";

    const userLogin = useSelector(state => state.userLogin)

    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>

            {/* <h1>Sign In</h1> */}
            <h1>ورود</h1>

            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>ایمیل</Form.Label>
                    {/* <Form.Label>Email Address</Form.Label> */}
                    <Form.Control   type='email' placeholder='ایمیل را وارد کنید' value={email} onChange={(e) => setEmail(e.target.value)} ></Form.Control>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>رمز عبور</Form.Label>
                    {/* <Form.Label>password</Form.Label> */}
                    <Form.Control autoComplete="" type='password' placeholder='رمز عبور را وارد کنید' value={password} onChange={(e) => setPassword(e.target.value)} ></Form.Control>
                </Form.Group>

                <Button type='submit' className="button-login" variant='primary'>Sign In</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                     <Link to={redirect ? `/register?register=${redirect}` : '/register'}>رفتن به صفحه قبت نام</Link>
                </Col>
            </Row>

        </FormContainer>
    ) 
}

export default LoginScreen




// import { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../actions/userAction";
// import Loader from "../Components/Loader";
// import Message from "../Components/Message";
// import FormContainer from "../Components/FormContainer";
// import { Formik } from "formik";

// const initialValues = {
//     email: "",
//     password: ""
// };

// const validate = (values) => {
//     let errors = {};

//     if (!values.email) {
//         errors.email = "email is required";
//     }

//     if (!values.password) {
//         errors.password = "password is required";
//     } else if (values.password.length < 4) {
//         errors.password = "description too short";
//     }

//     return errors;
// };
// const LoginScreen = () => {

// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const location = useLocation();
// const navigate = useNavigate();
// const dispatch = useDispatch();

// const redirect = new URLSearchParams(location.search).get("redirect") ?? "/";

// const userLogin = useSelector(state => state.userLogin)

// const { error, loading, userInfo } = userLogin;

// useEffect(() => {
//     if (userInfo) {
//         navigate(redirect);
//     }
// }, [navigate, userInfo, redirect])

// const submitHandler = (e) => {
//     e.preventDefault()
//     dispatch(login(email, password))
// };

// const submitsHandler=()=>{
//     console.log('first')
// }

//     return (
//         <Formik
//             initialValues={initialValues}
//             validate={validate}
//             onSubmit={submitsHandler}
//         >
//             {(formik) => {
//                 const {
//                     values,
//                     handleChange,
//                     handleSubmit,
//                     errors,
//                     touched,
//                     handleBlur,
//                     isValid,
//                     dirty
//                 } = formik;

//                 return (
//                     <FormContainer>
//                         {/* <h1>Sign In</h1> */}
//                         <h1>ورود</h1>

//                         {error && <Message variant='danger'>{error}</Message>}
//                         {loading && <Loader />}
//                         <Form onSubmit={submitHandler}>
//                             <Form.Group controlId='email'>
//                                 <Form.Label>ایمیل</Form.Label>
//                                 {/* <Form.Label>Email Address</Form.Label> */}
//                                 <Form.Control
//                                     type='email'
//                                     placeholder='ایمیل را وارد کنید'
//                                     value={values.email}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     style={{ border: "1px solid", borderRadius: "4px", height: "9rem", resize: "none" }}
//                                     className={errors.Task && touched.Task ? "input-error" : null} ></Form.Control>
//                                 {errors.email && touched.email && (
//                                     <span className="error">{errors.email}</span>
//                                 )}
//                             </Form.Group>


//                             <Form.Group controlId='password'>
//                                 <Form.Label>رمز عبور</Form.Label>
//                                 {/* <Form.Label>password</Form.Label> */}
//                                 <Form.Control
//                                     autoComplete=""
//                                     type='password'
//                                     placeholder='رمز عبور را وارد کنید'
//                                     onBlur={handleBlur}
//                                     style={{ border: "1px solid", borderRadius: "4px", height: "9rem", resize: "none" }}
//                                     onChange={handleChange}
//                                     className={
//                                         errors.description && touched.description ? "input-error" : null
//                                     }
//                                 ></Form.Control>

//                             </Form.Group>

//                             <Button type='submit' className="button-login" variant='primary'>Sign In</Button>
//                         </Form>

//                         <Row className='py-3'>
//                             <Col>
//                                 <Link to={redirect ? `/register?register=${redirect}` : '/register'}>رفتن به صفحه قبت نام</Link>
//                             </Col>
//                         </Row>

//                     </FormContainer>
//                 );
//             }};
//         </Formik>
//     )
// }

// export default LoginScreen




// import React from 'react';
// import { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../actions/userAction";
// import { Formik } from "formik";
// import Loader from "../Components/Loader";
// import Message from "../Components/Message";
// import FormContainer from "../Components/FormContainer";
// import axios from 'axios';

// const initialValues = {
//     email: "",
//     password: ""
// };
// const validate = (values) => {
//     let errors = {};
//     if (!values.email) {
//         errors.email = "email is required";
//     }
//     if (!values.password) {
//         errors.password = "password is required";
//     } else if (values.password.length < 3) {
//         errors.password = "password too short";
//     }
//     return errors;
// };
// const LoginScreen = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const redirect = new URLSearchParams(location.search).get("redirect") ?? "/";

//     const userLogin = useSelector(state => state.userLogin)

//     const { error, loading, userInfo } = userLogin;

//     useEffect(() => {
//         if (userInfo) {
//             navigate(redirect);
//         }
//     }, [navigate, userInfo, redirect])

//     const submitHandler = (values) => {
//         // dispatch(login(values.email, values.password))
//     };

//     const submitForm = () => {
//         console.log('first')
//     }

//     return (
//         <Formik
//             initialValues={initialValues}
//             validate={validate}
//             onSubmit={submitForm}
//         >
//             {(formik) => {
//                 const {
//                     values,
//                     handleChange,
//                     handleSubmit,
//                     errors,
//                     error,
//                     touched,
//                     handleBlur,
//                     isValid,
//                     dirty
//                 } = formik;

//                 return (
//                     <FormContainer>
//                         <h1>ورود</h1>

//                         {error && <Message variant='danger'>{error}</Message>}
//                         {loading && <Loader />}
//                         <Form onSubmit={submitHandler}>
//                             <Form.Group controlId='email'>
//                                 <Form.Label>ایمیل</Form.Label>
//                                 {/* <Form.Label>Email Address</Form.Label> */}
//                                 <Form.Control
//                                     type='email'
//                                     name="email"
//                                     id="email"
//                                     placeholder='ایمیل را وارد کنید'
//                                     value={values.email}
//                                     onBlur={handleBlur}
//                                     onChange={handleChange}
//                                     style={{ border: "1px solid", borderRadius: "4px", resize: "none" }}
//                                     className={errors.email && touched.email ? "input-error" : null} ></Form.Control>
//                                 {errors.email && touched.email && (
//                                     <span className="error">{errors.email}</span>
//                                 )}
//                             </Form.Group>


//                             <Form.Group controlId='password'>
//                                 <Form.Label>رمز عبور</Form.Label>
//                                 {/* <Form.Label>password</Form.Label> */}
//                                 <Form.Control
//                                     autoComplete=""
//                                     type='password'
//                                     name="password"
//                                     id="password"
//                                     value={values.password}
//                                     placeholder='رمز عبور را وارد کنید'
//                                     onBlur={handleBlur}
//                                     style={{ border: "1px solid", borderRadius: "4px", resize: "none" }}
//                                     onChange={handleChange}
//                                     className={
//                                         errors.password && touched.password ? "input-error" : null
//                                     }
//                                 ></Form.Control>

//                             </Form.Group>

//                             <Button type="submit"
//                                 className={!(dirty && isValid) ? "disabled-btn button-login" : "button-login"}
//                                 disabled={!(dirty && isValid)} variant='primary'>Sign In</Button>
//                         </Form>

//                         <Row className='py-3'>
//                             <Col>
//                                 <Link to={redirect ? `/register?register=${redirect}` : '/register'}>رفتن به صفحه قبت نام</Link>
//                             </Col>
//                         </Row>

//                     </FormContainer>
//                 );
//             }}
//         </Formik>
//     );
// };

// export default LoginScreen;
