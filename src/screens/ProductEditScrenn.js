import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { Form, Button, } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, updateProduct } from "../actions/productActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import FormContainer from "../Components/FormContainer";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import axios from "axios";
const ProductEditScrenn = () => {

    const params = useParams();

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)


    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const redirect = new URLSearchParams(location.search).get("redirect") ?? "/";

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate


    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else {
            if (!product.name || product._id !== Number(params.id)) {
                dispatch(listProductDetails(params.id))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }

    }, [product, dispatch, params.id, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        if (!name || !price || !image || !brand || !category || !countInStock || !description) {
            alert('no')
        } else {
            dispatch(updateProduct({
                _id: params.id,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description
            }))
        }
    }

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', params.id)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`

                }
            }

            const { data } = await axios.post('http://127.0.0.1:8000/api/products/upload/', formData, config)
            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    const Back = () => {
        if (!name || !price || !image || !brand || !category || !countInStock || !description) {
            alert('no')
        } else {
            navigate('/admin/productlist')
        }
    }

    return (
        <div>
            <Link to='/admin/productlist'>
                برگشت
            </Link>

            <FormContainer>
                <h1>ویرایش محصول</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form >
                        <Form.Group controlId='name'>
                            <Form.Label>نام</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='نام را وارد کنید'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>قیمت</Form.Label>
                            <Form.Control

                                type='number'
                                placeholder='قیمت را وارد کنید'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>


                        <Form.Group controlId='image'>
                            <Form.Label>عکس</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='عکس را وارد کنید'
                                value={image}
                                onChange={e => setImage(e.target.value)}
                            />

                            <Form.Control
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                                type="file" />
                            {uploading && <Loader />}

                        </Form.Group>




                        <Form.Group controlId='brand'>
                            <Form.Label>برند</Form.Label>
                            <Form.Control

                                type='text'
                                placeholder='برند را وارد کنید'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countinstock'>
                            <Form.Label>موجودی</Form.Label>
                            <Form.Control

                                type='number'
                                placeholder='موجودی را وارد کنید'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>دستبندی</Form.Label>
                            <Form.Control

                                type='text'
                                placeholder='دستبندی را وارد کنید'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>توضیحات</Form.Label>
                            <Form.Control

                                type='text'
                                placeholder='توضیحات را وارد کنید'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>


                        <Button onClick={submitHandler} className="update-product-button" type='submit' variant='primary'>
                            ویرایش
                        </Button>

                    </Form>
                )}


            </FormContainer>
        </div>
    )
}

export default ProductEditScrenn