import React from 'react'
import { useDispatch } from 'react-redux';
import { getUserCartThunk, deletePolishThunk } from '../../store/cart'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const DeletePolish = ({ polish, cart }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const cartObj = cart.find(({ id }) => id === polish.id)


    const handleDelete = async (e) => {
        e.preventDefault()
        const deleted = await dispatch(deletePolishThunk(cartObj))
        if (deleted.id === cartObj.id) {
            dispatch(getUserCartThunk())
        }

    }
    return (
        <>
            <div className='update-cart'>
                <button onClick={handleDelete}> X Remove</button>
            </div>
        </>
    )
}
export default DeletePolish
