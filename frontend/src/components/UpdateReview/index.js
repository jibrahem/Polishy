import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { getAllUserReviewsThunk, updateReview } from '../../store/review'
import { updateReviewThunk } from '../../store/review'
import { useHistory } from 'react-router-dom'

const UpdateReview = ({ polish, review }) => {
    console.log('review in update', review)
    const history = useHistory()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const [text, setText] = useState(review?.review)
    const [image, setImage] = useState('image.jpg')
    const [stars, setStars] = useState(1)
    const user = useSelector(state => state.session.user)
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newReview = {
            ...review,
            polishId: polish.id,
            userId: user.id,
            image: image,
            review: text,
            stars: stars
        }
        console.log('new review', newReview)
        const errors = {}

        if (!text) {
            errors.text = 'Review text is required'
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
        if (!review) {
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
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div className='errors'>{errors.stars}</div>
                    <button type='submit'>Update Review</button>
                </form>
            </div>
        </>
    )

}

export default UpdateReview
