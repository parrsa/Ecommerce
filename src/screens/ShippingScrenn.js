import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CheckoutSteps } from "../Components/CheckoutSteps";
import FormContainer from "../Components/FormContainer";
import { saveShippingAddress } from "../actions/cartAction";

function ShippingScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address ?? "");
  const [city, setCity] = useState(shippingAddress?.city ?? "");
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode ?? "");
  const [country, setCountry] = useState(shippingAddress?.country ?? "");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>آدرس</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>آدرس را وارد کنید</Form.Label>
          <Form.Control
          className="rounded"
            required
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>شهر خود را وارد کنید</Form.Label>
          <Form.Control
          className="rounded"
            required
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>کدپستی</Form.Label>
          <Form.Control
          className="rounded"
            required
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>کشور</Form.Label>
          <Form.Control
          className="rounded"
            required
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>

        <Button className="submit-shipping rounded" type="submit" variant="primary">
          ثبت
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;