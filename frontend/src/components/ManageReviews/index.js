import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserReviewsThunk } from '../../store/review'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import DeleteReview from '../DeleteReview'
import UpdateReview from '../UpdateReview'
import './ManageReviews.css'

function ManageReviews() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const reviewObj = useSelector(state => state.review.user)

    const list = Object.values(reviewObj)
    const [showMenu, setShowMenu] = useState(false)
    const ulRef = useRef()

    const reviewList = list.filter((review) => review.userId === user.id)

    useEffect(() => {
        dispatch(getAllUserReviewsThunk())
    }, [dispatch])

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    if (!reviewList) {
        return null
    }

    console.log('REVIEWL:IST', reviewList)

    return (
        <>
            <div className='manage-reviews'>
                <h1>Manage your reviews</h1>
                <ul>
                    {reviewList.length > 0 && reviewList.map(review => (
                        <div key={review.id} className='review'>
                            <div>{review.Polish.description}</div>
                            <div>{review.review}</div>
                            {review.ReviewImages?.length > 0 &&
                                <div className="review-img"><img src={review.ReviewImages[0].url} alt='review'></img></div>
                            }
                            {/* {review.ReviewImages.length === 0 &&
                            <p></p>} */}
                            {review.stars === 1 &&
                                <div>{review.stars} <i class="fa-sharp fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i></div>
                            }
                            {review.stars === 2 &&
                                <div>{review.stars} <i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i></div>
                            }
                            {review.stars === 3 &&
                                <div>{review.stars} <i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i></div>
                            }
                            {review.stars === 4 &&
                                <div>{review.stars} <i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-regular fa-star"></i></div>
                            }
                            {review.stars === 5 &&
                                <div>{review.stars} <i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i></div>
                            }
                            <div className='update-delete'>
                                <div className='update-button'>
                                    <OpenModalMenuItem
                                        buttonText="Update"
                                        onItemClick={closeMenu}
                                        modalComponent={<UpdateReview
                                            review={review}
                                            polish={review.Polish}
                                        />}
                                    />
                                </div>
                                <div className='delete-button'>
                                    <OpenModalMenuItem
                                        buttonText="Delete"
                                        onItemClick={closeMenu}
                                        modalComponent={<DeleteReview
                                            review={review}
                                            polish={review.Polish}
                                        />}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default ManageReviews
