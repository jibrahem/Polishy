import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getOnePolishThunk } from "../../store/polish";
import './PolishShow.css'
import { useDispatch, useSelector } from "react-redux";
import ReviewShow from "../ReviewShow";
import { getPolishReviewsThunk } from "../../store/review";
import OpenModalMenuItem from '../../components/Navigation/OpenModalMenuItem'
import DeleteReview from "../DeleteReview";
import { useRef } from "react";
import CreateReview from "../CreateReview";
import UpdateReview from "../UpdateReview";
import AddPolishCart from "../AddPolishCart";


const PolishShow = () => {
    const dispatch = useDispatch()
    let { polishId } = useParams()
    polishId = Number(polishId)

    const polish = useSelector(state => state.polish.singlePolish)
    const user = useSelector(state => state.session.user)
    const nothing = useSelector(state => console.log('nothing', state))
    const reviewObj = useSelector(state => state.review.polish)
    console.log('review object', reviewObj)

    const reviewList = Object.values(reviewObj)

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();


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

    useEffect(() => {
        dispatch(getPolishReviewsThunk(polishId))
        dispatch(getOnePolishThunk(polishId))
    }, [dispatch, polishId])

    if (!polish) {
        return null
    }

    if (!reviewList) {
        return null
    }

    const newReviewList = reviewList.filter(review => review.polishId === polish.id)

    if (!newReviewList) {
        return null
    }

    const sortedReviews = newReviewList.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    console.log('newrevie wlsit', newReviewList)

    const [userReview] = newReviewList.filter(review => review.userId === user?.id)

    return (
        <section>
            <div className="polish-box">
                <div className="polish-image">
                    <img src={polish.image} alt='polish'></img>
                </div>
                <div className="price-des">
                    <div className="price-cart">${polish.price}</div>
                    <div>Free Shipping</div>
                    <div className="des">{polish.description}</div>
                    {user &&
                        <AddPolishCart
                            polish={polish} />
                    }
                    {!user &&
                        <div>Sign in or register to make a purchase</div>}
                </div>
            </div>
            <div className="review-nav">
                <div className="review-rating">
                    {polish.numReviews === 0 &&
                        <div className='stars'>{polish.numReviews} reviews </div>
                    }
                    {polish.numReviews === 1 &&
                        <div className='stars'>{polish.numReviews} review </div>
                    }
                    {polish.numReviews > 1 &&
                        <div className='stars'>{polish.numReviews} reviews </div>
                    }
                    {polish.avgRating === null &&
                        <div><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i></div>
                    }
                    {(polish.avgRating === 1 || (polish.avgRating > .5 && polish.avgRating < 1.5)) &&
                        <div><i class="fa-sharp fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i></div>
                    }
                    {(polish.avgRating === 2 || (polish.avgRating > 1.5 && polish.avgRating < 2.5)) &&
                        <div><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i></div>
                    }
                    {(polish.avgRating === 3 || (polish.avgRating >= 2.5 && polish.avgRating < 3.5)) &&
                        <div><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i></div>
                    }
                    {(polish.avgRating === 4 || (polish.avgRating >= 3.5 && polish.avgRating < 4.5)) &&
                        <div><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-regular fa-star"></i></div>
                    }
                    {(polish.avgRating === 5 || (polish.avgRating >= 4.5)) &&
                        <div><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i><i class="fa-sharp fa-solid fa-star"></i></div>
                    }
                </div>
                <div className="add-review">
                    {!userReview && user &&
                        <OpenModalMenuItem
                            buttonText="Add Review"
                            onItemClick={closeMenu}
                            modalComponent={<CreateReview
                                polish={polish}
                            />}
                        />}
                </div>
            </div>
            {newReviewList.length === 0 &&
                <div className="no-review">Be the first to post a review!</div>
            }
            <div className="reviews">
                <ul>
                    {newReviewList.length > 0 && newReviewList.map(review => (
                        <li key={review.id} className="review">
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
                            <div className="review-text">{review.review}</div>
                            <div className="purchase">Purchased item: {polish.description}</div>
                            {review?.ReviewImages?.length > 0 &&
                                <div className="review-img"><img src={review.ReviewImages[0].url} alt='review'></img></div>
                            }
                            <div className="name-date">
                                {console.log('review name', review)}
                                <div className="review-name">{review.User?.firstName}</div>
                                {review.createdAt.split('-')[1] === '01' &&
                                    <div className="date"> Jan {review.createdAt.split('-')[2][0]}{review.createdAt.split('-')[2][1]}, {review.createdAt.split('-')[0]}
                                    </div>
                                }
                                {review.createdAt.split('-')[1] === '02' &&
                                    <div className="date"> Feb {review.createdAt.split('-')[2][0]}{review.createdAt.split('-')[2][1]}, {review.createdAt.split('-')[0]}
                                    </div>
                                }
                                {review.createdAt.split('-')[1] === '03' &&
                                    <div className="date"> March {review.createdAt.split('-')[2][0]}{review.createdAt.split('-')[2][1]}, {review.createdAt.split('-')[0]}
                                    </div>
                                }
                                {review.createdAt.split('-')[1] === '04' &&
                                    <div className="date"> April {review.createdAt.split('-')[2][0]}{review.createdAt.split('-')[2][1]}, {review.createdAt.split('-')[0]}
                                    </div>
                                }
                                {review.createdAt.split('-')[1] === '05' &&
                                    <div className="date"> May {review.createdAt.split('-')[2][0]}{review.createdAt.split('-')[2][1]}, {review.createdAt.split('-')[0]}
                                    </div>
                                }
                                {review.createdAt.split('-')[1] === '06' &&
                                    <div className="date"> Jun {review.createdAt.split('-')[2][0]}{review.createdAt.split('-')[2][1]}, {review.createdAt.split('-')[0]}
                                    </div>
                                }
                                {review.createdAt.split('-')[1] === '07' &&
                                    <div className="date"> July {review.createdAt.split('-')[2][0]}{review.createdAt.split('-')[2][1]}, {review.createdAt.split('-')[0]}
                                    </div>
                                }
                                {review.createdAt.split('-')[1] === '08' &&
                                    <div className="date"> Aug {review.createdAt.split('-')[2][0]}{review.createdAt.split('-')[2][1]}, {review.createdAt.split('-')[0]}
                                    </div>
                                }
                                {review.createdAt.split('-')[1] === '09' &&
                                    <div className="date"> Sept {review.createdAt.split('-')[2][0]}{review.createdAt.split('-')[2][1]}, {review.createdAt.split('-')[0]}
                                    </div>
                                }
                                {review.createdAt.split('-')[1] === '10' &&
                                    <div className="date"> Oct {review.createdAt.split('-')[2][0]}{review.createdAt.split('-')[2][1]}, {review.createdAt.split('-')[0]}
                                    </div>
                                }
                                {review.createdAt.split('-')[1] === '11' &&
                                    <div className="date"> Nov {review.createdAt.split('-')[2][0]}{review.createdAt.split('-')[2][1]}, {review.createdAt.split('-')[0]}
                                    </div>
                                }
                                {review.createdAt.split('-')[1] === '12' &&
                                    <div className="date"> Dec {review.createdAt.split('-')[2][0]}{review.createdAt.split('-')[2][1]}, {review.createdAt.split('-')[0]}
                                    </div>
                                }
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default PolishShow
