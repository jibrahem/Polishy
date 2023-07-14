import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { useSelector } from 'react-redux'
import { createReviewThunk } from '../../store/review'
import { getOnePolishThunk } from '../../store/polish'
import './CreateReview.css'
import { useHistory } from 'react-router-dom'

const CreateReview = ({ polish }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(1)
    const [image, setImage] = useState('image.jpg')
    const [errors, setErrors] = useState({})
    const user = useSelector(state => state.session.user)
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newReview = {
            polishId: polish.id,
            userId: user.id,
            image: image,
            review: review,
            stars: stars
        }
        const errors = {}

        if(!review){
            errors.review = 'Review text is required'
        }
        if(!stars){
            errors.stars = "Star rating is required"
        }

        if (Object.values(errors).length){
            setErrors(errors)
        } else {
            const addReview = await dispatch(createReviewThunk(newReview, polish, user))
            await dispatch(getOnePolishThunk(polish.id))
            .then(closeModal)
        }
        if(!review){
            return null
        }
        if(!polish){
            return null
        }
    }

    return (
        <>
        <div className='post-review'>
            <h1>How was this nail polish?</h1>
            <form onSubmit={handleSubmit}>
                <div className='errors'>{errors.review}</div>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder='Leave your review'
                    />
                    <input type='text'
                        onChange={(e) => setImage(e.target.value) }
                    >
                    </input>
            <div className='errors'>{errors.stars}</div>
            <button type='submit'>Submit Review</button>
            </form>
        </div>
        </>
    )
}

export default CreateReview
