import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchBox = () => {

    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`);
        } else {
            navigate(location.pathname);
        }
    };

    return (
        <Form onSubmit={submitHandler} className='d-inline-flex p-2 sm-d-block' >
            <Form.Control
                type="text"
                name="q"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="mx-sm-1"
                placeholder="Search Product..."
            ></Form.Control>

            <Button type="submit" variant="outline-secondary" className="p-2">
                Search
            </Button>
        </Form>
    );
};

export default SearchBox;