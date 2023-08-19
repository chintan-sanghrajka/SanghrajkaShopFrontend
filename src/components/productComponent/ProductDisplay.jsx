import React, { useState } from 'react';
import { BASE_URL } from './../helper.js';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteFromCart, getProductsFromCart, buyProduct, updateCartProduct } from '../../redux/Cart/cartAction.js';

const ProductDisplay = ({ props }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [delMsg, setDelMsg] = useState(false)
    const [buyMsg, setBuyMsg] = useState(false)
    const [maxMsg, setMaxMsg] = useState(false)
    const viewMoreHandler = () => {
        navigate(`/product/${props.id}`)
    }
    const cartDeleteHandler = () => {
        dispatch(deleteFromCart(props.id)).then((res) => {
            dispatch(getProductsFromCart())
            setDelMsg(true)
            setTimeout(() => {
                setDelMsg(false)
            }, 5000)
        })
    }
    const buyProductHandler = () => {
        dispatch(buyProduct(props.productId, props.count)).then((res) => {
            dispatch(getProductsFromCart())
            setBuyMsg(true)
            setTimeout(() => {
                setBuyMsg(false)
            }, 5000)
        })
    }
    const available = props.stock >= props.count ? true : false;
    const updateCountHandler = (action) => {
        console.log(action)
        if (props.count < 10 || action === "dec") {
            dispatch(updateCartProduct(props.productId, action)).then((res) => {
                dispatch(getProductsFromCart())
            })
        }
        else {
            setMaxMsg(true)
            setTimeout(() => {
                setMaxMsg(false)
            }, 5000)
        }
    }

    return (
        <>
            {delMsg && <p className='success_msg'>Product removed from cart.</p>}
            {buyMsg && <p className='success_msg'>Order placed successfully.</p>}
            {maxMsg && <p className='success_msg'>Maximum 10 quantity is allowed.</p>}
            <div className='product_list_div'>
                <div className='product_list_image_div'>
                    <img src={`${BASE_URL}uploads/product/${props.thumbnail}`} alt="" className='product_list_thumbnail' />
                </div>
                <div className='product_list_content_div'>
                    <h2 className='product_list_head'>{props.name}</h2>
                    <p className='product_list_para'>{props.description}</p>
                    <p className='product_list_para'>Price - {props.price * props.count} Rs</p>
                    {props.cart &&
                        <div className='d-flex align-items-center my-2'>
                            <p className='product_list_para my-auto'>Quantity: {props.count}</p>
                            <Button variant='outline-primary' className='mx-2' onClick={() => updateCountHandler("inc")}><i className="bi bi-plus-lg"></i></Button>
                            <Button variant='outline-danger' onClick={() => updateCountHandler("dec")}><i className="bi bi-dash-lg"></i></Button>
                        </div>
                    }
                    {available ? <p className='product_list_available'>Available</p> : <p className='product_list_out_stock'>Out of Stock</p>}
                    {!props.cart && <Button className='btn-sm product_list_button' variant="outline-primary" onClick={viewMoreHandler}>View More</Button>}
                    {props.cart && available && <Button className='btn-sm product_list_button' variant="outline-primary" onClick={buyProductHandler}>Place Order</Button>}
                    {props.cart && <Button variant="danger" className='btn-sm cart_delete_button' ><i className="bi bi-trash3" onClick={cartDeleteHandler}></i></Button>}
                </div>
            </div >
        </>
    )
}

export default ProductDisplay