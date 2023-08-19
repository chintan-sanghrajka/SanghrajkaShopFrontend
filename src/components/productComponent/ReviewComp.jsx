import React from 'react'
import { Button } from 'react-bootstrap'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { getReviews, deleteReview } from '../../redux/Review/reviewAction'

const ReviewComp = ({ props }) => {
    const user = JSON.parse(Cookies.get('user'))
    const dispatch = useDispatch()

    const deleteReviewHandler = () => {
        dispatch(deleteReview(props._id)).then((res) => {
            dispatch(getReviews(props.productId))
        })
    }

    return (
        <>
            <div className='review_outer_div'>
                <h4 className='review_head'>{props.userName}</h4>
                <p className='review_date'>{props.createdDate}</p>
                <h4 className='review_review'>{props.custReview}</h4>
                {props.userName === user.userName ? <Button variant="danger" className='btn-sm review_delete_button' onClick={deleteReviewHandler}><i className="bi bi-trash3"></i></Button> : null}
            </div>
        </>
    )
}

export default ReviewComp