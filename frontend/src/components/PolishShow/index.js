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


const PolishShow = () => {
    const dispatch = useDispatch()
    let { polishId } = useParams()
    polishId = Number(polishId)

    const polish = useSelector(state => state.polish.singlePolish)
    const userId = useSelector(state => state.session.user?.id)
    const reviewObj = useSelector(state => state.review.polish)

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

    const [userReview] = newReviewList.filter(review => review.userId === userId)

    return (
        <section>
            <div className="polish-box">
                <img src={polish.image} alt='polish'></img>
                <div>{polish.description}</div>
            </div>
            <div className="price">
                {polish.price}
            </div>
            <div>{polish.numReviews} reviews</div>
            <div className="reviews">
                <div>Reviews for this item {polish.numReviews}</div>
                {newReviewList.length && newReviewList.map(review => (
                    <div key={review.id} className="review">
                        {console.log('review', review)}
                        <div>{review.review}</div>
                        <div>{review.stars}</div>
                        <div>{review.User.firstName}</div>
                        <div>{review.createdAt}</div>
                        {userReview && userId && review.userId === userId &&
                            <div className="modal">
                                <OpenModalMenuItem
                                    buttonText="Delete"
                                    onItemClick={closeMenu}
                                    modalComponent={<DeleteReview
                                        review={review}
                                        polish={polish}
                                    />}
                                />
                            </div>
                        }

                    </div>
                ))}
            </div>
            <OpenModalMenuItem
                buttonText="Add Review"
                onItemClick={closeMenu}
                modalComponent={<CreateReview
                    polish={polish}
                />}
            />

        </section>
    )
}

export default PolishShow
