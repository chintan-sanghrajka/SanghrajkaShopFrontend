import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSubCategories } from '../../redux/SubCategory/subCategoryAction.js';
import CategoryCard from './CategoryCard.jsx';

const SubCategories = () => {
    const { name, id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getSubCategories(id))
    }, [dispatch, id])

    const data = useSelector((state) => state.subCategories.subCategories)

    const onClickHandler = (name, id) => {
        navigate(`/products/${name}/${id}`);
    }

    return (
        <>
            <Container>
                <h2 className='my-4'>Explore more in {name}</h2>
                {data.length === 0 && <h3>Coming Soon</h3>}
                <Row>
                    {data && data.map((element, index) => {
                        return <Col className='col-lg-4 col-md-6 col-12' key={index}>
                            <CategoryCard props={{ name: element.name, description: element.description, cover: `subCategory/${element.cover}`, id: element._id, onClickHandler: onClickHandler }} />
                        </Col>
                    })}
                </Row>
            </Container>
        </>
    );
}

export default SubCategories;