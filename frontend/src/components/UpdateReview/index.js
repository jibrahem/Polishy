import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { getAllUserReviewsThunk } from '../../store/review'
import { updateReviewThunk } from '../../store/review'
import { useHistory } from 'react-router-dom'

const UpdateReview = ({ polish, updateReview }) => {
    console.log('review', updateReview)
    const history = useHistory()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const [review, setReview] = useState(updateReview?.review)
    const [stars, setStars] = useState(1)
    const user = useSelector(state => state.session.user)
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newReview = {
            ...updateReview,
            polishId: polish.id,
            userId: user.id,
            review: review,
            stars: stars
        }
        const errors = {}

        if (!review) {
            errors.review = 'Review text is required'
        }
        if (!stars) {
            errors.stars = "Star rating is required"
        }

        if (Object.values(errors).length) {
            setErrors(errors)
        } else {
            const updatedReview = await dispatch(updateReviewThunk(newReview))
            await dispatch(getAllUserReviewsThunk())
                .then(closeModal)
        }
        if (!updateReview) {
            return null
        }
        if (!polish) {
            return null
        }
    }
    return (
        <>
            <div className='post-review'>
                <h1>Update this nail polish review</h1>
                <form onSubmit={handleSubmit}>
                    <div className='errors'>{errors.review}</div>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                    <div className='errors'>{errors.stars}</div>
                    <button type='submit'>Update Review</button>
                </form>
            </div>
        </>
    )

}

export default UpdateReview
