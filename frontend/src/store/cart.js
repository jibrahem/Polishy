import { csrfFetch } from "./csrf";
export const GET_USER_CART = 'carts/GET_USER_CART'
export const DELETE_CART = 'carts/DELETE_CART'

export const getUserCart = (cart) => ({
    type: GET_USER_CART,
    cart
})

export const deleteCart = (cart) => ({
    type: DELETE_CART,
    cart
})

export const getUserCartThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/carts/current')
    if (res.ok) {
        const userCart = await res.json()
        dispatch(getUserCart(userCart))
    }
}

export const deleteCartThunk = (cart) => async (dispatch) => {
    const res = await csrfFetch(`/api/carts/${cart.id}`,{
        method: 'DELETE'
    })
    if(res.ok){
        dispatch(deleteCart(cart))
        return cart
    } else{
        const errors = await res.json()
        return errors
    }
}

const initialState = { user: {} }
const cartReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_USER_CART:
            newState = { ...state, user: { ...state.user } }
            return { ...state, user: { ...action.cart } }
        case DELETE_CART:
            newState = {...state, user: {...state.user}}
            delete newState.user[action.cart.id]
            return newState
        default:
            return state
    }
}

export default cartReducer
