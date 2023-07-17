import React from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal"
import { getAllUserReviewsThunk, deleteReviewThunk } from '../../store/review';
import { getOnePolishThunk } from '../../store/polish';
import './DeleteReview.css'

function DeleteReview({ review, polish }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = async (e) => {
        e.preventDefault()
        const deleted = await dispatch(deleteReviewThunk(review))
        if (deleted.id === review.id) {
            dispatch(getOnePolishThunk(polish.id))
            dispatch(getAllUserReviewsThunk())
            closeModal()
        }
    }
    return (
        <>
            <div className='delete'>
                <h1>Confirm Delete</h1>
                <h4>Are you sure you want to delete this review?</h4>
                <form onSubmit={handleDelete}>
                    <div className='update-delete'>
                        <div className='delete-button'>
                            <button type='submit'>
                                Yes
                            </button>
                        </div>
                        <div className='update-button'>
                            <button onClick={closeModal}>
                                No
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default DeleteReview;
