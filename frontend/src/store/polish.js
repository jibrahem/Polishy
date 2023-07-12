import { csrfFetch } from "./csrf";
export const GET_ALL_POLISHES = 'spots/GET_ALL_POLISHES';
export const RECEIVE_POLISH = 'spots/RECEIVE_POLISH';

export const getAllPolishes = (polishes) => ({
    type: GET_ALL_POLISHES,
    polishes,
});

export const recievePolish = (polish) => ({
    type: RECEIVE_POLISH,
    polish,
});

export const allPolishesThunk = () => async (dispatch) => {
    console.log('in tht ehunk')
    const res = await csrfFetch('/api/polishes')

    if (res.ok) {
        const polishes = await res.json()
        console.log('polsihes in thunk', polishes)
        dispatch(getAllPolishes(polishes))
    }
}

export const getOnePolishThunk = (polishId) => async (dispatch) => {
    const res = await fetch(`/api/polishes/${polishId}`)
    if (res.ok) {
        const polish = await res.json();
        dispatch(recievePolish(polish))
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
        default:
            return state
    }
}
export default polishReducer
