import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { getAllUserReviewsThunk, updateReview } from '../../store/review'
import { updateReviewThunk } from '../../store/review'
import { useHistory } from 'react-router-dom'

const UpdateReview = ({ polish, review }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const [stars, setStars] = useState(1)
    const [starRating, setStarRating] = useState()
    const [image, setImage] = useState('')
    const [errors, setErrors] = useState({})
    const user = useSelector(state => state.session.user)
    const { closeModal } = useModal();

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

    const setStar = (num) => {
        if (num <= stars) {
            return "fa-solid fa-star"
        }
        return "fa-regular fa-star"
    }

    return (
        <>
            <div className='post-review'>
                <h1>Update the nail polish review</h1>
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
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder='Leave your review'
                    />
                    <div className='errors'>{errors.text}</div>
                    <button type='submit'>Update Review</button>
                </form>
            </div>
        </>
    )

}

export default UpdateReview
