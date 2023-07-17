import React from 'react'
import { useDispatch } from 'react-redux';
import { getUserCartThunk, deletePolishThunk } from '../../store/cart'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const DeletePolish = ({ polish, cart }) => {
    console.log('polish', polish)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDelete = async (e) => {
        e.preventDefault()
        const deleted = await dispatch(deletePolishThunk(polish, cart))

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
