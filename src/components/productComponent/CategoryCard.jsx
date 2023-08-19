import React from 'react';
import { BASE_URL } from '../helper';

const CategoryCard = ({ props }) => {
    return (
        <>
            <div className='category_card' onClick={() => props.onClickHandler(props.name, props.id)}>
                <img className="category_img" src={`${BASE_URL}uploads/${props.cover}`} alt={props.name} />
                <h4 className='category_title'>{props.name}</h4>
                <p className='category_description'>{props.description}</p>
            </div>
        </>
    )
}

export default CategoryCard