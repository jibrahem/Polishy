import React, {useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserReviewsThunk } from '../../store/review'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import DeleteReview from '../DeleteReview'
import UpdateReview from '../UpdateReview'

function ManageReviews() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    console.log('userssss', user)
    const reviewObj = useSelector(state => state.review.user)
    const list = Object.values(reviewObj)
    const [showMenu, setShowMenu] = useState(false)
    const ulRef = useRef()
    console.log('reviewobj', reviewObj)

    const reviewList = list.filter(review => review.userId === user.id)

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

    if(!reviewList){
        return null
    }
console.log('reviewssssss', reviewList)
    return (
        <>
        <div className='manage-reviews'>
            <h1>Manage your reviews</h1>
            <ul>
                {reviewList.length > 0 && reviewList.map(review => (
                    <div key={review.id} className='review'>
                            <div>{review.Polish.description}</div>
                            <div>{review.review}</div>
                            <div>{review.stars}</div>
                            <OpenModalMenuItem
                                buttonText="Update"
                                onItemClick={closeMenu}
                                modalComponent={<UpdateReview
                                    updateReview={review}
                                    polish={review.Polish}
                                />}
                            />
                        <OpenModalMenuItem
                            buttonText="Delete"
                            onItemClick={closeMenu}
                            modalComponent={<DeleteReview
                                review={review}
                                polish={review.Polish}
                            />}
                        />
                            <div></div>
                    </div>
                ))}
            </ul>
        </div>
        </>
    )
}

export default ManageReviews
