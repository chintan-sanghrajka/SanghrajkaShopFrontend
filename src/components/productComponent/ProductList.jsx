import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProductBySearch, getProductBySubCat } from '../../redux/Product/productAction.js';
import ProductDisplay from './ProductDisplay.jsx';

const ProductList = () => {
    const { userSearch } = useParams();
    const { name, id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (userSearch !== undefined) {
            dispatch(getProductBySearch(userSearch))
        }
    }, [userSearch, dispatch])

    useEffect(() => {
        if (id !== undefined) {
            dispatch(getProductBySubCat(id))
        }
    }, [dispatch, id])

    const productList = useSelector((state) => state.productList.productList)

    return (
        <>
            <Container>
                <h2 className="mb-5">Latest in, {name || userSearch}</h2>
                {productList.length === 0 && <h3>Coming Soon</h3>}
                {
                    productList.length !== 0 && productList.map((product, index) => {
                        return <ProductDisplay key={index} props={{ thumbnail: product.thumbnail, name: product.name, description: product.description, price: product.price, stock: product.stock, id: product._id, count: 1 }} />
                    })
                }
            </Container>
        </>
    );
}

export default ProductList;