import React from 'react'
import { deleteCartThunk } from "../../store/cart"
import { useDispatch } from 'react-redux';
import { getUserCartThunk } from '../../store/cart'

const DeleteCart = ({cart}) => {
    const dispatch = useDispatch()

    const handleDelete = async (e) =>{
        e.preventDefault()
        const deleted = await dispatch(deleteCartThunk(cart))
        if(deleted.id === cart.id){
            dispatch(getUserCartThunk())
        }
    }
    return (
        <>
        <button onClick={handleDelete}> X Remove</button>
        </>
    )
}
export default DeleteCart
