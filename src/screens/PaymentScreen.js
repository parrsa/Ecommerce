import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CheckoutSteps } from "../Components/CheckoutSteps";
import FormContainer from "../Components/FormContainer";
import { savePaymentMethod } from "../actions/cartAction";

export const PaymentScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;


    const [paymentMethod, setPaymentMethod] = useState('paypal')

    if (!shippingAddress?.address) {
        navigate('shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
        
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>روش پرداخت</Form.Label>
                    {/* <Form.Label as='legend'>Select Method</Form.Label> */}
                    <Col>
                        <Form.Check
                            type="radio"
                            label='PayPal or Credit Card'
                            id='paypal'
                            name="paymentMethod"
                            checked
                            onChange={(e)=>setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
               
                </Form.Group>

                
                <Button className="submit-payment rounded" type="submit" variant="primary">
                    تایید
                </Button>
            </Form>
        </FormContainer>
    )
}
