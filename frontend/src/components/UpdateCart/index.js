import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { updateCartThunk, getUserCartThunk, addPolishToCartThunk } from '../../store/cart'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import './UpdateCart.css'

const UpdateCart = ({ polish, cart }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(polish.quantity)
    const [errors, setErrors] = useState({})
    const user = useSelector(state => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const editCart = {
            ...polish,
            quantity: Number(quantity),
        }

        const updateCart = await dispatch(updateCartThunk(editCart))
        await dispatch(getUserCartThunk())
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <select name="quantity" id="quant" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                    <option value={Number(1)}>1</option>
                    <option value={Number(2)}>2</option>
                    <option value={Number(3)}>3</option>
                    <option value={Number(4)}>4</option>
                    <option value={Number(5)}>5</option>
                </select>
                <div className='update-cart'>
                    <button>Update cart</button>
                </div>
            </form>
        </>
    )
}

export default UpdateCart
