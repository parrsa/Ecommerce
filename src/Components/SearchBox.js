import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
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
        // <Form onSubmit={submitHandler} className='d-inline-flex p-2 sm-d-block' >

        //     <InputGroup className="">
        //         <Button type="submit" variant="outline-secondary" className="p-2 rounded"><i className='fas fa-search'></i></Button>
        //         <Form.Control
        //             type="text"
        //             name="q"
        //             value={keyword}
        //             onChange={(e) => setKeyword(e.target.value)}
        //             className="mx-sm-2 rounded"
        //             placeholder="جستجو"
        //         />
        //     </InputGroup>
        // </Form>
        <>
            <div className='input-div'>
                <form onSubmit={submitHandler} className='form'>
                    <input type="text"
                        name="q"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className='input '
                        placeholder='جستجو'></input>
                </form>
            </div>
        </>

    );
};

export default SearchBox;