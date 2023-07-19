import { csrfFetch } from "./csrf";
export const GET_POLISH_REVIEWS = 'reviews/GET_POLISH_REVIEWS'
export const GET_USER_REVIEWS = 'reviews/GET_USER_REVIEWS'
export const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
export const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

export const getPolishReviews = (reviews) => ({
    type: GET_POLISH_REVIEWS,
    reviews,
});

export const getUserReviews = (reviews) => ({
    type: GET_USER_REVIEWS,
    reviews,
});

export const createReview = (review) => ({
    type: CREATE_REVIEW,
    review,
});

export const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    review,
});

export const deleteReview = (review) => ({
    type: DELETE_REVIEW,
    review,
})

export const getPolishReviewsThunk = (polishId) => async (dispatch) => {
    const res = await fetch(`/api/polishes/${polishId}/reviews`)

    if (res.ok) {
        const reviews = await res.json()
        dispatch(getPolishReviews(reviews))
        return reviews
    }
}

export const getAllUserReviewsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/reviews/current')

    if (res.ok) {
        const userReviews = await res.json()
        dispatch(getUserReviews(userReviews))
    }
}

export const createReviewThunk = (review, polish, user) => async (dispatch) => {
    const res = await csrfFetch(`/api/polishes/${polish.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
    })
    if (res.ok) {
        const review = await res.json()
        review.User = user
        dispatch(createReview(review))
        return review
    } else {
        const errors = await res.json()
        return errors
    }
}

export const updateReviewThunk = (review) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
    })
    if (res.ok) {
        const updatedReview = await res.json();
        dispatch(updateReview(updatedReview))
        return updatedReview
    } else {
        const errors = await res.json()
        return errors
    }
}

export const deleteReviewThunk = (review) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'DELETE',
    })
    if (res.ok) {
        dispatch(deleteReview(review));
        return review
    } else {
        const errors = await res.json()
        return errors
    }
}

const initialState = { polish: {}, user: {} }
const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_POLISH_REVIEWS:
            newState = { ...state, polish: { ...state.polish }, user: { ...state.user } }
            action.reviews.Reviews.forEach(review => {
                newState.polish[review.id] = review
            })
            return newState
        case GET_USER_REVIEWS:
            newState = { ...state, polish: { ...state.polish }, user: { ...state.user } }
            action.reviews.Reviews.forEach(review => {
                newState.user[review.id] = review
            })
            return newState
        case UPDATE_REVIEW:
            newState = { ...state, polish: { ...state.polish }, user: { ...state.user } }
            return { ...state, user: { ...action.review } }
        case CREATE_REVIEW:
            newState = { ...state, polish: { ...state.polish }, user: { ...state.user } }
            newState.polish[action.review.id] = action.review
            return newState
        case DELETE_REVIEW:
            newState = { ...state, polish: { ...state.polish }, user: {} }
            delete newState.polish[action.review.id]
            return newState
        default:
            return state
    }
}

export default reviewReducer;
