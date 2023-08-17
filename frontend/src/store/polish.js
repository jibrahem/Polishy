import { csrfFetch } from "./csrf";
export const GET_ALL_POLISHES = 'polishes/GET_ALL_POLISHES';
export const RECEIVE_POLISH = 'polishes/RECEIVE_POLISH';
export const CREATE_POLISH = 'polishes/CREATE_POLISH';
export const UPDATE_POLISH = 'polishes/UPDATE_POLISH';
export const DELETE_POLISH = 'polishes/DELETE_POLISH';
export const GET_USER_POLISH = 'polishes/GET_USER_POLISH'

export const getAllPolishes = (polishes) => ({
    type: GET_ALL_POLISHES,
    polishes,
});

export const receivePolish = (polish) => ({
    type: RECEIVE_POLISH,
    polish,
});

export const getUserPolish = (polishes) => ({
    type: GET_USER_POLISH,
    polishes,
});

export const createPolish = (polish) => ({
    type: CREATE_POLISH,
    polish,
});

export const updatePolish = (polish) => ({
    type: UPDATE_POLISH,
    polish,
});

export const deletePolish = (polish) => ({
    type: DELETE_POLISH,
    polish,
})

export const allPolishesThunk = () => async (dispatch) => {
    const res = await fetch('/api/polishes')

    if (res.ok) {
        const polishes = await res.json()
        dispatch(getAllPolishes(polishes))
    }
}

export const getOnePolishThunk = (polishId) => async (dispatch) => {
    const res = await fetch(`/api/polishes/${polishId}`)
    if (res.ok) {
        const polish = await res.json();
        dispatch(receivePolish(polish))
        return polish
    } else {
        const errors = await res.json()
        return errors
    }
}

export const getUserPolishesThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/polishes/current')

    if (res.ok) {
        const polishes = await res.json()
        dispatch(getUserPolish(polishes))
    }
}

export const createPolishThunk = (newPolish) => async (dispatch) => {

    const { description, price, image } = newPolish;
    const formData = new FormData();
    formData.append("description", description);
    formData.append("price", price);

    if (image) formData.append("image", image);

    const res = await csrfFetch('/api/polishes', {
        method: 'POST',
        body: formData
    });

    if (res.ok) {

        const data = await res.json()
        dispatch(createPolish(data))
        console.log('data', data)
        return data
    }
}

export const updatePolishThunk = (polish) => async (dispatch) => {
    const res = await csrfFetch(`/api/polishes/${polish.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(polish),
    })
    if (res.ok) {
        const updatedPolish = await res.json();
        console.log('updated polish thunk', updatedPolish)
        dispatch(updatePolish(updatedPolish))
        return updatedPolish
    } else {
        const errors = await res.json()
        return errors
    }
}

export const deletePolishThunk = (polish) => async (dispatch) => {
    const res = await csrfFetch(`/api/polishes/${polish.id}`, {
        method: 'DELETE',
    })
    if (res.ok) {
        dispatch(deletePolish(polish));
        return polish
    } else {
        const errors = await res.json()
        return errors
    }
}

const initialState = { allPolishes: {}, singlePolish: {} }

const polishReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_POLISHES:
            newState = { allPolishes: { ...state.allPolishes } }
            action.polishes.forEach(polish => {
                newState.allPolishes[polish.id] = polish
            })
            return newState
        case RECEIVE_POLISH:
            newState = { ...state, allPolishes: { ...state.allPolishes }, singlePolish: { ...state.singlePolish } }
            return { ...state, singlePolish: { ...action.polish } }
        case GET_USER_POLISH:
            newState = { ...state, allPolishes: { ...state.allPolishes }, singlePolish: { ...state.singlePolish } }
            action.polishes.allPolishes.forEach(polish => {
                newState.allPolishes[polish.id] = polish
            })
            return newState;
        case CREATE_POLISH:
            newState = { ...state, allPolishes: { ...state.allPolishes }, singlePolish: { ...state.singlePolish } }
            console.log('new state', action)
            return { ...state, singlePolish: { ...action.polish } }
        case UPDATE_POLISH:
            newState = { ...state, allPolishes: { ...state.allPolishes }, singlePolish: { ...state.singlePolish } }
            return { ...state, singlePolish: { ...action.polish } }
        case DELETE_POLISH:
            newState = { ...state, allPolishes: { ...state.allPolishes }, singlePolish: { } }
            delete newState.allPolishes[action.polish.id]
            return newState
        default:
            return state
    }
}
export default polishReducer
