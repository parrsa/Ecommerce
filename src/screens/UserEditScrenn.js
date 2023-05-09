import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../actions/userAction";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import FormContainer from "../Components/FormContainer";
import { USER_UPDATE_RESET } from "../constants/userConstants";
const UserEditScrenn = () => {

    const params = useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setAdmin] = useState(false);


    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const redirect = new URLSearchParams(location.search).get("redirect") ?? "/";

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails;


    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate;


    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        } else {
            if (!user.name || user._id !== Number(params.id)) {
                dispatch(getUserDetails(params.id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setAdmin(user.isAdmin)
            }
        }
    }, [user, params.id, successUpdate, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }))
    }


    return (
        <div>
            <Link to='/admin/userlist'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>

                {loadingUpdate && < Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}


                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isadmin'>
                            <Form.Check type='checkbox' label='Is Admin ' checked={isAdmin} onChange={(e) => setAdmin(e.target.checked)} ></Form.Check>
                        </Form.Group>

                        <Button type='submit' variant='primary'>Update</Button>

                    </Form>
                )}


            </FormContainer>
        </div>
    )
}

export default UserEditScrenn