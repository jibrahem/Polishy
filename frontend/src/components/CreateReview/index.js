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
    const [text, setText] = useState('')
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
            review: text,
            stars: Number(stars)
        }

        const errors = {}

        if (!text) {
            errors.text = 'Review text is required'
        }
        if(text && text.length > 200){
            errors.text = 'Reviews can only have a max of 200 characters'
        }

        if (!stars) {
            errors.stars = "Star rating is required"
        }

        // if (image && !(image.endsWith('.png') || image.endsWith('.jpg') || image.endsWith('.jpeg'))) {
        //     errors.image = 'Image URL must end with .png, .jpg, or .jpeg'
        // }

        if (Object.values(errors).length) {
            setErrors(errors)
        } else {
            const addReview = await dispatch(createReviewThunk(newReview, polish, user))
            await dispatch(getOnePolishThunk(polish.id))
                .then(closeModal)
        }
        if (!text) {
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

    const updateFile = e => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    return (
        <>
            <div className='post-review'>
                <h1>How was the nail polish?</h1>
                <form onSubmit={handleSubmit}>
                    <div className="errors">{errors.stars}</div>
                    <div className="rating-input">
                        <i class="fa-regular fa-star"
                            style={{ color: 'black' }}
                            onClick={() => setStars(Number(1))}
                            onMouseEnter={() => setStars(1)}
                            onMouseLeave={() => setStarRating(0)}
                            className={setStar(1)}></i>

                        <i class="fa-regular fa-star"
                            style={{ color: 'black' }}
                            onClick={() => setStars(Number(2))}
                            onMouseEnter={() => setStars(2)}
                            onMouseLeave={() => setStarRating(0)}
                            className={setStar(2)}></i>

                        <i class="fa-regular fa-star"
                            style={{ color: 'black' }}
                            onClick={() => setStars(Number(3))}
                            onMouseEnter={() => setStars(3)}
                            onMouseLeave={() => setStarRating(0)}
                            className={setStar(3)}></i>

                        <i class="fa-regular fa-star"
                            style={{ color: 'black' }}
                            onClick={() => setStars(Number(4))}
                            onMouseEnter={() => setStars(4)}
                            onMouseLeave={() => setStarRating(0)}
                            className={setStar(4)}></i>

                        <i class="fa-regular fa-star"
                            style={{ color: 'black' }}
                            onClick={() => setStars(Number(5))}
                            onMouseEnter={() => setStarRating(5)}
                            onMouseLeave={() => setStarRating(0)}
                            className={setStar(5)}></i> Stars
                    </div>
                    <div className='errors'>{errors.text}</div>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder='Leave your review'
                    />

                    <label>
                        Upload an Image
                        <input type="file" onChange={updateFile} accept=".jpg, .jpeg, .png" />
                    </label>
                    <div className='errors'>{errors.image}</div>
                    <button type='submit'>Submit Review</button>
                </form>
            </div>
        </>
    )
}

export default CreateReview
