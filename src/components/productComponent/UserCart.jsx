import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsFromCart } from '../../redux/Cart/cartAction';
import ProductDisplay from './ProductDisplay.jsx';
import { Container } from 'react-bootstrap';

const UserCart = () => {
    let total = 0;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductsFromCart())
    }, [dispatch])

    const products = useSelector((state) => state.cart.products)

    products.forEach((product) => {
        total = total + product.price * product.count;
    });

    return (
        <>
            <Container>
                {products.length === 0 ? <h3>Your Cart is Empty</h3> : <h2 className='my-4'>Your Cart</h2>}
                {products.map((cart, index) => {
                    return <ProductDisplay key={index} props={{ thumbnail: cart.thumbnail, name: cart.name, description: cart.description, price: cart.price, stock: cart.stock, id: cart._id, count: cart.count, cart: true, productId: cart.productId }} />
                })}
                <h4 className='text-end'>Cart Total: {total} Rs</h4>
            </Container>
        </>
    )
}

export default UserCart