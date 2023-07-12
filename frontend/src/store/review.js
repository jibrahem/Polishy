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

export const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId,
})

export const getPolishReviewsThunk = (polish) => async (dispatch) => {
    const res = await fetch(`/api/polishes/${polish.id}/reviews`)

    if (res.ok) {
        const polishes = await res.json()
        dispatch(getPolishReviews(polishes))
    }
}

const initialState = { polish: {}, user: {} }
const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        default:
            return state

    }
}
