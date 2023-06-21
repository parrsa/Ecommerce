import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
const CardProduct = ({ product }) => {
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
        <Card className='my-3  rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img className='rounded' src={product.image} />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title className='w-150' as="div">
                        <p className='overflow-hidden text-nowrap' style={{ fontSize: "12px" }}>{product.name}</p>
                    </Card.Title>
                </Link>

                <div className='d-flex w-100'>
                    <p style={{ fontSize: "10px", color: "red" }} className='text-break text-wrap w-100 p-rating' >
                        {(product.countInStock === 0) ? (<p style={{ fontSize: '12px' }}>ناموجود</p>) : (product.countInStock <= 3) ? (<p>تنها {product.countInStock} عدد در انبار باقی مانده</p>) : (<><p className='text-secondary'>ارسال امروز</p></>)}
                        <span className='icon-rating'>
                            <i className='fas fa-star' style={{ color: "#ffb703" }}><span className='number-rating'>{product.rating}</span></i>
                        </span>
                    </p>
                </div>


                <Card.Text as='h5'>
                    <p className='fs-5' >
                        {` ${separated(product.price)} تومان`}
                    </p>
                </Card.Text>

            </Card.Body>
        </Card>

    )
}

export default CardProduct