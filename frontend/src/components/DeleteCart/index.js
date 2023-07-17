import React from 'react'
import { deleteCartThunk } from "../../store/cart"
import { useDispatch } from 'react-redux';
import { getUserCartThunk } from '../../store/cart'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const DeleteCart = ({cart}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDelete = async (e) =>{
        e.preventDefault()
        const deleted = await dispatch(deleteCartThunk(cart))
            .then(history.push('/'))

    }
    return (
        <>
        {/* <button onClick={handleDelete}> X Remove</button> */}
        </>
    )
}
export default DeleteCart
