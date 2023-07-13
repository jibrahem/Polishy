import React, { useEffect } from 'react'
import { getPolishReviews } from '../../store/review'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function ReviewShow({ polish }) {
    // const dispatch = useDispatch()
    // console.log('polish', polish)
    // let { polishId } = useParams()
    // polishId = Number(polishId)


    // const reviewObj = useSelector(state => state.reviews)
    // const reviewList = Object.values(reviewObj)
    // console.log('reviews', reviewList)

    // useEffect(() => {
    //     dispatch(getPolishReviews(polishId))
    // }, [dispatch, polishId])

    // if (!reviewList) {
    //     return null
    // }

    return (
        <>
        </>
    )
}

export default ReviewShow
