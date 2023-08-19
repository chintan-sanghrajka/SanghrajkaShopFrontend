import React, { useEffect } from 'react';
import NewCarousel from './NewCarousel.jsx';
import { getCategories } from '../../redux/Category/categoryAction.js';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import CategoryCard from './CategoryCard.jsx';
import { useNavigate } from 'react-router-dom';
import carouselImage1 from './../../media/laptops.jpg';
import carouselImage2 from './../../media/mobiles.jpg';
import carouselImage3 from './../../media/shoes.avif';
import carouselImage4 from './../../media/shirts.jpg';
import Spinner from './../Spinner.jsx';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    const data = useSelector((state) => state.categories)

    const onClickHandler = (name, id) => {
        navigate(`/sub-categories/${name}/${id}`)
    }

    const carouselImages = [
        carouselImage1, carouselImage2, carouselImage3, carouselImage4
    ]

    return (
        <>
            <NewCarousel images={carouselImages} />
            <Container className='my-5'>
                <h2 className='mb-4'>Featured Categories</h2>
                {data.isLoading && <Spinner />}
                <Row>
                    {!data.isLoading && data.categories.map((element, index) => {
                        return <Col className='col-lg-4 col-md-6 col-12' key={index}>
                            <CategoryCard props={{ name: element.name, description: element.description, cover: `category/${element.cover}`, id: element._id, onClickHandler: onClickHandler }} />
                        </Col>
                    })}
                </Row>
            </Container>
        </>
    );
}

export default Home