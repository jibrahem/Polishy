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
    const [stars, setStars] = useState(0)
    const [starRating, setStarRating] = useState()
    const [image, setImage] = useState('')
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

        if (!review) {
            errors.review = 'Review text is required'
        }
        if (!stars) {
            errors.stars = "Star rating is required"
        }

        if (image && !(image.endsWith('.png') || image.endsWith('.jpg') || image.endsWith('.jpeg'))) {
            errors.image = 'Image URL must end with .png, .jpg, or .jpeg'
        }

        if (Object.values(errors).length) {
            setErrors(errors)
        } else {
            const addReview = await dispatch(createReviewThunk(newReview, polish, user))
            await dispatch(getOnePolishThunk(polish.id))
                .then(closeModal)
        }
        if (!review) {
            return null
        }
        if (!polish) {
            return null
        }
    }

    const setStar = (num) => {
        if (num <= stars) {
            return "fa-solid fa-star"
        }
        return "fa-regular fa-star"
    }

    return (
        <>
            <div className='post-review'>
                <h1>How was the nail polish?</h1>
                <form onSubmit={handleSubmit}>
                    <div className="errors">{errors.stars}</div>
                    <div className="rating-input">
                        <i class="fa-regular fa-star"
                            style={{ color: 'black' }}
                            onClick={() => setStars(1)}
                            onMouseEnter={() => setStars(1)}
                            onMouseLeave={() => setStarRating(0)}
                            className={setStar(1)}></i>

                        <i class="fa-regular fa-star"
                            style={{ color: 'black' }}
                            onClick={() => setStars(2)}
                            onMouseEnter={() => setStars(2)}
                            onMouseLeave={() => setStarRating(0)}
                            className={setStar(2)}></i>

                        <i class="fa-regular fa-star"
                            style={{ color: 'black' }}
                            onClick={() => setStars(3)}
                            onMouseEnter={() => setStars(3)}
                            onMouseLeave={() => setStarRating(0)}
                            className={setStar(3)}></i>

                        <i class="fa-regular fa-star"
                            style={{ color: 'black' }}
                            onClick={() => setStars(4)}
                            onMouseEnter={() => setStars(4)}
                            onMouseLeave={() => setStarRating(0)}
                            className={setStar(4)}></i>

                        <i class="fa-regular fa-star"
                            style={{ color: 'black' }}
                            onClick={() => setStars(5)}
                            onMouseEnter={() => setStarRating(5)}
                            onMouseLeave={() => setStarRating(0)}
                            className={setStar(5)}></i> Stars
                    </div>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder='Leave your review'
                    />
                    <div className='errors'>{errors.review}</div>
                    <input type='text'
                        placeholder='Want to add an image'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    >
                    </input>
                    <div className='errors'>{errors.image}</div>
                    <button type='submit'>Submit Review</button>
                </form>
            </div>
        </>
    )
}

export default CreateReview
