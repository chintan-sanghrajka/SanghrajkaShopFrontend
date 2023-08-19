import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../redux/Product/productAction.js';
import NewCarousel from './NewCarousel.jsx';
import { BASE_URL } from '../helper.js';
import { Container, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { getReviews, addReview } from '../../redux/Review/reviewAction.js';
import ReviewComp from './ReviewComp.jsx';
import { addToCart } from '../../redux/Cart/cartAction.js';

const Product = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const user = JSON.parse(Cookies.get('user'));
    const [review, setReview] = useState("")
    const navigate = useNavigate();
    const [msg, setMsg] = useState(false)

    useEffect(() => {
        if (productId !== undefined) {
            dispatch(getProduct(productId));
        }
    }, [dispatch, productId])
    const product = useSelector((state) => state.productList.product)

    useEffect(() => {
        dispatch(getReviews(productId));
    }, [dispatch, productId])

    const reviewChangeHandler = (event) => {
        setReview(event.target.value)
    }

    const reviewAddHandler = () => {
        dispatch(addReview(review, productId)).then((res) => {
            dispatch(getReviews(productId))
        })
        setReview('')
    }

    const [cartMax, setCartMax] = useState(false)

    const addToCarthandler = () => {
        dispatch(addToCart(product)).then((res) => {
            if (res) {
                setCartMax(true)
            }
            else {
                setMsg(true)
            }
            setTimeout(() => {
                setMsg(false)
                setCartMax(false)
            }, 4000)

        }).catch(error => console.log(error))
    }

    const reviews = useSelector((state) => state.reviews.reviews)

    return (
        <>
            <div className='product_main_div'>
                <NewCarousel images={product.images === undefined ? [] : product.images.map((element) => {
                    return `${BASE_URL}uploads/product/${element.filename}`
                })} />
                <Container>
                    <h2 className='product_name'>{product.name}</h2>
                    <p className='product_description'>{product.description}</p>
                    <p className='product_para mb-0'>Price: {product.price} Rs</p>
                    <p>Inclusive of all taxes</p>
                    {product.stock !== 0 ? <p className='product_list_available product_para'>Available</p> : <p className='product_list_out_stock product_para'>Out of Stock</p>}
                    {msg && <p className='success_msg'>Product added to Cart.</p>}
                    {cartMax && <p className='success_msg'>Maximum 10 items are allowed</p>}
                    <div className='w-100 d-flex justify-content-between'>
                        <Button variant='success' onClick={addToCarthandler}>Add to Cart</Button>
                        {/* <Button variant='primary'>Add to Wishlist</Button> */}
                    </div>
                    <h3 className='mt-5'>Add Review</h3>
                    <Container>
                        <h4 className='mt-4'>{user.userName},</h4>
                        <textarea className='product_review_textarea' rows={4} placeholder='Write your review' onChange={reviewChangeHandler} value={review} />
                        <Button variant='outline-primary' className='d-block ms-auto my-4' onClick={reviewAddHandler}>Add Review</Button>
                        <div className=''>
                            <h3>Other Review's</h3>
                            {reviews.map((element, index) => {
                                return <ReviewComp key={index} props={element} />
                            })}
                        </div>
                    </Container>
                </Container>
            </div>
        </>
    )
}

export default Product